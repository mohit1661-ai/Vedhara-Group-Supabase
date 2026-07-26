import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
export const metadata: Metadata = { title:"Real Estate Advisory Services in Delhi NCR | Vedhara Group", description:"Explore Vedhara Group's full range of property advisory services, buying, selling, renting, commercial, investment, luxury, and NRI services across Delhi NCR.", alternates:{ canonical:"https://www.vedharagroup.com/services" } };
const services = [
  { icon:"🏠",title:"Buy Property",href:"/buy",desc:"Independent guidance through verified listings from shortlist to registration." },
  { icon:"💰",title:"Sell Property",href:"/sell",desc:"Strategic pricing and qualified buyer access for fair-value sales." },
  { icon:"🔑",title:"Rent Property",href:"/rent",desc:"Verified rentals with transparent lease terms for tenants and landlords." },
  { icon:"🏢",title:"Commercial Real Estate",href:"/commercial",desc:"Site selection and lease advisory for retail, office, and industrial spaces." },
  { icon:"💎",title:"Luxury Properties",href:"/luxury",desc:"Curated premium residences with white-glove advisory service." },
  { icon:"🚀",title:"New Launches",href:"/new-launches",desc:"Verified upcoming developer projects across Delhi NCR." },
  { icon:"📈",title:"Investment Advisory",href:"/investment-advisory",desc:"Portfolio-level real estate strategy for long-term investors." },
  { icon:"🌐",title:"NRI Services",href:"/nri-services",desc:"Remote-friendly advisory for Indian diaspora worldwide." },
  { icon:"🔧",title:"Property Management",href:"/property-management",desc:"Tenant and maintenance management for property owners." },
];

const featuredProperties = [
  {
    id:"fp-01",
    title:"The Cullinan Heights",
    location:"Sector 150, Noida",
    price:"₹ 4.85 Cr",
    tag:"Buy",
    tagHref:"/buy",
    desc:"4 BHK verified residence ready to move.",
    gradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#2a5f8f 100%)",
  },
  {
    id:"fp-02",
    title:"The Aspen Residency",
    location:"Sector 57, Gurugram",
    price:"₹ 58,000/mo",
    tag:"Rent",
    tagHref:"/rent",
    desc:"Fully furnished 3 BHK in prime Gurugram.",
    gradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#6a8aaa 100%)",
  },
  {
    id:"fp-03",
    title:"Sunset Villa",
    location:"Sector 23, Dwarka, Delhi",
    price:"₹ 3.95 Cr",
    tag:"Sell",
    tagHref:"/sell",
    desc:"4 BHK independent floor for sale.",
    gradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#6a4a2a 100%)",
  },
  {
    id:"fp-04",
    title:"One Horizon Center",
    location:"Sector 43, Gurugram",
    price:"₹ 12.50 Cr",
    tag:"Commercial",
    tagHref:"/commercial",
    desc:"4,800 sq.ft. LEED Gold office space.",
    gradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 50%,#B8922A 100%)",
  },
  {
    id:"fp-05",
    title:"One Golf Course Penthouse",
    location:"Golf Course Road, Gurugram",
    price:"₹ 12.80 Cr",
    tag:"Luxury",
    tagHref:"/luxury",
    desc:"5 BHK penthouse with panoramic views.",
    gradient:"linear-gradient(135deg,#0F1E38 0%,#B8922A 30%,#D4AA52 70%,#F0DBA8 100%)",
  },
  {
    id:"fp-06",
    title:"Aura Sky Villas",
    location:"Sector 152, Noida",
    price:"₹ 1.85 Cr",
    tag:"New Launch",
    tagHref:"/new-launches",
    desc:"Pre-launch bookings open at Prestige Group.",
    gradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 50%,#3a6a8a 100%)",
  },
];

export default function ServicesPage() {
  return (
    <>
      <VideoHeroSection>
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>All Services</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
            Advisory for Every Stage of<br /><span style={{ color:"var(--gold-lt)" }}>Your Property Journey</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.52)",maxWidth:520,margin:"0 auto" }}>Independent guidance tailored to your specific goals, from your first home to a multi-property portfolio.</p>
      </VideoHeroSection>
      <section style={{ background:"var(--cream)",padding:"96px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-3">
          {services.map((svc,i)=>(
            <ScrollReveal key={svc.href} delay={i*60}>
              <Link href={svc.href} className="svc-card" style={{ background:"var(--cream)",borderRadius:0 }}>
                <div className="svc-card-icon">{svc.icon}</div>
                <h2 className="svc-card-title">{svc.title}</h2>
                <p className="svc-card-desc">{svc.desc}</p>
                <span className="svc-card-arrow">Explore →</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Properties Showcase */}
      <section style={{ background:"var(--navy)",padding:"104px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Featured Properties</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                A Selection Across<span style={{ color:"var(--gold-lt)" }}> Every Category</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:540,margin:"0 auto" }}>
                Browse hand-picked properties from every Vedhara service, all independently verified.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {featuredProperties.map((p,i)=>(
              <ScrollReveal key={p.id} delay={i*80}>
                <Link href={p.tagHref} className="hover-lift" style={{ display:"block",background:"rgba(184,146,42,0.06)",border:"1px solid rgba(184,146,42,0.12)",borderRadius:16,overflow:"hidden",backdropFilter:"blur(12px)",textDecoration:"none" }}
                  <div style={{ height:180,background:p.gradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:18,color:"rgba(252,250,244,0.7)",textAlign:"center",padding:"0 20px",position:"relative",zIndex:1 }}>
                      {p.title}
                    </div>
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(184,146,42,0.15)",color:"var(--gold-lt)",border:"1px solid rgba(184,146,42,0.3)" }}>
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding:20 }}>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"rgba(252,250,244,0.35)",marginBottom:4 }}>{p.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"rgba(252,250,244,0.6)",marginBottom:10,lineHeight:1.4 }}>{p.desc}</p>
                    <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--gold-lt)" }}>{p.price}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:52 }}>
              <p className="body-md" style={{ color:"rgba(252,250,244,0.35)",marginBottom:20 }}>
                Explore the full range of Vedhara&apos;s advisory services and verified listings.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Book a Free Consultation →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
