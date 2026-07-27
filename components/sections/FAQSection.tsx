"use client";
import { useState } from "react";
import JsonLd from "@/components/seo/JsonLd";
export interface FAQItem { q:string; a:string; }
export default function FAQSection({ faqs, title, dark=true }:{ faqs:FAQItem[]; title?:string; dark?:boolean }) {
  const [open, setOpen] = useState<number|null>(null);
  const schema = { "@context":"https://schema.org","@type":"FAQPage", mainEntity:faqs.map(f=>({ "@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a} })) };
  const bg = dark?"var(--navy)":"var(--cream)";
  const hc = dark?"var(--light)":"var(--navy)";
  const ac = dark?"rgba(255,255,255,0.48)":"var(--slate)";
  const bc = dark?"rgba(255,255,255,0.06)":"rgba(42,45,53,0.08)";
  return (
    <section style={{ background:bg,padding:"96px 32px",position:"relative" }}>
      <JsonLd data={schema} />
      {dark && <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(ellipse 60% 40% at 50% 100%,rgba(184,146,42,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />}
      <div style={{ maxWidth:860,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{ marginBottom:48 }}>
          <span className="v-line" style={{ background:"linear-gradient(90deg,var(--gold),var(--gold-lt))" }} />
          <p className="eyebrow" style={{ marginBottom:14 }}>FAQ</p>
          <h2 className="heading-lg" style={{ color:hc }}>{title||"Questions We Hear Most Often"}</h2>
        </div>
        <div style={{ border:`1px solid ${bc}` }}>
          {faqs.map((faq,i)=>(
            <div key={i} style={{ borderBottom:i<faqs.length-1?`1px solid ${bc}`:"none" }}>
              <button className="faq-btn" onClick={()=>setOpen(open===i?null:i)}>
                <span style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:600,color:hc,lineHeight:1.4,textAlign:"left" }}>{faq.q}</span>
                <span className={`faq-icon ${open===i?"open":""}`}>+</span>
              </button>
              <div className={`faq-answer ${open===i?"open":""}`}>
                <div className="faq-answer-inner" style={{ color:ac }}>{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
