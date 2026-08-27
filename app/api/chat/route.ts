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
import { sendLeadNotification } from "@/lib/email";

/* ── IST business hours (10 AM – 7 PM) ───────────────────────── */
const BUSINESS_OPEN_HOUR = 10;
const BUSINESS_CLOSE_HOUR = 19;

// Returns true if current IST time is within business hours (10:00–19:00)
function isBusinessHours(now: Date): boolean {
  const ist = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);
  const hour = parseInt(ist.find((p) => p.type === "hour")?.value || "0", 10);
  return hour >= BUSINESS_OPEN_HOUR && hour < BUSINESS_CLOSE_HOUR;
}

const AFTER_HOURS_MESSAGE =
  "We're currently away (business hours are 10 AM to 7 PM IST, Mon–Sun). Our team would love to help you.\n\nPlease share your name and phone number and we'll get back to you first thing tomorrow morning.\n\nFor urgent help you can reach us at 📞 +91-98106-47063 or ✉️ contact@vedharagroup.com.";

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
// Only scans the LATEST user message so we don't re-capture the same details
// mentioned earlier in the transcript on every follow-up turn.
function detectLeadInfo(messages: { role: string; content: string }[]): {
  name?: string; phone?: string; email?: string;
} | null {
  const text = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  if (!text) return null;
  const phoneMatch = text.match(/(?:\+91[\s-]?|91)?[6-9]\d{9}/);
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const namePatterns = [
    /(?:my name is|i am|i'm|call me|i'm called|this is)\s+([A-Za-z][a-z]+(?:\s+[A-Z][a-z]+)?)/,
    /(?:name[:\s]+)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/,
  ];
  let name: string | undefined;
  for (const p of namePatterns) { const m = text.match(p); if (m) { name = m[1].trim(); break; } }
  if (!phoneMatch && !emailMatch && !name) return null;
  return { name, phone: phoneMatch?.[0]?.replace(/[\s-]/g, ""), email: emailMatch?.[0] };
}

// De-dupe: avoid saving + emailing the same contact repeatedly within one hour.
const notifiedLeads = new Map<string, number>();
const LEAD_DEDUPE_TTL = 60 * 60 * 1000;

function isDuplicateLead(phone?: string, email?: string): boolean {
  const key = `${phone || ""}|${email || ""}`.toLowerCase();
  if (key === "|") return false;
  const now = Date.now();
  // Purge expired entries
  for (const [k, t] of notifiedLeads) if (now - t > LEAD_DEDUPE_TTL) notifiedLeads.delete(k);
  if (notifiedLeads.has(key)) return true;
  notifiedLeads.set(key, now);
  return false;
}

/* ════════════════════════════════════════════════════════════════
   LOCAL KNOWLEDGE BASE — answers without OpenAI
   ════════════════════════════════════════════════════════════════ */

function matchKeywords(q: string, words: string[]): boolean {
  return words.some((w) => q.includes(w));
}

