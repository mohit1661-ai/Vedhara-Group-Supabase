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

    // Already on screen (or reduced motion) → reveal right away so content
    // can never be stuck invisible or flash.
    if (reduceMotion || isInView()) {
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
      revealed = true;
      if (vline) vline.classList.add("drawn");
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
    };
  },[delay,direction]);
  return <div ref={ref} id={id} style={style} className={className}>{children}</div>;
}
