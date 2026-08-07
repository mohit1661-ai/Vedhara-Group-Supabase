import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CinematicHero from "@/components/sections/CinematicHero";
import AnimatedStats from "@/components/sections/AnimatedStats";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RelatedLinksSection from "@/components/sections/RelatedLinksSection";

export const metadata: Metadata = {
  title: "Vedhara Group | Verified Property Advisory in Delhi NCR",
  description: "North India's independent real estate advisory firm. Buy, sell or invest across Delhi NCR, Faridabad, Manesar & Chandigarh with verified listings.",
  alternates: { canonical: "https://www.vedharagroup.com" },
};

/* ── Word doc: Page 1, Homepage ─────────────────────────── */
const checks = [
  { num:"01", title:"RERA Registration", desc:"Registration number verified against UP RERA (rera.up.gov.in), HRERA (hrera.org.in), or Delhi RERA (rera.delhi.gov.in). Validity dates and quarterly progress report filings confirmed before any listing goes live." },
  { num:"02", title:"Builder Delivery History", desc:"Past project completion timelines reviewed. Any litigation on record, consumer forum complaints, or RERA non-compliance notices are disclosed to you upfront, not discovered after you have committed." },
  { num:"03", title:"Project-Level Approvals", desc:"Building plan sanction, commencement certificate, environmental clearance where applicable under EIA notification, and OC status checked at the specific project level, not just at developer level." },
  { num:"04", title:"Price Fairness", desc:"Every listing benchmarked against recent registered transactions using government circle rate data and comparable sales in the same locality. We publish whether this project is fairly priced, at a premium, or at a discount." },
  { num:"05", title:"Title & Documents", desc:"Developer confirms in writing the ability to produce title chain documents, allotment letters, and registered sale deed templates before we publish the listing. No documentation availability = no listing." },
];

const whyItems = [
  { title:"Independent by Design", desc:"No exclusive developer tie-ups. Every shortlist built around your requirements, not which developer is offering the highest commission this quarter." },
  { title:"Transparent Compensation", desc:"We disclose how we earn on every listing, standard brokerage commission or optional advisory retainer. No hidden arrangements, no surprises at closing." },
  { title:"Verified Before Published", desc:"Our Verification Framework is the only publicly documented due-diligence process in the NCR advisory market. Five checks. Published results. Every listing." },
  { title:"Named Advisor Always", desc:"One advisor's direct number from day one. Not a CRM ticket, not a rotating team, not a call centre. One person who knows your requirements throughout." },
];

const tools = [
  { title:"ROI & Rental Yield Calculator", desc:"Estimate gross yield, net yield, and total return over your holding period." },
  { title:"Home Loan EMI Calculator", desc:"Monthly EMI, total interest, and year-by-year amortisation schedule." },
  { title:"Stamp Duty & Registration", desc:"State-wise stamp duty and registration charges, Delhi, Haryana & UP." },
  { title:"Affordability Calculator", desc:"Realistic property budget based on standard bank lending norms." },
];

/* Word doc FAQs, Page 1 */
const homeFaqs = [
  { q:"Is Vedhara Group a property developer or builder?", a:"No. Vedhara Group is an independent real estate advisory and brokerage firm operating across Delhi NCR. We do not build, develop, or own properties. We represent buyers, sellers, tenants, investors, and NRIs independently, and list only verified projects from developer partners." },
  { q:"Which areas of Delhi NCR does Vedhara Group cover?", a:"Vedhara Group covers property transactions across Delhi NCR, Gurugram, Noida, Greater Noida, Faridabad, Manesar, Ghaziabad, Sonipat, Chandigarh and across North India micro-markets. Contact us with your specific location requirement." },
  { q:"How does Vedhara verify the properties it lists?", a:"Every partner project passes five checks: RERA registration validity, builder delivery history, project-level approvals, price-to-locality fairness benchmarked against government circle rates and registered transactions, and title document availability. Results are published on the listing page, not hidden in fine print." },
  { q:"Does Vedhara charge buyers a fee?", a:"In most cases, no direct fee is charged to buyers. Vedhara earns standard market brokerage commission paid by the developer or seller side, disclosed on every specific listing. For portfolio-level investment advisory, an optional flat retainer is available." },
  { q:"Can I use the property calculators without sharing contact details?", a:"Yes. All four calculators: ROI & Rental Yield, EMI, Stamp Duty, and Affordability, are completely free and require no account, phone number, or email address to use." },
];

