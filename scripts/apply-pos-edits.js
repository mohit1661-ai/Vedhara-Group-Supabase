// Apply machine-generated pos edits to lib/data/cityPages.ts from
// scripts/city-pos-edits.json. Each oldLine must match EXACTLY once.
// Usage: node scripts/apply-pos-edits.js
const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "..", "lib", "data", "cityPages.ts");
const edits = JSON.parse(
  fs.readFileSync(path.join(__dirname, "city-pos-edits.json"), "utf8").replace(/^\uFEFF/, "")
);

let src = fs.readFileSync(srcPath, "utf8");
let applied = 0;
const failures = [];

for (const e of edits) {
  const count = src.split(e.oldLine).length - 1;
  if (count !== 1) {
    failures.push({ listingId: e.listingId, count, snippet: e.oldLine.slice(0, 90) });
    continue;
  }
  src = src.replace(e.oldLine, e.newLine);
  applied++;
}

if (failures.length) {
  console.log("FAILURES (not applied):");
  failures.forEach((f) => console.log(`  ${f.listingId}: matched ${f.count}x :: ${f.snippet}`));
}

fs.writeFileSync(srcPath, src, "utf8");
console.log(`Applied ${applied} / ${edits.length} pos edits to cityPages.ts`);
