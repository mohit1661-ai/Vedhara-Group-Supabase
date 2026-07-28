"use client";
import { useEffect, useRef, useState } from "react";
const stats = [
  { target:500, prefix:"",  suffix:"+",    label:"Families Guided" },
  { target:200,  prefix:"₹", suffix:"Cr+",  label:"Transactions Assisted" },
  { target:5,   prefix:"",  suffix:"-Step",label:"Verification Framework" },
  { target:6,   prefix:"",  suffix:"+",    label:"Countries Served" },
];
function Counter({ target, prefix, suffix }:{ target:number; prefix:string; suffix:string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && !started.current){
        started.current=true;
        const start=performance.now();const dur=1800;
        const tick=(now:number)=>{ const p=Math.min((now-start)/dur,1); setCount(Math.round((1-Math.pow(1-p,3))*target)); if(p<1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    },{threshold:0.3});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[target]);
  return <div ref={ref} style={{ fontFamily:"var(--t-head)",fontSize:"clamp(28px,3vw,40px)",fontWeight:700,color:"var(--gold-lt)",lineHeight:1 }}>{prefix}{count}{suffix}</div>;
}
export default function AnimatedStats() {
  return (
    <section style={{ background:"var(--navy)",borderTop:"1px solid rgba(212,168,67,0.08)",borderBottom:"1px solid rgba(212,168,67,0.08)" }}>
      <div style={{ maxWidth:1320,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",background:"rgba(212,168,67,0.04)" }} className="grid-4">
          {stats.map((s,i)=>(
            <div key={s.label} style={{ padding:"40px 28px",textAlign:"center",borderRight:i<3?"1px solid rgba(212,168,67,0.07)":"none",transition:"background 0.3s",cursor:"default" }}>
              <div className="gold-accent-sm" style={{margin:"0 auto 12px"}}></div>
              <Counter target={s.target} prefix={s.prefix} suffix={s.suffix} />
              <div style={{ fontFamily:"var(--t-body)",fontSize:11,color:"rgba(255,255,255,0.75)",textTransform:"uppercase",letterSpacing:"0.1em",marginTop:8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
