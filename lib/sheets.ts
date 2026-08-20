/**
 * lib/sheets.ts
 * Google Sheets / Excel lead connector.
 *
 * Every "Book a Free Consultation" submission is appended as a new row to
 * your Google Sheet (Excel-compatible). Two supported modes:
 *
 *   A) NATIVE GOOGLE SHEETS API (recommended), writes directly to a specific
 *      spreadsheet using a service account. Uses the spreadsheet ID from the
 *      share link:
 *
 *        GOOGLE_SHEETS_ID          → id from the share URL
 *                                    (e.g. .../spreadsheets/d/<ID>/edit)
 *        GOOGLE_SHEETS_CREDENTIALS → base64 of your service-account JSON
 *                                    (generate: node scripts/sheets-env.mjs
 *                                     "path/to/service-account.json")
 *
 *      One-time Google setup (5 min): create a service account, enable the
 *      Google Sheets API, then share your spreadsheet with the service
 *      account's email as an Editor. See README → "Google Sheets Connector".
 *
 *   B) APPS SCRIPT WEBHOOK, a zero-key alternative. Paste
 *      scripts/GoogleSheetsAppScript.gs into the spreadsheet's Apps Script,
 *      Deploy → Web app, then set GOOGLE_SHEETS_WEBHOOK_URL.
 *
 * If nothing is configured this is a silent no-op so the rest of the site
 * keeps working (Supabase + email + Titan + local file fallback).
 */

import { createSign } from "crypto";
import type { Lead } from "./leads";

const SHEETS_ID       = process.env.GOOGLE_SHEETS_ID;
const CREDENTIALS_B64 = process.env.GOOGLE_SHEETS_CREDENTIALS;
const WEBHOOK_URL     = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const WEBHOOK_KEY     = process.env.GOOGLE_SHEETS_API_KEY;

// Advanced: override the Google endpoints (used for testing / proxies).
const TOKEN_URL = process.env.GOOGLE_OAUTH_TOKEN_URL || "https://oauth2.googleapis.com/token";
const API_BASE  = process.env.GOOGLE_SHEETS_API_BASE  || "https://sheets.googleapis.com";

const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=+$/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function decodeCreds(): ServiceAccount | null {
  if (!CREDENTIALS_B64) return null;
  try {
    const parsed = JSON.parse(
      Buffer.from(CREDENTIALS_B64, "base64").toString("utf8")
    ) as Partial<ServiceAccount>;
    if (parsed.client_email && parsed.private_key) {
      return { client_email: parsed.client_email, private_key: parsed.private_key };
    }
  } catch (err) {
    console.error(
      "[Sheets] GOOGLE_SHEETS_CREDENTIALS is not a valid base64 service-account JSON",
      err
    );
  }
  return null;
}

/** Exchange a signed JWT for an OAuth2 access token (service-account auth). */
async function getAccessToken(creds: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss:  creds.client_email,
    scope: SCOPES,
    aud:  "https://oauth2.googleapis.com/token",
    iat:  now,
    exp:  now + 3600,
  };
  const assertion = [
    base64url(JSON.stringify(header)),
    base64url(JSON.stringify(payload)),
  ].join(".");

  const signer = createSign("RSA-SHA256");
  signer.update(assertion);
  signer.end();
  const signature = base64url(signer.sign(creds.private_key));
  const jwt = `${assertion}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }).toString(),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    throw new Error(`OAuth token failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("OAuth token response missing access_token");
  return data.access_token;
}

/** First sheet tab's title (we append to the first tab so any sheet works). */
async function firstSheetTitle(token: string): Promise<string> {
  const res = await fetch(
    `${API_BASE}/v4/spreadsheets/${SHEETS_ID}?fields=sheets.properties.title`,
    { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10000) }
  );
  if (!res.ok) {
    throw new Error(`Spreadsheet lookup failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
  const data = (await res.json()) as { sheets?: { properties?: { title?: string } }[] };
  const title = data.sheets?.[0]?.properties?.title;
  if (!title) throw new Error("Spreadsheet has no sheets");
  return title;
}

/** One row per lead, column order matches scripts/GoogleSheetsAppScript.gs. */
function toRow(lead: Lead): string[] {
  const ist = new Date(lead.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  return [
    ist,                 // Timestamp (IST)
    lead.id,             // Lead ID
    lead.full_name,      // Full Name
    lead.phone,          // Phone
    lead.email || "",    // Email
    lead.interest,       // Interest
    lead.timezone || "", // Time Zone
    lead.source_page || "", // Source Page
    lead.message || "",  // Message
  ];
}

/** Mode A, native Google Sheets API append. */
async function appendViaApi(token: string, lead: Lead): Promise<void> {
  const sheet = await firstSheetTitle(token);
  const range = encodeURIComponent(`${sheet}!A1`);
  const url =
    `${API_BASE}/v4/spreadsheets/${SHEETS_ID}/values/${range}:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [toRow(lead)] }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    throw new Error(`Sheets append failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
  const data = (await res.json()) as { updates?: { updatedRows?: number } };
  console.log(
    `[Sheets → Google Sheets] lead=${lead.id} name="${lead.full_name}" ` +
    `sheet="${sheet}" rows=${data.updates?.updatedRows ?? "?"}`
  );
}

/** Mode B, Apps Script / Zapier / Make webhook append. */
async function appendViaWebhook(lead: Lead): Promise<void> {
  const payload: Record<string, unknown> = {
    lead_id:     lead.id,
    full_name:   lead.full_name,
    name:        lead.full_name,
    phone:       lead.phone,
    email:       lead.email || "",
    interest:    lead.interest,
    service:     lead.interest,
    timezone:    lead.timezone || "",
    source_page: lead.source_page || "",
    message:     lead.message || "",
    notes:       lead.message || "",
    ip:          lead.ip || "",
    user_agent:  lead.user_agent || "",
    created_at:  lead.created_at,
  };
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent":   "Vedhara-Group-Website/1.0",
  };
  if (WEBHOOK_KEY) headers["x-api-key"] = WEBHOOK_KEY;

  const res = await fetch(WEBHOOK_URL!, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    // Apps Script web apps have a cold-start + 302 redirect, so allow up to
    // 30s. This runs non-blocking so it never delays the form response.
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) {
    throw new Error(`Webhook failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
  console.log(`[Sheets → Google Sheets] lead=${lead.id} name="${lead.full_name}" (${res.status})`);
}

export async function appendLeadToGoogleSheets(lead: Lead): Promise<void> {
  try {
    // Mode A, native API (uses the spreadsheet ID from the share link).
    if (SHEETS_ID && CREDENTIALS_B64) {
      const creds = decodeCreds();
      if (!creds) return;
      const token = await getAccessToken(creds);
      await appendViaApi(token, lead);
      return;
    }
    // Mode B, webhook (Apps Script / Zapier / Make).
    if (WEBHOOK_URL) {
      await appendViaWebhook(lead);
      return;
    }
    console.log(
      "[Sheets] Not configured (GOOGLE_SHEETS_ID+GOOGLE_SHEETS_CREDENTIALS or GOOGLE_SHEETS_WEBHOOK_URL), skipping"
    );
  } catch (err) {
    console.error("[Sheets] Failed:", err);
  }
}
