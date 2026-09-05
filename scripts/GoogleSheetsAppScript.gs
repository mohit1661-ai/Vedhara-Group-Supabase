/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Vedhara Group → Google Sheets (Excel) lead connector
 * ─────────────────────────────────────────────────────────────────────────────
 *  This Apps Script turns a plain Google Sheet into the "excel sheet" that
 *  receives every form submission from the Vedhara website the moment a
 *  visitor clicks "Book a Free Consultation".
 *
 *  A Google Sheet opens in Excel and can be exported to .xlsx anytime, so this
 *  is effectively an Excel-compatible lead sheet with zero monthly cost.
 *
 * ── SETUP (5 minutes, no coding) ─────────────────────────────────────────────
 *  1. Create a Google Sheet  →  https://sheets.new
 *  2. In the sheet: Extensions → Apps Script  (opens the script editor)
 *  3. Delete any placeholder code, paste THIS ENTIRE FILE, then Save (💾).
 *  4. Click  Deploy → New deployment → gear icon (⚙️) → select type "Web app".
 *  5. Settings:
 *       • Description      : Vedhara lead capture
 *       • Execute as       : Me  (your Google account)
 *       • Who has access   : Anyone
 *     → Click "Deploy", review permissions, then copy the "Web app" URL
 *       (it ends in /exec).
 *  6. Paste that URL into your environment as  GOOGLE_SHEETS_WEBHOOK_URL
 *     (Vercel → Project → Settings → Environment Variables, plus .env.local).
 *  7. Every new website lead now appends as a row to the "Leads" tab.
 *
 *  TIP: To test without submitting the site, run the `testWebhook` function
 *  (select it in the editor and click ▶ Run) — it posts a sample lead to the
 *  SAME webapp URL, which also verifies your deployment URL is live.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Column order used for the sheet ─────────────────────────────────────────
var HEADERS = [
  "Timestamp (IST)",
  "Lead ID",
  "Full Name",
  "Phone",
  "Email",
  "Interest",
  "Time Zone",
  "Source Page",
  "Message",
];

/** Receives POSTs from lib/sheets.ts and appends one row per lead. */
function doPost(e) {
  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    // Return a non-2xx so the site connector logs a failure.
    throw new Error("Invalid JSON payload");
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Leads");
  if (!sheet) {
    sheet = ss.insertSheet("Leads");
  }

  // Diagnostic probe: verify the URL/auth without appending a real row.
  if (data.diag === true) {
    return json_({
      success: true,
      diag: true,
      sheet: sheet.getName(),
      row: sheet.getLastRow(),
      lead_id: String(data.lead_id || ""),
    });
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  var istTime = Utilities.formatDate(
    new Date(),
    "Asia/Kolkata",
    "yyyy-MM-dd HH:mm:ss"
  );

  sheet.appendRow([
    istTime,
    String(data.lead_id || ""),
    String(data.full_name || data.name || ""),
    String(data.phone || ""),
    String(data.email || ""),
    String(data.interest || data.service || ""),
    String(data.timezone || ""),
    String(data.source_page || ""),
    String(data.message || data.notes || ""),
  ]);

  return json_({ success: true, row: sheet.getLastRow() });
}

/** Quick smoke test — run this manually after deploying to verify the URL. */
function testWebhook() {
  var url = ScriptApp.getService().getUrl();
  var payload = {
    lead_id:     "test-" + Date.now(),
    full_name:   "Test Visitor",
    phone:       "+91 90000 00000",
    email:       "test@example.com",
    interest:    "Buy Property",
    timezone:    "IST, GMT+5:30",
    source_page: "/contact",
    message:     "This is a test row from testWebhook().",
    created_at:  new Date().toISOString(),
  };
  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
  Logger.log("Test lead sent to: " + url);
}

/** Helper: JSON response. (TextOutput has no status-code setter, so Apps
 *  Script always returns 200 on success / 500 on a thrown error.) */
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
