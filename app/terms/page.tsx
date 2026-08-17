import type { Metadata } from "next";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:"Terms & Conditions",
  description:"Terms for using the Vedhara Group website, calculators and advisory services across Delhi NCR and North India. Clear guidance on liability and responsibilities.",
  alternates:{ canonical:"https://www.vedharagroup.com/terms" },
};

const sections = [
  {
    id:"use",
    title:"Use of This Website",
    body:"By accessing vedharagroup.com you agree to these terms. The information on this site is provided for general guidance only and does not constitute legal, financial, or investment advice.",
    bullets:[
      "Use the site lawfully and do not attempt to disrupt, overload, or gain unauthorised access to our systems.",
      "Information on this site is for general guidance only and is not a substitute for professional advice specific to your situation.",
      "Consult qualified professionals, such as a property lawyer, bank, or registered financial advisor, before making decisions based on this site.",
    ],
  },
  {
    id:"services",
    title:"Advisory Services & Engagements",
    body:"All advisory engagements are governed by a separate service agreement executed between the client and Vedhara Group Pvt. Ltd. The terms on this page apply to website use only and do not supersede individual engagement contracts.",
    bullets:[
      "A signed service agreement defines the scope, fees, and responsibilities of each advisory engagement.",
      "These website terms do not override the specific terms of any client contract.",
      "Engagement outcomes depend on market conditions and client-specific circumstances, and are never guaranteed.",
    ],
  },
  {
    id:"calculators",
    title:"Calculators & Planning Tools",
    body:"The calculators on this site provide planning estimates using standard financial formulas and assumptions. They are for illustrative purposes only and do not constitute a quote, offer, or commitment.",
    bullets:[
      "Calculator outputs are estimates based on assumptions you enter and prevailing market conventions.",
      "Results are not a quote, offer, or commitment from any lender, developer, or advisor.",
      "Always obtain verified numbers from a bank, registered financial advisor, or property lawyer before making decisions.",
    ],
  },
  {
    id:"verification",
    title:"Verification Framework & Listings",
    body:"Vedhara's Verification Framework represents checks conducted at the time of listing. Property status, pricing, and availability may change over time.",
    bullets:[
      "Verification reflects the position at the time the listing was reviewed and published.",
      "Property status, pricing, and availability are subject to change without notice.",
      "We recommend independently verifying critical details, including RERA status, title documents, and approvals, before signing any agreement.",
    ],
  },
  {
    id:"ip",
    title:"Intellectual Property",
    body:"All content on this site, including text, graphics, logos, and tools, is the property of Vedhara Group Pvt. Ltd. and may not be reproduced, distributed, or used without prior written permission.",
    bullets:[
      "Website content, branding, graphics, and tools remain the property of Vedhara Group.",
      "Reproduction, distribution, or commercial use requires prior written permission.",
      "You may share links to our pages, but not copy substantial content without consent.",
    ],
  },
  {
    id:"liability",
    title:"Limitation of Liability",
    body:"Vedhara Group shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of, or reliance on, information provided on this website or through any calculators or tools.",
    bullets:[
      "The website and its tools are provided on an as-is and as-available basis.",
      "We are not liable for decisions made based on website content or calculator outputs.",
      "For legal enquiries or concerns: contact@vedharagroup.com or +91 98106 47063.",
    ],
  },
];

const faqs = [
  { q:"Are these terms a contract for advisory services?", a:"No. These terms apply to website use only. Advisory services are governed by a separate service agreement executed between the client and Vedhara Group, which defines scope, fees, and responsibilities." },
  { q:"Do calculator results guarantee a price or offer?", a:"No. Calculator outputs are illustrative planning estimates based on standard assumptions. They are not a quote, offer, or commitment from any lender, developer, or advisor." },
  { q:"Can I reuse Vedhara's website content?", a:"No. All content on this site is the property of Vedhara Group and may not be reproduced or distributed without prior written permission. You are welcome to link to our pages." },
  { q:"How do I raise a complaint or legal concern?", a:"Contact our team at contact@vedharagroup.com or +91 98106 47063. We will acknowledge your message promptly and work with you to resolve the concern." },
];

