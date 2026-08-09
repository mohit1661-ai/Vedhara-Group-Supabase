import Link from "next/link";
const services = [
  { title:"Buy Property",          desc:"Navigate Delhi NCR's crowded market with an advisor working for you, not a developer's sales team. From shortlisting to registration.", href:"/buy" },
  { title:"Sell Property",          desc:"Price your property at what the market will actually pay. Qualified buyer access. Negotiation support. No underpricing, no false hope.", href:"/sell" },
  { title:"Rent Property",          desc:"Verified residential and commercial rentals across NCR. Transparent lease terms for tenants; screened tenants for landlords.", href:"/rent" },
  { title:"Commercial Real Estate", desc:"Retail, office, and mixed-use advisory for site selection, lease negotiation, and commercial property acquisition across Delhi NCR.", href:"/commercial" },
  { title:"Luxury Properties",      desc:"Curated premium residences across South Delhi, Gurugram, Noida, and NCR's most sought-after micro-markets. Discreet, dedicated advisory.", href:"/luxury" },
  { title:"Investment Advisory",    desc:"Build a real estate portfolio that compounds. Yield analysis, locality selection, and acquisition strategy for long-term investors.", href:"/investment-advisory" },
  { title:"NRI Services",           desc:"Buy, sell, or manage Indian property from abroad. Weekend IST video consultations. On-demand walkthroughs. E-signature documentation.", href:"/nri-services" },
  { title:"Property Management",   desc:"Rent collection, maintenance coordination, and tenant management for property owners who don't want to handle day-to-day operations.", href:"/property-management" },
];
export default function ServicesGrid() {
  return (
    <>
      <div className="svc-new-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4, minmax(0,1fr))", gap:16 }}>
        {services.map((svc,i)=>(
          <Link key={svc.href} href={svc.href} className="svc-new-card">
            <span className="svc-new-index" aria-hidden="true">{String(i+1).padStart(2,"0")}</span>
            <h3 className="svc-new-title">{svc.title}</h3>
            <p className="svc-new-desc">{svc.desc}</p>
            <span className="svc-new-arrow">Learn More →</span>
          </Link>
        ))}
      </div>
      <style>{`
        .svc-new-card {
          position: relative; display: flex; flex-direction: column;
          background: linear-gradient(165deg, #FDFBF4 0%, #F7EEDC 100%);
          border: 1px solid rgba(212,168,67,0.4);
          border-radius: 16px; padding: 26px 24px 22px; text-decoration: none;
          box-shadow: 0 18px 40px -24px rgba(9,15,29,0.55);
          overflow: hidden;
          transition: transform 0.35s var(--ease-spring), box-shadow 0.35s ease, border-color 0.3s ease;
        }
        .svc-new-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-lt));
        }
        .svc-new-card:hover { transform: translateY(-6px); box-shadow: 0 30px 54px -24px rgba(9,15,29,0.65); border-color: var(--gold); }
        .svc-new-index { font-family: var(--t-display); font-style: italic; font-weight: 300; font-size: 42px; line-height: 1; color: rgba(184,146,42,0.3); margin-bottom: 14px; display: block; }
        .svc-new-title { font-family: var(--t-head); font-size: 15.5px; font-weight: 700; color: var(--navy); margin: 0 0 10px; line-height: 1.25; }
        .svc-new-desc { font-family: var(--t-body); font-size: 12.5px; color: var(--slate); line-height: 1.6; margin: 0 0 18px; flex: 1; }
        .svc-new-arrow { font-family: var(--t-head); font-size: 9.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold-ink); display: inline-flex; align-items: center; gap: 6px; transition: gap 0.3s ease; }
        .svc-new-card:hover .svc-new-arrow { gap: 10px; }
        @media (max-width: 1024px) { .svc-new-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; } }
        @media (max-width: 640px) { .svc-new-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
