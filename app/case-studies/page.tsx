import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title:"Case Studies | Vedhara Group | Real Estate Advisory in Delhi NCR", description:"Detailed case studies from Vedhara Group's advisory engagements across Delhi NCR, covering complex transactions, NRI coordination, portfolio strategy, and commercial lease negotiations.", alternates:{ canonical:"https://www.vedharagroup.com/case-studies" } };

const cases = [
  {
    title:"Complex Title Resolution & Property Acquisition for NRI Client",
    client:"Mr. Rajesh Khanna (US-based NRI)",
    challenge:"Property had a disputed title with two prior claims. Client needed clean title before proceeding with a ₹4.2Cr purchase in Gurugram.",
    approach:"Engaged a property lawyer for title due diligence, coordinated with the developer to resolve outstanding claims, obtained RERA compliance certificate, and structured a payment plan aligned with title clearance milestones.",
    outcome:"Property acquired with clean title, ₹42 lakh saved through negotiated price reduction, and full remote coordination completed across three time zones.",
    tags:["NRI","Title Resolution","Gurugram","Luxury"],
    gradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#2a5f8f 100%)",
  },
  {
    title:"Multi-Property Portfolio Restructuring for HNI Investor",
    client:"Mrs. Sunita Agarwal",
    challenge:"Client held four under-performing residential properties across Noida and Ghaziabad with low rental yields and high maintenance costs.",
    approach:"Conducted portfolio audit, identified two properties with negative carry (yield < 2%), recommended sale and redeployment of capital into Noida Expressway commercial property with 6.5% yield.",
    outcome:"Two properties sold at fair market value, one commercial unit acquired, portfolio yield improved from 2.1% to 4.8% blended, annual maintenance cost reduced by ₹3.6 lakh.",
    tags:["Portfolio","Investment","Noida","Commercial"],
    gradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#6a8aaa 100%)",
  },
  {
    title:"Corporate Lease Negotiation for 15,000 sq.ft. Office",
    client:"FinTech Growth Solutions",
    challenge:"Client needed 15,000 sq.ft. Grade-A office space in Gurugram with expansion options, within a strict monthly budget of ₹12 lakh.",
    approach:"Shortlisted 7 properties across Sohna Road, Golf Course Road Extension, and Sector 44, negotiated lease terms including rent escalation cap, fit-out period, and termination clause.",
    outcome:"Secured 15,200 sq.ft. in Sector 44 at ₹11.2 lakh/month (7% below budget), with 2-year rent freeze and one-time expansion right to 20,000 sq.ft.",
    tags:["Commercial","Lease","Gurugram","Corporate"],
    gradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 50%,#D4A843 100%)",
  },
  {
    title:"First-Time Buyer Journey in Faridabad's NH-19 Corridor",
    client:"Mr. & Mrs. Verma",
    challenge:"Young couple with a ₹80 lakh budget wanted a 3 BHK in Faridabad but were unsure about locality, project quality, and the buying process.",
    approach:"Educated them on the buying process, RERA verification, and stamp duty calculations. Shortlisted 5 projects across NH-19 corridor, arranged site visits, and negotiated pricing with two developers.",
    outcome:"Purchased 3 BHK (1,450 sq.ft.) in Sector 47, Faridabad at ₹73.5 lakh, saved ₹6.5 lakh vs. initial developer quote. Client moved in within 6 months of first consultation.",
    tags:["First-Time Buyer","Faridabad","Residential","Affordable"],
    gradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#D4A843 100%)",
  },
  {
    title:"Rent-to-Buy Strategy for Relocating Executive",
    client:"Mr. Vikram Singh (Transferred to Gurugram)",
    challenge:"Client relocated from Mumbai and needed a rental property immediately while planning a purchase within 12 months. Wanted to avoid paying rent while also saving for a down payment.",
    approach:"Structured a rent-to-buy arrangement with the landlord at a discounted monthly rate with a portion of rent credited toward future purchase. Assisted with employer relocation package negotiation.",
    outcome:"Secured a 4 BHK in Sector 57 at ₹65,000/month (market rate ₹85,000) with 30% of rent accumulated as a purchase credit. Client closed the purchase 10 months later.",
    tags:["Rent-to-Buy","Relocation","Gurugram","Residential"],
    gradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 50%,#3a6a8a 100%)",
  },
  {
    title:"Pre-Launch Investment Advisory with Exit Strategy",
    client:"Dr. Arvind Mehta (UK-based NRI)",
    challenge:"Client wanted to invest ₹1.5Cr in a pre-launch Noida project but was concerned about construction delays and exit liquidity.",
    approach:"Evaluated developer track record, RERA registration status, and historical delivery timelines. Advised on a project with phase-wise possession and a buy-back guarantee clause in the agreement.",
    outcome:"Booked two 2 BHK units at pre-launch pricing, one for long-term hold and one with a 3-year exit clause. First unit appreciated 18% within 18 months. Exit clause exercised on schedule.",
    tags:["Pre-Launch","Investment","Noida","NRI"],
    gradient:"linear-gradient(135deg,#090F1D 0%,#1a2a4a 50%,#4a6a8a 100%)",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <VideoHeroSection>
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Case Studies</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          Advisory in Action,<br /><span style={{ color:"var(--gold-lt)" }}>Results That Speak</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Detailed accounts of how Vedhara's advisory approach translated into measurable outcomes for real clients across Delhi NCR.</p>
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
            <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Featured Engagements</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Every Engagement Teaches Us<br /><span style={{ color:"var(--gold-dk)" }}>Something New</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              These case studies represent some of the more complex and rewarding advisory engagements we have handled. Each one reflects our commitment to thoroughness, transparency, and client-first outcomes, regardless of transaction size.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Our Advisory Approach – 4-Step Process */}
      <section style={{ background:"var(--navy)",padding:"80px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Our Advisory Approach</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                How We Deliver<br /><span style={{ color:"var(--gold-lt)" }}>Measurable Outcomes</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.7)",maxWidth:600,margin:"0 auto" }}>
                Every engagement follows a structured process designed to minimise risk, maximise value, and ensure complete transparency at every stage.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }} className="grid-4">
            {[
              { step:"01", title:"Discovery & Diagnosis", desc:"We spend time understanding your goals, budget, timeline, and risk appetite. No recommendations until we know your full picture." },
              { step:"02", title:"Research & Shortlisting", desc:"Our team scans the entire NCR market, not just a portfolio. We shortlist only properties that pass our five-point verification framework." },
              { step:"03", title:"Negotiation & Execution", desc:"We negotiate pricing, terms, and documentation on your behalf. Every offer, counter-offer, and clause is reviewed with you before proceeding." },
              { step:"04", title:"Post-Closure Support", desc:"After registration, we stay available for rental management, compliance, tax advisory, and future portfolio decisions. It is a relationship, not a transaction." },
            ].map((a,i)=>(
              <ScrollReveal key={a.step} delay={i*80} style={{ display:"flex" }}>
                <div style={{ display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"32px 20px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,flex:1 }}>
                  <div style={{ width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,flexShrink:0 }}>
                    <span style={{ fontFamily:"var(--t-head)",fontSize:18,fontWeight:700,color:"var(--navy)" }}>{a.step}</span>
                  </div>
                  <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--light)",marginBottom:8,lineHeight:1.3 }}>{a.title}</h3>
                  <p className="body-sm" style={{ color:"rgba(252,250,244,0.65)",fontSize:12,lineHeight:1.8,flex:1 }}>{a.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Cover – Two-Column Gold-Frame */}
      <section style={{ background:"var(--cream)",padding:"80px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Our Expertise</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                Advisory Across the<br /><span style={{ color:"var(--gold-dk)" }}>Full Property Lifecycle</span>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:600,margin:"0 auto" }}>
                From first-time buyers to portfolio investors, our advisory covers every stage of the real estate journey.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24 }} className="grid-2">
            {/* Column 1: Transactions */}
            <ScrollReveal style={{ display:"flex" }}>
              <div className="gfc-cream" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,padding:"36px 32px",flex:1 }}>
                <div style={{ width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,flexShrink:0 }}>
                  <span style={{ fontFamily:"var(--t-head)",fontSize:18,fontWeight:700,color:"var(--navy)" }}>01</span>
                </div>
                <h3 style={{ fontFamily:"var(--t-head)",fontSize:16,fontWeight:700,color:"var(--navy)",marginBottom:10,lineHeight:1.3 }}>Transaction Advisory</h3>
                <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.8,marginBottom:16 }}>
                  We guide buyers, sellers, and investors through every step of the property transaction lifecycle, ensuring compliance, fair pricing, and a smooth closing process from offer to registration.
                </p>
                <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                  {["Residential purchase & sale advisory across all NCR corridors","Commercial & retail lease negotiation for corporate tenants","Pre-launch investment evaluation with exit strategy planning","NRI remote transaction management (POA, remittance, registration)"].map(item=>(
                    <li key={item} style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",padding:"4px 0 4px 18px",position:"relative",lineHeight:1.6 }}>
                      <span style={{ position:"absolute",left:0,top:"7px",width:6,height:6,borderRadius:"50%",background:"var(--gold)",opacity:0.8 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Column 2: Strategy & Portfolio */}
            <ScrollReveal delay={100} style={{ display:"flex" }}>
              <div className="gfc-cream" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,padding:"36px 32px",flex:1 }}>
                <div style={{ width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,flexShrink:0 }}>
                  <span style={{ fontFamily:"var(--t-head)",fontSize:18,fontWeight:700,color:"var(--navy)" }}>02</span>
                </div>
                <h3 style={{ fontFamily:"var(--t-head)",fontSize:16,fontWeight:700,color:"var(--navy)",marginBottom:10,lineHeight:1.3 }}>Strategy & Portfolio Management</h3>
                <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.8,marginBottom:16 }}>
                  Beyond individual transactions, we help clients build, manage, and optimise their real estate portfolios for long-term wealth creation, tax efficiency, and risk diversification.
                </p>
                <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                  {["Portfolio audit, yield analysis & rebalancing recommendations","Rent vs. buy, ready vs. pre-launch, residential vs. commercial evaluation","Property tax planning, compliance review & advisory","Exit strategy, sale timing & capital gains optimisation"].map(item=>(
                    <li key={item} style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",padding:"4px 0 4px 18px",position:"relative",lineHeight:1.6 }}>
                      <span style={{ position:"absolute",left:0,top:"7px",width:6,height:6,borderRadius:"50%",background:"var(--gold)",opacity:0.8 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Case study cards */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }} className="grid-3">
            {cases.map((c,i)=>(
              <ScrollReveal key={c.title} delay={i*60} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column" }}>
                  <div style={{ height:100,background:c.gradient,position:"relative",display:"flex",alignItems:"center",padding:"0 24px",flexShrink:0 }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ display:"flex",gap:4,flexWrap:"wrap",position:"relative",zIndex:1 }}>
                      {c.tags.map(tag=>(
                        <span key={tag} style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"3px 8px",borderRadius:12,background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.85)",border:"1px solid rgba(255,255,255,0.2)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding:"24px 24px 20px",flex:1,display:"flex",flexDirection:"column" }}>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:10.5,color:"var(--gold-dk)",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:600,marginBottom:2 }}>{c.client}</p>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.4 }}>{c.title}</h3>
                    <div style={{ marginBottom:10 }}>
                      <p style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--gold-dk)",marginBottom:2 }}>Challenge</p>
                      <p className="body-sm" style={{ color:"var(--slate)",fontSize:11.5,lineHeight:1.6 }}>{c.challenge}</p>
                    </div>
                    <div style={{ marginBottom:10 }}>
                      <p style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--gold-dk)",marginBottom:2 }}>Approach</p>
                      <p className="body-sm" style={{ color:"var(--slate)",fontSize:11.5,lineHeight:1.6 }}>{c.approach}</p>
                    </div>
                    <div style={{ padding:"12px 14px",background:"rgba(212,168,67,0.06)",borderRadius:8,borderLeft:"2px solid var(--gold)",marginTop:"auto" }}>
                      <p style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--gold-dk)",marginBottom:2 }}>Outcome</p>
                      <p className="body-sm" style={{ color:"var(--ink)",fontSize:11.5,lineHeight:1.6,margin:0 }}>{c.outcome}</p>
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