const contactCards = [
  { label:"Call",    val:"+91 98106 47063",       href:"tel:+919810647063", grad:"linear-gradient(135deg,#0F1E38,#1a3a5c)" },
  { label:"WhatsApp",val:"Chat with us instantly", href:"https://wa.me/919810647063?text=Hello%20Vedhara%20Group", grad:"linear-gradient(135deg,#0F1E38,#D4A843)" },
  { label:"Email",   val:"contact@vedharagroup.com", href:"mailto:contact@vedharagroup.com", grad:"linear-gradient(135deg,#0F1E38,#2a3f6f)" },
];

const schema = {
  "@context":"https://schema.org",
  "@type":"WebPage",
  name:metadata.title,
  description:metadata.description,
  publisher:{ "@type":"Organization", name:"Vedhara Group" },
  inLanguage:"en",
  dateModified:"2026-07-31",
};

export default function TermsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <VideoHeroSection
        videoSrc="/videos/Homepage%20Hero%20Video%20Real%20Estate%20Advisory%20in%20Gurgaon%20Delhi%20NCR.mp4?v=2#t=0"
        videoSrcMobile="/videos/Homepage%20Hero%20Video%20Real%20Estate%20Advisory%20in%20Gurgaon%20Delhi%20NCR.mp4?v=2#t=0"
        poster="/hero-poster.jpg"
        posterAlt="Vedhara Group brand film behind the terms and conditions"
      >
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Website Terms of Use</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(28px,4.5vw,52px)",color:"var(--light)",lineHeight:1.12,maxWidth:880,margin:"0 auto 20px" }}>
          Terms &amp; Conditions
        </h1>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,flexWrap:"wrap",marginBottom:16 }}>
          <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 12px",borderRadius:20,background:"rgba(212,168,67,0.15)",color:"var(--gold-lt)",border:"1px solid rgba(212,168,67,0.4)" }}>Last Updated · July 2026</span>
          <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 12px",borderRadius:20,background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.85)",border:"1px solid rgba(255,255,255,0.2)" }}>Applies to vedharagroup.com</span>
        </div>
        <p className="body-sm" style={{ color:"rgba(255,255,255,0.7)",margin:"0 auto",maxWidth:520 }}>
          Clear, plain-language terms for using our website,<br className="br-desktop" />calculators, and advisory services.
        </p>
      </VideoHeroSection>

      {/* Gold differentiator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* Intro block */}
      <div style={{ background:"var(--cream)",textAlign:"center",padding:"48px 32px 48px" }}>
        <div style={{ maxWidth:900,margin:"0 auto" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>Website Terms of Use</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Understanding Your <br className="br-desktop" /><span style={{ color:"var(--gold-ink)" }}>Rights &amp; Responsibilities</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              These terms govern your use of our website and its tools. By accessing this site, you agree to the terms below.<br className="br-desktop" />For specific advisory engagements, separate contracts apply. Read carefully to understand your rights and responsibilities.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* What these terms cover – vibrant cream cards on navy */}
      <section style={{ background:"var(--navy)",padding:"56px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:12 }}>What These Terms Cover</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:12 }}>
                Six Sections,<br /><span style={{ color:"var(--gold-lt)" }}>Clearly Defined</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:620,margin:"0 auto" }}>
                Jump to any section below for a plain-language explanation<br className="br-desktop" />of your rights and responsibilities.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }} className="grid-3">
            {sections.map((sec,si)=>(
              <ScrollReveal key={sec.id} delay={si*70} style={{ display:"flex" }}>
                <a href={`#${sec.id}`} style={{ textDecoration:"none",display:"flex",flex:1 }}>
                  <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",cursor:"pointer" }}>
                    <div style={{ height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt),var(--gold))",flexShrink:0 }} />
                    <div style={{ padding:"24px 20px 24px",flex:1,display:"flex",flexDirection:"column",textAlign:"center",alignItems:"center" }}>
                      <div style={{ width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12,flexShrink:0 }}>
                        <span style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)" }}>{si+1}</span>
                      </div>
                      <h3 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:400,fontSize:17,color:"var(--navy)",lineHeight:1.35 }}>{sec.title}</h3>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed sections */}
      <section style={{ background:"var(--cream)",padding:"64px 32px" }}>
        <div style={{ maxWidth:820,margin:"0 auto" }}>
          {sections.map((sec,si)=>(
            <ScrollReveal key={sec.id} delay={si*40}>
              <div id={sec.id} style={{ marginBottom:56,scrollMarginTop:120 }}>
                <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:22 }}>
                  <div style={{ width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <span style={{ fontFamily:"var(--t-head)",fontSize:13,fontWeight:700,color:"var(--navy)" }}>{si+1}</span>
                  </div>
                  <h2 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(24px,3vw,34px)",color:"var(--navy)",lineHeight:1.2,margin:0 }}>
                    {sec.title}
                  </h2>
                </div>
                <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.9,fontSize:15,marginBottom:18 }}>{sec.body}</p>
                <div className="gold-frame-card gfc-navy" style={{ padding:"26px 28px",boxShadow:"0 8px 24px rgba(0,0,0,0.2)" }}>
                  <p style={{ fontFamily:"var(--t-head)",fontSize:10.5,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:14 }}>Key Points</p>
                  {sec.bullets.map((item,bi)=>{
                    if(sec.id==="liability" && bi===sec.bullets.length-1) return null;
                    return (
                      <div key={bi} style={{ display:"flex",alignItems:"flex-start",gap:12,marginBottom:10 }}>
                        <span style={{ color:"var(--gold-lt)",flexShrink:0,marginTop:2,fontSize:14,lineHeight:1 }}>◆</span>
                        <p className="body-md" style={{ color:"rgba(252,250,244,0.85)",lineHeight:1.7,margin:0 }}>{item}</p>
                      </div>
                    );
                  })}
                  {sec.id === "liability" && (
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }} className="grid-2">
                      {contactCards.map(item=>(
                        <a key={item.label} href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                          className="hover-lift"
                          style={{ display:"flex",flexDirection:"column",padding:"16px 18px",textDecoration:"none",background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",position:"relative",overflow:"hidden",transition:"all 0.35s var(--ease-out)" }}>
                          <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:item.grad }} />
                          <span className="eyebrow" style={{ color:"var(--gold)",marginBottom:4,fontSize:10 }}>{item.label}</span>
                          <span className="body-sm" style={{ color:"var(--ink)",fontWeight:500 }}>{item.val}</span>
                        </a>
                      ))}
                      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"16px 18px",background:"rgba(212,168,67,0.05)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:8,minHeight:52 }}>
                        <span style={{ color:"var(--gold-lt)",flexShrink:0,fontSize:14,lineHeight:1 }}>◆</span>
                        <p className="body-md" style={{ color:"rgba(252,250,244,0.85)",lineHeight:1.5,margin:0,fontSize:13 }}>Office: Vedhara Group, Delhi NCR, India</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Your responsibilities – vibrant cream ✓ cards on navy */}
      <section style={{ background:"var(--navy)",padding:"56px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:12 }}>Your Responsibilities</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:12 }}>
                What We <span style={{ color:"var(--gold-lt)" }}>Ask of You</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:600,margin:"0 auto" }}>
                Four simple expectations that keep the website safe,<br className="br-desktop" />accurate, and useful for everyone.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20 }} className="grid-2">
            {[
              "Use the website lawfully and do not attempt unauthorised access.",
              "Treat website content as guidance, and verify critical details independently.",
              "Do not copy or republish substantial content without permission.",
              "Contact us with any questions, complaints, or legal concerns.",
            ].map((item,ti)=>(
              <ScrollReveal key={ti} delay={ti*70} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",alignItems:"center",gap:14,padding:"18px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)" }}>
                  <div style={{ width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <span style={{ fontFamily:"var(--t-head)",fontSize:13,fontWeight:700,color:"var(--navy)" }}>✓</span>
                  </div>
                  <p style={{ fontFamily:"var(--t-head)",fontSize:12.5,fontWeight:600,color:"var(--navy)",lineHeight:1.5,margin:0 }}>{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title="Terms & Conditions, FAQ" faqs={faqs} dark={false} decor />

      <CTASection />
    </>
  );
}
