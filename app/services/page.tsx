import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";
export const metadata: Metadata = { title:"Real Estate Advisory Services in Delhi NCR | Vedhara Group", description:"Explore Vedhara Group's full range of property advisory services, buying, selling, renting, commercial, investment, luxury, and NRI services across Delhi NCR.", alternates:{ canonical:"https://www.vedharagroup.com/services" } };
const services = [
  { icon:"B",title:"Buy Property",href:"/buy",desc:"Independent guidance through verified listings from shortlist to registration.",gradient:"linear-gradient(135deg,#0F1E38,#1a3a5c)" },
  { icon:"S",title:"Sell Property",href:"/sell",desc:"Strategic pricing and qualified buyer access for fair-value sales.",gradient:"linear-gradient(135deg,#0F1E38,#2a4a6a)" },
  { icon:"R",title:"Rent Property",href:"/rent",desc:"Verified rentals with transparent lease terms for tenants and landlords.",gradient:"linear-gradient(135deg,#0F1E38,#3a6a8f)" },
  { icon:"C",title:"Commercial Real Estate",href:"/commercial",desc:"Site selection and lease advisory for retail, office, and industrial spaces.",gradient:"linear-gradient(135deg,#1a1a2e,#D4A843)" },
  { icon:"L",title:"Luxury Properties",href:"/luxury",desc:"Curated premium residences with white-glove advisory service.",gradient:"linear-gradient(135deg,#0F1E38,#D4A843)" },
  { icon:"N",title:"New Launches",href:"/new-launches",desc:"Verified upcoming developer projects across Delhi NCR.",gradient:"linear-gradient(135deg,#0F1E38,#2a3f6f)" },
  { icon:"I",title:"Investment Advisory",href:"/investment-advisory",desc:"Portfolio-level real estate strategy for long-term investors.",gradient:"linear-gradient(135deg,#0F1E38,#4a7a9f)" },
  { icon:"N",title:"NRI Services",href:"/nri-services",desc:"Remote-friendly advisory for Indian diaspora worldwide.",gradient:"linear-gradient(135deg,#0F1E38,#3a6a8f)" },
  { icon:"P",title:"Property Management",href:"/property-management",desc:"Tenant and maintenance management for property owners.",gradient:"linear-gradient(135deg,#0F1E38,#5a6070)" },
];

const servicesFaqs: FAQItem[] = [
  {
    q:"Does Vedhara charge a fee for all services?",
    a:"Vedhara's advisory model varies by service. Buy-side assistance is typically complimentary (the seller or developer pays the commission), while sell-side, property management, and dedicated advisory engagements operate on a disclosed fee basis. We always clarify the fee structure before any engagement begins.",
  },
  {
    q:"Can I use multiple Vedhara services at the same time?",
    a:"Yes. Many clients combine services — for example, selling one property through Vedhara while using our buy-side advisory to acquire another, or using property management alongside investment advisory for their portfolio.",
  },
  {
    q:"How does Vedhara verify properties across different service categories?",
    a:"All properties listed across Vedhara's services pass our five-point Verification Framework: RERA registration or application confirmation, builder track record assessment, legal title review, project progress verification (for under-construction), and pricing transparency. The same standard applies whether you are buying, renting, or investing.",
  },
  {
    q:"Is Vedhara's advisory independent, or do you push certain developers?",
    a:"Vedhara is an independent advisory firm. We do not have exclusive tie-ups with any developer or project. Our recommendations are based solely on the client's requirements and the property's merits under our Verification Framework.",
  },
  {
    q:"Can NRI clients access all Vedhara services remotely?",
    a:"Yes. Every Vedhara service — from buying and selling to property management and investment advisory — is designed to be accessible remotely. Video site visits, digital documentation, and remote coordination are standard across all services.",
  },
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
    gradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 50%,#D4A843 100%)",
  },
  {
    id:"fp-05",
    title:"One Golf Course Penthouse",
    location:"Golf Course Road, Gurugram",
    price:"₹ 12.80 Cr",
    tag:"Luxury",
    tagHref:"/luxury",
    desc:"5 BHK penthouse with panoramic views.",
    gradient:"linear-gradient(135deg,#0F1E38 0%,#D4A843 30%,#E8C970 70%,#F0DBA8 100%)",
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
          <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Independent guidance tailored to your specific goals,<br />from your first home to a multi-property portfolio.</p>
      </VideoHeroSection>

      {/* Intro block */}
      <div style={{ background:"var(--cream)",textAlign:"center",padding:"0 32px" }}>
        <div style={{ maxWidth:700,margin:"0 auto" }}>
          <ScrollReveal>
            <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:14 }}>Your Complete Property Advisory Partner</h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              From buying your first home to managing a portfolio of properties, Vedhara Group offers end-to-end advisory across every stage of your real estate journey. Each service is built on the same foundation: independent advice, verified listings, and transparent pricing. Explore what we offer below.
            </p>
          </ScrollReveal>
        </div>
      </div>
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-3 svc-card-alt">
          {services.map((svc,i)=>(
            <ScrollReveal key={svc.href} delay={i*60}>
              <Link href={svc.href} className="svc-card" style={{ borderRadius:0 }}>
                <div className="gold-accent"></div>
                <h2 className="svc-card-title">{svc.title}</h2>
                <p className="svc-card-desc">{svc.desc}</p>
                <span className="svc-card-arrow">Explore →</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Properties Showcase */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Featured Properties</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                A Selection Across<span style={{ color:"var(--gold-lt)" }}> Every Category</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Browse hand-picked properties from every Vedhara service,<br />all independently verified.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {featuredProperties.map((p,i)=>(
              <ScrollReveal key={p.id} delay={i*80} style={{ display:"flex" }}>
                <Link href={p.tagHref} className="hover-lift" style={{ display:"flex",flexDirection:"column",flex:1,background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}>
                  <div style={{ height:180,background:p.gradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0 }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:18,color:"rgba(255,255,255,0.85)",textAlign:"center",padding:"0 20px",position:"relative",zIndex:1 }}>
                      {p.title}
                    </div>
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.9)",border:"1px solid rgba(255,255,255,0.25)" }}>
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column" }}>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{p.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--ink)",marginBottom:10,lineHeight:1.4,flex:1 }}>{p.desc}</p>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12,flexShrink:0 }}>
                      <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0 }}>{p.price}</p>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",display:"inline-flex",alignItems:"center",gap:4,padding:"8px 14px",background:"var(--navy)",color:"var(--gold-lt)",borderRadius:6,whiteSpace:"nowrap" }}>
                        View {p.tag} →
                      </span>
                    </div>
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

      {/* FAQ */}
      <FAQSection faqs={servicesFaqs} title="Vedhara Services FAQ" dark={false} />
      <CTASection />
    </>
  );
}
