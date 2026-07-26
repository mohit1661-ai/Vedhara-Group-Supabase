import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";
import VideoHeroSection from "@/components/sections/VideoHeroSection";

export const metadata: Metadata = {
  title:"NRI Property Advisory in India | Buy, Sell & Manage from Abroad | Vedhara Group Delhi NCR",
  description:"NRI property services for Indian diaspora in UAE, UK, USA, Canada & Singapore. Buy, sell, or manage property in Delhi NCR remotely, video consultations, verified due diligence, e-signature documentation.",
  alternates:{ canonical:"https://www.vedharagroup.com/nri-services" },
};

const commitments = [
  { icon:"S", n:"01", title:"Weekend & Evening IST Slots", desc:"Saturday and Sunday, 10AM–4PM IST, plus weekday evening slots. We schedule around your time zone, not ours.", grad:"linear-gradient(135deg,#0F1E38,#1a3a5c)" },
  { icon:"V", n:"02", title:"On-Demand Video Walkthroughs", desc:"Shortlisted properties available for live or recorded video walkthroughs within 48 hours of request. You see the property, the surroundings, the society entrance, and the documentation.", grad:"linear-gradient(135deg,#0F1E38,#B8922A)" },
  { icon:"✓", n:"03", title:"Independent Verification", desc:"RERA check, builder history, approvals, title documents, all completed before you are asked to make a booking payment.", grad:"linear-gradient(135deg,#0F1E38,#2a3f6f)" },
  { icon:"E", n:"04", title:"E-Signature & Digital Documentation", desc:"Sale agreements, token money receipts, and most pre-registration documents can be handled digitally. We guide you through what specifically requires physical presence or a registered POA.", grad:"linear-gradient(135deg,#0F1E38,#3a6a8f)" },
  { icon:"L", n:"05", title:"FEMA & RBI Compliance Guidance", desc:"Every NRI transaction structured to comply with FEMA property acquisition regulations, NRO/NRE account routing, and TDS deduction requirements under Section 195.", grad:"linear-gradient(135deg,#0F1E38,#4a7a9f)" },
  { icon:"A", n:"06", title:"Dedicated Single Advisor", desc:"One named advisor. Their direct number. No re-explaining your requirements every time. Not a call centre, not a rotating team.", grad:"linear-gradient(135deg,#0F1E38,#5a6070)" },
];

const countries = [
  { flag:"U",  name:"UAE",            cities:"Dubai, Abu Dhabi, Sharjah", grad:"linear-gradient(135deg,#0F1E38,#B8922A)" },
  { flag:"UK", name:"United Kingdom", cities:"London, Birmingham, Manchester", grad:"linear-gradient(135deg,#0F1E38,#1a3a5c)" },
  { flag:"US", name:"United States",  cities:"New York, New Jersey, Texas, California", grad:"linear-gradient(135deg,#0F1E38,#2a3f6f)" },
  { flag:"CA", name:"Canada",         cities:"Toronto, Vancouver, Calgary", grad:"linear-gradient(135deg,#0F1E38,#3a6a8f)" },
  { flag:"SG", name:"Singapore",      cities:"All districts", grad:"linear-gradient(135deg,#0F1E38,#4a7a9f)" },
  { flag:"AU", name:"Australia",      cities:"Melbourne, Sydney, Brisbane", grad:"linear-gradient(135deg,#0F1E38,#5a6070)" },
];

const legalPoints = [
  "NRIs and PIOs can purchase residential and commercial property in India without RBI approval",
  "Agricultural land, plantation property, and farmhouses generally cannot be purchased by NRIs under FEMA without specific RBI permission",
  "Purchase consideration must flow through NRE or NRO banking channels, or via direct foreign inward remittance",
  "TDS at 20% (long-term capital gain, property held more than 24 months) or 30% (short-term) is deductible by the buyer when purchasing from an NRI seller",
  "A registered Power of Attorney issued at the Indian embassy or notarised and apostilled in your country of residence can authorise a representative in India to complete most transaction steps on your behalf",
];

const faqs = [
  { q:"Can an NRI buy property in Delhi NCR without visiting India?", a:"In most cases, yes. With a registered Power of Attorney and digital documentation support, the majority of the buying process can be completed remotely. The physical presence requirement is primarily at sub-registrar registration; this can be handled by a POA holder in India. Vedhara guides NRI clients through exactly what requires physical presence versus what can be completed digitally." },
  { q:"What type of bank account should an NRI use to purchase property in India?", a:"Property purchase consideration must flow through NRE (Non-Resident External) or NRO (Non-Resident Ordinary) bank accounts, or via direct foreign inward remittance. Repatriation of sale proceeds is allowed from NRE accounts without restriction. NRO account repatriation has a cap of USD 1 million per financial year." },
  { q:"Is TDS applicable when an NRI sells property in India?", a:"Yes. Under Section 195 of the Income Tax Act, the buyer is required to deduct TDS at 20% on long-term capital gain (property held for more than 24 months) or 30% on short-term gain on the sale consideration paid to an NRI seller. The NRI seller can apply for a lower TDS certificate from the Income Tax Department if their actual tax liability is lower." },
  { q:"How does Vedhara handle NRI property management in Delhi NCR?", a:"Vedhara's Property Management service handles tenant sourcing and screening, rent collection and transfer to your NRO/NRE bank account, maintenance coordination, and periodic video condition reports, all managed remotely so NRI owners maintain visibility over their Indian assets without requiring travel." },
  { q:"What time zones do your NRI consultations support?", a:"Our NRI desk offers weekend slots (Saturday and Sunday, 10AM–4PM IST) and weekday evening slots to accommodate clients across UAE/Gulf (GMT+4), UK (GMT/BST), North America (EST/CST/PST), and APAC time zones." },
];

