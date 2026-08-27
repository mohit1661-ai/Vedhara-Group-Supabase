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

// ── Unified REAL inventory — every row exists on its linked site page ──
// Verified against lib/data/cityPages.ts; aid = anchor id rendered on the card
// (CityPageTemplate sets id={property.id}), enabling deep links like /gurugram#gg-bk2.
type Inv = {
  keys: string[];              // phrases a visitor may type
  n: string;                   // exact card title on the site
  l: string;                   // location line
  pt: string;                  // display price
  cr: number;                  // numeric price in ₹ Cr (for budget filters)
  cfg: string;                 // configuration / one-line spec
  c: "gg" | "nd" | "tri" | "oth";
  path: string;                // site page path
  aid: string | null;          // anchor id on that page
};

const SITE = "https://www.vedharagroup.com/";
const listOf = (r: Inv) => SITE + r.path + (r.aid ? "#" + r.aid : "");

const LISTINGS: Inv[] = [
  { keys:["hq27","hq 27","premium commercial building"], n:"HQ27 Premium Commercial Building", l:"Near IFFCO Chowk & HUDA City Centre Metro, Gurugram", pt:"₹2,250 Cr", cr:2250, cfg:"Grade-A Commercial + Mall · 16 Floors · ~6L sq.ft.", c:"gg", path:"gurugram", aid:"gg-bk2" },
  { keys:["rented bank","bank property","sector 76","dlf phase 6"], n:"Rented Bank Property, Sector 76", l:"DLF Phase 6, Gurugram", pt:"₹2.22 Cr", cr:2.22, cfg:"6 Shops · 10-Yr Bank Lease · Rent ₹2.22 L/mo", c:"gg", path:"gurugram", aid:"gg-bk1" },
  { keys:["3 kay","kay plotted","dlf phase 1"], n:"3 Kay Plotted Residence", l:"DLF Phase 1, Gurugram", pt:"₹25 Cr", cr:25, cfg:"490 sq.yds. Plot", c:"gg", path:"gurugram", aid:"gg-26" },
  { keys:["pre-rented building","sector 32","fully furnished"], n:"Fully Furnished Pre-Rented Building", l:"Sector 32, Gurugram", pt:"₹200 Cr", cr:200, cfg:"1.25L sq.ft. Leased · Rent ₹1.17 Cr/mo", c:"gg", path:"gurugram", aid:"gg-25" },
  { keys:["duplex kothi","sector 15 duplex"], n:"Sector 15 Duplex Kothi", l:"Sector 15 Part 2, Gurugram", pt:"₹18 Cr", cr:18, cfg:"4 BHK + Servant · 502 sq.yds.", c:"gg", path:"gurugram", aid:"gg-21" },
  { keys:["nh-8 facing","nh8 facing","sector 15 plot"], n:"NH-8 Facing Plot", l:"Sector 15 Part 2, Gurugram", pt:"₹18.50 Cr", cr:18.5, cfg:"500 sq.yds. Plot", c:"gg", path:"gurugram", aid:"gg-22" },
  { keys:["udyog vihar"], n:"Commercial Building, Udyog Vihar Phase 5", l:"Udyog Vihar Phase 5, Gurugram", pt:"₹40 Cr", cr:40, cfg:"1,000 sq.m. Commercial", c:"gg", path:"gurugram", aid:"gg-23" },
  { keys:["mg road"], n:"MG Road Commercial Building", l:"Sector 16, Gurugram", pt:"₹25 Cr", cr:25, cfg:"1,000 sq.m. Commercial", c:"gg", path:"gurugram", aid:"gg-24" },
  { keys:["golf course penthouse","one golf course","penthouse"], n:"One Golf Course Penthouse", l:"Golf Course Road, Gurugram", pt:"₹12.80 Cr", cr:12.8, cfg:"5 BHK + Pool · 4,200 sq.ft.", c:"gg", path:"gurugram", aid:"gg-01" },
  { keys:["amaryllis"], n:"Amaryllis Residences", l:"Golf Course Road, Gurugram", pt:"₹6.20 Cr", cr:6.2, cfg:"3 BHK + Servant · 2,150 sq.ft.", c:"gg", path:"gurugram", aid:"gg-02" },
  { keys:["golden mile"], n:"One Golden Mile", l:"Sector 62, Gurugram", pt:"₹8.50 Cr", cr:8.5, cfg:"4,500 sq.ft. Office · LEED Platinum", c:"gg", path:"gurugram", aid:"gg-03" },
  { keys:["platinum towers"], n:"Platinum Towers", l:"Dwarka Expressway, Gurugram", pt:"₹2.95 Cr", cr:2.95, cfg:"3 BHK · 1,650 sq.ft.", c:"gg", path:"gurugram", aid:"gg-04" },

  { keys:["cullinan","the cullinan"], n:"The Cullinan Heights", l:"Sector 150, Noida", pt:"₹4.85 Cr", cr:4.85, cfg:"4 BHK + Study · Golf Course View", c:"nd", path:"noida", aid:"nd-01" },
  { keys:["veda forest","forest villas"], n:"Veda Forest Villas", l:"Sector 150, Noida", pt:"₹7.50 Cr", cr:7.5, cfg:"5 BHK Independent Floor · Private Pool", c:"nd", path:"noida", aid:"nd-02" },
  { keys:["magnolia"], n:"Magnolia Court", l:"Sector 44, Noida", pt:"₹3.40 Cr", cr:3.4, cfg:"3 BHK · Metro Proximity", c:"nd", path:"noida", aid:"nd-03" },
  { keys:["aura sky"], n:"Aura Sky Villas", l:"Sector 152, Noida", pt:"₹1.85 Cr", cr:1.85, cfg:"3 BHK Villas · Just Launched", c:"nd", path:"noida", aid:"nd-04" },
  { keys:["oakwood"], n:"Oakwood Estate", l:"Sector 77, Noida", pt:"₹1.85 Cr", cr:1.85, cfg:"300 sq.yds. Plot · Clear Title", c:"nd", path:"noida", aid:"nd-05" },
  { keys:["altius"], n:"Altius Tower", l:"Sector 152, Noida", pt:"₹2.15 Cr", cr:2.15, cfg:"3 BHK · Brigade Group", c:"nd", path:"noida", aid:"nd-06" },
  { keys:["emerald county","emerald"], n:"Emerald County", l:"Sector 150, Noida", pt:"₹2.45 Cr", cr:2.45, cfg:"3 BHK · Tata Housing", c:"nd", path:"noida", aid:"nd-13" },
  { keys:["santorini"], n:"Santorini Bay", l:"Sector 47, Noida", pt:"₹1.25 Cr", cr:1.25, cfg:"2 BHK · Sobha Group", c:"nd", path:"noida", aid:"nd-14" },
  { keys:["aspen heights","aspen"], n:"Aspen Heights", l:"Sector 150, Noida", pt:"₹3.95 Cr", cr:3.95, cfg:"4 BHK · Golf Course View", c:"nd", path:"noida", aid:"nd-18" },
  { keys:["crown plaza"], n:"Crown Plaza Residences", l:"Sector 150, Noida", pt:"₹2.75 Cr", cr:2.75, cfg:"3 BHK · Smart Home", c:"nd", path:"noida", aid:"nd-19" },

  { keys:["aero city"], n:"Aero City Heights", l:"Airport Road, Mohali", pt:"₹2.65 Cr", cr:2.65, cfg:"3 BHK · IT Park Proximity", c:"tri", path:"mohali", aid:"mo-01" },
  { keys:["sector 91 flats","sector 91"], n:"Sector 91 Flats", l:"Sector 91, Mohali", pt:"₹1.65 Cr", cr:1.65, cfg:"2 BHK · GMADA Approved", c:"tri", path:"mohali", aid:"mo-07" },
  { keys:["sukna lakefront","lakefront villa"], n:"Sukna Lakefront Villas", l:"Sector 4, Panchkula", pt:"₹8.90 Cr", cr:8.9, cfg:"5 BHK Villa · Lake Front", c:"tri", path:"mohali", aid:"mo-04" },
  { keys:["it park offices","mohali it park"], n:"IT Park Offices", l:"Mohali IT Park", pt:"₹3.20 Cr", cr:3.2, cfg:"2,000 sq.ft. Office", c:"tri", path:"mohali", aid:"mo-08" },
  { keys:["sector 70 villa"], n:"Sector 70 Villa", l:"Sector 70, Mohali", pt:"₹2.40 Cr", cr:2.4, cfg:"4 BHK Villa · Ready to Move", c:"tri", path:"mohali", aid:"mo-09" },

  { keys:["neemrana","ghiloth","industrial estate"], n:"Pre-Leased Industrial Estate", l:"Ghiloth, Neemrana", pt:"₹250 Cr", cr:250, cfg:"20 Acres · MNC Tenant · Rent ₹1.60 Cr/mo", c:"oth", path:"commercial", aid:null },
  { keys:["laxman public school"], n:"Laxman Public School", l:"Hauz Khas Enclave, South Delhi", pt:"₹450 Cr", cr:450, cfg:"8.5 Acres Institutional · CBSE · 4,400 Students", c:"oth", path:"commercial", aid:null },
];

