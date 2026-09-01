"use client";
import { useState } from "react";
import Link from "next/link";
import ConsultationForm from "@/components/ui/ConsultationForm";

/**
 * HomeConsultationSection, luxury lead-capture placed directly above the footer
 * on the homepage. Keeps the site's navy backdrop; the form card and thank-you
 * screen sit on a cream/light surface with navy + gold type so they stand out
 * against the blue. Left column sells the free consultation; right column holds
 * the light-palette ConsultationForm. On success the form is replaced by a
 * thank-you card inline (no page swap).
 */
export default function HomeConsultationSection() {
  const [done, setDone] = useState(false);

  return (
    <section style={{ background:"var(--navy)", padding:"88px 32px", position:"relative", overflow:"hidden" }}>
      {/* Ambient luxury glows */}
      <div style={{ position:"absolute", top:"-10%", left:"-6%", width:560, height:560, borderRadius:"50%", background:"radial-gradient(circle, rgba(212,168,67,0.10) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-18%", right:"-8%", width:640, height:640, borderRadius:"50%", background:"radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(212,168,67,0.02) 40px, rgba(212,168,67,0.02) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(212,168,67,0.02) 40px, rgba(212,168,67,0.02) 41px)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }} className="grid-2 home-consult-grid">
        {/* ── Persuasion column ── */}
        <div>
          <span className="v-line" style={{ marginBottom:14 }} />
          <p className="eyebrow" style={{ color:"var(--gold-lt)", marginBottom:16 }}>Complimentary Consultation</p>
          <h2 className="heading-xl" style={{ color:"var(--light)", lineHeight:1.1, marginBottom:18 }}>
            Get Honest, Independent Advice{" "}
            <em style={{ fontFamily:"var(--t-display)", fontStyle:"italic", fontWeight:300, color:"var(--gold-lt)" }}>Before You Decide</em>
          </h2>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.72)", maxWidth:520, marginBottom:30 }}>
            Buying, selling, renting, or investing across Delhi NCR and North India? Speak with a named Vedhara advisor; no sales pitch, no obligation, ever.
          </p>

          {/* Value points */}
          <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:14, marginBottom:32 }}>
            {[
              { t:"Free 30–45 minute discovery call", d:"We listen first, then tell you honestly how we can help, even if that means advising you not to buy yet." },
              { t:"One named advisor, start to finish", d:"A direct line to a senior advisor who owns your journey. No call centres, no rotating teams." },
              { t:"Verified guidance, not developer inventory", d:"Independent, RERA-checked shortlists benchmarked against real transaction data." },
              { t:"Response within 24 hours", d:"During business hours, from a real person. No spam, ever." },
            ].map(item=>(
              <li key={item.t} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                <span style={{ flexShrink:0, width:30, height:30, borderRadius:"50%", background:"rgba(212,168,67,0.12)", border:"1px solid rgba(212,168,67,0.35)", color:"var(--gold-lt)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11 }}>✓</span>
                <div>
                  <p style={{ fontFamily:"var(--t-head)", fontSize:13.5, fontWeight:600, color:"var(--light)", margin:"0 0 3px" }}>{item.t}</p>
                  <p style={{ fontFamily:"var(--t-body)", fontSize:12, color:"rgba(252,250,244,0.5)", lineHeight:1.6, margin:0 }}>{item.d}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Trust strip */}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:28 }}>
            {["RERA Compliant","ISO Verified","Independent by Design"].map(b=>(
              <span key={b} style={{ fontFamily:"var(--t-head)", fontSize:9, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold-lt)", border:"1px solid rgba(212,168,67,0.28)", padding:"5px 10px", borderRadius:3 }}>{b}</span>
            ))}
          </div>

          {/* Quick contact */}
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            <a href="tel:+919810647063" className="btn btn-primary" style={{ display:"inline-flex", alignItems:"center", gap:8 }}>Call +91 98106 47063</a>
            <a href="https://wa.me/919810647063?text=Hello%20Vedhara%20Group%2C%20I%27d%20like%20a%20free%20consultation" target="_blank" rel="noopener noreferrer" className="btn" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"transparent", color:"var(--gold-lt)", border:"1px solid rgba(212,168,67,0.4)" }}>WhatsApp Us</a>
          </div>
        </div>

        {/* ── Form column ── */}
        <div>
          {/* Cream card on the navy backdrop; lifts on hover like the other hover-lift blocks */}
          <div className="hover-lift" style={{ padding:1, background:"linear-gradient(165deg, rgba(212,168,67,0.65), rgba(212,168,67,0.18) 30%, rgba(212,168,67,0.35) 65%, rgba(212,168,67,0.65))", borderRadius:18, boxShadow:"0 24px 60px rgba(0,0,0,0.45)" }}>
            <div style={{ background:"var(--light)", borderRadius:17, padding:"38px 36px 32px" }}>
              {done ? (
                <div style={{ textAlign:"center", padding:"28px 8px" }}>
                  <div style={{ width:56, height:56, margin:"0 auto 20px", borderRadius:"50%", background:"rgba(212,168,67,0.18)", border:"1px solid rgba(212,168,67,0.55)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--gold-ink)", fontSize:24 }}>✓</div>
                  <h3 className="heading-lg" style={{ color:"var(--navy)", marginBottom:10, lineHeight:1.2 }}>Thank you for reaching out</h3>
                  <p className="body-md" style={{ color:"var(--slate)", margin:"0 0 24px" }}>
                    A Vedhara advisor will contact you within 24 hours. No sales pitch, just a conversation about what you are trying to achieve.
                  </p>
                  <Link href="/contact#enquiry-form" className="btn btn-dark" style={{ display:"inline-flex" }}>Explore More Ways to Reach Us</Link>
                </div>
              ) : (
                <ConsultationForm sourcePage="/" onSuccess={()=>setDone(true)} variant="light" />
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .home-consult-grid{ grid-template-columns:1fr !important; gap:40px; }
        }
      `}</style>
    </section>
  );
}
