import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title:"Terms & Conditions | Vedhara Group", description:"Terms and conditions for using the Vedhara Group website and advisory services.", alternates:{ canonical:"https://www.vedharagroup.com/terms" } };

const sections = [
  ["Use of This Site","By using vedharagroup.com you agree to these terms. The information on this site is for general guidance only and does not constitute legal or financial advice. You should consult qualified professionals for advice specific to your situation."],
  ["Advisory Services","All advisory engagements are governed by a separate service agreement executed between the client and Vedhara Group Pvt. Ltd. The terms on this page apply to website use only and do not supersede individual engagement contracts."],
  ["Calculator Estimates","The calculators on this site provide planning estimates using standard financial formulas and assumptions. They are for illustrative purposes only and do not constitute a quote, offer, or commitment. Always obtain verified numbers from a bank, registered financial advisor, or property lawyer before making decisions."],
  ["Verification Framework","Vedhara's Verification Framework represents checks conducted at the time of listing. Property status, pricing, and availability may change over time. We recommend independently verifying all critical details, including RERA status, title documents, and approvals, before signing any agreement."],
  ["Intellectual Property","All content on this site, including text, graphics, logos, and tools, is the property of Vedhara Group Pvt. Ltd. and may not be reproduced, distributed, or used without prior written permission."],
  ["Limitation of Liability","Vedhara Group shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of or reliance on information provided on this website or through any calculators or tools."],
  ["Contact","For legal enquiries or concerns: contact@vedharagroup.com or +91 98106 47063."],
];

export default function TermsPage() {
  return (
    <>
      <VideoHeroSection>
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5vw,56px)",color:"var(--light)",lineHeight:1.1,marginBottom:14 }}>Terms &amp; Conditions</h1>
        <p className="body-sm" style={{ color:"rgba(252,250,244,0.35)" }}>Last updated: July 2026</p>
      </VideoHeroSection>

      {/* Gold differentiator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* Intro block */}
      <div style={{ background:"var(--cream)",textAlign:"center",padding:"48px 32px 0" }}>
        <div style={{ maxWidth:700,margin:"0 auto" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Website Terms of Use</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Understanding Your<br /><span style={{ color:"var(--gold-dk)" }}>Rights & Responsibilities</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              These terms govern your use of the Vedhara Group website. By accessing this site, you agree to the terms outlined below. For specific advisory engagements, separate contractual terms apply.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:760,margin:"0 auto" }}>
          {sections.map(([t,b],i)=>(
            <ScrollReveal key={t} delay={i*60}>
              <div style={{ marginBottom:36,paddingBottom:36,borderBottom:"1px solid rgba(42,45,53,0.08)" }}>
                <h2 className="heading-md" style={{ color:"var(--gold-dk)",marginBottom:12 }}>{t}</h2>
                <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.8 }}>{b}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
