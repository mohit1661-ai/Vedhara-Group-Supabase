import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title:"Client Success Stories | Delhi NCR", description:"Real client outcomes from Vedhara Group's independent real estate advisory across Delhi NCR, from first-time buyers in Noida to NRI investors in Gurugram.", alternates:{ canonical:"https://www.vedharagroup.com/success-stories" } };

const stories = [
  {
    title:"Finding the Right Home for a Young Family in Noida",
    client:"Mr. & Mrs. Kapoor",
    location:"Sector 150, Noida",
    outcome:"3 BHK apartment at ₹2.1 Cr, 12% below initial budget",
    quote:"Vedhara saved us from making an expensive mistake on a project with title issues. They found us a better property at a lower price.",
    tags:["First-Time Buyer","Residential","Noida"],
    gradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#2a5f8f 100%)",
  },
  {
    title:"NRI Sold Gurugram Property Without a Single Visit",
    client:"Mr. Arjun Mehta (Dubai-based)",
    location:"Sector 57, Gurugram",
    outcome:"3 BHK sold at ₹2.85 Cr, full remote coordination",
    quote:"I never had to travel. Vedhara handled everything from tenant negotiation to final registration via video, email, and their local team.",
    tags:["NRI","Sell","Remote","Gurugram"],
    gradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#6a8aaa 100%)",
  },
  {
    title:"Investment Portfolio Built Across NCR Corridors",
    client:"Dr. Priya Sharma",
    location:"Gurugram & Noida Expressway",
    outcome:"Two investment properties acquired, blended yield 4.2%",
    quote:"The decision framework Vedhara uses gave me confidence to invest across two cities. The rental yield analysis was spot on.",
    tags:["Investor","Portfolio","Multi-City"],
    gradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 50%,#D4A843 100%)",
  },
  {
    title:"Downsizing After Retirement in Faridabad",
    client:"Col. R. Nair (Retd.)",
    location:"NH-19, Faridabad",
    outcome:"Sold 4 BHK independent house, bought 2 BHK premium apartment, unlocked ₹1.2 Cr liquidity",
    quote:"Vedhara's team was patient, thorough, and never pushy. They understood that timing mattered more than speed for us.",
    tags:["Downsizing","Sell & Buy","Retirement","Faridabad"],
    gradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#D4A843 100%)",
  },
  {
    title:"First Real Estate Investment from the UK",
    client:"Ms. Ananya Desai (London-based)",
    location:"Sector 150, Noida",
    outcome:"2 BHK under-construction unit booked at ₹1.15 Cr, EMI structured across NRE account",
    quote:"As an NRI first-time investor, I had a hundred questions. Vedhara answered every single one with data, not sales talk.",
    tags:["NRI","First-Time Investor","Under-Construction"],
    gradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 50%,#3a6a8a 100%)",
  },
  {
    title:"Commercial Lease Advisory for a Scaling Business",
    client:"TechVault Solutions Pvt. Ltd.",
    location:"Sector 44, Gurugram",
    outcome:"8,500 sq.ft. office leased at 18% below market rate",
    quote:"Vedhara negotiated on our behalf as if they were part of our team. The lease terms we got were significantly better than anything we found independently.",
    tags:["Commercial","Lease","Gurugram","Corporate"],
    gradient:"linear-gradient(135deg,#090F1D 0%,#1a2a4a 50%,#4a6a8a 100%)",
  },
];

