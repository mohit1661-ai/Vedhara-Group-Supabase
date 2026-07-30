import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title:"Careers at Vedhara Group | Real Estate Advisory Jobs in Delhi NCR", description:"Join Vedhara Group's independent real estate advisory team in Delhi NCR. Open positions in advisory, research, NRI services, and property management.", alternates:{ canonical:"https://www.vedharagroup.com/careers" } };

const openRoles = [
  {
    title:"Senior Real Estate Advisor",
    location:"Gurugram",
    type:"Full-Time",
    dept:"Advisory",
    desc:"Advise HNI and NRI clients on property acquisition across Delhi NCR. Manage end-to-end transaction lifecycle from shortlisting to registration.",
    gradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#2a5f8f 100%)",
  },
  {
    title:"Market Research Analyst",
    location:"Gurugram",
    type:"Full-Time",
    dept:"Research",
    desc:"Track price movements, infrastructure developments, and demand patterns across NCR micro-markets. Publish the monthly Ground Report.",
    gradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#6a8aaa 100%)",
  },
  {
    title:"NRI Relationship Manager",
    location:"Remote (India-based)",
    type:"Full-Time",
    dept:"NRI Services",
    desc:"Serve NRI clients across UAE, USA, UK, Canada, and Singapore with remote-first property advisory. Coordinate site visits, documentation, and transaction closure.",
    gradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 50%,#D4A843 100%)",
  },
  {
    title:"Property Management Executive",
    location:"Gurugram",
    type:"Full-Time",
    dept:"Operations",
    desc:"Manage tenant sourcing, rent collection, maintenance coordination, and monthly reporting for Vedhara's property management portfolio.",
    gradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#D4A843 100%)",
  },
  {
    title:"Digital Marketing & Content Lead",
    location:"Gurugram",
    type:"Full-Time",
    dept:"Marketing",
    desc:"Own Vedhara's content strategy, blog, SEO, social media, and lead generation. Create research-backed real estate content for Delhi NCR audiences.",
    gradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 50%,#3a6a8a 100%)",
  },
  {
    title:"Junior Advisor (Freshers Welcome)",
    location:"Gurugram",
    type:"Full-Time",
    dept:"Advisory",
    desc:"Support senior advisors with client research, property shortlisting, site visit coordination, and documentation. Training provided.",
    gradient:"linear-gradient(135deg,#090F1D 0%,#1a2a4a 50%,#4a6a8a 100%)",
  },
];

const values = [
  { title:"Independent Advice First", desc:"We do not earn commission by pushing any developer's inventory. Every recommendation starts with the client's requirement, not our margin." },
  { title:"Verification Before Listing", desc:"Every property we recommend passes our five-point Verification Framework. No exceptions." },
  { title:"Transparent Fees, Always", desc:"Our fee structure is disclosed before any engagement, in writing, with no hidden charges." },
  { title:"One Advisor, End-to-End", desc:"From first consultation to registration, a single named advisor owns your journey." },
];

export default function CareersPage() {
  return (
    <>
      <VideoHeroSection>
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Careers</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          Build a Career in<br /><span style={{ color:"var(--gold-lt)" }}>Real Estate Advisory</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Join Delhi NCR's fastest-growing independent advisory firm. No sales pressure, no targets, just honest advice and verified outcomes.</p>
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
            <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Join Our Team</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Work With Purpose,<br /><span style={{ color:"var(--gold-dk)" }}>Advise With Integrity</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              Vedhara Group is building the region's most trusted independent real estate advisory firm. We are looking for individuals who value transparency, rigour, and long-term client relationships over short-term commissions.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Values */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }} className="grid-4">
            {values.map((v,i)=>(
              <ScrollReveal key={v.title} delay={i*80}>
                <div style={{ textAlign:"center",padding:"32px 20px",background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,height:"100%",display:"flex",flexDirection:"column" }}>
                  <div style={{ width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",flexShrink:0 }}>
                    <span style={{ fontFamily:"var(--t-head)",fontSize:16,fontWeight:700,color:"var(--navy)" }}>{i+1}</span>
                  </div>
                  <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.3 }}>{v.title}</h3>
                  <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.7,flex:1 }}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ marginBottom:48,textAlign:"center" }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Open Positions</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                Join the<span style={{ color:"var(--gold-dk)" }}> Team</span>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:560,margin:"0 auto" }}>
                If you see a role that fits, send your CV and a brief note on why Vedhara, and we will get back to you within a week.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }} className="grid-3">
            {openRoles.map((role,i)=>(
              <ScrollReveal key={role.title} delay={i*60} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column" }}>
                  <div style={{ height:80,background:role.gradient,position:"relative",display:"flex",alignItems:"center",padding:"0 24px",flexShrink:0 }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ position:"relative",zIndex:1 }}>
                      <p style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:2 }}>{role.dept}</p>
                      <p style={{ fontFamily:"var(--t-body)",fontSize:11,color:"rgba(252,250,244,0.5)",margin:0 }}>{role.location} · {role.type}</p>
                    </div>
                  </div>
                  <div style={{ padding:"20px 24px 24px",flex:1,display:"flex",flexDirection:"column" }}>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.4 }}>{role.title}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.7,flex:1 }}>{role.desc}</p>
                    <div style={{ paddingTop:16,marginTop:12,borderTop:"1px solid rgba(212,168,67,0.15)" }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:"var(--gold-dk)",display:"inline-flex",alignItems:"center",gap:4 }}>
                        Apply Now →
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
