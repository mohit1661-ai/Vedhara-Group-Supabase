import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import type { CityPageData } from "@/lib/data/cityPages";

/**
 * CityPageTemplate — reusable city real-estate page that mirrors the
 * Chandigarh Tricity page design: hero → intro → featured listings →
 * micro-markets → jurisdiction/authority guide → market guide → FAQ → CTA.
 * Rendered entirely from a `CityPageData` object so each city page stays a
 * thin file while the SEO copy, listings and FAQs live in lib/data/cityPages.
 */
export default function CityPageTemplate({ data }: { data: CityPageData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.schemaName,
    serviceType: "Property Advisory and Brokerage",
    provider: { "@id": "https://www.vedharagroup.com/#organization" },
    areaServed: data.schemaAreaServed.map((n) => ({ "@type": "City", name: n })),
    description: data.schemaDescription,
    offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "INR" } },
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: `${data.name} Real Estate`, href: `/${data.slug}` }]} />
      <JsonLd data={schema} />

      {/* Hero */}
      <VideoHeroSection videoSrc={data.heroVideo} videoSrcMobile={data.heroVideoMobile} poster={data.heroPoster} posterAlt={`${data.name} real estate hero`}>
        <span className="v-line" style={{ margin: "0 auto 16px" }} />
        <p className="eyebrow" style={{ marginBottom: 18 }}>{data.eyebrow}</p>
        <h1 style={{ fontFamily: "var(--t-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(32px,5vw,50px)", color: "var(--light)", lineHeight: 1.1, marginBottom: 26 }}>
          {data.h1}<br />
          <span style={{ color: "var(--gold-lt)" }}>{data.h1Accent}</span>
        </h1>
        <p className="body-lg" style={{ color: "rgba(255,255,255,0.85)", maxWidth: 620, margin: "0 auto 30px" }}>
          {data.heroBody}
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn btn-primary">Book a Free Consultation</Link>
          <a
            href={`https://wa.me/919810647063?text=Hello%20Vedhara%20Group%2C%20I%20need%20advice%20on%20${encodeURIComponent(data.name)}%20property`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            WhatsApp Us
          </a>
        </div>
      </VideoHeroSection>

      {/* Intro */}
      <section style={{ background: "var(--cream)", padding: "72px 32px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin: "0 auto 14px" }} />
            <p className="eyebrow" style={{ marginBottom: 14 }}>{data.introEyebrow}</p>
            <h2 className="heading-xl" style={{ color: "var(--navy)", lineHeight: 1.1, marginBottom: 20 }}>
              {data.introTitle}<br />
              <em style={{ fontFamily: "var(--t-display)", fontStyle: "italic", fontWeight: 300, color: "var(--gold)" }}>{data.introAccent}</em>
            </h2>
            <p className="body-lg" style={{ color: "var(--slate)" }}>{data.introBody}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Listings */}
      <section style={{ background: "var(--navy)", padding: "60px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="v-line" style={{ margin: "0 auto 14px" }} />
              <p className="eyebrow" style={{ color: "var(--gold-lt)", marginBottom: 14 }}>{data.listingsEyebrow}</p>
              <h2 className="heading-xl" style={{ color: "var(--light)", marginBottom: 16 }}>
                {data.listingsTitle}<span style={{ color: "var(--gold-lt)" }}> {data.listingsAccent}</span>
              </h2>
              <p className="body-lg" style={{ color: "rgba(252,250,244,0.48)", maxWidth: 560, margin: "0 auto" }}>
                {data.listingsSub}
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {data.listings.map((property, index) => (
              <ScrollReveal key={property.id} delay={(index % 6) * 80} style={{ display: "flex" }}>
                <Link href="/contact" className="hover-lift" style={{ display: "flex", flexDirection: "column", flex: 1, background: "var(--cream)", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 16, overflow: "hidden", textDecoration: "none" }}>
                  <div style={{ height: 180, flexShrink: 0, position: "relative", overflow: "hidden" }}>
                    <Image
                      src={property.image}
                      alt={property.alt || property.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: property.pos ? (property.pos.indexOf(" ") > -1 ? property.pos : "50% " + property.pos) : "50% 50%" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(9,15,29,0.05) 0%,rgba(9,15,29,0.45) 100%)" }} />
                    <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2 }}>
                      <span style={{ fontFamily: "var(--t-head)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, background: "rgba(9,15,29,0.55)", color: "rgba(255,255,255,0.95)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(4px)" }}>
                        {property.status}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                      <span style={{ fontFamily: "var(--t-head)", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", background: "rgba(212,168,67,0.12)", color: "var(--gold-ink)", borderRadius: 3 }}>
                        {property.type}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "var(--t-head)", fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 6, lineHeight: 1.3 }}>{property.title}</h3>
                    <p style={{ fontFamily: "var(--t-body)", fontSize: 11.5, color: "var(--slate)", marginBottom: 4 }}>{property.location}</p>
                    <p style={{ fontFamily: "var(--t-body)", fontSize: 13, color: "var(--navy)", marginBottom: 10, lineHeight: 1.4 }}>{property.config} · {property.size}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14, flex: 1, alignContent: "flex-start" }}>
                      {property.highlights.map((h) => (
                        <span key={h} style={{ fontFamily: "var(--t-head)", fontSize: 7.5, fontWeight: 600, letterSpacing: "0.04em", padding: "3px 8px", background: "rgba(212,168,67,0.08)", color: "var(--gold-ink)", borderRadius: 3 }}>
                          {h}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(212,168,67,0.2)", paddingTop: 12, flexShrink: 0 }}>
                      <p style={{ fontFamily: "var(--t-head)", fontSize: 17, fontWeight: 700, color: "var(--navy)", margin: 0 }}>{property.price}</p>
                      <span className="btn-ghost" style={{ color: "var(--gold)", fontSize: 9, display: "inline-flex", alignItems: "center", gap: 4 }}>
                        Inquire →
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <p className="body-md" style={{ color: "rgba(252,250,244,0.35)", marginBottom: 20 }}>
                Don&apos;t see what you&apos;re looking for? Our full inventory spans {data.name} and the surrounding micro-markets.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Talk to an Advisor →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Micro-markets */}
      <section style={{ background: "var(--light)", padding: "72px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="v-line" style={{ margin: "0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom: 14 }}>{data.microMarkets.eyebrow}</p>
              <h2 className="heading-xl" style={{ color: "var(--navy)", lineHeight: 1.1 }}>
                {data.microMarkets.title} <em style={{ fontFamily: "var(--t-display)", fontStyle: "italic", fontWeight: 300, color: "var(--gold)" }}>{data.microMarkets.accent}</em>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 24 }} className="grid-3">
            {data.microMarkets.items.slice(0, 3).map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 60}>
                <div className="svc-card mm-card" style={{ display: "flex", flexDirection: "column", padding: "30px 26px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span className="mm-tag">{m.tag}</span>
                    <div className="gold-accent" style={{ margin: 0, flex: 1 }} />
                  </div>
                  <h3 className="svc-card-title" style={{ fontSize: 18, marginBottom: 10 }}>{m.name}</h3>
                  <p className="svc-card-desc" style={{ marginBottom: 16 }}>{m.desc}</p>
                  <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid rgba(212,168,67,0.22)" }}>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {m.points.map((p) => (
                        <li key={p} style={{ display: "flex", gap: 9, marginBottom: 7, alignItems: "flex-start" }}>
                          <span style={{ color: "var(--gold)", flexShrink: 0, fontSize: 10, lineHeight: 1.6 }}>◆</span>
                          <span className="svc-card-desc" style={{ fontSize: 11.5, lineHeight: 1.55, margin: 0 }}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          {data.microMarkets.items.length > 3 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 24, marginTop: 24 }} className="grid-2 journey-center-row">
              {data.microMarkets.items.slice(3).map((m, i) => (
                <ScrollReveal key={m.name} delay={(i + 3) * 60}>
                  <div className="svc-card mm-card" style={{ display: "flex", flexDirection: "column", padding: "30px 26px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <span className="mm-tag">{m.tag}</span>
                      <div className="gold-accent" style={{ margin: 0, flex: 1 }} />
                    </div>
                    <h3 className="svc-card-title" style={{ fontSize: 18, marginBottom: 10 }}>{m.name}</h3>
                    <p className="svc-card-desc" style={{ marginBottom: 16 }}>{m.desc}</p>
                    <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid rgba(212,168,67,0.22)" }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {m.points.map((p) => (
                          <li key={p} style={{ display: "flex", gap: 9, marginBottom: 7, alignItems: "flex-start" }}>
                            <span style={{ color: "var(--gold)", flexShrink: 0, fontSize: 10, lineHeight: 1.6 }}>◆</span>
                            <span className="svc-card-desc" style={{ fontSize: 11.5, lineHeight: 1.55, margin: 0 }}>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Authorities / jurisdiction */}
      <section style={{ background: "var(--navy)", padding: "72px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 60% 40% at 50% 100%,rgba(212,168,67,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="v-line" style={{ margin: "0 auto 14px" }} />
              <p className="eyebrow" style={{ color: "var(--gold-lt)", marginBottom: 14 }}>{data.authorities.eyebrow}</p>
              <h2 className="heading-xl" style={{ color: "var(--light)", lineHeight: 1.1 }}>
                {data.authorities.title}<br />
                <span style={{ color: "var(--gold-lt)" }}>{data.authorities.accent}</span>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 24 }} className="grid-3">
            {data.authorities.items.map((j, i) => (
              <ScrollReveal key={j.title} delay={i * 60}>
                <div className="team-card hover-lift" style={{ display: "block", background: "var(--cream)", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 16, overflow: "hidden", textDecoration: "none", height: "100%" }}>
                  <div style={{ height: 170, position: "relative", overflow: "hidden" }}>
                    <Image src={j.image} alt={j.alt || j.title} fill sizes="(max-width: 1024px) 50vw, 33vw" style={{ objectFit: "cover", objectPosition: j.pos ? (j.pos.indexOf(" ") > -1 ? j.pos : "50% " + j.pos) : "50% 50%" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(9,15,29,0.10) 0%,rgba(9,15,29,0.55) 100%)" }} />
                    <div style={{ position: "absolute", bottom: 14, left: 14, width: 52, height: 52, borderRadius: 10, background: "rgba(15,30,56,0.65)", border: "2px solid rgba(212,168,67,0.45)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", zIndex: 1 }}>
                      <span style={{ fontFamily: "var(--t-head)", fontSize: 18, fontWeight: 700, color: "var(--gold-lt)", letterSpacing: "0.05em" }}>{j.mono}</span>
                    </div>
                  </div>
                  <div style={{ padding: 20, display: "flex", flexDirection: "column", height: "calc(100% - 170px)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <span style={{ fontFamily: "var(--t-head)", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", background: "rgba(212,168,67,0.12)", color: "var(--gold-ink)", borderRadius: 3 }}>{j.applies}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--t-head)", fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 6, marginTop: 4 }}>{j.title}</h3>
                    <p className="body-sm" style={{ color: "var(--slate)", lineHeight: 1.7, fontSize: 12, margin: "0 0 12px", flex: 1 }}>{j.body}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(212,168,67,0.2)", paddingTop: 12 }}>
                      <span style={{ fontFamily: "var(--t-head)", fontSize: 9.5, fontWeight: 700, color: "var(--gold-ink)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Verified Authority</span>
                      <span style={{ fontFamily: "var(--t-head)", fontSize: 9, fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.06em", display: "inline-flex", alignItems: "center", gap: 4 }}>Check Process →</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Market guide */}
      <section style={{ background: "var(--cream)", padding: "72px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="v-line" style={{ margin: "0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom: 14 }}>{data.guide.eyebrow}</p>
              <h2 className="heading-xl" style={{ color: "var(--navy)", lineHeight: 1.1 }}>
                {data.guide.title}:<br />
                <em style={{ fontFamily: "var(--t-display)", fontStyle: "italic", fontWeight: 300, color: "var(--gold)" }}>{data.guide.accent}</em>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 1, background: "rgba(42,45,53,0.08)" }} className="grid-3 svc-card-alt">
            {data.guide.items.map((f, i) => (
              <ScrollReveal key={f.t} delay={i * 60}>
                <div className="svc-card" style={{ borderRadius: 0, height: "100%", padding: "34px 28px", display: "flex", flexDirection: "column" }}>
                  <div className="gold-accent" />
                  <h3 className="svc-card-title" style={{ fontSize: 18, marginBottom: 10 }}>{f.t}</h3>
                  <p className="svc-card-desc" style={{ marginBottom: 0 }}>{f.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title={data.faqTitle} faqs={data.faqs} dark decor />
      <CTASection />
    </>
  );
}
