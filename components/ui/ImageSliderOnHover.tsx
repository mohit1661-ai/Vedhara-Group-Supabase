"use client";
import { useRef, useState, useEffect } from "react";

/**
 * Shows the first (best) image statically; on hover it cross-fades through all
 * images like a slider (desktop). On touch devices (no hover) tapping the media
 * advances to the next photo, and the tap is captured so the card link doesn't
 * navigate. Used for property-listing cards with multiple photos.
 */
interface ImageSliderOnHoverProps {
  images: string[];
  alt?: string;
}

export default function ImageSliderOnHover({ images, alt }: ImageSliderOnHoverProps) {
  const [hover, setHover] = useState(false);
  const [touch, setTouch] = useState(false);
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Touch devices have no hover — switch to tap-to-advance.
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(pointer: coarse)").matches) {
      setTouch(true);
    }
  }, []);

  const enter = () => {
    if (touch || images.length < 2) return;
    setHover(true);
    setIdx(0);
    timer.current = setInterval(() => {
      setIdx(prev => (prev + 1) % images.length);
    }, 900);
  };
  const leave = () => {
    setHover(false);
    setIdx(0);
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
  };

  // Touch: tap advances to the next photo and stops the card link navigating.
  const onTouchTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!touch) return;
    e.preventDefault();
    e.stopPropagation();
    setHover(true);
    setIdx(prev => (prev + 1) % images.length);
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <div
      style={{ position:"absolute", inset:0, overflow:"hidden" }}
      onMouseEnter={touch ? undefined : enter}
      onMouseLeave={touch ? undefined : leave}
      onClick={onTouchTap}
    >
      {/* Static card image (descriptive alt) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[0]}
        alt={alt || ""}
        loading="lazy"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:hover?0:1, transition:"opacity 0.35s ease" }}
      />
      {/* Hover/tap slider frames (decorative — the static image carries the description) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={idx}
        src={images[idx]}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:hover?1:0, transition:"opacity 0.35s ease", pointerEvents:"none", animation:hover ? "vohFade 0.7s ease" : "none" }}
      />
      {/* Touch photo counter — tells mobile/tablet users the media is tappable */}
      {touch && (
        <div style={{ position:"absolute", bottom:8, right:8, zIndex:3, pointerEvents:"none", fontFamily:"var(--t-head)", fontSize:8, fontWeight:700, letterSpacing:"0.08em", padding:"3px 8px", borderRadius:12, background:"rgba(9,15,29,0.6)", color:"rgba(255,255,255,0.95)", border:"1px solid rgba(255,255,255,0.25)", backdropFilter:"blur(4px)" }}>
          {idx + 1} / {images.length}
        </div>
      )}
      <style>{`@keyframes vohFade { from { opacity: 0.2; } to { opacity: 1; } }`}</style>
    </div>
  );
}
