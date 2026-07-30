import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title:"New Property Launches in Delhi NCR | Verified Upcoming Projects | Vedhara Group", description:"Upcoming and recently launched RERA-verified property projects across Gurugram, Noida, Faridabad, and Delhi from Vedhara Group's verified developer partners.", alternates:{ canonical:"https://www.vedharagroup.com/new-launches" } };

interface LaunchProject {
  id:string;
  projectName:string;
  developer:string;
  location:string;
  startingPrice:string;
  configs:string;
  possession:string;
  type:"Residential"|"Luxury"|"Commercial"|"Plotted";
  status:"Just Launched"|"Pre-Launch"|"Under Construction"|"Phase 2 Released";
  highlights:string[];
  imageGradient:string;
}

const launchFaqs: FAQItem[] = [
  {
    q:"Are all projects on this page RERA-verified?",
    a:"Yes. Every project shown on this page passes Vedhara's five-point Verification Framework, which includes RERA registration or application confirmation, builder track record assessment, legal title review, project progress verification, and pricing transparency.",
  },
  {
    q:"Can I book a unit before the official launch?",
    a:"For projects marked 'Pre-Launch' or 'Phase 2 Released', early registration is often possible through our channel. Register your interest and we will coordinate priority access and early-bird pricing with the developer.",
  },
  {
    q:"Is there any fee to register interest in a project?",
    a:"No. Registering interest with Vedhara is completely free and non-binding. You will receive project updates, pricing as it becomes available, and an invitation to site visits before any commitment.",
  },
  {
    q:"How do you select which new launches to feature?",
    a:"We feature projects from developers who meet our Verification Framework standards — established track record, clean legal title, realistic timelines, and transparent pricing. We do not accept listings from unverified sources.",
  },
  {
    q:"Can I get a personalised shortlist of upcoming projects?",
    a:"Absolutely. Contact our team with your budget, preferred locations, and configuration requirements. We will curate a shortlist of upcoming and recently launched projects that match your profile.",
  },
];

const launchProjects: LaunchProject[] = [
  {
    id:"ved-n01",
    projectName:"Aura Sky Villas",
    developer:"Prestige Group",
    location:"Sector 152, Noida",
    startingPrice:"₹ 1.85 Cr",
    configs:"2, 3, 4 BHK",
    possession:"Dec 2028",
    type:"Residential",
    status:"Just Launched",
    highlights:["RERA Applied","53 Towers","7 Acres Green","Club & Pool"],
    imageGradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#2a5f8f 100%)",
  },
  {
    id:"ved-n02",
    projectName:"The Presidential",
    developer:"DLF",
    location:"Sector 63A, Gurugram",
    startingPrice:"₹ 3.20 Cr",
    configs:"3, 4 BHK + Penthouse",
    possession:"Mar 2029",
    type:"Luxury",
    status:"Pre-Launch",
    highlights:["Limited Inventory","Golf Course Road","Private Elevator","Concierge"],
    imageGradient:"linear-gradient(135deg,#16243F 0%,#D4A843 30%,#E8C970 100%)",
  },
  {
    id:"ved-n03",
    projectName:"Central Business Park",
    developer:"Godrej Properties",
    location:"Sector 44, Gurugram",
    startingPrice:"₹ 95 Lakhs",
    configs:"500-2,500 sq.ft. Offices",
    possession:"Jun 2028",
    type:"Commercial",
    status:"Just Launched",
    highlights:["LEED Platinum","Metro Connector","Food Court","24hr Operation"],
    imageGradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 50%,#4a4a7a 100%)",
  },
  {
    id:"ved-n04",
    projectName:"Emerald County",
    developer:"Tata Housing",
    location:"Sector 150, Noida",
    startingPrice:"₹ 2.45 Cr",
    configs:"3, 4, 5 BHK",
    possession:"Sep 2028",
    type:"Residential",
    status:"Under Construction",
    highlights:["RERA Registered","35% Open Space","School Tie-up","Lake View"],
    imageGradient:"linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 50%,#2a5a2a 100%)",
  },
  {
    id:"ved-n05",
    projectName:"Imperial Heights",
    developer:"M3M India",
    location:"Southern Peripheral Road, Gurugram",
    startingPrice:"₹ 2.85 Cr",
    configs:"3, 4 BHK",
    possession:"Apr 2028",
    type:"Residential",
    status:"Under Construction",
    highlights:["RERA Registered","Golf Course View","70% Sold","Possession Apr 2028"],
    imageGradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#6a4a2a 100%)",
  },
  {
    id:"ved-n06",
    projectName:"The Green Mile",
    developer:"Signature Global",
    location:"Sector 36, Sohna Road, Gurugram",
    startingPrice:"₹ 1.55 Cr",
    configs:"2, 3 BHK",
    possession:"Phase 2, Dec 2027",
    type:"Residential",
    status:"Phase 2 Released",
    highlights:["RERA Registered","Affordable Luxury","Duplex Options","Easy Payment Plan"],
    imageGradient:"linear-gradient(135deg,#090F1D 0%,#1a2a4a 50%,#4a6a8a 100%)",
  },
  {
    id:"ved-n07",
    projectName:"Santorini Bay",
    developer:"Sobha Ltd.",
    location:"Sector 47, Faridabad",
    startingPrice:"₹ 1.25 Cr",
    configs:"2, 3 BHK + Retail Shops",
    possession:"Aug 2028",
    type:"Residential",
    status:"Just Launched",
    highlights:["RERA Applied","Metro 800m","Neighbourhood Mall","Landscaped Gardens"],
    imageGradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 50%,#3a6a8a 100%)",
  },
  {
    id:"ved-n08",
    projectName:"Oakwood Estate",
    developer:"Antriksh Group",
    location:"Sector 77, Noida",
    startingPrice:"₹ 1.85 Cr",
    configs:"3, 4 BHK + Plots",
    possession:"Plots Ready; Tower Dec 2028",
    type:"Plotted",
    status:"Under Construction",
    highlights:["RERA Registered","Gated Community","Plots Available","Bank Tied-up"],
    imageGradient:"linear-gradient(135deg,#1a2a1a 0%,#2a4a2a 50%,#3a6a3a 100%)",
  },
  {
    id:"ved-n09",
    projectName:"Altius Tower",
    developer:"Brigade Group",
    location:"Sector 152, Noida",
    startingPrice:"₹ 2.15 Cr",
    configs:"3, 4 BHK",
    possession:"Feb 2029",
    type:"Residential",
    status:"Pre-Launch",
    highlights:["Early Bird Pricing","RERA Applied","Noida Extension","High Appreciation Zone"],
    imageGradient:"linear-gradient(135deg,#1a0a2a 0%,#2a1a4a 50%,#3a2a6a 100%)",
  },
];

