"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";
type Direction="up"|"left"|"right"|"scale";
const inits:Record<Direction,string>={ up:"translateY(32px)", left:"translateX(-32px)", right:"translateX(32px)", scale:"scale(0.93)" };
export default function ScrollReveal({ children, delay=0, direction="up", style={}, className="" }:{ children:ReactNode; delay?:number; direction?:Direction; style?:CSSProperties; className?:string; }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    el.style.opacity="0"; el.style.transform=inits[direction];
    el.style.transition=`opacity 0.78s cubic-bezier(0.22,1,0.36,1) ${delay}ms,transform 0.78s cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
    const vline=el.querySelector<HTMLElement>(".v-line");
    const obs=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){ el.style.opacity="1"; el.style.transform="none"; if(vline) setTimeout(()=>vline.classList.add("drawn"),delay+100); obs.unobserve(el); }
    },{threshold:0.08,rootMargin:"0px 0px -40px 0px"});
    obs.observe(el); return ()=>obs.disconnect();
  },[delay,direction]);
  return <div ref={ref} style={style} className={className}>{children}</div>;
}
