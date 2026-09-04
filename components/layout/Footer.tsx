import Link from "next/link";
import Image from "next/image";
import EmailText from "@/components/ui/EmailText";
import TrustBadges from "@/components/ui/TrustBadges";
const cols = [
  { title:"Services", links:[{l:"Buy Property",h:"/buy"},{l:"Sell Property",h:"/sell"},{l:"Rent Property",h:"/rent"},{l:"Commercial RE",h:"/commercial"},{l:"Luxury Properties",h:"/luxury"},{l:"New Launches",h:"/new-launches"},{l:"Chandigarh Tricity",h:"/tricity"}] },
  { title:"Advisory",  links:[{l:"Investment Advisory",h:"/investment-advisory"},{l:"NRI Services",h:"/nri-services"},{l:"Property Management",h:"/property-management"},{l:"Free Property Valuation",h:"/sell/valuation"},{l:"How We Charge",h:"/how-we-charge"},{l:"Verification Center",h:"/verification-center"},{l:"Free Calculators",h:"/calculators"}] },
  { title:"Company",   links:[{l:"About Us",h:"/about"},{l:"Our Team",h:"/team"},{l:"All Services",h:"/services"},{l:"Market Insights",h:"/market-insights"},{l:"Success Stories",h:"/success-stories"},{l:"Careers",h:"/careers"},{l:"Contact",h:"/contact#enquiry-form"}] },
  { title:"Support",   links:[{l:"FAQ Hub",h:"/faq"},{l:"Blog",h:"/blog"},{l:"Case Studies",h:"/case-studies"},{l:"Watch Our Videos",h:"/videos"},{l:"Privacy Policy",h:"/privacy"},{l:"Terms & Conditions",h:"/terms"}] },
];
export default function Footer() {
  return (
    <footer style={{ background:"var(--navy)",color:"rgba(255,255,255,0.75)" }}>
      {/* Gold differentiator, luxury hairline separating page content from the footer */}
      <div style={{ width:"100%",height:2,background:"linear-gradient(90deg,transparent,var(--gold) 20%,var(--gold-lt) 50%,var(--gold) 80%,transparent)",opacity:0.55 }} />
      {/* Main */}
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"56px 32px 32px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1.6fr 1fr 1fr 1fr 1fr",gap:40,paddingBottom:48,borderBottom:"1px solid rgba(255,255,255,0.06)" }} className="footer-grid">
          <div className="footer-brand">
            <div style={{ marginBottom:16 }}>
              <Image
                src="/vedhara-logo-white.png"
                alt="Vedhara Group"
                width={71}
                height={56}
                sizes="71px"
                style={{ height: 56, width: "auto" }}
              />
            </div>
            <p style={{ fontFamily:"var(--t-head)",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:14 }}>Wisdom Rooted. Futures Built.</p>
            <p style={{ fontFamily:"var(--t-body)",fontSize:12.5,color:"rgba(255,255,255,0.6)",lineHeight:1.75,marginBottom:18,maxWidth:240 }}>Delhi NCR&apos;s independent real estate advisory firm. Verified listings, transparent fees, dedicated advisors.</p>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              <a href="tel:+919810647063" className="footer-link-item" style={{ display:"flex",alignItems:"center",gap:10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +91 98106 47063
              </a>
              <a href="mailto:contact@vedharagroup.com" className="footer-link-item" style={{ display:"flex",alignItems:"center",gap:10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <EmailText />
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Sushant+Lok+Phase+3+Near+DLF+City+Phase+2+Gurugram+122011" target="_blank" rel="noopener noreferrer" className="footer-link-item" style={{ display:"flex",alignItems:"center",gap:10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Sushant Lok Phase 3, Near DLF City Phase 2, Gurugram, Haryana 122011
              </a>
              <a href="https://wa.me/919810647063" target="_blank" rel="noopener noreferrer" className="footer-link-item" style={{ display:"flex",alignItems:"center",gap:10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                WhatsApp Us
              </a>
            </div>
            <TrustBadges position="footer" style={{ marginTop: 18 }} />
            <div style={{ display:"flex",gap:10,marginTop:18 }}>
              <a href="https://www.linkedin.com/company/vedharagroup/" target="_blank" rel="noopener noreferrer" aria-label="Vedhara Group on LinkedIn" style={{ width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(212,168,67,0.25)",borderRadius:"50%",color:"var(--gold-lt)",transition:"all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </a>
              <a href="https://www.instagram.com/vedharagroup" target="_blank" rel="noopener noreferrer" aria-label="Vedhara Group on Instagram" style={{ width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(212,168,67,0.25)",borderRadius:"50%",color:"var(--gold-lt)",transition:"all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/vedharagroup" target="_blank" rel="noopener noreferrer" aria-label="Vedhara Group on Facebook" style={{ width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(212,168,67,0.25)",borderRadius:"50%",color:"var(--gold-lt)",transition:"all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.youtube.com/@VedharaGroup" target="_blank" rel="noopener noreferrer" aria-label="Vedhara Group on YouTube" style={{ width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(212,168,67,0.25)",borderRadius:"50%",color:"var(--gold-lt)",transition:"all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>          </div>
          {cols.map(col=>(
            <div key={col.title}>
              <h2 style={{ fontFamily:"var(--t-head)",fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:18 }}>{col.title}</h2>
              {col.links.map(link=>(<Link key={link.h} href={link.h} className="footer-nav-link">{link.l}</Link>))}
            </div>
          ))}
        </div>
        <div style={{ padding:"18px 0 16px",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:8 }}>Cities We Serve</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
            {[{ c:"Delhi", h:"/south-delhi" },{ c:"Gurugram", h:"/gurugram" },{ c:"Noida", h:"/noida" },{ c:"Greater Noida", h:"/greater-noida" },{ c:"Faridabad", h:"/faridabad" },{ c:"Ghaziabad", h:"/ghaziabad" },{ c:"Chandigarh", h:"/chandigarh" },{ c:"Mohali", h:"/mohali" },{ c:"Panchkula", h:"/panchkula" },{ c:"Zirakpur", h:"/tricity" },{ c:"Mathura & Vrindavan", h:"/mathura-vrindavan" }].map(city=>(
              <Link key={city.c} href={city.h} style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"rgba(255,255,255,0.72)",textDecoration:"none",transition:"color 0.2s" }} className="footer-city-link">{city.c} ·</Link>
            ))}
          </div>
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,paddingTop:18 }}>
          <p style={{ fontFamily:"var(--t-body)",fontSize:11,color:"rgba(255,255,255,0.65)",margin:0 }}>© {new Date().getFullYear()} Vedhara Group Pvt. Ltd. All Rights Reserved.</p>
          <p style={{ fontFamily:"var(--t-head)",fontSize:9.5,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(232,201,112,0.9)",margin:0 }}>vedharagroup.com</p>
        </div>
      </div>
      <style>{`
        .footer-link-item{font-family:var(--t-body);font-size:12.5px;color:rgba(255,255,255,0.7);text-decoration:none;transition:color 0.2s;}
        .footer-link-item:hover{color:var(--gold-lt);}
        .footer-city-link:hover{color:var(--gold-lt);}
        /* Desktop: 5-column brand + 4 link columns. Tablet/mobile: brand full-width on top, links in a balanced 2x2 */
        @media(max-width:1100px){
          .footer-grid{grid-template-columns:1fr 1fr!important;column-gap:32px;}
          .footer-brand{grid-column:1 / -1!important;}
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr 1fr!important;column-gap:24px;}
          .footer-brand{grid-column:1 / -1!important;}
        }
        @media(max-width:360px){
          .footer-grid{grid-template-columns:1fr!important;}
        }
      `}</style>
    </footer>
  );
}
