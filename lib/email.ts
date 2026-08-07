/**
 * lib/email.ts
 * Optional email notification via Resend REST API.
 * No SDK, plain fetch. Zero extra dependencies.
 * If RESEND_API_KEY is not set, this is a silent no-op.
 */

import type { Lead } from "./leads";

export async function sendLeadNotification(lead: Lead): Promise<void> {
  const apiKey  = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_EMAIL || "contact@vedharagroup.com";
  // Sender can be overridden (e.g. RESEND_FROM="onboarding@resend.dev" to test
  // before the domain is verified; use the real sender once verified).
  const fromAddr = process.env.RESEND_FROM || "Vedhara Website <noreply@vedharagroup.com>";

  if (!apiKey) {
    console.log("[Email] RESEND_API_KEY not set, skipping notification");
    return;
  }

  const rows = [
    ["Name",        lead.full_name],
    ["Phone",       lead.phone],
    ["Email",       lead.email || "-"],
    ["Interest",    lead.interest],
    ["Time Zone",   lead.timezone || "-"],
    ["Source Page", lead.source_page || "-"],
    ["Status",      lead.status || "new"],
    ["Lead ID",     lead.id],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f6ef;">
      <div style="background:#0f1e38;padding:24px 28px;margin-bottom:24px;">
        <h1 style="color:#d4aa52;font-size:20px;margin:0;font-weight:600;">New Consultation Request</h1>
        <p style="color:rgba(255,255,255,0.6);font-size:12px;margin:6px 0 0;">
          Vedhara Group · ${new Date(lead.created_at).toLocaleString("en-IN",{ timeZone:"Asia/Kolkata" })} IST
        </p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:white;">
        ${rows.map(([label,value])=>`
          <tr style="border-bottom:1px solid #f0ede0;">
            <td style="padding:12px 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#5a6070;width:130px;">${label}</td>
            <td style="padding:12px 16px;font-size:14px;color:#2a2d35;">${value}</td>
          </tr>
        `).join("")}
        ${lead.message ? `
          <tr>
            <td style="padding:12px 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#5a6070;vertical-align:top;">Message</td>
            <td style="padding:12px 16px;font-size:14px;color:#2a2d35;line-height:1.7;">${lead.message.replace(/\n/g,"<br/>")}</td>
          </tr>
        ` : ""}
      </table>
      <div style="margin-top:20px;padding:14px 18px;background:#fff8e6;border-left:3px solid #d4aa52;">
        <p style="margin:0;font-size:13px;color:#5a6070;">
          Respond within 24 hours.
          WhatsApp: <a href="https://wa.me/919810647063" style="color:#b8922a;">+91 98106 47063</a>
        </p>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization":`Bearer ${apiKey}`, "Content-Type":"application/json" },
      body: JSON.stringify({
        from:    fromAddr,
        to:      [toEmail],
        subject: `New Lead: ${lead.full_name}, ${lead.interest}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[Email] Resend error:", await res.text());
    } else {
      console.log("[Email] Notification sent to", toEmail);
    }
  } catch (err) {
    console.error("[Email] Failed:", err);
  }
}
