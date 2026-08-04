"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

export default function CinematicHero({ videoSrc = "/videos/Homepage%20Hero%20Video.mp4" }:{ videoSrc?:string }) {
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

  /* ── Catch video already loaded before React attached onLoadedData ── */
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 3) {
      setVideoLoaded(true);
    }
  }, []);

  /* ── Start video loading immediately for faster autoplay on all devices ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Load immediately — no deferral
    video.preload = "auto";
    video.load();
    // Pause video on unmount so it doesn't keep playing during page navigation
    return () => {
      video.pause();
    };
  }, []);

  /* ── Force autoplay (browsers often block <video autoplay>) ── */
  useEffect(() => {
    if (!videoLoaded || !videoRef.current) return;
    videoRef.current.play().catch(() => {
      /* Autoplay still blocked - user interaction will resume */
    });
  }, [videoLoaded]);

  /* ── Resume video on user interaction if autoplay was blocked ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const resumeVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
      // Remove listeners after first interaction
      document.removeEventListener("click", resumeVideo);
      document.removeEventListener("touchstart", resumeVideo);
      document.removeEventListener("keydown", resumeVideo);
    };

    document.addEventListener("click", resumeVideo, { passive: true });
    document.addEventListener("touchstart", resumeVideo, { passive: true });
    document.addEventListener("keydown", resumeVideo, { passive: true });

    return () => {
      document.removeEventListener("click", resumeVideo);
      document.removeEventListener("touchstart", resumeVideo);
      document.removeEventListener("keydown", resumeVideo);
    };
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
        minHeight: "100svh",
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
          height: "100%",
          top: 0,
          zIndex: 0,
          willChange: "transform",
          background: "#090f1d",
        }}
      >
        {/* Poster fades out when video loads */}
        <Image
          src="/hero-poster.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="video-bg"
          style={{
            opacity: videoLoaded ? 0 : 1,
            transition: "opacity 1s ease",
          }}
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className="video-bg"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 1.8s ease",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            transform: "translateZ(0)",
          }}
        >
          <source
            src={videoSrc}
            type="video/mp4"
          />
        </video>
      </div>

      {/* ── Gradient overlay (lighter to reveal more video quality) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(9,15,29,0.35) 0%, rgba(15,30,56,0.2) 40%, rgba(9,15,29,0.3) 100%)",
        }}
      />

      {/* ── Radial vignette (subtler) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse 70% 70% at 30% 50%, rgba(15,30,56,0.08) 0%, transparent 70%)",
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
            <div className="hero-tagline" style={{ display:"inline-flex",alignItems:"center",gap:12,marginBottom:32,padding:"8px 18px",background:"rgba(212,168,67,0.1)",border:"1px solid rgba(212,168,67,0.3)",backdropFilter:"blur(12px)",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.7s ease 0.15s" }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--gold-lt)",animation:"pulseRing 2.5s infinite",display:"block" }} />
              <span style={{ fontFamily:"var(--t-head)",fontSize:10,fontWeight:600,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--gold-lt)" }}>Independent Advisory · Verified Listings · Delhi NCR</span>
            </div>

            <h1 style={{ fontFamily:"var(--t-display)",fontWeight:300,fontSize:"clamp(40px,5.5vw,72px)",lineHeight:1.02,letterSpacing:"-0.025em",color:"var(--light)",marginBottom:28,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(36px)",transition:"all 0.8s ease 0.3s" }}>
              Real Estate Advisory<br />in Delhi NCR,<br /><em className="gold-shimmer" style={{ fontSize:"inherit",fontStyle:"italic" }}>Backed by Verification.</em>
            </h1>

            {/* Exact sub-headline from Word doc */}
            <p style={{ fontFamily:"var(--t-body)",fontSize:16,fontWeight:300,color:"rgba(255,255,255,0.85)",lineHeight:1.85,maxWidth:580,marginBottom:40,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(24px)",transition:"all 0.8s ease 0.45s" }}>
              Vedhara Group is an independent real estate advisory firm serving buyers, sellers, investors, NRIs, and first-time homebuyers across Delhi NCR, Gurugram, Noida, Faridabad, Manesar, Ghaziabad, Chandigarh and across North India. Every property we recommend has passed our five-point Verification Framework, and we publish exactly what we found on the listing itself.
            </p>

            <div style={{ display:"flex",gap:14,flexWrap:"wrap",marginBottom:52,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.8s ease 0.6s" }}>
              <Link href="/contact" className="btn btn-primary">Book a Free Consultation</Link>
              <Link href="/buy" className="btn btn-outline">Explore Verified Listings →</Link>
            </div>

            {/* Trust strip from Word doc */}
            <div className="trust-strip" style={{ opacity:loaded?1:0,transition:"opacity 0.8s ease 0.75s" }}>
              {["RERA Compliant","Transparent Fees","Verified Developer Partners","4 Free Property Tools","NRI Desk Available"].map(t=>(
                <div key={t} className="trust-item">
                  <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--gold-lt)",display:"block",boxShadow:"0 0 8px rgba(232,201,112,0.6)",flexShrink:0 }} />
                  <span className="trust-label">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Premium verification + tools card */}
          <div style={{ opacity:loaded?1:0,transform:loaded?"translateX(0)":"translateX(48px)",transition:"all 0.9s ease 0.55s" }} className="hero-right">
            <div className="glass-navy" style={{ borderRadius:16,overflow:"hidden",boxShadow:"0 24px 60px rgba(9,15,29,0.5), 0 0 44px rgba(212,168,67,0.08)",animation:"float 6s ease-in-out infinite" }}>
              {/* Gold top accent */}
              <div style={{ height:3,background:"linear-gradient(90deg,var(--gold-dk),var(--gold-lt) 50%,var(--gold-dk))" }} />
              {/* Verification framework */}
              <div style={{ display:"flex",alignItems:"center",gap:14,padding:"18px 20px 16px" }}>
                <div style={{ width:46,height:46,borderRadius:"50%",background:"linear-gradient(135deg,rgba(212,168,67,0.28),rgba(212,168,67,0.08))",border:"1px solid rgba(212,168,67,0.45)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,color:"var(--gold-lt)",boxShadow:"0 0 22px rgba(212,168,67,0.3), inset 0 0 12px rgba(212,168,67,0.15)" }}>✓</div>
                <div>
                  <p style={{ fontFamily:"var(--t-head)",fontSize:12.5,fontWeight:600,color:"var(--gold-lt)",margin:"0 0 2px",letterSpacing:"0.04em",lineHeight:1.35,textShadow:"0 1px 6px rgba(0,0,0,0.3)" }}>Vedhara Verification Framework</p>
                  <p style={{ fontFamily:"var(--t-body)",fontSize:11,fontWeight:400,color:"rgba(255,255,255,0.75)",margin:0,lineHeight:1.5 }}>5 checks published on every listing</p>
                </div>
              </div>
              {/* Gold divider */}
              <div style={{ height:1,margin:"0 20px",background:"linear-gradient(90deg,transparent,rgba(212,168,67,0.45),transparent)" }} />
              {/* Quick links */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,padding:"14px 14px 16px" }}>
                {[{i:"📊",t:"ROI Calculator",h:"/calculators"},{i:"🌐",t:"NRI Services",h:"/nri-services"},{i:"🔍",t:"Verify Property",h:"/verification-center"},{i:"📈",t:"Invest in NCR",h:"/investment-advisory"}].map(item=>(
                  <Link key={item.t} href={item.h} className="hero-quick-link">
                    <span className="hero-quick-icon">{item.i}</span>
                    <span className="hero-quick-text">{item.t}</span>
                  </Link>
                ))}
              </div>
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
        @media(max-width:960px){.hero-inner{grid-template-columns:1fr!important;gap:32px!important;}.hero-right{max-width:400px;margin:0 auto;}}
        @media(max-width:600px){.hero-tagline{margin-bottom:8px!important;}.hero-right{margin-top:8px!important;}.stat-grid{grid-template-columns:1fr 1fr!important;}.stat-grid>div{padding:12px 10px!important;}.stat-grid .stat-num{font-size:17px!important;}.stat-grid .stat-label{font-size:8px!important;}}
        .hero-quick-link{display:flex;align-items:center;gap:9px;padding:12px 12px;font-family:var(--t-head);font-size:11px;font-weight:500;color:#ffffff;text-decoration:none;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;letter-spacing:0.02em;transition:all 0.25s ease;}
        .hero-quick-link:hover{background:rgba(212,168,67,0.12);border-color:rgba(212,168,67,0.4);color:var(--gold-lt);transform:translateY(-2px);box-shadow:0 10px 24px rgba(9,15,29,0.45);}
        .hero-quick-icon{width:30px;height:30px;border-radius:8px;background:rgba(212,168,67,0.12);border:1px solid rgba(212,168,67,0.2);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:all 0.25s;}
        .hero-quick-link:hover .hero-quick-icon{background:rgba(212,168,67,0.3);border-color:rgba(212,168,67,0.45);}
        .hero-quick-text{white-space:nowrap;}
        .trust-strip{display:flex;align-items:center;flex-wrap:nowrap;gap:18px;}
        .trust-item{display:flex;align-items:center;gap:9px;white-space:nowrap;}
        .trust-label{font-family:var(--t-head);font-size:11px;font-weight:600;color:rgba(255,255,255,0.95);letter-spacing:0.04em;text-shadow:0 1px 8px rgba(9,15,29,0.55);}
        @media(max-width:1280px){.trust-strip{flex-wrap:wrap;gap:12px 18px;}}
        @media(max-width:960px){.trust-strip{justify-content:center;}}
      `}</style>
    </section>
  );
}
