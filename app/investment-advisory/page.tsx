import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import VideoHeroSection from "@/components/sections/VideoHeroSection";

export const metadata: Metadata = {
  title:"Real Estate Investment Advisory in Delhi NCR | ROI & Portfolio Strategy | Vedhara Group",
  description:"Build a high-yield real estate portfolio in Delhi NCR with Vedhara Group's independent investment advisory. Rental yield analysis, locality selection, and buy-to-invest strategy across Gurugram, Noida, and NCR.",
  alternates:{ canonical:"https://www.vedharagroup.com/investment-advisory" },
};

const steps = [
  { n:"01", title:"Legal & Title Clarity", desc:"No recommendation proceeds without a clean title check and RERA verification. A high-yield property with a clouded title is not an opportunity; it is a liability." },
  { n:"02", title:"Locality Growth Assessment", desc:"We evaluate upcoming infrastructure (Delhi Metro extensions, Expressway developments, commercial zone approvals), employer base, and demographic demand before recommending a micro-market." },
  { n:"03", title:"Price-to-Value Fairness", desc:"Investment purchases benchmarked against recent registered transactions and circle rates, not developer brochure prices. The difference matters significantly at investment scale." },
  { n:"04", title:"Rental Yield Analysis", desc:"Gross and net rental yield modelled against current comparable rental data for the specific locality and unit type. We use actual rental comparables, not developer rental projections." },
  { n:"05", title:"Resale Liquidity Assessment", desc:"We assess the historical transaction volume in the locality. Illiquid micro-markets may offer lower entry prices but make exit difficult when you need to sell." },
  { n:"06", title:"Portfolio Fit", desc:"Does this asset complement your existing holdings? We evaluate diversification, tenure mix, and income timing before recommending an acquisition." },
];

const corridors = [
  { area:"Gurugram Dwarka Expressway (Sectors 81–115)", yield:"3.5–4.5%", driver:"Strong rental demand from Cyber City and Udyog Vihar corporate corridors. New Metro extension improving connectivity." },
  { area:"Noida Sector 150 & Expressway", yield:"3–4.5%", driver:"Premium new launches with strong gross yields and capital appreciation from ongoing infrastructure development including Jewar Airport." },
  { area:"Greater Noida West", yield:"3.5–5%", driver:"Entry-level investment market with improving connectivity and strong rental demand from tech park growth." },
  { area:"Faridabad NH-19 Corridor", yield:"4–6%", driver:"Underserved market with growing industrial employment base and significantly lower entry prices than Gurugram or Noida." },
];

const faqs = [
  { q:"What rental yield can I expect from property investment in Delhi NCR?", a:"Gross rental yields in Delhi NCR typically range from 2.5% to 5% for residential property, depending on locality, unit size, and furnishing. Commercial property, retail and office, delivers 6–9% gross yields in established locations. Noida Expressway corridor and Gurugram Sohna Road are currently among the stronger residential yield markets in NCR." },
  { q:"Is Delhi NCR real estate a good investment in 2025–26?", a:"Delhi NCR's residential market has seen sustained price appreciation since 2022, particularly in Gurugram, Noida Expressway, and premium Delhi micro-markets. Investment viability depends heavily on which micro-market, which project, and at what price, which is exactly what Vedhara's investment advisory is designed to assess independently." },
  { q:"What is the minimum capital needed to invest in Delhi NCR property?", a:"Entry-level investment properties (1BHK/2BHK in Greater Noida West, Ghaziabad, or Faridabad) start from approximately ₹25–40 lakh. Premium investment properties in Gurugram and Noida Expressway typically start from ₹80 lakh–₹1.5 Cr. Commercial investment typically starts from ₹50 lakh for retail shop units in NCR." },
  { q:"Does Vedhara offer tax planning advice for real estate investments?", a:"Vedhara provides strategic investment advisory including general awareness of capital gains tax (LTCG/STCG), Section 54/54F exemptions, and rental income taxation. For specific tax structuring, we recommend engaging a qualified CA, and can refer trusted tax professionals from our network." },
];

