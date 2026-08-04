"use client";
import Image from "next/image";
import { useEffect, useRef, useState, ReactNode } from "react";

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
  /** Path to MP4 video. Default uses a high-quality real estate aerial. */
  videoSrc?: string;
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
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.05,
      size: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.3 + 0.05,
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
        ctx.fillStyle = `rgba(232,201,112,${p.alpha * baseOpacity})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232,201,112,${0.04 * (1 - d / 100) * baseOpacity})`;
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
  videoSrc = "/videos/hero-bg.mp4",
  poster = "/hero-poster.jpg",
  posterAlt = "",
  overlayGradient,
  disableTilt,
  disableParallax,
}: Props) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  /* ── Load hero video only when the section is near the viewport to save bandwidth on first paint ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting) {
        setShouldLoadVideo(true);
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "200px 0px",
      threshold: 0.1,
    });
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    // Start the video download only once the hero is near the viewport so the
    // poster/LCP element paints first. Same video, same quality, just deferred.
    video.preload = "auto";
    video.load();

    if (video.readyState >= 3) {
      setVideoLoaded(true);
      return;
    }

    const handleLoadedData = () => setVideoLoaded(true);
    video.addEventListener("loadeddata", handleLoadedData, { once: true });
    return () => video.removeEventListener("loadeddata", handleLoadedData);
  }, [shouldLoadVideo]);

  /* ── Parallax on scroll ── */
  useEffect(() => {
    if (disableParallax) return;
    const hero = sectionRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;
    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const speed = 0.06;
      // Parallax the video background
      bg.style.transform = `translateY(${rect.top * speed}px)`;
      // Parallax the content at a different speed
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${rect.top * 0.025}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [disableParallax]);

  /* ── 3D tilt on mouse move ── */
  useEffect(() => {
    if (disableTilt) return;
    const hero = sectionRef.current;
    if (!hero) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = y * -2.4;
      const tiltY = x * 2.4;
      if (contentRef.current) {
        contentRef.current.style.transform = contentRef.current.style.transform.replace(
          /translateY\([^)]+\)/,
          ""
        );
        contentRef.current.style.perspective = "1000px";
        contentRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
      }
    };
    const onMouseLeave = () => {
      if (contentRef.current) {
        contentRef.current.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
      }
    };
    hero.addEventListener("mousemove", onMouseMove, { passive: true });
    hero.addEventListener("mouseleave", onMouseLeave, { passive: true });
    return () => {
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
        }}
      >
        {/* Always-visible poster fallback: stays on-screen even if the video is blocked/deferred on mobile */}
        <Image
          src={poster}
          alt={posterAlt}
          fill
          priority
          sizes="100vw"
          className="video-bg"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
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
          poster={poster}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* ── Overlay (balanced for text readability while keeping video visible) ── */}
      <div
        className="video-overlay"
        style={
          overlayGradient
            ? { background: overlayGradient }
            : {
                background:
                  "linear-gradient(135deg, rgba(9,15,29,0.78) 0%, rgba(15,30,56,0.60) 40%, rgba(9,15,29,0.72) 100%)",
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
