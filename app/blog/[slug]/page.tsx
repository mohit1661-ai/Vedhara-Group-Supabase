import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blogPosts";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return blogPosts.map((p)=>({ slug:p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug:string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p)=>p.slug===slug);
  if(!post) return { title:"Article Not Found" };
  return {
    title:post.metaTitle,
    description:post.metaDescription,
    keywords:post.keywords,
    alternates:{ canonical:`https://www.vedharagroup.com/blog/${post.slug}` },
    openGraph:{
      title:post.metaTitle || post.title,
      description:post.metaDescription,
      type:"article",
      publishedTime:post.datePublished,
      modifiedTime:post.dateModified,
      images:[{ url:"/og-default.jpg", width:1200, height:630, alt:post.title }],
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug:string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p)=>p.slug===slug);
  if(!post) notFound();

  const wordCount = post.sections.reduce((acc, s) => acc + s.paragraphs.join(" ").split(/\s+/).length, 0)
    + post.intro.join(" ").split(/\s+/).length
    + post.takeaways.join(" ").split(/\s+/).length;

  const schema = {
    "@context":"https://schema.org",
    "@type":"Article",
    headline:post.title,
    description:post.metaDescription,
    datePublished:post.datePublished,
    dateModified:post.dateModified,
    image:"/og-default.jpg",
    author:{ "@type":"Person", name:"Mohit Sharma", jobTitle:"Managing Director" },
    publisher:{ "@type":"Organization", name:"Vedhara Group", "@id":"https://www.vedharagroup.com/#organization" },
    mainEntityOfPage:`https://www.vedharagroup.com/blog/${post.slug}`,
    keywords:post.keywords.join(", "),
    wordCount,
    speakable:{
      "@type":"SpeakableSpecification",
      cssSelector:[".article-takeaways"],
    },
  };

  const others = blogPosts.filter((p)=>p.slug!==slug).slice(0,3);

  return (
    <>
      <JsonLd data={schema} />
      <VideoHeroSection videoSrc={post.videoSrc} posterAlt={post.title}>
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>{post.category}</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(28px,4.5vw,52px)",color:"var(--light)",lineHeight:1.12,maxWidth:880,margin:"0 auto 20px" }}>
          {post.title}
        </h1>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,flexWrap:"wrap",marginBottom:16 }}>
          <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 12px",borderRadius:20,background:"rgba(212,168,67,0.15)",color:"var(--gold-lt)",border:"1px solid rgba(212,168,67,0.4)" }}>{post.category}</span>
          <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 12px",borderRadius:20,background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.85)",border:"1px solid rgba(255,255,255,0.2)" }}>{post.readTime}</span>
          <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 12px",borderRadius:20,background:"rgba(212,168,67,0.15)",color:"var(--gold-lt)",border:"1px solid rgba(212,168,67,0.4)" }}>By Mohit Sharma · Managing Director</span>
        </div>
        <p className="body-sm" style={{ color:"rgba(255,255,255,0.7)",margin:"0 auto",maxWidth:560 }}>
          Grounded in real transaction data across Delhi NCR.
        </p>
      </VideoHeroSection>

      {/* Gold differentiator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* Intro block */}
      <div style={{ background:"var(--cream)",textAlign:"center",padding:"48px 32px 48px" }}>
        <div style={{ maxWidth:720,margin:"0 auto" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>Overview</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Understanding the <span style={{ color:"var(--gold-ink)" }}>Big Picture</span>
            </h2>
            {post.intro.map((para,idx)=>(
              <p key={idx} className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8,marginBottom:14 }}>
                {para}
              </p>
            ))}
          </ScrollReveal>
        </div>
      </div>

      {/* What This Guide Covers – Vibrant Cream Cards on Navy */}
      <section style={{ background:"var(--navy)",padding:"56px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:12 }}>What This Guide Covers</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:12 }}>
                The Four Sections,<br /><span style={{ color:"var(--gold-lt)" }}>Explored In Depth</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:620,margin:"0 auto" }}>
                Each section below is grounded in current market data and the questions we answer every day for clients across Delhi NCR.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20 }} className="grid-2">
            {post.sections.map((sec,si)=>(
              <ScrollReveal key={sec.heading} delay={si*80} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column",boxShadow:"0 8px 24px rgba(0,0,0,0.15)" }}>
                  <div style={{ height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt),var(--gold))",flexShrink:0 }} />
                  <div style={{ padding:"24px 20px 24px",flex:1,display:"flex",flexDirection:"column",textAlign:"center",alignItems:"center" }}>
                    <div style={{ width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12,flexShrink:0 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)" }}>{si+1}</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:400,fontSize:17,color:"var(--navy)",lineHeight:1.35 }}>{sec.heading}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ background:"var(--cream)",padding:"64px 32px" }}>
        <div style={{ maxWidth:820,margin:"0 auto" }}>
          {post.sections.map((sec,si)=>(
            <ScrollReveal key={sec.heading} delay={si*40}>
              <div style={{ marginBottom:56 }}>
                <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:22 }}>
                  <div style={{ width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <span style={{ fontFamily:"var(--t-head)",fontSize:13,fontWeight:700,color:"var(--navy)" }}>{si+1}</span>
                  </div>
                  <h2 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(24px,3vw,34px)",color:"var(--navy)",lineHeight:1.2,margin:0 }}>
                    {sec.heading}
                  </h2>
                </div>
                {sec.paragraphs.map((para,pi)=>(
                  <p key={pi} className="body-md" style={{ color:"var(--slate)",lineHeight:1.9,fontSize:15,marginBottom:18 }}>
                    {para}
                  </p>
                ))}
                {sec.list && (
                  <div className="gold-frame-card gfc-navy" style={{ padding:"26px 28px",boxShadow:"0 8px 24px rgba(0,0,0,0.2)" }}>
                    <p style={{ fontFamily:"var(--t-head)",fontSize:10.5,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--gold-lt)",marginBottom:14 }}>Key Points</p>
                    {sec.list.map((item,li)=>(
                      <div key={li} style={{ display:"flex",alignItems:"flex-start",gap:12,marginBottom:10 }}>
                        <span style={{ color:"var(--gold-lt)",flexShrink:0,marginTop:2,fontSize:14,lineHeight:1 }}>◆</span>
                        <p className="body-md" style={{ color:"rgba(252,250,244,0.85)",lineHeight:1.7,margin:0 }}>{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Key Takeaways – vibrant cream cards on navy */}
      <section style={{ background:"var(--navy)",padding:"56px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:12 }}>Key Takeaways</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:12 }}>
                What to <span style={{ color:"var(--gold-lt)" }}>Remember</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:600,margin:"0 auto" }}>
                Five points to carry with you from this article before you make your next decision.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20 }} className="grid-2 article-takeaways">
            {post.takeaways.map((take,ti)=>(
              <ScrollReveal key={ti} delay={ti*70} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",alignItems:"center",gap:14,padding:"18px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)" }}>
                  <div style={{ width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <span style={{ fontFamily:"var(--t-head)",fontSize:13,fontWeight:700,color:"var(--navy)" }}>✓</span>
                  </div>
                  <p style={{ fontFamily:"var(--t-head)",fontSize:12.5,fontWeight:600,color:"var(--navy)",lineHeight:1.5,margin:0 }}>{take}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Article FAQs */}
      <FAQSection title="Frequently Asked Questions" faqs={post.faqs} dark={false} decor />

      {/* More articles */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>Keep Reading</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:12 }}>
                More Articles for <span style={{ color:"var(--gold-ink)" }}>Property Buyers</span>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }} className="grid-3">
            {others.map((other,i)=>(
              <ScrollReveal key={other.slug} delay={i*60} style={{ display:"flex" }}>
                <Link href={`/blog/${other.slug}`} style={{ textDecoration:"none",flex:1,display:"flex" }}>
                  <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ height:110,background:other.gradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0 }}>
                      <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                      <span style={{ position:"relative",zIndex:1,fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"3px 10px",borderRadius:20,background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.9)",border:"1px solid rgba(255,255,255,0.25)" }}>{other.category}</span>
                    </div>
                    <div style={{ padding:"18px 20px 20px",flex:1,display:"flex",flexDirection:"column" }}>
                      <p style={{ fontFamily:"var(--t-body)",fontSize:10,color:"var(--gold-ink)",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:600,marginBottom:4 }}>{other.readTime}</p>
                      <h3 style={{ fontFamily:"var(--t-head)",fontSize:13,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.4 }}>{other.title}</h3>
                      <p className="body-sm" style={{ color:"var(--slate)",fontSize:11.5,lineHeight:1.7,flex:1 }}>{other.excerpt}</p>
                      <div style={{ paddingTop:14,marginTop:10,borderTop:"1px solid rgba(212,168,67,0.15)" }}>
                        <span className="apply-btn" style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:"var(--gold-lt)",display:"inline-flex",alignItems:"center",gap:4,background:"var(--navy)",padding:"6px 14px",borderRadius:6,transition:"all 0.2s",cursor:"pointer" }}>Read Article →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
