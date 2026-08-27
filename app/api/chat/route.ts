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

function buildLocalAnswer(messages: { role: string; content: string }[]): string {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const lastBotMsg = [...messages].reverse().find((m) => m.role === "assistant")?.content || "";
  const q = lastUserMsg.toLowerCase();
  const ctx = lastBotMsg.toLowerCase();

  // ── Context-aware: answer what the bot just asked ──

  // If bot asked about budget/price and user gives a number
  if ((ctx.includes("budget") || ctx.includes("price range") || ctx.includes("budget range")) && /\d/.test(q)) {
    const listings = q.includes("lakh") || q.includes("lac")
      ? "Here are options in your budget:\n• Ajnara Homes, Noida — ₹48 Lakh (2 BHK)\n• Ajnara Damsaz, Noida — ₹55 Lakh (2 BHK)\n• Ajnara Le Garden, Noida — ₹58 Lakh (2 BHK)\n• Ajnara Integrity, Noida — ₹68 Lakh (3 BHK)\n• Exotica Blossom, Noida — ₹72 Lakh (3 BHK)\n• Hero Homes, Mohali — ₹76 Lakh (2 & 3 BHK)"
      : q.includes("cr") || q.includes("crore")
      ? "Great budget! Here are options:\n• Platinum Towers, Dwarka Expressway — ₹2.95 Cr (3 BHK)\n• Amaryllis Residences — ₹6.20 Cr (3 BHK, Golf Course Road)\n• One Golden Mile — ₹8.50 Cr (Office)\n• One Golf Course Penthouse — ₹12.80 Cr (5 BHK + Pool)\n• Sector 15 Duplex Kothi — ₹18 Cr\n• 3 Kay Plotted Residence — ₹25 Cr (DLF Phase 1)"
      : "Thanks! Let me find options in that range. Could you also share:\n- Preferred location (Gurugram, Noida, Faridabad?)\n- Property type (apartment, plot, commercial?)\n\nThis helps me shortlist the best matches for you.";
    return listings + "\n\nWould you like to schedule a site visit? Call +91-98106-47063.";
  }

  // If bot asked about location and user names a place
  if ((ctx.includes("location") || ctx.includes("preferred") || ctx.includes("which area") || ctx.includes("which city")) && matchKeywords(q, ["gurugram","gurgaon","noida","faridabad","delhi","chandigarh","mohali"])) {
    if (matchKeywords(q, ["gurugram","gurgaon"])) {
      return "Gurugram is a great choice! Here's what we have:\n• HQ27 Premium Commercial — ₹2,250 Cr (Grade-A + Mall)\n• Rented Bank Property, Sector 76 — ₹2.22 Cr (6 shops, 10-yr lease)\n• 3 Kay Plotted Residence — ₹25 Cr (DLF Phase 1)\n• One Golf Course Penthouse — ₹12.80 Cr (5 BHK + Pool)\n• Amaryllis Residences — ₹6.20 Cr (3 BHK)\n• Platinum Towers — ₹2.95 Cr (3 BHK, Dwarka Expressway)\n\nWhich type interests you — residential, commercial, or investment?";
    }
    if (matchKeywords(q, ["noida"])) {
      return "Noida options:\n• Ajnara Homes — ₹48 Lakh (2 BHK)\n• Ajnara Damsaz — ₹55 Lakh (2 BHK)\n• Ajnara Le Garden — ₹58 Lakh (2 BHK)\n• Ajnara Integrity — ₹68 Lakh (3 BHK)\n• Exotica Blossom — ₹72 Lakh (3 BHK)\n\nAll are residential apartments. Want to schedule a site visit?";
    }
    return "We cover that area! Let me share relevant listings. Could you also share your budget and property type (apartment, plot, commercial)?";
  }

  // If bot asked about property type and user answers
  if ((ctx.includes("type") || ctx.includes("interested") || ctx.includes("residential") || ctx.includes("commercial")) && matchKeywords(q, ["residential","apartment","flat","villa","house","plot","commercial","office","shop"])) {
    if (matchKeywords(q, ["commercial","office","shop"])) {
      return "Commercial properties available:\n• HQ27 Premium Commercial — ₹2,250 Cr (Grade-A + Mall, ~6L sq.ft.)\n• Rented Bank Property, Sector 76 — ₹2.22 Cr (6 shops, 10-yr lease)\n• Pre-Rented Building, Sector 32 — ₹200 Cr (1.25L sq.ft.)\n• Commercial Building, Udyog Vihar — ₹40 Cr\n• MG Road Commercial — ₹25 Cr\n• One Golden Mile — ₹8.50 Cr (4,500 sq.ft. office)\n\nAll prices negotiable. Want details on any specific one?";
    }
    if (matchKeywords(q, ["plot","land"])) {
      return "Plot options:\n• 3 Kay Plotted Residence — ₹25 Cr (DLF Phase 1, 490 sq.yds.)\n• NH-8 Facing Plot — ₹18.50 Cr (Sector 15, 500 sq.yds.)\n\nBoth are prime locations. Want more details?";
    }
    return "Residential options across budgets:\n• Under ₹1 Cr: Noida apartments (₹48–72 Lakh)\n• ₹2–5 Cr: Platinum Towers (₹2.95 Cr), Amaryllis (₹6.20 Cr)\n• Above ₹10 Cr: Golf Course Penthouse, Duplex Kothi, DLF Phase 1 plots\n\nWhat's your budget range?";
  }

  // If bot asked yes/no and user says yes
  if (matchKeywords(q, ["yes","yeah","sure","ok","okay","definitely","please"])) {
    if (ctx.includes("site visit") || ctx.includes("schedule")) {
      return "Great! To schedule a site visit, please share:\n- Your name\n- Phone number\n- Preferred date and time\n\nOr call us directly at +91-98106-47063. We'll arrange a visit with honest, no-pressure assessments.";
    }
    if (ctx.includes("details") || ctx.includes("more about")) {
      return "I'd be happy to share more details! Could you tell me which specific property you'd like to know more about? You can also call +91-98106-47063 for an immediate walkthrough.";
    }
    return "Sure! How can I help further? You can ask about specific properties, pricing, locations, or our services.";
  }

  // If user says no
  if (matchKeywords(q, ["no","nah","nope","not now","later"])) {
    return "No problem! Feel free to come back anytime. For immediate help, call +91-98106-47063 or visit vedharagroup.com. Have a great day!";
  }

  // ── Direct question matching (no context needed) ──

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
    return "Thinking of selling? Here's how Vedhara helps:\n\n1. Market Analysis — comparable sales data for the right price\n2. Professional Photography — high-quality visuals\n3. Targeted Marketing — major portals + investor network\n4. Buyer Screening — vetted buyers only\n5. Negotiation — best deal with market data\n6. Paperwork — registration & transfer support\n\nShare your property details (location, size, type) and I'll connect you with our sell team. Call +91-98106-47063.";
  }

  // Buy
  if (matchKeywords(q, ["buy","buying","buy a","want to buy","purchase","looking for","looking to buy"])) {
    return "Great! To help you better, could you share:\n- Budget range\n- Preferred location\n- Property type (apartment, plot, commercial?)\n\nCurrent highlights:\n• Gurugram: ₹2.95 Cr to ₹25 Cr\n• Noida: ₹48 Lakh to ₹72 Lakh\n• Chandigarh: ₹76 Lakh\n\nAll listings come with our 5-point Verification Framework.";
  }

  // Commercial
  if (matchKeywords(q, ["commercial","office","shop","retail","mall","warehouse","industrial","pre-rented","leased"])) {
    return "Commercial inventory across Delhi NCR:\n\n• HQ27 Premium Commercial — ₹2,250 Cr — Grade-A + Mall, ~6L sq.ft., Rent ₹11.5 Cr/mo\n• Rented Bank Property — ₹2.22 Cr — 6 shops, 10-yr lease\n• Pre-Rented Building — ₹200 Cr — 1.25L sq.ft., ₹1.17 Cr/mo\n• Udyog Vihar Commercial — ₹40 Cr\n• MG Road Commercial — ₹25 Cr\n• One Golden Mile — ₹8.50 Cr — 4,500 sq.ft. office\n\nAll prices negotiable. Want details on any specific property?";
  }

  // Investment
  if (matchKeywords(q, ["invest","investment","roi","appreciation","best area","where to invest","growth"])) {
    return "Top investment areas we recommend:\n\nGurugram:\n• Dwarka Expressway — new launches, strong appreciation\n• Golf Course Road — premium, stable returns\n• Sector 76–82 — affordable commercial with rental income\n\nNoida:\n• Expressway corridor — infrastructure growth\n• Greater Noida West — affordable housing demand\n\nFaridabad: Sectors 79–89 — emerging zone\nChandigarh: Mohali — IT hub growth\n\nWe provide independent investment advisory with ROI projections. Call +91-98106-47063 for a personalized plan.";
  }

  // Gurugram listings
  if (matchKeywords(q, ["gurugram","gurgaon","dlf","sector","udyog vihar","mg road","golf course","dwarka expressway","iffco"])) {
    return "Gurugram listings:\n1. HQ27 Premium Commercial — ₹2,250 Cr\n2. Rented Bank Property, Sector 76 — ₹2.22 Cr\n3. 3 Kay Plotted Residence — ₹25 Cr\n4. Pre-Rented Building, Sector 32 — ₹200 Cr\n5. Sector 15 Duplex Kothi — ₹18 Cr\n6. NH-8 Facing Plot — ₹18.50 Cr\n7. Commercial Building, Udyog Vihar — ₹40 Cr\n8. MG Road Commercial — ₹25 Cr\n9. One Golf Course Penthouse — ₹12.80 Cr\n10. Amaryllis Residences — ₹6.20 Cr\n11. One Golden Mile — ₹8.50 Cr\n12. Platinum Towers — ₹2.95 Cr\n\nWhich one interests you?";
  }

  // Noida listings
  if (matchKeywords(q, ["noida","greater noida","ajnara","exotica"])) {
    return "Noida listings:\n1. Ajnara Homes — ₹48 Lakh (2 BHK)\n2. Ajnara Damsaz — ₹55 Lakh (2 BHK)\n3. Ajnara Le Garden — ₹58 Lakh (2 BHK)\n4. Ajnara Integrity — ₹68 Lakh (3 BHK)\n5. Exotica Blossom — ₹72 Lakh (3 BHK)\n\nWant to schedule a site visit?";
  }

  // Faridabad
  if (matchKeywords(q, ["faridabad"])) {
    return "Faridabad: Residential options in Sectors 79–89 — apartments and plots. Share your budget and I'll help shortlist. Call +91-98106-47063.";
  }

  // Chandigarh / Tricity
  if (matchKeywords(q, ["chandigarh","tricity","mohali","panchkula","zirakpur","kharar"])) {
    return "Chandigarh Tricity:\n• Hero Homes, Mohali — ₹76 Lakh — 2 & 3 BHK\n\nWe also cover Panchkula, Zirakpur, and Kharar. Want to explore?";
  }

  // South Delhi
  if (matchKeywords(q, ["south delhi","delhi","hauz khas"])) {
    return "South Delhi:\n• Laxman Public School — Hauz Khas — ₹450 Cr — 8.5 Acres, Institutional\n\nWhat area are you interested in?";
  }

  // Luxury
  if (matchKeywords(q, ["luxury","premium","villa","penthouse","farmhouse","high end"])) {
    return "Premium properties:\n• One Golf Course Penthouse — ₹12.80 Cr — 5 BHK + Pool\n• Amaryllis Residences — ₹6.20 Cr — 3 BHK, Golf Course Road\n• 3 Kay Plotted Residence — ₹25 Cr — DLF Phase 1\n• Sector 15 Duplex Kothi — ₹18 Cr\n\nWant a private viewing?";
  }

  // Price/budget
  if (matchKeywords(q, ["price","cost","budget","affordable","cheap","expensive","lakh","crore","₹"])) {
    return "Budget ranges:\n\nUnder ₹1 Cr: Noida apartments (₹48–72 Lakh)\n₹1–10 Cr: Platinum Towers (₹2.95 Cr), Amaryllis (₹6.20 Cr), One Golden Mile (₹8.50 Cr)\n₹10–25 Cr: Golf Course Penthouse (₹12.80 Cr), Duplex Kothi (₹18 Cr), DLF Phase 1 (₹25 Cr)\nAbove ₹25 Cr: Commercial buildings (₹25–₹2,250 Cr)\n\nWhat's your budget range?";
  }

  // Contact
  if (matchKeywords(q, ["contact","phone","call","email","address","location","where","visit","office","map"])) {
    return "Vedhara Group:\n📍 Sushant Lok Phase 3, Near DLF City Phase 2, Gurugram\n📞 +91-98106-47063\n✉️ contact@vedharagroup.com\n🌐 www.vedharagroup.com\n\nHours: Mon–Fri 9AM–7PM, Sat–Sun 10AM–4PM";
  }

  // NRI
  if (matchKeywords(q, ["nri","non resident","overseas","abroad"])) {
    return "NRI Services:\n• Remote property search with virtual tours\n• Documentation & PoA guidance\n• Rental management for NRI-owned properties\n• End-to-end purchase support from abroad\n\nCall +91-98106-47063 to discuss.";
  }

  // Verification/trust
  if (matchKeywords(q, ["verify","verification","trust","rera","genuine","legit","safe","secure"])) {
    return "Our 5-point Verification Framework:\n1. RERA Registration Status\n2. Builder Delivery History\n3. Project Approvals\n4. Price-to-Locality Fairness\n5. Title Chain Verification\n\nWe publish results on every listing. Builder-independent — always in YOUR interest.";
  }

  // Fees
  if (matchKeywords(q, ["fee","commission","charge","cost","how much","payment","hidden"])) {
    return "Fee structure:\n• Disclosed commission on successful transactions\n• No hidden charges\n• Clearly stated on every listing\n• Builder-independent, no conflict of interest\n\nCall +91-98106-47063 for specifics.";
  }

  // Thanks
  if (matchKeywords(q, ["thank","thanks","thank you"])) {
    return "You're welcome! Happy to help. For more questions, just ask. Call +91-98106-47063 anytime.";
  }

  // Goodbye
  if (matchKeywords(q, ["bye","goodbye","see you","talk later"])) {
    return "Goodbye! Come back anytime. For immediate help, call +91-98106-47063 or visit vedharagroup.com.";
  }

  // Fallback
  return "I'd be happy to help! I can assist with:\n• Property listings in Gurugram, Noida, Faridabad, Chandigarh\n• Commercial properties (offices, shops, pre-rented)\n• Investment advice for Delhi NCR\n• Buy/sell process and pricing\n• NRI services\n\nWhat are you looking for? Or call +91-98106-47063 for immediate help.";
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

  // Layer 2: Local knowledge base (always works, context-aware)
  const reply = buildLocalAnswer(messages);
  return NextResponse.json({ reply, leadCaptured });
}
