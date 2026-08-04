import Link from "next/link";

export interface RelatedLinkItem {
  href: string;
  label: string;
  description: string;
}

interface RelatedLinksSectionProps {
  title?: string;
  intro?: string;
  links: RelatedLinkItem[];
  background?: "cream" | "navy";
}

export default function RelatedLinksSection({
  title = "Explore More",
  intro = "Related pages and guides that help visitors move from one stage of their property journey to the next.",
  links,
  background = "cream",
}: RelatedLinksSectionProps) {
  const isNavy = background === "navy";

  return (
    <section
      style={{
        background: isNavy ? "var(--navy)" : "var(--cream)",
        padding: "56px 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="v-line" style={{ margin: "0 auto 14px" }} />
          <p className="eyebrow" style={{ color: isNavy ? "var(--gold-lt)" : "#d4a843", marginBottom: 12 }}>
            {title}
          </p>
          <h2 className="heading-xl" style={{ color: isNavy ? "var(--light)" : "var(--navy)", marginBottom: 12 }}>
            Keep exploring the right next step
          </h2>
          <p className="body-lg" style={{ color: isNavy ? "rgba(252,250,244,0.6)" : "var(--slate)", maxWidth: 720, margin: "0 auto" }}>
            {intro}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }} className="grid-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none", display: "flex" }}>
              <div
                className="hover-lift"
                style={{
                  flex: 1,
                  background: isNavy ? "rgba(252,250,244,0.96)" : "var(--cream)",
                  border: isNavy ? "1px solid rgba(212,168,67,0.2)" : "1px solid rgba(212,168,67,0.15)",
                  borderRadius: 16,
                  padding: "24px 22px",
                  boxShadow: isNavy ? "0 10px 28px rgba(0,0,0,0.16)" : "0 8px 24px rgba(9,15,29,0.06)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--t-head)",
                    fontSize: 9.5,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold-dk)",
                    marginBottom: 10,
                  }}
                >
                  Related guide
                </p>
                <h3 style={{ fontFamily: "var(--t-head)", fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 8, lineHeight: 1.35 }}>
                  {item.label}
                </h3>
                <p className="body-sm" style={{ color: "var(--slate)", lineHeight: 1.7, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
