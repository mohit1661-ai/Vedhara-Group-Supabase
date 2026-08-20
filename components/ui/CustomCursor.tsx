"use client";
import { useEffect, useRef, useState } from "react";
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia || window.matchMedia("(pointer: coarse)").matches) return;
    setIsDesktop(true);
    const dot = dotRef.current; const ring = ringRef.current;
    if (!dot || !ring) return;
    let mx=0,my=0,rx=0,ry=0,raf:number;
    let active=true;
    const show=()=>{ dot.style.opacity="1"; ring.style.opacity="1"; };
    const hide=()=>{ dot.style.opacity="0"; ring.style.opacity="0"; };
    const onPointerMove=(e:PointerEvent)=>{
      if(e.pointerType!=="mouse"){ hide(); return; }
      show();
      mx=e.clientX; my=e.clientY;
      dot.style.left=`${mx}px`; dot.style.top=`${my}px`;
    };
    const animate=()=>{ if(!active) return; rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ring.style.left=`${rx}px`; ring.style.top=`${ry}px`; raf=requestAnimationFrame(animate); };
    animate();
    const onPointerOver=(e:PointerEvent)=>{
      const t=e.target as Element | null;
      if(t && t.closest && t.closest("a,button")) ring.classList.add("hover");
    };
    const onPointerOut=(e:PointerEvent)=>{
      const t=e.target as Element | null;
      if(t && t.closest && t.closest("a,button")) ring.classList.remove("hover");
    };
    const onPointerDown=(e:PointerEvent)=>{ if(e.pointerType!=="mouse") hide(); };
    window.addEventListener("pointermove",onPointerMove);
    window.addEventListener("pointerdown",onPointerDown);
    document.addEventListener("pointerover",onPointerOver);
    document.addEventListener("pointerout",onPointerOut);
    return ()=>{ active=false; cancelAnimationFrame(raf); window.removeEventListener("pointermove",onPointerMove); window.removeEventListener("pointerdown",onPointerDown); document.removeEventListener("pointerover",onPointerOver); document.removeEventListener("pointerout",onPointerOut); };
  },[]);
  if (!isDesktop) return null;
  return (<><div ref={dotRef} className="cursor-dot"/><div ref={ringRef} className="cursor-ring"/></>);
}
