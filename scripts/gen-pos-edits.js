// Generate per-listing objectPosition (pos) edits for cityPages.ts
// Only touches UNcurated listings (pos absent or "50%"). Leaves curated ones.
// Applies computed pos only when it clearly differs from center (outside 45-55).
// Output: prints lines and writes scripts/city-pos-edits.json
const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "..", "lib", "data", "cityPages.ts");
const src = fs.readFileSync(srcPath, "utf8");
const lines = src.split("\n");

const results = JSON.parse(
  fs.readFileSync(path.join(__dirname, "city-image-fit-results.json"), "utf8").replace(/^\uFEFF/, "")
);
const rec = new Map(results.map((r) => [String(r.id), r]));

const edits = [];
let scanned = 0, uncurated = 0, toChange = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idm = line.match(/id:"([^"]+)"/);
  const imgm = line.match(/image:\s*img\((\d+)\)/);
  if (!idm || !imgm) continue;
  scanned++;

  const listingId = idm[1];
  const pexels = imgm[1];
  const posm = line.match(/pos:\s*"([^"]+)"/);
  const hasPos = !!posm;
  const cur = posm ? posm[1] : null;

  // only uncurated
  if (cur && cur !== "50%") continue;
  uncurated++;

  const r = rec.get(pexels);
  if (!r) continue;
  const recom = r.recommended; // e.g. "72%"

  // skip if computed is effectively center
  const num = parseInt(recom, 10);
  if (num >= 45 && num <= 55) continue; // keep 50%

  const oldLine = line;
  let newLine;
  if (hasPos) {
    newLine = line.replace(/pos:\s*"50%"/, `pos:"${recom}"`);
  } else {
    // insert pos right after image:img(ID)
    newLine = line.replace(
      /(image:\s*img\(\d+\))/,
      `$1, pos:"${recom}"`
    );
  }
  toChange++;
  edits.push({ listingId, pexels, cur: cur || "50%", recom, oldLine, newLine });
}

console.log(`Scanned ${scanned} listing objects`);
console.log(`Uncurated (50%/none): ${uncurated}`);
console.log(`Needs pos change: ${toChange}`);
console.log("");
edits.forEach((e) =>
  console.log(
    `${e.listingId}\tpexels=${e.pexels}\t${e.cur} -> ${e.recom}`
  )
);

fs.writeFileSync(
  path.join(__dirname, "city-pos-edits.json"),
  JSON.stringify(edits, null, 2)
);
console.log("\nWrote scripts/city-pos-edits.json");
