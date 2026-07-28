import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import FAQSection from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title:"Our Team | Vedhara Group — Leadership in Real Estate Advisory",
  description:"Meet the leadership team behind Vedhara Group: Deshraj Sharma (Founder & CEO), Mohit Sharma (MD), Kusum Sharma (Director – Investment Advisory), and Bharat (Director – Developer & Strategic Partnerships).",
  alternates:{ canonical:"https://www.vedharagroup.com/team" },
};

const teamMembers = [
  {
    name:"Deshraj Sharma",
    title:"Founder & Chief Executive Officer",
    initials:"DS",
    gradient:"linear-gradient(135deg,#0F1E38,#2a3f6f)",
    description:"With over two decades of experience in Delhi NCR's real estate landscape, Deshraj Sharma founded Vedhara Group on the principle that property advisory should be independent, transparent, and genuinely client-first. He oversees the firm's strategic direction, partnership framework, and the Vedhara Verification Framework that underpins every listing on the platform. His leadership has built an organisation where the client's interest, not the developer's commission, drives every recommendation.",
    philosophy:"Every property decision changes a family's future. We treat that responsibility with the seriousness it deserves, not as a transaction to be closed.",
    stats:[
      { num:"20+", label:"Years Experience" },
      { num:"500+", label:"Families Guided" },
      { num:"10,000+", label:"Properties Evaluated" },
    ],
  },
  {
    name:"Mohit Sharma",
    title:"Managing Director",
    initials:"MS",
    gradient:"linear-gradient(135deg,#16243F,#D4A843)",
    description:"Mohit Sharma brings strategic rigour and operational depth to Vedhara Group's daily operations. As Managing Director, he is responsible for client advisory standards, team development, and ensuring that every client engagement reflects the firm's commitment to transparency and independence. He works directly with high-net-worth individuals, NRIs, and first-time homebuyers alike, tailoring property strategies that align with each client's unique financial goals and timeline.",
    philosophy:"Great advice is simple: understand the client's life first, then find the property that fits. Everything else is noise.",
    stats:[
      { num:"10+", label:"Years Advisory" },
      { num:"300+", label:"NRI Clientele" },
      { num:"₹500Cr+", label:"Transaction Value" },
    ],
  },
  {
    name:"Kusum Sharma",
    title:"Director – Investment Advisory",
    initials:"KS",
    gradient:"linear-gradient(135deg,#2a3f6f,#E8C970)",
    description:"Kusum Sharma leads Vedhara Group's Investment Advisory vertical, specialising in portfolio-level property strategy for UHNI clients, family offices, and long-term investors. Her expertise spans capital appreciation corridor identification, rental yield optimisation, exit strategy planning, and cross-city portfolio diversification across Delhi NCR micro-markets. She is also the driving force behind the firm's NRI desk, ensuring distance never compromises the quality of property decision-making.",
    philosophy:"Real estate wealth is built in the buying, not the selling. The right purchase with the right thesis is half the work done.",
    stats:[
      { num:"15+", label:"Years Investment Experience" },
      { num:"200+", label:"Portfolios Advised" },
      { num:"85%", label:"Client Repeat Rate" },
    ],
  },
  {
    name:"Bharat",
    title:"Director – Developer & Strategic Partnerships",
    initials:"BH",
    gradient:"linear-gradient(135deg,#1a3a5c,#B8922A)",
    description:"Bharat leads Vedhara Group's developer partnerships and strategic alliances across Delhi NCR. His deep relationships with leading developers, combined with a rigorous evaluation framework, ensure that only projects meeting Vedhara's five-point Verification Framework make it to the platform. He manages the entire partnership lifecycle from initial due diligence through ongoing compliance monitoring, giving clients the confidence that every listed project has been independently vetted before they ever see it.",
    philosophy:"A listing is only as good as the verification behind it. Our partners know that we hold every project to the same standard we promise our clients.",
    stats:[
      { num:"50+", label:"Developer Partners" },
      { num:"200+", label:"Verified Projects" },
      { num:"5", label:"Verification Checks" },
    ],
  },
];

const whyMatters = [
  { title:"Independent Perspective", desc:"Every team member operates without exclusive developer tie-ups. Our advice is built around your requirements, not around commission structures." },
  { title:"Deep Local Knowledge", desc:"Collectively, the team has evaluated over 10,000 properties across every micro-market in Delhi NCR. This depth of ground-level data powers every recommendation." },
  { title:"Single-Point Accountability", desc:"From your first conversation to post-possession support, one named advisor owns your journey. No handoffs, no call centres, no rotating teams." },
  { title:"Published Verification", desc:"The Vedhara Verification Framework is the only publicly documented due-diligence process in the NCR advisory market. Every team member is trained to apply it consistently." },
];

