import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import { watchVideos, videoSlug, VIDEOS_BASE_URL as BASE, VIDEOS_UPLOAD_DATE as UPLOAD_DATE } from "@/lib/data/videos";

export const metadata: Metadata = {
  title: "Delhi NCR Real Estate Videos",
  description: "Watch Vedhara Group's real estate films across Delhi NCR, Faridabad, Manesar & Chandigarh for verified buying, selling, NRI, luxury and verification.",
  alternates: { canonical: "https://www.vedharagroup.com/videos" },
};

const enc = (s: string) => encodeURI(s);

const jsonLd = {
  "@context":"https://schema.org",
  "@type":"ItemList",
  itemListElement: watchVideos.map((v, i) => ({
    "@type":"ListItem",
    position: i + 1,
    item: {
      "@type":"VideoObject",
      name: v.title,
      description: v.desc,
      url: `${BASE}/watch/${videoSlug(v.file)}`,
      thumbnailUrl: `${BASE}/watch/${enc(`thumb-${v.file.replace(/\.mp4$/,"")}.jpg`)}`,
      uploadDate: UPLOAD_DATE,
      contentUrl: `${BASE}/watch/${enc(v.file)}`,
      embedUrl: `${BASE}/watch/${videoSlug(v.file)}`,
    },
  })),
};

export default function VideosPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <VideoHeroSection
        videoSrc="/videos/Homepage%20Hero%20Video%20Real%20Estate%20Advisory%20in%20Gurgaon%20Delhi%20NCR.mp4?v=3#t=0"
        videoSrcMobile="/videos/Homepage%20Hero%20Video%20Real%20Estate%20Advisory%20in%20Gurgaon%20Delhi%20NCR.mp4?v=3#t=0"
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
          {watchVideos.map((v, i) => (
            <ScrollReveal key={v.file} delay={(i % 3) * 80}>
              <article style={{ background:"var(--navy)", borderRadius:10, overflow:"hidden", border:"1px solid rgba(212,168,67,0.25)", boxShadow:"0 12px 40px rgba(9,15,29,0.18)", display:"flex", flexDirection:"column", height:"100%" }}>
                <div style={{ position:"relative" }}>
                  <video
                    controls
                    preload="metadata"
                    poster={`/watch/${enc(`thumb-${v.file.replace(/\.mp4$/,"")}.jpg`)}`}
                    title={v.title}
                    aria-label={v.title}
                    style={{ width:"100%", aspectRatio:"16/9", display:"block", background:"#000" }}
                  >
                    <source src={`/watch/${enc(v.file)}`} type="video/mp4" />
                  </video>
                </div>
                <div style={{ padding:"22px 24px 26px", display:"flex", flexDirection:"column", flex:1 }}>
                  <p className="eyebrow" style={{ color:"var(--gold)", marginBottom:8, fontSize:10 }}>
                    Vedhara Group · Film {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="heading-lg" style={{ color:"var(--light)", fontSize:22, lineHeight:1.25, marginBottom:10 }}>{v.title}</h2>
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
          <Link href="/contact#enquiry-form" className="btn btn-primary">Book a Free Consultation</Link>
        </div>
      </section>
    </>
  );
}
