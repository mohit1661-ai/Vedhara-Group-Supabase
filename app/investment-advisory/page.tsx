import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title:"Real Estate Investment Advisory in Delhi NCR",
  description:"Build a high-yield real estate portfolio in Delhi NCR with rental yield analysis, locality selection and buy-to-invest strategy.",
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
      <Breadcrumbs items={[{ name:"Home", href:"/" },{ name:"Investment Advisory", href:"/investment-advisory" }]} />
      <VideoHeroSection videoSrc="/videos/Real%20Estate%20Investment%20Advisory.mp4">
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Investment Advisory</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(36px,6.5vw,80px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          Real Estate Investment Advisory,<br /><span style={{ color:"var(--gold-lt)" }}>Think Portfolio, Not a Single Buy</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>
          For investors who think beyond one transaction, Vedhara provides ongoing, portfolio-level real estate strategy aligned to your broader financial goals.
        </p>
      </VideoHeroSection>

      {/* Decision Framework - cards */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ marginBottom:52 }}>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>The Vedhara Decision Framework</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:14,lineHeight:1.1 }}>Six Checks Applied to Every Investment Recommendation</h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:720 }}>
                Buying a property as an investment and buying a property to live in are fundamentally different decisions. Investment properties need to be evaluated on yield, liquidity, locality growth trajectory, and capital appreciation potential, not just brochure appeal.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"flex",flexWrap:"wrap",gap:20 }} className="df-grid svc-card-alt">
            {steps.map((s,i)=>(
              <ScrollReveal key={s.n} delay={i*80}>
                <div className="svc-card" style={{ borderRadius:12,padding:"32px 24px",height:"100%",display:"flex",flexDirection:"column" }}>
                  <div className="gold-accent" />
                  <span className="eyebrow" style={{ marginBottom:10,display:"block" }}>{s.n}</span>
                  <h3 className="svc-card-title">{s.title}</h3>
                  <p className="svc-card-desc" style={{ flex:1 }}>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Corridors */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ marginBottom:48 }}>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>Current High-Potential Investment Corridors in Delhi NCR</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>Where We Are Recommending Investment Today</h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-2 svc-card-alt corridor-grid">
            {corridors.map((c,i)=>(
              <ScrollReveal key={c.area} delay={i*80}>
                <div className="svc-card" style={{ borderRadius:0 }}>
                  <div className="gold-accent"></div>
                  <h3 className="svc-card-title" style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    {c.area}
                    <span style={{ color:"var(--gold)",fontSize:15,flexShrink:0 }}>{c.yield}</span>
                  </h3>
                  <p className="svc-card-desc">{c.driver}</p>
                  <p className="caption" style={{ color:"rgba(212,168,67,0.55)",marginTop:10,marginBottom:0 }}>Gross Yield Estimate</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div style={{ display:"flex",alignItems:"flex-start",gap:16,marginTop:28,padding:"22px 26px",background:"var(--navy)",border:"1px solid rgba(212,168,67,0.25)",borderRadius:12 }}>
            <span style={{ fontFamily:"var(--t-head)",fontSize:18,flexShrink:0,color:"var(--gold-lt)",lineHeight:1.4,fontWeight:600 }}>ⓘ</span>
            <p className="body-sm" style={{ color:"rgba(252,250,244,0.65)",margin:0,lineHeight:1.7 }}>
              <strong style={{ color:"var(--gold-lt)" }}>Yield estimates are indicative</strong> based on current market conditions. Actual returns depend on specific property, unit type, occupancy, and market timing. Use our <Link href="/calculators" style={{ color:"var(--gold)",fontWeight:700,textDecoration:"underline",textUnderlineOffset:2 }}>free ROI Calculator</Link> for personalised projections.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"var(--navy)",padding:"60px 32px 50px",textAlign:"center" }}>
        <div style={{ maxWidth:600,margin:"0 auto" }}>
          <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:12,lineHeight:1.15 }}>
            Run Your Investment<br /><span style={{ color:"var(--gold-lt)" }}>Numbers First</span>
          </h2>
          <p className="body-lg cta-sub-text" style={{ color:"rgba(252,250,244,0.5)",marginBottom:28 }}>
            Before any conversation, use our free ROI &amp; Rental Yield Calculator, no sign-up required.
          </p>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/calculators" className="btn btn-primary">Try the ROI Calculator →</Link>
            <Link href="/contact" className="btn btn-outline">Book a Consultation</Link>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      <FAQSection faqs={faqs} title="Investment Advisory FAQ" />
      <CTASection />
    </>
  );
}
