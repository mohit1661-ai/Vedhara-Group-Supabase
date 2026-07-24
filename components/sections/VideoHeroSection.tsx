"use client";
import { useEffect, useState, ReactNode } from "react";

/**
 * VideoHeroSection — Reusable video hero for sub-pages.
 *
 * USAGE (developer):
 * 1. Place your MP4 file in /public/videos/ (or use an external URL).
 * 2. Update the `videoSrc` prop or the fallback inside this component.
 * 3. The hero shows a gradient background until the video loads,
 *    then fades in the video smoothly.
 *
 * Example:
 *   <VideoHeroSection
 *     videoSrc="/videos/commercial-aerial.mp4"
 *     poster="/videos/poster.jpg"
 *   >
 *     <span className="v-line" style={{ margin:"0 auto 14px" }} />
 *     <p className="eyebrow">Buy With Confidence</p>
 *     <h1 style={...}>...</h1>
 *   </VideoHeroSection>
 */

interface Props {
  children: ReactNode;
  /** Path to the MP4 video file. Defaults to a placeholder aerial clip. */
  videoSrc?: string;
  /** Optional poster image shown before video loads. */
  poster?: string;
  /** Override the gradient overlay colors. */
  overlayGradient?: string;
}

export default function VideoHeroSection({
  children,
  videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-night-11-large.mp4",
  poster = "/hero-poster.jpg",
  overlayGradient,
}: Props) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section
      className="page-hero video-hero"
      style={{
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      {/* ── Video Background ── */}
      {/*
        ============================================================
        TO UPLOAD YOUR OWN VIDEO:
        1. Copy your .mp4 file to  /public/videos/your-video.mp4
        2. Change the `src` below to  /videos/your-video.mp4
        3. (Optional) Generate a poster frame (jpg/png) and set
           the `poster` prop or the poster attribute on <video>.
        ============================================================
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className="video-bg"
        style={{
          opacity: videoLoaded ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
        poster={poster}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* ── Overlay ── */}
      <div
        className="video-overlay"
        style={
          overlayGradient
            ? { background: overlayGradient }
            : undefined
        }
      />

      {/* ── Additional ambient glow ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(184,146,42,0.07) 0%,transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          position: "relative",
          zIndex: 3,
        }}
      >
        {children}
      </div>
    </section>
  );
}
