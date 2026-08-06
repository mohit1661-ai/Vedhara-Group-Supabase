import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoHeroSection from "@/components/sections/VideoHeroSection";

export const metadata: Metadata = {
  title: "Delhi NCR Real Estate Videos",
  description: "Watch Vedhara Group's real estate films across Delhi NCR, Faridabad, Manesar & Chandigarh for verified buying, selling, NRI, luxury and verification.",
  alternates: { canonical: "https://www.vedharagroup.com/videos" },
};

const BASE = "https://www.vedharagroup.com";
const UPLOAD_DATE = "2026-01-01";

const enc = (s: string) => encodeURI(s);

interface WatchVideo {
  file: string;   // file name in /watch/
  title: string;
  desc: string;
}

const videos: WatchVideo[] = [
  { file:"Homepage Hero Video Desktop.mp4", title:"Vedhara Group Verified Property Advisory", desc:"Our flagship film on independent, verified real estate advisory across Delhi NCR, Faridabad, Manesar, Chandigarh and North India." },
  { file:"Homepage Hero Video Mobile.mp4", title:"Vedhara Group Verified Property Advisory (Mobile)", desc:"Our flagship advisory film in a mobile-optimised format — verified real estate across Delhi NCR, Faridabad, Manesar, Chandigarh and North India." },
  { file:"Vedhara Group Gurgaon Real Estate About Page Video.mp4", title:"About Vedhara Group Trusted Advisory", desc:"The people and the principle behind Vedhara: independent by design, client-first by default." },
  { file:"Vedhara Group Delhi NCR Buy Page Video.mp4", title:"Buy Verified Property in Delhi NCR", desc:"How we shortlist, verify and negotiate on your behalf when you buy across Delhi NCR and North India." },
  { file:"Vedhara Group Delhi NCR Sell Page Video (1).mp4", title:"Sell Property at Fair Market Value", desc:"Strategic pricing, qualified buyer access and end-to-end sale management across Delhi NCR and Chandigarh." },
  { file:"Vedhara Group Delhi NCR Rent Page Video.mp4", title:"Rent Verified Property Delhi NCR", desc:"Verified rentals with transparent lease terms for tenants and landlords in Delhi NCR and Tricity." },
  { file:"Vedhara Group Delhi NCR Commercial Page Video.mp4", title:"Commercial Real Estate Advisory", desc:"Office, retail and industrial leasing and acquisition across Delhi NCR, Faridabad and Manesar." },
  { file:"Vedhara Group Delhi NCR Luxury Properties Page Video (1).mp4", title:"Luxury Properties Premium Homes", desc:"Curated premium residences and discreet white-glove advisory for discerning buyers." },
  { file:"Vedhara Group Delhi NCR NRI Desk Page Video.mp4", title:"NRI Property Services India", desc:"Buy, sell or manage property in India remotely with weekend IST consultations, video walkthroughs and e-signatures." },
  { file:"New Launches.mp4", title:"Verified New Property Launches", desc:"RERA-verified new projects across Delhi NCR, Faridabad, Manesar and Chandigarh from our developer partners." },
  { file:"Property Investment.mp4", title:"Property Investment Advisory", desc:"Rental yield analysis and buy-to-invest strategy across Delhi NCR and North India." },
  { file:"Real Estate Investment Advisory.mp4", title:"Real Estate Investment Advisory", desc:"Data-backed investment advisory for growing your portfolio across North India." },
  { file:"Property Verification.mp4", title:"Five-Point Verification Framework", desc:"How we check RERA status, approvals, price fairness and documents before any listing is published." },
  { file:"Property Real Estate Contact.mp4", title:"Book a Free Real Estate Consultation", desc:"No pitch, no pressure. Start with an honest conversation about your property goals." },
  { file:"Real Estate Calculator.mp4", title:"Free Real Estate Calculators", desc:"EMI, stamp duty, ROI and affordability calculators, free with no sign-up required." },
  { file:"All Services Hero Video.mp4", title:"Vedhara Group Real Estate Advisory Services", desc:"The full range of Vedhara's independent real estate advisory across Delhi NCR, Faridabad, Manesar, Chandigarh and North India — buy, sell, rent, invest and NRI services." },
  { file:"Blog Page Hero Video.mp4", title:"Vedhara Group Property Insights Blog", desc:"Guides and market insights on Delhi NCR property — RERA, pricing trends, NRI investing and more from the Vedhara Group blog." },
  { file:"careers hero video.mp4", title:"Careers at Vedhara Group", desc:"Join Vedhara Group — a career in independent, client-first real estate advisory across Delhi NCR and North India." },
  { file:"Case Studies Hero Video.mp4", title:"Vedhara Group Client Case Studies", desc:"Real client journeys — buying, selling and investing in Delhi NCR property with Vedhara Group's verified advisory." },
  { file:"Chandigarh Tricity Hero Desktop.mp4", title:"Chandigarh Tricity Property Advisory", desc:"Verified property advisory across Chandigarh, Mohali, Panchkula and Zirakpur — the Tricity market with Vedhara Group." },
  { file:"Chandigarh Tricity Hero Mobile.mp4", title:"Chandigarh Tricity Property Advisory (Mobile)", desc:"Vedhara Group's Chandigarh Tricity property advisory in a mobile-optimised format — Chandigarh, Mohali, Panchkula and Zirakpur." },
  { file:"FAQ Hub Hero Video.mp4", title:"Vedhara Group FAQ – Property Questions Answered", desc:"Answers to common questions about buying, selling, renting and investing in Delhi NCR property with Vedhara Group." },
  { file:"Market Insights Hero Video.mp4", title:"Delhi NCR Property Market Insights", desc:"Data-backed market insights on Delhi NCR, Faridabad, Manesar and Chandigarh — pricing, trends and opportunities from Vedhara Group." },
  { file:"Our Team Hero Video.mp4", title:"Meet the Vedhara Group Team", desc:"The advisors behind Vedhara Group — independent by design, client-first by default across Delhi NCR and North India." },
  { file:"Property Management Hero Video.mp4", title:"Vedhara Group Property Management", desc:"Tenant, maintenance and rental management for property owners across Delhi NCR and Chandigarh with Vedhara Group." },
  { file:"Success Stories Hero Video.mp4", title:"Vedhara Group Success Stories", desc:"Client success stories — verified property journeys across Delhi NCR, Faridabad, Manesar, Chandigarh and North India." },
];

