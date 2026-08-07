# Vedhara Group — Official Website

North India's independent real estate advisory firm. Verified listings, transparent fees and free tools across **Delhi NCR, Faridabad, Manesar, Chandigarh Tricity & North India** — built to rank, to load fast, and to be fully understandable by search engines **and LLMs**.

**Live site:** https://www.vedharagroup.com

---

## ✨ What makes this site world-class

- **SEO (Lighthouse 100 / 100)** — one H1 per page, exact-match titles ≤ 60 chars, meta descriptions 50–165 chars, canonical URLs, Open Graph + Twitter cards, XML sitemap, robots.txt.
- **Structured data everywhere** — Organization / RealEstateAgent / LocalBusiness, WebSite + SearchAction (sitelinks search box), FAQPage, Article, Service, HowTo, ContactPage, ItemList → VideoObject.
- **Page speed** — self-hosted fonts (next/font), CSS-driven hero animations (no JS-gated LCP), preload="metadata" hero videos with poster fallback, rAF loops that pause when the tab is hidden, CLS 0.
- **LLM-ready** — public/llms.txt (index) + public/llms-full.txt (full company profile), both declared in the HTML head via link rel="llms.txt" / link rel="llms-full". robots.ts explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
- **Accessibility** — WCAG-conscious contrast, focus-visible outlines, aria-hidden decorative elements, alt text on all content images.
- **Security** — nosniff, X-Frame-Options, strict Referrer-Policy, restrictive Permissions-Policy, long-lived cache headers for media.

---

## 🚀 Tech Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS 4** + a custom navy/gold design system in app/globals.css
- **Supabase** (optional, lead storage) · **Resend** (optional, email) · **Titan** (optional, CRM webhook) · **Google Sheets** (optional, Excel lead sheet via Apps Script webhook)

---

## 🧑‍💻 Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build & run:

```bash
npm run build
npm start          # serves the production build
```

Type-check & lint:

```bash
npx tsc --noEmit
npm run lint
```

---

## 🔑 Environment Variables

Copy `.env.example` → `.env.local` and fill in the values. **Never commit `.env.local`** — add the same variables to your host (Vercel → Project → Settings → Environment Variables).