const stats = [
  { num:"50+", label:"Developer Partnerships" },
  { num:"500+", label:"Families Served" },
  { num:"10,000+", label:"Properties Evaluated" },
  { num:"6", label:"Micro-Markets Covered" },
];

const faqs = [
  { q:"How do I know which team member to speak with?", a:"Your first conversation is always a discovery call. Based on your requirements, we introduce you to the most relevant team member. For most buyers, sellers, and NRIs, this will be Mohit Sharma or Kusum Sharma depending on the nature of your requirement." },
  { q:"Can I speak directly with the Founder?", a:"Deshraj Sharma is personally involved in all strategic client engagements and complex transactions. If your requirement involves portfolio-level investment, cross-city strategy, or high-value negotiations, the initial consultation will include direct access to the Founder." },
  { q:"How do you ensure your advice is unbiased if you work with developers?", a:"Independence is the foundation of our practice. We maintain no exclusive tie-ups with any developer, which means we can recommend, or recommend against, any project in the market. Our advisors are evaluated on client satisfaction and long-term outcomes, not on which project you choose. Every recommendation is documented with the rationale, and clients are encouraged to verify our claims independently." },
  { q:"Is the team available for weekend consultations?", a:"Yes. NRI clients and working professionals can schedule weekend and evening IST video consultations. Kusum Sharma's NRI desk operates dedicated Saturday and Sunday slots from 10 AM to 4 PM IST. Standard weekday appointments are available from 9 AM to 7 PM." },
  { q:"What happens after I finalise a property? Does your team help with registration?", a:"Absolutely. Our support extends through the entire lifecycle, from offer negotiation and earnest money deposit coordination to legal document verification, bank loan facilitation, registration appointment scheduling, and post-possession handover support. Your named advisor stays with you until you have the keys in your hand and the registry in your name. We do not disappear after the deal." },
  { q:"How large is the Vedhara Group team?", a:"Vedhara Group operates a lean, senior-led team model. Every client engagement is managed by a named senior advisor from day one, supported by dedicated research and documentation specialists. This structure ensures continuity, accountability, and depth; you speak with the person who makes decisions, not a junior associate reading from a script." },
  { q:"Which micro-markets in Delhi NCR does your team cover?", a:"Our team has evaluated over 10,000 properties across Gurugram (Golf Course Road, Golf Course Extn Road, Dwarka Expressway, Sectors 43-115), Noida & Greater Noida (Sector 150, 137, 168, Tech Zone 4), Faridabad (Neharpar, Sector 81-89), and Ghaziabad (Raj Nagar Extension, Indirapuram, Vaishali). If a property is listed anywhere in Delhi NCR, we have ground-level data on the micro-market." },
  { q:"Can you manage my property remotely if I am an NRI?", a:"Yes. Kusum Sharma's NRI vertical covers the full lifecycle: property selection via video walkthroughs, documentation through e-signature and power of attorney, purchase completion with remote coordination, and then ongoing property management, rent collection, maintenance coordination, tenant management, and periodic inspection reports with photo and video documentation. You do not need to be physically present at any stage." },
  { q:"What makes Vedhara Group different from a regular real estate agent?", a:"A regular agent typically represents a developer or a seller and earns commission only when you buy from their listed properties. Vedhara Group works as a fiduciary advisor; we are not bound to any developer, we publish our verification framework publicly, we assign a named senior advisor to every client, and we stay engaged through possession and beyond. Our repeat client rate of 85% and our published verification process are the two markers that most clearly separate us from the conventional brokerage model." },
];

