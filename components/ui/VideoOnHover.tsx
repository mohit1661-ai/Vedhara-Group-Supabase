"use client";
import { useRef, useState, useEffect } from "react";

/**
 * Shows a poster image by default and plays a muted looping video on hover
 * (desktop). On touch devices (no hover) the play/pause toggle lives on a
 * small corner button; tapping the rest of the media navigates to the listing
 * (it doesn't capture the tap). Used for property-listing cards so videos
 * don't weigh down page load.
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

  const showVideo = (hover || playing) && ready;

  return (
    <div
      style={{ position:"absolute", inset:0, overflow:"hidden" }}
      onMouseEnter={touch ? undefined : () => { setHover(true); videoRef.current?.play().catch(() => {}); }}
      onMouseLeave={touch ? undefined : () => pause()}
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
      {/* Touch control: tapping the card itself navigates to the listing. The
          play/pause toggle lives on this dedicated button which stops
          propagation so it doesn't block navigation. */}
      {touch && (
        <button
          type="button"
          aria-label={playing ? "Pause video" : "Play video"}
          onClick={(e) => { e.stopPropagation(); if (playing) pause(); else play(); }}
          style={{ position:"absolute", top:14, right:14, zIndex:3, display:"flex", alignItems:"center", gap:5, fontFamily:"var(--t-head)", fontSize:8, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"4px 10px", borderRadius:20, background:"rgba(9,15,29,0.6)", color:"rgba(255,255,255,0.95)", border:"1px solid rgba(255,255,255,0.25)", backdropFilter:"blur(4px)", cursor:"pointer" }}
        >
          <span style={{ fontSize:9 }}>{playing ? "❚❚" : "▶"}</span>
          {playing ? "Pause" : "Play video"}
        </button>
      )}
    </div>
  );
}
