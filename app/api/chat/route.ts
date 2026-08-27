/**
 * /api/chat
 *
 * POST: AI chatbot for Vedhara Group.
 *
 * Two-layer approach:
 *   1. Local knowledge base answers from site data (always works, no API key needed)
 *   2. OpenAI GPT-4o-mini for richer conversational answers (when OPENAI_API_KEY set)
 *
 * Lead detection + save runs on every request regardless of AI provider.
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { writeLead, generateId, type Lead } from "@/lib/leads";

/* ── Rate limiting ──────────────────────────────────────────── */
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
  name?: string; phone?: string; email?: string;
} | null {
  const allText = messages.filter((m) => m.role === "user").map((m) => m.content).join(" ");
  const phoneMatch = allText.match(/(?:\+91|91|0)?[6-9]\d{9}/);
  const emailMatch = allText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const namePatterns = [
    /(?:my name is|i am|i'm|call me|i'm called)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /(?:name[:\s]+)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
  ];
  let name: string | undefined;
  for (const p of namePatterns) { const m = allText.match(p); if (m) { name = m[1].trim(); break; } }
  if (!phoneMatch && !emailMatch && !name) return null;
  return { name, phone: phoneMatch?.[0], email: emailMatch?.[0] };
}

/* ════════════════════════════════════════════════════════════════
   LOCAL KNOWLEDGE BASE — answers without OpenAI
   ════════════════════════════════════════════════════════════════ */

const LISTINGS_Gurugram = [
  { n:"HQ27 Premium Commercial Building", l:"Near IFFCO Chowk & HUDA City Centre Metro", p:"₹2,250 Cr", d:"Grade-A Commercial + Mall, 16 Floors + 3 Basements, ~6 Lakh sq.ft. Leasable, Rent ₹11.5 Cr/mo, 3 Acres, Managed by Bharti, Near NH-48 & IGI Airport" },
  { n:"Rented Bank Property, Sector 76", l:"DLF Phase 6", p:"₹2.22 Cr", d:"6 Ground-Floor Shops, 10-Yr Bank Lease, Rent ₹2.22 Lakh/mo, Next to DLF Privana" },
  { n:"3 Kay Plotted Residence", l:"DLF Phase 1", p:"₹25 Cr", d:"490 sq.yds." },
  { n:"Fully Furnished Pre-Rented Building", l:"Sector 32", p:"₹200 Cr", d:"1,25,000 sq.ft. Leased, Rent ₹1.17 Cr/mo, Single Tenant" },
  { n:"Sector 15 Duplex Kothi", l:"Sector 15 Part 2", p:"₹18 Cr", d:"502 sq.yds., 4 BHK + Servant Quarter" },
  { n:"NH-8 Facing Plot", l:"Sector 15 Part 2", p:"₹18.50 Cr", d:"500 sq.yds." },
  { n:"Commercial Building, Udyog Vihar 5", l:"Udyog Vihar Phase 5", p:"₹40 Cr", d:"1,000 sq.m." },
  { n:"MG Road Commercial Building", l:"Sector 16", p:"₹25 Cr", d:"1,000 sq.m." },
  { n:"One Golf Course Penthouse", l:"Golf Course Road", p:"₹12.80 Cr", d:"5 BHK + Pool, 4,200 sq.ft." },
  { n:"Amaryllis Residences", l:"Golf Course Road", p:"₹6.20 Cr", d:"3 BHK + Servant, 2,150 sq.ft., Possession Dec 2026" },
  { n:"One Golden Mile", l:"Sector 62", p:"₹8.50 Cr", d:"4,500 sq.ft. Office, LEED Platinum" },
  { n:"Platinum Towers", l:"Dwarka Expressway", p:"₹2.95 Cr", d:"3 BHK, Possession Dec 2026" },
];

const LISTINGS_Noida = [
  { n:"Ajnara Damsaz", p:"₹55 Lakh", d:"2 BHK, 1,095 sq.ft." },
  { n:"Ajnara Le Garden", p:"₹58 Lakh", d:"2 BHK, 1,115 sq.ft." },
  { n:"Exotica Blossom", p:"₹72 Lakh", d:"3 BHK, 1,390 sq.ft." },
  { n:"Ajnara Integrity", p:"₹68 Lakh", d:"3 BHK, 1,625 sq.ft." },
  { n:"Ajnara Homes", p:"₹48 Lakh", d:"2 BHK, 975 sq.ft." },
];

