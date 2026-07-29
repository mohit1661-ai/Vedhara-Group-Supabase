import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoHeroSection from "@/components/sections/VideoHeroSection";

export const metadata: Metadata = {
  title:"About Vedhara Group | Independent Real Estate Advisory Firm in Delhi NCR",
  description:"Vedhara Group is a RERA-compliant independent property advisory firm in Delhi NCR helping buyers, sellers, investors, and NRIs make verified real estate decisions across Gurugram, Noida, Faridabad, and Ghaziabad.",
  alternates:{ canonical:"https://www.vedharagroup.com/about" },
};

const values = [
  { title:"Independence", desc:"No exclusive developer tie-ups. Every shortlist built around your requirements, not around which developer pays the highest commission." },
  { title:"Transparency", desc:"We publish our verification methodology, disclose our compensation model upfront, and document every step of the advisory process." },
  { title:"Dedication", desc:"One named advisor from day one. Not a rotating team, not a CRM ticket. Your advisor knows your requirements throughout the entire journey." },
  { title:"Accountability", desc:"Every claim we make about a property is documented and verifiable. Our Verification Framework results are published on every listing page." },
];

const locations = [
  { city:"Delhi", areas:"South Delhi, Dwarka, Vasant Kunj, Rohini, Janakpuri, Saket, Punjabi Bagh, Paschim Vihar" },
  { city:"Gurugram", areas:"DLF Phases 1–5, Golf Course Road, Sohna Road, Sector 57–66, Dwarka Expressway, New Gurugram Sectors 81–115" },
  { city:"Noida", areas:"Sector 44, 62, 75, 137, 150, Expressway corridor, Greater Noida West (Noida Extension)" },
  { city:"Faridabad", areas:"NIT, Sector 21, Surajkund Road, NH-19 Growth Corridor, Neharpar area" },
  { city:"Ghaziabad", areas:"Indirapuram, Vaishali, Raj Nagar Extension, Crossings Republik, NH-58 corridor" },
  { city:"Greater Noida", areas:"Yamuna Expressway, Knowledge Park, Sports City, Sector Omega, Tech Zone" },
];

const faqs = [
  { q:"Is Vedhara Group a real estate developer?", a:"No. Vedhara Group is an independent real estate advisory and brokerage firm. We do not build, develop, or own properties. Our role is to represent and advise clients, buyers, sellers, investors, tenants, landlords, and NRIs, independently, while listing verified projects from partner developers." },
  { q:"Is Vedhara Group RERA registered?", a:"Vedhara Group operates in compliance with RERA registration requirements applicable to real estate agents in Delhi, Haryana, and Uttar Pradesh. RERA agent registration numbers are disclosed on request and on relevant transaction documents." },
  { q:"Where is Vedhara Group based?", a:"Vedhara Group is based in the Delhi NCR region and serves clients across Delhi, Gurugram, Noida, Greater Noida, Faridabad, and Ghaziabad. NRI clients are served remotely through video consultations and digital documentation." },
  { q:"How long has Vedhara Group been operating?", a:"Vedhara Group is a growing independent advisory firm in the Delhi NCR market. Our team brings professional real estate advisory experience across residential, commercial, and investment property segments." },
];

