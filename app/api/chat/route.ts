/**
 * /api/chat
 *
 * POST: AI chatbot endpoint powered by OpenAI GPT-4o-mini.
 *
 * Features:
 *   - Answers property, listing, and company questions from a built-in knowledge base
 *   - Detects lead information (name, phone, email) during conversation
 *   - Saves captured leads to Supabase / local JSON file
 *   - Rate-limited to prevent abuse
 *   - Graceful fallback when OPENAI_API_KEY is not set
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { writeLead, generateId, type Lead } from "@/lib/leads";

/* ── Rate limiting (separate from consultation limiter) ─────── */
const chatStore = new Map<string, { count: number; resetAt: number }>();
const CHAT_WINDOW_MS = 10 * 60 * 1000;
const CHAT_MAX_HITS = 20;

function isChatRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = chatStore.get(ip);
  if (!entry || now > entry.resetAt) {
    chatStore.set(ip, { count: 1, resetAt: now + CHAT_WINDOW_MS });
    return false;
  }
  if (entry.count >= CHAT_MAX_HITS) return true;
  entry.count++;
  return false;
}

/* ── Lead detection ─────────────────────────────────────────── */
function detectLeadInfo(messages: { role: string; content: string }[]): {
  name?: string;
  phone?: string;
  email?: string;
} | null {
  const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content);
  const allText = userMessages.join(" ");

  const phoneMatch = allText.match(/(?:\+91|91|0)?[6-9]\d{9}/);
  const emailMatch = allText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

  // Simple name detection: look for "name is", "I am", "I'm", "call me" patterns
  const namePatterns = [
    /(?:my name is|i am|i'm|call me|i'm called)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /(?:name[:\s]+)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
  ];

  let name: string | undefined;
  for (const pattern of namePatterns) {
    const match = allText.match(pattern);
    if (match) {
      name = match[1].trim();
      break;
    }
  }

  if (!phoneMatch && !emailMatch && !name) return null;

  return {
    name: name || undefined,
    phone: phoneMatch?.[0] || undefined,
    email: emailMatch?.[0] || undefined,
  };
}

/* ── System prompt builder ──────────────────────────────────── */
function buildSystemPrompt(): string {
  return `You are Vedhara Group's AI property advisor — a friendly, knowledgeable assistant for real estate in Delhi NCR and North India.

## About Vedhara Group
- Independent real estate advisory and brokerage firm, founded 2015
- HQ: Sushant Lok Phase 3, Near DLF City Phase 2, Gurugram, Haryana
- Phone: +91-98106-47063 | Email: contact@vedharagroup.com
- Website: https://www.vedharagroup.com
- Hours: Mon–Fri 9AM–7PM, Sat–Sun 10AM–4PM
- Tagline: "Wisdom Rooted. Futures Built."
- Areas served: Delhi NCR, Gurugram, Noida, Faridabad, Manesar, Ghaziabad, Greater Noida, Chandigarh, Mohali, Panchkula, Zirakpur, Kharar

## Services
- Buy Property: Verified residential & commercial with 5-point Verification Framework
- Sell Property: Market analysis, professional photography, targeted marketing
- Rent/Lease: Tenant screening, lease management
- Commercial Real Estate: Office, retail, industrial spaces
- Investment Advisory: Market analysis, ROI projections, due diligence
- NRI Services: Remote property management for non-resident Indians
- Property Management: Ongoing maintenance and tenant relations
- Luxury Properties: Premium villas, penthouses, farmhouses

## Current Featured Listings

### Gurugram
1. HQ27 Premium Commercial Building — Near IFFCO Chowk & HUDA City Centre Metro — ₹2,250 Cr — Grade-A Commercial + Mall, 16 Floors + 3 Basements, ~6 Lakh sq.ft. Leasable, Rent ₹11.5 Cr/mo, 3 Acres, 280 Ft High, Managed by Bharti, Near NH-48 & IGI Airport
2. Rented Bank Property, Sector 76 — DLF Phase 6 — ₹2.22 Cr — 6 Ground-Floor Shops, 10-Yr Bank Lease, Rent ₹2.22 Lakh/mo, Next to DLF Privana
3. 3 Kay Plotted Residence — DLF Phase 1 — ₹25 Cr — 490 sq.yds.
4. Fully Furnished Pre-Rented Building — Sector 32 — ₹200 Cr — 1,25,000 sq.ft. Leased, Rent ₹1.17 Cr/mo
5. Sector 15 Duplex Kothi — ₹18 Cr — 502 sq.yds., 4 BHK + Servant Quarter
6. NH-8 Facing Plot, Sector 15 — ₹18.50 Cr — 500 sq.yds.
7. Commercial Building, Udyog Vihar 5 — ₹40 Cr — 1,000 sq.m.
8. MG Road Commercial Building — ₹25 Cr — 1,000 sq.m.
9. One Golf Course Penthouse — ₹12.80 Cr — 5 BHK + Pool, 4,200 sq.ft.
10. Amaryllis Residences — ₹6.20 Cr — 3 BHK + Servant, 2,150 sq.ft.
11. One Golden Mile — ₹8.50 Cr — 4,500 sq.ft. Office
12. Platinum Towers — ₹2.95 Cr — 3 BHK, Dwarka Expressway

### Noida
1. Ajnara Damsaz — ₹55 Lakh — 2 BHK, 1,095 sq.ft.
2. Ajnara Le Garden — ₹58 Lakh — 2 BHK, 1,115 sq.ft.
3. Exotica Blossom — ₹72 Lakh — 3 BHK, 1,390 sq.ft.
4. Ajnara Integrity — ₹68 Lakh — 3 BHK, 1,625 sq.ft.
5. Ajnara Homes — ₹48 Lakh — 2 BHK, 975 sq.ft.

### Faridabad
1. Sectors 79, 80, 81, 82, 85, 86, 87, 88, 89 — Various residential plots and apartments

### Chandigarh / Tricity
1. Hero Homes — Mohali — ₹76 Lakh — 2 & 3 BHK
2. Smart World — Sector 66, Gurugram
3. Sobha Dream Acres — Bengaluru

### South Delhi
1. Laxman Public School — Hauz Khas — ₹450 Cr — 8.5 Acres, Institutional

### Neemrana
1. Pre-Leased Industrial Estate — Ghiloth — ₹250 Cr — 20 Acres, MNC Tenant

## Response Guidelines
- Be friendly, professional, and concise
- Answer questions about specific properties using the listing data above
- If asked about a property not listed, say it's not in current inventory and offer to help find similar options
- Always suggest visiting the website for the latest listings and photos
- For pricing, always mention "asking price" as final prices may be negotiable
- When users share contact details (name, phone, email), acknowledge them warmly and mention a team member will reach out
- Keep responses under 150 words for chat readability
- Use the contact details: Phone +91-98106-47063, Email contact@vedharagroup.com
- Never make up listings or prices — only reference the data provided above
- For investment questions, mention that Vedhara offers independent advisory with comparable market data
- End responses with a relevant follow-up question when appropriate`;
}

