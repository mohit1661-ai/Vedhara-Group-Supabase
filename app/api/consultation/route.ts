/**
 * /api/consultation
 *
 * POST: accepts a consultation request from the contact form.
 *
 * Flow:
 *  1. Rate-limit by IP (5 requests / 10 min)
 *  2. Validate + sanitise all fields server-side
 *  3. Save lead → Supabase (if configured) or local JSON file
 *  4. Send email notification via Resend (if RESEND_API_KEY set)
 *  5. Return structured JSON response
 */

import { NextRequest, NextResponse }         from "next/server";
import { writeLead, generateId, type Lead }  from "@/lib/leads";
import { sendLeadNotification }              from "@/lib/email";
import { sendLeadToTitan }                   from "@/lib/titan";
import { isRateLimited }                     from "@/lib/rateLimit";
import { validate, sanitise, type FormInput } from "@/lib/validation";

export async function POST(req: NextRequest) {
  // 1. Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success:false, error:"Too many requests. Please wait a few minutes before trying again." },
      { status:429 }
    );
  }

  // 2. Parse
  let body: FormInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success:false, error:"Invalid request format." },
      { status:400 }
    );
  }

  // 3. Validate
  const { valid, errors } = validate(body);
  if (!valid) {
    return NextResponse.json(
      { success:false, error:"Validation failed.", errors },
      { status:422 }
    );
  }

  // 4. Build lead (snake_case matches Supabase column names)
  const lead: Lead = {
    id:          generateId(),
    full_name:   sanitise(body.fullName, 80),
    phone:       sanitise(body.phone, 20).replace(/[\s\-()]/g, ""),
    email:       sanitise(body.email, 254) || undefined,
    interest:    sanitise(body.interest, 80),
    timezone:    sanitise(body.timezone, 100) || undefined,
    message:     sanitise(body.message, 2000) || undefined,
    source_page: sanitise(body.sourcePage, 200) || undefined,
    ip:          ip === "unknown" ? undefined : ip,
    user_agent:  req.headers.get("user-agent")?.slice(0, 200) ?? undefined,
    created_at:  new Date().toISOString(),
  };

  // 5. Save
  try {
    await writeLead(lead);
  } catch (err) {
    console.error("[Lead write failed]", err);
    // Continue; don't fail the user request over a save error
  }

  // 6. Email + Titan CRM (both non-blocking)
  sendLeadNotification(lead).catch(err =>
    console.error("[Email notification failed]", err)
  );
  sendLeadToTitan(lead).catch(err =>
    console.error("[Titan notification failed]", err)
  );

  // 7. Respond
  return NextResponse.json(
    {
      success: true,
      message: "Thank you. A Vedhara advisor will contact you within 24 hours.",
      id: lead.id,
    },
    { status:201 }
  );
}

export async function GET() {
  return NextResponse.json({ error:"Method not allowed." }, { status:405 });
}
