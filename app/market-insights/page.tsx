import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title:"Delhi NCR Real Estate Market Insights", description:"Independent real estate market analysis for Delhi NCR, Faridabad, Manesar, Chandigarh & North India: price trends, locality demand and investment hotspots.", alternates:{ canonical:"https://www.vedharagroup.com/market-insights" } };

const themes = [
  { title:"Delhi NCR Premium Segment", body:"Post-2022 price appreciation has been significant across Gurugram and Noida Expressway premium corridors. The ₹1.5Cr–3Cr segment remains the most active nationally, driven by end-user demand from corporate employment growth." },
  { title:"Faridabad Undervaluation", body:"Faridabad's NH-19 corridor offers similar connectivity to south Gurugram at significantly lower price points, increasingly attractive to buyers priced out of premium Gurugram sectors. Entry prices 30–40% below comparable Gurugram inventory." },
  { title:"Noida Expressway Infrastructure", body:"Upcoming Jewar Airport (Noida International Airport), the Aqua Line Metro extension, and Film City development are material value drivers for Noida Expressway and Greater Noida localities. Projects in the 10–15 km radius are well-positioned." },
  { title:"Rental Market Tightening", body:"Corporate demand recovery post-2023 has tightened rental supply in Cyber City (Gurugram) and Noida's Sector 62/63 IT corridors. Rental yields in these locations have improved from 2021 lows to 3.5–4.5% gross." },
];

const differentiators = [
  {
    title:"Primary Transaction Data, Not Portal Aggregates",
    desc:"Our data comes from registered transactions, RERA filings, and our own advisory team's ground-level assessments across Delhi NCR micro-markets, not scraped portal listings that reflect asking prices, not actual transaction values.",
    competitor:"Most market reports rely on aggregated listing data that reflects asking prices, not actual transaction values.",
  },
  {
    title:"Independent Analysis with No Developer Bias",
    desc:"Vedhara does not accept commissions or fees for featuring projects in our research. Our themes and reports are driven entirely by data, not developer relationships or advertising revenue.",
    competitor:"Many market reports are commissioned or sponsored by developers, biasing coverage toward their projects and preferred narratives.",
  },
  {
    title:"Ground-Level Verification by Local Advisory Team",
    desc:"Our advisors are based in Delhi NCR and physically visit micro-markets regularly. We do not produce research from a central desk without field assessment and local validation.",
    competitor:"Most market intelligence is compiled remotely by analysts who rarely visit the localities they report on, missing ground-level nuances.",
  },
  {
    title:"Quarterly Updates with Actionable Context",
    desc:"Each quarterly review translates data into practical guidance for buyers, sellers, and investors, not just charts and statistics. We tell you what the numbers mean for your next decision.",
    competitor:"Competing reports often publish raw data or generic trends without interpretation, leaving readers without actionable insight.",
  },
];

const includedItems = [
  "Monthly price-per-sqft data across 8+ NCR micro-markets with trend analysis",
  "Infrastructure project tracking with completion timelines and impact assessment",
  "Locality demand signals and inventory absorption rate analysis",
  "Rental yield movements by micro-market with gross and net estimates",
  "Curated investment opportunity alerts with context and timing",
  "Quarterly thematic reports with forward outlook and risk factors",
];

const whoForItems = [
  "Home buyers evaluating fair market value before making an offer",
  "Property investors tracking market cycles and identifying entry points",
  "NRI owners monitoring their portfolio markets remotely",
  "Developers assessing competitive landscape and pricing positioning",
  "Financial advisors seeking independent data for client guidance",
];

const marketFaqs: FAQItem[] = [
  {
    q:"How does Vedhara gather its market intelligence?",
    a:"Vedhara's market insights are compiled from verified transaction data, RERA filings, developer disclosures, and our own advisory team's ground-level assessments across Delhi NCR, Faridabad, Manesar, Chandigarh and North India micro-markets. We do not rely on aggregated portal data alone.",
  },
  {
    q:"Is the Ground Report available for free?",
    a:"Yes. The monthly Ground Report is delivered free via email to all subscribers. It includes price-per-sqft movement in key micro-markets, infrastructure updates, rental trends, and curated investment opportunities.",
  },
  {
    q:"How often is market data updated?",
    a:"Our market themes are reviewed quarterly, while the Ground Report is published monthly. For clients engaged in active transactions, real-time locality intelligence is provided as part of the advisory engagement.",
  },
  {
    q:"Can I get custom research for a specific locality?",
    a:"Absolutely. Vedhara offers bespoke market research for clients evaluating specific localities or projects. This service is available as part of our investment advisory engagement or as a standalone research report.",
  },
  {
    q:"Does Vedhara provide investment recommendations?",
    a:"We provide data-driven market analysis, not buy or sell recommendations. Our insights are designed to help you make informed decisions based on verified information rather than sales pressure.",
  },
];

