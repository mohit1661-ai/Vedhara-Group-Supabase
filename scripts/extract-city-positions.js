// Extract every city listing image (pexels id + current pos) from cityPages.ts
// Output: JSON of unique images + summary of which are at default center (50%).
// Usage: node scripts/extract-city-positions.js
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(
  path.join(__dirname, "..", "lib", "data", "cityPages.ts"),
  "utf8"
);

// Match image:img(ID) optionally followed by , pos:"VALUE" on the same object.
// We capture each listing object line to also see which city it belongs to.
const cityRegex = /(\w+):\s*\{[\s\S]*?\n\s*\},/g;
// Simpler: find each `image:img(\d+)` and check the surrounding text for pos.
const imgRegex = /image:\s*img\((\d+)\)/g;
const posRegex = /pos:\s*"([^"]+)"/;

const byId = new Map();
let m;
while ((m = imgRegex.exec(src)) !== null) {
  const id = Number(m[1]);
  // look for a pos within the following ~300 chars (same object)
  const tail = src.slice(m.index, m.index + 320);
  const pm = tail.match(posRegex);
  const pos = pm ? pm[1] : null; // null => no pos field (defaults to 50% 50%)
  if (!byId.has(id)) {
    byId.set(id, { id, pos, listings: 0 });
  }
  const rec = byId.get(id);
  rec.listings++;
  if (pm) rec.pos = pm[1];
}

const arr = Array.from(byId.values());

// A listing is "uncurated" if it has NO pos field, or pos is exactly "50%".
// (Authorities legitimately use "50% 70%" / "100%" / "79%" - keep those.)
const center = arr.filter((r) => !r.pos || r.pos === "50%");
const curated = arr.filter((r) => r.pos && r.pos !== "50%");

console.log("TOTAL unique images:", arr.length);
console.log("Curated (pos !== 50%):", curated.length);
console.log("At center default (pos 50% or none):", center.length);
console.log("");
console.log("--- Images at center default (need curation) ---");
center.forEach((r) =>
  console.log(
    `${r.id}\tlistings=${r.listings}\tpos=${r.pos || "none"}`
  )
);

fs.writeFileSync(
  path.join(__dirname, "city-images-input.json"),
  JSON.stringify(arr, null, 2)
);
console.log("\nWrote scripts/city-images-input.json");