export default function InvestmentAdvisoryPage() {
  return (
    <>
      <JsonLd data={{ "@context":"https://schema.org","@type":"Service",name:"Real Estate Investment Advisory Delhi NCR",provider:{"@id":"https://www.vedharagroup.com/#organization"} }} />
      <VideoHeroSection videoSrc="/videos/Real%20Estate%20Investment%20Advisory.mp4">
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Investment Advisory</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(36px,6.5vw,80px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          Real Estate as a Portfolio Decision,<br /><span style={{ color:"var(--gold-lt)" }}>Not a Single Purchase.</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(252,250,244,0.52)",maxWidth:580,margin:"0 auto" }}>
          For investors who think beyond one transaction, Vedhara provides ongoing, portfolio-level real estate strategy aligned to your broader financial goals.
        </p>
      </VideoHeroSection>

      {/* Decision Framework */}
      <section style={{ background:"var(--cream)",padding:"96px 32px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ marginBottom:52 }}>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>The Vedhara Decision Framework</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:14,lineHeight:1.1 }}>Six Checks Applied to Every Investment Recommendation</h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:560 }}>
                Buying a property as an investment and buying a property to live in are fundamentally different decisions. Investment properties need to be evaluated on yield, liquidity, locality growth trajectory, and capital appreciation potential, not just brochure appeal.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ borderLeft:"2px solid rgba(184,146,42,0.2)",paddingLeft:32 }}>
            {steps.map((s,i)=>(
              <ScrollReveal key={s.n} delay={i*80}>
                <div style={{ display:"flex",gap:24,paddingBottom:28,marginBottom:28,borderBottom:i<steps.length-1?"1px solid rgba(42,45,53,0.06)":"none",position:"relative" }}>
                  <div style={{ position:"absolute",left:-41,top:0,width:18,height:18,borderRadius:"50%",background:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <span style={{ width:6,height:6,borderRadius:"50%",background:"white" }} />
                  </div>
                  <div style={{ width:36,flexShrink:0 }}>
                    <span className="eyebrow" style={{ color:"var(--gold)" }}>{s.n}</span>
                  </div>
                  <div>
                    <h3 className="heading-md" style={{ color:"var(--navy)",marginBottom:6 }}>{s.title}</h3>
                    <p className="body-md" style={{ color:"var(--slate)",margin:0 }}>{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Corridors */}
      <section style={{ background:"var(--cream)",padding:"96px 32px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ marginBottom:48 }}>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>Current High-Potential Investment Corridors in Delhi NCR</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>Where We Are Recommending Investment Today</h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-2">
            {corridors.map((c,i)=>(
              <ScrollReveal key={c.area} delay={i*80}>
                <div className="hover-lift" style={{ background:"var(--cream)",padding:"32px 28px" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,gap:16 }}>
                    <h3 className="heading-md" style={{ color:"var(--navy)",lineHeight:1.3,fontSize:15 }}>{c.area}</h3>
                    <span className="heading-md" style={{ color:"var(--gold)",flexShrink:0 }}>{c.yield}</span>
                  </div>
                  <p className="body-sm" style={{ color:"var(--slate)",margin:0 }}>{c.driver}</p>
                  <p className="caption" style={{ color:"rgba(184,146,42,0.55)",marginTop:10,marginBottom:0 }}>Gross Yield Estimate</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="body-sm" style={{ color:"var(--slate)",marginTop:16 }}>Yield estimates are indicative based on current market conditions. Actual returns depend on specific property, unit type, occupancy, and market timing. Use our free ROI Calculator for personalised projections.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"var(--navy)",padding:"72px 32px",textAlign:"center" }}>
        <div style={{ maxWidth:560,margin:"0 auto" }}>
          <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:14,lineHeight:1.1 }}>Run Your Investment Numbers First</h2>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",marginBottom:28 }}>Before any conversation, use our free ROI & Rental Yield Calculator, no sign-up required.</p>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/calculators" className="btn btn-primary">Try the ROI Calculator →</Link>
            <Link href="/contact" className="btn btn-outline">Book a Consultation</Link>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Investment Advisory FAQ" />
    </>
  );
}
