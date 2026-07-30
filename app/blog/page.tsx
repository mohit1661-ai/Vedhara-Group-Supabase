import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title:"Delhi NCR Real Estate Blog | Property Insights, Trends & Guides | Vedhara Group", description:"Expert insights on Delhi NCR property market, RERA updates, NRI investment guide, rental yields, stamp duty, home loans, and locality analysis for Gurugram, Noida, Faridabad, and Delhi.", alternates:{ canonical:"https://www.vedharagroup.com/blog" } };

const blogPosts = [
  {
    title:"Delhi NCR Property Price Trends 2026: A Comprehensive Micro-Market Analysis",
    category:"Market Trends",
    excerpt:"Detailed price-per-sqft analysis across Gurugram, Noida, Faridabad, and Delhi micro-markets. Understand where prices are moving and why, with data-driven insights for buyers and investors across Delhi NCR.",
    keywords:"Delhi NCR property prices, Gurugram real estate trends, Noida property rates 2026, Faridabad property market, Delhi NCR real estate analysis",
    slug:"delhi-ncr-property-price-trends-2026",
    readTime:"8 min read",
    gradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#2a5f8f 100%)",
  },
  {
    title:"RERA in Delhi NCR: Complete Guide for Home Buyers in Gurugram, Noida & Delhi",
    category:"Legal & Compliance",
    excerpt:"Everything you need to know about RERA registration, buyer protection, project status verification, and complaint mechanisms across Haryana RERA, UP RERA, and Delhi RERA.",
    keywords:"RERA Delhi NCR, HRERA Gurugram, UP RERA Noida, Delhi RERA, RERA registration check, buyer protection India",
    slug:"rera-guide-delhi-ncr-home-buyers",
    readTime:"10 min read",
    gradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 50%,#D4A843 100%)",
  },
  {
    title:"NRI Property Investment in Delhi NCR: Taxation, Repatriation & Remote Management Guide",
    category:"NRI Services",
    excerpt:"Complete guide for NRIs investing in Delhi NCR real estate from UAE, USA, UK, Canada, and Singapore. Covering FEMA compliance, TDS on sale, rental repatriation, and remote property management.",
    keywords:"NRI property investment Delhi NCR, NRI real estate India, FEMA property guidelines, TDS on NRI property sale, NRI home loan, repatriation rules",
    slug:"nri-property-investment-delhi-ncr-guide",
    readTime:"12 min read",
    gradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#6a8aaa 100%)",
  },
  {
    title:"Stamp Duty and Registration Charges in Delhi NCR: State-by-State Breakdown 2026",
    category:"Buying Guide",
    excerpt:"Compare stamp duty rates, registration charges, and total acquisition costs across Delhi, Gurugram (Haryana), Noida (UP), and Faridabad. Includes recent budget changes and concessions for women buyers.",
    keywords:"stamp duty Delhi NCR, registration charges Haryana, property registration UP, stamp duty for women, Delhi property tax, home buying costs India",
    slug:"stamp-duty-registration-charges-delhi-ncr-2026",
    readTime:"7 min read",
    gradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 50%,#3a6a8a 100%)",
  },
  {
    title:"Rental Yields in Gurugram vs Noida vs Faridabad: Where Should You Invest in 2026?",
    category:"Investment",
    excerpt:"Data-backed comparison of gross and net rental yields across Delhi NCR's major micro-markets. Analysis of tenant demand, vacancy rates, and capital appreciation potential for buy-to-let investors.",
    keywords:"rental yield Gurugram, rental income Noida, property investment Faridabad, Delhi NCR rental trends, buy-to-let India, rental property returns",
    slug:"rental-yields-gurugram-noida-faridabad-2026",
    readTime:"9 min read",
    gradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#D4A843 100%)",
  },
  {
    title:"Home Loan Guide for Delhi NCR Property: Interest Rates, Eligibility & Tax Benefits 2026",
    category:"Finance",
    excerpt:"Current home loan interest rates from top banks and HFCs for Delhi NCR property, eligibility criteria, EMI calculator guidance, Section 24 and Section 80C tax benefits, and tips for first-time buyers.",
    keywords:"home loan Delhi NCR, property loan interest rates 2026, home loan eligibility India, tax benefit home loan, Section 24, Section 80C, first-time home buyer India",
    slug:"home-loan-guide-delhi-ncr-property-2026",
    readTime:"11 min read",
    gradient:"linear-gradient(135deg,#090F1D 0%,#1a2a4a 50%,#4a6a8a 100%)",
  },
];

