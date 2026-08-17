#!/usr/bin/env node
/**
 * Deep crawl audit — walks the sitemap like a search-engine crawler and reports
 * SEO / structured-data / content / link / image issues for every page.
 * Usage: node scripts/crawl-audit.mjs <base-url>   e.g. node scripts/crawl-audit.mjs http://localhost:3100
 */
const BASE = process.argv[2] || "http://localhost:3100";

const strip = (s) => s.replace(/\s+/g, " ").trim();
const decodeEntities = (s) => s.replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const q = (html, re) => { const m = html.match(re); return m ? m[1] : null; };
const qAll = (html, re) => { const out = []; let m; const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g"); while ((m = r.exec(html))) out.push(m[1] !== undefined ? m[1] : m[0]); return out; };

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (compatible; VedharaAuditBot/1.0)" }, redirect: "follow" });
  const html = await res.text();
  return { status: res.status, finalUrl: res.url, html };
}

function extractJsonLd(html) {
  const blocks = [];
  for (const raw of qAll(html, /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/)) {
    try { const parsed = JSON.parse(raw); blocks.push(Array.isArray(parsed) ? parsed : [parsed]); }
    catch { blocks.push([{ __parseError: raw.slice(0, 120) }]); }
  }
  return blocks.flat();
}

async function main() {
  // 1) Discover URLs from sitemap
  let sitemap;
  try { sitemap = await fetchHtml(`${BASE}/sitemap.xml`); }
  catch (e) { console.error("SITEMAP FETCH FAILED:", e.message); process.exit(1); }
  // Rewrite production sitemap URLs to the local base being audited, so we
  // crawl the local build (not the live deployed site).
  const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].replace(/https?:\/\/www\.vedharagroup\.com/, BASE));
  console.log(`Discovered ${urls.length} URLs from sitemap.xml\n`);

  const allInternalLinks = new Set();
  const issues = [];
  const results = [];

  for (const u of urls) {
    let r;
    try { r = await fetchHtml(u); }
    catch (e) { issues.push({ page: u, issue: `FETCH ERROR: ${e.message.slice(0, 80)}` }); results.push({ url: u, status: "ERR" }); continue; }

    const html = r.html;
    const rec = { url: u, status: r.status, h1: 0, title: "", titleLen: 0, desc: "", descLen: 0, canonical: "", og: false, twitter: false, noindex: false, viewport: false, ldTypes: [], imgsNoAlt: 0, words: 0 };

    rec.status = r.status;
    rec.h1 = qAll(html, /<h1[^>]*>/).length;
    rec.title = q(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    if (rec.title) rec.titleLen = strip(rec.title).length;
    const desc = q(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    rec.desc = desc ? strip(decodeEntities(desc)) : "";
    rec.descLen = rec.desc.length;
    rec.canonical = q(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) || "";
    rec.og = /property=["']og:title["']/i.test(html) && /property=["']og:image["']/i.test(html);
    rec.twitter = /name=["']twitter:card["']/i.test(html);
    rec.noindex = /name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
    rec.viewport = /name=["']viewport["']/i.test(html);
    rec.ldTypes = extractJsonLd(html).filter(x => x && !x.__parseError).map(x => x["@type"]).flat().filter(Boolean);
    rec.ldParseErrors = extractJsonLd(html).filter(x => x && x.__parseError).length;

    // images without alt (excluding aria-hidden/decorative)
    const imgs = qAll(html, /<img[^>]*>/);
    rec.imgsNoAlt = imgs.filter(im => !/alt=/i.test(im) && !/aria-hidden=/i.test(im)).length;
    rec.totalImgs = imgs.length;

    // word count of visible text (strip scripts/styles/tags)
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z#0-9]+;/gi, " ");
    rec.words = strip(text).split(/\s+/).filter(Boolean).length;

    // internal links
    for (const href of qAll(html, /href=["'](\/[^"']*)["']/gi)) {
      const clean = href.split("#")[0].split("?")[0];
      if (clean && !clean.startsWith("//") && !clean.startsWith("http")) allInternalLinks.add(clean);
    }

    // ── Issue detection ──
    let p = "/";
    try { p = new URL(u).pathname; } catch { p = u.replace(BASE, ""); }
    if (r.status !== 200) issues.push({ page: p, issue: `HTTP ${r.status}` });
    if (rec.h1 !== 1) issues.push({ page: p, issue: `H1 count = ${rec.h1}` });
    if (!rec.title) issues.push({ page: p, issue: "Missing <title>" });
    else if (rec.titleLen > 62) issues.push({ page: p, issue: `Title ${rec.titleLen} chars (>62)` });
    if (!rec.desc) issues.push({ page: p, issue: "Missing meta description" });
    else if (rec.descLen < 50 || rec.descLen > 165) issues.push({ page: p, issue: `Description ${rec.descLen} chars (want 50-165)` });
    const canonicalPath = rec.canonical ? rec.canonical.replace(/https?:\/\/[^/]+/, "") : "";
    if (!rec.canonical) issues.push({ page: p, issue: "Missing canonical" });
    else if (canonicalPath !== p && !(p === "/" && canonicalPath === "")) issues.push({ page: p, issue: `Canonical mismatch: ${rec.canonical}` });
    if (!rec.og) issues.push({ page: p, issue: "Missing og:title or og:image" });
    if (!rec.twitter) issues.push({ page: p, issue: "Missing twitter:card" });
    if (rec.noindex) issues.push({ page: p, issue: "noindex present" });
    if (!rec.viewport) issues.push({ page: p, issue: "Missing viewport meta" });
    if (rec.ldTypes.length === 0) issues.push({ page: p, issue: "No JSON-LD structured data" });
    if (rec.ldParseErrors > 0) issues.push({ page: p, issue: `${rec.ldParseErrors} JSON-LD parse error(s)` });
    if (rec.imgsNoAlt > 0) issues.push({ page: p, issue: `${rec.imgsNoAlt}/${rec.totalImgs} images missing alt` });
    if (rec.words < 250) issues.push({ page: p, issue: `Thin content: ~${rec.words} words` });

    results.push(rec);
  }

  // 2) Verify every internal link resolves (no broken links / 404s)
  console.log("Checking internal links...");
  const brokenLinks = [];
  let checked = 0;
  for (const link of allInternalLinks) {
    if (link.startsWith("/_next") || link.startsWith("/api") || link.startsWith("/videos") || link.startsWith("/watch") || /\.(png|jpg|jpeg|webp|svg|mp4|ico|txt|xml)$/i.test(link)) continue;
    if (link.startsWith("/Images") || link.startsWith("/llms")) continue;
    checked++;
    try {
      const res = await fetch(BASE + link, { method: "GET", headers: { "user-agent": "VedharaAuditBot/1.0" }, redirect: "follow" });
      if (res.status === 404) brokenLinks.push({ link, status: res.status });
    } catch { brokenLinks.push({ link, status: "ERR" }); }
  }

  // 3) Duplicate detection
  const titleMap = new Map();
  const descMap = new Map();
  for (const r of results) {
    const t = r.titleLen ? `${strip(r.title).toLowerCase()}|${r.titleLen}` : "";
    const d = r.descLen ? r.desc.toLowerCase() : "";
    if (t) titleMap.set(t, (titleMap.get(t) || []).concat(r.url.replace(BASE, "")));
    if (d) descMap.set(d, (descMap.get(d) || []).concat(r.url.replace(BASE, "")));
  }
  const dupTitles = [...titleMap.entries()].filter(([, v]) => v.length > 1);
  const dupDescs = [...descMap.entries()].filter(([, v]) => v.length > 1);

  // ── Report ──
  console.log("\n══════════════════════ CRAWL SUMMARY ══════════════════════");
  console.log(`Pages crawled: ${results.length}   |   Internal links checked: ${checked}`);
  console.log(`Pages with issues: ${issues.length}\n`);

  if (issues.length) {
    console.log("── ISSUES ──");
    for (const i of issues) console.log(`  [${i.page}] ${i.issue}`);
  } else {
    console.log("  ✅ No per-page issues found!");
  }

  if (brokenLinks.length) {
    console.log(`\n── BROKEN INTERNAL LINKS (${brokenLinks.length}) ──`);
    for (const b of brokenLinks) console.log(`  ${b.status}: ${b.link}`);
  } else {
    console.log("\n  ✅ No broken internal links");
  }

  if (dupTitles.length) {
    console.log(`\n── DUPLICATE TITLES ──`);
    for (const [t, pages] of dupTitles) console.log(`  "${t}" → ${pages.join(", ")}`);
  } else console.log("\n  ✅ No duplicate titles");
  if (dupDescs.length) {
    console.log(`\n── DUPLICATE DESCRIPTIONS ──`);
    for (const [d, pages] of dupDescs) console.log(`  ${pages.join(", ")}`);
  } else console.log("  ✅ No duplicate descriptions");

  // Overview table
  console.log("\n── PER-PAGE OVERVIEW ──");
  for (const r of results) {
    const ld = r.ldTypes.length ? r.ldTypes.slice(0, 3).join(",") : "NONE";
    console.log(`  ${(r.status === 200 ? "OK " : "ERR")} ${r.url.replace(BASE, "").padEnd(34)} h1=${r.h1} title=${r.titleLen} desc=${r.descLen} words=${String(r.words).padStart(4)} imgs=${r.totalImgs}(noAlt ${r.imgsNoAlt}) ld=[${ld}]`);
  }
}

main().catch(e => { console.error("FATAL:", e); process.exit(1); });