const LISTINGS_OTHER = [
  { n:"Hero Homes", l:"Mohali", p:"₹76 Lakh", d:"2 & 3 BHK" },
  { n:"Pre-Leased Industrial Estate", l:"Ghiloth, Neemrana", p:"₹250 Cr", d:"20 Acres, MNC Tenant" },
  { n:"Laxman Public School", l:"Hauz Khas, South Delhi", p:"₹450 Cr", d:"8.5 Acres, Institutional" },
];

function matchKeywords(q: string, words: string[]): boolean {
  return words.some((w) => q.includes(w));
}

function buildLocalAnswer(lastUserMsg: string): string {
  const q = lastUserMsg.toLowerCase();

  // Greeting
  if (matchKeywords(q, ["hi","hello","hey","good morning","good evening","namaste","sup"])) {
    return "Hello! Welcome to Vedhara Group. I can help you with properties in Delhi NCR — pricing, locations, listings, or our services. What are you looking for?";
  }

  // How does Vedhara work / about us
  if (matchKeywords(q, ["how does","how do","how it works","about vedhara","about you","who are","what is vedhara","what do you"])) {
    return "Vedhara Group is an independent real estate advisory firm (est. 2015) based in Gurugram. We help you buy, sell, or invest in properties across Delhi NCR with a 5-point Verification Framework — RERA check, builder history, approvals, price fairness, and title verification.\n\nHere's how we work:\n1. You share your requirements\n2. We shortlist verified options\n3. We arrange site visits with honest assessments\n4. Legal/title due diligence\n5. Price negotiation with market data\n6. Paperwork & registration support\n\nWe're builder-independent, so our advice is always in YOUR interest. Call us at +91-98106-47063 to get started!";
  }

  // Sell
  if (matchKeywords(q, ["sell","selling","sell my","want to sell"])) {
    return "Thinking of selling? Here's how Vedhara helps:\n\n1. Market Analysis — we study comparable sales in your area to set the right asking price\n2. Professional Photography — high-quality visuals for portal listings\n3. Targeted Marketing — we list across major portals and our investor network\n4. Buyer Screening — we vet buyers before sharing your details\n5. Negotiation — we use market data to get you the best deal\n6. Paperwork — registration, transfer, and handover support\n\nShare your property details (location, size, type) and I'll connect you with our sell team. You can also call +91-98106-47063.";
  }

  // Buy
  if (matchKeywords(q, ["buy","buying","buy a","want to buy","purchase","looking for","looking to buy"])) {
    return "Great! We have verified properties across Delhi NCR. To help you better, could you share:\n\n- Budget range\n- Preferred location (Gurugram, Noida, Faridabad, Chandigarh?)\n- Property type (apartment, plot, commercial, luxury?)\n- BHK preference (if residential)\n\nHere are some highlights from our current inventory:\n- Gurugram: ₹2.95 Cr to ₹25 Cr (residential & commercial)\n- Noida: ₹48 Lakh to ₹72 Lakh (2-3 BHK apartments)\n- Chandigarh: ₹76 Lakh (Hero Homes, Mohali)\n\nAll listings come with our 5-point Verification Framework. Call +91-98106-47063 for personalized shortlisting.";
  }

  // Commercial
  if (matchKeywords(q, ["commercial","office","shop","retail","mall","warehouse","industrial","pre-rented","leased"])) {
    return "We have strong commercial inventory across Delhi NCR:\n\nGurugram:\n• HQ27 Premium Commercial Building — ₹2,250 Cr — Grade-A + Mall, ~6 Lakh sq.ft., Rent ₹11.5 Cr/mo\n• Rented Bank Property, Sector 76 — ₹2.22 Cr — 6 shops, 10-yr lease, ₹2.22 Lakh/mo rent\n• Pre-Rented Building, Sector 32 — ₹200 Cr — 1.25 Lakh sq.ft., ₹1.17 Cr/mo rent\n• Commercial Building, Udyog Vihar 5 — ₹40 Cr\n• MG Road Commercial Building — ₹25 Cr\n• One Golden Mile — ₹8.50 Cr — 4,500 sq.ft. office\n\nNeemrana: Pre-Leased Industrial Estate — ₹250 Cr — 20 Acres\n\nAll asking prices are negotiable. Want details on any specific property?";
  }

  // Investment
  if (matchKeywords(q, ["invest","investment","roi","appreciation","best area","where to invest","growth"])) {
    return "Great question! Here are the top investment areas we recommend:\n\nGurugram:\n• Dwarka Expressway — new launches, strong appreciation potential\n• Golf Course Road — premium, stable returns\n• Sector 76–82 — affordable commercial with rental income\n• Udyog Vihar — established commercial corridor\n\nNoida:\n• Noida Expressway corridor — infrastructure-driven growth\n• Greater Noida West — affordable housing demand\n\nFaridabad:\n• Sectors 79–89 — emerging residential zone\n\nChandigarh Tricity:\n• Mohali — IT hub growth, rental demand\n• Zirakpur — residential demand\n\nWe provide independent investment advisory with ROI projections and market analysis. Call +91-98106-47063 for a personalized investment plan.";
  }

  // Gurugram listings
  if (matchKeywords(q, ["gurugram","gurgaon","dlf","sector","udyog vihar","mg road","golf course","dwarka expressway","iffco"])) {
    const items = LISTINGS_Gurugram.map((l,i) => `${i+1}. ${l.n} — ${l.p}${l.l ? ' — '+l.l : ''}`).join("\n");
    return `Here are our current Gurugram listings:\n\n${items}\n\nAll prices are asking prices and negotiable. Want details on any specific property?`;
  }

  // Noida listings
  if (matchKeywords(q, ["noida","greater noida","ajnara","exotica"])) {
    const items = LISTINGS_Noida.map((l,i) => `${i+1}. ${l.n} — ${l.p} — ${l.d}`).join("\n");
    return `Here are our Noida listings:\n\n${items}\n\nAll prices are asking prices. Want to schedule a site visit?`;
  }

  // Faridabad
  if (matchKeywords(q, ["faridabad"])) {
    return "We have residential options in Faridabad across Sectors 79–89 — apartments and plots in the emerging development zone. Share your budget and I'll help shortlist. You can also call +91-98106-47063 for details.";
  }

  // Chandigarh / Tricity / Mohali
  if (matchKeywords(q, ["chandigarh","tricity","mohali","panchkula","zirakpur","kharar"])) {
    return "Chandigarh Tricity listings:\n• Hero Homes, Mohali — ₹76 Lakh — 2 & 3 BHK apartments\n\nWe also cover Panchkula, Zirakpur, and Kharar. Want to explore options in the Tricity area? Call +91-98106-47063.";
  }

  // South Delhi
  if (matchKeywords(q, ["south delhi","delhi","hauz khas"])) {
    return "South Delhi listing:\n• Laxman Public School — Hauz Khas — ₹450 Cr — 8.5 Acres, Institutional\n\nWe cover properties across Delhi NCR. What area are you interested in?";
  }

  // Luxury
  if (matchKeywords(q, ["luxury","premium","villa","penthouse","farmhouse","high end"])) {
    return "Our premium/luxury properties:\n• One Golf Course Penthouse — ₹12.80 Cr — 5 BHK + Pool, 4,200 sq.ft.\n• Amaryllis Residences — ₹6.20 Cr — 3 BHK + Servant, Golf Course Road\n• 3 Kay Plotted Residence — ₹25 Cr — DLF Phase 1, 490 sq.yds.\n• Sector 15 Duplex Kothi — ₹18 Cr — 4 BHK + Servant\n\nAll luxury listings include exclusive amenities and prime locations. Want to schedule a private viewing?";
  }

  // Price / budget
  if (matchKeywords(q, ["price","cost","budget","affordable","cheap","expensive","lakh","crore","₹"])) {
    return "Our inventory spans various budgets:\n\nUnder ₹1 Cr:\n• Ajnara Homes, Noida — ₹48 Lakh\n• Ajnara Damsaz, Noida — ₹55 Lakh\n\n₹1–10 Cr:\n• Platinum Towers, Dwarka Expressway — ₹2.95 Cr\n• Amaryllis Residences — ₹6.20 Cr\n• One Golden Mile — ₹8.50 Cr\n\n₹10–25 Cr:\n• One Golf Course Penthouse — ₹12.80 Cr\n• Sector 15 Duplex Kothi — ₹18 Cr\n• 3 Kay Plotted Residence — ₹25 Cr\n\nAbove ₹25 Cr:\n• Commercial buildings (₹25–₹200 Cr)\n• HQ27 Premium Building — ₹2,250 Cr\n\nWhat's your budget range?";
  }

  // Contact / phone / email / location / visit
  if (matchKeywords(q, ["contact","phone","call","email","address","location","where","visit","office","map"])) {
    return "Vedhara Group Office:\n📍 Sushant Lok Phase 3, Near DLF City Phase 2, Gurugram, Haryana\n📞 +91-98106-47063\n✉️ contact@vedharagroup.com\n🌐 www.vedharagroup.com\n\nHours: Mon–Fri 9AM–7PM, Sat–Sun 10AM–4PM\n\nFeel free to call or visit us!";
  }

  // NRI
  if (matchKeywords(q, ["nri","non resident","overseas","abroad","nri services"])) {
    return "We offer dedicated NRI Services:\n• Remote property search with virtual tours\n• Documentation & power of attorney guidance\n• Rental management for NRI-owned properties\n• End-to-end purchase support from abroad\n\nWe've helped many NRIs invest in Delhi NCR properties. Call +91-98106-47063 to discuss your requirements.";
  }

  // Verification / trust / rera
  if (matchKeywords(q, ["verify","verification","trust","rera","genuine","legit","safe","secure"])) {
    return "Our 5-point Verification Framework ensures every listing is trustworthy:\n1. RERA Registration Status\n2. Builder Delivery History\n3. Project-level Approvals\n4. Price-to-Locality Fairness Analysis\n5. Title Chain Verification\n\nWe publish results on every listing so you can shortlist with confidence. We're builder-independent — our recommendations are always in YOUR interest.";
  }

  // Fees / commission / charges
  if (matchKeywords(q, ["fee","commission","charge","cost","how much","payment","hidden"])) {
    return "Our fee structure:\n• Vedhara charges a disclosed commission on successful transactions\n• No hidden charges — everything is transparent\n• Commission is clearly stated on every specific listing\n• We're builder-independent, so no conflict of interest\n\nFor specific commission details, call +91-98106-47063.";
  }

  // Thanks
  if (matchKeywords(q, ["thank","thanks","thanks alot","thank you"])) {
    return "You're welcome! Happy to help. If you have more questions about properties or want to schedule a site visit, just ask. You can also call us at +91-98106-47063.";
  }

  // Goodbye
  if (matchKeywords(q, ["bye","goodbye","see you","talk later"])) {
    return "Goodbye! Feel free to come back anytime. For immediate assistance, call +91-98106-47063 or visit vedharagroup.com. Have a great day!";
  }

  // Fallback — try to give a helpful generic response
  return `I'd be happy to help with that! Here's what I can assist with:\n\n• Property listings in Gurugram, Noida, Faridabad, Chandigarh\n• Commercial properties (offices, shops, pre-rented buildings)\n• Investment advice for Delhi NCR\n• Buy/sell process and pricing\n• NRI services\n• Contact information\n\nCould you tell me more about what you're looking for? You can also call us at +91-98106-47063 for immediate help.`;
}

