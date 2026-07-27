import type { Metadata } from "next";
import Link from "next/link";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Sell Property in Delhi NCR | Get Fair Market Value | Vedhara Group", description:"Sell your property in Delhi, Gurugram, Noida, Faridabad or Ghaziabad at the right price. Strategic pricing, qualified buyer access, end-to-end sale management.", alternates:{ canonical:"https://www.vedharagroup.com/sell" } };

interface SellListing {
  id:string;
  title:string;
  location:string;
  askingPrice:string;
  config:string;
  size:string;
  type:"Residential"|"Commercial"|"Luxury"|"Plotted";
  status:"Available for Sale"|"Under Offer"|"Sold";
  highlights:string[];
  imageGradient:string;
}

const sellListings: SellListing[] = [
  {
    id:"ved-s01",
    title:"Sunset Villa",
    location:"Sector 23, Dwarka, Delhi",
    askingPrice:"₹ 3.95 Cr",
    config:"4 BHK Independent Floor",
    size:"2,600 sq.ft.",
    type:"Residential",
    status:"Available for Sale",
    highlights:["Dwarka Prime","Park Facing","3 Sidus Open","Vastu Compliant"],
    imageGradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#3a6a8f 100%)",
  },
  {
    id:"ved-s02",
    title:"Green Valley Apartment",
    location:"Sector 49, Gurugram",
    askingPrice:"₹ 2.35 Cr",
    config:"3 BHK",
    size:"1,580 sq.ft.",
    type:"Residential",
    status:"Available for Sale",
    highlights:["Golf Course Extn","Clubhouse","Covered Parking","High Floor"],
    imageGradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#5a7a9a 100%)",
  },
  {
    id:"ved-s03",
    title:"Lotus Business Center",
    location:"Sector 44, Gurugram",
    askingPrice:"₹ 6.80 Cr",
    config:"3,200 sq.ft. Office",
    size:"3,200 sq.ft.",
    type:"Commercial",
    status:"Available for Sale",
    highlights:["Commercial Zone","Leased Until Apr 27","High ROI","Corner Location"],
    imageGradient:"linear-gradient(135deg,#1a1a2e 0%,#B8922A 30%,#D4AA52 70%,#F0DBA8 100%)",
  },
  {
    id:"ved-s04",
    title:"Royal Heritage Penthouse",
    location:"Golf Course Road, Gurugram",
    askingPrice:"₹ 8.75 Cr",
    config:"4 BHK Penthouse",
    size:"3,400 sq.ft.",
    type:"Luxury",
    status:"Available for Sale",
    highlights:["Golf Course View","Private Terrace","Smart Home","Jacuzzi"],
    imageGradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 50%,#B8922A 100%)",
  },
  {
    id:"ved-s05",
    title:"Serene Garden Plot",
    location:"Sector 150, Noida",
    askingPrice:"₹ 4.50 Cr",
    config:"450 sq.yds. Plot",
    size:"450 sq.yds.",
    type:"Plotted",
    status:"Available for Sale",
    highlights:["Sector 150","Corner Plot","All Approvals","Immediate Registration"],
    imageGradient:"linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 50%,#2a5a2a 100%)",
  },
  {
    id:"ved-s06",
    title:"Heritage Haveli",
    location:"Mehrauli, Delhi",
    askingPrice:"₹ 12.50 Cr",
    config:"5 BHK + Courtyard",
    size:"5,200 sq.ft.",
    type:"Luxury",
    status:"Under Offer",
    highlights:["South Delhi Prime","Heritage Architecture","Large Courtyard","Rare Offering"],
    imageGradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#6a3a2a 100%)",
  },
];

export default function SellPage() {
  return (
    <>
      <ServicePageTemplate content={servicePages.sell} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Sell%20Page%20Video%20(1).mp4" />

      {/* Properties for Sale Section */}
      <section style={{ background:"var(--navy)",padding:"104px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Listed for Sale</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Properties Currently<span style={{ color:"var(--gold-lt)" }}> on the Market</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Each listing comes with a Vedhara Market Analysis Report detailing pricing rationale and comparable sales.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {sellListings.map((property,index)=>(
              <ScrollReveal key={property.id} delay={index * 80}>
                <div className="hover-lift" style={{ background:"rgba(184,146,42,0.06)",border:"1px solid rgba(184,146,42,0.12)",borderRadius:16,overflow:"hidden",backdropFilter:"blur(12px)",height:"100%",display:"flex",flexDirection:"column" }}>
                  
                  {/* Image area */}
                  <div style={{ height:200,background:property.imageGradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:20,color:"rgba(252,250,244,0.7)",textAlign:"center",padding:"0 20px",position:"relative",zIndex:1 }}>
                      {property.title}
                    </div>
                    {/* Status badge */}
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"5px 12px",borderRadius:20,background:property.status==="Available for Sale"?"rgba(184,146,42,0.15)":"rgba(255,255,255,0.06)",color:property.status==="Available for Sale"?"var(--gold-lt)":"rgba(252,250,244,0.5)",border:"1px solid "+ (property.status==="Available for Sale"?"rgba(184,146,42,0.3)":"rgba(255,255,255,0.08)") }}>
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding:24,flex:1,display:"flex",flexDirection:"column" }}>
                    {/* Type badge */}
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

                    {/* Key details */}
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 16px",marginBottom:18,padding:"14px 0",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Asking Price</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--gold-lt)" }}>{property.askingPrice}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Configuration</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--light)" }}>{property.config}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Area</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--light)" }}>{property.size}</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:20,flex:1,alignContent:"flex-start" }}>
                      {property.highlights.map(h=>(
                        <span key={h} style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:600,letterSpacing:"0.04em",padding:"4px 10px",background:"rgba(184,146,42,0.06)",color:"rgba(212,170,82,0.7)",borderRadius:4 }}>
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href="/contact?service=sell"
                      className="btn btn-ghost"
                      style={{ alignSelf:"flex-start",marginTop:"auto" }}
                    >
                      Express Interest →
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
                Want to list your property? Vedhara helps you price and position it for the right buyer.
              </p>
              <Link href="/contact?service=sell" className="btn btn-primary">
                List Your Property →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
