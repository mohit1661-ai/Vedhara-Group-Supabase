"use client";
import { useState } from "react";
import JsonLd from "@/components/seo/JsonLd";
export interface FAQItem { q:string; a:string; }
export interface FAQGroup { label:string; icon?:string; faqs:FAQItem[]; }
export default function FAQSection({ faqs=[], title, dark=true, groups }:{ faqs?:FAQItem[]; title?:string; dark?:boolean; groups?:FAQGroup[] }) {
  const [open, setOpen] = useState<number|null>(null);
  const allFaqs = groups ? groups.flatMap(g=>g.faqs) : faqs;
  const schema = { "@context":"https://schema.org","@type":"FAQPage", mainEntity:allFaqs.map(f=>({ "@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a} })) };
  const bg = dark?"var(--navy)":"var(--cream)";
  const hc = dark?"var(--light)":"var(--navy)";
  const ac = dark?"rgba(255,255,255,0.48)":"var(--slate)";
  const bc = dark?"rgba(255,255,255,0.06)":"rgba(42,45,53,0.08)";
  const renderItem = (faq:FAQItem, i:number, isLast:boolean)=>(
    <div key={i} style={{ borderBottom:isLast?"none":`1px solid ${bc}` }}>
      <button className="faq-btn" onClick={()=>setOpen(open===i?null:i)}>
        <span style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:600,color:hc,lineHeight:1.4,textAlign:"left" }}>{faq.q}</span>
        <span className={`faq-icon ${open===i?"open":""}`}>+</span>
      </button>
      <div className={`faq-answer ${open===i?"open":""}`}>
        <div className="faq-answer-inner" style={{ color:ac }}>{faq.a}</div>
      </div>
    </div>
  );
  return (
    <section style={{ background:bg,padding:"60px 32px",position:"relative" }}>
      <JsonLd data={schema} />
      {dark && <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(ellipse 60% 40% at 50% 100%,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />}
      <div style={{ maxWidth:860,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{ marginBottom:48 }}>
          <span className="v-line" style={{ background:"linear-gradient(90deg,var(--gold),var(--gold-lt))" }} />
          <p className="eyebrow" style={{ marginBottom:14 }}>FAQ</p>
          <h2 className="heading-lg" style={{ color:hc }}>{title||"Questions We Hear Most Often"}</h2>
        </div>
        <div style={{ border:`1px solid ${bc}` }}>
          {groups ? groups.map((g,gi)=>{
            const offset = groups.slice(0,gi).reduce((s,x)=>s+x.faqs.length,0);
            return (
              <div key={gi}>
                <div style={{ padding:"18px 28px 10px",background:dark?"rgba(255,255,255,0.02)":"rgba(42,45,53,0.03)",borderBottom:`1px solid ${bc}` }}>
                  <p style={{ fontFamily:"var(--t-head)",fontSize:10.5,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:dark?"var(--gold-lt)":"var(--gold-dk)",margin:0 }}>
                    {g.icon?`${g.icon}  `:""}{g.label}
                  </p>
                </div>
                {g.faqs.map((faq,fi)=>renderItem(faq,offset+fi,offset+fi===allFaqs.length-1))}
              </div>
            );
          }) : faqs.map((faq,i)=>renderItem(faq,i,i===faqs.length-1))}
        </div>
      </div>
    </section>
  );
}
