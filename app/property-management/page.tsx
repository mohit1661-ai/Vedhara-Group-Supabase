import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Property Management Services in Delhi NCR", description:"Professional property management across Delhi NCR, Faridabad, Manesar & Chandigarh: tenant sourcing, rent collection, maintenance and remote NRI reporting.", alternates:{ canonical:"https://www.vedharagroup.com/property-management" } };

const content = servicePages["property-management"];

const differentiators = [
  {
    title:"Dedicated Single Point of Contact",
    desc:"Unlike large agencies where you speak to a different person every time, Vedhara assigns one dedicated manager to your property. They know your property, your tenants, and your preferences.",
    competitor:"Most property managers rotate staff, leaving owners repeating their requirements to new contacts.",
  },
  {
    title:"Verified Tenant Screening, Every Time",
    desc:"Every prospective tenant undergoes identity verification, employment checks, prior landlord references, and credit history review. You see the full dossier before we proceed.",
    competitor:"Many brokers skip verification or rely on self-declared information, increasing the risk of problem tenants.",
  },
  {
    title:"Transparent Reporting with Photo & Video",
    desc:"Monthly statements itemise every rupee collected and spent. Periodic property reports include photo and video walkthroughs so you can see your property's condition remotely.",
    competitor:"Most managers provide only a basic rent statement with no visual documentation of property condition.",
  },
  {
    title:"NRI-Friendly Remote Management",
    desc:"From lease signing to vendor payments to legal coordination, everything is handled remotely. You never need to be physically present for day-to-day operations.",
    competitor:"Traditional agencies expect owners to be available locally for inspections, signatures, and meetings.",
  },
];

const processSteps = [
  {
    step:"01",
    title:"Property Assessment & Onboarding",
    desc:"We inspect your property, document its current condition, discuss your goals (rental yield, timeline, tenant preference), and agree on a management plan.",
  },
  {
    step:"02",
    title:"Tenant Sourcing & Screening",
    desc:"We market the property across verified channels, screen applicants using our five-point framework, and present you with a shortlist of qualified tenants for final approval.",
  },
  {
    step:"03",
    title:"Lease & Move-In Management",
    desc:"We draft the lease agreement, coordinate security deposits, handle move-in formalities, and set up rent collection and communication protocols with the tenant.",
  },
  {
    step:"04",
    title:"Ongoing Operations & Reporting",
    desc:"Rent collection, maintenance coordination, vendor management, and monthly reporting continue for the duration of the lease, with you receiving updates without lifting a finger.",
  },
];

export default function PropertyManagementPage() {
  return (
    <>
      <JsonLd data={{"@context":"https://schema.org","@type":"Service",name:content.h1+(content.h1Accent?" "+content.h1Accent:""),provider:{"@id":"https://www.vedharagroup.com/#organization"},areaServed:{"@type":"City","name":"Delhi NCR"},description:content.intro}} />
      <VideoHeroSection videoSrc="/videos/Property%20Management%20Hero%20Video.mp4">
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>{content.eyebrow}</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(30px,5vw,56px)",color:"var(--light)",lineHeight:1.1,marginBottom:24 }}>
          {content.h1}{content.h1Accent && <><br /><span style={{ color:"var(--gold-lt)" }}>{content.h1Accent}</span></>}
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>{content.intro}</p>
      </VideoHeroSection>

      {/* What's Included + Who This Is For */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
          <ScrollReveal>
            <div className="gold-frame-card gfc-navy" style={{ padding:"44px 36px",boxShadow:"0 16px 40px rgba(9,15,29,0.2)" }}>
              <span className="v-line" style={{ background:"var(--gold)" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>What&apos;s Included</p>
              <h2 className="heading-lg" style={{ color:"var(--light)",marginBottom:24 }}>What&apos;s Included</h2>
              {content.included.map(item=>(
                <div key={item} style={{ display:"flex",gap:14,marginBottom:16,alignItems:"flex-start" }}>
                  <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:16,fontWeight:700,lineHeight:1 }}>✓</span>
                  <span className="body-md" style={{ color:"rgba(252,250,244,0.78)",lineHeight:1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120} direction="right">
            <div className="gold-frame-card gfc-cream" style={{ padding:"44px 36px",boxShadow:"0 8px 24px rgba(9,15,29,0.06)" }}>
              <span className="v-line" style={{ background:"var(--gold)" }} />
              <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>Who This Is For</p>
              <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:24 }}>Who This Is For</h2>
              {content.whoFor.map(item=>(
                <div key={item} style={{ display:"flex",gap:14,marginBottom:16,alignItems:"flex-start" }}>
                  <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:14,lineHeight:1 }}>◆</span>
                  <span className="body-md" style={{ color:"var(--slate)",lineHeight:1.7 }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop:32,paddingTop:24,borderTop:"1px solid rgba(212,168,67,0.2)" }}>
                <Link href="/contact#enquiry-form" className="btn btn-dark">{content.ctaLabel} →</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Vedhara - Expertise vs Competitors */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:52 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>Why Vedhara</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                Property Management,<br /><span style={{ color:"var(--gold-ink)" }}>Done Differently</span>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:620,margin:"0 auto" }}>
                Most property managers treat your property as just another file. Vedhara treats it as an asset, with transparency, accountability, and remote-first operations for today&apos;s owners.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24 }} className="grid-2">
            {differentiators.map((d,i)=>(
              <ScrollReveal key={d.title} delay={i * 100}>
                <div style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",height:"100%",display:"flex",flexDirection:"column",boxShadow:"0 4px 20px rgba(9,15,29,0.04)" }}>
                  <div style={{ height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt))",flexShrink:0 }} />
                  <div style={{ padding:"28px 28px 24px",flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-ink)",borderRadius:3,flexShrink:0 }}>Vedhara</span>
                      <div style={{ flex:1,height:1,background:"rgba(212,168,67,0.12)" }} />
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:16,fontWeight:700,color:"var(--navy)",marginBottom:10,lineHeight:1.3 }}>{d.title}</h3>
                    <p className="body-md" style={{ color:"var(--ink)",marginBottom:16,lineHeight:1.7,flex:1 }}>{d.desc}</p>
                    <div style={{ padding:"14px 16px",background:"var(--navy)",borderRadius:8,borderLeft:"3px solid var(--gold-lt)" }}>
                      <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:3 }}>Competitors typically</p>
                      <p className="body-sm" style={{ color:"rgba(252,250,244,0.75)",lineHeight:1.6,fontSize:12 }}>{d.competitor}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work - Process Steps as Cards */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:52 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>How We Work</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                From Onboarding to<span style={{ color:"var(--gold-lt)" }}> Ongoing Operations</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:560,margin:"0 auto" }}>
                A structured four-step process designed for minimal owner involvement and maximum property performance.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }} className="grid-4">
            {processSteps.map((s,i)=>(
              <ScrollReveal key={s.step} delay={i * 80}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textAlign:"center",height:"100%",display:"flex",flexDirection:"column" }}>
                  <div style={{ padding:"28px 20px 24px",flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",flexShrink:0 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)" }}>{s.step}</span>
                    </div>
                    <div style={{ width:32,height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),transparent)",margin:"0 auto 14px",flexShrink:0 }} />
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.3 }}>{s.title}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.7,flex:1 }}>{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <FAQSection faqs={content.faqs} title="Property Management FAQ" dark={false} />
      <CTASection />
    </>
  );
}
