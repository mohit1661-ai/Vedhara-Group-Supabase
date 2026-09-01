import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ValuationTool from "./ValuationTool";

export const metadata: Metadata = {
  title: "Free Property Valuation Tool for Delhi NCR",
  description: "Estimate your Delhi NCR property's value with locality comparables and government circle rate data. Free seller valuation tool by Vedhara Group advisors.",
  alternates: { canonical: "https://www.vedharagroup.com/sell/valuation" },
};

const valuationSteps = [
  {
    num: "01",
    title: "Locality Comparable Transactions",
    desc: "The estimate starts with recent registered transactions in the same micro-market — the same sector, tower type or floor pattern, not a city-wide average. Two apartments in the same city can differ by 300% in per-square-foot price depending on the road they sit on, which is why locality evidence, not city medians, drives the first layer of the estimate.",
  },
  {
    num: "02",
    title: "Circle Rate Cross-Check",
    desc: "Government circle rates (also called collector rates) set the minimum registration value for a locality. The estimate cross-checks the comparable-based figure against the applicable circle rate so you know both the market expectation and the legal floor for stamp duty purposes. Where the two diverge sharply, that gap itself is useful pricing intelligence.",
  },
  {
    num: "03",
    title: "Property-Level Adjustments",
    desc: "Finally, the estimate adjusts for the attributes that move value within a locality: floor rise, facing, age of the property, condition and fittings, parking, power backup and society amenities. A base rate only becomes a usable number once these adjustments are applied — this is the step most free online tools skip entirely.",
  },
];

const valuationFaqs = [
  {
    q: "Is this property valuation tool really free?",
    a: "Yes. The valuation tool is completely free, requires no sign-up, and does not ask for your phone number or email address. If you want a refined, property-specific valuation before setting an asking price, you can optionally book a consultation with a seller advisor, but the tool itself carries no obligation.",
  },
  {
    q: "How accurate is an online property valuation?",
    a: "Treat any online estimate as an evidence-based starting band, not a certified appraisal. Because it works from locality comparables and circle rates without a physical inspection, a realistic expectation is plus or minus 10-15% of what a specific unit would actually fetch. A Vedhara advisor can tighten that band after reviewing your property's exact floor, condition and view.",
  },
  {
    q: "What data does the valuation use?",
    a: "The tool mirrors the Price Fairness check in Vedhara's Verification Framework: recent registered transactions in your locality, government circle rate data, and current listing trends. Registered transactions matter most because they show what buyers actually paid, not what sellers hoped to get.",
  },
  {
    q: "Does the valuation work for plots and commercial property?",
    a: "Yes, with adjustments. Plots are valued primarily from land-rate comparables and the applicable circle rate for the category of land, while commercial property adds lease income, tenant quality and rental yield to the calculation. For high-value commercial assets we recommend a detailed advisor-led valuation alongside the tool.",
  },
  {
    q: "Should I set my asking price exactly at the valuation figure?",
    a: "Not necessarily. The valuation gives you a defensible, data-backed anchor. Your final asking price also depends on your timeline, how many competing listings exist in your micro-market right now, and how negotiable you are. Use the number to avoid the two classic mistakes: underpricing out of urgency or overpricing out of attachment.",
  },
];