export default function NewLaunchesPage() {
  return (
    <>
      <VideoHeroSection videoSrc="/videos/New%20Launches.mp4">
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>New Launches</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
            Verified New Launches<br /><span style={{ color:"var(--gold-lt)" }}>Across Delhi NCR</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Every project listed passes our five-point Verification Framework before publishing. No unverified launches, ever.</p>
      </VideoHeroSection>

      {/* Upcoming & New Launch Projects */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Verified Projects</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Recently Launched &amp;<span style={{ color:"var(--gold-lt)" }}> Upcoming Projects</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Directly from Vedhara&apos;s verified developer partners, no speculative listings, no unapproved projects.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {launchProjects.map((project,index)=>(
              <ScrollReveal key={project.id} delay={index * 80} style={{ display:"flex" }}>
                <Link
                  href="/contact?service=new-launches"
                  className="hover-lift"
                  style={{ display:"flex",flexDirection:"column",flex:1,background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}
                >
                  {/* Image area */}
                  <div style={{ height:180,background:project.imageGradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0 }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ textAlign:"center",position:"relative",zIndex:1 }}>
                      <div style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:18,color:"rgba(255,255,255,0.85)",padding:"0 20px",marginBottom:4 }}>
                        {project.projectName}
                      </div>
                      <div style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:600,color:"rgba(255,255,255,0.45)",letterSpacing:"0.08em",textTransform:"uppercase" }}>
                        {project.developer}
                      </div>
                    </div>
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.9)",border:"1px solid rgba(255,255,255,0.25)" }}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-dk)",borderRadius:3 }}>
                        {project.type}
                      </span>
                    </div>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{project.location}</p>

                    {/* Details grid */}
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 16px",marginBottom:10,padding:"10px 0",borderTop:"1px solid rgba(212,168,67,0.15)",borderBottom:"1px solid rgba(212,168,67,0.15)" }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(42,45,53,0.35)",marginBottom:1 }}>Configurations</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:12.5,color:"var(--ink)" }}>{project.configs}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(42,45,53,0.35)",marginBottom:1 }}>Possession</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:12.5,color:"var(--ink)" }}>{project.possession}</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:10 }}>
                      {project.highlights.map(h=>(
                        <span key={h} style={{ fontFamily:"var(--t-head)",fontSize:7.5,fontWeight:600,letterSpacing:"0.04em",padding:"3px 7px",background:"rgba(212,168,67,0.08)",color:"var(--gold-dk)",borderRadius:3 }}>
                          {h}
                        </span>
                      ))}
                    </div>

                    <div style={{ flex:1 }} />

                    {/* CTA - left to right */}
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12,flexShrink:0 }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(42,45,53,0.35)",marginBottom:1 }}>Starting Price</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",margin:0 }}>{project.startingPrice}</p>
                      </div>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",display:"inline-flex",alignItems:"center",gap:5,padding:"10px 16px",background:"var(--navy)",color:"var(--gold-lt)",borderRadius:6,whiteSpace:"nowrap" }}>
                        Register Interest →
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:52 }}>
              <p className="body-md" style={{ color:"rgba(252,250,244,0.35)",marginBottom:20 }}>
                Want early access to projects before they&apos;re publicly announced? Subscribe to the Ground Report.
              </p>
              <div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap" }}>
                <Link href="/contact?service=new-launches" className="btn btn-primary">
                  Get Project Brochure →
                </Link>
                <Link href="/market-insights" className="btn btn-outline">
                  Subscribe to Ground Report →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={launchFaqs} title="New Launches FAQ" dark={false} />
    </>
  );
}