export default function AboutPage() {
  return (
    <>
      <VideoHeroSection videoSrc="/videos/Vedhara%20Group%20Gurgaon%20Real%20Estate%20About%20Page%20Video.mp4">
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Our Story</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(36px,6vw,72px)",color:"var(--light)",lineHeight:1.02,marginBottom:24 }}>
          Advisory Built on Wisdom.<br />
          <span style={{ color:"var(--gold-lt)" }}>Trusted Across Delhi NCR.</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>
          VED is wisdom. DHARA is the earth. Vedhara Group builds your real estate future on ground that is verified, transparent, and genuinely independent.
        </p>
      </VideoHeroSection>

      {/* Origin */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center" }} className="grid-2">
          <ScrollReveal>
            <div>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>Why We Exist</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:20,lineHeight:1.1 }}>
                An Honest Alternative in{" "}
                <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold)" }}>Delhi NCR&apos;s Property Market</em>
              </h2>
              <p className="body-md" style={{ color:"var(--slate)",marginBottom:16,lineHeight:1.85 }}>
                Vedhara Group was founded on a simple observation: most real estate platforms in Delhi NCR are developer-distribution channels wearing an advisory costume. Their listings are unverified, their pricing is developer-set, and their advisors are paid sales executives with a financial incentive to close, not to advise.
              </p>
              <p className="body-md" style={{ color:"var(--slate)",marginBottom:28,lineHeight:1.85 }}>
                We set out to build something genuinely different, an advisory firm that lists verified developer-partner projects, publishes exactly how we verify them, discloses how we are paid, and assigns you a named, dedicated advisor from day one.
              </p>
              <Link href="/verification-center" className="btn btn-ghost" style={{ color:"var(--gold)" }}>See Our Verification Framework →</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150} direction="right">
            <div style={{ background:"var(--navy)",padding:"44px 40px",position:"relative",boxShadow:"0 20px 48px rgba(9,15,29,0.28)" }}>
              {/* gold top bar */}
              <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt),var(--gold))" }} />
              <h3 className="heading-md" style={{ color:"var(--gold)",marginBottom:16 }}>Our Mission</h3>
              <p className="body-md" style={{ color:"rgba(252,250,244,0.8)",lineHeight:1.85,marginBottom:28 }}>
                To become the most trusted, independently-positioned real estate advisory firm in Delhi NCR, helping buyers, sellers, investors, and NRIs make property decisions backed by verified information rather than sales pressure.
              </p>
              <div style={{ borderTop:"1px solid rgba(232,201,112,0.15)",paddingTop:20 }}>
                <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>What We Stand For</p>
                {["Independent advisory, never a developer's agent","Verification published, not just promised","Fees disclosed before the conversation begins","One named advisor throughout your journey"].map((pt,i)=>(
                  <div key={pt} style={{ display:"flex",gap:12,marginBottom:12,opacity:0,animation:`fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1) ${250+i*120}ms forwards` }}>
                    <span style={{ color:"var(--gold)",flexShrink:0,marginTop:1 }}>—</span>
                    <span className="body-sm" style={{ color:"rgba(252,250,244,0.65)" }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:52 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Our Values</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>Four Principles That Guide Every Engagement</h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-4 svc-card-alt">
            {values.map((v,i)=>(
              <ScrollReveal key={v.title} delay={i*80}>
                <div className="svc-card" style={{ borderRadius:0 }}>
                  <div className="gold-accent"></div>
                  <h3 className="svc-card-title">{v.title}</h3>
                  <p className="svc-card-desc">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Where We Operate</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>
                Covering Delhi NCR,{" "}
                <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold)" }}>Every Major Market</em>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-3 svc-card-alt">
            {locations.map((loc,i)=>(
              <ScrollReveal key={loc.city} delay={i*60}>
                <div className="svc-card" style={{ borderRadius:0 }}>
                  <div className="gold-accent"></div>
                  <h3 className="svc-card-title">{loc.city}</h3>
                  <p className="svc-card-desc">{loc.areas}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",textAlign:"center" }}>
        <div style={{ maxWidth:560,margin:"0 auto" }}>
          <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:14,lineHeight:1.1 }}>Ready for an Advisor Who Works for You?</h2>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",marginBottom:28 }}>No pitch, no pressure. A 30-minute conversation about your property goals, free, no obligation.</p>
          <Link href="/contact" className="btn btn-primary">Book a Free Consultation →</Link>
        </div>
      </section>

      <FAQSection faqs={faqs} title="About Vedhara Group, FAQ" />
    </>
  );
}
