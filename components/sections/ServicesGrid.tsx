import Link from "next/link";
const services = [
  { icon:"B", title:"Buy Property",          desc:"Navigate Delhi NCR's crowded market with an advisor working for you, not a developer's sales team. From shortlisting to registration.", href:"/buy", gradient:"linear-gradient(135deg,#0F1E38,#1a3a5c)" },
  { icon:"S", title:"Sell Property",          desc:"Price your property at what the market will actually pay. Qualified buyer access. Negotiation support. No underpricing, no false hope.", href:"/sell", gradient:"linear-gradient(135deg,#0F1E38,#2a4a6a)" },
  { icon:"R", title:"Rent Property",          desc:"Verified residential and commercial rentals across NCR. Transparent lease terms for tenants; screened tenants for landlords.", href:"/rent", gradient:"linear-gradient(135deg,#0F1E38,#3a6a8f)" },
  { icon:"C", title:"Commercial Real Estate", desc:"Retail, office, and mixed-use advisory for site selection, lease negotiation, and commercial property acquisition across Delhi NCR.", href:"/commercial", gradient:"linear-gradient(135deg,#1a1a2e,#B8922A)" },
  { icon:"L", title:"Luxury Properties",      desc:"Curated premium residences across South Delhi, Gurugram, Noida, and NCR's most sought-after micro-markets. Discreet, dedicated advisory.", href:"/luxury", gradient:"linear-gradient(135deg,#0F1E38,#B8922A)" },
  { icon:"I", title:"Investment Advisory",    desc:"Build a real estate portfolio that compounds. Yield analysis, locality selection, and acquisition strategy for long-term investors.", href:"/investment-advisory", gradient:"linear-gradient(135deg,#0F1E38,#2a3f6f)" },
  { icon:"N", title:"NRI Services",           desc:"Buy, sell, or manage Indian property from abroad. Weekend IST video consultations. On-demand walkthroughs. E-signature documentation.", href:"/nri-services", gradient:"linear-gradient(135deg,#0F1E38,#4a7a9f)" },
  { icon:"P", title:"Property Management",   desc:"Rent collection, maintenance coordination, and tenant management for property owners who don't want to handle day-to-day operations.", href:"/property-management", gradient:"linear-gradient(135deg,#0F1E38,#5a6070)" },
];
export default function ServicesGrid() {
  return (
    <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-4">
      {services.map(svc=>(
        <Link key={svc.href} href={svc.href} className="svc-card" style={{ background:"var(--cream)",borderRadius:0 }}>
          <div className="prop-icon" style={{background:svc.gradient}}>{svc.icon}</div>
          <h3 className="svc-card-title">{svc.title}</h3>
          <p className="svc-card-desc">{svc.desc}</p>
          <span className="svc-card-arrow">Learn More →</span>
        </Link>
      ))}
    </div>
  );
}
