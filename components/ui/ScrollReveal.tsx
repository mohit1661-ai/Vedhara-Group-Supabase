"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";
type Direction="up"|"left"|"right"|"scale";
const inits:Record<Direction,string>={ up:"translateY(32px)", left:"translateX(-32px)", right:"translateX(32px)", scale:"scale(0.93)" };
export default function ScrollReveal({ children, delay=0, direction="up", style={}, className="", id }: { children:ReactNode; delay?:number; direction?:Direction; style?:CSSProperties; className?:string; id?:string; }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;

    // Never animate when the user prefers reduced motion; show instantly.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isInView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh - 20 && r.bottom > 0;
    };

    const vline = el.querySelector<HTMLElement>(".v-line");

    // Reveal is monotonic: once visible, it never goes back to hidden.
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      el.style.opacity = "1";
      el.style.transform = "none";
      if (vline) setTimeout(() => vline.classList.add("drawn"), delay + 100);
    };

    // Is this card the deep-link target (e.g. /luxury#ved-l07)? If so we must
    // reveal it immediately (otherwise native/anchor scroll can't reach a
    // hidden, transform:translateY'd card) AND land the viewport on it. This runs
    // on every mount — including SPA client-side navigation from a homepage card
    // — so the listing is shown, never the page hero/CTA section.
    const isHashTarget = !!(id && window.location.hash === `#${id}`);

    // Already on screen (or reduced motion) → reveal right away so content
    // can never be stuck invisible or flash.
    if (reduceMotion || isInView() || isHashTarget) {
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
      revealed = true;
      if (vline) vline.classList.add("drawn");

      if (isHashTarget) {
        // Land exactly on the card. The global html{scroll-behavior:smooth}
        // makes naive scrollIntoView animate, which — after an SPA navigation
        // that preserves the hash and after the hero video/lazy images settle —
        // can end up mid-animation short of the card (viewer sees the
        // "Who This Is For" section just above the listings instead of the
        // listing). Temporarily disable smooth and jump to the exact pixel for
        // the card top (minus navbar), then retry after layout settles. Any
        // retry is cancelled the instant the visitor scrolls so we never yank
        // the viewport back (no old "hover scroll" disruption).
        const html = document.documentElement;
        const savedScrollBehavior = html.style.scrollBehavior;
        const navPx = () => {
          const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-h").trim();
          const n = parseInt(v, 10);
          return (Number.isFinite(n) ? n : 76) + 16;
        };
        const land = () => {
          const top = el.getBoundingClientRect().top + window.scrollY - navPx();
          html.style.scrollBehavior = "auto";
          window.scrollTo(0, top);
          html.style.scrollBehavior = savedScrollBehavior;
        };
        const timers: number[] = [];
        let cancelled = false;
        const cancel = () => {
          if (cancelled) return;
          cancelled = true;
          timers.forEach((t) => window.clearTimeout(t));
          window.removeEventListener("wheel", cancel);
          window.removeEventListener("mousewheel", cancel);
          window.removeEventListener("touchmove", cancel);
        };
        window.addEventListener("wheel", cancel, { passive: true });
        window.addEventListener("mousewheel", cancel, { passive: true });
        window.addEventListener("touchmove", cancel, { passive: true });
        land();
        timers.push(window.setTimeout(land, 400));
        timers.push(window.setTimeout(land, 1000));
        timers.push(window.setTimeout(cancel, 1600));
        (el as HTMLElement & { __srLanding?: () => void }).__srLanding = cancel;
      }
      return;
    }

    // Otherwise animate in once on scroll.
    el.style.opacity = "0";
    el.style.transform = inits[direction];
    el.style.transition = `opacity 0.78s cubic-bezier(0.22,1,0.36,1) ${delay}ms,transform 0.78s cubic-bezier(0.22,1,0.36,1) ${delay}ms`;

    // Lenient observer (any positive intersection reveals) + a fail-safe
    // timer: if the observer never fires while the element is in view
    // (flaky browsers), reveal anyway. No blinking, no stuck-hidden content.
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { reveal(); obs.unobserve(el); }
    }, { threshold: 0.01, rootMargin: "0px 0px -20px 0px" });
    obs.observe(el);

    const failSafe = window.setTimeout(() => { if (isInView()) reveal(); }, 1200 + delay);

    return () => {
      obs.disconnect();
      window.clearTimeout(failSafe);
      (el as HTMLElement & { __srLanding?: () => void }).__srLanding?.();
    };
  },[delay,direction,id]);
  return <div ref={ref} id={id} style={style} className={className}>{children}</div>;
}
