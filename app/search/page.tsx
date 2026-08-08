import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FilterSelect from "@/components/ui/FilterSelect";
import ScrollToResults from "@/components/ui/ScrollToResults";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import {
  filterListings,
  searchSummary,
  type SearchMode,
  type SearchType,
} from "@/lib/data/searchListings";

export const metadata: Metadata = {
  title: "Search Verified Properties | Vedhara Group",
  description:
    "Search verified properties across Gurugram, Noida, Greater Noida, South Delhi, Chandigarh Tricity, Faridabad, Ghaziabad and Mathura Vrindavan. Buy, rent or sell with RERA-verified listings.",
  alternates: { canonical: "https://www.vedharagroup.com/search" },
};

const cityImg = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

const CITY_LINKS = [
  { label: "Gurugram", href: "/gurugram", img: cityImg(11729105), sub: "Golf Course Road & prime sectors" },
  { label: "Noida", href: "/noida", img: cityImg(31684126), sub: "Sector 150 & the Expressway corridor" },
  { label: "Greater Noida", href: "/greater-noida", img: cityImg(15422584), sub: "Plots, townships & new projects" },
  { label: "South Delhi", href: "/south-delhi", img: cityImg(20418771), sub: "Lutyens', Vasant Vihar & GK" },
  { label: "Chandigarh", href: "/chandigarh", img: cityImg(32355381), sub: "Sector 17 & the Capitol Complex" },
  { label: "Mohali", href: "/mohali", img: cityImg(35229793), sub: "Sector 82 & the airport belt" },
  { label: "Panchkula", href: "/panchkula", img: cityImg(37433082), sub: "Sector 19 & the foothills" },
  { label: "Faridabad", href: "/faridabad", img: cityImg(30381835), sub: "Sector 21C & the NH-44 corridor" },
  { label: "Ghaziabad", href: "/ghaziabad", img: cityImg(30368780), sub: "Vaishali, Indirapuram & Raj Nagar" },
  { label: "Mathura & Vrindavan", href: "/mathura-vrindavan", img: cityImg(11969919), sub: "Yamuna Expressway & Vrindavan" },
];

const MODES: { label: string; value?: SearchMode }[] = [
  { label: "All" },
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
  { label: "Sell", value: "sell" },
];

const TYPES: { label: string; value?: SearchType }[] = [
  { label: "All Types" },
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "Penthouse", value: "penthouse" },
  { label: "Plot", value: "plot" },
  { label: "Commercial", value: "commercial" },
];

const BUY_OPTS = [
  { value: "any", label: "Any Budget" },
  { value: "under1", label: "Under ₹1 Cr" },
  { value: "1-3", label: "₹1 – 3 Cr" },
  { value: "3-5", label: "₹3 – 5 Cr" },
  { value: "5-10", label: "₹5 – 10 Cr" },
  { value: "10plus", label: "₹10 Cr+" },
];

const RENT_OPTS = [
  { value: "any", label: "Any Monthly Rent" },
  { value: "under20k", label: "Under ₹20K /mo" },
  { value: "20k-50k", label: "₹20K – 50K /mo" },
  { value: "50k-1l", label: "₹50K – 1L /mo" },
  { value: "1l-2l", label: "₹1L – 2L /mo" },
  { value: "2lplus", label: "₹2L+ /mo" },
];

function buildHref(f: { q?: string; mode?: SearchMode; type?: string; budget?: string }) {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.mode) p.set("mode", f.mode);
  if (f.type && f.type !== "any") p.set("type", f.type);
  if (f.budget && f.budget !== "any") p.set("budget", f.budget);
  const s = p.toString();
  return s ? `/search?${s}` : "/search";
}

