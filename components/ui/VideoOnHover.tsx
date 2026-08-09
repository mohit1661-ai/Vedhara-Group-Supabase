"use client";
import { useRef, useState } from "react";

/**
 * Shows a poster image by default and plays a muted looping video on hover
 * (desktop). Falls back to the poster image on touch devices. Used for
 * property-listing cards so videos don't weigh down the initial page load.
 */
interface VideoOnHoverProps {
  src: string;
  poster?: string;
  alt?: string;
}

export default function VideoOnHover({ src, poster, alt }: VideoOnHoverProps) {
  const [hover, setHover] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const enter = () => {
    setHover(true);
    videoRef.current?.play().catch(() => {});
  };
  const leave = () => {
    setHover(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      try { v.currentTime = 0; } catch { /* ignore */ }
    }
  };

  const showVideo = hover && ready;

  return (
    <div
      style={{ position:"absolute", inset:0, overflow:"hidden" }}
      onMouseEnter={enter}
      onMouseLeave={leave}
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
        onPlaying={() => setReady(true)}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:showVideo?1:0, transition:"opacity 0.35s ease", pointerEvents:"none" }}
      />
    </div>
  );
}
