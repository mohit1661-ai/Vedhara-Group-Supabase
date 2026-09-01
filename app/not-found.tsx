import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Vedhara Group",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section style={{ background:"linear-gradient(180deg,var(--navy) 0%,var(--navy-mid) 60%,var(--navy) 100%)", minHeight:"72vh", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"80px 32px" }}>
      <div style={{ maxWidth:600, margin:"0 auto" }}>
        <span className="v-line" style={{ margin:"0 auto 16px" }} />
        <p className="eyebrow" style={{ marginBottom:12,color:"var(--gold-lt)" }}>404 · Page Not Found</p>
        <h1 style={{ fontFamily:"var(--t-display)", fontStyle:"italic", fontWeight:300, fontSize:"clamp(40px,7vw,84px)", color:"var(--light)", lineHeight:1.05, marginBottom:20 }}>
          This Address<br /><span style={{ color:"var(--gold-lt)" }}>Doesn&rsquo;t Exist</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.8)", maxWidth:460, margin:"0 auto 30px" }}>
          The page you&rsquo;re looking for may have moved, been renamed, or never existed. Let&rsquo;s get you back to verified ground.
        </p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/" className="btn btn-dark">Back to Home</Link>
          <Link href="/contact#enquiry-form" className="btn" style={{ background:"transparent", color:"rgba(255,255,255,0.8)", border:"1px solid rgba(255,255,255,0.22)" }}>Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
