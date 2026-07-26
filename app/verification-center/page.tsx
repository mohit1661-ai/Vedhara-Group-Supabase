import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:"Property Verification Center | How Vedhara Checks Every Listing | Delhi NCR",
  description:"Vedhara Group's five-point property Verification Framework, RERA status, builder history, approvals, price fairness, and document availability, checked before any listing is published.",
  alternates:{ canonical:"https://www.vedharagroup.com/verification-center" },
};

const checks = [
  { n:"01", icon:"V", title:"RERA Registration Validity", grad:"linear-gradient(135deg,#0F1E38,#1a3a5c)",
    portal:"UP RERA (rera.up.gov.in) · HRERA (hrera.org.in) · Delhi RERA (rera.delhi.gov.in)",
    points:["Registration is active and within validity dates","Project details on the RERA portal match the developer's marketing claims","Quarterly progress reports have been filed as required by RERA","Any complaint history registered against the project on the RERA portal is disclosed"] },
  { n:"02", icon:"B", title:"Builder Delivery History", grad:"linear-gradient(135deg,#0F1E38,#B8922A)",
    portal:"Developer track record, past projects reviewed",
    points:["Completion and handover timelines for past delivered projects","Any court cases, consumer forum complaints, or RERA non-compliance notices on record","Historical pattern of construction quality and society formation compliance","Current financial standing where publicly available for listed developers"] },
  { n:"03", icon:"A", title:"Project-Level Statutory Approvals", grad:"linear-gradient(135deg,#0F1E38,#2a3f6f)",
    portal:"DDA · HRERA · NOIDA Authority · GNIDA approvals verified",
    points:["Building plan sanction (BPS) from the relevant development authority","Commencement certificate (CC) for the specific tower or phase","Environmental clearance (EC) where applicable under EIA notification","Occupation certificate (OC) or Completion certificate (CC) status for ready properties"] },
  { n:"04", icon:"P", title:"Price Fairness Assessment", grad:"linear-gradient(135deg,#0F1E38,#3a6a8f)",
    portal:"Sub-registrar registered transaction data · Government circle rates",
    points:["Recent registered transactions in the same sub-locality or sector","Government circle rates for the area","Active competing inventory pricing","Published result: is this project fairly priced, at a premium, or at a discount versus comparables?"] },
  { n:"05", icon:"T", title:"Title & Document Availability", grad:"linear-gradient(135deg,#0F1E38,#5a6070)",
    portal:"Developer confirmation of document readiness",
    points:["Parent title documents for the land parcel","Allotment letters, registered sale deed templates","No Objection Certificate (NOC) from relevant authorities where required","RERA registration certificate, approved building plan, and EC"] },
];

const faqs = [
  { q:"Does a Vedhara Verified badge guarantee a project is risk-free?", a:"No. The Verified badge confirms a project passed Vedhara's five documented checks at the time of listing. Real estate transactions in India involve ongoing risks, regulatory changes, construction delays, developer financial health, that cannot be eliminated by any due-diligence process. We strongly recommend independent legal review before any agreement is signed." },
  { q:"How often is verification status updated?", a:"Verification is conducted at the time of listing. Projects that remain active on the platform undergo periodic re-verification, particularly for RERA status and construction progress updates. If a project's status changes materially, we update the listing accordingly." },
  { q:"What RERA portals does Vedhara check?", a:"For Delhi NCR projects: UP RERA (rera.up.gov.in) for Noida, Greater Noida, and Ghaziabad projects; HRERA (hrera.org.in) for Gurugram and Faridabad projects in Haryana; and Delhi RERA (rera.delhi.gov.in) for Delhi projects. All RERA portal checks are conducted directly, not through third-party aggregators." },
  { q:"Can I request verification details for a specific property?", a:"Yes. For any listed property, you can request the full verification report, RERA number, builder history summary, approval status, and price benchmarking data, through your assigned Vedhara advisor or via the contact form." },
];

