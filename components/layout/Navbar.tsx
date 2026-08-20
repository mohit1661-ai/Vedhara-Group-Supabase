"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const ConsultationModal = dynamic(() => import("@/components/ui/ConsultationModal"), { ssr: false });

const navLinks = [
  { label:"About",     href:"/about" },
  { label:"Buy",       href:"/buy" },
  { label:"Sell",      href:"/sell" },
  { label:"Invest",    href:"/investment-advisory" },
  { label:"Our Team",  href:"/team" },
  { label:"NRI Desk",  href:"/nri-services" },
  { label:"Verify",    href:"/verification-center" },
  { label:"Calculators",href:"/calculators" },
  { label:"Contact",   href:"/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
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
          <ul className="hidden-mobile" style={{ display:"flex",alignItems:"center",gap:28,listStyle:"none",margin:0,padding:0 }}>
            {navLinks.map(l=>(
              <li key={l.href}><Link href={l.href} className={`nav-link ${scrolled?"nav-link-dark":"nav-link-light"}`}>{l.label}</Link></li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden-mobile" style={{ display:"flex",alignItems:"center",gap:16 }}>
            <a href="tel:+919810647063" style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:600,color:scrolled?"var(--navy)":"rgba(255,255,255,0.7)",textDecoration:"none",transition:"color 0.3s" }}>+91 98106 47063</a>
            <button type="button" onClick={()=>setConsultOpen(true)} className="btn btn-primary" style={{ padding:"10px 22px",fontSize:10 }}>Free Consultation</button>
          </div>

          {/* Hamburger */}
          <button className="show-mobile" onClick={()=>setOpen(!open)} style={{ background:"none",border:"none",cursor:"pointer",padding:12,minWidth:44,minHeight:44,alignItems:"center",justifyContent:"center" }} aria-label="Menu">
            {[0,1,2].map(i=>(
              <div key={i} style={{ width:24,height:2,marginBottom:i<2?5:0,background:scrolled?"var(--navy)":"white",transition:"transform 0.3s,opacity 0.3s",transform:open?(i===0?"rotate(45deg) translateY(7px)":i===2?"rotate(-45deg) translateY(-7px)":"none"):"none",opacity:open&&i===1?0:1 }} />
            ))}
          </button>
        </nav>

        {/* Mobile menu */}
        <div style={{ background:"var(--cream)",position:"absolute",top:"var(--nav-h)",left:0,right:0,maxHeight:open?"600px":"0",overflow:"hidden",transition:"max-height 0.4s ease",boxShadow:"0 8px 32px rgba(9,15,29,0.1)",borderTop:"1px solid rgba(42,45,53,0.06)" }}>
          <div style={{ padding:"16px 24px 24px" }}>
            {navLinks.map(l=>(<Link key={l.href} href={l.href} onClick={()=>setOpen(false)} style={{ display:"block",fontFamily:"var(--t-head)",fontSize:14,fontWeight:500,color:"var(--ink)",textDecoration:"none",padding:"13px 0",borderBottom:"1px solid rgba(42,45,53,0.06)" }}>{l.label}</Link>))}
            <div style={{ display:"flex",gap:10,marginTop:16 }}>
              <button type="button" onClick={()=>{setOpen(false); setConsultOpen(true);}} className="btn btn-dark" style={{ flex:1,justifyContent:"center",padding:"14px" }}>Free Consultation</button>
              <a href="https://wa.me/919810647063" target="_blank" rel="noopener noreferrer" className="btn" style={{ flex:1,justifyContent:"center",padding:"14px",background:"var(--cream)",color:"var(--ink)",border:"1px solid rgba(42,45,53,0.12)" }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </header>
        {/* Consultation popup — opened from the Free Consultation CTA */}
        <ConsultationModal open={consultOpen} onClose={()=>setConsultOpen(false)} />
      {/* Mobile sticky CTA */}
      <div className="show-mobile" style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:999,background:"var(--navy)",borderTop:"1px solid rgba(212,168,67,0.2)",display:"none" }}>
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
      <style>{`@media(max-width:1024px){.show-mobile{display:flex!important;}}`}</style>
    </>
  );
}
