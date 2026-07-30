import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
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
  { n:"02", icon:"B", title:"Builder Delivery History", grad:"linear-gradient(135deg,#0F1E38,#D4A843)",
    portal:"Developer track record, past projects reviewed",
    points:["Completion and handover timelines for past delivered projects","Any court cases, consumer forum complaints, or RERA non-compliance notices on record","Historical pattern of construction quality and society formation compliance","Current financial standing where publicly available for listed developers"] },
  { n:"03", icon:"A", title:"Project-Level Statutory Approvals", grad:"linear-gradient(135deg,#0F1E38,#D4A843)",
    portal:"DDA · HRERA · NOIDA Authority · GNIDA approvals verified",
    points:["Building plan sanction (BPS) from the relevant development authority","Commencement certificate (CC) for the specific tower or phase","Environmental clearance (EC) where applicable under EIA notification","Occupation certificate (OC) or Completion certificate (CC) status for ready properties"] },
  { n:"04", icon:"P", title:"Price Fairness Assessment", grad:"linear-gradient(135deg,#0F1E38,#1a3a5c)",
    portal:"Sub-registrar registered transaction data · Government circle rates",
    points:["Recent registered transactions in the same sub-locality or sector","Government circle rates for the area","Active competing inventory pricing","Published result: is this project fairly priced, at a premium, or at a discount versus comparables?"] },
  { n:"05", icon:"T", title:"Title & Document Availability", grad:"linear-gradient(135deg,#0F1E38,#1a3a5c)",
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
            What Vedhara Checks Before<br /><span style={{ color:"var(--gold-lt)" }}>Any Property Reaches You</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>
            &ldquo;Verified properties&rdquo; most common phrase.<br />&ldquo;Verified&rdquo; meaning rarely explained.<br />See our five checks on every listing.
          </p>
        </VideoHeroSection>

      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          {/* Section Intro */}
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Our Five-Step Framework</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>
                How Every Property Gets{" "}
                <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold)" }}>Verified</em>
              </h2>
            </div>
          </ScrollReveal>

          {/* Verification Steps as Visual Process */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24 }} className="grid-2">
            {checks.map((c,i)=>(
              <ScrollReveal key={c.n} delay={i*80} style={i===4?{gridColumn:"1 / -1",display:"flex",justifyContent:"center"}:{}} className={i===4?"vrf-last":""}>
                <div className="vrf-card" style={{
                  background:"var(--cream)",
                  border:"1px solid rgba(42,45,53,0.06)",
                  overflow:"hidden",
                  height:"100%",
                  display:"flex",
                  flexDirection:"column",
                  position:"relative",
                  transition:"transform 0.4s var(--ease-out), box-shadow 0.4s ease",
                  boxSizing:"border-box",
                  maxWidth:i===4?"calc(50% - 12px)":"none",
                  width:i===4?"100%":"auto",
                }}>
                  {/* Colored step header with gradient */}
                  <div style={{
                    background:c.grad,
                    padding:"18px 24px",
                    display:"flex",
                    alignItems:"center",
                    gap:16,
                    position:"relative",
                    overflow:"hidden",
                  }}>
                    {/* Radial glow */}
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 50%,rgba(255,255,255,0.08) 0%,transparent 60%)" }} />
                    {/* Step number circle */}
                    <div style={{
                      width:44,
                      height:44,
                      borderRadius:"50%",
                      background:"rgba(255,255,255,0.12)",
                      border:"2px solid rgba(255,255,255,0.2)",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      flexShrink:0,
                      position:"relative",
                      zIndex:1,
                    }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:18,fontWeight:700,color:"rgba(255,255,255,0.9)" }}>{c.n}</span>
                    </div>
                    {/* Title */}
                    <h3 style={{
                      fontFamily:"var(--t-head)",
                      fontSize:"clamp(13px,1.4vw,17px)",
                      fontWeight:600,
                      color:"var(--light)",
                      margin:0,
                      lineHeight:1.25,
                      position:"relative",
                      zIndex:1,
                    }}>{c.title}</h3>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding:"20px 24px 24px",flex:1,display:"flex",flexDirection:"column" }}>
                    {/* Bullet Points */}
                    <div style={{ flex:1 }}>
                      {c.points.map((pt,pi)=>(
                        <div key={pi} style={{ display:"flex",gap:10,marginBottom:10,alignItems:"flex-start" }}>
                          {/* Diamond bullet */}
                          <span style={{
                            width:6,
                            height:6,
                            minWidth:6,
                            background:"var(--gold)",
                            transform:"rotate(45deg)",
                            marginTop:7,
                            opacity:0.5,
                          }} />
                          <span className="body-sm" style={{ color:"var(--slate)",lineHeight:1.65 }}>{pt}</span>
                        </div>
                      ))}
                    </div>
                    {/* Portal Footer */}
                    <div style={{ marginTop:"auto",paddingTop:14,borderTop:"1px solid rgba(42,45,53,0.05)" }}>
                      <span className="caption" style={{ color:"rgba(42,45,53,0.3)",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",display:"block",marginBottom:3 }}>Data Source</span>
                      <p className="body-sm" style={{ color:"var(--slate)",margin:0,fontSize:11.5,lineHeight:1.5 }}>{c.portal}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div style={{
              background:"var(--cream)",
              border:"2px solid var(--navy)",
              borderRadius:6,
              padding:"36px 40px",
              marginTop:40,
              position:"relative",
              boxShadow:"0 8px 32px rgba(15,30,56,0.08)",
            }}>
              {/* Decorative gold top line */}
              <div style={{ position:"absolute",top:-1,left:48,right:48,height:3,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.5 }} />
              
              <div style={{ display:"flex",gap:18,alignItems:"flex-start" }} className="vrf-badge-row">
                {/* Verification Seal Badge */}
                <div style={{
                  width:60,
                  height:60,
                  minWidth:60,
                  borderRadius:"50%",
                  background:"var(--navy)",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  flexShrink:0,
                  border:"2px solid var(--gold)",
                  boxShadow:"0 0 0 3px var(--cream), 0 0 0 5px var(--navy)",
                  position:"relative",
                }}>
                  <span style={{ fontFamily:"var(--t-head)",fontSize:10,color:"var(--gold-lt)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",textAlign:"center",lineHeight:1.15 }}>VERI&shy;FIED</span>
                </div>
                <div style={{ flex:1 }}>
                  <h3 className="heading-sm vrf-badge-title" style={{ color:"var(--navy)",margin:"0 0 12px",fontSize:"clamp(15px,1.6vw,20px)" }}>What a &ldquo;Verified&rdquo; Badge Means, and Doesn&apos;t Mean</h3>
                  <p className="body-sm" style={{ color:"var(--slate)",margin:"0 0 12px",lineHeight:1.75 }}>
                    A Verified badge on a Vedhara listing means the project passed all five checks at the time of publishing. It is a rigorous starting signal, not a substitute for independent legal due diligence before you sign any agreement.
                  </p>
                  <p className="body-sm" style={{ color:"var(--slate)",margin:0,lineHeight:1.75,borderTop:"1px solid rgba(42,45,53,0.06)",paddingTop:12 }}>
                    We recommend every buyer engage their own property lawyer for final document review, and can provide referrals to trusted legal professionals in Delhi NCR.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ background:"var(--navy)",padding:"60px 32px",textAlign:"center" }}>
        <div style={{ maxWidth:540,margin:"0 auto" }}>
          <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:14,lineHeight:1.1 }}><span className="d-line">Want These Checks Applied</span> <span className="d-line">to a Specific Property?</span></h2>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",marginBottom:28 }}><span className="d-line">Share the property details with us.</span> <span className="d-line">We will run the Verification Framework and share the results.</span></p>
          <Link href="/contact" className="btn btn-primary">Request a Property Verification →</Link>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Verification Center FAQ" />
      <CTASection />
      <style>{`
        .vrf-card {
          box-sizing:border-box;
        }
        .vrf-card:hover {
          transform: translateY(-6px) scale(1.01) !important;
          box-shadow: 0 20px 48px rgba(9,15,29,0.18) !important;
          border-color: rgba(212,168,67,0.2) !important;
        }
        .vrf-last .vrf-card {
          max-width: calc(50% - 12px) !important;
          width: 100% !important;
        }
        .d-line{display:inline;}
        @media(min-width:901px){
          .d-line{display:block;}
        }
        @media(max-width:700px){
          .grid-2{grid-template-columns:1fr!important;}
          .vrf-last { display:block !important; }
          .vrf-last .vrf-card { max-width:none !important; width:auto !important; }
        }
        @media(max-width:900px){
          .vrf-badge-row{flex-direction:column!important;align-items:center!important;text-align:left!important;}
          .vrf-badge-row > div:last-child{width:100%!important;}
          .vrf-badge-title{text-align:center!important;}
        }
      `}</style>
    </>
  );
}