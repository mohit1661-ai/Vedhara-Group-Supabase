/**
 * TrustBadges — reusable trust-badge strip rendered from firmDetails.ts config.
 *
 * Two variants:
 *   variant="pills"  — bordered pill chips (footer / consultation section style)
 *   variant="dots"   — gold-dot list (hero trust-strip style)
 *
 * Client component so it can be used in both server and client contexts
 * (Footer, HomeConsultationSection, CinematicHero).
 */
"use client";
import {
  reraBadgeLabel,
  activeMemberships,
  heroTrustBadges,
  footerTrustBadges,
  consultationTrustBadges,
  type TrustBadge,
} from "@/lib/data/firmDetails";

type BadgeVariant = "pills" | "dots";

interface TrustBadgesProps {
  /** Which position's badge set to render */
  position: "hero" | "footer" | "consultation";
  /** Visual variant — "pills" for bordered chips, "dots" for gold-dot list */
  variant?: BadgeVariant;
  /** Inline styles on the outer wrapper */
  style?: React.CSSProperties;
}

export default function TrustBadges({
  position,
  variant = "pills",
  style,
}: TrustBadgesProps) {
  const staticBadges: TrustBadge[] =
    position === "hero" ? heroTrustBadges :
    position === "footer" ? footerTrustBadges :
    consultationTrustBadges;

  const reraLabel = reraBadgeLabel();
  const memberships = activeMemberships();

  // Build full badge list: RERA first, then memberships, then static
  const allLabels: string[] = [reraLabel];
  for (const m of memberships) {
    allLabels.push(m.number ? `${m.label} (${m.number})` : m.label);
  }
  for (const b of staticBadges) {
    allLabels.push(b.label);
  }

  if (variant === "dots") {
    return (
      <div
        className="trust-strip"
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          ...style,
        }}
      >
        {allLabels.map((t) => (
          <div key={t} className="trust-item">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--gold-lt)",
                display: "block",
                boxShadow: "0 0 8px rgba(232,201,112,0.6)",
                flexShrink: 0,
              }}
            />
            <span className="trust-label">{t}</span>
          </div>
        ))}
      </div>
    );
  }

  // Pills variant (footer / consultation style)
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        ...style,
      }}
    >
      {allLabels.map((b) => (
        <span
          key={b}
          style={{
            fontFamily: "var(--t-head)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--gold-lt)",
            border: "1px solid rgba(212,168,67,0.2)",
            padding: "4px 8px",
          }}
        >
          {b}
        </span>
      ))}
    </div>
  );
}