const howToSchema = {
  "@context":"https://schema.org","@type":"HowTo",
  name:"How Vedhara Group Verifies a Property Listing",
  step:checks.map(c=>({ "@type":"HowToStep",name:c.title,text:c.points.join(". ") })),
};

export default function VerificationCenterPage() {
  return (
    <>
      <JsonLd data={howToSchema} />
      <VideoHeroSection videoSrc="/videos/Property%20Verification.mp4">
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>Verification Center</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
            What Vedhara Checks Before Any Property<br /><span style={{ color:"var(--gold-lt)" }}>Reaches You, In Plain Language.</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.72)",maxWidth:580,margin:"0 auto" }}>
            The most common phrase in Indian real estate marketing is &ldquo;verified properties.&rdquo; The least common explanation is what &ldquo;verified&rdquo; actually means. Here is exactly what we check, five steps, documented and published on every listing.
          </p>
        </VideoHeroSection>

      <section style={{ background:"var(--cream)",padding:"96px 32px" }}>
        <div style={{ maxWidth:1060,margin:"0 auto" }}>
          {checks.map((c,i)=>(
            <ScrollReveal key={c.n} delay={i*60}>
              <div style={{ display:"grid",gridTemplateColumns:"200px 1fr",gap:40,paddingBottom:52,marginBottom:52,borderBottom:i<checks.length-1?"1px solid rgba(42,45,53,0.08)":"none",alignItems:"flex-start" }} className="check-row">
                <div>
                  <div className="gold-accent"></div>
                  <span className="eyebrow" style={{ display:"block",marginBottom:8 }}>CHECK {c.n}</span>
                  <div style={{ background:"rgba(184,146,42,0.06)",border:"1px solid rgba(184,146,42,0.12)",padding:"8px 12px" }}>
                    <span className="body-sm" style={{ color:"var(--slate)" }}>{c.portal}</span>
                  </div>
                </div>
                <div>
                  <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:20,fontSize:"clamp(16px,2vw,22px)" }}>{c.title}</h2>
                  {c.points.map((pt,pi)=>(
                    <div key={pi} style={{ display:"flex",gap:12,marginBottom:12 }}>
                      <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2 }}>-</span>
                      <span className="body-md" style={{ color:"var(--slate)" }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <div style={{ background:"linear-gradient(135deg,rgba(184,146,42,0.08),rgba(184,146,42,0.04))",border:"1px solid rgba(184,146,42,0.2)",padding:"36px 40px" }}>
              <div style={{ display:"flex",gap:20,alignItems:"flex-start" }}>
                <div className="gold-accent" style={{width:36,height:2,flexShrink:0,background:"var(--gold)",marginTop:8}}></div>
                <div>
                  <h3 className="heading-md" style={{ color:"var(--navy)",marginBottom:12 }}>What a &ldquo;Verified&rdquo; Badge Means, and Doesn&apos;t Mean</h3>
                  <p className="body-md" style={{ color:"var(--slate)",marginBottom:12 }}>A Verified badge on a Vedhara listing means the project passed all five checks at the time of publishing. It is a rigorous starting signal, not a substitute for independent legal due diligence before you sign any agreement.</p>
                  <p className="body-md" style={{ color:"var(--slate)",margin:0 }}>We recommend every buyer engage their own property lawyer for final document review, and can provide referrals to trusted legal professionals in Delhi NCR.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ background:"var(--navy)",padding:"72px 32px",textAlign:"center" }}>
        <div style={{ maxWidth:540,margin:"0 auto" }}>
          <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:14,lineHeight:1.1 }}>Want These Checks Applied to a Specific Property?</h2>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",marginBottom:28 }}>Share the property details with us. We will run the Verification Framework and share the results.</p>
          <Link href="/contact" className="btn btn-primary">Request a Property Verification →</Link>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Verification Center FAQ" />
      <style>{`@media(max-width:700px){.check-row{grid-template-columns:1fr!important;}}`}</style>
    </>
  );
}
