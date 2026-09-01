import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { preload } from "react-dom";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import CinematicHero from "@/components/sections/CinematicHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { blogPosts } from "@/lib/data/blogPosts";

const AnimatedStats = dynamic(() => import("@/components/sections/AnimatedStats"));
const FeaturedProperties = dynamic(() => import("@/components/sections/FeaturedProperties"));
const PropertySearch = dynamic(() => import("@/components/sections/PropertySearch"));
const ServicesGrid = dynamic(() => import("@/components/sections/ServicesGrid"));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"));
const RelatedLinksSection = dynamic(() => import("@/components/sections/RelatedLinksSection"));
const HomeConsultationSection = dynamic(() => import("@/components/sections/HomeConsultationSection"));

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

const steps = [
  { num:"01", title:"Share Your Requirement", desc:"Tell us your budget, preferred locations and goals. A named senior advisor, never a call centre, responds within one working day." },
  { num:"02", title:"We Verify Everything", desc:"Every shortlisted property passes our five-point Verification Framework. RERA, approvals, price and title all checked, and the results published on the listing." },
  { num:"03", title:"Get Honest Advice", desc:"You receive a clear recommendation with fully disclosed fees. Buy, sell or invest with complete transparency and no pressure." },
];

const testimonials = [
  { name:"Mr. & Mrs. Kapoor", detail:"First-time buyers · Sector 150, Noida", quote:"Vedhara saved us from making an expensive mistake on a project with title issues. They found us a better property at a lower price." },
  { name:"Mr. Arjun Mehta", detail:"NRI (Dubai) · Gurugram sale handled remotely", quote:"I never had to travel. Vedhara handled everything from tenant negotiation to final registration via video, email, and their local team." },
  { name:"Dr. Priya Sharma", detail:"Investor · Gurugram & Noida Expressway", quote:"The decision framework Vedhara uses gave me confidence to invest across two cities. The rental yield analysis was spot on." },
];

/* Word doc FAQs, Page 1 */
const homeFaqs = [
  { q:"Is Vedhara Group a property developer or builder?", a:"No. Vedhara Group is an independent real estate advisory and brokerage firm operating across Delhi NCR. We do not build, develop, or own properties. We represent buyers, sellers, tenants, investors, and NRIs independently, and list only verified projects from developer partners." },
  { q:"Which areas of Delhi NCR does Vedhara Group cover?", a:"Vedhara Group covers property transactions across Delhi NCR, Gurugram, Noida, Greater Noida, Faridabad, Manesar, Ghaziabad, Sonipat, Chandigarh and across North India micro-markets. Contact us with your specific location requirement." },
  { q:"How does Vedhara verify the properties it lists?", a:"Every partner project passes five checks: RERA registration validity, builder delivery history, project-level approvals, price-to-locality fairness benchmarked against government circle rates and registered transactions, and title document availability. Results are published on the listing page, not hidden in fine print." },
  { q:"Does Vedhara charge buyers a fee?", a:"In most cases, Vedhara charges a disclosed commission on both the buyer and seller sides, in line with the standard rules and practices followed by real estate businesses. The commission is clearly stated on every specific listing, and for portfolio-level investment advisory an optional flat retainer is available." },
  { q:"Can I use the property calculators without sharing contact details?", a:"Yes. All four calculators: ROI & Rental Yield, EMI, Stamp Duty, and Affordability, are completely free and require no account, phone number, or email address to use." },
];