// Map a listing name to its detail string and page URL on the site.
const LISTING_URLS: { keys: string[]; name: string; detail: string; url: string }[] = [
  { keys:["hq27","hq 27","premium commercial building"], name:"HQ27 Premium Commercial Building",
    detail:"HQ27 Premium Commercial Building — Near IFFCO Chowk & HUDA City Centre Metro, Gurugram.\n• Asking Price: ₹2,250 Cr\n• Type: Grade-A Commercial Building + Mall\n• 16 Floors + 3 Basements, ~6 Lakh sq.ft. Leasable\n• Land: 3 Acres, rising 280 ft high\n• Current Rent: ₹11.5 Cr/month (expected ₹13 Cr soon)\n• Projected Annual Income: ₹150 Cr\n• Office ~5 Lakh sq.ft. leased @ ₹160/sq.ft.\n• Retail & F&B ~1 Lakh sq.ft. pending lease\n• Managed by Bharti\n• Connectivity: NH-48, Golf Course Road, IGI Airport",
    url:"https://www.vedharagroup.com/gurugram" },
  { keys:["rented bank","bank property","sector 76","dlf phase 6"], name:"Rented Bank Property, Sector 76",
    detail:"Rented Bank Property, Sector 76 — DLF Phase 6, Gurugram.\n• Price: ₹2.22 Cr\n• 6 Ground-Floor Shops\n• Fresh 10-Yr Bank Lease\n• Rent: ₹2.22 Lakh/month @ ₹88/sq.ft.\n• Size: 2,520 sq.ft.\n• Next to DLF Privana, Proposed Cyber City 2",
    url:"https://www.vedharagroup.com/gurugram" },
  { keys:["3 kay","plotted residence","dlf phase 1"], name:"3 Kay Plotted Residence",
    detail:"3 Kay Plotted Residence — DLF Phase 1, Gurugram.\n• Price: ₹25 Cr\n• Plot A2/6, 490 sq.yds.\n• Prime location, ready to build",
    url:"https://www.vedharagroup.com/gurugram" },
  { keys:["pre-rented building","sector 32","fully furnished"], name:"Fully Furnished Pre-Rented Building, Sector 32",
    detail:"Fully Furnished Pre-Rented Building — Sector 32, Gurugram.\n• Price: ₹200 Cr\n• 1,25,000 sq.ft. Leased\n• Rent: ₹1.17 Cr/month\n• Single Reputed Tenant\n• B2 + 5 Floors\n• New Lease with 3-Yr Lock-in",
    url:"https://www.vedharagroup.com/commercial" },
  { keys:["one golf course","golf course penthouse"], name:"One Golf Course Penthouse",
    detail:"One Golf Course Penthouse — Golf Course Road, Gurugram.\n• Price: ₹12.80 Cr\n• 5 BHK + Pool, 4,200 sq.ft.\n• HRERA Registered, Panoramic view, Private terrace, Butler service",
    url:"https://www.vedharagroup.com/luxury" },
  { keys:["amaryllis"], name:"Amaryllis Residences",
    detail:"Amaryllis Residences — Golf Course Road, Gurugram.\n• Price: ₹6.20 Cr\n• 3 BHK + Servant, 2,150 sq.ft.\n• HRERA Registered, Corner unit, Private terrace, Smart home\n• Possession Dec 2026",
    url:"https://www.vedharagroup.com/luxury" },
  { keys:["one golden mile"], name:"One Golden Mile",
    detail:"One Golden Mile — Sector 62, Gurugram.\n• Price: ₹8.50 Cr\n• 4,500 sq.ft. Office\n• LEED Platinum, 24hr security, 100+ car parking",
    url:"https://www.vedharagroup.com/commercial" },
  { keys:["platinum towers"], name:"Platinum Towers",
    detail:"Platinum Towers — Dwarka Expressway, Gurugram.\n• Price: ₹2.95 Cr\n• 3 BHK, 1,650 sq.ft.\n• HRERA Registered, Metro proximity, 85% open area\n• Possession Dec 2026",
    url:"https://www.vedharagroup.com/gurugram" },
  { keys:["udyog vihar"], name:"Commercial Building, Udyog Vihar 5",
    detail:"Commercial Building — Udyog Vihar Phase 5, Gurugram.\n• Price: ₹40 Cr\n• 1,000 sq.m., 40,000 sq.ft. built-up\n• Established commercial zone",
    url:"https://www.vedharagroup.com/commercial" },
  { keys:["mg road","sector 16"], name:"MG Road Commercial Building",
    detail:"MG Road Commercial Building — Sector 16, Gurugram.\n• Price: ₹25 Cr\n• 1,000 sq.m.\n• MG Road, opp. Sector 14, prime commercial corridor",
    url:"https://www.vedharagroup.com/commercial" },
  { keys:["sector 15 duplex","duplex kothi"], name:"Sector 15 Duplex Kothi",
    detail:"Sector 15 Duplex Kothi — Sector 15 Part 2, Gurugram.\n• Price: ₹18 Cr\n• 4 BHK + Servant Quarter, 502 sq.yds.\n• Prime sector, NH-8 connectivity",
    url:"https://www.vedharagroup.com/luxury" },
  { keys:["nh-8 facing plot","sector 15 plot"], name:"NH-8 Facing Plot, Sector 15",
    detail:"NH-8 Facing Plot — Sector 15 Part 2, Gurugram.\n• Price: ₹18.50 Cr\n• 500 sq.yds., Main NH-8 facing, Green belt facing",
    url:"https://www.vedharagroup.com/gurugram" },
  { keys:["ajnara homes"], name:"Ajnara Homes",
    detail:"Ajnara Homes — Noida.\n• Price: ₹48 Lakh\n• 2 BHK, 975 sq.ft.",
    url:"https://www.vedharagroup.com/noida" },
  { keys:["ajnara damsaz"], name:"Ajnara Damsaz",
    detail:"Ajnara Damsaz — Noida.\n• Price: ₹55 Lakh\n• 2 BHK, 1,095 sq.ft.",
    url:"https://www.vedharagroup.com/noida" },
  { keys:["ajnara le garden"], name:"Ajnara Le Garden",
    detail:"Ajnara Le Garden — Noida.\n• Price: ₹58 Lakh\n• 2 BHK, 1,115 sq.ft.",
    url:"https://www.vedharagroup.com/noida" },
  { keys:["ajnara integrity"], name:"Ajnara Integrity",
    detail:"Ajnara Integrity — Noida.\n• Price: ₹68 Lakh\n• 3 BHK, 1,625 sq.ft.",
    url:"https://www.vedharagroup.com/noida" },
  { keys:["exotica blossom"], name:"Exotica Blossom",
    detail:"Exotica Blossom — Noida.\n• Price: ₹72 Lakh\n• 3 BHK, 1,390 sq.ft.",
    url:"https://www.vedharagroup.com/noida" },
  { keys:["hero homes"], name:"Hero Homes",
    detail:"Hero Homes — Mohali, Chandigarh Tricity.\n• Price: ₹76 Lakh\n• 2 & 3 BHK",
    url:"https://www.vedharagroup.com/tricity" },
  { keys:["laxman public school"], name:"Laxman Public School",
    detail:"Laxman Public School — Hauz Khas Enclave, South Delhi.\n• Price: ₹450 Cr\n• 8.5 Acres, Institutional • Nursery–12th CBSE, 4,400 students",
    url:"https://www.vedharagroup.com/commercial" },
  { keys:["neemrana","industrial estate","ghiloth"], name:"Pre-Leased Industrial Estate, Neemrana",
    detail:"Pre-Leased Industrial Estate — Ghiloth, Neemrana.\n• Price: ₹250 Cr\n• 20-Acre approved industrial plot\n• 6.5 Lakh sq.ft. shed area, top MNC tenant\n• Rent: ₹1.60 Cr/month",
    url:"https://www.vedharagroup.com/commercial" },
];

