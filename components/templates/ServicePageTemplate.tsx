import Link from "next/link";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";

export interface ServicePageContent {
  slug:string; eyebrow:string; h1:string; h1Accent?:string;
  intro:string; includedTitle?:string; included:string[];
  whoForTitle?:string; whoFor:string[]; faqs:FAQItem[]; ctaLabel:string;
}

export default function ServicePageTemplate({ content }:{ content:ServicePageContent }) {
  return (
    <>
      <JsonLd data={{"@context":"https://schema.org","@type":"Service",name:content.h1+(content.h1Accent?" "+content.h1Accent:""),provider:{"@id":"https://www.vedharagroup.com/#organization"},areaServed:{"@type":"City","name":"Delhi NCR"},description:content.intro}} />
      <section className="page-hero animated-gradient" style={{ textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,0.07) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:800,margin:"0 auto",position:"relative",zIndex:1 }}>
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>{content.eyebrow}</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"#FCFAF4",lineHeight:1.05,marginBottom:24 }}>
            {content.h1}{content.h1Accent && <><br /><span style={{ color:"var(--gold-lt)" }}>{content.h1Accent}</span></>}
          </h1>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.52)",maxWidth:580,margin:"0 auto" }}>{content.intro}</p>
        </div>
      </section>
      <section style={{ background:"var(--cream)",padding:"96px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64 }} className="grid-2">
          <ScrollReveal>
            <div>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>{content.includedTitle||"What's Included"}</p>
              <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:24 }}>{content.includedTitle||"What's Included"}</h2>
              {content.included.map(item=>(
                <div key={item} style={{ display:"flex",gap:12,marginBottom:14 }}>
                  <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2 }}>—</span>
                  <span className="body-md" style={{ color:"var(--slate)" }}>{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120} direction="right">
            <div>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>{content.whoForTitle||"Who This Is For"}</p>
              <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:24 }}>{content.whoForTitle||"Who This Is For"}</h2>
              {content.whoFor.map(item=>(
                <div key={item} style={{ display:"flex",gap:12,marginBottom:14 }}>
                  <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2 }}>—</span>
                  <span className="body-md" style={{ color:"var(--slate)" }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop:36,paddingTop:28,borderTop:"1px solid rgba(42,45,53,0.08)" }}>
                <Link href="/contact" className="btn btn-dark">{content.ctaLabel} →</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <FAQSection faqs={content.faqs} />
    </>
  );
}
