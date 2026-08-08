import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import RelatedLinksSection from "@/components/sections/RelatedLinksSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { blogPosts } from "@/lib/data/blogPosts";

export const metadata: Metadata = { title:"Delhi NCR Real Estate Blog", description:"Expert insights on the North India property market: Delhi NCR, Gurugram, Faridabad, Manesar & Chandigarh price trends, RERA, NRI investing and home loans.", alternates:{ canonical:"https://www.vedharagroup.com/blog" } };

const reasons = [
  { title:"Written by Advisors, Not by Writers", desc:"Every article is researched and written by Vedhara&apos;s advisory team from real client transactions and daily ground-level exposure across Delhi NCR. We never outsource content or repurpose developer press releases." },
  { title:"Data-Backed Market Analysis", desc:"Price trends, rental yields, and micro-market analyses are derived from Vedhara&apos;s proprietary transaction database, actual deal prices, not asking prices or third-party aggregators." },
  { title:"Practical Guides for Real Decisions", desc:"Step-by-step RERA guides, stamp duty walkthroughs, and NRI repatriation checklists structured so you can act. No fluff and no jargon, just what to know before you buy, sell, or invest." },
  { title:"Reviewed & Kept Current", desc:"Each article is reviewed by our legal team for regulatory accuracy and updated quarterly to reflect RERA changes, budget announcements, and shifting market conditions." },
];

