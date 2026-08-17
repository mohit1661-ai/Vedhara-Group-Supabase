import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTASection() {
  return (
    <section style={{ background:"var(--cream)",padding:"60px 32px",textAlign:"center" }}>
      <ScrollReveal>
        <div style={{ maxWidth:700,margin:"0 auto" }}>
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1,marginBottom:20 }}>
            Ready to Make Your{" "}
            <em className="display-gold" style={{ fontSize:"inherit",color:"var(--gold-ink)" }}>Next Property Move?</em>
          </h2>
          <p className="body-lg" style={{ color:"var(--slate)",marginBottom:28 }}>
            Independent advisory · Verified listings · Free consultation
          </p>
          <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact" className="btn btn-dark">Book a Free Consultation</Link>
            <a href="https://wa.me/919810647063?text=Hello%20Vedhara%20Group" target="_blank" rel="noopener noreferrer" className="btn" style={{ background:"var(--cream)",color:"var(--ink)",border:"1px solid rgba(42,45,53,0.12)" }}>WhatsApp Us</a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
