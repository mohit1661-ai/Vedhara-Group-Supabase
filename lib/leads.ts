/**
 * lib/leads.ts
 *
 * Lead storage with automatic fallback:
 *
 *   Supabase configured → saves to Supabase Postgres
 *   Supabase not configured → saves to local JSON file
 *
 * This means the site works in development without any setup,
 * and automatically uses Supabase once env vars are set.
 *
 * DATABASE SCHEMA (run once in Supabase SQL Editor):
 * ─────────────────────────────────────────────────────
 *   See: supabase/schema.sql  (included in this project)
 * ─────────────────────────────────────────────────────
 */

import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { supabase, supabaseConfigured } from "./supabase";

// ── Types ──────────────────────────────────────────────────
export interface Lead {
  id:          string;
  full_name:   string;
  phone:       string;
  email?:      string;
  interest:    string;
  timezone?:   string;
  message?:    string;
  source_page?: string;
  ip?:         string;
  user_agent?: string;
  created_at:  string;
  // Supabase adds these automatically:
  status?:     "new" | "contacted" | "converted" | "closed";
  notes?:      string;
}

// ── File fallback ──────────────────────────────────────────
const DATA_DIR =
  process.env.VERCEL
    ? path.join(os.tmpdir(), "vedhara")
    : path.join(process.cwd(), "data");

const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readLeadsFromFile(): Promise<Lead[]> {
  try {
    await ensureDir();
    const raw = await fs.readFile(LEADS_FILE, "utf8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

async function writeLeadToFile(lead: Lead): Promise<void> {
  await ensureDir();
  const leads = await readLeadsFromFile();
  leads.unshift(lead);
  await fs.writeFile(
    LEADS_FILE,
    JSON.stringify(leads.slice(0, 500), null, 2),
    "utf8"
  );
}

// ── Supabase ───────────────────────────────────────────────
async function writeLeadToSupabase(lead: Lead): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.from("leads").insert({
    id:          lead.id,
    full_name:   lead.full_name,
    phone:       lead.phone,
    email:       lead.email || null,
    interest:    lead.interest,
    timezone:    lead.timezone || null,
    message:     lead.message || null,
    source_page: lead.source_page || null,
    ip:          lead.ip || null,
    user_agent:  lead.user_agent || null,
    created_at:  lead.created_at,
    status:      "new",
  });

  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
}

async function getLeadsFromSupabase(): Promise<Lead[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) throw new Error(`Supabase select failed: ${error.message}`);
  return (data as Lead[]) ?? [];
}

// ── Public API (auto-switches between Supabase / file) ─────
export async function writeLead(lead: Lead): Promise<void> {
  if (supabaseConfigured) {
    try {
      await writeLeadToSupabase(lead);
      console.log(`[Lead → Supabase] id=${lead.id} name="${lead.full_name}"`);
      return;
    } catch (err) {
      console.error("[Supabase write failed, falling back to file]", err);
    }
  }
  // Fallback
  await writeLeadToFile(lead);
  console.log(`[Lead → File] id=${lead.id} name="${lead.full_name}"`);
}

export async function getLeads(): Promise<Lead[]> {
  if (supabaseConfigured) {
    try {
      return await getLeadsFromSupabase();
    } catch (err) {
      console.error("[Supabase read failed, falling back to file]", err);
    }
  }
  return readLeadsFromFile();
}

export function generateId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
