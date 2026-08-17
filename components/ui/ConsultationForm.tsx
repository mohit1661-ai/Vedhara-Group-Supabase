"use client";
import { useState } from "react";

const interests = [
  "Buy Property","Sell Property","Rent / Lease","Commercial Real Estate",
  "Investment Advisory","NRI Services","Property Management","Luxury Properties","General Enquiry",
];

/**
 * The consultation form used on the Contact page, in the navbar popup, and on
 * the homepage lead-capture section.
 * Posts to /api/consultation (Supabase + email + Google Sheets + CRM).
 * The parent decides what to show on success via `onSuccess`.
 *
 * `variant` switches the palette:
 *   "dark"  (default) — for navy/dark surfaces (contact page, navbar modal).
 *   "light"           — for cream/light surfaces (homepage section).
 */
export default function ConsultationForm({
  sourcePage,
  onSuccess,
  variant = "dark",
}: {
  sourcePage: string;
  onSuccess?: () => void;
  variant?: "dark" | "light";
}) {
  const [form, setForm] = useState({ fullName:"",phone:"",email:"",interest:"",message:"",timezone:"" });
  const [status, setStatus] = useState<"idle"|"submitting"|"error">("idle");
  const up = (k:string,v:string) => setForm(p=>({...p,[k]:v}));

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/consultation",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          ...form,
          interestArea: form.interest.toLowerCase().replace(/\s+/g,"_"),
          sourcePage,
        }),
      });
      if (res.ok) { onSuccess?.(); return; }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={`lux-form${variant === "light" ? " lux-form--light" : ""}`}>
      {/* Refined luxury header */}
      <div className="lux-header">
        <span className="lux-eyebrow">Complimentary Consultation</span>
        <h2 className="lux-title">Book Your <em>Free Consultation</em></h2>
        <p className="lux-sub">A 30&ndash;45 minute discovery call, on us &middot; No obligation</p>
      </div>

      <form onSubmit={submit} className="lux-fields">
        <div className="lux-row">
          <div>
            <label className="lux-label">Full Name <span className="lux-req">*</span></label>
            <input type="text" required value={form.fullName} onChange={e=>up("fullName",e.target.value)} className="lux-input" placeholder="Your full name" />
          </div>
          <div>
            <label className="lux-label">Phone <span className="lux-req">*</span></label>
            <input type="tel" required value={form.phone} onChange={e=>up("phone",e.target.value)} className="lux-input" placeholder="+91 or country code" />
          </div>
        </div>
        <div>
          <label className="lux-label">Email Address</label>
          <input type="email" value={form.email} onChange={e=>up("email",e.target.value)} className="lux-input" placeholder="your@email.com" />
        </div>
        <div>
          <label className="lux-label" htmlFor="interest">I Am Interested In <span className="lux-req">*</span></label>
          <select id="interest" required value={form.interest} onChange={e=>up("interest",e.target.value)} className="lux-input">
            <option value="">Select a service…</option>
            {interests.map(i=><option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="lux-label">Time Zone (NRI clients)</label>
          <input type="text" value={form.timezone} onChange={e=>up("timezone",e.target.value)} className="lux-input" placeholder="e.g. UAE, GMT+4 / UK, BST" />
        </div>
        <div>
          <label className="lux-label">Message (optional)</label>
          <textarea rows={4} value={form.message} onChange={e=>up("message",e.target.value)} className="lux-input" placeholder="Tell us about your property goals…" style={{ resize:"none" }} />
        </div>
        <button type="submit" disabled={status==="submitting"} className="btn btn-dark lux-submit" style={{ width:"100%",justifyContent:"center",opacity:status==="submitting"?0.6:1 }}>
          {status==="submitting"?"Sending…":"Book a Free Consultation"}
        </button>
        {status==="error" && <p className="lux-error">Something went wrong; please try WhatsApp or call us directly.</p>}
        <p className="lux-note">We respond within 24 hours during business hours. No spam, ever.</p>
      </form>

      <style>{`
        .lux-form{display:flex;flex-direction:column;gap:26px;}
        .lux-header{text-align:center;}
        .lux-eyebrow{font-family:var(--t-head);font-size:9px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold-lt);}
        .lux-title{font-family:var(--t-display);font-weight:300;font-size:clamp(24px,4vw,32px);line-height:1.12;color:var(--light);margin:12px 0 8px;}
        .lux-title em{font-style:italic;color:var(--gold-lt);}
        .lux-sub{font-family:var(--t-body);font-size:12.5px;font-weight:300;color:rgba(255,255,255,0.55);margin:0;}
        .lux-fields{display:flex;flex-direction:column;gap:18px;}
        .lux-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .lux-label{display:block;font-family:var(--t-head);font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(232,201,112,0.9);margin-bottom:8px;}
        .lux-req{color:var(--gold-lt);}
        .lux-input{width:100%;background:rgba(255,255,255,0.045);border:1px solid rgba(212,168,67,0.22);border-radius:10px;padding:14px 16px;font-family:var(--t-body);font-size:13.5px;color:#fff;outline:none;box-sizing:border-box;transition:border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;appearance:none;}
        .lux-input::placeholder{color:rgba(255,255,255,0.35);}
        .lux-input:focus{border-color:var(--gold-lt);background:rgba(255,255,255,0.07);box-shadow:0 0 0 3px rgba(212,168,67,0.12), 0 0 22px rgba(212,168,67,0.18);}
        .lux-input option{color:var(--ink);background:var(--cream);}
        .lux-submit{margin-top:4px;background:linear-gradient(135deg,var(--gold),var(--gold-lt))!important;color:var(--navy)!important;box-shadow:0 10px 26px -12px rgba(212,168,67,0.65)!important;}
        .lux-form--light .lux-submit{background:linear-gradient(135deg,#E0B75A,#F0D685)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,0.45),0 12px 30px -12px rgba(212,168,67,0.85)!important;}
        .lux-error{font-family:var(--t-body);font-size:12px;color:#E08A8A;text-align:center;margin:0;}
        .lux-note{font-family:var(--t-body);font-size:10.5px;letter-spacing:0.04em;color:rgba(255,255,255,0.38);text-align:center;margin:0;}
        @media(max-width:520px){.lux-row{grid-template-columns:1fr;}}
        /* ── Light variant — for cream surfaces (homepage section) ── */
        .lux-form--light .lux-eyebrow{color:var(--gold-ink);}
        .lux-form--light .lux-title{color:var(--navy);}
        .lux-form--light .lux-title em{color:var(--gold-ink);}
        .lux-form--light .lux-sub{color:var(--slate);}
        .lux-form--light .lux-label{color:var(--gold-ink);}
        .lux-form--light .lux-req{color:var(--gold-ink);}
        .lux-form--light .lux-input{background:rgba(15,30,56,0.045);border:1px solid rgba(212,168,67,0.45);color:var(--navy);}
        .lux-form--light .lux-input::placeholder{color:rgba(42,45,53,0.42);}
        .lux-form--light .lux-input:focus{border-color:var(--gold-dk);background:rgba(255,255,255,0.7);box-shadow:0 0 0 3px rgba(212,168,67,0.18), 0 0 22px rgba(212,168,67,0.22);}
        .lux-form--light .lux-input option{color:var(--ink);background:var(--cream);}
        .lux-form--light .lux-note{color:var(--slate);}
      `}</style>
    </div>
  );
}
