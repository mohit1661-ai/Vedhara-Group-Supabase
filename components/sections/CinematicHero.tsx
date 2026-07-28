"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── Gold Particles Canvas ── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.08,
      size: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.35 + 0.05,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,201,112,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232,201,112,${0.05 * (1 - d / 120)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}

export default function CinematicHero({ videoSrc = "/videos/hero-bg.mp4" }:{ videoSrc?:string }) {
  const [loaded, setLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentOuterRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* ── Force autoplay (browsers often block <video autoplay>) ── */
  useEffect(() => {
    if (!videoLoaded || !videoRef.current) return;
    videoRef.current.play().catch(() => {
      /* Autoplay still blocked - user interaction will resume */
    });
  }, [videoLoaded]);

  /* ── Multi-layer parallax ── */
  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    const outer = contentOuterRef.current;
    if (!hero || !bg || !outer) return;
    const onScroll = () => {
      const scrollY = window.scrollY;
      bg.style.transform = `translateY(${scrollY * 0.05}px)`;
      outer.style.transform = `translateY(${scrollY * 0.025}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── 3D mouse-tilt on hero content ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const inner = hero.querySelector<HTMLElement>(".hero-inner");
    if (!inner) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      inner.style.transform = `rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateZ(30px)`;
    };
    const onMouseLeave = () => {
      inner.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
    };
    hero.addEventListener("mousemove", onMouseMove, { passive: true });
    hero.addEventListener("mouseleave", onMouseLeave, { passive: true });
    return () => {
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="video-hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "var(--nav-h)",
        perspective: "1200px",
      }}
    >
      {/* ── Video BG (parallax layer) ── */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "105%",
          top: "-2.5%",
          zIndex: 0,
          willChange: "transform",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="video-bg"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 1.8s ease",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          poster="/hero-poster.jpg"
        >
          <source
            src={videoSrc}
            type="video/mp4"
          />
        </video>
      </div>

      {/* ── Gradient overlay (balanced for text readability) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(9,15,29,0.5) 0%, rgba(15,30,56,0.3) 40%, rgba(9,15,29,0.45) 100%)",
        }}
      />

      {/* ── Radial vignette ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse 70% 70% at 30% 50%, rgba(15,30,56,0.15) 0%, transparent 70%)",
        }}
      />

      {/* ── Cinematic grid lines ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(212,168,67,0.015) 60px, rgba(212,168,67,0.015) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(212,168,67,0.015) 60px, rgba(212,168,67,0.015) 61px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Scan-line overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 3px)",
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />

      {/* ── Particles ── */}
      <Particles />

      {/* ── Floating orbs ── */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "10%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,168,67,0.10) 0%, transparent 70%)",
          zIndex: 2,
          pointerEvents: "none",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "8%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)",
          zIndex: 2,
          pointerEvents: "none",
          animation: "float 10s ease-in-out infinite 2s",
        }}
      />

      <div className="hero-content" style={{ position:"relative",zIndex:3,maxWidth:1320,margin:"0 auto",padding:"80px 32px 60px",width:"100%" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 380px",gap:80,alignItems:"center" }} className="hero-inner">
          {/* LEFT */}
          <div>
            <div style={{ display:"inline-flex",alignItems:"center",gap:12,marginBottom:32,padding:"8px 18px",background:"rgba(212,168,67,0.1)",border:"1px solid rgba(212,168,67,0.3)",backdropFilter:"blur(12px)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.7s ease 0.15s" }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--gold-lt)",animation:"pulseRing 2.5s infinite",display:"block" }} />
              <span style={{ fontFamily:"var(--t-head)",fontSize:10,fontWeight:600,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--gold-lt)" }}>Independent Advisory · Verified Listings · Delhi NCR</span>
            </div>

            <h1 style={{ fontFamily:"var(--t-display)",fontWeight:300,fontSize:"clamp(40px,5.5vw,72px)",lineHeight:1.02,letterSpacing:"-0.025em",color:"var(--light)",marginBottom:28,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(36px)",transition:"all 0.8s ease 0.3s" }}>
              Property Decisions<br />in Delhi NCR,<br /><em className="gold-shimmer" style={{ fontSize:"inherit",fontStyle:"italic" }}>Backed by Verification.</em>
            </h1>

            {/* Exact sub-headline from Word doc */}
            <p style={{ fontFamily:"var(--t-body)",fontSize:16,fontWeight:300,color:"rgba(255,255,255,0.85)",lineHeight:1.85,maxWidth:580,marginBottom:40,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(24px)",transition:"all 0.8s ease 0.45s" }}>
              Vedhara Group is an independent real estate advisory firm serving buyers, sellers, investors, NRIs, and first-time homebuyers across Delhi, Gurugram, Noida, Faridabad, Ghaziabad, and Greater Noida. Every property we recommend has passed our five-point Verification Framework, and we publish exactly what we found on the listing itself.
            </p>

            <div style={{ display:"flex",gap:14,flexWrap:"wrap",marginBottom:52,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.8s ease 0.6s" }}>
              <Link href="/contact" className="btn btn-primary">Book a Free Consultation</Link>
              <Link href="/buy" className="btn btn-outline">Explore Verified Listings →</Link>
            </div>

            {/* Trust strip from Word doc */}
            <div style={{ display:"flex",gap:20,flexWrap:"wrap",opacity:loaded?1:0,transition:"opacity 0.8s ease 0.75s" }}>
              {["RERA Compliant","Transparent Fees","Verified Developer Partners","4 Free Property Tools","NRI Desk Available"].map(t=>(
                <div key={t} style={{ display:"flex",alignItems:"center",gap:7 }}>
                  <span style={{ width:4,height:4,borderRadius:"50%",background:"var(--gold-lt)",display:"block" }} />
                  <span style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:500,color:"rgba(255,255,255,0.75)",letterSpacing:"0.05em" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: glass stat cards */}
          <div style={{ opacity:loaded?1:0,transform:loaded?"translateX(0)":"translateX(48px)",transition:"all 0.9s ease 0.55s" }} className="hero-right">
            <div className="glass" style={{ padding:"24px",marginBottom:10,animation:"float 5s ease-in-out infinite" }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(212,168,67,0.08)" }}>
                {[{num:"500+",sub:"Families Guided"},{num:"₹200Cr+",sub:"Transactions"},{num:"5-Check",sub:"Verification"},{num:"6+",sub:"Countries"}].map(s=>(
                  <div key={s.sub} style={{ padding:"18px 16px",textAlign:"center",background:"rgba(9,15,29,0.4)" }}>
                    <span style={{ display:"block",fontFamily:"var(--t-head)",fontSize:22,fontWeight:700,color:"var(--gold-lt)",lineHeight:1,marginBottom:6 }}>{s.num}</span>
                    <span style={{ fontFamily:"var(--t-body)",fontSize:9.5,color:"rgba(255,255,255,0.75)",textTransform:"uppercase",letterSpacing:"0.1em" }}>{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-gold" style={{ padding:"18px 20px",display:"flex",alignItems:"center",gap:14,marginBottom:10,animation:"float 6s ease-in-out infinite 1s" }}>
              <div style={{ width:42,height:42,borderRadius:"50%",background:"rgba(212,168,67,0.35)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,color:"var(--gold-lt)" }}>✓</div>
              <div>
                <p style={{ fontFamily:"var(--t-head)",fontSize:12,fontWeight:600,color:"var(--gold-lt)",margin:"0 0 3px" }}>Vedhara Verification Framework</p>
                <p style={{ fontFamily:"var(--t-body)",fontSize:11,color:"rgba(255,255,255,0.7)",margin:0 }}>5 checks published on every listing before you see it</p>
              </div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(212,168,67,0.06)" }}>
              {[{i:"📊",t:"ROI Calculator",h:"/calculators"},{i:"🌐",t:"NRI Services",h:"/nri-services"},{i:"🔍",t:"Verify Property",h:"/verification-center"},{i:"📈",t:"Invest in NCR",h:"/investment-advisory"}].map(item=>(
                <Link key={item.t} href={item.h} className="hero-quick-link"><span className="hero-quick-icon">{item.i}</span>{item.t}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute",bottom:-20,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,opacity:loaded?0.45:0,transition:"opacity 1s ease 1s" }}>
          <span style={{ fontFamily:"var(--t-head)",fontSize:8,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)" }}>Scroll</span>
          <div style={{ width:28,height:46,border:"1.5px solid rgba(255,255,255,0.18)",borderRadius:14,display:"flex",justifyContent:"center",paddingTop:6 }}>
            <div style={{ width:3,height:8,borderRadius:2,background:"var(--gold-lt)",animation:"float 2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:960px){.hero-inner{grid-template-columns:1fr!important;}.hero-right{display:none!important;}}
                .hero-quick-link{display:block;padding:13px 16px;font-family:var(--t-head);font-size:10.5px;font-weight:500;color:#ffffff;text-decoration:none;background:rgba(9,15,29,0.5);backdrop-filter:blur(8px);transition:background 0.25s,color 0.25s;letter-spacing:0.02em;}
        .hero-quick-link:hover{background:rgba(212,168,67,0.1);color:var(--gold-lt);}
        .hero-quick-icon{margin-right:6px;color:var(--gold-lt);transition:color 0.25s;}
        .hero-quick-link:hover .hero-quick-icon{color:var(--gold);}
      `}</style>
    </section>
  );
}
