import type { Metadata } from "next";
import Link from "next/link";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Commercial Property Advisory in Delhi NCR | Office, Retail & Industrial | Vedhara Group", description:"Independent commercial property advisory in Delhi NCR, office space leasing, retail site selection, industrial shed, and commercial property acquisition.", alternates:{ canonical:"https://www.vedharagroup.com/commercial" } };

interface CommercialListing {
  id:string;
  title:string;
  location:string;
  price:string;
  size:string;
  type:"Office"|"Retail"|"Industrial"|"Co-working"|"Land";
  status:"Available"|"Leased"|"Under Offer";
  highlights:string[];
  imageGradient:string;
}

const commercialListings: CommercialListing[] = [
  {
    id:"ved-c01",
    title:"One Horizon Center",
    location:"Sector 43, Gurugram",
    price:"₹ 12.50 Cr",
    size:"4,800 sq.ft.",
    type:"Office",
    status:"Available",
    highlights:["Golf Course Road","LEED Gold","Deal Floor","24hr Security"],
    imageGradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 50%,#B8922A 100%)",
  },
  {
    id:"ved-c02",
    title:"Retail Arcade",
    location:"Sector 18, Noida",
    price:"₹ 2.85 Cr",
    size:"1,200 sq.ft.",
    type:"Retail",
    status:"Available",
    highlights:["High Footfall","Market Centre","Loading Bay","Signage Visible"],
    imageGradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#6a4a2a 100%)",
  },
  {
    id:"ved-c03",
    title:"Industrial Shed Complex",
    location:"Bhiwadi, Rajasthan (NCR)",
    price:"₹ 4.20 Cr",
    size:"8,500 sq.ft.",
    type:"Industrial",
    status:"Available",
    highlights:["NH-48 Access","Heavy Power","Warehouse","Loading Dock"],
    imageGradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a4a 50%,#2a5a6a 100%)",
  },
  {
    id:"ved-c04",
    title:"Cyber Park",
    location:"Sector 67, Gurugram",
    price:"₹ 95 Lakhs/yr",
    size:"2,200 sq.ft.",
    type:"Co-working",
    status:"Available",
    highlights:["Plug & Play","Meeting Rooms","Cafeteria","Networking Events"],
    imageGradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#4a7a9a 100%)",
  },
  {
    id:"ved-c05",
    title:"Commercial Plot, Sector 150",
    location:"Sector 150, Noida",
    price:"₹ 6.80 Cr",
    size:"2,500 sq.yds.",
    type:"Land",
    status:"Available",
    highlights:["Mixed-Use Zoning","Noida Authority","Corner Plot","Ideal for Mall"],
    imageGradient:"linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 50%,#2a5a2a 100%)",
  },
  {
    id:"ved-c06",
    title:"Platinum Business Centre",
    location:"MG Road, Gurugram",
    price:"₹ 18.00 Cr",
    size:"6,200 sq.ft.",
    type:"Office",
    status:"Under Offer",
    highlights:["MG Road Frontage","Corporate Zone","Basement Parking","100% Power Backup"],
    imageGradient:"linear-gradient(135deg,#1a0a2a 0%,#3a1a4a 50%,#5a2a6a 100%)",
  },
];

export default function CommercialPage() {
  return (
    <>
      <ServicePageTemplate content={servicePages.commercial} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Commercial%20Page%20Video.mp4" />

      {/* Commercial Listings Section */}
      <section style={{ background:"var(--navy)",padding:"104px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Commercial Spaces</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Available Commercial<span style={{ color:"var(--gold-lt)" }}> Properties</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Office, retail, industrial, and land opportunities, each with Vedhara&apos;s independent commercial advisory.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {commercialListings.map((property,index)=>(
              <ScrollReveal key={property.id} delay={index * 80}>
                <div className="hover-lift" style={{ background:"rgba(184,146,42,0.06)",border:"1px solid rgba(184,146,42,0.12)",borderRadius:16,overflow:"hidden",backdropFilter:"blur(12px)",height:"100%",display:"flex",flexDirection:"column" }}>
                  
                  <div style={{ height:200,background:property.imageGradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:20,color:"rgba(252,250,244,0.7)",textAlign:"center",padding:"0 20px",position:"relative",zIndex:1 }}>
                      {property.title}
                    </div>
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"5px 12px",borderRadius:20,background:property.status==="Available"?"rgba(184,146,42,0.15)":"rgba(255,255,255,0.06)",color:property.status==="Available"?"var(--gold-lt)":"rgba(252,250,244,0.5)",border:"1px solid "+ (property.status==="Available"?"rgba(184,146,42,0.3)":"rgba(255,255,255,0.08)") }}>
                        {property.status}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding:24,flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"4px 10px",background:"rgba(184,146,42,0.1)",color:"var(--gold-lt)",borderRadius:4 }}>
                        {property.type}
                      </span>
                    </div>

                    <h3 style={{ fontFamily:"var(--t-display)",fontSize:22,fontWeight:400,color:"var(--light)",marginBottom:6,lineHeight:1.2 }}>
                      {property.title}
                    </h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:12.5,color:"rgba(252,250,244,0.4)",marginBottom:16 }}>
                      {property.location}
                    </p>

                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 16px",marginBottom:18,padding:"14px 0",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Price</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--gold-lt)" }}>{property.price}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Area</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--light)" }}>{property.size}</p>
                      </div>
                    </div>

                    <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:20,flex:1,alignContent:"flex-start" }}>
                      {property.highlights.map(h=>(
                        <span key={h} style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:600,letterSpacing:"0.04em",padding:"4px 10px",background:"rgba(184,146,42,0.06)",color:"rgba(212,170,82,0.7)",borderRadius:4 }}>
                          {h}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact?service=commercial"
                      className="btn btn-ghost"
                      style={{ alignSelf:"flex-start",marginTop:"auto" }}
                    >
                      Inquire About This Space →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:52 }}>
              <p className="body-md" style={{ color:"rgba(252,250,244,0.35)",marginBottom:20 }}>
                Looking for something specific? We have 40+ commercial properties across Delhi NCR.
              </p>
              <Link href="/contact?service=commercial" className="btn btn-primary">
                Discuss Your Commercial Requirement →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
