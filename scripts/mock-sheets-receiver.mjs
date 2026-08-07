/**
 * scripts/mock-sheets-receiver.mjs
 *
 * Local mock of the Google Sheets Apps Script web-app endpoint, used to verify
 * that lib/sheets.ts posts the lead correctly. Saves every received lead to
 * ./mock-sheets-leads.jsonl and prints a summary line.
 *
 * Run:  node scripts/mock-sheets-receiver.mjs   (listens on port 9999)
 */

import { createServer } from "http";
import { appendFileSync } from "fs";

const PORT = 9999;

const server = createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    if (req.method === "POST") {
      const line = `${new Date().toISOString()}  ${req.url}  ${body}`;
      appendFileSync("./mock-sheets-leads.jsonl", line + "\n");
      console.log(`[MOCK-SHEETS] received → ${body.slice(0, 400)}`);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, row: 1 }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, msg: "mock google sheets webhook" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`[MOCK-SHEETS] listening on http://localhost:${PORT}`);
});
