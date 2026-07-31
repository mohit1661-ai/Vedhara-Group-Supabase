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
    openGraph:{ title:post.metaTitle, description:post.metaDescription, type:"article" },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug:string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p)=>p.slug===slug);
  if(!post) notFound();

  const schema = {
    "@context":"https://schema.org",
    "@type":"Article",
    headline:post.title,
    description:post.metaDescription,
    author:{ "@type":"Organization", name:"Vedhara Group" },
    publisher:{ "@type":"Organization", name:"Vedhara Group" },
    mainEntityOfPage:`https://www.vedharagroup.com/blog/${post.slug}`,
    keywords:post.keywords.join(", "),
  };

  const others = blogPosts.filter((p)=>p.slug!==slug).slice(0,3);

  return (
    <>
      <JsonLd data={schema} />
      <VideoHeroSection>
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>{post.category}</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(28px,4.5vw,52px)",color:"var(--light)",lineHeight:1.12,marginBottom:20,maxWidth:880,margin:"0 auto 20px" }}>
          {post.title}
        </h1>
        <p className="body-sm" style={{ color:"rgba(255,255,255,0.75)",margin:"0 auto",maxWidth:520 }}>
          By the Vedhara Group Advisory Team · {post.readTime} · {post.category}
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
            <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>Overview</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Understanding the <span style={{ color:"#d4a843" }}>Big Picture</span>
            </h2>
            {post.intro.map((para,idx)=>(
              <p key={idx} className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8,marginBottom:14 }}>
                {para}
              </p>
            ))}
          </ScrollReveal>
        </div>
      </div>

      {/* Article body */}
      <section style={{ background:"var(--cream)",padding:"20px 32px 64px" }}>
        <div style={{ maxWidth:800,margin:"0 auto" }}>
          {post.sections.map((sec,si)=>(
            <ScrollReveal key={sec.heading} delay={si*40}>
              <div style={{ marginBottom:44 }}>
                <div style={{ display:"flex",alignItems:"flex-start",gap:14,marginBottom:18 }}>
                  <span className="v-line" style={{ flexShrink:0,marginTop:6 }} />
                  <h2 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(24px,3vw,32px)",color:"var(--navy)",lineHeight:1.2 }}>
                    {sec.heading}
                  </h2>
                </div>
                {sec.paragraphs.map((para,pi)=>(
                  <p key={pi} className="body-md" style={{ color:"var(--slate)",lineHeight:1.85,fontSize:14.5,marginBottom:16 }}>
                    {para}
                  </p>
                ))}
                {sec.list && (
                  <div style={{ background:"var(--light)",border:"1px solid rgba(212,168,67,0.25)",borderRadius:12,padding:"20px 24px",marginTop:6 }}>
                    <p style={{ fontFamily:"var(--t-head)",fontSize:10.5,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--gold-dk)",marginBottom:12 }}>Key Points</p>
                    {sec.list.map((item,li)=>(
                      <div key={li} style={{ display:"flex",alignItems:"flex-start",gap:10,marginBottom:8 }}>
                        <span style={{ color:"var(--gold-dk)",fontSize:13,lineHeight:1.6,flexShrink:0 }}>◆</span>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:13.5,color:"var(--ink)",lineHeight:1.7,margin:0 }}>{item}</p>
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
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20 }} className="grid-2">
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
              <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>Keep Reading</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:12 }}>
                More Articles for <span style={{ color:"#d4a843" }}>Property Buyers</span>
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
                      <p style={{ fontFamily:"var(--t-body)",fontSize:10,color:"var(--gold-dk)",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:600,marginBottom:4 }}>{other.readTime}</p>
                      <h3 style={{ fontFamily:"var(--t-head)",fontSize:13,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.4 }}>{other.title}</h3>
                      <p className="body-sm" style={{ color:"var(--slate)",fontSize:11.5,lineHeight:1.7,flex:1 }}>{other.excerpt}</p>
                      <div style={{ paddingTop:14,marginTop:10,borderTop:"1px solid rgba(212,168,67,0.15)" }}>
                        <span style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:"var(--gold-dk)",display:"inline-flex",alignItems:"center",gap:4 }}>Read Article →</span>
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
