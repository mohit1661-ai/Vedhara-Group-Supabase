import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title:"New Property Launches in Delhi NCR | Verified Upcoming Projects | Vedhara Group", description:"Upcoming and recently launched RERA-verified property projects across Gurugram, Noida, Faridabad, and Delhi from Vedhara Group's verified developer partners.", alternates:{ canonical:"https://www.vedharagroup.com/new-launches" } };
export default function Page() {
  return (
    <>
      <section className="page-hero animated-gradient" style={{ textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ maxWidth:800,margin:"0 auto",position:"relative",zIndex:1 }}>
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>New Launches</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"#FCFAF4",lineHeight:1.05,marginBottom:24 }}>
            Verified New Project Launches<br /><span style={{ color:"var(--gold-lt)" }}>Across Delhi NCR</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.52)",maxWidth:500,margin:"0 auto" }}>Every project listed passes our five-point Verification Framework before publishing. No unverified launches, ever.</p>
        </div>
      </section>
      <section style={{ background:"var(--cream)",padding:"96px 32px" }}>
        <div style={{ maxWidth:860,margin:"0 auto",textAlign:"center" }}>
          <div style={{ background:"var(--ivory)",border:"1px solid rgba(42,45,53,0.08)",padding:"64px 48px",marginBottom:32 }}>
            <div style={{ fontSize:48,marginBottom:20 }}>🔍</div>
            <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:12 }}>Verified Listings Coming Soon</h2>
            <p className="body-md" style={{ color:"var(--slate)",maxWidth:460,margin:"0 auto 28px" }}>We are currently verifying our first partner developer projects against the Verification Framework. Subscribe to the Ground Report to be notified when verified new launches are added — before they are publicly marketed.</p>
            <Link href="/market-insights" className="btn btn-dark">Subscribe to the Ground Report →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
