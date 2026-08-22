import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "How We Charge | Transparent Real Estate Fees",
  description: "Understand Vedhara Group's disclosed commission and advisory retainer model before you begin a property conversation.",
  alternates: { canonical: "https://www.vedharagroup.com/how-we-charge" },
};

const models = [
  { title: "Standard Commission", desc: "In most property transactions, Vedhara charges a disclosed commission on both the buyer and seller sides, in line with the standard rules and practices followed by real estate businesses." },
  { title: "Portfolio Advisory Retainer", desc: "For portfolio-level investment advisory, an optional flat retainer is available for investors seeking ongoing strategy across multiple properties or markets." },
  { title: "Engagement-Specific Fees", desc: "Sell-side, property management, and dedicated advisory engagements operate on a disclosed fee basis. We clarify the applicable structure before any engagement begins." },
];

const disclosurePoints = [
  "The applicable commission or fee is explained before you commit to an engagement.",
  "The commission for a specific transaction is clearly stated on the relevant listing or engagement documentation.",
  "There are no hidden arrangements, undisclosed mark-ups, or surprise charges at closing.",
  "If a portfolio retainer applies, its scope and terms are documented before advisory work begins.",
];

const faqs = [
  { q: "Does Vedhara charge buyers a fee?", a: "In most cases, Vedhara charges a disclosed commission on both the buyer and seller sides, in line with the standard rules and practices followed by real estate businesses. The commission is clearly stated on every specific listing, and for portfolio-level investment advisory an optional flat retainer is available." },
  { q: "What is the optional flat retainer?", a: "The optional flat retainer is for portfolio-level investment advisory. It is designed for investors who need ongoing strategy across multiple properties or markets rather than advice on one transaction alone. The scope and terms are documented before the advisory engagement begins." },
  { q: "When will I know what my engagement costs?", a: "Vedhara clarifies the applicable commission or fee structure before any engagement begins. The relevant terms are disclosed on the specific listing or in the engagement documentation, so you can make an informed decision before proceeding." },
  { q: "Does Vedhara receive different commissions from different developers?", a: "Vedhara is an independent advisory firm. Our recommendations are based on your requirements and the property's merits under our Verification Framework, not on which developer offers the highest commission." },
];

export default function HowWeChargePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "How We Charge", href: "/how-we-charge" }]} />
      <VideoHeroSection videoSrc="/videos/All%20Services%20Hero%20Video.mp4">
        <span className="v-line" style={{ margin: "0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom: 18 }}>Fee Transparency</p>
        <h1 style={{ fontFamily: "var(--t-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(30px,5vw,56px)", color: "var(--light)", lineHeight: 1.1, marginBottom: 24 }}>
          Clear Fees Before You Decide<br /><span style={{ color: "var(--gold-lt)" }}>No Surprises at Closing</span>
        </h1>
        <p className="body-lg" style={{ color: "rgba(255,255,255,0.85)", maxWidth: 580, margin: "0 auto" }}>
          Independent advice includes knowing exactly how the engagement is paid for. We disclose the applicable commission or fee before the conversation becomes a commitment.
        </p>
      </VideoHeroSection>

      <section style={{ background: "var(--cream)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="v-line" style={{ margin: "0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom: 14 }}>Our Fee Model</p>
              <h2 className="heading-xl" style={{ color: "var(--navy)", lineHeight: 1.1 }}>Advice That Is <em className="display-gold" style={{ fontSize: "inherit", color: "var(--gold-ink)" }}>Clear From the Start</em></h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(42,45,53,0.08)" }} className="grid-3 svc-card-alt">
            {models.map((model, i) => (
              <ScrollReveal key={model.title} delay={i * 80}>
                <div className="svc-card" style={{ borderRadius: 0, height: "100%" }}>
                  <div className="gold-accent" />
                  <p className="eyebrow" style={{ marginBottom: 12 }}>Model 0{i + 1}</p>
                  <h3 className="svc-card-title">{model.title}</h3>
                  <p className="svc-card-desc">{model.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--navy)", padding: "60px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span className="v-line" style={{ margin: "0 auto 14px" }} />
              <p className="eyebrow" style={{ color: "var(--gold-lt)", marginBottom: 14 }}>What Disclosure Means</p>
              <h2 className="heading-xl" style={{ color: "var(--light)", lineHeight: 1.1 }}>The Fee Is Never a <em className="display-gold" style={{ fontSize: "inherit" }}>Surprise</em></h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gap: 1, background: "rgba(255,255,255,0.08)" }}>
            {disclosurePoints.map((point, i) => (
              <div key={point} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "18px 22px", background: "var(--navy)" }}>
                <span style={{ color: "var(--gold-lt)", fontFamily: "var(--t-head)", fontWeight: 700 }}>0{i + 1}</span>
                <p className="body-md" style={{ color: "rgba(252,250,244,0.7)", margin: 0 }}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream)", padding: "60px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 className="heading-xl" style={{ color: "var(--navy)", lineHeight: 1.1, marginBottom: 16 }}>Know the Terms.<br /><em className="display-gold" style={{ fontSize: "inherit", color: "var(--gold-ink)" }}>Choose With Confidence.</em></h2>
          <p className="body-lg" style={{ color: "var(--slate)", marginBottom: 28 }}>Our compensation model supports independent advice, but it never changes the principle that you should understand the fee before you decide whether to proceed.</p>
          <Link href="/contact" className="btn btn-dark">Discuss Your Property Goals →</Link>
        </div>
      </section>

      <FAQSection faqs={faqs} title="How We Charge, FAQ" />
      <CTASection />
    </>
  );
}