/* ════════════════════════════════════════════════════════════════
   SYSTEM PROMPT (for OpenAI)
   ════════════════════════════════════════════════════════════════ */

function buildSystemPrompt(): string {
  return `You are Vedhara Group's AI property advisor — a friendly, knowledgeable real estate assistant for Delhi NCR and North India. Answer using ONLY the information below. Never invent listings or prices.

## About Vedhara Group
- Independent real estate advisory firm, founded 2015
- HQ: Sushant Lok Phase 3, Near DLF City Phase 2, Gurugram
- Phone: +91-98106-47063 | Email: contact@vedharagroup.com
- Website: https://www.vedharagroup.com
- Hours: Mon–Fri 9AM–7PM, Sat–Sun 10AM–4PM
- Areas: Delhi NCR, Gurugram, Noida, Faridabad, Manesar, Ghaziabad, Greater Noida, Chandigarh, Mohali, Panchkula

## Services
- Buy: 5-point Verification Framework (RERA, builder history, approvals, price fairness, title chain)
- Sell: Market analysis, photography, marketing, buyer screening, negotiation
- Commercial: Office, retail, industrial, pre-rented buildings
- Investment Advisory: Independent, builder-unbiased, ROI projections
- NRI Services: Remote search, virtual tours, documentation, PoA guidance
- Property Management: Maintenance, tenant relations, rent collection

## How Vedhara Works
1. Share requirements → 2. We shortlist verified options → 3. Site visits → 4. Legal due diligence → 5. Price negotiation → 6. Paperwork & registration
Fee: Disclosed commission on successful transactions, no hidden charges.

## Current Listings

### Gurugram
1. HQ27 Premium Commercial Building — IFFCO Chowk — ₹2,250 Cr — Grade-A + Mall, ~6L sq.ft., Rent ₹11.5 Cr/mo, 3 Acres
2. Rented Bank Property, Sector 76 — ₹2.22 Cr — 6 shops, 10-yr lease, ₹2.22 Lakh/mo rent
3. 3 Kay Plotted Residence — DLF Phase 1 — ₹25 Cr — 490 sq.yds.
4. Pre-Rented Building, Sector 32 — ₹200 Cr — 1.25L sq.ft., ₹1.17 Cr/mo rent
5. Sector 15 Duplex Kothi — ₹18 Cr — 4 BHK + Servant, 502 sq.yds.
6. NH-8 Facing Plot, Sector 15 — ₹18.50 Cr — 500 sq.yds.
7. Commercial Building, Udyog Vihar 5 — ₹40 Cr
8. MG Road Commercial Building — ₹25 Cr
9. One Golf Course Penthouse — ₹12.80 Cr — 5 BHK + Pool
10. Amaryllis Residences — ₹6.20 Cr — 3 BHK, Golf Course Road
11. One Golden Mile — ₹8.50 Cr — 4,500 sq.ft. Office
12. Platinum Towers — ₹2.95 Cr — 3 BHK, Dwarka Expressway

### Noida
1. Ajnara Damsaz — ₹55 Lakh — 2 BHK
2. Ajnara Le Garden — ₹58 Lakh — 2 BHK
3. Exotica Blossom — ₹72 Lakh — 3 BHK
4. Ajnara Integrity — ₹68 Lakh — 3 BHK
5. Ajnara Homes — ₹48 Lakh — 2 BHK

### Other
- Hero Homes, Mohali — ₹76 Lakh — 2 & 3 BHK
- Pre-Leased Industrial Estate, Neemrana — ₹250 Cr — 20 Acres
- Laxman Public School, South Delhi — ₹450 Cr

## Best Investment Areas
Gurugram: Dwarka Expressway (appreciation), Golf Course Road (premium), Sector 76–82 (commercial), Udyog Vihar (established)
Noida: Expressway corridor, Greater Noida West (affordable)
Faridabad: Sectors 79–89 (emerging)
Chandigarh: Mohali (IT hub), Zirakpur (residential)

## Rules
- Be friendly, concise (under 120 words)
- Use specific listing data with names and prices
- Prices are asking prices, negotiable
- End with a follow-up question
- Contact: +91-98106-47063, contact@vedharagroup.com`;
}

