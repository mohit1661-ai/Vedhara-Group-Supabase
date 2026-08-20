"use client";
import { useRef, useState, useEffect } from "react";

/**
 * Shows a poster image by default and plays a muted looping video on hover
 * (desktop). On touch devices (no hover) tapping the media toggles play/pause,
 * and the tap is captured so the card link doesn't navigate.
 * Used for property-listing cards so videos don't weigh down page load.
 */
interface VideoOnHoverProps {
  src: string;
  poster?: string;
  alt?: string;
}

export default function VideoOnHover({ src, poster, alt }: VideoOnHoverProps) {
  const [hover, setHover] = useState(false);
  const [touch, setTouch] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Touch devices have no hover; detect and switch to tap-to-play/pause.
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(pointer: coarse)").matches) {
      setTouch(true);
    }
  }, []);

  const play = () => {
    setHover(true);
    setPlaying(true);
    videoRef.current?.play().catch(() => {});
  };
  const pause = () => {
    setHover(false);
    setPlaying(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      try { v.currentTime = 0; } catch { /* ignore */ }
    }
  };

  // Touch: tap toggles play/pause and stops the card link from navigating.
  const onTouchTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!touch) return;
    e.preventDefault();
    e.stopPropagation();
    if (playing) pause();
    else play();
  };

  const showVideo = (hover || playing) && ready;

  return (
    <div
      style={{ position:"absolute", inset:0, overflow:"hidden" }}
      onMouseEnter={touch ? undefined : () => { setHover(true); videoRef.current?.play().catch(() => {}); }}
      onMouseLeave={touch ? undefined : () => pause()}
      onClick={onTouchTap}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt || ""}
        loading="lazy"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:showVideo?0:1, transition:"opacity 0.35s ease" }}
      />
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onPlaying={() => setReady(true)}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:showVideo?1:0, transition:"opacity 0.35s ease", pointerEvents:"none" }}
      />
      {/* Touch hint, tells mobile/tablet users the media is tappable */}
      {touch && (
        <div style={{ position:"absolute", top:14, right:14, zIndex:3, pointerEvents:"none", display:"flex", alignItems:"center", gap:5, fontFamily:"var(--t-head)", fontSize:8, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"4px 10px", borderRadius:20, background:"rgba(9,15,29,0.6)", color:"rgba(255,255,255,0.95)", border:"1px solid rgba(255,255,255,0.25)", backdropFilter:"blur(4px)" }}>
          <span style={{ fontSize:9 }}>{playing ? "❚❚" : "▶"}</span>
          {playing ? "Tap to pause" : "Tap to play"}
        </div>
      )}
    </div>
  );
}
