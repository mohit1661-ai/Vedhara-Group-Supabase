"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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
    const isMobile = window.innerWidth < 768;
    const particles = Array.from({ length: isMobile ? 20 : 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.08,
      size: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.35 + 0.05,
    }));
    let raf = 0;
    let running = true;
    let lastFrame = 0;
    const FRAME_INTERVAL = isMobile ? 50 : 33; // ~20fps mobile, ~30fps desktop
    const draw = (now: number) => {
      if (!running) return;
      if (now - lastFrame < FRAME_INTERVAL) { raf = requestAnimationFrame(draw); return; }
      lastFrame = now;
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
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          if (Math.abs(dx) > maxDist) continue;
          const dy = particles[i].y - particles[j].y;
          if (Math.abs(dy) > maxDist) continue;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232,201,112,${0.05 * (1 - d / maxDist)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    // Pause the animation when the tab is hidden (invisible to users, saves CPU).
    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!running) { running = true; lastFrame = 0; raf = requestAnimationFrame(draw); }
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
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

interface CinematicHeroProps {
  /** Desktop (high-quality) video source. */
  videoSrc?: string;
  /** Mobile (lightweight) video source, used below 768px for fast autoplay. */
  videoSrcMobile?: string;
  /** Poster image shown behind the video until it loads (LCP element). */
  poster?: string;
}

/* ── Hero "4 parts", image cards that expand a short detail on click ── */
const heroParts = [
  { t:"ROI Calculator",        h:"/calculators",           img:"https://images.pexels.com/photos/5859963/pexels-photo-5859963.jpeg?auto=compress&cs=tinysrgb&w=600", d:"Four free calculators: ROI & rental yield, home loan EMI, stamp duty and affordability. No sign-up needed." },
  { t:"NRI Services",          h:"/nri-services",          img:"https://images.pexels.com/photos/20418771/pexels-photo-20418771.jpeg?auto=compress&cs=tinysrgb&w=600", d:"Remote-first advisory for NRIs, video walkthroughs, documentation support and weekend IST slots." },
  { t:"Verify Property",       h:"/verification-center",   img:"https://images.pexels.com/photos/33559373/pexels-photo-33559373.jpeg?auto=compress&cs=tinysrgb&w=600", d:"Every listing passes our 5-point Verification Framework, and we publish exactly what we found." },
  { t:"Invest in NCR",         h:"/investment-advisory",   img:"https://images.pexels.com/photos/11729105/pexels-photo-11729105.jpeg?auto=compress&cs=tinysrgb&w=600", d:"Independent portfolio strategy across Delhi NCR micro-markets, with transparent fees and a named advisor." },
];

export default function CinematicHero({
  videoSrc = "/videos/Homepage%20Hero%20Video%20Real%20Estate%20Advisory%20in%20Gurgaon%20Delhi%20NCR.mp4",
  videoSrcMobile,
  poster,
}: CinematicHeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSrcReady, setVideoSrcReady] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentOuterRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ref callback to set src after mount, preventing browser from restoring stale playback position.
  // The heavy video download is deferred until the browser is idle so it never competes with
  // the LCP hero content on any device; on Save-Data/2G the poster stays.
  // useCallback keeps the identity stable, so React never re-runs it on re-render,
  // a re-run would re-assign src and call load() again, restarting the video
  // and flashing the hero on screen.
  const videoRefCallback = useCallback((el: HTMLVideoElement | null) => {
    if (el) {
      videoRef.current = el;
      el.currentTime = 0;
      const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
      const source = mobile && videoSrcMobile ? videoSrcMobile : videoSrc;
      if (source) {
        const start = () => {
          if (!el.isConnected) return;
          el.src = source;
          el.preload = "auto";
          el.load();
          setVideoSrcReady(true);
        };
        const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
        const slow = !!conn && (!!conn.saveData || /2g/.test(conn.effectiveType || ""));
        // Mobile also receives the muted/inline video; only Save-Data/2G keeps
        // the fallback behavior so normal mobile visitors are not left without a hero.
        if (slow) return;
        start();
      }
    }
  }, [videoSrc, videoSrcMobile]);

  /* ── Start muted autoplay once src is set ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || !videoSrcReady) return;

    video.muted = true;
    video.defaultMuted = true;
    video.currentTime = 0;
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();

    const handleReady = () => {
      // Do NOT reset currentTime here; on mobile the loadeddata/canplay events
      // can arrive after playback has already begun, and rewinding mid-load is
      // what makes the hero flash/restart. A freshly created video starts at 0.
      setVideoLoaded(true);
      tryPlay();
    };
    if (video.readyState >= 3) {
      setVideoLoaded(true);
    } else {
      video.addEventListener("loadeddata", handleReady, { once: true });
      video.addEventListener("canplay", handleReady, { once: true });
    }
    return () => {
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
      video.pause();
    };
  }, [videoSrc, videoSrcReady]);

  /* ── Resume video on user interaction if autoplay was blocked ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const resumeVideo = () => {
      if (video.paused) video.play().catch(() => {});
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
  }, []);

  /* ── Multi-layer parallax (rAF-throttled, GPU-friendly) ── */
  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    const outer = contentOuterRef.current;
    if (!hero || !bg || !outer) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const scrollY = window.scrollY;
      bg.style.transform = `translate3d(0, ${scrollY * 0.05}px, 0)`;
      outer.style.transform = `translate3d(0, ${scrollY * 0.025}px, 0)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
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
      className="video-hero cinematic-hero"
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
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            srcSet={`${poster.replace(/\.jpg$/, "-mobile.jpg")} 768w, ${poster} 1920w`}
            sizes="100vw"
            alt="Vedhara Group cinematic hero, real estate advisory across Delhi NCR"
            fetchPriority="high"
            decoding="async"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              opacity: videoLoaded ? 0 : 1,
              transition: "opacity 0.8s ease",
            }}
          />
        ) : null}
        <video
          ref={videoRefCallback}
          autoPlay
          muted
          loop
          playsInline
           preload="auto"
          className="video-bg"
          title="Vedhara Group homepage cinematic property film"
          aria-label="Vedhara Group homepage cinematic property film"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 0.8s ease",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            transform: "translateZ(0)",
          }}
        />
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

      <div ref={contentOuterRef} className="hero-content" style={{ position:"relative",zIndex:3,maxWidth:1320,margin:"0 auto",padding:"80px 32px 60px",width:"100%" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 380px",gap:80,alignItems:"center" }} className="hero-inner">
          {/* LEFT */}
          <div className="hero-copy">
            <div className="hero-tagline" style={{ display:"inline-flex",alignItems:"flex-start",gap:8,marginBottom:32,padding:"8px 18px",background:"rgba(212,168,67,0.1)",border:"1px solid rgba(212,168,67,0.3)",backdropFilter:"blur(12px)",animation:"heroRise 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s backwards" }}>
              <span aria-hidden="true" style={{ width:6,height:6,borderRadius:"50%",background:"var(--gold-lt)",animation:"pulseRing 2.5s infinite",display:"block",flexShrink:0,marginTop:4 }} />
              <span style={{ fontFamily:"var(--t-head)",fontSize:10,fontWeight:600,letterSpacing:"0.2em",textTransform:"uppercase",color:"var(--gold-lt)" }}>Independent Advisory; Verified Listings;<br className="hero-tagline-break" /> Delhi NCR</span>
            </div>

            <h1 style={{ fontFamily:"var(--t-display)",fontWeight:300,fontSize:"clamp(40px,5.5vw,72px)",lineHeight:1.02,letterSpacing:"-0.025em",color:"var(--light)",marginBottom:28,animation:"heroRiseNoFade 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s backwards" }}>
              Real Estate Advisory<br /><em className="gold-shimmer" style={{ fontSize:"inherit",fontStyle:"italic" }}>in Delhi NCR, Verified.</em>
            </h1>

            {/* Exact sub-headline from Word doc */}
            <p style={{ fontFamily:"var(--t-body)",fontSize:16,fontWeight:300,color:"rgba(255,255,255,0.85)",lineHeight:1.85,maxWidth:580,marginBottom:40,animation:"heroRiseNoFade 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s backwards" }}>
              Vedhara Group is an independent real estate advisory firm serving buyers, sellers, investors, NRIs, and first-time homebuyers across Delhi NCR, Gurugram, Noida, Faridabad, Manesar, Ghaziabad, Chandigarh and across North India. Every property we recommend has passed our five-point Verification Framework, and we publish exactly what we found on the listing itself.
            </p>

            <div style={{ display:"flex",gap:14,flexWrap:"wrap",marginBottom:52,animation:"heroRise 0.8s cubic-bezier(0.22,1,0.36,1) 0.6s backwards" }}>
              <Link href="/contact" className="btn btn-primary">Book a Free Consultation</Link>
              <Link href="/buy" className="btn btn-outline">Explore Verified Listings →</Link>
            </div>

            {/* Trust strip from Word doc */}
            <div className="trust-strip" style={{ animation:"heroFade 0.8s ease 0.75s backwards" }}>
              {["RERA Compliant","Transparent Fees","Verified Developer Partners","4 Free Property Tools","NRI Desk Available"].map(t=>(
                <div key={t} className="trust-item">
                  <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--gold-lt)",display:"block",boxShadow:"0 0 8px rgba(232,201,112,0.6)",flexShrink:0 }} />
                  <span className="trust-label">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Premium verification + tools card */}
          <div style={{ animation:"heroSlideX 0.9s cubic-bezier(0.22,1,0.36,1) 0.55s backwards" }} className="hero-right">
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
              {/* The 4 parts, image cards; click to expand a short detail */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,padding:"14px 14px 0" }}>
                {heroParts.map((p, idx) => (
                  <button
                    key={p.t}
                    type="button"
                    onClick={()=>setActiveCard(activeCard===idx?null:idx)}
                    aria-expanded={activeCard===idx}
                    className="hero-part-card"
                    style={{
                      position:"relative",
                      overflow:"hidden",
                      borderRadius:10,
                      height:120,
                      border:`1px solid ${activeCard===idx?"rgba(212,168,67,0.6)":"rgba(212,168,67,0.32)"}`,
                      cursor:"pointer",
                      padding:0,
                      background:"var(--navy)",
                      textAlign:"left",
                      transition:"border-color 0.3s ease, transform 0.3s var(--ease-out), box-shadow 0.3s ease",
                    }}
                  >
                    <Image src={p.img} alt={`${p.t}, Vedhara Group`} fill sizes="180px" className="hero-part-img" style={{ objectFit:"cover" }} />
                    {/* Light overlay so the image stays bright and clear in the static state */}
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(15,30,56,0.05) 0%, rgba(15,30,56,0.62) 100%)" }} />
                    <div style={{ position:"relative",display:"flex",flexDirection:"column",height:"100%",padding:"12px",justifyContent:"flex-end",alignItems:"flex-start" }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:600,color:"#fff",letterSpacing:"0.04em",lineHeight:1.3,textShadow:"0 1px 8px rgba(9,15,29,0.65)" }}>{p.t}</span>
                    </div>
                    {activeCard===idx && <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"var(--gold-lt)" }} />}
                  </button>
                ))}
              </div>
              {activeCard!==null && (
                <div style={{ margin:"10px 14px 14px",padding:"12px 14px",background:"rgba(212,168,67,0.08)",border:"1px solid rgba(212,168,67,0.3)",borderRadius:10,animation:"heroRise 0.3s ease" }}>
                  <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,fontWeight:400,color:"rgba(255,255,255,0.92)",lineHeight:1.6,margin:"0 0 8px" }}>{heroParts[activeCard].d}</p>
                  <Link href={heroParts[activeCard].h} style={{ fontFamily:"var(--t-head)",fontSize:10.5,fontWeight:600,color:"var(--gold-lt)",textDecoration:"none",letterSpacing:"0.04em" }}>Explore {heroParts[activeCard].t} →</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute",bottom:-20,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"heroFadeDim 1s ease 1s backwards" }}>
          <span style={{ fontFamily:"var(--t-head)",fontSize:8,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)" }}>Scroll</span>
          <div style={{ width:28,height:46,border:"1.5px solid rgba(255,255,255,0.18)",borderRadius:14,display:"flex",justifyContent:"center",paddingTop:6 }}>
            <div style={{ width:3,height:8,borderRadius:2,background:"var(--gold-lt)",animation:"float 2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:960px){.hero-inner{grid-template-columns:1fr!important;gap:32px!important;}.hero-right{max-width:400px;margin:0 auto;}}
         .hero-tagline-break{display:none;}
         @media(max-width:600px){.cinematic-hero{align-items:center!important;padding-top:var(--nav-h)!important;}.hero-content{padding:24px 16px 40px!important;}.hero-inner{text-align:center;}.hero-copy{display:flex;flex-direction:column;align-items:center;}.hero-tagline{display:flex!important;width:fit-content;max-width:100%;margin:0 auto 12px!important;}.hero-tagline-break{display:block;}.hero-tagline span:last-child{text-align:center;}.hero-copy h1{margin-bottom:20px!important;}.hero-copy p{margin-left:auto!important;margin-right:auto!important;margin-bottom:28px!important;}.hero-copy>div:not(.hero-tagline):not(.trust-strip){justify-content:center;}.hero-right{margin-top:8px!important;}.stat-grid{grid-template-columns:1fr 1fr!important;}.stat-grid>div{padding:12px 10px!important;}.stat-grid .stat-num{font-size:17px!important;}.stat-grid .stat-label{font-size:8px!important;}}
        .hero-quick-link{display:flex;align-items:center;gap:9px;padding:12px 12px;font-family:var(--t-head);font-size:11px;font-weight:500;color:#ffffff;text-decoration:none;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;letter-spacing:0.02em;transition:all 0.25s ease;}
        .hero-quick-link:hover{background:rgba(212,168,67,0.12);border-color:rgba(212,168,67,0.4);color:var(--gold-lt);transform:translateY(-2px);box-shadow:0 10px 24px rgba(9,15,29,0.45);}
        .hero-quick-icon{width:30px;height:30px;border-radius:8px;background:rgba(212,168,67,0.12);border:1px solid rgba(212,168,67,0.2);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:all 0.25s;}
        .hero-quick-link:hover .hero-quick-icon{background:rgba(212,168,67,0.3);border-color:rgba(212,168,67,0.45);}
        .hero-quick-text{white-space:nowrap;}
        .hero-part-img{opacity:0.85;transition:opacity 0.3s ease;}
        .hero-part-card:hover{transform:translateY(-2px);border-color:rgba(212,168,67,0.6);box-shadow:0 10px 24px rgba(9,15,29,0.45);}
        .hero-part-card:hover .hero-part-img{opacity:1;}
        .trust-strip{display:flex;align-items:center;flex-wrap:nowrap;gap:18px;}
        .trust-item{display:flex;align-items:center;gap:9px;white-space:nowrap;}
        .trust-label{font-family:var(--t-head);font-size:11px;font-weight:600;color:rgba(255,255,255,0.95);letter-spacing:0.04em;text-shadow:0 1px 8px rgba(9,15,29,0.55);}
        @media(max-width:1280px){.trust-strip{flex-wrap:wrap;gap:12px 18px;}}
        @media(max-width:960px){.trust-strip{justify-content:center;}}
      `}</style>
    </section>
  );
}
