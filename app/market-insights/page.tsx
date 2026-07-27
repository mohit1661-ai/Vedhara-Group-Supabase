import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
export const metadata: Metadata = { title:"Delhi NCR Real Estate Market Insights | Price Trends & Investment Intelligence | Vedhara Group", description:"Independent real estate market analysis for Delhi NCR, price-per-sqft trends, locality demand, investment hotspots, and the monthly Ground Report from Vedhara Group.", alternates:{ canonical:"https://www.vedharagroup.com/market-insights" } };
const themes = [
  { title:"Delhi NCR Premium Segment", body:"Post-2022 price appreciation has been significant across Gurugram and Noida Expressway premium corridors. The ₹1.5Cr–3Cr segment remains the most active nationally, driven by end-user demand from corporate employment growth." },
  { title:"Faridabad Undervaluation", body:"Faridabad's NH-19 corridor offers similar connectivity to south Gurugram at significantly lower price points, increasingly attractive to buyers priced out of premium Gurugram sectors. Entry prices 30–40% below comparable Gurugram inventory." },
  { title:"Noida Expressway Infrastructure", body:"Upcoming Jewar Airport (Noida International Airport), the Aqua Line Metro extension, and Film City development are material value drivers for Noida Expressway and Greater Noida localities. Projects in the 10–15 km radius are well-positioned." },
  { title:"Rental Market Tightening", body:"Corporate demand recovery post-2023 has tightened rental supply in Cyber City (Gurugram) and Noida's Sector 62/63 IT corridors. Rental yields in these locations have improved from 2021 lows to 3.5–4.5% gross." },
];
export default function Page() {
  return (
    <>
      <VideoHeroSection videoSrc="/videos/Property%20Investment.mp4">
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>Research &amp; Insights</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
            Delhi NCR Real Estate Intel,<br /><span style={{ color:"var(--gold-lt)" }}>Research That Informs, Not Sells</span>
          </h1>
        </VideoHeroSection>
      <section style={{ background:"var(--cream)",padding:"80px 32px" }}>
        <div style={{ maxWidth:980,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ background:"var(--cream)",border:"1px solid rgba(42,45,53,0.08)",padding:"40px 36px",marginBottom:52 }}>
              <span className="v-line" />
              <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:14 }}>Subscribe to the Ground Report</h2>
              <p className="body-md" style={{ color:"var(--slate)",marginBottom:24 }}>Monthly: price-per-sqft movement in key NCR micro-markets, locality demand signals, new infrastructure developments, rental rate trends, and investment opportunity alerts, delivered free to your inbox.</p>
              <Link href="/contact" className="btn btn-dark">Subscribe Free →</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal><div style={{ marginBottom:36 }}><span className="v-line" /><h2 className="heading-lg" style={{ color:"var(--navy)" }}>Current Market Themes</h2></div></ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-2">
            {themes.map((t,i)=>(<ScrollReveal key={t.title} delay={i*80}><div style={{ background:"var(--cream)",padding:"28px 24px" }}><h3 className="heading-md" style={{ color:"var(--navy)",marginBottom:10,fontSize:15 }}>{t.title}</h3><p className="body-sm" style={{ color:"var(--slate)",margin:0 }}>{t.body}</p></div></ScrollReveal>))}
          </div>
        </div>
      </section>
    </>
  );
}
