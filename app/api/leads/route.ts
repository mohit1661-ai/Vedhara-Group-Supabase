/**
 * /api/leads
 *
 * GET: returns all saved leads as JSON.
 * Protected by ADMIN_SECRET env var.
 *
 * Usage:
 *   curl https://www.vedharagroup.com/api/leads \
 *     -H "Authorization: Bearer YOUR_ADMIN_SECRET"
 *
 * Or open in browser:
 *   https://www.vedharagroup.com/api/leads?secret=YOUR_ADMIN_SECRET
 */

import { NextRequest, NextResponse } from "next/server";
import { getLeads, updateLead, LEAD_STATUSES, type LeadUpdate } from "@/lib/leads";
import { isValidAdminToken } from "@/lib/adminAuth";

/**
 * Returns "unconfigured" (503), "unauthorized" (401), or null (authorized).
 * A null admin secret / placeholder leaves the endpoint disabled entirely.
 */
type AdminGate = { ok: true } | { ok: false; status: 503 | 401; error: string };

function adminGate(req: NextRequest, adminSecret?: string): AdminGate {
  // If no admin secret is set, disable these endpoints entirely
  if (!adminSecret || adminSecret === "change_this_to_a_strong_password") {
    return {
      ok: false,
      status: 503,
      error:
        "Admin access is not configured. Set ADMIN_SECRET in your environment variables.",
    };
  }

  // Accept secret via Authorization header or ?secret= query param
  const authHeader = req.headers.get("authorization");
  const querySecret = new URL(req.url).searchParams.get("secret");

  const providedSecret =
    authHeader?.replace("Bearer ", "").trim() || querySecret;

  if (providedSecret === adminSecret) return { ok: true };

  // Also accept a valid admin session cookie (set by /api/admin/login)
  if (isValidAdminToken(req.cookies.get("vg_admin_session")?.value)) {
    return { ok: true };
  }

  return { ok: false, status: 401, error: "Unauthorized." };
}

export async function GET(req: NextRequest) {
  const gate = adminGate(req, process.env.ADMIN_SECRET);
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  try {
    const leads = await getLeads();
    return NextResponse.json(
      {
        total: leads.length,
        leads,
        generatedAt: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          // Don't cache lead data
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err) {
    console.error("[Leads read failed]", err);
    return NextResponse.json(
      { error: "Failed to read leads." },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/leads
 *
 * Updates a single lead's CRM fields (status and/or notes). Used by the admin
 * dashboard. Same ADMIN_SECRET guard as the GET handler.
 *
 * Body: { "id": "lead_...", "status": "contacted", "notes": "..." }
 */
export async function PATCH(req: NextRequest) {
  const gate = adminGate(req, process.env.ADMIN_SECRET);
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Invalid request format." },
      { status: 400 }
    );
  }

  const { id, status, notes } = body as Record<string, unknown>;

  if (typeof id !== "string" || id.trim().length === 0) {
    return NextResponse.json({ error: "id is required." }, { status: 422 });
  }

  const update: LeadUpdate = { id: id.trim() };

  if (status !== undefined) {
    if (!LEAD_STATUSES.includes(status as never)) {
      return NextResponse.json(
        { error: `status must be one of: ${LEAD_STATUSES.join(", ")}.` },
        { status: 422 }
      );
    }
    update.status = status as LeadUpdate["status"];
  }

  if (notes !== undefined) {
    if (typeof notes !== "string") {
      return NextResponse.json({ error: "notes must be a string." }, { status: 422 });
    }
    update.notes = notes.slice(0, 2000);
  }

  if (update.status === undefined && update.notes === undefined) {
    return NextResponse.json(
      { error: "Nothing to update. Provide status and/or notes." },
      { status: 422 }
    );
  }

  try {
    await updateLead(update);
    return NextResponse.json({ success: true, id: update.id });
  } catch (err) {
    console.error("[Lead update failed]", err);
    return NextResponse.json(
      { error: "Failed to update lead." },
      { status: 500 }
    );
  }
}