/* ── POST handler ───────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") || "unknown";

  if (isChatRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes." }, { status: 429 });
  }

  let body: { messages?: unknown[] };
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "Messages array required" }, { status: 400 });
  }

  const messages = body.messages.filter(
    (m: unknown): m is { role: string; content: string } =>
      typeof m === "object" && m !== null && "role" in m && "content" in m &&
      typeof (m as { role: unknown }).role === "string" &&
      typeof (m as { content: unknown }).content === "string"
  );

  if (messages.length === 0) {
    return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
  }

  // Detect lead info
  const leadInfo = detectLeadInfo(messages);
  let leadCaptured = false;
  if (leadInfo && (leadInfo.phone || leadInfo.email)) {
    const lead: Lead = {
      id: generateId(),
      full_name: leadInfo.name || "Chat User",
      phone: leadInfo.phone || "",
      email: leadInfo.email,
      interest: "general_enquiry",
      message: `Chatbot: ${messages.slice(-3).map((m) => `${m.role}: ${m.content}`).join(" | ")}`,
      source_page: "ai_chatbot",
      ip,
      user_agent: req.headers.get("user-agent") || undefined,
      created_at: new Date().toISOString(),
    };
    try { await writeLead(lead); leadCaptured = true; } catch (err) { console.error("[Chatbot lead save failed]", err); }
  }

  // Get last user message for local matching
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";

  // Layer 1: Try OpenAI if key is available
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    try {
      const openai = new OpenAI({ apiKey });
      const chatMessages = [
        { role: "system" as const, content: buildSystemPrompt() },
        ...messages.slice(-20).map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ];
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: chatMessages,
        max_tokens: 800,
        temperature: 0.7,
      });
      const reply = completion.choices[0]?.message?.content;
      if (reply) return NextResponse.json({ reply, leadCaptured });
    } catch (err) {
      console.error("[OpenAI error, falling back to local KB]", err);
    }
  }

  // Layer 2: Local knowledge base (always works)
  const reply = buildLocalAnswer(lastUserMsg.toLowerCase());
  return NextResponse.json({ reply, leadCaptured });
}
