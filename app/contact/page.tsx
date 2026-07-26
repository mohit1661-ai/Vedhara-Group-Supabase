"use client";
import { useState } from "react";
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
        <div style={{ fontSize:56,marginBottom:20 }}>🙏</div>
        <h1 className="heading-xl" style={{ color:"var(--light)",marginBottom:14,lineHeight:1.1 }}>Thank you for reaching out</h1>
        <p className="body-lg" style={{ color:"rgba(252,250,244,0.55)" }}>A Vedhara advisor will contact you within 24 hours. No sales pitch, just a conversation about what you are trying to achieve.</p>
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
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.52)",maxWidth:500,margin:"0 auto" }}>
            No pitch, no pressure, no pre-qualification for whether your budget is &ldquo;worth our time.&rdquo; Whether you are considering buying a 1BHK in Ghaziabad or a luxury penthouse in Gurugram, every consultation begins the same way: we listen, we understand what you are trying to achieve, and we tell you honestly how we can help.
          </p>
      </VideoHeroSection>

      <section style={{ background:"var(--cream)",padding:"96px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"flex-start" }} className="grid-2">

          {/* INFO SIDE */}
          <ScrollReveal>
            <div>
              <span className="v-line" />
              <p className="eyebrow" style={{ marginBottom:14 }}>What to Expect From Your First Consultation</p>
              <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:24 }}>Your First Consultation</h2>

              {[
                { label:"Duration",  val:"30–45 minutes (phone or video call)" },
                { label:"Format",    val:"Your advisor leads with questions about your goals, budget, timeline, and location preferences, not a property pitch" },
                { label:"Output",    val:"A written summary of your requirements, recommended next steps, and a realistic assessment of what is achievable in your budget across Delhi NCR" },
                { label:"Cost",      val:"Free, with no obligation to proceed" },
              ].map(item=>(
                <div key={item.label} style={{ display:"grid",gridTemplateColumns:"100px 1fr",gap:12,paddingBottom:14,marginBottom:14,borderBottom:"1px solid rgba(42,45,53,0.06)" }}>
                  <span className="eyebrow" style={{ color:"var(--gold)" }}>{item.label}</span>
                  <span className="body-sm" style={{ color:"var(--slate)" }}>{item.val}</span>
                </div>
              ))}

              <div style={{ marginTop:32 }}>
                <p className="eyebrow" style={{ marginBottom:14 }}>How to Reach Us</p>
                {[
                  { icon:"📞", label:"Call",      val:"+91 98106 47063",       href:"tel:+919810647063" },
                  { icon:"💬", label:"WhatsApp",  val:"Chat with us instantly", href:"https://wa.me/919810647063?text=Hello%20Vedhara%20Group" },
                  { icon:"✉️", label:"Email",     val:"hello@vedharagroup.com", href:"mailto:hello@vedharagroup.com" },
                ].map(item=>(
                  <a key={item.label} href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                    style={{ display:"flex",gap:14,padding:"14px 16px",marginBottom:8,background:"var(--cream)",textDecoration:"none",borderLeft:"2px solid transparent",transition:"border-color 0.2s,background 0.2s" }}
                    className="contact-link">
                    <span style={{ fontSize:20,flexShrink:0 }}>{item.icon}</span>
                    <div>
                      <div className="eyebrow" style={{ color:"var(--gold)",marginBottom:2 }}>{item.label}</div>
                      <div className="body-sm" style={{ color:"var(--ink)" }}>{item.val}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ marginTop:20,padding:"16px 20px",background:"rgba(184,146,42,0.06)",border:"1px solid rgba(184,146,42,0.15)" }}>
                <p className="eyebrow" style={{ color:"var(--gold)",marginBottom:6 }}>🌐 NRI Clients</p>
                <p className="body-sm" style={{ color:"var(--slate)",margin:0 }}>Weekend slots available: Saturday & Sunday, 10AM–4PM IST. Tell us your time zone in the form and we will schedule around you.</p>
              </div>

              <div style={{ marginTop:20 }}>
                <p className="eyebrow" style={{ marginBottom:12 }}>Services You Can Enquire About</p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                  {["Buy Property","Sell Property","Rent Property","Commercial Real Estate","Investment Advisory","NRI Services","Property Management","Market Research & Second Opinion"].map(s=>(
                    <span key={s} style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--slate)",border:"1px solid rgba(42,45,53,0.12)",padding:"4px 8px" }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* FORM SIDE */}
          <ScrollReveal delay={120} direction="right">
            <div style={{ background:"white",border:"1px solid rgba(42,45,53,0.08)",padding:"40px 36px",boxShadow:"0 4px 32px rgba(42,45,53,0.06)" }}>
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
        .contact-link:hover { border-left-color: var(--gold) !important; background: var(--stone) !important; }
      `}</style>
    </>
  );
}