| Variable | Required | Purpose |
|---|---|---|
| `SUPABASE_URL` | No* | Project URL (e.g. `https://xxxx.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | No* | Server-side key (bypasses RLS — never expose to the browser) |
| `RESEND_API_KEY` | No | Send email notifications for new leads |
| `NOTIFY_EMAIL` | No | Recipient for lead notifications |
| `TITAN_WEBHOOK_URL` | No | Titan CRM webhook endpoint |
| `TITAN_API_KEY` | No | Bearer token for the Titan webhook |
| `TITAN_LEAD_SOURCE` | No | Lead source label sent to Titan |
| `GOOGLE_SHEETS_ID` | No | Spreadsheet ID from your share link (native API mode) |
| `GOOGLE_SHEETS_CREDENTIALS` | No | Base64 of the service-account JSON (native API mode) |
| `GOOGLE_SHEETS_WEBHOOK_URL` | No | Google Sheets/Excel web-app URL (webhook mode) |
| `GOOGLE_SHEETS_API_KEY` | No | Optional secret header (`x-api-key`) for the sheet webhook |
| `GOOGLE_OAUTH_TOKEN_URL` | No | Advanced: override Google's OAuth token endpoint (testing/proxy) |
| `GOOGLE_SHEETS_API_BASE` | No | Advanced: override the Sheets API base URL (testing/proxy) |
| `ADMIN_SECRET` | No | Password to view leads via /api/leads |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL (defaults to https://www.vedharagroup.com) |

\* Without Supabase vars, leads fall back to a local JSON file (data/leads.json) — fine for dev, but set them in production for durable storage.

---

## 📊 Google Sheets / Excel Lead Connector

Every "Book a Free Consultation" submission is written to **Supabase**, **emailed** to `contact@vedharagroup.com` (via Resend), **forwarded to your CRM** (Titan) when configured, and **appended as a row to your Google Sheet** (opens in Excel, exportable to .xlsx).

**This project's spreadsheet:**
`https://docs.google.com/spreadsheets/d/1Fy6kUI9ooPDHME5qbD1pDCuTFCgPTBsUvUhM29EY_TU`

Pick one of two modes:

### Option A — Native Google Sheets API (recommended)
Writes directly to the spreadsheet by ID using a service account. One-time setup (~5 min):

1. **Google Cloud Console** → create/select a project → **APIs & Services → Enable the Google Sheets API**.
2. **Create a service account** (Credentials → Create credentials → Service account) and **download its JSON key**.
3. Open the spreadsheet above → **Share** → add the service account email (from the JSON `client_email`) as **Editor**.
4. Generate the two env values:
   ```bash
   node scripts/sheets-env.mjs "path/to/service-account.json"
   ```
5. Paste the printed `GOOGLE_SHEETS_ID` + `GOOGLE_SHEETS_CREDENTIALS` into `.env.local` and Vercel.

Each lead is appended to the **first tab** of the spreadsheet as a row:
`Timestamp (IST) · Lead ID · Full Name · Phone · Email · Interest · Time Zone · Source Page · Message`.

### Option B — Apps Script webhook (zero keys)
1. In the spreadsheet: **Extensions → Apps Script** → paste **`scripts/GoogleSheetsAppScript.gs`** → Save.
2. **Deploy → New deployment → ⚙️ → Web app** → *Execute as:* **Me** → *Who has access:* **Anyone** → Deploy.
3. Copy the `/exec` URL into `GOOGLE_SHEETS_WEBHOOK_URL` (Vercel + `.env.local`).
4. Run `testWebhook` in the Apps Script editor to verify.

> `GOOGLE_SHEETS_WEBHOOK_URL` can also point to any spreadsheet automation
> (Zapier, Make, n8n, SheetDB, Excel Power Automate) — it just needs to accept
> a JSON POST and store the row.

> Dev/testing: `scripts/mock-google-sheets.mjs` runs a local fake OAuth + Sheets
> server so you can verify the native connector without touching Google.

---

## ☁️ Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New Project → Import** the repo.
3. Framework preset is auto-detected as **Next.js**. Build command: `next build`.
4. Add the environment variables from `.env.example`.
5. Deploy. The site builds 42/42 pages statically; API routes (/api/consultation, /api/leads, /api/health) are serverless.

The domain `www.vedharagroup.com` → project domain; add `vedharagroup.com` as a redirect alias in Vercel domain settings.

---

## 🔍 SEO & LLM Tooling

- **scripts/crawl-audit.mjs** — deep crawl audit like a search-engine crawler:
  ```bash
  node scripts/crawl-audit.mjs http://localhost:3000
  ```
  Checks every sitemap URL for status, H1 count, title/description length, canonical, OG/Twitter tags, noindex, viewport, JSON-LD validity, image alt text, thin content, broken internal links, and duplicate titles/descriptions.
- **Lighthouse** (production):
  ```bash
  npx lighthouse http://localhost:3000 --only-categories=performance,seo,accessibility,best-practices --output=json --output-path=report.json
  ```

---

## 🗂️ Key Folders

```
app/                    # App Router pages (each with its own metadata + JSON-LD)
components/
  sections/             # CinematicHero, VideoHeroSection, FAQSection, etc.
  seo/JsonLd.tsx        # JSON-LD renderer
  layout/               # Navbar, Footer, Breadcrumbs
lib/
  data/blogPosts.ts     # Blog content + metaTitle/metaDescription
  supabase.ts, email.ts, titan.ts, sheets.ts, leads.ts, validation.ts, rateLimit.ts
public/
  llms.txt              # LLM index (per llms.txt spec)
  llms-full.txt         # Full LLM-readable company profile
scripts/crawl-audit.mjs # Crawler audit tool
scripts/GoogleSheetsAppScript.gs # Apps Script → Google Sheets lead receiver
```

---

## 📄 License

Proprietary — © Vedhara Group Pvt. Ltd. All rights reserved.