const jsonLd = {
  "@context":"https://schema.org",
  "@type":"ItemList",
  itemListElement: videos.map((v, i) => ({
    "@type":"ListItem",
    position: i + 1,
    item: {
      "@type":"VideoObject",
      name: v.title,
      description: v.desc,
      thumbnailUrl: `${BASE}/watch/${enc(`thumb-${v.file.replace(/\.mp4$/,"")}.jpg`)}`,
      uploadDate: UPLOAD_DATE,
      contentUrl: `${BASE}/watch/${enc(v.file)}`,
      embedUrl: `${BASE}/videos`,
    },
  })),
};

export default function VideosPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <VideoHeroSection
        videoSrc="/videos/Homepage%20Hero%20Video%20Desktop.mp4"
        videoSrcMobile="/videos/Homepage%20Hero%20Video%20Mobile.mp4"
      >
        <span className="v-line" style={{ margin:"0 auto 18px" }} />
        <p className="eyebrow" style={{ marginBottom:16 }}>Vedhara Group Films</p>
        <h1 className="heading-xl" style={{ color:"var(--light)", lineHeight:1.08, marginBottom:20 }}>
          Watch How We Work,<br /><em style={{ fontFamily:"var(--t-display)", fontStyle:"italic", fontWeight:300, color:"var(--gold-lt)" }}>Across Delhi NCR & North India</em>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)", maxWidth:600, margin:"0 auto" }}>
          See verified property advisory in action through buying, selling, renting, NRI services, luxury homes and our five-point verification framework, filmed across Delhi NCR, Faridabad, Manesar, Chandigarh and beyond.
        </p>
      </VideoHeroSection>

      {/* Video grid with each video as primary content on this watch page */}
      <section style={{ background:"var(--cream)", padding:"72px 32px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%, 320px), 1fr))", gap:32, alignItems:"stretch" }}>
          {videos.map((v, i) => (
            <ScrollReveal key={v.file} delay={(i % 3) * 80}>
              <article style={{ background:"var(--navy)", borderRadius:10, overflow:"hidden", border:"1px solid rgba(212,168,67,0.25)", boxShadow:"0 12px 40px rgba(9,15,29,0.18)", display:"flex", flexDirection:"column", height:"100%" }}>
                <div style={{ position:"relative" }}>
                  <video
                    controls
                    preload="metadata"
                    poster={`/watch/${enc(`thumb-${v.file.replace(/\.mp4$/,"")}.jpg`)}`}
                    style={{ width:"100%", aspectRatio:"16/9", display:"block", background:"#000" }}
                  >
                    <source src={`/watch/${enc(v.file)}`} type="video/mp4" />
                  </video>
                </div>
                <div style={{ padding:"22px 24px 26px", display:"flex", flexDirection:"column", flex:1 }}>
                  <p className="eyebrow" style={{ color:"var(--gold)", marginBottom:8, fontSize:10 }}>
                    Vedhara Group · Film {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="heading-lg" style={{ color:"var(--light)", fontSize:22, lineHeight:1.25, marginBottom:10 }}>{v.title}</h3>
                  <p className="body-md" style={{ color:"rgba(252,250,244,0.7)", margin:0, fontSize:13.5, lineHeight:1.65 }}>{v.desc}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"var(--navy)", padding:"64px 32px", textAlign:"center" }}>
        <div style={{ maxWidth:640, margin:"0 auto" }}>
          <h2 className="heading-xl" style={{ color:"var(--light)", lineHeight:1.15, marginBottom:16 }}>
            See It in Person?<br /><em style={{ fontFamily:"var(--t-display)", fontStyle:"italic", fontWeight:300, color:"var(--gold-lt)" }}>Book a Free Consultation</em>
          </h2>
          <p className="body-lg" style={{ color:"rgba(255,255,255,0.8)", marginBottom:28 }}>
            Tell us your goals, budget and location across Delhi NCR, Faridabad, Manesar, Chandigarh and North India, and an advisor will respond within 24 hours.
          </p>
          <Link href="/contact" className="btn btn-primary">Book a Free Consultation</Link>
        </div>
      </section>
    </>
  );
}
