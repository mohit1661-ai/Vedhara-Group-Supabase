"use client";
import { useState } from "react";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";

const interests = [
  "Buy Property","Sell Property","Rent / Lease","Commercial Real Estate",
  "Investment Advisory","NRI Services","Property Management","Luxury Properties","General Enquiry",
];

export default function ContactPage() {
  const [form, setForm] = useState({ fullName:"",phone:"",email:"",interest:"",message:"",timezone:"" });
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");
  const up = (k:string,v:string) => setForm(p=>({...p,[k]:v}));

  const submit = async (e:React.FormEvent) => {
    e.preventDefault(); setStatus("submitting");
    try {
      const res = await fetch("/api/consultation",{ method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,interestArea:form.interest.toLowerCase().replace(/\s+/g,"_"),sourcePage:"/contact"}) });
      setStatus(res.ok?"success":"error");
    } catch { setStatus("error"); }
  };

  if (status==="success") return (
    <section className="page-hero animated-gradient" style={{ minHeight:"60vh",display:"flex",alignItems:"center",textAlign:"center" }}>
      <div style={{ maxWidth:540,margin:"0 auto" }}>
        <div className="gold-accent-sm" style={{margin:"0 auto 20px",width:40}}></div>
        <h1 className="heading-xl" style={{ color:"var(--light)",marginBottom:14,lineHeight:1.1 }}>Thank you for reaching out</h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)" }}>A Vedhara advisor will contact you within 24 hours. No sales pitch, just a conversation about what you are trying to achieve.</p>
      </div>
    </section>
  );

  return (
    <>
      <JsonLd data={{ "@context":"https://schema.org","@type":"ContactPage",name:"Contact Vedhara Group",url:"https://www.vedharagroup.com/contact",mainEntity:{"@id":"https://www.vedharagroup.com/#organization"} }} />

      <VideoHeroSection videoSrc="/videos/Property%20Real%20Estate%20Contact.mp4">
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>Get In Touch</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
            Let&apos;s Start With<br /><span style={{ color:"var(--gold-lt)" }}>an Honest Conversation.</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:620,margin:"0 auto" }}>
            No pitch, no pressure. Whether you&apos;re buying a 1BHK in Ghaziabad or a luxury penthouse in Gurugram, every consultation starts the same way: we listen, understand your goals, and tell you honestly how we can help.
          </p>
      </VideoHeroSection>

      {/* Main Section */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"flex-start" }} className="grid-2">

          {/* INFO SIDE */}
          <ScrollReveal>
            <div>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>What to Expect</p>
              <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:28 }}>Your First Consultation</h2>

              {/* Details grid */}
              <div className="contact-details" style={{ marginBottom:36 }}>
                {[
                  { label:"Duration",  val:"30–45 minutes (phone or video call)" },
                  { label:"Format",    val:"Your advisor leads with questions about your goals, budget, timeline, and location preferences — not a property pitch" },
                  { label:"Output",    val:"A written summary of your requirements, recommended next steps, and a realistic assessment of what is achievable in your budget across Delhi NCR" },
                  { label:"Cost",      val:"Free, with no obligation to proceed" },
                ].map(item=>(
                  <div key={item.label} className="contact-detail-row">
                    <span className="eyebrow" style={{ color:"var(--gold)",minWidth:90 }}>{item.label}</span>
                    <span className="body-sm" style={{ color:"var(--slate)" }}>{item.val}</span>
                  </div>
                ))}
              </div>

              {/* How to Reach Us - Cards */}
              <p className="eyebrow" style={{ marginBottom:16 }}>How to Reach Us</p>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }} className="grid-2">
                {[
                  { icon:"C",  label:"Call",      val:"+91 98106 47063",       href:"tel:+919810647063", grad:"linear-gradient(135deg,#0F1E38,#1a3a5c)" },
                  { icon:"W",  label:"WhatsApp",  val:"Chat with us instantly", href:"https://wa.me/919810647063?text=Hello%20Vedhara%20Group", grad:"linear-gradient(135deg,#0F1E38,#D4A843)" },
                  { icon:"E",  label:"Email",     val:"contact@vedharagroup.com", href:"mailto:contact@vedharagroup.com", grad:"linear-gradient(135deg,#0F1E38,#2a3f6f)" },
                ].map(item=>(
                  <a key={item.label} href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                    className="cta-card"
                    style={{ display:"flex",flexDirection:"column",padding:"16px 18px",textDecoration:"none",background:"var(--cream)",border:"1px solid rgba(42,45,53,0.06)",position:"relative",overflow:"hidden",transition:"all 0.35s var(--ease-out)" }}>
                    {/* Gradient top bar */}
                    <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:item.grad }} />
                    <span className="eyebrow" style={{ color:"var(--gold)",marginBottom:4,fontSize:10 }}>{item.label}</span>
                    <span className="body-sm" style={{ color:"var(--ink)",fontWeight:500 }}>{item.val}</span>
                  </a>
                ))}
              </div>

              {/* NRI Box */}
              <div style={{ display:"flex",alignItems:"flex-start",gap:14,marginTop:28,padding:"18px 22px",background:"var(--navy)",border:"1px solid rgba(212,168,67,0.25)",borderRadius:8 }}>
                <span style={{ fontSize:18,flexShrink:0,color:"var(--gold-lt)" }}>ⓘ</span>
                <div>
                  <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:4 }}>NRI Clients</p>
                  <p className="body-sm" style={{ color:"rgba(252,250,244,0.65)",margin:0,lineHeight:1.65 }}>Weekend slots available: Saturday & Sunday, 10AM–4PM IST. Tell us your time zone and we&apos;ll schedule around you.</p>
                </div>
              </div>

              {/* Service Tags */}
              <div style={{ marginTop:24 }}>
                <p className="eyebrow" style={{ marginBottom:12 }}>Services You Can Enquire About</p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                  {["Buy Property","Sell Property","Rent Property","Commercial","Investment Advisory","NRI Services","Property Management","Market Research"].map(s=>{
                    const slugs:Record<string,string> = {
                      "Buy Property":"/buy",
                      "Sell Property":"/sell",
                      "Rent Property":"/rent",
                      "Commercial":"/commercial",
                      "Investment Advisory":"/investment-advisory",
                      "NRI Services":"/nri-services",
                      "Property Management":"/property-management",
                      "Market Research":"/market-insights",
                    };
                    return (
                      <Link key={s} href={slugs[s]||"/"} className="service-tag">{s}</Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* FORM SIDE */}
          <ScrollReveal delay={120} direction="right">
            <div className="form-card" style={{ background:"var(--cream)",border:"1px solid rgba(42,45,53,0.08)",padding:"40px 36px",position:"relative",boxShadow:"0 8px 32px rgba(9,15,29,0.08)" }}>
              {/* Gold top accent */}
              <div style={{ position:"absolute",top:0,left:36,right:36,height:2.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.5 }} />
              <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:24 }}>Book Your Free Consultation</h2>
              <form onSubmit={submit} style={{ display:"flex",flexDirection:"column",gap:18 }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }} className="grid-2">
                  <div>
                    <label className="input-label">Full Name <span style={{ color:"var(--gold)" }}>*</span></label>
                    <input type="text" required value={form.fullName} onChange={e=>up("fullName",e.target.value)} className="input-field" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="input-label">Phone <span style={{ color:"var(--gold)" }}>*</span></label>
                    <input type="tel" required value={form.phone} onChange={e=>up("phone",e.target.value)} className="input-field" placeholder="+91 or country code" />
                  </div>
                </div>
                <div>
                  <label className="input-label">Email Address</label>
                  <input type="email" value={form.email} onChange={e=>up("email",e.target.value)} className="input-field" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="input-label">I Am Interested In <span style={{ color:"var(--gold)" }}>*</span></label>
                  <select required value={form.interest} onChange={e=>up("interest",e.target.value)} className="input-field">
                    <option value="">Select a service…</option>
                    {interests.map(i=><option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="input-label">Time Zone (NRI clients)</label>
                  <input type="text" value={form.timezone} onChange={e=>up("timezone",e.target.value)} className="input-field" placeholder="e.g. UAE, GMT+4 / UK, BST" />
                </div>
                <div>
                  <label className="input-label">Message (optional)</label>
                  <textarea rows={4} value={form.message} onChange={e=>up("message",e.target.value)} className="input-field" placeholder="Tell us about your property goals…" style={{ resize:"none" }} />
                </div>
                <button type="submit" disabled={status==="submitting"} className="btn btn-dark" style={{ width:"100%",justifyContent:"center",opacity:status==="submitting"?0.6:1 }}>
                  {status==="submitting"?"Sending…":"Book a Free Consultation"}
                </button>
                {status==="error" && <p className="body-sm" style={{ color:"#B23A3A",textAlign:"center" }}>Something went wrong; please try WhatsApp or call us directly.</p>}
                <p className="caption" style={{ color:"var(--slate)",textAlign:"center" }}>We respond within 24 hours during business hours. No spam, ever.</p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .contact-detail-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 12px;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(42,45,53,0.06);
        }
        .cta-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 10px 30px rgba(9,15,29,0.12) !important;
          border-color: rgba(212,168,67,0.2) !important;
        }
        .service-tag {
          font-family: var(--t-head);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--slate);
          border: 1px solid rgba(42,45,53,0.12);
          padding: 4px 8px;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .service-tag:hover {
          border-color: var(--gold);
          color: var(--gold-dk);
        }
        @media(max-width:700px){
          .contact-detail-row {
            grid-template-columns: 1fr !important;
            gap: 4px;
          }
        }
      `}</style>
    </>
  );
}
