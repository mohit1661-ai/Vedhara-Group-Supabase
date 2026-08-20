/**
 * Human-friendly, human-readable search URLs.
 *
 * The SEO audit flags query-string links like
 *   /search?mode=buy&type=apartment&q=3%20bhk%20gurugram
 * as unfriendly. Search links are therefore emitted (and parsed back) as
 * slash-delimited path segments:
 *   /search/buy/apartment/3-bhk-gurugram
 *
 * Segment order is fixed: mode, type, budget, then the keyword slug. A segment
 * is only interpreted as a known mode/type/budget if it matches one of the
 * whitelists below; anything else is treated as part of the free-text query.
 */

export interface SearchFilters {
  q?: string;
  mode?: string;
  type?: string;
  budget?: string;
}

const MODES = ["buy", "rent", "sell"];
const TYPES = ["apartment", "villa", "plot", "penthouse", "commercial"];
const BUDGETS = [
  "under1",
  "1-3",
  "3-5",
  "5-10",
  "10plus",
  "under20k",
  "20k-50k",
  "50k-1l",
  "1l-2l",
  "2lplus",
];

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function deslugify(s: string): string {
  return s.replace(/-/g, " ").trim();
}

export function paramsToSearchPath(f: SearchFilters): string {
  const segs: string[] = [];
  if (f.mode) segs.push(f.mode);
  if (f.type && f.type !== "any") segs.push(f.type);
  if (f.budget && f.budget !== "any") segs.push(f.budget);
  if (f.q && f.q.trim()) segs.push(slugify(f.q));
  return segs.length ? `/search/${segs.join("/")}` : "/search";
}

export function searchPathToParams(segments: string[]): SearchFilters {
  let mode: string | undefined;
  let type: string | undefined;
  let budget: string | undefined;
  const qWords: string[] = [];

  for (const raw of segments) {
    const seg = raw.toLowerCase();
    if (!mode && MODES.includes(seg)) mode = seg;
    else if (!type && TYPES.includes(seg)) type = seg;
    else if (!budget && BUDGETS.includes(seg)) budget = seg;
    else qWords.push(deslugify(seg));
  }

  const f: SearchFilters = {};
  if (mode) f.mode = mode;
  if (type) f.type = type;
  if (budget) f.budget = budget;
  const q = qWords.join(" ").replace(/\s+/g, " ").trim();
  if (q) f.q = q;
  return f;
}