function findListingDetail(latestUserLower: string): string | null {
  for (const item of LISTING_URLS) {
    if (item.keys.some((k) => latestUserLower.includes(k))) {
      return `Here are the details of ${item.name}:\n\n${item.detail}\n\nView it on our website: ${item.url}\n\nAll prices are asking prices (negotiable). Would you like to schedule a site visit? You can call +91-98106-47063.`;
    }
  }
  return null;
}

// ── City detection ───────────────────────────────────────────
// Returns the canonical city key mentioned in the query, checked longest-first
// so "greater noida" wins over plain "noida".
const CITY_KEYS: { city: string; words: string[] }[] = [
  { city:"gurugram", words:["gurugram","gurgaon"] },
  { city:"noida",    words:["noida"] },
  { city:"faridabad",words:["faridabad"] },
  { city:"tricity",  words:["chandigarh","tricity","mohali","panchkula","zirakpur","kharar"] },
  { city:"delhi",    words:["south delhi","delhi","hauz khas"] },
  { city:"manesar",  words:["manesar"] },
  { city:"ghaziabad",words:["ghaziabad"] },
];

function detectCity(qLower: string): string | null {
  for (const c of CITY_KEYS) if (c.words.some((w) => qLower.includes(w))) return c.city;
  return null;
}

