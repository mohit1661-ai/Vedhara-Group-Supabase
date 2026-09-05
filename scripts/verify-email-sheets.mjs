#!/usr/bin/env node
/**
 * scripts/verify-email-sheets.mjs
 *
 * Diagnoses the lead-forwarding integrations without touching the website:
 *   • Resend email   → checks the API key and domain verification status
 *   • Google Sheets  → Mode A (API): decodes the service-account credential,
 *                      authenticates, and reads the spreadsheet (read-only)
 *                    → Mode B (webhook): sends a `diag` probe that the Apps
 *                      Script answers WITHOUT appending a row
 *   • Titan CRM      → reports whether the webhook is configured (never sends)
 *
 * Usage:
 *   node scripts/verify-email-sheets.mjs             # read env from process/.env.local
 *   node scripts/verify-email-sheets.mjs --send      # also send a real Resend test email
 *
 * Nothing printed is a real secret: keys are masked to "ab…YZ".
 */

import { createSign } from "crypto";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");

/* ── env loading: process.env wins, then .env.local in the repo root ─── */
function loadDotEnv() {
  const file = resolve(ROOT, ".env.local");
  if (!existsSync(file)) return;
  const env = {};
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (!m || m[1].startsWith("#")) continue;
    env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

const dot = loadDotEnv() ?? {};
function env(key) {
  const v = process.env[key];
  if (v !== undefined && v !== "") return v;
  return dot[key];
}

const mask = (s, n = 4) => (s && s.length > n + n ? `${s.slice(0, n)}…${s.slice(-n)}` : s ? "set" : "NOT SET");
const on = (k) => (env(k) ? true : false);
const RESEND_OK = true, RESEND_WARN = "warn", RESEND_FAIL = "fail";

function check(kind, _unused, note) {
  const icon = kind === RESEND_OK ? "✓" : kind === RESEND_WARN ? "⚠" : "✗";
  console.log(`  ${icon} ${note}`);
}

console.log("Vedhara lead-forwarding diagnostics\n");

/* ── 1. Resend email ──────────────────────────────────────────────────── */
const RESEND_API_KEY = env("RESEND_API_KEY");
console.log("1) Email (Resend)");
if (!RESEND_API_KEY) {
  check(RESEND_FAIL, RESEND_OK, "RESEND_API_KEY not set — no emails are sent.");
} else {
  check(RESEND_OK, RESEND_OK, `RESEND_API_KEY ${mask(RESEND_API_KEY)}`);
  check(RESEND_OK, RESEND_OK, `NOTIFY_EMAIL ${env("NOTIFY_EMAIL") ?? "contact@vedharagroup.com"}`);
  check(RESEND_OK, RESEND_OK, `RESEND_FROM ${env("RESEND_FROM") ?? 'Vedhara Website <noreply@vedharagroup.com>'}`);

  try {
    const domains = await (await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
      signal: AbortSignal.timeout(10000),
    })).json();
    const list = domains?.data ?? domains;
    if (Array.isArray(list) && list.length) {
      for (const d of list) {
        const okState = d.status === "verified";
        check(okState ? RESEND_OK : RESEND_WARN, RESEND_OK,
          `domain "${d.name}" → ${d.status}` +
          (okState ? " (VERIFIED)" : " — verify it in Resend, or use RESEND_FROM=onboarding@resend.dev to test"));
      }
    } else if (domains?.message) {
      check(RESEND_FAIL, RESEND_OK, `API responded: ${domains.message}`);
    } else {
      check(RESEND_WARN, RESEND_OK, "no domains found; add + verify the sender domain in Resend");
    }
  } catch (err) {
    check(RESEND_FAIL, RESEND_OK, `could not reach Resend: ${err.message}`);
  }

  if (process.argv.includes("--send")) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: env("RESEND_FROM") ?? "Vedhara Website <noreply@vedharagroup.com>",
          to: [env("NOTIFY_EMAIL") ?? "contact@vedharagroup.com"],
          subject: "[Vedhara] Lead-forwarding test",
          html: "<p>This is a test from scripts/verify-email-sheets.mjs. If you can read this, Resend is working.</p>",
        }),
        signal: AbortSignal.timeout(15000),
      });
      const body = await res.text();
      check(res.ok ? RESEND_OK : RESEND_FAIL, RESEND_OK,
        res.ok ? `test email sent (${mask(JSON.parse(body)?.id ?? "")})` : `send failed (${res.status}): ${body.slice(0, 300)}`);
    } catch (err) {
      check(RESEND_FAIL, RESEND_OK, `test send threw: ${err.message}`);
    }
  } else {
    console.log("  (use --send to also deliver a test email to NOTIFY_EMAIL)");
  }
}

