import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
export const metadata: Metadata = { title:"Real Estate Advisory Services in Delhi NCR | Vedhara Group", description:"Explore Vedhara Group's full range of property advisory services — buying, selling, renting, commercial, investment, luxury, and NRI services across Delhi NCR.", alternates:{ canonical:"https://www.vedharagroup.com/services" } };
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
export default function ServicesPage() {
  return (
    <>
      <section className="page-hero animated-gradient" style={{ textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ maxWidth:800,margin:"0 auto",position:"relative",zIndex:1 }}>
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>All Services</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"#FCFAF4",lineHeight:1.05,marginBottom:24 }}>
            Advisory for Every Stage of<br /><span style={{ color:"var(--gold-lt)" }}>Your Property Journey</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.52)",maxWidth:520,margin:"0 auto" }}>Independent guidance tailored to your specific goals — from your first home to a multi-property portfolio.</p>
        </div>
      </section>
      <section style={{ background:"var(--ivory)",padding:"96px 32px" }}>
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
    </>
  );
}
