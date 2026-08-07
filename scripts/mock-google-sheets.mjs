/**
 * scripts/mock-google-sheets.mjs
 *
 * Local mock of Google's OAuth2 token endpoint + Sheets API, used to verify
 * the native Google Sheets connector (lib/sheets.ts) end-to-end without a real
 * Google account. It:
 *   • generates a throwaway RSA keypair,
 *   • writes a fake service-account JSON + prints its base64,
 *   • verifies the RS256 JWT signature on /token,
 *   • serves spreadsheet metadata + values.append on the Sheets endpoints.
 *
 * Run:   node scripts/mock-google-sheets.mjs      (listens on port 9997)
 * Then start the site with:
 *   GOOGLE_SHEETS_ID=1Fy6kUI9ooPDHME5qbD1pDCuTFCgPTBsUvUhM29EY_TU
 *   GOOGLE_SHEETS_CREDENTIALS=<base64 printed below>
 *   GOOGLE_OAUTH_TOKEN_URL=http://localhost:9997/token
 *   GOOGLE_SHEETS_API_BASE=http://localhost:9997
 */

import { createServer } from "http";
import { generateKeyPairSync, createVerify } from "crypto";
import { writeFileSync } from "fs";

const PORT = 9997;
const SPREADSHEET_ID = "1Fy6kUI9ooPDHME5qbD1pDCuTFCgPTBsUvUhM29EY_TU";
const CLIENT_EMAIL = "vedhara-test@vedhara-group.iam.gserviceaccount.com";

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

const fakeCreds = {
  type: "service_account",
  project_id: "vedhara-group-mock",
  private_key_id: "mock",
  private_key: privateKey,
  client_email: CLIENT_EMAIL,
  client_id: "mock",
  token_uri: "https://oauth2.googleapis.com/token",
};
const credsB64 = Buffer.from(JSON.stringify(fakeCreds)).toString("base64");
writeFileSync(".mock-service-account.json", JSON.stringify(fakeCreds, null, 2));

console.log("[MOCK-GOOGLE] fake service account written → .mock-service-account.json");
console.log("[MOCK-GOOGLE] GOOGLE_SHEETS_CREDENTIALS=" + credsB64);
console.log(`[MOCK-GOOGLE] listening on http://localhost:${PORT}`);

const send = (res, code, obj) => {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // ── OAuth token endpoint ────────────────────────────────────────────────
  if (req.method === "POST" && url.pathname === "/token") {
    let body = "";
    for await (const c of req) body += c;
    const params = new URLSearchParams(body);
    const assertion = params.get("assertion") || "";
    const [h, p, sig] = assertion.split(".");
    if (!h || !p || !sig) return send(res, 401, { error: "malformed jwt" });

    const verifier = createVerify("RSA-SHA256");
    verifier.update(h + "." + p);
    verifier.end();
    const ok = verifier.verify(publicKey, Buffer.from(sig, "base64"));
    if (!ok) return send(res, 401, { error: "bad signature" });

    const payload = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
    console.log(`[MOCK-GOOGLE] ✅ JWT verified → iss=${payload.iss} scope=${payload.scope}`);
    return send(res, 200, { access_token: "mock-token", token_type: "Bearer", expires_in: 3600 });
  }

  // ── Spreadsheet metadata (GET /v4/spreadsheets/:id) ─────────────────────
  if (req.method === "GET" && url.pathname === `/v4/spreadsheets/${SPREADSHEET_ID}`) {
    console.log("[MOCK-GOOGLE] spreadsheet metadata requested");
    return send(res, 200, { spreadsheetId: SPREADSHEET_ID, sheets: [{ properties: { title: "Sheet1" } }] });
  }

  // ── values.append (POST /v4/spreadsheets/:id/values/:range:append) ──────
  if (req.method === "POST" && url.pathname.includes(":append")) {
    let body = "";
    for await (const c of req) body += c;
    const { values } = JSON.parse(body || "{}");
    console.log("[MOCK-GOOGLE] ✅ append received → row:", JSON.stringify(values?.[0]));
    return send(res, 200, { spreadsheetId: SPREADSHEET_ID, updates: { updatedRows: values?.length || 1 } });
  }

  send(res, 404, { error: "not found" });
});

server.listen(PORT);
