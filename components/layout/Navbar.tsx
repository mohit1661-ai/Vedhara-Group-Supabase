"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const ConsultationModal = dynamic(() => import("@/components/ui/ConsultationModal"), { ssr: false });

const menuGroups = [
  {
    label:"Explore",
    description:"The Vedhara Group",
    items:[
      { label:"About Us", href:"/about" },
      { label:"Our Team", href:"/team" },
      { label:"All Services", href:"/services" },
      { label:"Success Stories", href:"/success-stories" },
      { label:"Careers", href:"/careers" },
      { label:"Contact", href:"/contact#enquiry-form" },
    ],
  },
  {
    label:"Properties",
    description:"Buy, sell, rent and invest",
    items:[
      { label:"Buy Property", href:"/buy" },
      { label:"Sell Property", href:"/sell" },
      { label:"Rent Property", href:"/rent" },
      { label:"Commercial Real Estate", href:"/commercial" },
      { label:"Luxury Properties", href:"/luxury" },
      { label:"New Launches", href:"/new-launches" },
    ],
  },
  {
    label:"Advisory",
    description:"Independent advice, verified decisions",
    items:[
      { label:"Investment Advisory", href:"/investment-advisory" },
      { label:"NRI Services", href:"/nri-services" },
      { label:"Property Management", href:"/property-management" },
      { label:"Verification Center", href:"/verification-center" },
      { label:"Free Calculators", href:"/calculators" },
    ],
  },
  {
    label:"Locations",
    description:"Delhi NCR, Chandigarh and North India",
    wide:true,
    items:[
      { label:"South Delhi", href:"/south-delhi" },
      { label:"Gurugram", href:"/gurugram" },
      { label:"Noida", href:"/noida" },
      { label:"Greater Noida", href:"/greater-noida" },
      { label:"Faridabad", href:"/faridabad" },
      { label:"Ghaziabad", href:"/ghaziabad" },
      { label:"Chandigarh", href:"/chandigarh" },
      { label:"Mohali", href:"/mohali" },
      { label:"Panchkula", href:"/panchkula" },
      { label:"Mathura & Vrindavan", href:"/mathura-vrindavan" },
      { label:"Chandigarh Tricity", href:"/tricity" },
    ],
  },
  {
    label:"Insights",
    description:"Research, guides and answers",
    items:[
      { label:"Market Insights", href:"/market-insights" },
      { label:"Blog", href:"/blog" },
      { label:"FAQ Hub", href:"/faq" },
      { label:"Case Studies", href:"/case-studies" },
      { label:"Watch Our Videos", href:"/videos" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [mobileGroup, setMobileGroup] = useState<number | null>(null);
  const [consultOpen, setConsultOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>50);
    fn(); window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);
  return (
    <>
      <header style={{
        position:"fixed",top:0,left:0,right:0,height:"var(--nav-h)",zIndex:1000,
        background: scrolled?"rgba(249,246,239,0.97)":"transparent",
        backdropFilter: scrolled?"blur(20px)":"none",
        borderBottom: scrolled?"1px solid rgba(42,45,53,0.08)":"1px solid transparent",
        transition:"background 0.35s ease,border-color 0.35s ease",
      }}>
        <nav style={{ maxWidth:1320,margin:"0 auto",padding:"0 32px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          {/* Logo mark, swaps between white/gold (transparent hero) and navy/gold (scrolled) */}
          <Link href="/" style={{ textDecoration:"none",display:"flex",alignItems:"center",position:"relative",height:"var(--nav-logo-h)" }} aria-label="Vedhara Group home">
            <Image
              src="/vedhara-logo-white.png"
              alt="Vedhara Group"
              width={48}
              height={38}
              priority
              sizes="48px"
              style={{
                height: "var(--nav-logo-h)", width: "auto",
                position: scrolled ? "absolute" : "static",
                opacity: scrolled ? 0 : 1,
                transition: "opacity 0.3s ease",
                pointerEvents: scrolled ? "none" : "auto",
              }}
            />
            <Image
              src="/vedhara-logo-dark.png"
              alt="Vedhara Group"
              width={48}
              height={38}
              sizes="48px"
              style={{
                height: "var(--nav-logo-h)", width: "auto",
                position: scrolled ? "static" : "absolute",
                top: 0, left: 0,
                opacity: scrolled ? 1 : 0,
                transition: "opacity 0.3s ease",
                pointerEvents: scrolled ? "auto" : "none",
              }}
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden-mobile desktop-nav-links" style={{ display:"flex",alignItems:"center",gap:26,listStyle:"none",margin:0,padding:0 }}>
            {menuGroups.map((group,index)=>(
              <li key={group.label} style={{ position:"relative" }} onMouseEnter={()=>setActiveMenu(index)}>
                <button
                  type="button"
                  onClick={()=>setActiveMenu(activeMenu===index?null:index)}
                  aria-expanded={activeMenu===index}
                  className={`nav-link ${scrolled?"nav-link-dark":"nav-link-light"}`}
                  style={{ background:"none",border:0,cursor:"pointer",padding:0,fontFamily:"var(--t-head)",fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase" }}
                >
                  {group.label}<span className="nav-chevron" aria-hidden="true" />
                </button>
                {activeMenu===index && (
                  <div
                    className={group.wide?"nav-dropdown nav-dropdown-wide":"nav-dropdown"}
                    onMouseLeave={()=>setActiveMenu(null)}
                  >
                    <p className="nav-dropdown-kicker">{group.description}</p>
                    <div className="nav-dropdown-links">
                      {group.items.map(item=>(
                        <Link key={item.href} href={item.href} onClick={()=>setActiveMenu(null)}>{item.label}<span>→</span></Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden-mobile" style={{ display:"flex",alignItems:"center",gap:16 }}>
            <a href="tel:+919810647063" style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:600,color:scrolled?"var(--navy)":"rgba(255,255,255,0.7)",textDecoration:"none",transition:"color 0.3s" }}>+91 98106 47063</a>
            <button type="button" onClick={()=>setConsultOpen(true)} className="btn btn-primary" style={{ padding:"10px 22px",fontSize:10 }}>Free Consultation</button>
          </div>

          {/* Hamburger */}
          <button className="mobile-menu-trigger" onClick={()=>setOpen(!open)} style={{ background:"none",border:"none",cursor:"pointer",padding:10,width:48,minWidth:48,height:44,minHeight:44,flex:"0 0 48px",flexDirection:"column",alignItems:"center",justifyContent:"center" }} aria-label="Menu">
            {[0,1,2].map(i=>(
              <div key={i} style={{ width:24,height:2,marginBottom:i<2?5:0,background:scrolled?"var(--navy)":"white",transition:"transform 0.3s,opacity 0.3s",transform:open?(i===0?"rotate(45deg) translateY(7px)":i===2?"rotate(-45deg) translateY(-7px)":"none"):"none",opacity:open&&i===1?0:1 }} />
            ))}
          </button>
        </nav>

        {/* Mobile menu */}
        <div style={{ background:"var(--cream)",position:"absolute",top:"var(--nav-h)",left:0,right:0,maxHeight:open?"600px":"0",overflow:"hidden",transition:"max-height 0.4s ease",boxShadow:"0 8px 32px rgba(9,15,29,0.1)",borderTop:"1px solid rgba(42,45,53,0.06)" }}>
          <div style={{ padding:"12px 24px 24px" }}>
            {menuGroups.map((group,index)=>(
              <div key={group.label} style={{ borderBottom:"1px solid rgba(42,45,53,0.08)" }}>
                <button
                  type="button"
                  onClick={()=>setMobileGroup(mobileGroup===index?null:index)}
                  aria-expanded={mobileGroup===index}
                  style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:"none",border:0,cursor:"pointer",fontFamily:"var(--t-head)",fontSize:13,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--ink)",padding:"15px 0" }}
                >
                  {group.label}<span style={{ color:"var(--gold-ink)",fontSize:18,lineHeight:1,transform:mobileGroup===index?"rotate(45deg)":"none",transition:"transform 0.2s" }}>+</span>
                </button>
                {mobileGroup===index && (
                  <div style={{ padding:"0 0 10px" }}>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11,color:"var(--gold-ink)",margin:"0 0 4px" }}>{group.description}</p>
                    {group.items.map(item=>(
                      <Link key={item.href} href={item.href} onClick={()=>setOpen(false)} style={{ display:"flex",justifyContent:"space-between",fontFamily:"var(--t-head)",fontSize:14,fontWeight:500,color:"var(--ink)",textDecoration:"none",padding:"10px 0" }}>
                        {item.label}<span style={{ color:"var(--gold-ink)" }}>→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ display:"flex",gap:10,marginTop:16 }}>
              <button type="button" onClick={()=>{setOpen(false); setConsultOpen(true);}} className="btn btn-dark" style={{ flex:1,justifyContent:"center",padding:"14px" }}>Free Consultation</button>
              <a href="https://wa.me/919810647063" target="_blank" rel="noopener noreferrer" className="btn" style={{ flex:1,justifyContent:"center",padding:"14px",background:"var(--cream)",color:"var(--ink)",border:"1px solid rgba(42,45,53,0.12)" }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </header>
        {/* Consultation popup, opened from the Free Consultation CTA */}
        <ConsultationModal open={consultOpen} onClose={()=>setConsultOpen(false)} />
      {/* Mobile sticky CTA */}
      <div className="mobile-sticky-cta" style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:999,background:"var(--navy)",borderTop:"1px solid rgba(212,168,67,0.2)",display:"none" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr" }}>
          {[
            { label:"Call",  href:"tel:+919810647063",bg:"transparent" },
            { label:"Chat",  href:"https://wa.me/919810647063",bg:"transparent" },
            { label:"Book",  bg:"linear-gradient(135deg,var(--gold),var(--gold-lt))" },
          ].map(item=> item.href ? (
            <a key={item.label} href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"12px 8px",textDecoration:"none",background:item.bg,borderRight:"1px solid rgba(255,255,255,0.06)",minHeight:"44px" }}>
              <span style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:item.bg.includes("gold")?"var(--navy)":"rgba(255,255,255,0.6)" }}>{item.label}</span>
            </a>
          ) : (
            <button key={item.label} type="button" onClick={()=>setConsultOpen(true)} style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"12px 8px",background:item.bg,border:"none",borderRight:"1px solid rgba(255,255,255,0.06)",cursor:"pointer",minHeight:"44px" }}>
              <span style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:item.bg.includes("gold")?"var(--navy)":"rgba(255,255,255,0.6)" }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
