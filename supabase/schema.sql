-- ═══════════════════════════════════════════════════════════
-- Vedhara Group — Supabase Database Schema
--
-- HOW TO RUN:
--   1. Go to supabase.com → your project
--   2. Click "SQL Editor" in left sidebar
--   3. Paste this entire file and click "Run"
--   That's it — all tables, indexes, and policies created.
-- ═══════════════════════════════════════════════════════════


-- ── 1. LEADS TABLE ────────────────────────────────────────
-- Stores every consultation form submission.

CREATE TABLE IF NOT EXISTS leads (
  -- Primary key (format: lead_<timestamp>_<random>)
  id            TEXT PRIMARY KEY,

  -- Contact details
  full_name     TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT,

  -- What they enquired about
  interest      TEXT NOT NULL,
  timezone      TEXT,              -- NRI clients fill this in
  message       TEXT,

  -- Metadata
  source_page   TEXT,             -- which page the form was on
  ip            TEXT,             -- for spam analysis
  user_agent    TEXT,

  -- CRM workflow (update manually or via Supabase dashboard)
  status        TEXT NOT NULL DEFAULT 'new'
                CHECK (status IN ('new','contacted','converted','closed')),
  notes         TEXT,             -- internal advisor notes

  -- Timestamps
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ── 2. INDEXES ────────────────────────────────────────────
-- Fast queries for the admin dashboard.

CREATE INDEX IF NOT EXISTS idx_leads_created_at
  ON leads (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_status
  ON leads (status);

CREATE INDEX IF NOT EXISTS idx_leads_interest
  ON leads (interest);

CREATE INDEX IF NOT EXISTS idx_leads_phone
  ON leads (phone);


-- ── 3. ROW LEVEL SECURITY ─────────────────────────────────
-- Enable RLS — this means the table is locked down by default.
-- Our API route uses the SERVICE ROLE key which bypasses RLS,
-- so this only affects direct client/browser access (which we
-- don't use — but good security practice regardless).

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- No public access — only service role can read/write
-- (service role key is only used server-side in our API routes)
DROP POLICY IF EXISTS "No public access" ON leads;
CREATE POLICY "No public access" ON leads
  FOR ALL USING (false);


-- ── 4. USEFUL VIEWS ───────────────────────────────────────
-- Run these in SQL Editor to get quick stats.

-- Lead summary by status
CREATE OR REPLACE VIEW leads_by_status AS
SELECT
  status,
  COUNT(*) as count,
  MIN(created_at) as oldest,
  MAX(created_at) as newest
FROM leads
GROUP BY status
ORDER BY count DESC;

-- Lead summary by interest area
CREATE OR REPLACE VIEW leads_by_interest AS
SELECT
  interest,
  COUNT(*) as count,
  COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted
FROM leads
GROUP BY interest
ORDER BY count DESC;

-- Leads this month
CREATE OR REPLACE VIEW leads_this_month AS
SELECT *
FROM leads
WHERE created_at >= DATE_TRUNC('month', NOW())
ORDER BY created_at DESC;


-- ── 5. VERIFY ─────────────────────────────────────────────
-- After running, confirm with:
SELECT 'Schema created successfully' AS result;
SELECT COUNT(*) AS lead_count FROM leads;
