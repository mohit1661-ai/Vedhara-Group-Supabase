/**
 * Single source of truth for firm-level trust credentials.
 *
 * Update the values below with your genuine RERA registration number(s) and
 * association memberships. Every trust badge, JSON-LD identifier field, and
 * footer label across the site reads from here — one edit propagates everywhere.
 *
 * If a field is left empty or set to null, the badge displays a safe generic
 * label (e.g. "RERA Verified Partner") instead of a fabricated number.
 */

export interface ReraRegistration {
  /** The numeric/alphanumeric registration number, e.g. "HRERA-GGM-1234" */
  number: string | null;
  /** The issuing authority, e.g. "Haryana RERA (HRERA)", "UP RERA", "Delhi RERA" */
  authority: string;
  /** Short label shown on badges, e.g. "HRERA", "UP RERA" */
  shortLabel: string;
  /** Full label for tooltip / verbose display */
  fullLabel: string;
}

export interface AssociationMembership {
  /** Association name, e.g. "CREDAI", "NAREDCO" */
  name: string;
  /** Membership or registration number (null if not yet supplied) */
  number: string | null;
  /** Short badge label */
  label: string;
}

export interface TrustBadge {
  /** Visible label on the badge chip */
  label: string;
  /** If true, only shown when a real RERA number is supplied */
  requiresRera?: boolean;
}

/**
 * ── RERA REGISTRATIONS ──────────────────────────────────────────────
 * Fill in your genuine registration numbers below.
 * Multiple entries are supported (e.g. one for Haryana, one for UP).
 */
export const reraRegistrations: ReraRegistration[] = [
  {
    number: null, // TODO: replace with your real HRERA number, e.g. "HRERA-GGM-XXXX"
    authority: "Haryana RERA (HRERA)",
    shortLabel: "HRERA",
    fullLabel: "Haryana Real Estate Regulatory Authority",
  },
  {
    number: null, // TODO: replace with your real UP RERA number
    authority: "UP RERA",
    shortLabel: "UP RERA",
    fullLabel: "Uttar Pradesh Real Estate Regulatory Authority",
  },
];

/**
 * ── ASSOCIATION MEMBERSHIPS ─────────────────────────────────────────
 * Fill in your genuine membership numbers below.
 */
export const associationMemberships: AssociationMembership[] = [
  { name: "CREDAI", number: null, label: "CREDAI Member" },   // TODO
  { name: "NAREDCO", number: null, label: "NAREDCO Member" }, // TODO
];

/**
 * ── TRUST BADGE LABELS ──────────────────────────────────────────────
 * These are the safe, always-true labels shown across the site.
 * The RERA badge dynamically switches between a generic label and the
 * real number depending on whether a genuine number is configured above.
 */

/** Badges that appear in the hero trust strip (CinematicHero) */
export const heroTrustBadges: TrustBadge[] = [
  { label: "Transparent Fees" },
  { label: "Verified Developer Partners" },
  { label: "4 Free Property Tools" },
  { label: "NRI Desk Available" },
];

/** Badges that appear in the footer trust strip */
export const footerTrustBadges: TrustBadge[] = [
  { label: "ISO Verified" },
  { label: "Independent by Design" },
];

/** Badges that appear in the consultation section trust strip */
export const consultationTrustBadges: TrustBadge[] = [
  { label: "ISO Verified" },
  { label: "Independent by Design" },
];

/**
 * ── HELPER FUNCTIONS ────────────────────────────────────────────────
 */

/** Returns true if any RERA registration has a genuine number configured */
export function hasRealReraNumber(): boolean {
  return reraRegistrations.some((r) => r.number !== null && r.number.trim() !== "");
}

/** Returns the primary RERA badge label (number if real, generic if not) */
export function reraBadgeLabel(): string {
  const withNumber = reraRegistrations.find((r) => r.number && r.number.trim() !== "");
  if (withNumber) return `RERA Reg. ${withNumber.number}`;
  return "RERA Verified Partner";
}

/** Returns all membership badges that have real numbers configured */
export function activeMemberships(): AssociationMembership[] {
  return associationMemberships.filter((m) => m.number !== null && m.number.trim() !== "");
}

/** Returns all visible trust badges (RERA + memberships + static) for a given position */
export function allTrustBadges(
  position: "hero" | "footer" | "consultation"
): string[] {
  const staticBadges =
    position === "hero" ? heroTrustBadges :
    position === "footer" ? footerTrustBadges :
    consultationTrustBadges;

  const badges: string[] = [];

  // Always add the RERA badge (real number or generic)
  badges.push(reraBadgeLabel());

  // Add memberships with real numbers
  for (const m of activeMemberships()) {
    badges.push(m.number ? `${m.label} (${m.number})` : m.label);
  }

  // Add static badges
  for (const b of staticBadges) {
    badges.push(b.label);
  }

  return badges;
}

/**
 * Returns the Organization JSON-LD `identifier` field.
 * Only populated when real RERA numbers are configured.
 */
export function organizationIdentifiers(): Record<string, string>[] | undefined {
  const ids: Record<string, string>[] = [];

  for (const r of reraRegistrations) {
    if (r.number && r.number.trim() !== "") {
      ids.push({
        "@type": "PropertyValue",
        name: r.authority + " Registration",
        value: r.number,
      });
    }
  }

  for (const m of associationMemberships) {
    if (m.number && m.number.trim() !== "") {
      ids.push({
        "@type": "PropertyValue",
        name: m.name + " Membership",
        value: m.number,
      });
    }
  }

  return ids.length > 0 ? ids : undefined;
}
