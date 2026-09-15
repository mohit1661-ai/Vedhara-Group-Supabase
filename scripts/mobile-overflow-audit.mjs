import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";

const ROUTES = [
  "/", "/about", "/team", "/services", "/success-stories", "/careers", "/contact",
  "/buy", "/sell", "/sell/valuation", "/rent", "/commercial", "/luxury",
  "/new-launches", "/investment-advisory", "/nri-services", "/property-management",
  "/verification-center", "/calculators", "/how-we-charge", "/gurugram",
  "/noida", "/greater-noida", "/faridabad", "/ghaziabad", "/south-delhi",
  "/chandigarh", "/mohali", "/panchkula", "/tricity", "/mathura-vrindavan",
  "/market-insights", "/blog", "/blog/buy-vs-rent-delhi-ncr-2026", "/insights",
  "/insights/dwarka-expressway-18-month-price-trend-explained", "/faq",
  "/case-studies", "/videos", "/watch/homepage-hero-video-desktop", "/privacy",
  "/terms", "/search",
];

const WIDTHS = [360, 390, 414, 768, 820, 1024];

const browser = await chromium.launch();

async function auditWidth(w) {
  const context = await browser.newContext({
    viewport: { width: w, height: 844 },
    isMobile: w < 768,
    hasTouch: w < 768,
  });
  // Abort video streams (never affect layout width, but they keep the network busy forever)
  await context.route("**/*.mp4*", (r) => r.abort());
  const page = await context.newPage();
  const out = [];
  for (const route of ROUTES) {
    try {
      await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.waitForTimeout(700);
      const meas = await Promise.race([
        page.evaluate(() => {
          const de = document.documentElement;
          const docWidth = Math.max(de.scrollWidth, document.body.scrollWidth);
          const vw = window.innerWidth;
          const offenders = [];
          if (docWidth > vw + 1) {
            for (const el of document.querySelectorAll("body *")) {
              const r = el.getBoundingClientRect();
              if (r.width > vw + 1) {
                offenders.push({
                  tag: el.tagName,
                  cls: (typeof el.className === "string" ? el.className : "").slice(0, 50),
                  w: Math.round(r.width),
                });
                if (offenders.length >= 6) break;
              }
            }
          }
          return { overflow: docWidth - vw, offenders };
        }),
        new Promise((res) => setTimeout(() => res({ overflow: -1, offenders: [], timeout: true }), 5000)),
      ]);
      out.push({ w, route, ...meas });
    } catch (e) {
      out.push({ w, route, overflow: -2, offenders: [], error: String(e).slice(0, 100) });
    }
  }
  await context.close();
  return out;
}

const all = await Promise.all(WIDTHS.map(auditWidth));
await browser.close();

const flat = all.flat();
const bad = flat.filter((r) => r.overflow > 0 || r.overflow < 0);
for (const r of bad) {
  const off = (r.offenders || []).map((o) => `${o.tag}[${o.cls}](${o.w})`).join(" | ");
  console.log(`${String(r.w).padStart(4)}px  ${(r.route || "").padEnd(44)} ov=${r.overflow} ${r.error || ""} ${off}`);
}
console.log(`\n${ROUTES.length * WIDTHS.length} checks done, problem pages: ${bad.length}`);