const FAQS = [
  { q: "Which cities can I search properties in?", a: "Our verified search covers Gurugram, Noida, Greater Noida, South Delhi, Chandigarh, Mohali, Panchkula, Faridabad and Ghaziabad. Every listing shown is independently assessed through the Vedhara Verification Framework, with RERA/HRERA registration and title checks completed before it goes live." },
  { q: "Are the search results real and verified?", a: "Yes. Every listing in the search index comes from our live inventory across the Buy, Rent, Sell, Commercial, Luxury, New Launches and Tricity pages, and passes our five-check verification: registration, builder delivery history, project approvals, price fairness and title documents. We publish what we verify, and we never show unverified inventory." },
  { q: "Can I search by budget in thousands or lakhs?", a: "Yes. In Buy mode the budget filter shows ranges in lakhs and crores, while in Rent mode it switches to monthly rent in thousands and lakhs (for example Under ₹20K, ₹20K–50K, ₹50K–1L, ₹1L–2L, ₹2L+). Just switch the Buy/Rent/Sell toggle and the budget options update automatically." },
  { q: "What happens if I don't find what I'm looking for?", a: "Our search index is a curated subset of the full inventory. If you don't see a match, reach out through the 'Talk to an Advisor' option and we'll shortlist verified options from our full database across all nine cities, including off-market and upcoming projects." },
  { q: "Can NRIs search and enquire from overseas?", a: "Yes. The search works from anywhere, and every enquiry is handled by our NRI desk with video consultations, verified documentation and e-signatures. You can explore listings now and connect with an advisor for a remote due-diligence walkthrough." },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const mode = (typeof sp.mode === "string" ? sp.mode : "") as SearchMode | "";
  const type = (typeof sp.type === "string" ? sp.type : "") as SearchType | "";
  const budget = typeof sp.budget === "string" ? sp.budget : "";

  const results = filterListings({
    q: q || undefined,
    mode: mode || undefined,
    type: type || undefined,
    budget: budget || undefined,
  });

  const summary = searchSummary({ q: q || undefined, mode: mode || undefined, type: type || undefined, budget: budget || undefined });
  const hasQuery = !!(q || mode || type || budget);

  const fieldsRow = (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <div style={{ flex: "2 1 260px" }}>
        <label className="input-label" htmlFor="q">Keyword / Property</label>
        <input className="input-field" id="q" name="q" type="text" placeholder="e.g. 3 BHK in Gurugram, penthouse, villa…" defaultValue={q} />
      </div>
      <div style={{ flex: "1 1 160px" }}>
        <label className="input-label">Type</label>
        <FilterSelect
          id="type"
          label="Any Type"
          options={TYPES.map((t) => ({ value: t.value || "any", label: t.label }))}
          value={type || "any"}
        />
      </div>
      <div style={{ flex: "1 1 160px" }}>
        <label className="input-label">Budget</label>
        <FilterSelect
          id="budget"
          label="Any Budget"
          options={mode === "rent" ? RENT_OPTS : BUY_OPTS}
          value={budget || "any"}
        />
      </div>
      <div style={{ flex: "1 1 120px", display: "flex", alignItems: "flex-end" }}>
        <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Search</button>
      </div>
    </div>
  );

  const modeTabs = (onNavy: boolean) =>
    MODES.map((m) => {
      const active = (m.value || "") === (mode || "");
      const href = buildHref({ q: q || undefined, mode: m.value, type: type || undefined, budget: budget || undefined });
      return (
        <Link key={m.label} href={href} style={{
          fontFamily: "var(--t-head)", fontSize: 12, fontWeight: 700, letterSpacing: "0.02em",
          padding: "8px 18px", borderRadius: 20, textDecoration: "none",
          background: active ? "var(--gold)" : onNavy ? "rgba(212,168,67,0.1)" : "rgba(15,30,56,0.06)",
          color: active ? "var(--navy)" : onNavy ? "var(--gold-lt)" : "var(--slate)",
          border: active ? "none" : onNavy ? "1px solid rgba(212,168,67,0.35)" : "1px solid rgba(15,30,56,0.12)",
        }}>
          {m.label}
        </Link>
      );
    });

  const schema = {
    "@context": "https://schema.org",
    "@type": "SearchAction",
    name: "Vedhara Group Property Search",
    query: summary,
    target: { "@type": "EntryPoint", urlTemplate: "https://www.vedharagroup.com/search?q={query}" },
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Search", href: "/search" }]} />
      <JsonLd data={schema} />
      <ScrollToResults active={hasQuery} />

      {/* Hero */}
      <section className="page-hero" style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        {/* Luxury video background — aligned with the rest of the site's cinematic heroes */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            title="Vedhara Group property verification film"
            aria-label="Vedhara Group property verification film"
            className="video-bg"
            style={{ objectFit: "cover" }}
          >
            <source src="/videos/Property%20Verification.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Navy overlay keeps the search text and form crisp over the video */}
        <div className="video-overlay" />
        <div style={{ position: "absolute", top: "-20%", right: "-8%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,168,67,0.08) 0%,transparent 70%)", pointerEvents: "none", zIndex: 2 }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 3 }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="v-line" style={{ margin: "0 auto 14px" }} />
              <p className="eyebrow" style={{ color: "var(--gold-lt)", marginBottom: 12 }}>Search Verified Listings</p>
              <h1 className="heading-xl" style={{ color: "var(--light)", marginBottom: 12 }}>
                Find Your Property<span style={{ color: "var(--gold-lt)" }}> Across NCR & Tricity</span>
              </h1>
              <p className="body-lg" style={{ color: "rgba(252,250,244,0.55)", maxWidth: 640, margin: "0 auto" }}>
                {summary}, every result verified through the Vedhara Verification Framework.
              </p>
            </div>
          </ScrollReveal>

          {/* Search form */}
          <form action="/search" method="get" style={{ background: "var(--cream)", borderRadius: 16, padding: 20, boxShadow: "0 20px 50px rgba(0,0,0,0.25)", maxWidth: 900, margin: "0 auto" }}>
            {mode && <input type="hidden" name="mode" value={mode} />}
            {fieldsRow}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>{modeTabs(false)}</div>
          </form>
        </div>
      </section>

      {/* Results */}
      <section id="results" style={{ background: "var(--cream)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 8 }}>Results</p>
                <h2 className="heading-xl" style={{ color: "var(--navy)", fontSize: "clamp(24px,3vw,32px)", margin: 0 }}>
                  {results.length} Verified Listing{results.length === 1 ? "" : "s"}
                </h2>
              </div>
              {(q || mode || type || budget) && (
                <Link href="/search" style={{ fontFamily: "var(--t-head)", fontSize: 12, color: "var(--gold-dk)", textDecoration: "none", borderBottom: "1px solid var(--gold)" }}>
                  ✕ Clear all filters
                </Link>
              )}
            </div>
          </ScrollReveal>

          {results.length > 0 ? (
            <div className="prop-grid">
              {results.map((property, index) => (
                <ScrollReveal key={property.id} delay={Math.min(index * 60, 420)} style={{ display: "flex", minWidth: 0 }}>
                  <Link href={property.link} className="hover-lift" style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, background: "#fff", border: "1px solid rgba(212,168,67,0.18)", borderRadius: 16, overflow: "hidden", textDecoration: "none" }}>
                    <div style={{ height: 180, flexShrink: 0, position: "relative", overflow: "hidden" }}>
                      <Image
                        src={property.image}
                        alt={property.alt || property.title}
                        fill
                        priority={hasQuery && index < 6}
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: "cover", objectPosition: property.pos ? (property.pos.indexOf(" ") > -1 ? property.pos : "50% " + property.pos) : "50% 50%" }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(9,15,29,0.05) 0%,rgba(9,15,29,0.45) 100%)" }} />
                      <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2 }}>
                        <span style={{ fontFamily: "var(--t-head)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, background: "rgba(9,15,29,0.55)", color: "rgba(255,255,255,0.95)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(4px)" }}>
                          {property.tag}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <span style={{ fontFamily: "var(--t-head)", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", background: "rgba(212,168,67,0.12)", color: "var(--gold-dk)", borderRadius: 3 }}>
                          {property.category}
                        </span>
                        <span style={{ fontFamily: "var(--t-head)", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", background: "rgba(15,30,56,0.06)", color: "var(--navy)", borderRadius: 3 }}>
                          {property.mode === "rent" ? "Rent" : property.mode === "sell" ? "Sale" : "Buy"}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "var(--t-head)", fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 6, lineHeight: 1.3 }}>{property.title}</h3>
                      <p style={{ fontFamily: "var(--t-body)", fontSize: 11.5, color: "var(--slate)", marginBottom: 4 }}>{property.location}</p>
                      <p style={{ fontFamily: "var(--t-body)", fontSize: 13, color: "var(--navy)", marginBottom: 10, lineHeight: 1.4 }}>{property.config} · {property.size}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(212,168,67,0.2)", paddingTop: 12, marginTop: "auto", flexShrink: 0 }}>
                        <p style={{ fontFamily: "var(--t-head)", fontSize: 17, fontWeight: 700, color: "var(--navy)", margin: 0 }}>{property.price}</p>
                        <span className="btn-ghost" style={{ color: "var(--gold)", fontSize: 9, display: "inline-flex", alignItems: "center", gap: 4 }}>
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div style={{ background: "#fff", border: "1px dashed rgba(212,168,67,0.4)", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>No Exact Matches</p>
              <h2 style={{ fontFamily: "var(--t-head)", fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
                Try a city, or broaden your filters
              </h2>
              <p className="body-md" style={{ color: "var(--slate)", maxWidth: 520, margin: "0 auto 24px" }}>
                Our full inventory is wider than the search index. Browse a city page or talk to an advisor for off-market and upcoming options.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 24 }}>
                {CITY_LINKS.map((c) => (
                  <Link key={c.href} href={c.href} style={{ fontFamily: "var(--t-head)", fontSize: 11.5, fontWeight: 600, padding: "8px 14px", borderRadius: 20, background: "rgba(212,168,67,0.1)", color: "var(--gold-dk)", textDecoration: "none", border: "1px solid rgba(212,168,67,0.3)" }}>
                    {c.label} →
                  </Link>
                ))}
              </div>
              <Link href="/contact" className="btn btn-dark">Talk to an Advisor →</Link>
            </div>
          )}
        </div>
      </section>

      {/* Minimal divider between the listings and Explore by City */}
      <section style={{ background: "var(--cream)", padding: "28px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.5))" }} />
          <span style={{ width: 7, height: 7, background: "var(--gold)", transform: "rotate(45deg)", flexShrink: 0 }} />
          <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(212,168,67,0.5), transparent)" }} />
        </div>
      </section>

      {/* Explore by city */}
      <section style={{ background: "var(--light)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span className="v-line" style={{ margin: "0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom: 12 }}>Explore by City</p>
              <h2 className="heading-xl" style={{ color: "var(--navy)", margin: 0 }}>
                Verified Listings Across <em className="display-gold">NCR & Tricity</em>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="grid-3">
            {CITY_LINKS.map((c, i) => {
              const orphan = i === CITY_LINKS.length - 1 && CITY_LINKS.length % 3 === 1;
              return (
              <ScrollReveal key={c.href} delay={i * 60} style={orphan ? { gridColumn: "2 / 3" } : undefined}>
                <Link href={c.href} className="hover-lift" style={{ display: "block", position: "relative", height: 240, borderRadius: 16, overflow: "hidden", textDecoration: "none", border: "1px solid rgba(212,168,67,0.25)" }}>
                  <Image src={c.img} alt={`${c.label} real estate, ${c.sub}`} fill sizes="(max-width: 1024px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(9,15,29,0.12) 0%,rgba(9,15,29,0.82) 100%)" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "22px 22px 20px" }}>
                    <h3 style={{ fontFamily: "var(--t-display)", fontStyle: "italic", fontWeight: 300, fontSize: 24, color: "var(--light)", margin: 0, lineHeight: 1.1 }}>{c.label}</h3>
                    <p style={{ fontFamily: "var(--t-body)", fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.78)", margin: "6px 0 14px" }}>{c.sub}</p>
                    <span style={{ fontFamily: "var(--t-head)", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-lt)", display: "inline-flex", alignItems: "center", gap: 5 }}>Explore {c.label} →</span>
                  </div>
                </Link>
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection title="Search & Verification Questions" faqs={FAQS} dark decor />
      <CTASection />
    </>
  );
}
