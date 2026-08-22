/**
 * lib/seo/listings.ts
 *
 * Builds ItemList-of-RealEstateListing JSON-LD from the listing arrays that are
 * already rendered on a page (city template listings, search results, category
 * page cards, featured strips). Data-only helper consumed via components/seo/
 * JsonLd — emits no visible markup and has zero layout impact.
 *
 * Every field is derived mechanically from data displayed on the card itself:
 * name/description/price/locality/size/image are taken verbatim; prices like
 * "₹ 18.50 Cr" / "₹ 95 Lakhs" / "₹ 58,000/mo" are parsed to INR numerals for
 * offers.price, with the original display string preserved verbatim in
 * additionalProperty so no meaning is lost.
 */

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vedharagroup.com";

export interface ListingSchemaInput {
  /** Stable card id used for the ListItem @id fragment */
  id?: string;
  /** Listing title exactly as rendered */
  name: string;
  /** Card description (highlights join, blurb) if available */
  description?: string;
  /** Display price exactly as rendered, e.g. "₹ 18 Cr", "₹ 58,000/mo" */
  priceDisplay?: string;
  /** Locality line exactly as rendered, e.g. "Sector 15 Part 2, Gurugram" */
  locality: string;
  /** Category as rendered, e.g. "Residential", "Office", "Penthouse" */
  propertyType?: string;
  /** Floor size / configuration text as rendered */
  size?: string;
  /** Status/tag chip as rendered, e.g. "Ready to Move" */
  status?: string;
  /** Card image path or URL */
  image?: string;
}

/** Absolute-ise an image reference against the canonical site URL. */
function absoluteImage(src?: string): string | undefined {
  if (!src) return undefined;
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE}${src.startsWith("/") ? "" : "/"}${src}`;
}

/**
 * Parse the site's regular display-price formats into INR numerals:
 *   "₹ 18.50 Cr" → 185_000_000 · "₹ 22 L"/"₹ 28 Lakhs" → 2_200_000..2_800_000
 *   "₹ 1,80,000/mo" → 180_000 (per month) · "₹ 95 Lakhs/yr" → 9_500_000 (per year)
 * Decorative suffixes ("Demand", "Asking", "Outright", "(Negotiable)") are ignored.
 * Returns null for anything unparseable — callers then simply omit offers.
 */
export function parsePriceINR(
  s?: string
): { value: number; period: "MONTH" | "YEAR" | null } | null {
  if (!s) return null;
  const cleaned = s.replace(/[₹,\s]/g, "").toUpperCase();
  const m = cleaned.match(/^(\d+(?:\.\d+)?)(CR|LAKHS|L)/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (!Number.isFinite(n)) return null;
  const base = m[2] === "CR" ? n * 1e7 : n * 1e5;
  const period = cleaned.includes("/MO") ? "MONTH" : cleaned.includes("/YR") ? "YEAR" : null;
  return { value: Math.round(base), period };
}

/** Build the complete ItemList JSON-LD object for one page's listings. */
export function listingsSchema(pagePath: string, items: ListingSchemaInput[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => {
      const price = parsePriceINR(it.priceDisplay);
      const additionalProperty: Record<string, unknown>[] = [];
      if (it.propertyType)
        additionalProperty.push({ "@type": "PropertyValue", name: "Property Type", value: it.propertyType });
      if (it.size)
        additionalProperty.push({ "@type": "PropertyValue", name: "Configuration / Size", value: it.size });
      if (it.status)
        additionalProperty.push({ "@type": "PropertyValue", name: "Availability", value: it.status });
      if (it.priceDisplay)
        additionalProperty.push({ "@type": "PropertyValue", name: "Price (as listed)", value: it.priceDisplay });

      const node: Record<string, unknown> = {
        "@type": "RealEstateListing",
        name: it.name,
        url: `${SITE}${pagePath}`,
        description:
          it.description ||
          [it.propertyType, it.size, it.status, it.locality].filter(Boolean).join(" · "),
        address: {
          "@type": "PostalAddress",
          addressLocality: it.locality,
          addressCountry: "IN",
        },
        ...(additionalProperty.length ? { additionalProperty } : {}),
        ...(price
          ? {
              offers: {
                "@type": "Offer",
                price: price.value,
                priceCurrency: "INR",
              },
            }
          : {}),
        ...(absoluteImage(it.image) ? { image: absoluteImage(it.image) } : {}),
      };

      return {
        "@type": "ListItem",
        position: i + 1,
        ...(it.id ? { "@id": `${SITE}${pagePath}#${it.id}` } : {}),
        item: node,
      };
    }),
  };
}