const blogSchema = {
  "@context":"https://schema.org",
  "@type":"Blog",
  "@id":"https://www.vedharagroup.com/blog",
  headline:"Delhi NCR Real Estate Blog",
  description:"Expert insights on the North India property market: Delhi NCR, Gurugram, Faridabad, Manesar & Chandigarh price trends, RERA, NRI investing and home loans.",
  publisher:{"@id":"https://www.vedharagroup.com/#organization"},
  inLanguage:"en-IN",
  blogPost: blogPosts.map((p)=>({
    "@type":"BlogPosting",
    headline:p.title,
    url:`https://www.vedharagroup.com/blog/${p.slug}`,
    datePublished:"2026-01-01",
    dateModified:"2026-08-08",
    description:p.metaDescription || p.excerpt,
    author:{"@type":"Organization",name:"Vedhara Group"},
  })),
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogSchema} />
      <VideoHeroSection videoSrc="/videos/Blog Page Hero Video.mp4">
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Blog</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          Delhi NCR Real Estate Blog,<br /><span style={{ color:"var(--gold-lt)" }}>Insights & Guides</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Research-backed articles on market trends, RERA, NRI investment, rental yields, and home buying across Delhi NCR and North India.</p>
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
            <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>Latest Articles</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Expert Knowledge for<br /><span style={{ color:"#d4a843" }}>Smarter Property Decisions</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              From market trends to legal guides, our articles are written by Vedhara&apos;s advisory team based on real transaction data and ground-level experience across Delhi NCR, Faridabad, Manesar and Chandigarh.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Blog grid */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }} className="grid-3">
            {blogPosts.map((post,i)=>(
              <ScrollReveal key={post.slug} delay={i*60} style={{ display:"flex" }}>
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
                    <p style={{ fontFamily:"var(--t-body)",fontSize:10.5,color:"var(--gold-dk)",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:600,marginBottom:4 }}>{post.readTime}</p>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.4 }}>{post.title}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.7,flex:1 }}>{post.excerpt}</p>
                    <div style={{ paddingTop:16,marginTop:12,borderTop:"1px solid rgba(212,168,67,0.15)" }}>
                      <Link href={`/blog/${post.slug}`} className="apply-btn" style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:"var(--gold-lt)",display:"inline-flex",alignItems:"center",gap:4,background:"var(--navy)",padding:"6px 14px",borderRadius:6,textDecoration:"none",transition:"all 0.2s" }}>
                        Read Article →
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Read Vedhara's Blog – Vibrant Cream Cards on Navy */}
      <section style={{ background:"var(--navy)",padding:"56px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:12 }}>Why Read Vedhara&apos;s Blog</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:12 }}>
                Content You Can Trust,<br /><span style={{ color:"var(--gold-lt)" }}>Insights You Can Use</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:600,margin:"0 auto" }}>
                Most real estate blogs recycle press releases. Ours is built differently, with four standards we never compromise on.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }} className="grid-4">
            {reasons.map((r,i)=>(
              <ScrollReveal key={r.title} delay={i*80} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column",boxShadow:"0 8px 24px rgba(0,0,0,0.15)" }}>
                  <div style={{ height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt),var(--gold))",flexShrink:0 }} />
                  <div style={{ padding:"20px 16px 20px",flex:1,display:"flex",flexDirection:"column",textAlign:"center" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:10 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:7.5,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"2px 7px",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",color:"var(--navy)",borderRadius:3,flexShrink:0 }}>Vedhara</span>
                    </div>
                    <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",flexShrink:0 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)" }}>{i+1}</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:13,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.3 }}>{r.title}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)",fontSize:11.5,lineHeight:1.7,flex:1 }}>{r.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Topics We Cover – Category Navigation */}
      <section style={{ background:"var(--cream)",padding:"80px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>Topics We Cover</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                Everything You Need to Know<br /><span style={{ color:"#d4a843" }}>About Delhi NCR Real Estate</span>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:600,margin:"0 auto" }}>
                From market trends to legal guides, we cover every aspect of<br className="br-mobile" /> property in Delhi NCR.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }} className="grid-3">
            {[
              { title:"Market Trends", slug:"delhi-ncr-property-price-trends-2026", desc:"Quarterly price movements, micro-market analysis, demand-supply dynamics, and infrastructure impact assessments across Delhi NCR corridors.", gradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 100%)" },
              { title:"Legal & Compliance", slug:"rera-guide-delhi-ncr-home-buyers", desc:"RERA registration verification, title due diligence, stamp duty, registration charges, and regulatory compliance for both buyers and sellers.", gradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 100%)" },
              { title:"NRI Services", slug:"nri-property-investment-delhi-ncr-guide", desc:"FEMA guidelines, repatriation rules, TDS on property transactions, power-of-attorney process, and remote purchase management for global Indians.", gradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 100%)" },
              { title:"Buying Guides", slug:"stamp-duty-registration-charges-delhi-ncr-2026", desc:"Step-by-step guides for first-time buyers, budget planning, loan eligibility, property inspection checklists, and negotiation strategies.", gradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 100%)" },
              { title:"Investment Strategy", slug:"rental-yields-gurugram-noida-faridabad-2026", desc:"Rental yield analysis, capital appreciation trends, portfolio diversification, pre-launch vs. ready property evaluation, and exit planning.", gradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 100%)" },
              { title:"Home Finance", slug:"home-loan-guide-delhi-ncr-property-2026", desc:"Home loan interest rates, EMI calculators, tax benefits under Section 24 and 80C, balance transfer options, and lender comparison guides.", gradient:"linear-gradient(135deg,#090F1D 0%,#1a2a4a 100%)" },
            ].map((topic,i)=>(
              <ScrollReveal key={topic.title} delay={i*60} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column" }}>
                  <div style={{ height:80,background:topic.gradient,display:"flex",alignItems:"center",padding:"0 24px",flexShrink:0 }}>
                    <h3 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:18,color:"var(--gold-lt)",margin:0 }}>{topic.title}</h3>
                  </div>
                  <div style={{ padding:"20px 24px 24px",flex:1,display:"flex",flexDirection:"column" }}>
                    <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.8,flex:1 }}>{topic.desc}</p>
                    <div style={{ paddingTop:16,marginTop:12,borderTop:"1px solid rgba(212,168,67,0.15)" }}>
                      <Link href={`/blog/${topic.slug}`} className="apply-btn" style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:"var(--gold-lt)",display:"inline-flex",alignItems:"center",gap:4,background:"var(--navy)",padding:"6px 14px",borderRadius:6,textDecoration:"none",transition:"all 0.2s" }}>
                        Read Article →
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinksSection
        title="Related advisory pages"
        intro="These pages help readers move from insight to action by connecting blog content with the services, verification, and contact resources they need next."
        background="cream"
        variant="journey"
        links={[
          { href:"/services", label:"Explore the full service suite", description:"See how advisory, property management, and investment support work together in one journey." },
          { href:"/verification-center", label:"Understand the verification framework", description:"Learn how every recommendation is checked before it reaches a client or buyer." },
          { href:"/contact", label:"Book a consultation", description:"Talk to an advisor for tailored support after you read the blog content." },
        ]}
      />
      <CTASection />
    </>
  );
}
