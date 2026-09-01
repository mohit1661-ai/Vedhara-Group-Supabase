/**
 * Listing deep-link resolution.
 *
 * Maps a listing title to the anchor id of its card ON THE PAGE BEING LINKED
 * TO. Every service page (buy, sell, commercial, luxury, rent, new-launches,
 * tricity) and every city page renders id={listing.id} on its cards, so a CTA
 * click lands on the exact listing — never on the page hero.
 *
 * The index is built from the same arrays the pages render
 * (lib/data/pageListings.ts + lib/data/cityPages.ts), so it cannot drift from
 * what is actually on screen.
 */
import { cityPages } from "@/lib/data/cityPages";
import {
  featuredListings,
  sellListings,
  commercialListings,
  luxuryListings,
  rentalListings,
  launchProjects,
  tricityListings,
} from "@/lib/data/pageListings";

/** Normalise a title for lookup */
export function titleKey(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, " ");
}

function indexByTitle(entries: { id: string; title: string }[]): Record<string, string> {
  return entries.reduce<Record<string, string>>((acc, l) => {
    acc[titleKey(l.title)] = l.id;
    return acc;
  }, {});
}

/** Destination path → { normalised title → card id on that page } */
const PAGE_ANCHORS: Record<string, Record<string, string>> = {
  "/buy": indexByTitle(featuredListings),
  "/sell": indexByTitle(sellListings),
  "/commercial": indexByTitle(commercialListings),
  "/luxury": indexByTitle(luxuryListings),
  "/rent": indexByTitle(rentalListings),
  "/new-launches": indexByTitle(launchProjects.map((p) => ({ id: p.id, title: p.projectName }))),
  "/tricity": indexByTitle(tricityListings),
};
for (const city of Object.values(cityPages)) {
  PAGE_ANCHORS[`/${city.slug}`] = indexByTitle(city.listings);
}

/** Contact prefill key per destination path, used as fallback when a listing
 * title is not found on the page being linked to. City pages default to the
 * buy-side enquiry. */
const CONTACT_KEY: Record<string, string> = {
  "/buy": "buy",
  "/rent": "rent",
  "/sell": "sell",
  "/commercial": "commercial",
  "/luxury": "luxury",
  "/new-launches": "new-launches",
  "/tricity": "tricity",
};

/**
 * Appends the anchor of `title`'s card on the page `link` points to.
 * If the listing is not present on that page, falls back to the contact form
 * (prefilled for the relevant service) instead of a contextless page hero.
 */
export function withAnchor(link: string, title: string): string {
  if (link.includes("#")) return link;
  const path = link.split("?")[0].replace(/\/+$/, "") || "/";
  const id = PAGE_ANCHORS[path]?.[titleKey(title)];
  if (id) return `${path}#${id}`;
  return `/contact#${CONTACT_KEY[path] ?? "buy"}`;
}
