"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Small clickable photo thumbnails ("small cards") shown on property-listing
 * cards. Clicking a thumbnail opens a full-size lightbox overlay (portal into
 * document.body) so the enlarged image never reflows or hides the card itself.
 * The thumbnail click stops propagation so the wrapping card <Link> does not
 * navigate. Supports prev/next + counter when a listing has multiple photos,
 * Esc to close, and click-outside to dismiss.
 */
interface ListingGalleryProps {
  images: string[];
  title?: string;
}

export default function ListingGallery({ images, title }: ListingGalleryProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(
    () => setIdx((p) => (p + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setIdx((p) => (p - 1 + images.length) % images.length),
    [images.length]
  );

  // Keyboard: Esc closes, arrows navigate (only while open).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  // Lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [open]);

  if (!images || images.length === 0) return null;

  // More than 4 photos → show a horizontal scroller (thumbnails stay a fixed
  // comfortable size and users can swipe/scroll to the rest). 4 or fewer → all
  // fit in a single row.
  const scroll = images.length > 4;
  const thumbW = 100 / images.length;

  const openAt = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx(i);
    setOpen(true);
  };

  // Scroll the thumbnail strip by roughly one viewport of thumbnails.
  const scrollStrip = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.85), behavior: "smooth" });
  };

  const arrowBtn = (dir: -1 | 1) => (
    <button
      type="button"
      aria-label={dir === -1 ? "Previous photos" : "Next photos"}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollStrip(dir); }}
      style={{
        width: 30, height: 54, flexShrink: 0, cursor: "pointer",
        borderRadius: 6, border: "1px solid rgba(212,168,67,0.35)",
        background: "var(--navy)", color: "var(--gold-lt)",
        fontFamily: "var(--t-head)", fontSize: 18, fontWeight: 700, lineHeight: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {dir === -1 ? "‹" : "›"}
    </button>
  );

  const renderThumb = (img: string, i: number) => (
    <div
      key={i}
      role="button"
      tabIndex={0}
      onClick={openAt(i)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); openAt(i)(e as unknown as React.MouseEvent); }
      }}
      title={images.length > 1 ? `View photo ${i + 1} of ${images.length}` : "View photo"}
      aria-label={`${title || "Property"} photo ${i + 1}`}
      className="lg-thumb"
      style={{
        width: scroll ? 72 : `${thumbW}%`,
        height: 54,
        borderRadius: 6,
        border: "1px solid rgba(212,168,67,0.25)",
        background: "var(--cream)",
        cursor: "zoom-in",
        overflow: "hidden",
        position: "relative",
        display: "block",
        flexShrink: scroll ? 0 : 1,
        scrollSnapAlign: "start",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt={`${title || "Property"} — photo ${i + 1}`}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* subtle zoom hint on hover */}
      <span className="lg-zoom" style={{ position: "absolute", inset: 0, background: "rgba(9,15,29,0.32)", opacity: 0, transition: "opacity 0.2s ease", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <span style={{ fontFamily: "var(--t-head)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.95)" }}>🔍 View</span>
      </span>
    </div>
  );

  return (
    <>
      {scroll ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 10, flexShrink: 0, height: 69 }}>
          {arrowBtn(-1)}
          <div
            ref={scrollerRef}
            className="lg-scroll"
            style={{
              flex: 1, minWidth: 0, height: 69, display: "flex", gap: 6, overflowX: "auto",
              scrollSnapType: "x mandatory", paddingBottom: 5, alignItems: "flex-start",
            }}
          >
            {images.map(renderThumb)}
          </div>
          {arrowBtn(1)}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexShrink: 0, height: 69, alignItems: "flex-start" }}>
          {images.map(renderThumb)}
        </div>
      )}
      <style>{`.lg-thumb:hover .lg-zoom { opacity: 1; } .lg-scroll { scrollbar-width: thin; scrollbar-color: rgba(212,168,67,0.55) transparent; } .lg-scroll::-webkit-scrollbar { height: 5px; } .lg-scroll::-webkit-scrollbar-thumb { background: rgba(212,168,67,0.55); border-radius: 4px; } .lg-scroll::-webkit-scrollbar-track { background: transparent; }`}</style>

      {open && createPortal(
        <div
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${title || "Property"} photo viewer`}
          style={{
            position: "fixed", inset: 0, zIndex: 4000,
            background: "rgba(9,15,29,0.92)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          }}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close photo viewer"
            style={{
              position: "absolute", top: 18, right: 18, zIndex: 2,
              width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(15,30,56,0.6)", color: "var(--gold-lt)", cursor: "pointer",
              fontFamily: "var(--t-head)", fontSize: 16, fontWeight: 700, lineHeight: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ✕
          </button>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[idx]}
            alt={`${title || "Property"} — photo ${idx + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "100%", maxHeight: "84vh", objectFit: "contain",
              borderRadius: 8, boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
              background: "#fff",
            }}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous photo"
                style={{
                  position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", zIndex: 2,
                  width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(15,30,56,0.6)", color: "var(--gold-lt)", cursor: "pointer",
                  fontFamily: "var(--t-head)", fontSize: 22, fontWeight: 700, lineHeight: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next photo"
                style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", zIndex: 2,
                  width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(15,30,56,0.6)", color: "var(--gold-lt)", cursor: "pointer",
                  fontFamily: "var(--t-head)", fontSize: 22, fontWeight: 700, lineHeight: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                ›
              </button>
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 2,
                  fontFamily: "var(--t-head)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                  padding: "6px 14px", borderRadius: 20, background: "rgba(15,30,56,0.7)",
                  color: "var(--gold-lt)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(4px)",
                }}
              >
                {idx + 1} / {images.length}
              </div>
            </>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
