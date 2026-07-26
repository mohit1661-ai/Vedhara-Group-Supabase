import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
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
    imageGradient:"linear-gradient(135deg,#16243F 0%,#B8922A 30%,#D4AA52 100%)",
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
            Verified New Project Launches<br /><span style={{ color:"var(--gold-lt)" }}>Across Delhi NCR</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.72)",maxWidth:500,margin:"0 auto" }}>Every project listed passes our five-point Verification Framework before publishing. No unverified launches, ever.</p>
      </VideoHeroSection>

      {/* Upcoming & New Launch Projects */}
      <section style={{ background:"var(--navy)",padding:"104px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Verified Projects</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Recently Launched &amp;<span style={{ color:"var(--gold-lt)" }}> Upcoming Projects</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:540,margin:"0 auto" }}>
                Directly from Vedhara&apos;s verified developer partners, no speculative listings, no unapproved projects.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {launchProjects.map((project,index)=>(
              <ScrollReveal key={project.id} delay={index * 80}>
                <div className="hover-lift" style={{ background:"rgba(184,146,42,0.06)",border:"1px solid rgba(184,146,42,0.12)",borderRadius:16,overflow:"hidden",backdropFilter:"blur(12px)",height:"100%",display:"flex",flexDirection:"column" }}>
                  
                  {/* Image area */}
                  <div style={{ height:200,background:project.imageGradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ textAlign:"center",position:"relative",zIndex:1 }}>
                      <div style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:20,color:"rgba(252,250,244,0.7)",padding:"0 20px",marginBottom:6 }}>
                        {project.projectName}
                      </div>
                      <div style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:600,color:"rgba(252,250,244,0.35)",letterSpacing:"0.08em",textTransform:"uppercase" }}>
                        {project.developer}
                      </div>
                    </div>
                    {/* Status badge */}
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"5px 12px",borderRadius:20,background:project.status==="Just Launched"||project.status==="Phase 2 Released"?"rgba(184,146,42,0.15)":"rgba(255,255,255,0.06)",color:project.status==="Just Launched"||project.status==="Phase 2 Released"?"var(--gold-lt)":"rgba(252,250,244,0.5)",border:"1px solid "+ (project.status==="Just Launched"||project.status==="Phase 2 Released"?"rgba(184,146,42,0.3)":"rgba(255,255,255,0.08)") }}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding:24,flex:1,display:"flex",flexDirection:"column" }}>
                    {/* Type badge */}
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"4px 10px",background:"rgba(184,146,42,0.1)",color:"var(--gold-lt)",borderRadius:4 }}>
                        {project.type}
                      </span>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:600,letterSpacing:"0.04em",padding:"4px 10px",background:"rgba(255,255,255,0.04)",color:"rgba(252,250,244,0.4)",borderRadius:4 }}>
                        {project.developer}
                      </span>
                    </div>

                    <h3 style={{ fontFamily:"var(--t-display)",fontSize:22,fontWeight:400,color:"var(--light)",marginBottom:6,lineHeight:1.2 }}>
                      {project.projectName}
                    </h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:12.5,color:"rgba(252,250,244,0.4)",marginBottom:16 }}>
                      {project.location}
                    </p>

                    {/* Key details */}
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 16px",marginBottom:18,padding:"14px 0",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Starting Price</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--gold-lt)" }}>{project.startingPrice}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Configurations</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--light)" }}>{project.configs}</p>
                      </div>
                      <div style={{ gridColumn:"span 2" }}>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Possession</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--light)" }}>{project.possession}</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:20,flex:1,alignContent:"flex-start" }}>
                      {project.highlights.map(h=>(
                        <span key={h} style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:600,letterSpacing:"0.04em",padding:"4px 10px",background:"rgba(184,146,42,0.06)",color:"rgba(212,170,82,0.7)",borderRadius:4 }}>
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href="/contact?service=new-launches"
                      className="btn btn-ghost"
                      style={{ alignSelf:"flex-start",marginTop:"auto" }}
                    >
                      Register Interest →
                    </Link>
                  </div>
                </div>
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
    </>
  );
}
