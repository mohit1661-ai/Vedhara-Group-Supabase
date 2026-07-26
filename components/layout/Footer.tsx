import Link from "next/link";
import Image from "next/image";
const cols = [
  { title:"Services", links:[{l:"Buy Property",h:"/buy"},{l:"Sell Property",h:"/sell"},{l:"Rent Property",h:"/rent"},{l:"Commercial RE",h:"/commercial"},{l:"Luxury Properties",h:"/luxury"},{l:"New Launches",h:"/new-launches"}] },
  { title:"Advisory",  links:[{l:"Investment Advisory",h:"/investment-advisory"},{l:"NRI Services",h:"/nri-services"},{l:"Property Management",h:"/property-management"},{l:"Verification Center",h:"/verification-center"},{l:"Free Calculators",h:"/calculators"}] },
  { title:"Company",   links:[{l:"About Us",h:"/about"},{l:"All Services",h:"/services"},{l:"Market Insights",h:"/market-insights"},{l:"Success Stories",h:"/success-stories"},{l:"Careers",h:"/careers"},{l:"Contact",h:"/contact"}] },
  { title:"Support",   links:[{l:"FAQ Hub",h:"/faq"},{l:"Blog",h:"/blog"},{l:"Case Studies",h:"/case-studies"},{l:"Privacy Policy",h:"/privacy"},{l:"Terms & Conditions",h:"/terms"}] },
];
export default function Footer() {
  return (
    <footer style={{ background:"var(--navy)",color:"rgba(255,255,255,0.75)" }}>
      {/* CTA bar */}
      <div style={{ background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",padding:"22px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16 }}>
          <div>
            <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:"0 0 3px" }}>Ready to make your next property move?</p>
            <p style={{ fontFamily:"var(--t-body)",fontSize:12.5,color:"rgba(9,15,29,0.65)",margin:0 }}>Independent advisory · Verified listings · Free consultation</p>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <Link href="/contact" className="btn btn-dark" style={{ padding:"12px 24px",fontSize:10 }}>Book Free Consultation</Link>
            <a href="https://wa.me/919810647063" target="_blank" rel="noopener noreferrer" className="btn" style={{ background:"#25D366",color:"white",padding:"12px 20px",fontSize:10 }}>WhatsApp</a>
          </div>
        </div>
      </div>
      {/* Main */}
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"56px 32px 32px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1.6fr 1fr 1fr 1fr 1fr",gap:40,paddingBottom:48,borderBottom:"1px solid rgba(255,255,255,0.06)" }} className="footer-grid">
          <div>
            <div style={{ marginBottom:16 }}>
              <Image
                src="/vedhara-logo-white.png"
                alt="Vedhara Group"
                width={240}
                height={60}
                style={{ height: 56, width: "auto" }}
              />
            </div>
            <p style={{ fontFamily:"var(--t-head)",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:14 }}>Wisdom Rooted. Futures Built.</p>
            <p style={{ fontFamily:"var(--t-body)",fontSize:12.5,color:"rgba(255,255,255,0.6)",lineHeight:1.75,marginBottom:18,maxWidth:240 }}>Delhi NCR&apos;s independent real estate advisory firm. Verified listings, transparent fees, dedicated advisors.</p>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              <a href="tel:+919810647063" className="footer-link-item" style={{ display:"flex",alignItems:"center",gap:10 }}>+91 98106 47063</a>
              <a href="mailto:hello@vedharagroup.com" className="footer-link-item" style={{ display:"flex",alignItems:"center",gap:10 }}>hello@vedharagroup.com</a>
              <a href="https://wa.me/919810647063" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"var(--t-body)",fontSize:12.5,color:"#25D366",textDecoration:"none",display:"flex",alignItems:"center",gap:10 }}>WhatsApp Us</a>
            </div>
            <div style={{ display:"flex",gap:8,marginTop:18,flexWrap:"wrap" }}>
              {["RERA Compliant","ISO Verified"].map(b=>(
                <span key={b} style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--gold-lt)",border:"1px solid rgba(184,146,42,0.2)",padding:"4px 8px" }}>{b}</span>
              ))}
            </div>
          </div>
          {cols.map(col=>(
            <div key={col.title}>
              <h4 style={{ fontFamily:"var(--t-head)",fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:18 }}>{col.title}</h4>
              {col.links.map(link=>(<Link key={link.h} href={link.h} className="footer-nav-link">{link.l}</Link>))}
            </div>
          ))}
        </div>
        <div style={{ padding:"18px 0 16px",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:8 }}>Cities We Serve</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
            {["Delhi","Gurugram","Noida","Greater Noida","Faridabad","Ghaziabad","Sonipat","Manesar"].map(city=>(
              <span key={city} style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"rgba(255,255,255,0.5)" }}>{city} ·</span>
            ))}
          </div>
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,paddingTop:18 }}>
          <p style={{ fontFamily:"var(--t-body)",fontSize:11,color:"rgba(255,255,255,0.4)",margin:0 }}>© {new Date().getFullYear()} Vedhara Group Pvt. Ltd. All Rights Reserved.</p>
          <p style={{ fontFamily:"var(--t-head)",fontSize:9.5,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(212,170,82,0.5)",margin:0 }}>vedharagroup.com</p>
        </div>
      </div>
      <style>{`
        .footer-link-item{font-family:var(--t-body);font-size:12.5px;color:rgba(255,255,255,0.7);text-decoration:none;transition:color 0.2s;}
        .footer-link-item:hover{color:var(--gold-lt);}
        @media(max-width:1100px){.footer-grid{grid-template-columns:1fr 1fr 1fr!important;}}
        @media(max-width:720px){.footer-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:480px){.footer-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </footer>
  );
}