export default function HomePage() {
  return (
    <>
      <CinematicHero
        videoSrc="/videos/Homepage%20Hero%20Video%20Desktop.mp4"
        videoSrcMobile="/videos/Homepage%20Hero%20Video%20Mobile.mp4"
      />
      <AnimatedStats />

      {/* ══ VERIFICATION FRAMEWORK ══ */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center",marginBottom:40 }} className="grid-2">
            <ScrollReveal>
              <div>
                <span className="v-line" />
                <p className="eyebrow" style={{ marginBottom:14 }}>How We&apos;re Different</p>
                <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:20,lineHeight:1.1 }}>
                  Every Listing Passes Five Checks{" "}
                  <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold)" }}>Before You See It</em>
                </h2>
                <p className="body-lg" style={{ color:"var(--slate)",marginBottom:28,maxWidth:480 }}>
                  Most property portals list whatever inventory developers hand them. Vedhara does not. Before any project appears on our platform, it passes the Vedhara Verification Framework, five documented checks that we publish in plain language on every listing page. No jargon. No fine print. Just the facts.
                </p>
                <Link href="/verification-center" className="btn btn-ghost cta-pill">
                  See the Full Verification Framework →
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120} direction="right">
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                {[{stat:"100%",sub:"Listings Verified"},{stat:"5-Step",sub:"Due Diligence"},{stat:"3 Portals",sub:"RERA Checked"},{stat:"Real Data",sub:"Price Benchmarked"}].map(card=>(
                  <div key={card.sub} className="stat-card">
                    <div className="stat-accent"></div>
                    <div className="stat-num">{card.stat}</div>
                    <div className="stat-label">{card.sub}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-5 check-grid">
            {checks.map((c,i)=>(
              <ScrollReveal key={c.num} delay={i*70}>
                <div className="hover-lift" style={{ background:i===2?"var(--navy)":"var(--cream)",padding:"36px 24px",height:"100%",cursor:"default" }}>
                  <span style={{ fontFamily:"var(--t-head)",fontSize:10,fontWeight:700,letterSpacing:"0.14em",color:i===2?"rgba(232,201,112,0.55)":"var(--gold)",display:"block",marginBottom:14 }}>{c.num}</span>
                  <h3 className="heading-md" style={{ color:i===2?"var(--light)":"var(--navy)",marginBottom:12,fontSize:14 }}>{c.title}</h3>
                  <p className="body-sm" style={{ color:i===2?"rgba(252,250,244,0.5)":"var(--slate)",margin:0 }}>{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:52,flexWrap:"wrap",gap:20 }}>
            <ScrollReveal>
              <div>
                <span className="v-line" />
                <p className="eyebrow" style={{ marginBottom:14 }}>What We Do</p>
                <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>
                  Advisory for Every Stage of{" "}
                  <em className="display-gold" style={{ fontSize:"inherit",color:"var(--gold-dk)" }}>Your Property Journey</em>
                </h2>
              </div>
            </ScrollReveal>
            <Link href="/services" className="btn btn-ghost cta-pill" style={{ flexShrink:0 }}>All Services →</Link>
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* ══ FEATURED PROPERTIES ══ */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-5%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.05) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:36 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Featured Properties</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",lineHeight:1.1,marginBottom:16 }}>
                Explore Premium Listings<span style={{ color:"var(--gold-lt)" }}> Across Delhi NCR</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.55)",maxWidth:560,margin:"0 auto" }}>
                Hand-picked properties from our verified inventory, each independently assessed through the Vedhara Verification Framework.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }} className="prop-grid">
            {[
              {
                category:"Residential",
                title:"The Cullinan Heights",
                location:"Sector 150, Noida",
                price:"₹ 4.85 Cr",
                config:"4 BHK + Study",
                size:"2,450 sq.ft.",
                image:"https://images.pexels.com/photos/11729105/pexels-photo-11729105.jpeg?auto=compress&cs=tinysrgb&w=900",
                alt:"The Cullinan Heights luxury high-rise illuminated at dusk in Sector 150, Noida",
                link:"/buy",
                tag:"Ready to Move",
              },
              {
                category:"Luxury",
                title:"One Golf Course Penthouse",
                location:"Golf Course Road, Gurugram",
                price:"₹ 12.80 Cr",
                config:"5 BHK + Pool",
                size:"4,200 sq.ft.",
                image:"https://images.pexels.com/photos/20418771/pexels-photo-20418771.jpeg?auto=compress&cs=tinysrgb&w=900",
                alt:"One Golf Course Penthouse luxury penthouse on Golf Course Road, Gurugram",
                link:"/luxury",
                tag:"Available",
              },
              {
                category:"Commercial",
                title:"One Golden Mile",
                location:"Sector 62, Gurugram",
                price:"₹ 8.50 Cr",
                config:"4,500 sq.ft. Office",
                size:"4,500 sq.ft.",
                image:"https://images.pexels.com/photos/5859963/pexels-photo-5859963.jpeg?auto=compress&cs=tinysrgb&w=900",
                pos:"100%",
                alt:"One Golden Mile commercial office building in Sector 62, Gurugram",
                link:"/commercial",
                tag:"Ready to Move",
              },
              {
                category:"New Launch",
                title:"Amaryllis Residences",
                location:"Golf Course Road, Gurugram",
                price:"₹ 6.20 Cr",
                config:"3 BHK + Servant",
                size:"2,150 sq.ft.",
                image:"https://images.pexels.com/photos/31684126/pexels-photo-31684126.jpeg?auto=compress&cs=tinysrgb&w=900",
                pos:"100%",
                alt:"Amaryllis Residences luxury apartments on Golf Course Road, Gurugram",
                link:"/new-launches",
                tag:"Possession Oct 2026",
              },
              {
                category:"Rental",
                title:"The Aspen Residency",
                location:"Sector 57, Gurugram",
                price:"₹ 58,000/mo",
                config:"3 BHK",
                size:"1,550 sq.ft.",
                image:"https://images.pexels.com/photos/33559373/pexels-photo-33559373.jpeg?auto=compress&cs=tinysrgb&w=900",
                pos:"0%",
                alt:"The Aspen Residency 3 BHK rental apartment in Sector 57, Gurugram",
                link:"/rent",
                tag:"Available",
              },
              {
                category:"Plotted",
                title:"Serene Garden Plot",
                location:"Sector 150, Noida",
                price:"₹ 4.50 Cr",
                config:"450 sq.yds.",
                size:"450 sq.yds.",
                image:"https://images.pexels.com/photos/15422584/pexels-photo-15422584.jpeg?auto=compress&cs=tinysrgb&w=900",
                pos:"50%",
                alt:"Serene Garden Plot green residential plot land in Sector 150, Noida",
                link:"/sell",
                tag:"Available for Sale",
              },
            ].map((p,i)=>(
              <ScrollReveal key={p.title} delay={i*80}>
                <Link href={p.link} className="hover-lift" style={{ display:"block",background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}>
                  <div style={{ height:190,position:"relative",overflow:"hidden" }}>
                    <Image
                      src={p.image}
                      alt={p.alt || p.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit:"cover", objectPosition: p.pos ? (p.pos.indexOf(" ") > -1 ? p.pos : "50% " + p.pos) : "50% 50%" }}
                    />
                    {/* subtle dark overlay for text legibility */}
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(9,15,29,0.05) 0%,rgba(9,15,29,0.45) 100%)" }} />
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(9,15,29,0.55)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(4px)" }}>
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding:20 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-dk)",borderRadius:3 }}>
                        {p.category}
                      </span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:6,lineHeight:1.3 }}>{p.title}</h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{p.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--navy)",marginBottom:10,lineHeight:1.4 }}>{p.config} · {p.size}</p>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12 }}>
                      <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0 }}>{p.price}</p>
                      <span className="btn-ghost" style={{ color:"var(--gold)",fontSize:9,display:"inline-flex",alignItems:"center",gap:4 }}>
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:32 }}>
              <p className="body-md" style={{ color:"rgba(252,250,244,0.35)",marginBottom:20 }}>
                Our full inventory spans 500+ verified listings across Delhi NCR.
              </p>
              <Link href="/buy" className="btn btn-primary">
                Browse All Properties →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ WHY VEDHARA ══ */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:36 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Why Vedhara</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>
                The Standard Others in Delhi NCR{" "}
                <em className="display-gold" style={{ fontSize:"inherit",color:"var(--gold-dk)" }}>Are Still Catching Up To</em>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:720,margin:"16px auto 0" }}>
                Most real estate platforms are developer-distribution channels disguised as advisors: unverified listings, developer-set pricing, and sales-driven teams. Vedhara is different: published due-diligence on every listing, transparent fees, and one named advisor from day one.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-4 svc-card-alt">
            {whyItems.map((card,i)=>(
              <ScrollReveal key={card.title} delay={i*80}>
                <div className="svc-card" style={{ borderRadius:0 }}>
                  <div className="gold-accent"></div>
                  <h3 className="svc-card-title">{card.title}</h3>
                  <p className="svc-card-desc">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NRI CALLOUT ══ */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(ellipse 50% 80% at 85% 50%,rgba(212,168,67,0.1) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr auto",gap:60,alignItems:"center",position:"relative",zIndex:1 }} className="grid-2">
          <ScrollReveal>
            <div>
              <span className="v-line" />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>NRI Desk</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",lineHeight:1.1,marginBottom:20 }}>
                NRI Property, Managed from Abroad
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",marginBottom:28,maxWidth:560 }}>
                Distance shouldn&apos;t mean doubt. Vedhara&apos;s NRI desk offers weekend and evening IST consultations, on-demand video walkthroughs of shortlisted properties within 48 hours, and e-signature documentation support, so you can make a verified property decision in India without buying a flight ticket.
              </p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:16,marginBottom:32 }}>
                {["UAE","UK","USA","Canada","Singapore","Australia"].map(n=>(<span key={n} className="body-sm" style={{ color:"rgba(255,255,255,0.36)" }}>{n}</span>))}
              </div>
              <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
                <Link href="/nri-services" className="btn btn-primary">Book a Weekend Video Consultation</Link>
                <a href="https://wa.me/919810647063" target="_blank" rel="noopener noreferrer" className="btn" style={{ background:"var(--cream)",color:"var(--ink)",border:"1px solid rgba(42,45,53,0.12)" }}>WhatsApp NRI Desk</a>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150} direction="right">
            <div style={{ display:"flex",flexDirection:"column",gap:8,minWidth:260 }}>
              {[{l:"Weekend Slots",v:"Sat & Sun 10AM–4PM IST"},{l:"Walkthrough SLA",v:"Video within 48 hours"},{l:"Documentation",v:"E-signature supported"},{l:"Compliance",v:"FEMA & Section 195 guided"},{l:"Communication",v:"Single named advisor"}].map(item=>(
                <div key={item.l} className="glass" style={{ padding:"13px 18px",display:"flex",justifyContent:"space-between",gap:12 }}>
                  <span className="caption" style={{ color:"rgba(255,255,255,0.35)" }}>{item.l}</span>
                  <span className="body-sm" style={{ color:"var(--gold-lt)",textAlign:"right" }}>{item.v}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ FREE TOOLS ══ */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:36 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Decide With Data</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1,marginBottom:16 }}>
                Four Free Tools,{" "}
                <em className="display-gold" style={{ fontSize:"inherit",color:"var(--gold-dk)" }}>No Sign-Up Required</em>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:560,margin:"0 auto" }}>
                Every property decision in Delhi NCR comes down to numbers. These four tools are free, instant, and available without sharing your contact details. Run the numbers first. Then talk to an advisor.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:40 }} className="grid-4">
            {tools.map((tool,i)=>(
              <ScrollReveal key={tool.title} delay={i*80}>
                <Link href="/calculators" className="hover-lift" style={{ display:"block",padding:"32px 26px",textDecoration:"none",borderRadius:12,background:"var(--navy)",border:"1px solid rgba(212,168,67,0.15)",transition:"all 0.3s ease" }}>
                  <div className="gold-accent"></div>
                  <h3 className="heading-md" style={{ color:"var(--gold-lt)",marginBottom:10,fontSize:14 }}>{tool.title}</h3>
                  <p className="body-sm" style={{ color:"rgba(255,255,255,0.7)",margin:0 }}>{tool.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div style={{ textAlign:"center" }}>
            <Link href="/calculators" className="btn btn-dark">Open All Four Calculators →</Link>
          </div>
        </div>
      </section>

      {/* ══ OUR TEAM ══ */}
      <section style={{ background:"var(--navy)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:44 }}>
              <span className="v-line" style={{ margin:"0 auto 14px",background:"var(--gold-lt)" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Our Team</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",lineHeight:1.1 }}>
                Meet the{" "}
                <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold-lt)" }}>Leadership Behind</em>
                <br />
                Your Property Journey
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24 }} className="grid-4">
            {[
              { name:"Mr. D.R Sharma", title:"Founder & CEO", initials:"DS", photo:"/Images/D.R Sharma.JPG", desc:"20+ years guiding families through Delhi NCR's real estate market with transparency and independent advice." },
              { name:"Mr. Mohit Sharma", title:"Managing Director", initials:"MS", photo:"/Images/Mohit Sharma.PNG", desc:"Delivers tailored property strategies for HNI clients, NRIs, and first-time homebuyers alike." },
              { name:"Ms. Kusum Sharma", title:"Director – Strategic Partnerships", initials:"KS", photo:"", desc:"Ensures every listed project passes Vedhara's rigorous five-point Verification Framework." },
              { name:"Mr. Bharat", title:"Director – Investment Advisory", initials:"BH", photo:"", desc:"Specialises in portfolio-level strategy, NRI advisory, and long-term wealth creation through real estate." },
            ].map((member,i)=>(
              <ScrollReveal key={member.name} delay={i*100} style={{ display:"flex" }}>
                <div className="team-card hover-lift" style={{ display:"flex",flexDirection:"column",flex:1,width:"100%",background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}>
                  {/* Full-width photo banner: real-estate backdrop + centered portrait */}
                  <div style={{ height:200,background:"var(--navy)",position:"relative",overflow:"hidden" }}>
                    <Image src="https://images.pexels.com/photos/33559373/pexels-photo-33559373.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" fill sizes="400px" style={{ objectFit:"cover",objectPosition:"center" }} />
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(9,15,29,0.3) 0%,rgba(9,15,29,0.72) 100%)" }} />
                    <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2 }}>
                      {member.photo ? (
                        <div style={{ position:"relative",width:122,height:164,borderRadius:10,overflow:"hidden",border:"2px solid rgba(212,168,67,0.55)",boxShadow:"0 12px 32px rgba(0,0,0,0.4)",background:"var(--cream)" }}>
                          <Image src={member.photo} alt={`Portrait of ${member.name}`} fill sizes="140px" style={{ objectFit:"cover",objectPosition:"center top" }} />
                        </div>
                      ) : (
                        <div style={{ width:96,height:96,borderRadius:12,background:"rgba(15,30,56,0.5)",border:"2px solid rgba(212,168,67,0.35)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)" }}>
                          <span style={{ fontFamily:"var(--t-head)",fontSize:32,fontWeight:700,color:"var(--gold-lt)",letterSpacing:"0.05em" }}>{member.initials}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Content - matching featured properties style */}
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:6 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-dk)",borderRadius:3 }}>
                        {member.title}
                      </span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:16,fontWeight:700,color:"var(--navy)",marginBottom:6,marginTop:4 }}>{member.name}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)",lineHeight:1.7,fontSize:12,margin:"0 0 12px",flex:1 }}>
                      {member.desc}
                    </p>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,color:"var(--gold-dk)",textTransform:"uppercase",letterSpacing:"0.06em" }}>Vedhara Group</span>
                      <Link href="/team" style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,color:"var(--gold)",textTransform:"uppercase",letterSpacing:"0.06em",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:4 }}>
                        View Bio →
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{ background:"var(--cream)",padding:"60px 32px",textAlign:"center" }}>
        <ScrollReveal>
          <div style={{ maxWidth:700,margin:"0 auto" }}>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1,marginBottom:20 }}>
              Your Next Property Decision Deserves{" "}
              <em className="display-gold" style={{ fontSize:"inherit",color:"var(--gold-dk)" }}>Independent Advice.</em>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",marginBottom:28 }}>
              Whether you are buying, selling, investing, or managing property from abroad, start with an honest conversation, not a sales pitch.
            </p>
            <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
              <Link href="/contact" className="btn btn-dark">Book a Free Consultation</Link>
              <a href="https://wa.me/919810647063?text=Hello%20Vedhara%20Group" target="_blank" rel="noopener noreferrer" className="btn" style={{ background:"var(--cream)",color:"var(--ink)",border:"1px solid rgba(42,45,53,0.12)" }}>WhatsApp Us</a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FAQSection faqs={homeFaqs} />
      <RelatedLinksSection
        title="Explore the full property journey"
        intro="These pages connect buyers, investors, sellers, and NRIs to the right next step with deeper guidance and stronger internal relevance."
        background="cream"
        variant="journey"
        links={[
          { href:"/buy", label:"Buy Property in Delhi NCR", description:"Explore verified residential options and understand how to shortlist the right project with confidence." },
          { href:"/blog", label:"Real Estate Blog & Market Guides", description:"Read in-depth articles on price trends, RERA, home loans, and NRI investment strategies." },
          { href:"/verification-center", label:"Verification Center", description:"See the framework we use to validate every listing before it reaches the market." },
        ]}
      />
    </>
  );
}
