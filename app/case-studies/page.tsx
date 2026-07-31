import type { Metadata } from "next";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedStats from "@/components/sections/AnimatedStats";

export const metadata: Metadata = { title:"Real Estate Case Studies | Delhi NCR", description:"Real Delhi NCR real estate case studies: NRI purchase, portfolio restructuring, corporate lease negotiation and first-time home buying.", alternates:{ canonical:"https://www.vedharagroup.com/case-studies" } };

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
          Real Estate Case Studies:<br /><span style={{ color:"var(--gold-lt)" }}>Advisory in Action, Results That Speak</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Detailed accounts of how Vedhara's advisory approach translated into measurable outcomes for real clients across Delhi NCR.</p>
      </VideoHeroSection>

      {/* Gold differentiator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* Intro block */}
      <div style={{ background:"var(--cream)",textAlign:"center",padding:"48px 32px 48px" }}>
        <div style={{ maxWidth:700,margin:"0 auto" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>Featured Engagements</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Every Engagement Teaches Us<br /><span style={{ color:"#d4a843" }}>Something New</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8,marginBottom:48 }}>
              These case studies represent some of the more complex and rewarding advisory engagements we have handled across Gurugram, Noida, Faridabad, and the wider Delhi NCR region. Each one reflects our commitment to thoroughness, transparency, and client-first outcomes, whether we are guiding a first-time buyer, an NRI investor, or a corporate tenant, regardless of transaction size. Real client journeys, verified outcomes, and the measurable impact of independent advisory.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Animated stats band */}
      <AnimatedStats />

      {/* Our Advisory Approach – 4-Step Process */}
      <section style={{ background:"var(--navy)",padding:"56px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:12 }}>Our Advisory Approach</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:12 }}>
                How We Deliver<br /><span style={{ color:"var(--gold-lt)" }}>Measurable Outcomes</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:620,margin:"0 auto" }}>
                Every engagement follows a structured process designed to minimise risk, maximise value, and ensure complete transparency at every stage.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }} className="grid-4">
            {[
              { title:"Discovery & Diagnosis", desc:"We spend time understanding your goals, budget, timeline, and risk appetite. No recommendations until we know your full picture." },
              { title:"Research & Shortlisting", desc:"Our team scans the entire NCR market, not just a portfolio. We shortlist only properties that pass our five-point verification framework." },
              { title:"Negotiation & Execution", desc:"We negotiate pricing, terms, and documentation on your behalf. Every offer, counter-offer, and clause is reviewed with you before proceeding." },
              { title:"Post-Closure Support", desc:"After registration, we stay available for rental management, compliance, tax advisory, and future portfolio decisions. It is a relationship, not a transaction." },
            ].map((a,i)=>(
              <ScrollReveal key={a.title} delay={i*80} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column",boxShadow:"0 8px 24px rgba(0,0,0,0.15)" }}>
                  <div style={{ height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt),var(--gold))",flexShrink:0 }} />
                  <div style={{ padding:"20px 16px 20px",flex:1,display:"flex",flexDirection:"column",textAlign:"center" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:10 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:7.5,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"2px 7px",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",color:"var(--navy)",borderRadius:3,flexShrink:0 }}>Vedhara</span>
                    </div>
                    <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",flexShrink:0 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)" }}>{i+1}</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:13,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.3 }}>{a.title}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)",fontSize:11.5,lineHeight:1.7,flex:1 }}>{a.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise – Navy + Cream Gold-Frame Card Pair */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>Our Expertise</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                Advisory Across the<br /><span style={{ color:"#d4a843" }}>Full Property Lifecycle</span>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:620,margin:"0 auto" }}>
                From first-time buyers to portfolio investors, our advisory covers every stage of the real estate journey, in every major corridor of Delhi NCR.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
            {/* Transaction Advisory – Navy */}
            <ScrollReveal>
              <div className="gold-frame-card gfc-navy" style={{ padding:"44px 36px",boxShadow:"0 16px 40px rgba(9,15,29,0.2)" }}>
                <span className="v-line" style={{ background:"var(--gold)" }} />
                <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Transactions</p>
                <h2 className="heading-lg" style={{ color:"var(--light)",marginBottom:24 }}>Transaction Advisory</h2>
                <p className="body-md" style={{ color:"rgba(252,250,244,0.78)",lineHeight:1.8,marginBottom:24 }}>
                  We guide buyers, sellers, and investors through every step of the property transaction lifecycle across Delhi NCR, ensuring compliance, fair pricing, and a smooth closing process from offer to registration.
                </p>
                {["Residential purchase and sale advisory across all NCR corridors","Commercial and retail lease negotiation for corporate tenants","Pre-launch investment evaluation with exit strategy planning","NRI remote transaction management (POA, remittance, registration)"].map(item=>(
                  <div key={item} style={{ display:"flex",gap:14,marginBottom:14,alignItems:"flex-start" }}>
                    <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:16,fontWeight:700,lineHeight:1 }}>✓</span>
                    <span className="body-md" style={{ color:"rgba(252,250,244,0.78)",lineHeight:1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Strategy & Portfolio – Cream */}
            <ScrollReveal delay={120} direction="right">
              <div className="gold-frame-card gfc-cream" style={{ padding:"44px 36px",boxShadow:"0 8px 24px rgba(9,15,29,0.06)" }}>
                <span className="v-line" style={{ background:"var(--gold)" }} />
                <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Strategy</p>
                <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:24 }}>Strategy &amp; Portfolio Management</h2>
                <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.8,marginBottom:24 }}>
                  Beyond individual transactions, we help clients build, manage, and optimise their real estate portfolios for long-term wealth creation, tax efficiency, and risk diversification.
                </p>
                {["Portfolio audit, yield analysis and rebalancing recommendations","Rent vs. buy, ready vs. pre-launch, residential vs. commercial evaluation","Property tax planning, compliance review and advisory","Exit strategy, sale timing and capital gains optimisation"].map(item=>(
                  <div key={item} style={{ display:"flex",gap:14,marginBottom:14,alignItems:"flex-start" }}>
                    <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:14,lineHeight:1 }}>◆</span>
                    <span className="body-md" style={{ color:"var(--slate)",lineHeight:1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Case study cards */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>Client Journeys</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                Real Problems,<br /><span style={{ color:"#d4a843" }}>Verified Results</span>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:620,margin:"0 auto" }}>
                A closer look at six engagements that show how independent advisory creates measurable value for buyers, sellers, investors, and corporate clients across Delhi NCR.
              </p>
            </div>
          </ScrollReveal>
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

      {/* FAQ */}
      <FAQSection
        faqs={[
          { q:"Are the names and details in these case studies real?", a:"For privacy and confidentiality, we use representative descriptions rather than full identifying information. Every engagement reflects a genuine transaction handled by our advisory team, with figures and outcomes accurately represented." },
          { q:"How does Vedhara's advisory differ from a typical broker?", a:"We are an independent advisory and brokerage firm. We earn no developer commission tied to pushing inventory, so every recommendation starts with your needs. The case studies above show the kind of measurable outcomes this independence produces, from price reductions to portfolio yield improvements." },
          { q:"Can Vedhara handle a case like mine remotely?", a:"Yes. Many of our engagements, especially for NRI clients based in the UAE, USA, UK, Canada, and Singapore, are managed end-to-end remotely. We coordinate title checks, Power of Attorney, remittances, registration, and property management on your behalf." },
          { q:"What does it cost to engage Vedhara for a similar outcome?", a:"Our fee structure is transparent and disclosed in writing before any engagement begins. For many buyer and seller mandates we work on a success-based fee, and for advisory and management work we use fixed, agreed fees with no hidden charges." },
        ]}
        title="Case Studies, FAQ"
      />

      <CTASection />
    </>
  );
}
