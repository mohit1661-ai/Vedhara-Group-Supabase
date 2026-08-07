const fs = require("fs");
const s = fs.readFileSync("lib/data/cityPages.ts", "utf8");
const lines = s.split("\n").filter((l) => /id:"(gg|nd|gn|sd|ch|mo|pk|fb|gz)-/.test(l));

// Check 1: within-page uniqueness
const cities = {};
for (const l of lines) {
  const id = l.match(/id:"([a-z]{2}-)/)[1];
  const img = l.match(/image:img\((\d+)\)/)[1];
  const title = l.match(/title:"([^"]+)"/)[1];
  if (!cities[id]) cities[id] = [];
  cities[id].push({ img, title });
}
let ok1 = true;
for (const c in cities) {
  const seen = {};
  const dups = [];
  for (const x of cities[c]) {
    if (seen[x.img]) dups.push(`  ${x.title} duplicates ${seen[x.img]} (both img ${x.img})`);
    else seen[x.img] = x.title;
  }
  if (dups.length) {
    ok1 = false;
    console.log("DUP in " + c + " (" + cities[c].length + " listings):");
    dups.forEach((d) => console.log(d));
  }
}
console.log(ok1 ? "CHECK 1 PASS: all 9 cities have unique images within each page" : "CHECK 1 FAIL");

// Check 2: same-named listings across pages keep same image
const byTitle = {};
for (const l of lines) {
  const img = l.match(/image:img\((\d+)\)/)[1];
  const title = l.match(/title:"([^"]+)"/)[1];
  if (!byTitle[title]) byTitle[title] = [];
  byTitle[title].push(img);
}
let ok2 = true;
for (const t in byTitle) {
  const uniq = [...new Set(byTitle[t])];
  if (byTitle[t].length > 1 && uniq.length > 1) {
    ok2 = false;
    console.log(`INCONSISTENT: "${t}" appears ${byTitle[t].length}x with images ${uniq.join(", ")}`);
  }
}
console.log(ok2 ? "CHECK 2 PASS: all same-named listings keep a consistent image across pages" : "CHECK 2 FAIL");

// Check 3: SITEWIDE — an image shared by DIFFERENT listings (different titles) is a conflict
const byImg = {};
for (const l of lines) {
  const img = l.match(/image:img\((\d+)\)/)[1];
  const title = l.match(/title:"([^"]+)"/)[1];
  const id = l.match(/id:"([a-z]{2}-\d+)"/)[1];
  if (!byImg[img]) byImg[img] = [];
  byImg[img].push({ id, title });
}
const conflicts = Object.entries(byImg).filter(([, ts]) => new Set(ts.map((x) => x.title)).size > 1);
console.log("SITEWIDE CONFLICTS (image shared by different listings): " + conflicts.length);
let need = 0;
for (const [, ts] of conflicts) need += ts.length - 1;
console.log("listings needing a NEW unique image: " + need);
for (const [img, ts] of conflicts) {
  console.log("  img " + img + " -> " + ts.map((x) => x.id + ":" + x.title).join(" | "));
}
