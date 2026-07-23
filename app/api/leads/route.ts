/**
 * /api/leads
 *
 * GET — returns all saved leads as JSON.
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
import { getLeads } from "@/lib/leads";

export async function GET(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET;

  // If no admin secret is set, disable this endpoint entirely
  if (!adminSecret || adminSecret === "change_this_to_a_strong_password") {
    return NextResponse.json(
      { error: "Admin access is not configured. Set ADMIN_SECRET in your environment variables." },
      { status: 503 }
    );
  }

  // Accept secret via Authorization header or ?secret= query param
  const authHeader = req.headers.get("authorization");
  const querySecret = new URL(req.url).searchParams.get("secret");

  const providedSecret =
    authHeader?.replace("Bearer ", "").trim() || querySecret;

  if (providedSecret !== adminSecret) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
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