export default function TeamPage() {
  return (
    <>
      <VideoHeroSection>
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Leadership</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(36px,6vw,72px)",color:"var(--light)",lineHeight:1.02,marginBottom:24 }}>
          The People Behind<br />
          <span style={{ color:"var(--gold-lt)" }}>Your Property Decisions.</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto 32px" }}>
          Every client at Vedhara Group works with a named senior advisor, not a rotating team. Meet the leadership that sets the standard.
        </p>
        <Link href="/contact" className="btn btn-primary" style={{ marginTop:4 }}>Book a Free Consultation</Link>
      </VideoHeroSection>

      {/* Team Grid */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Our Team</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>
                Advisors You Can Trust,{" "}
                <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold)" }}>Names You Will Know</em>
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
            {teamMembers.map((member,i)=>(
              <ScrollReveal key={member.name} delay={i*100}>
                <div className="team-card" style={{ background:"var(--cream)",border:"1px solid rgba(42,45,53,0.08)",overflow:"hidden",transition:"all 0.4s var(--ease-out)" }}>
                  {/* Full-width photo banner — like featured properties, taller for portrait */}
                  <div style={{ height:280,background:member.gradient,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.08) 0%,transparent 60%)" }} />
                    <div style={{ width:130,height:130,borderRadius:14,background:"rgba(15,30,56,0.35)",border:"2px solid rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",position:"relative",zIndex:1,boxShadow:"0 12px 36px rgba(0,0,0,0.2)" }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:42,fontWeight:700,color:"rgba(255,255,255,0.9)",letterSpacing:"0.05em" }}>{member.initials}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div style={{ padding:"24px 32px 28px" }}>
                    <div style={{ marginBottom:18 }}>
                      <h3 style={{ fontFamily:"var(--t-head)",fontSize:22,fontWeight:700,color:"var(--navy)",marginBottom:4 }}>{member.name}</h3>
                      <p style={{ fontFamily:"var(--t-body)",fontSize:12,color:"var(--gold-dk)",letterSpacing:"0.04em",margin:0,textTransform:"uppercase" }}>{member.title}</p>
                    </div>
                    <p className="body-sm" style={{ color:"var(--slate)",lineHeight:1.85,marginBottom:20 }}>
                      {member.description}
                    </p>
                    {/* Philosophy quote */}
                    <div style={{ borderLeft:"2px solid var(--gold)",padding:"10px 0 10px 16px",marginBottom:20,background:"rgba(212,168,67,0.04)" }}>
                      <p style={{ fontFamily:"var(--t-head)",fontSize:11.5,fontStyle:"italic",color:"var(--slate)",lineHeight:1.7,margin:0 }}>
                        &ldquo;{member.philosophy}&rdquo;
                      </p>
                    </div>
                    {/* Stats */}
                    <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(42,45,53,0.06)",borderRadius:6,overflow:"hidden" }}>
                      {member.stats.map(stat=>(
                        <div key={stat.label} style={{ padding:"12px 8px",textAlign:"center",background:"var(--cream)" }}>
                          <div style={{ fontFamily:"var(--t-head)",fontSize:16,fontWeight:700,color:"var(--gold-dk)",lineHeight:1,marginBottom:4 }}>{stat.num}</div>
                          <div style={{ fontFamily:"var(--t-body)",fontSize:8.5,color:"var(--slate)",textTransform:"uppercase",letterSpacing:"0.06em" }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Team Matters */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Why It Matters</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>
                Four Reasons Our Team Structure{" "}
                <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold)" }}>Works for You</em>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-4">
            {whyMatters.map((item,i)=>(
              <ScrollReveal key={item.title} delay={i*70}>
                <div className="svc-card" style={{ background:"var(--cream)",borderRadius:0 }}>
                  <div className="gold-accent"></div>
                  <h3 className="svc-card-title">{item.title}</h3>
                  <p className="svc-card-desc">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Firm-wide Stats */}
      <section style={{ background:"var(--navy)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>By the Numbers</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",lineHeight:1.1 }}>
                The Vedhara Group{" "}
                <span style={{ color:"var(--gold-lt)" }}>Difference</span>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"rgba(212,168,67,0.08)" }} className="grid-4">
            {stats.map((s,i)=>(
              <ScrollReveal key={s.label} delay={i*60}>
                <div style={{ padding:"36px 20px",textAlign:"center",background:"rgba(9,15,29,0.3)" }}>
                  <div className="gold-accent-sm" style={{ margin:"0 auto 14px" }}></div>
                  <div style={{ fontFamily:"var(--t-head)",fontSize:"clamp(28px,3.5vw,40px)",fontWeight:700,color:"var(--gold-lt)",lineHeight:1,marginBottom:8 }}>{s.num}</div>
                  <div style={{ fontFamily:"var(--t-body)",fontSize:11,color:"rgba(255,255,255,0.65)",textTransform:"uppercase",letterSpacing:"0.08em" }}>{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"var(--cream)",padding:"60px 32px",textAlign:"center" }}>
        <div style={{ maxWidth:560,margin:"0 auto" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:14,lineHeight:1.1 }}>Ready to Work with a Named Advisor?</h2>
            <p className="body-lg" style={{ color:"var(--slate)",marginBottom:28 }}>
              Start with a 30-minute discovery conversation. Free, no obligation, and you will know exactly which team member will guide your journey.
            </p>
            <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
              <Link href="/contact" className="btn btn-dark">Book a Free Consultation</Link>
              <Link href="/about" className="btn" style={{ background:"#FFFFFF",color:"var(--ink)",border:"1px solid rgba(42,45,53,0.12)" }}>Learn More About Us</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Our Team, FAQ" />


    </>
  );
}