export default function NRIServicesPage() {
  return (
    <>
      <JsonLd data={{ "@context":"https://schema.org","@type":"Service",name:"NRI Property Investment Advisory",provider:{"@id":"https://www.vedharagroup.com/#organization"},areaServed:["AE","GB","US","CA","SG","AU"] }} />

      <VideoHeroSection videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20NRI%20Desk%20Page%20Video.mp4">
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>NRI Property Services</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(36px,6.5vw,80px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          Managing Property in India<br />from the UAE, UK, USA,<br /><span style={{ color:"var(--gold-lt)" }}>Canada, or Singapore?</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(252,250,244,0.72)",maxWidth:580,margin:"0 auto 28px" }}>
          Distance shouldn&apos;t mean doubt. Vedhara&apos;s NRI desk offers weekend and evening IST consultations, on-demand video walkthroughs within 48 hours, and e-signature documentation support, so you can make a verified property decision in India without buying a flight ticket.
        </p>
        <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
          <Link href="/contact" className="btn btn-primary">Book a Weekend Video Consultation</Link>
          <a href="https://wa.me/919810647063" target="_blank" rel="noopener noreferrer" className="btn" style={{ background:"#FFFFFF",color:"var(--ink)",border:"1px solid rgba(42,45,53,0.12)" }}>WhatsApp NRI Desk</a>
        </div>
      </VideoHeroSection>

      {/* Commitments */}
      <section style={{ background:"var(--cream)",padding:"96px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ marginBottom:52 }}>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>Six Commitments to Every NRI Client</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>What Every NRI Client Receives, <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold)" }}>By Default</em></h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-3">
            {commitments.map((c,i)=>(
              <ScrollReveal key={c.n} delay={i*70}>
                <div className="svc-card" style={{ background:"var(--cream)",borderRadius:0 }}>
                  <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:14 }}>
                    <div className="gold-accent" style={{width:24,height:2,margin:0}}></div>
                    <span className="eyebrow" style={{ color:"var(--gold)" }}>{c.n}</span>
                  </div>
                  <h3 className="svc-card-title">{c.title}</h3>
                  <p className="svc-card-desc">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section style={{ background:"var(--navy)",padding:"80px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <h2 className="heading-xl" style={{ color:"var(--light)",lineHeight:1.1 }}>Serving Indian Diaspora Across <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold-lt)" }}>Six Countries</em></h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:1,background:"rgba(184,146,42,0.1)" }} className="grid-6">
            {countries.map((c,i)=>(
              <ScrollReveal key={c.name} delay={i*60}>
                <div className="glass hover-lift" style={{ textAlign:"center",padding:"28px 16px" }}>
                  <div className="gold-accent-sm" style={{margin:"0 auto 10px"}}></div>
                  <div className="body-sm" style={{ fontWeight:600,color:"var(--light)",marginBottom:4 }}>{c.name}</div>
                  <div style={{ fontFamily:"var(--t-body)",fontSize:10.5,color:"rgba(255,255,255,0.3)" }}>{c.cities}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section style={{ background:"var(--cream)",padding:"80px 32px" }}>
        <div style={{ maxWidth:920,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ marginBottom:36 }}>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>NRI Legal Framework, Key Points</p>
              <h2 className="heading-lg" style={{ color:"var(--navy)",lineHeight:1.15 }}>Key Legal Points for NRI Property Transactions in India</h2>
            </div>
          </ScrollReveal>
          {legalPoints.map((pt,i)=>(
            <ScrollReveal key={i} delay={i*60}>
              <div style={{ display:"flex",gap:16,paddingBottom:16,marginBottom:16,borderBottom:i<legalPoints.length-1?"1px solid rgba(42,45,53,0.06)":"none" }}>
                <span style={{ width:24,height:24,borderRadius:"50%",background:"rgba(184,146,42,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,color:"var(--gold)",fontWeight:700 }}>{i+1}</span>
                <span className="body-md" style={{ color:"var(--slate)" }}>{pt}</span>
              </div>
            </ScrollReveal>
          ))}
          <div style={{ background:"rgba(184,146,42,0.06)",border:"1px solid rgba(184,146,42,0.15)",padding:"16px 20px",marginTop:20 }}>
            <p className="body-sm" style={{ color:"var(--slate)",margin:0 }}>The above is general guidance only. FEMA regulations are subject to RBI updates and individual circumstances vary. Vedhara coordinates with qualified CA and legal advisors for transaction-specific compliance.</p>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="NRI Property Services FAQ" />
    </>
  );
}