/* ── POST handler ───────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isChatRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes." },
      { status: 429 }
    );
  }

  let body: { messages?: unknown[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "Messages array required" }, { status: 400 });
  }

  // Validate message format
  const messages = body.messages.filter(
    (m: unknown): m is { role: string; content: string } =>
      typeof m === "object" &&
      m !== null &&
      "role" in m &&
      "content" in m &&
      typeof (m as { role: unknown }).role === "string" &&
      typeof (m as { content: unknown }).content === "string"
  );

  if (messages.length === 0) {
    return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
  }

  // Check if OpenAI key is configured
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: "I'm currently unavailable. Please call us at +91-98106-47063 or email contact@vedharagroup.com for immediate assistance with property queries.",
      leadCaptured: false,
    });
  }

  // Build typed messages for OpenAI
  const chatMessages = [
    { role: "system" as const, content: buildSystemPrompt() },
    ...messages.slice(-20).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  // Detect lead info from conversation
  const leadInfo = detectLeadInfo(messages);
  let leadCaptured = false;

  if (leadInfo && (leadInfo.phone || leadInfo.email)) {
    const lead: Lead = {
      id: generateId(),
      full_name: leadInfo.name || "Chat User",
      phone: leadInfo.phone || "",
      email: leadInfo.email,
      interest: "general_enquiry",
      message: `Chatbot conversation: ${messages.slice(-3).map((m) => `${m.role}: ${m.content}`).join(" | ")}`,
      source_page: "ai_chatbot",
      ip,
      user_agent: req.headers.get("user-agent") || undefined,
      created_at: new Date().toISOString(),
    };

    try {
      await writeLead(lead);
      leadCaptured = true;
    } catch (err) {
      console.error("[Chatbot lead save failed]", err);
    }
  }

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "I couldn't process that. Please try again.";

    return NextResponse.json({ reply, leadCaptured });
  } catch (err) {
    console.error("[OpenAI error]", err);
    return NextResponse.json({
      reply: "I'm experiencing a technical issue. Please call us at +91-98106-47063 or email contact@vedharagroup.com for immediate help.",
      leadCaptured,
    });
  }
}
