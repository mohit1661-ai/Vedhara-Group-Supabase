"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, ReactNode } from "react";

/**
 * VideoHeroSection, Cinematic 3D video hero for sub-pages.
 *
 * ── FEATURES ──
 * • Full-screen video background with smooth fade-in
 * • Parallax scroll (content moves at 0.3x scroll speed)
 * • 3D perspective tilt on mouse move (subtle depth)
 * • Gold particle system with connection lines
 * • Floating ambient orbs with glow
 * • Cinematic scan-line overlay
 * • Reduced-opacity gradient so video is VISIBLE
 *
 * ── TO UPLOAD YOUR OWN VIDEOS ──
 * 1. Place your .mp4 files in /public/videos/
 * 2. Set the `videoSrc` prop on each <VideoHeroSection> usage
 * 3. Recommended: use different videos for different pages
 *    e.g., building-exterior.mp4, luxury-interior.mp4, commercial-aerial.mp4
 *
 * Example:
 *   <VideoHeroSection videoSrc="/videos/building-exterior.mp4">
 *     <h1>Your Heading</h1>
 *   </VideoHeroSection>
 */

interface Props {
  children: ReactNode;
  /** Path to MP4 video (desktop / high-quality). */
  videoSrc?: string;
  /** Optional lightweight MP4 used on mobile (<768px) for fast autoplay. */
  videoSrcMobile?: string;
  /** Optional poster image shown before video loads. */
  poster?: string;
  /** Accessible alt text for the poster fallback image. */
  posterAlt?: string;
  /** Override the gradient overlay colors. Default is a semi-transparent navy->gold gradient. */
  overlayGradient?: string;
  /** Disable 3D mouse-tilt effect for this instance */
  disableTilt?: boolean;
  /** Disable parallax scroll effect */
  disableParallax?: boolean;
}

/* ── Particles (gold dots with connection lines) ── */
function Particles({ baseOpacity = 0.25 }) {
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
    const particles = Array.from({ length: isMobile ? 15 : 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.05,
      size: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.3 + 0.05,
    }));
    let raf = 0;
    let running = true;
    let lastFrame = 0;
    const FRAME_INTERVAL = isMobile ? 50 : 33;
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
        ctx.fillStyle = `rgba(232,201,112,${p.alpha * baseOpacity})`;
        ctx.fill();
      });
      const maxDist = 100;
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
            ctx.strokeStyle = `rgba(232,201,112,${0.04 * (1 - d / maxDist) * baseOpacity})`;
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
  }, [baseOpacity]);
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