// Clickable markdown link for a listing — rendered as a real anchor in the chat UI
function linkLine(r: Inv, num?: number): string {
  return `${num ? num + ". " : ""}[${r.n}](${listOf(r)}) · ${r.pt}`;
}

// Compact detail card used when a specific listing is requested
function detailCard(r: Inv): string {
  return `**${r.n}**\n${r.l}\n${r.pt} · ${r.cfg}\n\n[Open this listing →](${listOf(r)})\n\nPrices are asking prices (negotiable). Want a site visit? Call +91-98106-47063.`;
}

function findListing(latestUserLower: string): Inv | null {
  for (const r of LISTINGS) if (r.keys.some((k) => latestUserLower.includes(k))) return r;
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

/* ── Numbered-choice menu memory ──────────────────────────────
 * Whenever the bot presents a numbered list, we remember it per visitor
 * (IP-keyed, 30-min TTL). A bare reply like "2" then drills into that option —
 * same behavior whether lists came from city dumps, budget filters, etc.
 */
type ChatMenuEntry = { title: string; body: string; url: string | null };
const chatMenus = new Map<string, { entries: ChatMenuEntry[]; expiresAt: number }>();
const MENU_TTL_MS = 30 * 60 * 1000;

function rememberMenu(ip: string, entries: ChatMenuEntry[]) {
  if (entries.length === 0) return;
  const now = Date.now();
  for (const [k, v] of chatMenus) if (now > v.expiresAt) chatMenus.delete(k);
  if (chatMenus.size > 500) chatMenus.clear();
  chatMenus.set(ip, { entries, expiresAt: now + MENU_TTL_MS });
}

function recallMenu(ip: string): ChatMenuEntry[] | null {
  const m = chatMenus.get(ip);
  if (!m) return null;
  if (Date.now() > m.expiresAt) { chatMenus.delete(ip); return null; }
  return m.entries;
}

function detailReplyFor(e: ChatMenuEntry): string {
  return `**${e.title}**\n${e.body}${e.url ? `\n\n[Open this listing →](${e.url})` : ""}\n\nPrices are asking prices (negotiable). Want a site visit? Call +91-98106-47063.`;
}

// Menu entry straight from a real inventory row — title + one-line spec + deep link
function rowEntry(r: Inv): ChatMenuEntry {
  return { title: r.n, body: `${r.l}\n${r.pt} · ${r.cfg}`, url: listOf(r) };
}

// Numbered menu lines with clickable titles: "1. [Title](url) · ₹price"
function linkList(rows: Inv[]): string {
  return rows.map((r, i) => linkLine(r, i + 1)).join("\n");
}

// Turns any list of entries into the numbered text block we show users
function numberedBlock(items: { label: string }[]): string {
  return items.map((it, i) => `${i + 1}. ${it.label}`).join("\n");
}

/* ── Region answers ─────────────────────────────────────────── */
// ip may be null when generating texts at module load (no side-effect menus wanted)
function cityAnswer(ip: string | null, city: string, q = ""): string {
  const commercialOnly = matchKeywords(q, ["commercial","office","shop","retail","mall","pre-rented","leased"]);
  let menu: ChatMenuEntry[] = [];
  let rows: Inv[] = [];
  let intro = "";
  let footer = "\n\nReply with a number for the listing page. All prices negotiable.";

  if (city === "gurugram") {
    rows = LISTINGS.filter((r) => r.c === "gg");
    if (commercialOnly) rows = rows.filter((r) => !/BHK|Plot|Kothi/i.test(r.cfg));
    intro = commercialOnly ? "Commercial properties in Gurugram:" : "Properties available in Gurugram:";
    footer += `\nBrowse all: ${SITE}gurugram`;
  } else if (city === "noida") {
    rows = LISTINGS.filter((r) => r.c === "nd");
    intro = "Properties available in Noida:";
    footer += `\nAll verified under our 5-point framework. Browse all: ${SITE}noida`;
  } else if (city === "tricity") {
    rows = LISTINGS.filter((r) => r.c === "tri");
    intro = "Chandigarh Tricity (Mohali–Panchkula) inventory:";
    footer += `\nWe also advise on Zirakpur & Kharar. Browse all: ${SITE}mohali`;
  } else if (city === "delhi") {
    rows = LISTINGS.filter((r) => r.l.includes("Delhi") || r.path === "commercial" && r.keys.includes("laxman public school"));
    intro = "Delhi inventory:";
    footer += "\nFor builder floors/residential we work on requirement basis — share budget & area.";
  } else if (city === "faridabad") {
    return "Faridabad: We cover residential apartments and plots across Sectors 79–89 — the emerging development zone with strong appreciation potential.\n\nShare your budget and preferred sector and I'll shortlist options, or call +91-98106-47063. See the city page: " + SITE + "faridabad";
  } else if (city === "manesar") {
    return "Manesar sits right on our Gurugram coverage — industrial plots and pre-rented options along NH-48. Share your requirement (size, budget, industrial vs commercial) and I'll shortlist. Call +91-98106-47063.";
  } else if (city === "ghaziabad") {
    return "Ghaziabad/Raj Nagar Extension: options come up on requirement basis. Share budget and configuration (2/3 BHK etc.) and our team will shortlist verified choices. Call +91-98106-47063.";
  }

  if (rows.length > 0) {
    menu = rows.map(rowEntry);
    if (ip) rememberMenu(ip, menu);
    return intro + "\n\n" + linkList(rows) + footer;
  }
  return "";
}

// Precomputed region texts (no menu side effects) for use inside other menus
const REGION_SUMMARY: Record<string, string> = {
  gurugram: cityAnswer(null, "gurugram"),
  noida: cityAnswer(null, "noida"),
  faridabad: cityAnswer(null, "faridabad"),
  tricity: cityAnswer(null, "tricity"),
  delhi: cityAnswer(null, "delhi"),
};

function resolveInventoryQuery(q: string, ip: string): string | null {
  const cityWordMap: Record<string, string> = {
    gurugram:"gg", "gurgaon":"gg", dlf:"gg", noida:"nd",
    faridabad:"fb", chandigarh:"tri", mohali:"tri", tricity:"tri",
    zirakpur:"tri", panchkula:"tri", kharar:"tri", delhi:"dl",
  };
  let cityPool: string | null = null;
  const cityKeys = Object.keys(cityWordMap);
  for (const w of q.split(/[^a-z]+/)) if (cityKeys.includes(w)) { cityPool = cityWordMap[w]; break; }

  // Budget: "under 3 cr", "below 70 lakh", "1.5 crore budget", bare numbers with unit
  let budgetCr: number | null = null;
  const m = q.match(/(\d+(?:\.\d+)?)\s*(cr|crore|crores|lac|lakh|lakhs|lacs)/);
  if (m) {
    const v = parseFloat(m[1]);
    budgetCr = m[2].startsWith("cr") ? v : v * 0.01;
  }

  const bhkM = q.match(/\b([12345])\s*bhk\b/);
  const wantsCheap = /\b(cheap|cheapest|low(est)? price|lowest|affordable|smallest)\b/.test(q);
  const wantsDear = /\b(expensive|most premium|top end|highest|costliest|dearest)\b/.test(q);

  if (budgetCr === null && !bhkM && !wantsCheap && !wantsDear) return null;

  let pool = LISTINGS.filter((i) => (cityPool === null || i.c === cityPool));
  // Priciest building skews pools — keep commercial out unless asked or already filtered
  if (!q.includes("commercial") && !q.includes("office") && !q.includes("industrial") && !q.includes("school") && !q.includes("mall")) {
    pool = pool.filter((i) => i.cr <= 30);
  }
  if (pool.length === 0) pool = LISTINGS;

  const byBhk = bhkM
    ? pool.filter((i) => i.cfg.includes(bhkM[1] + " BHK"))
    : pool;
  const resultPool = byBhk.length > 0 ? byBhk : pool;

  let list = [...resultPool];
  if (bhkM === null && wantsCheap === false && wantsDear === true) {
    list.sort((a, b) => b.cr - a.cr); list = list.slice(0, 5);
  } else if ((wantsCheap && budgetCr !== null)) {
    list.sort((a, b) => a.cr - b.cr);
    list = list.filter((i) => i.cr <= budgetCr! * 1.15);
    if (list.length === 0) list = [...resultPool].sort((a, b) => a.cr - b.cr).slice(0, 4);
  } else if (wantsCheap || budgetCr !== null) {
    if (wantsCheap) { list.sort((a, b) => a.cr - b.cr); list = list.slice(0, 5); }
    else {
      list.sort((a, b) => a.cr - b.cr);
      const within = list.filter((i) => i.cr <= budgetCr! * 1.15);
      list = within.slice(0, 6);
    }
  }

  if (list.length === 0) {
    return `Nothing fits that exactly yet. Our closest options start around ${[...resultPool].sort((a,b)=>a.cr-b.cr)[0]?.pt}. Would you like me to share those instead? You can also call +91-98106-47063 with your exact requirement.`;
  }

  const cityName: Record<string,string> = { gg:"Gurugram", nd:"Noida", fb:"Faridabad", tri:"the Tricity", dl:"Delhi" };
  const scopeLine = cityPool ? `in ${cityName[cityPool]}` : "across Delhi NCR";
  rememberMenu(ip, list.map(rowEntry));
  return `Here's what matches ${scopeLine}:\n\n${linkList(list)}\n\nReply with a number (e.g. "1") to open the listing page. All asking prices are negotiable.`;
}

function buildLocalAnswer(messages: { role: string; content: string }[], ip: string): string {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const lastBotMsg = [...messages].reverse().find((m) => m.role === "assistant")?.content || "";
  const q = lastUserMsg.toLowerCase();
  const ctx = lastBotMsg.toLowerCase();
  // Only short replies are treated as answers to the bot's previous question;
  // anything longer is treated as a fresh query.
  const shortReply = q.length <= 60;

  // ── 0. Named property in THIS message always wins ──
  const named = findListing(q);
  if (named) return detailCard(named);

  const city = detectCity(q);

  // ── 1. Context-aware: answer what the bot just asked (only for short replies) ──

  // If bot asked about budget/price and user gives a number
  if (shortReply && /\d/.test(q) && (ctx.includes("budget") || ctx.includes("price range") || ctx.includes("budget range")) && !city) {
    const inv = resolveInventoryQuery(q, ip);
    if (inv) return inv;
    return "Thanks! To shortlist precisely, tell me:\n- Preferred location (Gurugram, Noida, Mohali?)\n- Property type (apartment, plot, commercial?)\n\nI'll send exact matches with links.";
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

  // ── 3. Out-of-area cities → acknowledge + offer covered regions as a menu ──
  if (OUT_OF_AREA.some((c) => q.includes(c))) {
    const regions: { key: string; label: string }[] = [
      { key:"gurugram", label:"Gurugram (12 listings, ₹2.22 Cr – ₹2,250 Cr)" },
      { key:"noida",    label:"Noida (5 apartments, ₹48–72 Lakh)" },
      { key:"faridabad",label:"Faridabad (Sectors 79–89)" },
      { key:"tricity",  label:"Chandigarh Tricity / Mohali" },
      { key:"delhi",    label:"South Delhi" },
    ];
    rememberMenu(ip, regions.map((r) => ({ title:r.label, body:REGION_SUMMARY[r.key] || "", url:null })));
    return "Sorry, we don't currently have inventory there. Vedhara Group operates across Delhi NCR and North India:\n\n"
      + numberedBlock(regions.map((r) => ({ label: r.label })))
      + "\n\nReply with a number to see that region's listings.";
  }

  // ── 3b. Specific asks: budget / BHK / cheapest / priciest ──
  const inv = resolveInventoryQuery(q, ip);
  if (inv) return inv;

  // ── 4. City queries always answer with that city's inventory ──
  if (city) {
    const answer = cityAnswer(ip, city, q);
    if (answer) return answer;
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
    return "Great! To help you better, could you share:\n- Budget range\n- Preferred location (Gurugram, Noida, Faridabad, Tricity?)\n- Property type (apartment, plot, commercial?)\n\nCurrent highlights:\n• Gurugram: ₹2.95 Cr to ₹25 Cr residential\n• Noida: ₹1.25 Cr to ₹7.50 Cr\n• Mohali–Panchkula: ₹1.65 Cr to ₹8.90 Cr\n\nAll listings come with our 5-point Verification Framework.";
  }

  // Commercial (generic)
  if (matchKeywords(q, ["commercial","office space","office building","shops","retail space","pre-rented","pre leased","warehouse","industrial"])) {
    const picks = ["HQ27","Rented Bank","Pre-Rented Building","Udyog Vihar","MG Road","Golden Mile","Neemrana","IT Park Offices"]
      .map((p) => LISTINGS.find((i) => i.n.toLowerCase().includes(p.toLowerCase()) || i.keys.includes(p.toLowerCase())))
      .filter((i): i is Inv => Boolean(i));
    rememberMenu(ip, picks.map(rowEntry));
    return "Commercial inventory across Delhi NCR:\n\n" + linkList(picks)
      + "\n\nReply with a number (e.g. \"3\") to open the listing page.";
  }

  // Investment
  if (matchKeywords(q, ["invest","investment","roi","appreciation","best area","where to invest","growth"])) {
    return "Top investment areas we recommend:\n\nGurugram:\n• Dwarka Expressway — new launches, strong appreciation\n• Golf Course Road — premium, stable returns\n• Sector 76–82 — affordable commercial with rental income\n\nNoida:\n• Sectors 150–152 — planned sectors on the expressway\n• Sector 62 — IT corridor offices\n\nFaridabad: Sectors 79–89 — emerging zone\nMohali: Airport Road & IT Park — employment-led growth\n\nWe provide independent investment advisory with ROI projections. Call +91-98106-47063 for a personalized plan.";
  }

  // Luxury
  if (matchKeywords(q, ["luxury","luxurious","villa","penthouse","farmhouse","high end","kothi"])) {
    const picks = LISTINGS.filter((i) => /Villa|Penthouse|Pool|Kothi|5 BHK/i.test(i.cfg));
    rememberMenu(ip, picks.map(rowEntry));
    return "Premium properties:\n\n" + linkList(picks)
      + "\n\nReply with a number to open the listing page. Browse all: " + SITE + "luxury";
  }

  // Rental / rent
  if (matchKeywords(q, ["rent","rental","lease out","tenant"])) {
    return "Rent & leasing services:\n• Tenant screening & verification\n• Lease drafting & registration\n• Rent negotiation at fair market value\n• Ongoing property management (rent collection, maintenance, inspections)\n\nAre you looking to rent OUT a property, or take one on rent? Call +91-98106-47063.";
  }

  // Price/budget
  if (matchKeywords(q, ["price","prices","pricing","cost","budget","affordable","cheap","expensive","lakh","crore"])) {
    const under1 = linkList(LISTINGS.filter((i) => i.cr < 1).slice(0, 3));
    const m10 = linkList(LISTINGS.filter((i) => i.cr >= 2 && i.cr <= 10).sort((a,b)=>a.cr-b.cr).slice(0, 3));
    return "Budget snapshot:\n\nUnder ₹1 Cr:\n" + (under1 || "• Ask us — new options arrive weekly")
      + "\n\n₹2–10 Cr:\n" + m10
      + "\n\nTell me your budget + city and I'll send exact matches with links. Or call +91-98106-47063.";
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

## Current Listings (verified — link format: [Title](pageURL))
Gurugram ([/gurugram]): HQ27 Premium Commercial Building ₹2,250 Cr · Rented Bank Property Sector 76 ₹2.22 Cr · 3 Kay Plotted Residence DLF Phase 1 ₹25 Cr · Pre-Rented Building Sector 32 ₹200 Cr · Duplex Kothi ₹18 Cr · NH-8 Plot ₹18.5 Cr · Udyog Vihar ₹40 Cr · MG Road ₹25 Cr · Golf Course Penthouse ₹12.8 Cr · Amaryllis ₹6.2 Cr · Golden Mile ₹8.5 Cr · Platinum Towers ₹2.95 Cr
Noida ([/noida]): Cullinan Heights ₹4.85 Cr · Veda Forest Villas ₹7.5 Cr · Magnolia Court ₹3.4 Cr · Aura Sky Villas ₹1.85 Cr · Oakwood Estate ₹1.85 Cr · Altius Tower ₹2.15 Cr · Emerald County ₹2.45 Cr · Santorini Bay ₹1.25 Cr · Aspen Heights ₹3.95 Cr · Crown Plaza ₹2.75 Cr
Mohali–Panchkula ([/mohali]): Aero City Heights ₹2.65 Cr · Sector 91 Flats ₹1.65 Cr · Sukna Lakefront Villas ₹8.9 Cr · IT Park Offices ₹3.2 Cr · Sector 70 Villa ₹2.4 Cr
Commercial specials ([/commercial]): Neemrana Industrial Estate ₹250 Cr · Laxman Public School ₹450 Cr

## Best Investment Areas
Gurugram: Dwarka Expressway (appreciation), Golf Course Road (premium), Sector 76–82 (commercial), Udyog Vihar (established)
Noida: Expressway corridor, Greater Noida West (affordable)
Faridabad: Sectors 79–89 (emerging)
Chandigarh: Mohali (IT hub), Zirakpur (residential)

## Listing Page URLs
- Gurugram listings: https://www.vedharagroup.com/gurugram
- Noida listings: https://www.vedharagroup.com/noida
- Mohali / Tricity listings: https://www.vedharagroup.com/mohali
- Commercial/industrial/institutional: https://www.vedharagroup.com/commercial
- Luxury (penthouse, kothi, DLF Phase 1): https://www.vedharagroup.com/luxury

## Business Hours
- Chat advisor availability: 10 AM – 7 PM IST, all days
- Outside hours the system itself replies with an away message — you will not be called then.

## Rules
- Be friendly, concise (under 120 words)
- KEEP REPLIES SHORT — give the listing TITLE and its clickable page link, NOT long spec sheets. Visitors click through for details.
- Format every property reference as a markdown link: [Title](https://www.vedharagroup.com/...) using /gurugram /noida /mohali /commercial paths
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

  // Layer 0: numeric reply ("1", "2", "#3", "3.") drills into the last list we presented.
  // Runs before business-hours gate so visitors can keep browsing away-hours too.
  const lastUserText = [...messages].reverse().find((m) => m.role === "user")?.content?.trim() || "";
  const bareNum = lastUserText.match(/^(?:#)?(\d{1,2})(?:[.)])?$/);
  if (bareNum) {
    const menuEntries = recallMenu(ip);
    if (menuEntries) {
      const pick = menuEntries[parseInt(bareNum[1], 10) - 1];
      if (pick) {
        // Re-member the same menu so the visitor can keep exploring other numbers
        rememberMenu(ip, menuEntries);
        return NextResponse.json({ reply: detailReplyFor(pick) + captureNote, leadCaptured });
      }
    }
  }

  // Layer 1: OpenAI (when OPENAI_API_KEY is set) answers the actual question in
  // natural language, grounded by the system prompt. Any failure falls through.
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
      console.error("[OpenAI error, using local knowledge base]", err);
    }
  }

  // Layer 2: Local knowledge base (always works, no API key needed) — direct
  // answers for listings, cities, budgets; OpenAI-free environments included.
  return NextResponse.json({ reply: buildLocalAnswer(messages, ip) + captureNote, leadCaptured });
}