const homeSchema = {
  "@context":"https://schema.org",
  "@type":"WebPage",
  "@id":"https://www.vedharagroup.com/#webpage",
  url:"https://www.vedharagroup.com",
  name:"Vedhara Group | Verified Property Advisory in Delhi NCR",
  description:"North India's independent real estate advisory firm. Buy, sell or invest across Delhi NCR, Faridabad, Manesar & Chandigarh with verified listings.",
  isPartOf:{"@id":"https://www.vedharagroup.com/#website"},
  about:{"@id":"https://www.vedharagroup.com/#organization"},
  inLanguage:"en-IN",
  mainEntity: {
    "@type":"ItemList",
    name:"Vedhara Group Services",
    itemListElement: [
      { "@type":"ListItem", position:1, item:{ "@type":"Service", name:"Buy Property in Delhi NCR", url:"https://www.vedharagroup.com/buy" } },
      { "@type":"ListItem", position:2, item:{ "@type":"Service", name:"Sell Property in Delhi NCR", url:"https://www.vedharagroup.com/sell" } },
      { "@type":"ListItem", position:3, item:{ "@type":"Service", name:"Rent Property in Delhi NCR", url:"https://www.vedharagroup.com/rent" } },
      { "@type":"ListItem", position:4, item:{ "@type":"Service", name:"Commercial Real Estate", url:"https://www.vedharagroup.com/commercial" } },
      { "@type":"ListItem", position:5, item:{ "@type":"Service", name:"Luxury Properties", url:"https://www.vedharagroup.com/luxury" } },
      { "@type":"ListItem", position:6, item:{ "@type":"Service", name:"New Property Launches", url:"https://www.vedharagroup.com/new-launches" } },
      { "@type":"ListItem", position:7, item:{ "@type":"Service", name:"Investment Advisory", url:"https://www.vedharagroup.com/investment-advisory" } },
      { "@type":"ListItem", position:8, item:{ "@type":"Service", name:"NRI Property Services", url:"https://www.vedharagroup.com/nri-services" } },
      { "@type":"ListItem", position:9, item:{ "@type":"Service", name:"Property Management", url:"https://www.vedharagroup.com/property-management" } },
    ],
  },
};

