/**
 * Listing anchor resolution.
 *
 * Maps canonical listing titles (lowercase) to the DOM anchor id their card
 * carries on its destination page (CityPageTemplate renders id={property.id}).
 * Used by card grids (search results, homepage features, services) so clicks
 * land on the exact listing — never on a page's hero section.
 */

export const ANCHORS_BY_TITLE: Record<string, string> = {
  // Gurugram (/gurugram)
  "hq27 premium commercial building": "gg-bk2",
  "rented bank property, sector 76": "gg-bk1",
  "3 kay plotted residence": "gg-26",
  "fully furnished pre-rented building": "gg-25",
  "sector 15 duplex kothi": "gg-21",
  "nh-8 facing plot": "gg-22",
  "commercial building, udyog vihar phase 5": "gg-23",
  "mg road commercial building": "gg-24",
  "one golf course penthouse": "gg-01",
  "amaryllis residences": "gg-02",
  "one golden mile": "gg-03",
  "platinum towers": "gg-04",
  // Noida (/noida)
  "the cullinan heights": "nd-01",
  "veda forest villas": "nd-02",
  "magnolia court": "nd-03",
  "aura sky villas": "nd-04",
  "oakwood estate": "nd-05",
  "altius tower": "nd-06",
  "emerald county": "nd-13",
  "santorini bay": "nd-14",
  "aspen heights": "nd-18",
  "crown plaza residences": "nd-19",
  // Tricity (/mohali)
  "aero city heights": "mo-01",
  "sector 91 flats": "mo-07",
  "sukna lakefront villas": "mo-04",
  "it park offices": "mo-08",
  "sector 70 villa": "mo-09",
};

/** Normalise a title for lookup */
export function titleKey(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Appends the correct #anchor to a listing's page URL when its title is known.
 * Unknown titles fall back to the original link unchanged.
 */
export function withAnchor(link: string, title: string): string {
  const anchor = ANCHORS_BY_TITLE[titleKey(title)];
  if (!anchor || link.includes("#")) return link;
  return `${link}#${anchor}`;
}
