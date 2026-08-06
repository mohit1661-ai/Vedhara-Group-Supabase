"use client";
import { useEffect, useRef } from "react";
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dot = dotRef.current; const ring = ringRef.current;
    if (!dot || !ring) return;
    // Mouse-only enhancement: skip entirely on touch / coarse-pointer devices
    // (the CSS already hides it there — this just avoids the idle rAF cost).
    if (!window.matchMedia("(pointer: fine)").matches || !window.matchMedia("(hover: hover)").matches) return;
    let mx=0,my=0,rx=0,ry=0,raf:number;
    const onMove=(e:MouseEvent)=>{ mx=e.clientX; my=e.clientY; dot.style.left=`${mx}px`; dot.style.top=`${my}px`; };
    const animate=()=>{ rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ring.style.left=`${rx}px`; ring.style.top=`${ry}px`; raf=requestAnimationFrame(animate); };
    animate();
    const onEnter=()=>ring.classList.add("hover");
    const onLeave=()=>ring.classList.remove("hover");
    window.addEventListener("mousemove",onMove);
    document.querySelectorAll("a,button").forEach(el=>{ el.addEventListener("mouseenter",onEnter); el.addEventListener("mouseleave",onLeave); });
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("mousemove",onMove); };
  },[]);
  return (<><div ref={dotRef} className="cursor-dot"/><div ref={ringRef} className="cursor-ring"/></>);
}