export default function HomePage() {
  // The hero poster is the homepage LCP candidate while the video buffers; preload it.
  preload("/videos/homepage-hero-poster.jpg", { as: "image" });
  return (
    <>
      <JsonLd data={homeSchema} />
      {[
        { name:"D.R Sharma", jobTitle:"Founder & Chief Executive Officer", url:"https://www.vedharagroup.com/team", image:"/Images/Mr. D.R Sharma.png" },
        { name:"Mohit Sharma", jobTitle:"Managing Director", url:"https://www.vedharagroup.com/team", image:"/Images/Mr. Mohit Sharma.png" },
        { name:"Kusum Sharma", jobTitle:"Director, Strategic Partnerships", url:"https://www.vedharagroup.com/team", image:"/Images/Ms Kusum Sharma.png" },
        { name:"Bharat", jobTitle:"Director, Investment Advisory", url:"https://www.vedharagroup.com/team", image:"/Images/Mr. Bharat.png" },
      ].map(m => (
        <JsonLd key={m.name} data={{
          "@context":"https://schema.org",
          "@type":"Person",
          name:m.name,
          jobTitle:m.jobTitle,
          worksFor:{"@id":"https://www.vedharagroup.com/#organization"},
          url:m.url,
          image:m.image,
        }} />
      ))}
      <CinematicHero
        videoSrc="/videos/Homepage%20Hero%20Video%20Real%20Estate%20Advisory%20in%20Gurgaon%20Delhi%20NCR.mp4?v=3"
        videoSrcMobile="/videos/Homepage%20Hero%20Video%20Real%20Estate%20Advisory%20in%20Gurgaon%20Delhi%20NCR.mp4?v=3"
        poster="/videos/homepage-hero-poster.jpg"
      />
      <AnimatedStats />

      {/* Gold hairline, rhythm separator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* ══ HOW IT WORKS, three steps for first-time visitors ══ */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>How It Works</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>
                Three Steps to a{" "}
                <em className="display-gold" style={{ fontSize:"inherit",color:"var(--gold-ink)" }}>Verified Property Decision</em>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:660,margin:"16px auto 0" }}>
                Buying, selling or investing in Delhi NCR real estate can feel overwhelming with thousands of unverified listings, opaque pricing and aggressive sales teams. Vedhara simplifies the process into three clear steps: share your requirements, let us verify every shortlisted property, and receive honest advice backed by published due-diligence. No jargon. No pressure. Just a named senior advisor guiding you from your first enquiry to your final decision.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-3 svc-card-alt">
            {steps.map((s,i)=>(
              <ScrollReveal key={s.num} delay={i*90} style={{ display:"flex" }}>
                <div className="svc-card" style={{ borderRadius:0,height:"100%",flex:1 }}>
                  <div className="gold-accent" />
                  <p className="eyebrow" style={{ marginBottom:12 }}>Step {s.num}</p>
                  <h3 className="svc-card-title">{s.title}</h3>
                  <p className="svc-card-desc">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROPERTY SEARCH, real-estate search bar ══ */}
      <PropertySearch />

      {/* ══ EXPLORE BY MARKET, attention-grabbing opener (market browse, distinct from services) ══ */}
      <section style={{ background:"var(--cream)",padding:"72px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"0%",left:"-8%",width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.07) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1320,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Explore by Market</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>
                Find Your Next Property in{" "}
                <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold)" }}>Delhi NCR</em>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:700,margin:"16px auto 0" }}>
                Delhi NCR is not one market; it is a collection of micro-markets, each with distinct pricing trends, infrastructure timelines, builder reputations and investment profiles. Gurugram&apos;s Golf Course Road operates differently from Noida Sector 150, which operates differently from South Delhi&apos;s established neighbourhoods. Pick a market below to explore verified listings, benchmarked prices, live inventory and published project due diligence specific to that micro-market. No unverified projects. Ever.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18 }} className="grid-3">
            {[
              { t:"Gurugram", s:"Golf Course Road & prime sectors", h:"/gurugram", img:"https://images.pexels.com/photos/31684126/pexels-photo-31684126.jpeg?auto=compress&cs=tinysrgb&w=900" },
              { t:"Noida", s:"Sector 150 & the Expressway corridor", h:"/noida", img:"https://images.pexels.com/photos/11729105/pexels-photo-11729105.jpeg?auto=compress&cs=tinysrgb&w=900" },
              { t:"Greater Noida", s:"Plots, townships & new projects", h:"/greater-noida", img:"https://images.pexels.com/photos/20581232/pexels-photo-20581232.jpeg?auto=compress&cs=tinysrgb&w=900" },
              { t:"South Delhi", s:"Lutyens', Vasant Vihar & Greater Kailash", h:"/south-delhi", img:"https://images.pexels.com/photos/33520069/pexels-photo-33520069.jpeg?auto=compress&cs=tinysrgb&w=900" },
              { t:"Chandigarh Tricity", s:"Chandigarh, Mohali & Panchkula", h:"/tricity", img:"https://images.pexels.com/photos/32355381/pexels-photo-32355381.jpeg?auto=compress&cs=tinysrgb&w=900" },
              { t:"Commercial Hubs", s:"Sector 62, MG Road & Noida Expressway", h:"/commercial", img:"https://images.pexels.com/photos/5859963/pexels-photo-5859963.jpeg?auto=compress&cs=tinysrgb&w=900" },
            ].map((c,i)=>(
              <ScrollReveal key={c.t} delay={i*70}>
                <Link href={c.h} className="hover-lift" style={{ display:"block",position:"relative",height:268,borderRadius:16,overflow:"hidden",textDecoration:"none",border:"1px solid rgba(212,168,67,0.25)" }}>
                  <Image src={c.img} alt={`${c.t}, ${c.s}`} fill sizes="(max-width: 1024px) 50vw, 33vw" style={{ objectFit:"cover" }} />
                  <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(9,15,29,0.12) 0%,rgba(9,15,29,0.82) 100%)" }} />
                  <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"24px 24px 22px" }}>
                    <h3 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:26,color:"var(--light)",margin:0,lineHeight:1.1 }}>{c.t}</h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:12.5,fontWeight:400,color:"rgba(255,255,255,0.78)",margin:"6px 0 14px" }}>{c.s}</p>
                    <span style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--gold-lt)",display:"inline-flex",alignItems:"center",gap:5 }}>Explore {c.t} →</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROPERTIES (showcase listings early, real-estate-first flow) ══ */}
      <FeaturedProperties />

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
                  Most property portals list whatever inventory developers hand them, with no independent validation of approvals, pricing or title status. Vedhara does not. Before any project appears on our platform, it passes the Vedhara Verification Framework, five documented checks covering RERA registration, delivery history, project-level approvals, price fairness benchmarked against government circle rates, and title document availability. We publish the results in plain language on every listing page. No jargon. No fine print. Just the facts you need to make a confident property decision in Delhi NCR.
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
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"-12%",left:"-6%",width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.08) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:"-18%",right:"-6%",width:620,height:620,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.06) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1320,margin:"0 auto",position:"relative",zIndex:1 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:52,flexWrap:"wrap",gap:20 }}>
            <ScrollReveal>
              <div>
                <span className="v-line" />
                <p className="eyebrow" style={{ marginBottom:14,color:"var(--gold-lt)" }}>What We Do</p>
                <h2 className="heading-xl" style={{ color:"var(--light)",lineHeight:1.1 }}>
                  Advisory for Every Stage of{" "}
                  <em className="display-gold" style={{ fontSize:"inherit" }}>Your Property Journey</em>
                </h2>
              </div>
            </ScrollReveal>
            <Link href="/services" className="btn cta-pill" style={{ flexShrink:0,background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",color:"var(--navy)",borderColor:"var(--gold)",boxShadow:"0 14px 30px -14px rgba(212,168,67,0.7)" }}>All Services →</Link>
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* ══ FEATURED PROPERTIES, moved up; now rendered via <FeaturedProperties /> (components/sections/FeaturedProperties.tsx) ══ */}

      {/* ══ WHY VEDHARA ══ */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:36 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Why Vedhara</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>
                The Standard Others in Delhi NCR{" "}
                <em className="display-gold" style={{ fontSize:"inherit",color:"var(--gold-ink)" }}>Are Still Catching Up To</em>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:720,margin:"16px auto 0" }}>
                Most real estate platforms in Delhi NCR are developer-distribution channels disguised as advisors: unverified listings, developer-set pricing, and sales-driven teams incentivised to push the highest-commission project rather than the right one for you. Vedhara is built on a different model. Every listing undergoes published due-diligence, every fee is disclosed upfront, and you get one named advisor from day one who knows your requirements and stays with you through the entire transaction. Here is what that difference looks like in practice.
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
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",marginBottom:28,maxWidth:580 }}>
                Distance shouldn&apos;t mean doubt. Vedhara&apos;s NRI desk is built for Non-Resident Indians who need to buy, sell or manage property in Delhi NCR without flying back and forth. We offer weekend and evening IST consultations to match your time zone, on-demand video walkthroughs of shortlisted properties within 48 hours, FEMA-compliant documentation guidance, and e-signature support so you can complete transactions remotely. Every listing you see has passed our five-point Verification Framework, and your named advisor handles everything from RERA checks to registration coordination.
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
                <div key={item.l} className="glass nri-desk-card" style={{ padding:"13px 18px",display:"flex",justifyContent:"space-between",gap:12 }}>
                  <span className="caption" style={{ color:"#fff" }}>{item.l}</span>
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
              <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>Decide With Data</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1,marginBottom:16 }}>
                Four Free Tools,{" "}
                <em className="display-gold" style={{ fontSize:"inherit",color:"var(--gold-ink)" }}>No Sign-Up Required</em>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:620,margin:"16px auto 0" }}>
                Every property decision in Delhi NCR comes down to numbers, EMI affordability, stamp duty obligations, rental yield projections and realistic budget expectations. Vedhara offers four free calculators that give you instant, accurate estimates based on current interest rates, government circle rates and standard bank lending norms. No sign-up required, no contact details needed. Run the numbers yourself first, then speak to an advisor with the data to back your decision.
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
            <p className="caption" style={{ color:"var(--slate)",margin:"0 0 18px" }}>Calculator outputs are estimates for guidance only and do not constitute financial, legal or tax advice.</p>
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
                <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold-lt)" }}>Leadership Behind </em>
                <br />
                Your Property Journey
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:660,margin:"16px auto 0" }}>
                Vedhara Group is led by professionals with deep expertise in Delhi NCR real estate, NRI advisory and investment strategy. Each leader brings a specific focus, from verification rigour to portfolio-level advisory, so every client benefits from specialised knowledge, not generic salesmanship.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24 }} className="grid-4">
            {[
              { name:"Mr. D.R Sharma", title:"Founder & CEO", photo:"/Images/Mr. D.R Sharma.png", desc:"20+ years guiding families through Delhi NCR's real estate market with transparency and independent advice." },
              { name:"Mr. Mohit Sharma", title:"Managing Director", photo:"/Images/Mr. Mohit Sharma.png", desc:"Delivers tailored property strategies for HNI clients, NRIs, and first-time homebuyers alike." },
              { name:"Ms. Kusum Sharma", title:"Director – Strategic Partnerships", photo:"/Images/Ms Kusum Sharma.png", desc:"Ensures every listed project passes Vedhara's rigorous five-point Verification Framework." },
              { name:"Mr. Bharat", title:"Director – Investment Advisory", photo:"/Images/Mr. Bharat.png", desc:"Specialises in portfolio-level strategy, NRI advisory, and long-term wealth creation through real estate." },
            ].map((member,i)=>(
              <ScrollReveal key={member.name} delay={i*100} style={{ display:"flex" }}>
                <div className="team-card hover-lift" style={{ display:"flex",flexDirection:"column",flex:1,width:"100%",background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}>
                  <div style={{ height:200,position:"relative",overflow:"hidden" }}>
                    <Image src={member.photo} alt={`Portrait of ${member.name}`} fill sizes="400px" quality={80} style={{ objectFit:"cover",objectPosition:"center top" }} />
                  </div>
                  {/* Content - matching featured properties style */}
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:6 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-ink)",borderRadius:3 }}>
                        {member.title}
                      </span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:16,fontWeight:700,color:"var(--navy)",marginBottom:6,marginTop:4 }}>{member.name}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)",lineHeight:1.7,fontSize:12,margin:"0 0 12px",flex:1 }}>
                      {member.desc}
                    </p>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,color:"var(--gold-ink)",textTransform:"uppercase",letterSpacing:"0.06em" }}>Vedhara Group</span>
                      <Link href="/team" style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",display:"inline-flex",alignItems:"center",gap:5,padding:"10px 16px",background:"var(--navy)",color:"var(--gold-lt)",borderRadius:6,whiteSpace:"nowrap",textDecoration:"none" }}>
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

      {/* Gold hairline, rhythm separator */}
      <div style={{ background:"var(--cream)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* ══ LATEST INSIGHTS, recent articles ══ */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-6%",width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.05) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:44,flexWrap:"wrap",gap:20 }}>
              <div>
                <span className="v-line" style={{ margin:"0 0 14px" }} />
                <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:12 }}>Market Insights</p>
                <h2 className="heading-xl" style={{ color:"var(--light)",lineHeight:1.1 }}>
                  Latest Insights From{" "}
                  <em style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,color:"var(--gold-lt)" }}>Our Advisors</em>
                </h2>
                <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:580,margin:"12px auto 0" }}>
                  Practical analysis on Delhi NCR property trends, RERA compliance, home loan strategy and NRI investment, written by our advisory team, not content mills.
                </p>
              </div>
              <Link href="/blog" className="btn cta-pill" style={{ flexShrink:0,background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",color:"var(--navy)",borderColor:"var(--gold)",boxShadow:"0 14px 30px -14px rgba(212,168,67,0.7)" }}>All Articles →</Link>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }} className="grid-3">
            {blogPosts.slice(0,3).map((post,i)=>(
              <ScrollReveal key={post.slug} delay={i*80} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ flex:1,display:"flex",flexDirection:"column",background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,overflow:"hidden" }}>
                  <div style={{ height:140,background:post.gradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0 }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ position:"absolute",top:12,right:12,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"3px 10px",borderRadius:20,background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.9)",border:"1px solid rgba(255,255,255,0.25)" }}>{post.category}</span>
                    </div>
                    <div style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:14,color:"rgba(255,255,255,0.85)",textAlign:"center",padding:"0 24px",position:"relative",zIndex:1,lineHeight:1.4 }}>
                      {post.title.length > 65 ? post.title.substring(0,65)+"…" : post.title}
                    </div>
                  </div>
                  <div style={{ padding:"20px 24px 22px",flex:1,display:"flex",flexDirection:"column" }}>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:10.5,color:"var(--gold-ink)",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:600,marginBottom:4 }}>{post.readTime}</p>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.4 }}>{post.title}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.7,flex:1 }}>{post.excerpt}</p>
                    <div style={{ paddingTop:14,marginTop:12,borderTop:"1px solid rgba(212,168,67,0.15)" }}>
                      <Link href={`/${post.path ?? "blog"}/${post.slug}`} className="apply-btn" style={{ fontFamily:"var(--t-head)",fontSize:9.5,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:"var(--gold-lt)",display:"inline-flex",alignItems:"center",gap:4,background:"var(--navy)",padding:"6px 14px",borderRadius:6,textDecoration:"none",transition:"all 0.2s" }}>
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

      {/* ══ FINAL CTA ══ */}
      <section style={{ background:"var(--cream)",padding:"60px 32px",textAlign:"center" }}>
        <ScrollReveal>
          <div style={{ maxWidth:700,margin:"0 auto" }}>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1,marginBottom:20 }}>
              Your Next Property Decision Deserves{" "}
              <em className="display-gold" style={{ fontSize:"inherit",color:"var(--gold-ink)" }}>Independent Advice.</em>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",marginBottom:28,maxWidth:600,margin:"0 auto 28px" }}>
              Whether you are buying your first home, selling an inherited property, building a real estate investment portfolio, or managing assets from abroad, Vedhara gives you the verified information, transparent fees and named advisor you need to make a confident decision. Book a free consultation and experience the difference that independent, data-driven advisory makes.
            </p>
            <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
              <Link href="/contact" className="btn btn-dark">Book a Free Consultation</Link>
              <a href="https://wa.me/919810647063?text=Hello%20Vedhara%20Group" target="_blank" rel="noopener noreferrer" className="btn" style={{ background:"var(--cream)",color:"var(--ink)",border:"1px solid rgba(42,45,53,0.12)" }}>WhatsApp Us</a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FAQSection faqs={homeFaqs} />

      {/* Gold hairline, rhythm separator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* ══ CLIENT SUCCESS STORIES, testimonials ══ */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:44 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>Client Success Stories</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",lineHeight:1.1 }}>
                Real Clients.{" "}
                <em className="display-gold" style={{ fontSize:"inherit",color:"var(--gold-ink)" }}>Real Outcomes.</em>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:660,margin:"16px auto 0" }}>
                Every story below is a genuine Vedhara engagement, shared with the client&apos;s permission. No stock photos, no fictional scenarios, no sales scripts. These case studies show how independent advisory, published due-diligence and transparent fees translate into real outcomes for buyers, sellers, investors and NRIs navigating Delhi NCR real estate.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-3 svc-card-alt">
            {testimonials.map((t,i)=>(
              <ScrollReveal key={t.name} delay={i*90} style={{ display:"flex" }}>
                <Link href="/success-stories" style={{ textDecoration:"none",display:"block",flex:1 }}>
                  <div className="svc-card" style={{ borderRadius:0,height:"100%",display:"flex",flexDirection:"column" }}>
                    <div className="gold-accent" />
                    <h3 className="svc-card-title">{t.name}</h3>
                    <p className="svc-card-desc">{t.quote}</p>
                    <p className="svc-card-desc" style={{ fontSize:10.5,letterSpacing:"0.06em",textTransform:"uppercase",marginTop:-4 }}>{t.detail}</p>
                    <span className="svc-card-arrow" style={{ marginTop:"auto" }}>Read Story →</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:36 }}>
              <Link href="/success-stories" className="btn btn-dark">Read More Success Stories →</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ CONSULTATION FORM, lead capture above the footer ══ */}
      <HomeConsultationSection />
    </>
  );
}
