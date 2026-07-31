"use client";
import Link from "next/link";

export default function Error({ reset }:{ reset:()=>void }) {
  return (
    <section style={{ background:"var(--navy)", minHeight:"72vh", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"80px 32px" }}>
      <div style={{ maxWidth:520, margin:"0 auto" }}>
        <span className="v-line" style={{ margin:"0 auto 16px" }} />
        <p className="eyebrow" style={{ marginBottom:12 }}>Something Went Wrong</p>
        <h1 style={{ fontFamily:"var(--t-display)", fontStyle:"italic", fontWeight:300, fontSize:"clamp(34px,6vw,64px)", color:"var(--light)", lineHeight:1.05, marginBottom:20 }}>
          An Error Occurred
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.8)", maxWidth:440, margin:"0 auto 30px" }}>
          A temporary issue interrupted this page. Please try again, or head back to the home page.
        </p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={reset} className="btn btn-dark" style={{ cursor:"pointer" }}>Try Again</button>
          <Link href="/" className="btn" style={{ background:"transparent", color:"rgba(255,255,255,0.8)", border:"1px solid rgba(255,255,255,0.22)" }}>Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
