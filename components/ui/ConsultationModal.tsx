"use client";
import { useEffect, useState } from "react";
import ConsultationForm from "./ConsultationForm";

/**
 * Popup containing the same consultation form as the Contact page.
 * Opened from the navbar "Free Consultation" CTA. Shows a thank-you state
 * after a successful submission, then can be closed.
 */
export default function ConsultationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [done, setDone] = useState(false);

  // Reset the success state each time the modal is reopened
  useEffect(() => {
    if (!open) setDone(false);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a free consultation"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(9,15,29,0.72)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "heroFade 0.25s ease",
      }}
    >
      {/* Gold gradient frame around the navy card, luxury popup */}
      <div
        onClick={(e)=>e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          padding: 1,
          background: "linear-gradient(165deg, rgba(212,168,67,0.6), rgba(212,168,67,0.12) 30%, rgba(212,168,67,0.28) 65%, rgba(212,168,67,0.55))",
          borderRadius: 18,
          boxShadow: "0 30px 80px rgba(9,15,29,0.6)",
          animation: "heroRise 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ position: "relative", background: "var(--navy)", borderRadius: 17, padding: "38px 34px 30px", maxHeight: "90vh", overflowY: "auto" }}>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              zIndex: 2,
              background: "rgba(212,168,67,0.1)",
              border: "1px solid rgba(212,168,67,0.35)",
              color: "var(--gold-lt)",
              width: 34,
              height: 34,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 14,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.25s ease, transform 0.25s ease",
            }}
          >
            ✕
          </button>

          {done ? (
            <div style={{ textAlign:"center",padding:"30px 8px 8px" }}>
              <div style={{ width:44,height:2,margin:"0 auto 20px",background:"linear-gradient(90deg,transparent,var(--gold-lt),transparent)" }} />
              <h2 className="heading-lg" style={{ color:"var(--light)",marginBottom:12,lineHeight:1.2 }}>Thank you for reaching out</h2>
              <p className="body-sm" style={{ color:"rgba(255,255,255,0.8)",lineHeight:1.7,maxWidth:420,margin:"0 auto 24px" }}>
                A Vedhara advisor will contact you within 24 hours. No sales pitch, just a conversation about what you are trying to achieve.
              </p>
              <button className="btn btn-dark" onClick={onClose} style={{ margin:"0 auto" }}>Done</button>
            </div>
          ) : (
            <ConsultationForm sourcePage="navbar_cta" onSuccess={()=>setDone(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
