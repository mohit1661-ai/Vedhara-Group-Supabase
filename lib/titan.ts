/**
 * lib/titan.ts
 *
 * Titan CRM lead connector.
 *
 * Sends each consultation lead to your Titan CRM account via a lead-capture
 * webhook / REST endpoint. Configure in environment variables:
 *
 *   TITAN_WEBHOOK_URL   – the Titan endpoint that creates a lead
 *                         (e.g. https://app.titancrm.com/api/v1/leads or a
 *                         webhook URL Titan provides under Settings → API)
 *   TITAN_API_KEY       – optional secret/API token. Sent as "Authorization:
 *                         Bearer <key>" header when present.
 *   TITAN_LEAD_SOURCE   – optional label identifying this source
 *                         (defaults to "Vedhara Website")
 *
 * If TITAN_WEBHOOK_URL is not set, this is a silent no-op so the rest of the
 * site keeps working (Supabase + email + local file fallback).
 */

import type { Lead } from "./leads";

export async function sendLeadToTitan(lead: Lead): Promise<void> {
  const webhookUrl = process.env.TITAN_WEBHOOK_URL;
  const apiKey     = process.env.TITAN_API_KEY;

  if (!webhookUrl) {
    console.log("[Titan] TITAN_WEBHOOK_URL not set, skipping");
    return;
  }

  const source = process.env.TITAN_LEAD_SOURCE || "Vedhara Website";

  // Field mapping – adjust to match the exact field names in your Titan
  // account (common names are listed; unmapped fields are simply ignored).
  const payload: Record<string, unknown> = {
    name:        lead.full_name,
    full_name:   lead.full_name,
    phone:       lead.phone,
    mobile:      lead.phone,
    email:       lead.email || "",
    interest:    lead.interest,
    service:     lead.interest,
    timezone:    lead.timezone || "",
    message:     lead.message || "",
    notes:       lead.message || "",
    source:      source,
    lead_source: source,
    source_page: lead.source_page || "",
    ip:          lead.ip || "",
    user_agent:  lead.user_agent || "",
    lead_id:     lead.id,
    created_at:  lead.created_at,
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent":   "Vedhara-Group-Website/1.0",
  };
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      // Don't let a slow external CRM delay the form response
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error(
        `[Titan] Request failed (${res.status}):`,
        (await res.text()).slice(0, 500)
      );
      return;
    }
    console.log(
      `[Titan → CRM] lead=${lead.id} name="${lead.full_name}" (${res.status})`
    );
  } catch (err) {
    console.error("[Titan] Failed:", err);
  }
}