/* ── 2. Google Sheets ─────────────────────────────────────────────────── */
const SHEETS_ID = env("GOOGLE_SHEETS_ID");
const CREDS = env("GOOGLE_SHEETS_CREDENTIALS");
const WEBHOOK = env("GOOGLE_SHEETS_WEBHOOK_URL");
console.log("\n2) Google Sheets");
if (SHEETS_ID && CREDS) {
  check(RESEND_OK, RESEND_OK, `Mode A (API) — spreadsheet id ${mask(SHEETS_ID, 6)}`);
  let creds = null;
  try {
    creds = JSON.parse(Buffer.from(CREDS, "base64").toString("utf8"));
    if (!creds.client_email || !creds.private_key) {
      check(RESEND_FAIL, RESEND_OK, "credential JSON is missing client_email/private_key");
    } else {
      check(RESEND_OK, RESEND_OK, `service account ${creds.client_email}`);
      try {
        const now = Math.floor(Date.now() / 1000);
        const b64url = (buf) => Buffer.from(buf).toString("base64").replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
        const assertion = [b64url(JSON.stringify({ alg: "RS256", typ: "JWT" })), b64url(JSON.stringify({ iss: creds.client_email, scope: "https://www.googleapis.com/auth/spreadsheets", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }))].join(".");
        const signer = createSign("RSA-SHA256");
        signer.update(assertion);
        signer.end();
        const jwt = `${assertion}.${b64url(signer.sign(creds.private_key))}`;
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }).toString(),
          signal: AbortSignal.timeout(10000),
        });
        const tokenData = await tokenRes.json();
        if (!tokenRes.ok || !tokenData.access_token) {
          check(RESEND_FAIL, RESEND_OK, `OAuth failed (${tokenRes.status}): ${JSON.stringify(tokenData).slice(0, 200)}`);
        } else {
          const meta = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}?fields=properties.title,sheets.properties.title`, {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
            signal: AbortSignal.timeout(10000),
          });
          if (meta.ok) {
            const m = await meta.json();
            check(RESEND_OK, RESEND_OK, `can read sheet "${m.properties?.title}" (first tab "${m.sheets?.[0]?.properties?.title}") — service account must have EDITOR access`);
          } else {
            check(RESEND_FAIL, RESEND_OK, `cannot access the spreadsheet (${meta.status}): ${(await meta.text()).slice(0, 200)} — share it with ${creds.client_email} as Editor`);
          }
        }
      } catch (err) {
        check(RESEND_FAIL, RESEND_OK, `auth/read threw: ${err.message}`);
      }
    }
  } catch {
    check(RESEND_FAIL, RESEND_OK, "GOOGLE_SHEETS_CREDENTIALS is NOT valid base64 of a service-account JSON (generate with: node scripts/sheets-env.mjs \"path/to/service-account.json\")");
  }
} else if (SHEETS_ID) {
  check(RESEND_FAIL, RESEND_OK, "GOOGLE_SHEETS_ID is set but GOOGLE_SHEETS_CREDENTIALS is missing");
} else if (CREDS) {
  check(RESEND_FAIL, RESEND_OK, "GOOGLE_SHEETS_CREDENTIALS is set but GOOGLE_SHEETS_ID is missing");
}

if (WEBHOOK) {
  check(RESEND_OK, RESEND_OK, `Mode B (webhook) configured → ${mask(WEBHOOK, 8)}`);
  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": env("GOOGLE_SHEETS_API_KEY") ?? "" },
      body: JSON.stringify({ diag: true, lead_id: `diag-${Date.now()}` }),
      signal: AbortSignal.timeout(30000),
    });
    const body = await res.text();
    let parsed = null;
    try { parsed = JSON.parse(body); } catch {}
    if (parsed?.diag === true) {
      check(RESEND_OK, RESEND_OK, `webhook answered OK — sheet "${parsed.sheet}", ${parsed.row} rows (no row appended)`);
    } else if (res.ok) {
      check(RESEND_WARN, RESEND_OK, `webhook returned ${res.status}: ${body.slice(0, 200)} (redeploy the updated scripts/GoogleSheetsAppScript.gs to enable diag) — if your deployment is older, a REAL row may have been appended`);
    } else {
      check(RESEND_FAIL, RESEND_OK, `webhook returned ${res.status}: ${body.slice(0, 200)} — check "Who has access → Anyone" in the Apps Script deployment`);
    }
  } catch (err) {
    check(RESEND_FAIL, RESEND_OK, `webhook POST threw: ${err.message}`);
  }
}
if (!SHEETS_ID && !CREDS && !WEBHOOK) {
  check(RESEND_FAIL, RESEND_OK, "no Sheets integration configured — set GOOGLE_SHEETS_ID+GOOGLE_SHEETS_CREDENTIALS (native API) or GOOGLE_SHEETS_WEBHOOK_URL (Apps Script)");
}

/* ── 3. Titan CRM ─────────────────────────────────────────────────────── */
console.log("\n3) Titan CRM");
if (on("TITAN_WEBHOOK_URL")) {
  check(RESEND_OK, RESEND_OK, `TITAN_WEBHOOK_URL ${mask(env("TITAN_WEBHOOK_URL"), 8)} (not probed — would create a CRM lead)`);
  if (on("TITAN_API_KEY")) check(RESEND_OK, RESEND_OK, `TITAN_API_KEY ${mask(env("TITAN_API_KEY"))}`);
} else {
  check(RESEND_FAIL, RESEND_OK, "TITAN_WEBHOOK_URL not set — leads are not sent to Titan.");
}

/* ── 4. Storage ───────────────────────────────────────────────────────── */
console.log("\n4) Lead storage");
if (on("SUPABASE_URL") && on("SUPABASE_SERVICE_ROLE_KEY")) {
  check(RESEND_OK, RESEND_OK, `Supabase configured (${mask(env("SUPABASE_URL"), 12)}) — check supabase/schema.sql was applied`);
} else {
  check(RESEND_WARN, RESEND_OK, "SUPABASE env not set — leads fall back to a local JSON file (ephemeral in Vercel's tmp dir)");
}

console.log("\nFix order: 1) verify Resend sender domain  →  2) share the sheet with the service account  →  3) redeploy the Apps Script if using Mode B  →  4) set maxDuration 60 on /api/consultation (already in code).");