export default function VideoHeroSection({
  children,
  videoSrc,
  videoSrcMobile,
  poster = "/hero-poster.jpg",
  posterAlt = "",
  overlayGradient,
  disableTilt,
  disableParallax,
}: Props) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSrcReady, setVideoSrcReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Ref callback to force currentTime = 0 and set src after mount.
  // Video download is deferred until the browser is idle so it doesn't compete
  // with the hero text on first paint (LCP) on any device; Save-Data/2G keeps the poster.
  // useCallback keeps the identity stable so React never re-runs it on re-render —
  // a re-run would re-assign src and call load() again, restarting the video
  // and flashing the hero on screen.
  const videoRefCallback = useCallback((el: HTMLVideoElement | null) => {
    if (el) {
      videoRef.current = el;
      // Force to start from beginning - runs synchronously on mount
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
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(start, { timeout: 900 });
        } else {
          setTimeout(start, 700);
        }
      }
    }
  }, [videoSrc, videoSrcMobile]);

  /* ── Start loading + muted autoplay immediately on mount for instant playback ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || !videoSrcReady) return;

    // Muted autoplay is permitted by browsers, so start right away.
    video.muted = true;
    video.defaultMuted = true;
    // Force video to start from beginning
    video.currentTime = 0;
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();

    const handleReady = () => {
      // Do NOT reset currentTime here — on mobile the loadeddata/canplay events
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
      // Pause video on unmount so it doesn't keep playing during page navigation
      video.pause();
    };
  }, [videoSrc, videoSrcReady]);

  /* ── Resume video on user interaction if autoplay was blocked ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const resumeVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
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

  /* ── Parallax on scroll (rAF-throttled, GPU-friendly) ── */
  useEffect(() => {
    if (disableParallax) return;
    const hero = sectionRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      const speed = 0.06;
      // Parallax the video background
      bg.style.transform = `translate3d(0, ${rect.top * speed}px, 0)`;
      // Parallax the content at a different speed
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${rect.top * 0.025}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [disableParallax]);

  /* ── 3D tilt on mouse move (preserves parallax translate3d) ── */
  useEffect(() => {
    if (disableTilt) return;
    const hero = sectionRef.current;
    if (!hero) return;
    // Track the current parallax Y offset so tilt doesn't wipe it out.
    let parallaxY = 0;
    const applyContent = () => {
      if (contentRef.current) {
        contentRef.current.style.perspective = "1000px";
      }
    };
    applyContent();
    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = y * -2.4;
      const tiltY = x * 2.4;
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${parallaxY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
      }
    };
    const onMouseLeave = () => {
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
      }
    };
    // Keep the parallax Y value in sync with the scroll effect.
    const heroEl = hero;
    const computeParallax = () => {
      const rect = heroEl.getBoundingClientRect();
      parallaxY = rect.top * 0.025;
    };
    window.addEventListener("scroll", computeParallax, { passive: true });
    computeParallax();
    hero.addEventListener("mousemove", onMouseMove, { passive: true });
    hero.addEventListener("mouseleave", onMouseLeave, { passive: true });
    return () => {
      window.removeEventListener("scroll", computeParallax);
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [disableTilt]);

  return (
    <section
      ref={sectionRef}
      className="page-hero video-hero"
      style={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
      }}
    >
      {/* ── Video Background (parallax layer) ── */}
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
        {/* Poster is shown until the video has loaded and faded in, preventing
            a blank navy screen on slow connections. Once videoLoaded the poster
            hides so the video layer takes over. */}
        {poster && (!videoSrc || !videoLoaded) && (
          <Image
            src={poster}
            alt={posterAlt}
            fill
            priority
            sizes="100vw"
            className="video-bg"
          />
        )}
        {videoSrc && (
          <video
            ref={videoRefCallback}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="video-bg"
            title={posterAlt || "Vedhara Group cinematic property film"}
            aria-label={posterAlt || "Vedhara Group cinematic property film"}
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
        )}
      </div>

      {/* ── Overlay (lighter to reveal more video quality while keeping text readable) ── */}
      <div
        className="video-overlay"
        style={
          overlayGradient
            ? { background: overlayGradient }
            : {
                background:
                  "linear-gradient(135deg, rgba(9,15,29,0.55) 0%, rgba(15,30,56,0.35) 40%, rgba(9,15,29,0.5) 100%)",
              }
        }
      />

      <div
        ref={contentRef}
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 4,
          width: "min(100%, 760px)",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        {children}
      </div>

      {/* ── Subtle scan-line overlay for cinematic feel ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 3px)",
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />

      {/* ── Grid lines ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(212,168,67,0.02) 40px, rgba(212,168,67,0.02) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(212,168,67,0.02) 40px, rgba(212,168,67,0.02) 41px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,168,67,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "5%",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
          animation: "float 10s ease-in-out infinite 2s",
        }}
      />

      {/* ── Gold particles ── */}
      <Particles baseOpacity={0.3} />


      {/* ── Developer note (visible in dev only) ── */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 12,
            zIndex: 10,
            fontFamily: "monospace",
            fontSize: 9,
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.05em",
            pointerEvents: "none",
          }}
        >
          🔧 Replace video in /public/videos/ , see VideoHeroSection.tsx
        </div>
      )}
    </section>
  );
}
