"use client";
import { useRef, useState, useEffect } from "react";

/**
 * Shows the first (best) image statically; on hover it cross-fades through all
 * images like a slider. Falls back to the static image on touch devices.
 * Used for property-listing cards with multiple photos.
 */
interface ImageSliderOnHoverProps {
  images: string[];
  alt?: string;
}

export default function ImageSliderOnHover({ images, alt }: ImageSliderOnHoverProps) {
  const [hover, setHover] = useState(false);
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const enter = () => {
    if (images.length < 2) return;
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

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <div
      style={{ position:"absolute", inset:0, overflow:"hidden" }}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {/* Static card image (descriptive alt) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[0]}
        alt={alt || ""}
        loading="lazy"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:hover?0:1, transition:"opacity 0.35s ease" }}
      />
      {/* Hover slider frames (decorative — the static image carries the description) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={idx}
        src={images[idx]}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:hover?1:0, transition:"opacity 0.35s ease", pointerEvents:"none", animation:hover ? "vohFade 0.7s ease" : "none" }}
      />
      <style>{`@keyframes vohFade { from { opacity: 0.2; } to { opacity: 1; } }`}</style>
    </div>
  );
}
