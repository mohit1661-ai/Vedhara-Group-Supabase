import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import RelatedLinksSection from "@/components/sections/RelatedLinksSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { blogPosts } from "@/lib/data/blogPosts";

export const metadata: Metadata = {
  title:"Market Insights",
  description:"Data-backed market insights and research reports on Dwarka Expressway, Gurugram and Delhi NCR property prices, trends and forecasts.",
  keywords:["market insights Gurugram","Dwarka Expressway price trend","Delhi NCR property analysis","Vedhara Group insights","real estate research India"],
  alternates:{ canonical:"https://www.vedharagroup.com/insights" },
};

const insightsPosts = blogPosts.filter((p)=>p.path==="insights");

const insightsSchema = {
  "@context":"https://schema.org",
  "@type":"Blog",
  "@id":"https://www.vedharagroup.com/insights",
  headline:"Vedhara Group Market Insights",
  description:"Data-backed market insights and research reports on Dwarka Expressway, Gurugram and Delhi NCR property prices, trends and forecasts.",
  publisher:{"@id":"https://www.vedharagroup.com/#organization"},
  inLanguage:"en-IN",
  blogPost: insightsPosts.map((p)=>({
    "@type":"BlogPosting",
    headline:p.title,
    url:`https://www.vedharagroup.com/insights/${p.slug}`,
    datePublished:p.datePublished,
    dateModified:p.dateModified,
    description:p.metaDescription || p.excerpt,
    author:{"@type":"Organization",name:"Vedhara Group"},
  })),
};

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={insightsSchema} />
      <VideoHeroSection videoSrc="/videos/Market%20Insights%20Hero%20Video.mp4">
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Market Insights</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          Property Market Insights,<br /><span style={{ color:"var(--gold-lt)" }}>Backed by Real Data</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Research reports on prices, micro-markets and infrastructure across Dwarka Expressway, Gurugram and Delhi NCR, written by our advisory team from real transactions.</p>
      </VideoHeroSection>

      {/* Gold differentiator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* Intro block */}
      <div style={{ background:"var(--cream)",textAlign:"center",padding:"48px 32px 48px" }}>
        <div style={{ maxWidth:700,margin:"0 auto" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>Latest Insights</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Intelligence for<br /><span style={{ color:"var(--gold-ink)" }}>Smarter Property Decisions</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              Every insight is grounded in registered transaction data, listing trends and ground-level demand, not developer marketing. Read the breakdown before you buy, sell or invest along Delhi NCR&apos;s most active corridors.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Insights grid */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }} className="grid-3">
            {insightsPosts.map((post,i)=>(
              <ScrollReveal key={post.slug} delay={i*60} style={{ display:"flex" }}>
                <Link href={`/insights/${post.slug}`} style={{ textDecoration:"none",flex:1,display:"flex" }}>
                  <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ height:140,background:post.gradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0 }}>
                      <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                      <div style={{ position:"absolute",top:12,right:12,zIndex:2 }}>
                        <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"3px 10px",borderRadius:20,background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.9)",border:"1px solid rgba(255,255,255,0.25)" }}>
                          {post.category}
                        </span>
                      </div>
                      <div style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:14,color:"rgba(255,255,255,0.8)",textAlign:"center",padding:"0 24px",position:"relative",zIndex:1,lineHeight:1.4 }}>
                        {post.title.length > 65 ? post.title.substring(0,65)+"…" : post.title}
                      </div>
                    </div>
                    <div style={{ padding:"20px 24px 24px",flex:1,display:"flex",flexDirection:"column" }}>
                      <p style={{ fontFamily:"var(--t-body)",fontSize:10.5,color:"var(--gold-ink)",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:600,marginBottom:4 }}>{post.readTime}</p>
                      <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.4 }}>{post.title}</h3>
                      <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.7,flex:1 }}>{post.excerpt}</p>
                      <div style={{ paddingTop:16,marginTop:12,borderTop:"1px solid rgba(212,168,67,0.15)" }}>
                        <span className="apply-btn" style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:"var(--gold-lt)",display:"inline-flex",alignItems:"center",gap:4,background:"var(--navy)",padding:"6px 14px",borderRadius:6,transition:"all 0.2s",cursor:"pointer" }}>
                          Read Insight →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinksSection
        title="Related advisory pages"
        intro="Turn these insights into action with our services, verification and contact resources."
        background="cream"
        variant="journey"
        links={[
          { href:"/market-insights", label:"Explore market intelligence", description:"Broader research and analysis across Delhi NCR micro-markets." },
          { href:"/blog", label:"Read the full blog", description:"Guides on RERA, NRI investing, home loans, stamp duty and more." },
          { href:"/contact", label:"Book a consultation", description:"Talk to an advisor for tailored support after reading the insights." },
        ]}
      />
      <CTASection />
    </>
  );
}