// Cities we do NOT currently cover — worth acknowledging explicitly instead of a generic reply.
const OUT_OF_AREA = ["mumbai","bangalore","bengaluru","pune","hyderabad","chennai","kolkata",
  "jaipur","lucknow","ahmedabad","dehradun","indore","goa","surat","nagpur","bhopal",
  "kochi","coimbatore","vizag","visakhapatnam","patna","bhubaneswar","guwahati","shimla"];

function buildLocalAnswer(messages: { role: string; content: string }[]): string {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const lastBotMsg = [...messages].reverse().find((m) => m.role === "assistant")?.content || "";
  const q = lastUserMsg.toLowerCase();
  const ctx = lastBotMsg.toLowerCase();
  // Only short replies are treated as answers to the bot's previous question;
  // anything longer is treated as a fresh query.
  const shortReply = q.length <= 60;

  // ── 0. Named property in THIS message always wins ──
  const detail = findListingDetail(q);
  if (detail) return detail;

  const city = detectCity(q);

  // ── 1. Context-aware: answer what the bot just asked (only for short replies) ──

  // If bot asked about budget/price and user gives a number
  if (shortReply && /\d/.test(q) && (ctx.includes("budget") || ctx.includes("price range") || ctx.includes("budget range")) && !city) {
    const listings = q.includes("lakh") || q.includes("lac")
      ? "Here are options in your budget:\n• Ajnara Homes, Noida — ₹48 Lakh (2 BHK)\n• Ajnara Damsaz, Noida — ₹55 Lakh (2 BHK)\n• Ajnara Le Garden, Noida — ₹58 Lakh (2 BHK)\n• Ajnara Integrity, Noida — ₹68 Lakh (3 BHK)\n• Exotica Blossom, Noida — ₹72 Lakh (3 BHK)\n• Hero Homes, Mohali — ₹76 Lakh (2 & 3 BHK)"
      : q.includes("cr") || q.includes("crore")
      ? "Great budget! Here are options:\n• Platinum Towers, Dwarka Expressway — ₹2.95 Cr (3 BHK)\n• Amaryllis Residences — ₹6.20 Cr (3 BHK, Golf Course Road)\n• One Golden Mile — ₹8.50 Cr (Office)\n• One Golf Course Penthouse — ₹12.80 Cr (5 BHK + Pool)\n• Sector 15 Duplex Kothi — ₹18 Cr\n• 3 Kay Plotted Residence — ₹25 Cr (DLF Phase 1)"
      : "Thanks! Let me find options in that range. Could you also share:\n- Preferred location (Gurugram, Noida, Faridabad?)\n- Property type (apartment, plot, commercial?)\n\nThis helps me shortlist the best matches for you.";
    return listings + "\n\nWould you like to schedule a site visit? Call +91-98106-47063.";
  }

  // Yes / no replies to the bot's question
  if (shortReply && !city && matchKeywords(q, ["yes","yeah","sure","ok","okay","definitely","please"]) && (ctx.includes("site visit") || ctx.includes("schedule") || ctx.includes("details") || ctx.includes("more about") || ctx.endsWith("?"))) {
    if (ctx.includes("site visit") || ctx.includes("schedule")) {
      return "Great! To schedule a site visit, please share:\n- Your name\n- Phone number\n- Preferred date and time\n\nOr call us directly at +91-98106-47063. We'll arrange a visit with honest, no-pressure assessments.";
    }
    if (ctx.includes("details") || ctx.includes("more about") || ctx.includes("interests you")) {
      return "I'd be happy to share more details! Just tell me which property or area you'd like to know about — e.g. \"HQ27\", \"bank property sector 76\", \"Noida\".";
    }
    return "Sure! You can ask me about specific properties (e.g. \"HQ27\", \"Ajnara Homes\"), areas (e.g. \"Gurugram\", \"Noida\"), pricing, or our services.";
  }

  if (shortReply && !city && /\b(no|nah|nope|not now|later)\b/.test(q)) {
    return "No problem! Feel free to come back anytime. For immediate help, call +91-98106-47063 or visit vedharagroup.com. Have a great day!";
  }

  // ── 2. Greeting ──
  if (shortReply && /\b(hi|hii+|hello|hey+|good morning|good afternoon|good evening|namaste|sup)\b/.test(q) && q.length <= 30) {
    return "Hello! Welcome to Vedhara Group. Ask me about properties (e.g. \"HQ27 Gurugram\", \"Noida flats\"), pricing, investment areas, or our services. What are you looking for?";
  }

  // ── 3. Out-of-area cities → acknowledge explicitly ──
  if (OUT_OF_AREA.some((c) => q.includes(c))) {
    return "Sorry, we don't currently have inventory there. Vedhara Group operates across Delhi NCR and North India:\n• Gurugram • Noida • Faridabad • South Delhi\n• Chandigarh Tricity (Mohali, Panchkula, Zirakpur, Kharar)\n• Manesar • Ghaziabad • Greater Noida • Neemrana\n\nWhich of these would you like to explore?";
  }

  // ── 4. City queries always answer with that city's inventory ──
  if (city) {
    switch (city) {
      case "gurugram": {
        const commercial = matchKeywords(q, ["commercial","office","shop","retail","mall","pre-rented","leased"]);
        if (commercial) {
          return "Commercial properties in Gurugram:\n• HQ27 Premium Commercial Building — ₹2,250 Cr — Grade-A + Mall near IFFCO Chowk, Rent ₹11.5 Cr/mo\n• Rented Bank Property, Sector 76 — ₹2.22 Cr — 6 shops, 10-yr bank lease, ₹2.22 Lakh/mo\n• Pre-Rented Building, Sector 32 — ₹200 Cr — 1.25L sq.ft., ₹1.17 Cr/mo\n• Udyog Vihar Phase 5 — ₹40 Cr\n• MG Road, Sector 16 — ₹25 Cr\n• One Golden Mile, Sector 62 — ₹8.50 Cr office\n\nAsk me about any of these for full details, or view all at https://www.vedharagroup.com/gurugram";
        }
        return "Properties available in Gurugram:\n1. HQ27 Premium Commercial Building — ₹2,250 Cr (Grade-A + Mall)\n2. Rented Bank Property, Sector 76 — ₹2.22 Cr (10-yr lease)\n3. 3 Kay Plotted Residence, DLF Phase 1 — ₹25 Cr\n4. Pre-Rented Building, Sector 32 — ₹200 Cr\n5. Sector 15 Duplex Kothi — ₹18 Cr\n6. NH-8 Facing Plot, Sector 15 — ₹18.50 Cr\n7. Commercial Building, Udyog Vihar — ₹40 Cr\n8. MG Road Commercial — ₹25 Cr\n9. One Golf Course Penthouse — ₹12.80 Cr (5 BHK + Pool)\n10. Amaryllis Residences — ₹6.20 Cr (3 BHK)\n11. One Golden Mile — ₹8.50 Cr (Office)\n12. Platinum Towers, Dwarka Expressway — ₹2.95 Cr\n\nTell me a property name for full details, or browse: https://www.vedharagroup.com/gurugram";
      }
      case "noida":
        return "Properties available in Noida:\n1. Ajnara Homes — ₹48 Lakh (2 BHK, 975 sq.ft.)\n2. Ajnara Damsaz — ₹55 Lakh (2 BHK, 1,095 sq.ft.)\n3. Ajnara Le Garden — ₹58 Lakh (2 BHK, 1,115 sq.ft.)\n4. Ajnara Integrity — ₹68 Lakh (3 BHK, 1,625 sq.ft.)\n5. Exotica Blossom — ₹72 Lakh (3 BHK, 1,390 sq.ft.)\n\nAll verified under our 5-point framework. Ask me about any one for details, or view: https://www.vedharagroup.com/noida";
      case "faridabad":
        return "Faridabad: We cover residential apartments and plots across Sectors 79–89 — the emerging development zone with strong appreciation potential.\n\nShare your budget and preferred sector and I'll shortlist options, or call +91-98106-47063. See the city page: https://www.vedharagroup.com/faridabad";
      case "tricity":
        return "Chandigarh Tricity inventory:\n• Hero Homes, Mohali — ₹76 Lakh — 2 & 3 BHK\n\nWe also advise on Panchkula, Zirakpur and Kharar markets. Want Hero Homes details or a different Tricity area? Browse: https://www.vedharagroup.com/tricity";
      case "delhi":
        return "Delhi inventory:\n• Laxman Public School, Hauz Khas Enclave — ₹450 Cr — 8.5 acres institutional (CBSE school, 4,400 students)\n\nFor residential/builder floors in South Delhi we work on specific requirement basis — share your budget & area (defence colony, hauz khas, green park etc.). More: https://www.vedharagroup.com/south-delhi";
      case "manesar":
        return "Manesar sits right on our Gurugram coverage — industrial plots and pre-rented options along NH-48. Share your requirement (size, budget, industrial vs commercial) and I'll shortlist. Call +91-98106-47063.";
      case "ghaziabad":
        return "Ghaziabad/Raj Nagar Extension: options come up on requirement basis. Share budget and configuration (2/3 BHK etc.) and our team will shortlist verified choices. Call +91-98106-47063.";
    }
  }

  // ── 5. Intent matching (city not mentioned) ──

  // How does Vedhara work / about us
  if (matchKeywords(q, ["how does","how do you","how it works","about vedhara","about your company","who are you","what is vedhara","what do you do"])) {
    return "Vedhara Group is an independent real estate advisory firm (est. 2015) based in Gurugram. We help you buy, sell, or invest in properties across Delhi NCR with a 5-point Verification Framework — RERA check, builder history, approvals, price fairness, and title verification.\n\nHere's how we work:\n1. You share your requirements\n2. We shortlist verified options\n3. We arrange site visits with honest assessments\n4. Legal/title due diligence\n5. Price negotiation with market data\n6. Paperwork & registration support\n\nWe're builder-independent, so our advice is always in YOUR interest. Call us at +91-98106-47063 to get started!";
  }

  // Sell
  if (matchKeywords(q, ["sell my","want to sell","selling my","i want to sell","sell a property","sell property"])) {
    return "Thinking of selling? Here's how Vedhara helps:\n\n1. Market Analysis — comparable sales data for the right price\n2. Professional Photography — high-quality visuals\n3. Targeted Marketing — major portals + investor network\n4. Buyer Screening — vetted buyers only\n5. Negotiation — best deal with market data\n6. Paperwork — registration & transfer support\n\nShare your property details (location, size, type) and I'll connect you with our sell team. Call +91-98106-47063.";
  }

  // Site visit / appointment
  if (matchKeywords(q, ["site visit","schedule a visit","book a visit","appointment","meet your team","visit the property"])) {
    return "Happy to arrange a site visit! Please share:\n- Your name\n- Phone number\n- Which property (or area) you'd like to see\n- Preferred date and time\n\nOr call us directly at +91-98106-47063 — we'll set it up with honest, no-pressure assessments.";
  }

  // Buy
  if (matchKeywords(q, ["buy","buying","purchase","looking to buy","want to buy"])) {
    return "Great! To help you better, could you share:\n- Budget range\n- Preferred location (Gurugram, Noida, Faridabad, Chandigarh?)\n- Property type (apartment, plot, commercial?)\n\nCurrent highlights:\n• Gurugram: ₹2.95 Cr to ₹25 Cr\n• Noida: ₹48 Lakh to ₹72 Lakh\n• Chandigarh Tricity: ₹76 Lakh\n\nAll listings come with our 5-point Verification Framework.";
  }

  // Commercial (generic)
  if (matchKeywords(q, ["commercial","office space","office building","shops","retail space","pre-rented","pre leased","warehouse","industrial"])) {
    return "Commercial inventory across Delhi NCR:\n\n• HQ27 Premium Commercial — ₹2,250 Cr — Grade-A + Mall, ~6L sq.ft., Rent ₹11.5 Cr/mo\n• Rented Bank Property, Sector 76 Gurugram — ₹2.22 Cr — 6 shops, 10-yr lease\n• Pre-Rented Building, Sector 32 — ₹200 Cr — 1.25L sq.ft., ₹1.17 Cr/mo\n• Udyog Vihar Commercial — ₹40 Cr\n• MG Road Commercial — ₹25 Cr\n• One Golden Mile — ₹8.50 Cr — 4,500 sq.ft. office\n• Neemrana Industrial Estate — ₹250 Cr — 20 acres\n\nMention a property name for full details, or ask by city (e.g. \"commercial in gurugram\").";
  }

  // Investment
  if (matchKeywords(q, ["invest","investment","roi","appreciation","best area","where to invest","growth"])) {
    return "Top investment areas we recommend:\n\nGurugram:\n• Dwarka Expressway — new launches, strong appreciation\n• Golf Course Road — premium, stable returns\n• Sector 76–82 — affordable commercial with rental income\n\nNoida:\n• Expressway corridor — infrastructure growth\n• Greater Noida West — affordable housing demand\n\nFaridabad: Sectors 79–89 — emerging zone\nChandigarh: Mohali — IT hub growth\n\nWe provide independent investment advisory with ROI projections. Call +91-98106-47063 for a personalized plan.";
  }

  // Luxury
  if (matchKeywords(q, ["luxury","luxurious","villa","penthouse","farmhouse","high end","kothi"])) {
    return "Premium properties:\n• One Golf Course Penthouse — ₹12.80 Cr — 5 BHK + Pool, Golf Course Road\n• Amaryllis Residences — ₹6.20 Cr — 3 BHK, Golf Course Road\n• 3 Kay Plotted Residence — ₹25 Cr — DLF Phase 1, 490 sq.yds.\n• Sector 15 Duplex Kothi — ₹18 Cr — 502 sq.yds.\n\nWant details on any of these? https://www.vedharagroup.com/luxury";
  }

  // Rental / rent
  if (matchKeywords(q, ["rent","rental","lease out","tenant"])) {
    return "Rent & leasing services:\n• Tenant screening & verification\n• Lease drafting & registration\n• Rent negotiation at fair market value\n• Ongoing property management (rent collection, maintenance, inspections)\n\nAre you looking to rent OUT a property, or take one on rent? Call +91-98106-47063.";
  }

  // Price/budget
  if (matchKeywords(q, ["price","prices","pricing","cost","budget","affordable","cheap","expensive","lakh","crore"])) {
    return "Budget ranges:\n\nUnder ₹1 Cr: Noida apartments (₹48–72 Lakh), Hero Homes Mohali (₹76 Lakh)\n₹1–10 Cr: Platinum Towers (₹2.95 Cr), Amaryllis (₹6.20 Cr), One Golden Mile (₹8.50 Cr)\n₹10–25 Cr: Golf Course Penthouse (₹12.80 Cr), Duplex Kothi (₹18 Cr), DLF Phase 1 (₹25 Cr)\nAbove ₹25 Cr: Pre-rented buildings (₹40–200 Cr), Neemrana estate (₹250 Cr), HQ27 (₹2,250 Cr)\n\nWhat's your budget range?";
  }

  // Contact
  if (matchKeywords(q, ["contact","phone number","email","address","reach you","reach us","whatsapp","your office","map"])) {
    return "Vedhara Group:\n📍 Sushant Lok Phase 3, Near DLF City Phase 2, Gurugram\n📞 +91-98106-47063\n✉️ contact@vedharagroup.com\n🌐 www.vedharagroup.com\n\nHours: Mon–Fri 9AM–7PM, Sat–Sun 10AM–4PM";
  }

  // NRI
  if (matchKeywords(q, ["nri","non resident","overseas","abroad","foreign"])) {
    return "NRI Services:\n• Remote property search with virtual tours\n• Documentation & PoA guidance\n• Rental management for NRI-owned properties\n• End-to-end purchase support from abroad\n\nCall +91-98106-47063 to discuss.";
  }

  // Verification/trust
  if (matchKeywords(q, ["verify","verification","trust","rera","genuine","legit","safe","secure"])) {
    return "Our 5-point Verification Framework:\n1. RERA Registration Status\n2. Builder Delivery History\n3. Project Approvals\n4. Price-to-Locality Fairness\n5. Title Chain Verification\n\nWe publish results on every listing. Builder-independent — always in YOUR interest.";
  }

  // Fees
  if (matchKeywords(q, ["fee","commission","charges","how much do you charge","payment terms","hidden"])) {
    return "Fee structure:\n• Disclosed commission on successful transactions\n• No hidden charges\n• Clearly stated on every listing\n• Builder-independent, no conflict of interest\n\nCall +91-98106-47063 for specifics.";
  }

  // Thanks
  if (shortReply && matchKeywords(q, ["thank","thanks","thank you","thx"])) {
    return "You're welcome! Happy to help. For more questions, just ask. Call +91-98106-47063 anytime.";
  }

  // Goodbye
  if (shortReply && matchKeywords(q, ["bye","goodbye","see you","talk later"])) {
    return "Goodbye! Come back anytime. For immediate help, call +91-98106-47063 or visit vedharagroup.com.";
  }

  // Fallback
  return KB_FALLBACK;
}

