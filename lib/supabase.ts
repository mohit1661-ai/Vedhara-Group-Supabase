/**
 * lib/supabase.ts
 *
 * Single Supabase client instance for server-side use.
 * Uses the SERVICE ROLE key (never expose to browser).
 *
 * Setup:
 *  1. Go to supabase.com → New Project
 *  2. Project Settings → API → copy URL and service_role key
 *  3. Add both to .env.local (and Vercel environment variables)
 */

import { createClient } from "@supabase/supabase-js";

const url  = process.env.SUPABASE_URL;
const key  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  // Warn at startup, don't crash (static pages still work)
  console.warn(
    "[Supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.\n" +
    "Leads will fall back to local JSON file storage."
  );
}

export const supabase =
  url && key
    ? createClient(url, key, {
        auth: { persistSession: false }, // server-side: no session needed
      })
    : null;

export const supabaseConfigured = Boolean(url && key);
