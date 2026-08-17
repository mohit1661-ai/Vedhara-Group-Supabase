#!/usr/bin/env node
/**
 * scripts/sheets-env.mjs
 *
 * Generates the GOOGLE_SHEETS_CREDENTIALS value from a Google service-account
 * JSON file, plus the spreadsheet ID for this project.
 *
 * Usage:
 *   node scripts/sheets-env.mjs "path/to/service-account.json"
 *
 * The output is safe to paste directly into .env.local / Vercel env vars.
 */

import { readFileSync } from "fs";

const SPREADSHEET_ID = "1Fy6kUI9ooPDHME5qbD1pDCuTFCgPTBsUvUhM29EY_TU";

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/sheets-env.mjs "path/to/service-account.json"');
  process.exit(1);
}

let creds;
try {
  creds = JSON.parse(readFileSync(file, "utf8"));
} catch (err) {
  console.error("Could not read/parse the JSON file:", err.message);
  process.exit(1);
}

if (!creds.client_email || !creds.private_key) {
  console.error(
    "This does not look like a Google service-account JSON (missing client_email / private_key)."
  );
  process.exit(1);
}

const b64 = Buffer.from(JSON.stringify(creds)).toString("base64");

console.log("\n── Copy these into .env.local AND Vercel → Environment Variables ──\n");
console.log(`GOOGLE_SHEETS_ID=${SPREADSHEET_ID}`);
console.log(`GOOGLE_SHEETS_CREDENTIALS=${b64}`);
console.log("\n── Next steps ──");
console.log(`1. Open your spreadsheet and click Share → add ${creds.client_email} as an Editor.`);
console.log("2. Paste the two values above into your environment.");
console.log("3. Submit the contact form — each lead is appended as a new row.\n");
