import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ValuationTool from "./ValuationTool";

export const metadata: Metadata = {
  title: "Property Valuation Tool | Vedhara Group",
  description: "Estimate your Delhi NCR property's value using locality comparables and government circle rate data.",
  alternates: { canonical: "https://www.vedharagroup.com/sell/valuation" },
};

export default function PropertyValuationPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Sell Property", href: "/sell" }, { name: "Property Valuation", href: "/sell/valuation" }]} />
      <VideoHeroSection videoSrc="/videos/Real%20Estate%20Calculator.mp4">
        <span className="v-line" style={{ margin: "0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom: 18 }}>Seller Tools</p>
        <h1 style={{ fontFamily: "var(--t-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(30px,5vw,52px)", color: "var(--light)", lineHeight: 1.1, marginBottom: 24 }}>
          Understand Your Property&apos;s Value<br /><span style={{ color: "var(--gold-lt)" }}>Before You List</span>
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