export default function BlogPage() {
  return (
    <>
      <VideoHeroSection>
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Blog</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          Delhi NCR Property<br /><span style={{ color:"var(--gold-lt)" }}>Insights & Guides</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Research-backed articles on market trends, RERA, NRI investment, rental yields, and home buying across Delhi NCR.</p>
      </VideoHeroSection>

      {/* Gold differentiator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* Intro block */}
      <div style={{ background:"var(--cream)",textAlign:"center",padding:"48px 32px 0" }}>
        <div style={{ maxWidth:700,margin:"0 auto" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Latest Articles</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Expert Knowledge for<br /><span style={{ color:"var(--gold-dk)" }}>Smarter Property Decisions</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              From market trends to legal guides, our articles are written by Vedhara's advisory team based on real transaction data and ground-level experience across Delhi NCR.
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
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:"var(--gold-dk)",display:"inline-flex",alignItems:"center",gap:4 }}>
                        Read Article →
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Read Vedhara's Blog – 2x2 Differentiators */}
      <section style={{ background:"var(--navy)",padding:"80px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Why Read Vedhara's Blog</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Content You Can Trust,<br /><span style={{ color:"var(--gold-lt)" }}>Insights You Can Use</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.7)",maxWidth:600,margin:"0 auto" }}>
                Most real estate blogs recycle press releases. Ours is built differently.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24 }}>
            {/* Vedhara badge card */}
            <ScrollReveal style={{ display:"flex" }}>
              <div className="gfc-navy-dark" style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,padding:"32px",flex:1,position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",top:12,right:12,background:"var(--gold)",padding:"2px 10px",borderRadius:12,zIndex:1 }}>
                  <span style={{ fontFamily:"var(--t-head)",fontSize:7,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--navy)" }}>Vedhara Blog</span>
                </div>
                <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--light)",marginBottom:16,lineHeight:1.3 }}>Written by Advisors, Not by Writers</h3>
                <p className="body-sm" style={{ color:"rgba(252,250,244,0.65)",fontSize:12,lineHeight:1.8,marginBottom:16 }}>
                  Every article on this blog is researched and written by Vedhara's advisory team, drawing from real client transactions, market data, and daily ground-level exposure across Delhi NCR. We do not outsource content or repurpose developer press releases.
                </p>
                <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                  {["Backed by real transaction data, not speculation","Updated quarterly to reflect market shifts","Reviewed by legal team for regulatory accuracy","Cited by NRI investors, lawyers, and financial planners"].map(item=>(
                    <li key={item} style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"rgba(252,250,244,0.75)",padding:"4px 0 4px 18px",position:"relative",lineHeight:1.6 }}>
                      <span style={{ position:"absolute",left:0,top:"7px",width:6,height:6,borderRadius:"50%",background:"var(--gold)",opacity:0.7 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Competitor box */}
            <ScrollReveal delay={100} style={{ display:"flex" }}>
              <div style={{ background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"32px",flex:1,position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",top:12,right:12,background:"rgba(255,255,255,0.06)",padding:"2px 10px",borderRadius:12,zIndex:1 }}>
                  <span style={{ fontFamily:"var(--t-head)",fontSize:7,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.4)" }}>Other Real Estate Blogs</span>
                </div>
                <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"rgba(252,250,244,0.5)",marginBottom:16,lineHeight:1.3 }}>Written by SEO Teams, Not by Practitioners</h3>
                <p className="body-sm" style={{ color:"rgba(252,250,244,0.3)",fontSize:12,lineHeight:1.8,marginBottom:16 }}>
                  Most real estate content is produced by freelance writers or SEO agencies who have never been on a site visit, negotiated a deal, or verified a RERA number. The result is generic advice that rarely applies to your specific situation.
                </p>
                <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                  {["Often based on outdated or generic data","Republished from developer press releases","No accountability for accuracy or timeliness","Designed for clicks, not for client decisions"].map(item=>(
                    <li key={item} style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"rgba(252,250,244,0.2)",padding:"4px 0 4px 18px",position:"relative",lineHeight:1.6 }}>
                      <span style={{ position:"absolute",left:0,top:"7px",width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,0.15)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Row 2: two more Vedhara strengths */}
            <ScrollReveal delay={50} style={{ display:"flex" }}>
              <div className="gfc-navy-dark" style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,padding:"32px",flex:1 }}>
                <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--light)",marginBottom:10,lineHeight:1.3 }}>Data-Backed Market Analysis</h3>
                <p className="body-sm" style={{ color:"rgba(252,250,244,0.65)",fontSize:12,lineHeight:1.8 }}>
                  Our price trends, rental yield comparisons, and micro-market analyses are derived from Vedhara's proprietary transaction database, not from third-party aggregators. We track actual deal prices, not asking prices, giving you a realistic view of the market.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150} style={{ display:"flex" }}>
              <div className="gfc-navy-dark" style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,padding:"32px",flex:1 }}>
                <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--light)",marginBottom:10,lineHeight:1.3 }}>Practical Guides for Real Decisions</h3>
                <p className="body-sm" style={{ color:"rgba(252,250,244,0.65)",fontSize:12,lineHeight:1.8 }}>
                  Whether it is a step-by-step RERA compliance guide, a stamp duty calculator walkthrough, or an NRI repatriation checklist, every article is structured to help you take action. No fluff, no jargon, just what you need to know before you buy, sell, or invest.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Topics We Cover – Category Navigation */}
      <section style={{ background:"var(--cream)",padding:"80px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Topics We Cover</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                Everything You Need to Know<br /><span style={{ color:"var(--gold-dk)" }}>About Delhi NCR Real Estate</span>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:600,margin:"0 auto" }}>
                From market trends to legal guides, we cover every aspect of property in Delhi NCR.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }} className="grid-3">
            {[
              { title:"Market Trends", desc:"Quarterly price movements, micro-market analysis, demand-supply dynamics, and infrastructure impact assessments across Delhi NCR corridors.", gradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 100%)" },
              { title:"Legal & Compliance", desc:"RERA registration verification, title due diligence, stamp duty, registration charges, and regulatory compliance for both buyers and sellers.", gradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 100%)" },
              { title:"NRI Services", desc:"FEMA guidelines, repatriation rules, TDS on property transactions, power-of-attorney process, and remote purchase management for global Indians.", gradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 100%)" },
              { title:"Buying Guides", desc:"Step-by-step guides for first-time buyers, budget planning, loan eligibility, property inspection checklists, and negotiation strategies.", gradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 100%)" },
              { title:"Investment Strategy", desc:"Rental yield analysis, capital appreciation trends, portfolio diversification, pre-launch vs. ready property evaluation, and exit planning.", gradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 100%)" },
              { title:"Home Finance", desc:"Home loan interest rates, EMI calculators, tax benefits under Section 24 and 80C, balance transfer options, and lender comparison guides.", gradient:"linear-gradient(135deg,#090F1D 0%,#1a2a4a 100%)" },
            ].map((topic,i)=>(
              <ScrollReveal key={topic.title} delay={i*60} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column" }}>
                  <div style={{ height:80,background:topic.gradient,display:"flex",alignItems:"center",padding:"0 24px",flexShrink:0 }}>
                    <h3 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:18,color:"var(--gold-lt)",margin:0 }}>{topic.title}</h3>
                  </div>
                  <div style={{ padding:"20px 24px 24px",flex:1,display:"flex",flexDirection:"column" }}>
                    <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.8,flex:1 }}>{topic.desc}</p>
                    <div style={{ paddingTop:16,marginTop:12,borderTop:"1px solid rgba(212,168,67,0.15)" }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:"var(--gold-dk)",display:"inline-flex",alignItems:"center",gap:4 }}>
                        Browse Articles →
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