export default function PropertyValuationPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Sell Property", href: "/sell" }, { name: "Property Valuation", href: "/sell/valuation" }]} />
      <VideoHeroSection videoSrc="/videos/Real%20Estate%20Calculator.mp4">
        <span className="v-line" style={{ margin: "0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom: 18 }}>Seller Tools</p>
        <h1 style={{ fontFamily: "var(--t-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(30px,5vw,52px)", color: "var(--light)", lineHeight: 1.1, marginBottom: 24 }}>
          Seller Property Valuation<br /><span style={{ color: "var(--gold-lt)" }}>Based on Locality Evidence</span>
        </h1>
        <p className="body-lg" style={{ color: "rgba(255,255,255,0.85)", maxWidth: 620, margin: "0 auto" }}>
          This tool is designed to estimate value using locality comparables and government circle rate data, mirroring the Price Fairness check in Vedhara&apos;s Verification Framework.
        </p>
      </VideoHeroSection>

      <section style={{ background: "var(--cream)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <ScrollReveal><ValuationTool /></ScrollReveal>
        </div>
      </section>

      {/* ══ HOW THE VALUATION WORKS ══ */}
      <section style={{ background: "var(--navy)", padding: "60px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-12%", right: "-6%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,168,67,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <span className="v-line" style={{ margin: "0 auto 14px", background: "var(--gold-lt)" }} />
              <p className="eyebrow" style={{ color: "var(--gold-lt)", marginBottom: 14 }}>The Method</p>
              <h2 className="heading-xl" style={{ color: "var(--light)", lineHeight: 1.1 }}>
                How This Property Valuation<br />
                <em style={{ fontFamily: "var(--t-display)", fontStyle: "italic", fontWeight: 300, color: "var(--gold-lt)" }}>Actually Works</em>
              </h2>
              <p className="body-lg" style={{ color: "rgba(252,250,244,0.5)", maxWidth: 660, margin: "16px auto 0" }}>
                Most free online valuations apply a city-level average to your pin code and call it a day. This tool follows the same three-step method our advisors use when pricing a real sale, so the number you see is grounded in how Delhi NCR property is actually transacted.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 1, background: "rgba(255,255,255,0.08)" }} className="grid-3 svc-card-alt">
            {valuationSteps.map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 90} style={{ display: "flex" }}>
                <div className="svc-card" style={{ borderRadius: 0, height: "100%", flex: 1 }}>
                  <div className="gold-accent" />
                  <p className="eyebrow" style={{ marginBottom: 12 }}>Step {s.num}</p>
                  <h3 className="svc-card-title">{s.title}</h3>
                  <p className="svc-card-desc">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY PORTAL ESTIMATES DIFFER ══ */}
      <section style={{ background: "var(--cream)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span className="v-line" style={{ margin: "0 auto 14px" }} />
              <p className="eyebrow" style={{ color: "var(--gold-ink)", marginBottom: 14 }}>Reading the Number</p>
              <h2 className="heading-xl" style={{ color: "var(--navy)", lineHeight: 1.1 }}>
                Why Portal Estimates and Registered Prices<br />
                <em className="display-gold" style={{ fontSize: "inherit", color: "var(--gold-ink)" }}>Rarely Match</em>
              </h2>
            </div>
            <div className="body-lg" style={{ color: "var(--slate)", lineHeight: 1.85 }}>
              <p style={{ marginBottom: 18 }}>
                Portal estimates are usually built from asking prices of currently listed inventory. Asking prices are set by sellers, and they drift upward: stale listings stay in the average for months, and motivated sellers rarely reprice quickly. Registered transaction data inverts that bias — it records what buyers actually paid, after negotiation, in your specific locality. When a portal says your flat is worth more than the registered data suggests, the gap is usually wishful asking prices, not hidden value.
              </p>
              <p>
                The second reason is granularity. Delhi NCR is a market of micro-markets: the same project can trade at meaningfully different rates tower to tower, and the road on which a sector sits can be worth more than the sector next to it. Averages smooth all of that away. This valuation keeps the estimate anchored to the narrowest locality band the data supports, then applies property-level adjustments on top. If you are preparing to sell, pair the estimate with our guide on <Link href="/sell" style={{ color: "var(--gold-ink)", textDecoration: "underline" }}>how we sell property in Delhi NCR</Link>, or read the latest <Link href="/insights" style={{ color: "var(--gold-ink)", textDecoration: "underline" }}>Delhi NCR price trend research</Link> to see which way your micro-market is moving.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection faqs={valuationFaqs} title="Property Valuation, FAQ" />

      <section style={{ background: "var(--navy)", padding: "60px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 className="heading-xl" style={{ color: "var(--light)", lineHeight: 1.1, marginBottom: 18 }}>A Number Is the Start.<br /><em className="display-gold" style={{ fontSize: "inherit" }}>Context Makes It Useful.</em></h2>
          <p className="body-lg" style={{ color: "rgba(252,250,244,0.5)", marginBottom: 28 }}>A valuation should reflect the real locality, property condition, comparable transactions, and applicable government data. Speak to an advisor before setting an asking price.</p>
          <Link href="/contact" className="btn btn-primary">Speak to a Seller Advisor →</Link>
        </div>
      </section>
      <CTASection />
    </>
  );
}
