import Link from "next/link";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoHeroSection from "@/components/sections/VideoHeroSection";

export interface ServicePageContent {
  slug:string; eyebrow:string; h1:string; h1Accent?:string;
  intro:string; includedTitle?:string; included:string[];
  whoForTitle?:string; whoFor:string[]; faqs:FAQItem[]; ctaLabel:string;
}

export default function ServicePageTemplate({ content, videoSrc, hideFAQ }:{ content:ServicePageContent; videoSrc?:string; hideFAQ?:boolean }) {
  return (
    <>
      <JsonLd data={{"@context":"https://schema.org","@type":"Service",name:content.h1+(content.h1Accent?" "+content.h1Accent:""),provider:{"@id":"https://www.vedharagroup.com/#organization"},areaServed:{"@type":"City","name":"Delhi NCR"},description:content.intro}} />
      <VideoHeroSection videoSrc={videoSrc}>
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>{content.eyebrow}</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(36px,6.5vw,80px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          {content.h1}{content.h1Accent && <><br /><span style={{ color:"var(--gold-lt)" }}>{content.h1Accent}</span></>}
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>{content.intro}</p>
      </VideoHeroSection>
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
          
          {/* What's Included — Navy card with gold frame */}
          <ScrollReveal>
            <div className="gold-frame-card gfc-navy" style={{ padding:"44px 36px",boxShadow:"0 16px 40px rgba(9,15,29,0.2)" }}>
              <span className="v-line" style={{ background:"var(--gold)" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>{content.includedTitle||"What's Included"}</p>
              <h2 className="heading-lg" style={{ color:"var(--light)",marginBottom:24 }}>{content.includedTitle||"What's Included"}</h2>
              {content.included.map(item=>(
                <div key={item} style={{ display:"flex",gap:14,marginBottom:16,alignItems:"flex-start" }}>
                  <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:16,fontWeight:700,lineHeight:1 }}>✓</span>
                  <span className="body-md" style={{ color:"rgba(252,250,244,0.78)",lineHeight:1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Who This Is For — Cream card with gold frame */}
          <ScrollReveal delay={120} direction="right">
            <div className="gold-frame-card gfc-cream" style={{ padding:"44px 36px",boxShadow:"0 8px 24px rgba(9,15,29,0.06)" }}>
              <span className="v-line" style={{ background:"var(--gold)" }} />
              <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>{content.whoForTitle||"Who This Is For"}</p>
              <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:24 }}>{content.whoForTitle||"Who This Is For"}</h2>
              {content.whoFor.map(item=>(
                <div key={item} style={{ display:"flex",gap:14,marginBottom:16,alignItems:"flex-start" }}>
                  <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:14,lineHeight:1 }}>◆</span>
                  <span className="body-md" style={{ color:"var(--slate)",lineHeight:1.7 }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop:32,paddingTop:24,borderTop:"1px solid rgba(212,168,67,0.2)" }}>
                <Link href="/contact" className="btn btn-dark">{content.ctaLabel} →</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      {!hideFAQ && <><CTASection /><FAQSection faqs={content.faqs} /></>}
    </>
  );
}
