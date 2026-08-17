<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Vedhara Group — Next.js 16 static marketing site

Real-estate advisory marketing site (Next.js 16 / React 19 / Tailwind CSS 4, npm). No git repo, no tests, no CI — a clean `npm run build` is the real gate.

## Commands
- `npm run dev` — dev server on :3000 (Turbopack)
- `npm run lint` — ESLint (flat config, eslint-config-next)
- `npx tsc --noEmit` — typecheck (there is no `typecheck` script)
- `node scripts/crawl-audit.mjs http://localhost:3000` — SEO audit (run against a running dev server)

## Architecture
- All pages are statically generated at build; the only runtime code is the route handlers `app/api/{consultation,leads,health}/route.ts`.
- City pages (`/gurugram`, `/noida`, `/chandigarh`, ...) are thin files rendering `CityPageTemplate` from data in `lib/data/cityPages.ts` — edit the data file, not the page. Same pattern: `ServicePageTemplate` + `lib/data/servicePages.ts`.
- Blog content lives in `lib/data/blogPostsNew.ts`, re-exported (plus extra posts) by `lib/data/blogPosts.ts`. `app/blog/*` and `app/sitemap.ts` import `blogPosts`.
- `app/sitemap.ts` hardcodes the page URL list; `app/robots.ts` disallows `/videos/` for most bots. Register new routes in the sitemap.
- SEO is a core convention: each page has its own `metadata` + exactly one H1 + JSON-LD via `components/seo/JsonLd.tsx`. Preserve it when adding pages.
- Design tokens are CSS custom properties in `app/globals.css` (`--navy`, `--gold`, `--cream`, `--t-display`, ...); components use them via inline styles/classes, not Tailwind utilities.

## Lead form pipeline (`/api/consultation`)
- Rate limiter is in-memory (5 req / 10 min / IP) and resets on every cold start — don't make it "more durable".
- Leads go to Supabase (service-role key) when `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are set, else fall back to `data/leads.json` (tmpdir on Vercel). All env vars are optional; the site must work with none set.
- Resend email, Titan CRM, and Google Sheets forwarding are fire-and-forget (`.catch()`, never awaited).
- DB schema is `supabase/schema.sql`, applied manually in the Supabase SQL editor — no migration tooling, no supabase CLI.
- `/api/leads` is guarded by `ADMIN_SECRET`; the placeholder `change_this_to_a_strong_password` disables it (503).
- README references `.env.example`, but that file does NOT exist in the repo — env vars are only documented in README's table.

## Media
- Hero videos exist twice: `public/videos/` and `public/watch/` (byte-identical) plus `thumb-*.jpg` posters. New/updated hero videos must be mirrored to both (`scripts/swap-compressed-videos.ps1`).
- Video filenames contain spaces — URL-encode them in `videoSrc` (e.g. `/videos/FAQ%20Hub%20Hero%20Video.mp4`).
- Listing/brand images live in `public/Images/` (capital I). `next.config.ts` allows remote images from Unsplash/Pexels/Pixabay only.
- The `scripts/*.ps1` video pipeline scripts have hardcoded machine-specific paths — one-off ops tools, not portable.