const storiesFaqs = [
  { q:"Are these success stories real?", a:"Yes. Every story reflects a genuine Vedhara client engagement and is shared with the client's permission. To respect privacy and confidentiality, names and some identifying details may be adjusted, but the figures, outcomes, and the nature of the engagement are accurately represented." },
  { q:"Can my experience be featured as a success story?", a:"If you are a Vedhara client and would like to share your experience, just mention it to your advisor or write to contact@vedharagroup.com. We only ever publish stories with explicit client consent and full control over what is shared." },
  { q:"How does Vedhara achieve below-market prices like these?", a:"Our negotiation is grounded in comparable transaction data, timing, and an independent position; we are not compensated to push any developer or seller. We also flag risks early, which avoids costly mistakes that often inflate the final cost of a purchase." },
  { q:"Can I get a similar outcome for my own situation?", a:"Every engagement is different, and no result is guaranteed. What these stories share is a repeatable process: a discovery call, verification of every shortlisted property, honest pricing, skilled negotiation, and end-to-end documentation. That process is available to every client." },
  { q:"Do you have success stories for NRI clients specifically?", a:"Yes. Several stories in this section were completed fully remotely, including sale, purchase, and investment transactions for clients in the UAE, UK, and elsewhere; coordinated through video calls, digital documentation, and Power of Attorney." },
  { q:"What does it cost to start working with Vedhara?", a:"Your first consultation is free and carries no obligation. For buyer and seller mandates we generally work on a success-based fee disclosed upfront, and for advisory and management work we use fixed, agreed fees with no hidden charges." },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <VideoHeroSection>
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Success Stories</p>
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
          Real Client Success Stories,<br /><span style={{ color:"var(--gold-lt)" }}>Real Outcomes</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Every story here is a real Vedhara client engagement, shared with permission. No stock photos, no fictional scenarios, no sales scripts.</p>
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
            <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>Client Outcomes</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Every Client Has a Story,<br /><span style={{ color:"#d4a843" }}>Here Are a Few</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              From first-time buyers in Noida to NRI investors in Dubai and corporate tenants in Gurugram, each engagement reflects the same commitment, independent advice, verified information, and transparent process.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* How We Help Clients Succeed – Navy + Cream Card Pair */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>How We Help Clients Succeed</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                The Vedhara Approach to<br /><span style={{ color:"#d4a843" }}>Client Outcomes</span>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:620,margin:"0 auto" }}>
                Independent advice, verified properties, and a fee structure that aligns with your interest, not a developer&apos;s margin.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
            {/* What We Do – Navy */}
            <ScrollReveal>
              <div className="gold-frame-card gfc-navy" style={{ padding:"44px 36px",boxShadow:"0 16px 40px rgba(9,15,29,0.2)" }}>
                <span className="v-line" style={{ background:"var(--gold)" }} />
                <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>What We Do</p>
                <h2 className="heading-lg" style={{ color:"var(--light)",marginBottom:24 }}>What We Do</h2>
                <p className="body-md" style={{ color:"rgba(252,250,244,0.78)",lineHeight:1.8,marginBottom:24 }}>
                  Vedhara Group provides end-to-end independent real estate advisory across Delhi NCR. We do not sell developer inventory, earn commissions, or push pre-launch projects. Our revenue comes entirely from client-paid advisory fees, which means every recommendation is aligned with your interest, not a developer&apos;s margin.
                </p>
                {["Property search & shortlisting across all NCR micro-markets","Price negotiation, legal due diligence & transaction management","NRI remote advisory with full power-of-attorney coordination","Portfolio strategy, rental analysis & exit planning"].map(item=>(
                  <div key={item} style={{ display:"flex",gap:14,marginBottom:14,alignItems:"flex-start" }}>
                    <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:16,fontWeight:700,lineHeight:1 }}>✓</span>
                    <span className="body-md" style={{ color:"rgba(252,250,244,0.78)",lineHeight:1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Who We Serve – Cream */}
            <ScrollReveal delay={120} direction="right">
              <div className="gold-frame-card gfc-cream" style={{ padding:"44px 36px",boxShadow:"0 8px 24px rgba(9,15,29,0.06)" }}>
                <span className="v-line" style={{ background:"var(--gold)" }} />
                <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Who We Serve</p>
                <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:24 }}>Who We Serve</h2>
                <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.8,marginBottom:24 }}>
                  Our clients range from first-time home buyers in Faridabad to HNI investors managing multi-crore portfolios across Noida, Gurugram, and Delhi. We also serve a significant base of NRI clients across UAE, USA, UK, Canada, and Singapore who rely on us for end-to-end remote advisory and transaction management.
                </p>
                {["First-time home buyers needing trusted guidance","NRI investors seeking remote, reliable advisory","HNI & UHNI clients requiring portfolio strategy","Corporate tenants negotiating commercial leases","Retirees downsizing or relocating within NCR"].map(item=>(
                  <div key={item} style={{ display:"flex",gap:14,marginBottom:14,alignItems:"flex-start" }}>
                    <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:14,lineHeight:1 }}>◆</span>
                    <span className="body-md" style={{ color:"var(--slate)",lineHeight:1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Vedhara – 2x2 Vibrant Cream Cards on Navy */}
      <section style={{ background:"var(--navy)",padding:"80px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:52 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Why Clients Choose Vedhara</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                The Difference Is<br /><span style={{ color:"var(--gold-lt)" }}>Independent Advice</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:600,margin:"0 auto" }}>
                Our success stories are not accidents. They are the result of a fundamentally different approach to real estate advisory.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24 }}>
            {[
              { title:"No Commission, No Conflict", desc:"Unlike brokers who earn from developers, our fee is paid by the client. This simple difference drives everything, from property selection to price negotiation." },
              { title:"Five-Point Verification", desc:"Every property we recommend passes title verification, RERA compliance, construction quality assessment, market price benchmarking, and exit liquidity check." },
              { title:"Named Advisor, End-to-End", desc:"From first consultation to possession, a single senior advisor owns your engagement. No handoffs, no junior associates learning on your transaction." },
              { title:"Post-Purchase Support", desc:"Our relationship does not end at registration. We help with rental management, property tax compliance, resale advisory, and portfolio rebalancing." },
            ].map((item,i)=>(
              <ScrollReveal key={item.title} delay={i*80} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column",boxShadow:"0 8px 24px rgba(0,0,0,0.15)" }}>
                  {/* Gold top accent */}
                  <div style={{ height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt),var(--gold))",flexShrink:0 }} />
                  <div style={{ padding:"28px 28px 24px",flex:1,display:"flex",flexDirection:"column" }}>
                    {/* Vedhara badge + number */}
                    <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"3px 8px",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",color:"var(--navy)",borderRadius:3,flexShrink:0 }}>Vedhara</span>
                      <div style={{ flex:1,height:1,background:"rgba(212,168,67,0.15)" }} />
                      <span style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:700,color:"var(--gold-dk)",opacity:0.5 }}>0{i+1}</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:16,fontWeight:700,color:"var(--navy)",marginBottom:10,lineHeight:1.3 }}>{item.title}</h3>
                    <p className="body-md" style={{ color:"var(--slate)",fontSize:13,lineHeight:1.8,flex:1 }}>{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stories grid */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }} className="grid-3">
            {stories.map((s,i)=>(
              <ScrollReveal key={s.title} delay={i*60} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column" }}>
                  <div style={{ height:120,background:s.gradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0 }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",padding:"0 16px",position:"relative",zIndex:1 }}>
                      {s.tags.map(tag=>(
                        <span key={tag} style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"3px 8px",borderRadius:12,background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.85)",border:"1px solid rgba(255,255,255,0.2)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding:"24px 24px 20px",flex:1,display:"flex",flexDirection:"column" }}>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:10.5,color:"var(--gold-dk)",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:600,marginBottom:2 }}>{s.client}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:10.5,color:"var(--slate)",marginBottom:8 }}>{s.location}</p>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.4 }}>{s.title}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.7,flex:1 }}>{s.outcome}</p>
                    <div style={{ padding:"14px 16px",background:"rgba(212,168,67,0.06)",borderRadius:8,borderLeft:"2px solid var(--gold)",marginTop:12 }}>
                      <p className="body-sm" style={{ color:"var(--ink)",fontSize:11.5,fontStyle:"italic",lineHeight:1.6,margin:0 }}>&ldquo;{s.quote}&rdquo;</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={storiesFaqs} title="Success Stories, FAQ" />
      <CTASection />
    </>
  );
}