export default function MarketInsightsPage() {
  return (
    <>
      <VideoHeroSection videoSrc="/videos/Property%20Investment.mp4">
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Research &amp; Insights</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          Delhi NCR Real Estate Intel,<br /><span style={{ color:"var(--gold-lt)" }}>Research That Informs, Not Sells</span>
        </h1>
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
            <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Market Intelligence</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                Data-Driven Perspective<br /><span style={{ color:"var(--gold-dk)" }}>on Delhi NCR Real Estate</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              Vedhara's research team tracks price movements, infrastructure developments, and demand patterns across Delhi NCR, Faridabad, Manesar, Chandigarh and North India micro-markets. Our insights are grounded in verified transaction data and ground-level assessments, not aggregated portal listings.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* What's Included + Who This Is For */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
          <ScrollReveal style={{ display:"flex" }}>
            <div className="gold-frame-card gfc-navy" style={{ padding:"44px 36px",boxShadow:"0 16px 40px rgba(9,15,29,0.2)",display:"flex",flexDirection:"column" }}>
              <span className="v-line" style={{ background:"var(--gold)" }} />
              <div style={{ flex:1 }}>
                <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>What's Included</p>
                <h2 className="heading-lg" style={{ color:"var(--light)",marginBottom:24 }}>What's Included</h2>
                {includedItems.map(item=>(
                  <div key={item} style={{ display:"flex",gap:14,marginBottom:16,alignItems:"flex-start" }}>
                    <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:16,fontWeight:700,lineHeight:1 }}>✓</span>
                    <span className="body-md" style={{ color:"rgba(252,250,244,0.78)",lineHeight:1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop:24,borderTop:"1px solid rgba(212,168,67,0.25)" }}>
                <Link href="/contact" className="btn btn-primary">Subscribe to Ground Report →</Link>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120} direction="right" style={{ display:"flex" }}>
            <div className="gold-frame-card gfc-cream" style={{ padding:"44px 36px",boxShadow:"0 8px 24px rgba(9,15,29,0.06)",display:"flex",flexDirection:"column" }}>
              <span className="v-line" style={{ background:"var(--gold)" }} />
              <div style={{ flex:1 }}>
                <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Who This Is For</p>
                <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:24 }}>Who This Is For</h2>
                {whoForItems.map(item=>(
                  <div key={item} style={{ display:"flex",gap:14,marginBottom:16,alignItems:"flex-start" }}>
                    <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:14,lineHeight:1 }}>◆</span>
                    <span className="body-md" style={{ color:"var(--slate)",lineHeight:1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop:24,borderTop:"1px solid rgba(212,168,67,0.2)" }}>
                <Link href="/contact" className="btn btn-dark">Request Custom Research →</Link>
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
              <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Why Vedhara</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                Market Intelligence,<br /><span style={{ color:"var(--gold-dk)" }}>Done Differently</span>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:620,margin:"0 auto" }}>
                Most market research tells you what happened. Vedhara tells you what it means and why it matters for your next property decision.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24 }} className="grid-2">
            {differentiators.map((d,i)=>(
              <ScrollReveal key={d.title} delay={i * 100}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",height:"100%",display:"flex",flexDirection:"column",boxShadow:"0 4px 20px rgba(9,15,29,0.04)" }}>
                  <div style={{ height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt))",flexShrink:0 }} />
                  <div style={{ padding:"28px 28px 24px",flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-dk)",borderRadius:3,flexShrink:0 }}>Vedhara</span>
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

      {/* Current Market Themes */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:52 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Market Analysis</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Current Market<span style={{ color:"var(--gold-lt)" }}> Themes</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Key trends shaping the Delhi NCR real estate landscape, updated quarterly based on transaction data and ground-level intelligence.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24 }} className="grid-2">
            {themes.map((t,i)=>(
              <ScrollReveal key={t.title} delay={i*80} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column" }}>
                  <div style={{ height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt))",flexShrink:0 }} />
                  <div style={{ padding:"28px 28px 24px",flex:1 }}>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:10,lineHeight:1.3 }}>{t.title}</h3>
                    <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.7,fontSize:13 }}>{t.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={marketFaqs} title="Market Insights FAQ" dark={false} />
      <CTASection />
    </>
  );
}