// Returned by the knowledge base when nothing matches — used as signal to try OpenAI.
const KB_FALLBACK =
  "I'd be happy to help! I can assist with:\n• Property listings in Gurugram, Noida, Faridabad, Chandigarh\n• Commercial properties (offices, shops, pre-rented)\n• Investment advice for Delhi NCR\n• Buy/sell process and pricing\n• NRI services\n\nWhat are you looking for? Or call +91-98106-47063 for immediate help.";

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

## Listing Page URLs (share when user wants details)
- Gurugram listings: https://www.vedharagroup.com/gurugram
- Noida listings: https://www.vedharagroup.com/noida
- Commercial/industrial/institutional: https://www.vedharagroup.com/commercial
- Luxury (penthouse, kothi, DLF Phase 1): https://www.vedharagroup.com/luxury
- Tricity/Mohali: https://www.vedharagroup.com/tricity

## Business Hours
- Chat advisor availability: 10 AM – 7 PM IST, all days
- Outside hours the system itself replies with an away message — you will not be called then.

## Rules
- Be friendly, concise (under 120 words)
- Use specific listing data with names and prices
- When a user asks for details of a specific listing, give full details AND its page URL from "Listing Page URLs"
- Prices are asking prices, negotiable
- If users share name/phone/email, confirm warmly that our team will contact them (details go to contact@vedharagroup.com)
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

  // Detect lead info (from the latest user message only)
  const leadInfo = detectLeadInfo(messages);
  let leadCaptured = false;
  if (leadInfo && (leadInfo.phone || leadInfo.email) && !isDuplicateLead(leadInfo.phone, leadInfo.email)) {
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
    try {
      await writeLead(lead);
      leadCaptured = true;
      // Also email the lead to the team (contact@vedharagroup.com) like consultation forms
      await sendLeadNotification(lead);
    } catch (err) { console.error("[Chatbot lead save failed]", err); }
  }

  // If it's outside business hours, respond with the away message (unless we already
  // captured contact details so the team can follow up).
  if (!isBusinessHours(new Date())) {
    return NextResponse.json({
      reply: leadCaptured
        ? "Thank you! We've noted your details and our team will contact you tomorrow during business hours (10 AM – 7 PM IST). For urgent help, call +91-98106-47063."
        : AFTER_HOURS_MESSAGE,
      leadCaptured,
    });
  }

  // Confirmation note appended whenever we captured fresh contact details
  const captureNote = leadCaptured
    ? "\n\n✅ Noted your details — our team will reach out shortly. You can also call +91-98106-47063."
    : "";

  // Layer 1: Local knowledge base (always works, context-aware, includes listing URLs)
  const localReply = buildLocalAnswer(messages);

  // Layer 2: If the KB didn't match anything, try OpenAI for free-form questions
  if (localReply === KB_FALLBACK) {
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
        const aiReply = completion.choices[0]?.message?.content;
        if (aiReply) return NextResponse.json({ reply: aiReply + captureNote, leadCaptured });
      } catch (err) {
        console.error("[OpenAI error, using local fallback]", err);
      }
    }
  }

  return NextResponse.json({ reply: localReply + captureNote, leadCaptured });
}
