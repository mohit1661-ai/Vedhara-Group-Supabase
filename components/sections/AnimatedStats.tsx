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
  return <div ref={ref} className="stat-counter" style={{ fontFamily:"var(--t-head)",fontSize:"clamp(28px,3vw,40px)",fontWeight:700,color:"var(--navy)",lineHeight:1 }}>{prefix}{count}{suffix}</div>;
}
export default function AnimatedStats() {
  return (
    <section style={{ background:"var(--navy)",padding:"52px 32px",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:"10%",left:"-6%",width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.06) 0%,transparent 70%)",pointerEvents:"none" }} />
      <div style={{ maxWidth:1320,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }} className="stats-row">
          {stats.map((s)=>(
            <div key={s.label} className="hover-lift stat-card" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.25)",borderRadius:16,overflow:"hidden",boxShadow:"0 12px 28px rgba(0,0,0,0.25)" }}>
              <div style={{ height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt),var(--gold))" }} />
              <div className="stat-inner" style={{ padding:"26px 18px 26px",textAlign:"center" }}>
                <span className="stat-badge" style={{ display:"inline-block",fontFamily:"var(--t-head)",fontSize:7.5,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"2px 7px",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",color:"var(--navy)",borderRadius:3,marginBottom:14 }}>Vedhara</span>
                <Counter target={s.target} prefix={s.prefix} suffix={s.suffix} />
                <div className="stat-rule" style={{ width:36,height:2,background:"linear-gradient(90deg,var(--gold),var(--gold-lt))",margin:"12px auto 0",opacity:0.6 }} />
                <div className="stat-label" style={{ fontFamily:"var(--t-body)",fontSize:11,color:"var(--slate)",textTransform:"uppercase",letterSpacing:"0.1em",marginTop:8 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.stats-row{grid-template-columns:repeat(4,1fr)!important;}@media(max-width:900px){.stats-row{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:600px){.stats-row{grid-template-columns:repeat(2,1fr)!important;gap:12px!important;}.stats-row .stat-inner{padding:20px 10px 20px!important;}.stats-row .stat-counter{font-size:clamp(18px,4vw,26px)!important;}.stats-row .stat-label{font-size:7.5px!important;letter-spacing:0.06em!important;}}`}</style>
    </section>
  );
}
