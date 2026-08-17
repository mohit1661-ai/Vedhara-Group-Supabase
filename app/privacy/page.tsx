import type { Metadata } from "next";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:"Privacy Policy",
  description:"How Vedhara Group collects, uses and protects your data across North India real estate advisory and NRI services. We never sell your data.",
  alternates:{ canonical:"https://www.vedharagroup.com/privacy" },
};

const sections = [
  {
    id:"collect",
    title:"Information We Collect",
    body:"We collect only the information needed to respond to your enquiries and deliver our advisory, brokerage, and NRI services. We never sell your personal data to third parties.",
    bullets:[
      "Information you provide directly, such as your name, phone number, email address, budget, and property preferences when you submit a consultation or contact request.",
      "Analytics and technical data, including pages visited, device type, browser, referral source, and approximate location, used to improve the website experience.",
      "Property-related documents and preferences when you engage us for specific services, such as NRI purchase support or portfolio review.",
      "Records of communication, including calls, emails, and WhatsApp conversations, so we can maintain an accurate service history.",
    ],
  },
  {
    id:"use",
    title:"How We Use Your Information",
    body:"Every use of your data is tied to delivering a service you asked for or complying with the law. We do not repurpose your information for unrelated marketing without your consent.",
    bullets:[
      "Responding to consultation requests, enquiries, and service follow-ups.",
      "Delivering advisory, brokerage, rental, and property-management services you request.",
      "Improving the website through aggregated analytics and user behaviour insights.",
      "Sending service-related communications and, with your consent, periodic market insights such as the Ground Report.",
      "Meeting legal, regulatory, and fraud-prevention obligations.",
    ],
  },
  {
    id:"storage",
    title:"Data Storage & Security",
    body:"Your data is stored on encrypted servers with access restricted to authorised team members who need it to serve you. We apply industry-standard safeguards to protect your information.",
    bullets:[
      "Contact-form and enquiry data is retained for a maximum of two years, or until you request deletion.",
      "Transaction-related records may be retained longer to comply with legal and regulatory obligations.",
      "Access to personal data is limited to staff handling your engagement, under confidentiality commitments.",
    ],
  },
  {
    id:"sharing",
    title:"Third-Party Sharing",
    body:"We share your data only where necessary to deliver our services or comply with the law. We never sell, rent, or trade personal information.",
    bullets:[
      "Service providers such as CRM, email-delivery, and analytics platforms process data on our behalf under strict confidentiality agreements.",
      "We do not share data with developers, builders, or third-party marketers without your explicit consent.",
      "We may disclose information where required by law, regulation, or legal process.",
    ],
  },
  {
    id:"rights",
    title:"Your Rights & Choices",
    body:"You remain in control of your personal data. Contact us at any time to exercise your rights, and we will respond promptly.",
    bullets:[
      "Request access to the personal data we hold about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of your data, subject to legal retention obligations.",
      "Withdraw consent for marketing communications at any time.",
    ],
  },
  {
    id:"contact",
    title:"Contact & Data Requests",
    body:"For any privacy-related query, data request, or concern, reach out to our team and we will respond within a reasonable time.",
    bullets:[
      "Email: contact@vedharagroup.com",
      "Phone and WhatsApp: +91 98106 47063",
      "Office: Vedhara Group, Delhi NCR, India",
    ],
  },
];

const faqs = [
  { q:"Does Vedhara Group sell my personal data?", a:"No. Vedhara Group does not sell, rent, or trade personal information to third parties. Data is shared only with service providers who process it on our behalf under confidentiality agreements, or where required by law." },
  { q:"How long does Vedhara keep my information?", a:"Enquiry and contact-form data is retained for a maximum of two years, or until you request deletion. Transaction-related records may be kept longer to comply with legal and regulatory obligations." },
  { q:"Can I see what data Vedhara holds about me?", a:"Yes. You may request a copy of the personal data we hold by emailing contact@vedharagroup.com. We will respond promptly and, where required, correct or delete the data." },
  { q:"How do I opt out of marketing communications?", a:"You can withdraw consent for marketing communications at any time by replying to any message, using the unsubscribe link, or emailing contact@vedharagroup.com. Service-related communications will still be sent where required." },
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

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={schema} />
      <VideoHeroSection
        videoSrc="/videos/Homepage%20Hero%20Video%20Real%20Estate%20Advisory%20in%20Gurgaon%20Delhi%20NCR.mp4?v=2#t=0"
        videoSrcMobile="/videos/Homepage%20Hero%20Video%20Real%20Estate%20Advisory%20in%20Gurgaon%20Delhi%20NCR.mp4?v=2#t=0"
        poster="/hero-poster.jpg"
        posterAlt="Vedhara Group brand film behind the privacy policy"
      >
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Legal &amp; Compliance</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(28px,4.5vw,52px)",color:"var(--light)",lineHeight:1.12,maxWidth:880,margin:"0 auto 20px" }}>
          Privacy Policy
        </h1>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,flexWrap:"wrap",marginBottom:16 }}>
          <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 12px",borderRadius:20,background:"rgba(212,168,67,0.15)",color:"var(--gold-lt)",border:"1px solid rgba(212,168,67,0.4)" }}>Last Updated · July 2026</span>
          <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 12px",borderRadius:20,background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.85)",border:"1px solid rgba(255,255,255,0.2)" }}>Applies to vedharagroup.com</span>
        </div>
        <p className="body-sm" style={{ color:"rgba(255,255,255,0.7)",margin:"0 auto",maxWidth:520 }}>
          A plain-language explanation of what data we collect, why we collect it,<br />and the rights you hold over it.
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
            <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>Your Privacy Matters</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              How We Handle <br className="br-desktop" /><span style={{ color:"var(--gold-ink)" }}>Your Data</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              Vedhara Group respects your privacy. This policy explains what we collect and how we use it.<br className="br-desktop" />How we protect it, and the rights you hold over it. Wherever you are, we handle your data transparently and securely.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* What this policy covers – vibrant cream cards on navy */}
      <section style={{ background:"var(--navy)",padding:"56px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:12 }}>What This Policy Covers</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:12 }}>
                Six Areas,<br /><span style={{ color:"var(--gold-lt)" }}>Explained Transparently</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:620,margin:"0 auto" }}>
                Each section below sets out exactly how your information is handled.<br className="br-desktop" />Tap a card to jump straight to that section.
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
                  <p style={{ fontFamily:"var(--t-head)",fontSize:10.5,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:14 }}>In Plain Terms</p>
                  {sec.id === "contact" ? (
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
                  ) : (
                    sec.bullets.map((item,bi)=>(
                      <div key={bi} style={{ display:"flex",alignItems:"flex-start",gap:12,marginBottom:10 }}>
                        <span style={{ color:"var(--gold-lt)",flexShrink:0,marginTop:2,fontSize:14,lineHeight:1 }}>◆</span>
                        <p className="body-md" style={{ color:"rgba(252,250,244,0.85)",lineHeight:1.7,margin:0 }}>{item}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Our commitment – vibrant cream ✓ cards on navy */}
      <section style={{ background:"var(--navy)",padding:"56px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:12 }}>Our Commitment</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:12 }}>
                What We <span style={{ color:"var(--gold-lt)" }}>Promise You</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:600,margin:"0 auto" }}>
                Four commitments that guide every decision we make with your data.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20 }} className="grid-2">
            {[
              "We never sell your personal information to third parties.",
              "We only collect data needed to serve you or comply with the law.",
              "We protect your data with encryption and restricted access.",
              "You can access, correct, or delete your data whenever you choose.",
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

      <FAQSection title="Privacy Policy, FAQ" faqs={faqs} dark={false} decor />

      <CTASection />
    </>
  );
}
