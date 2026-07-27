import type { Metadata } from "next";
import Link from "next/link";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Rent Property in Delhi NCR | Residential & Commercial Rentals | Vedhara Group", description:"Find verified rental properties in Delhi, Gurugram, Noida, Faridabad and Ghaziabad. Tenant advisory, landlord representation, and transparent lease terms.", alternates:{ canonical:"https://www.vedharagroup.com/rent" } };

interface RentalListing {
  id:string;
  title:string;
  location:string;
  monthlyRent:string;
  deposit:string;
  config:string;
  size:string;
  furnished:"Fully Furnished"|"Semi Furnished"|"Unfurnished";
  type:"Residential"|"Commercial";
  status:"Available"|"Recently Leased"|"Under Offer";
  highlights:string[];
  imageGradient:string;
}

const rentalListings: RentalListing[] = [
  {
    id:"ved-r01",
    title:"The Aspen Residency",
    location:"Sector 57, Gurugram",
    monthlyRent:"₹ 58,000/mo",
    deposit:"₹ 1.74 Lakhs",
    config:"3 BHK",
    size:"1,550 sq.ft.",
    furnished:"Fully Furnished",
    type:"Residential",
    status:"Available",
    highlights:["Gurugram prime location","Gated Society","Parking Included","Power Backup"],
    imageGradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#4a7a9f 100%)",
  },
  {
    id:"ved-r02",
    title:"Palm Grove Apartments",
    location:"Sector 44, Noida",
    monthlyRent:"₹ 42,000/mo",
    deposit:"₹ 1.26 Lakhs",
    config:"2 BHK",
    size:"1,250 sq.ft.",
    furnished:"Semi Furnished",
    type:"Residential",
    status:"Available",
    highlights:["Noida Sec 44","Metro 500m","Balcony","24hr Water"],
    imageGradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#6a8aaa 100%)",
  },
  {
    id:"ved-r03",
    title:"Corporate Square",
    location:"Sector 62, Gurugram",
    monthlyRent:"₹ 1,85,000/mo",
    deposit:"₹ 5.55 Lakhs",
    config:"2,800 sq.ft. Office",
    size:"2,800 sq.ft.",
    furnished:"Fully Furnished",
    type:"Commercial",
    status:"Available",
    highlights:["IT/Tech Hub","Conference Room","Pantry","24hr Security"],
    imageGradient:"linear-gradient(135deg,#1a1a2e 0%,#B8922A 30%,#D4AA52 70%,#F0DBA8 100%)",
  },
  {
    id:"ved-r04",
    title:"Vasant Residency",
    location:"Vasant Kunj, Delhi",
    monthlyRent:"₹ 65,000/mo",
    deposit:"₹ 2.60 Lakhs",
    config:"3 BHK + Servant",
    size:"1,750 sq.ft.",
    furnished:"Semi Furnished",
    type:"Residential",
    status:"Available",
    highlights:["South Delhi","Lawns & Park","Covered Parking","Close to Airport"],
    imageGradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#6a4a2a 100%)",
  },
  {
    id:"ved-r05",
    title:"Lake Vista Heights",
    location:"Sector 150, Noida",
    monthlyRent:"₹ 75,000/mo",
    deposit:"₹ 3.00 Lakhs",
    config:"4 BHK",
    size:"2,200 sq.ft.",
    furnished:"Fully Furnished",
    type:"Residential",
    status:"Under Offer",
    highlights:["Lake View","Premium Finishes","Clubhouse","Modular Kitchen"],
    imageGradient:"linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 50%,#3a5a3a 100%)",
  },
  {
    id:"ved-r06",
    title:"Galleria Business Hub",
    location:"MG Road, Gurugram",
    monthlyRent:"₹ 2,40,000/mo",
    deposit:"₹ 7.20 Lakhs",
    config:"3,500 sq.ft. Retail",
    size:"3,500 sq.ft.",
    furnished:"Semi Furnished",
    type:"Commercial",
    status:"Available",
    highlights:["MG Road Front","High Footfall","Washroom","Loading Bay"],
    imageGradient:"linear-gradient(135deg,#2a2a4a 0%,#4a4a7a 50%,#B8922A 100%)",
  },
];

export default function RentPage() {
  return (
    <>
      <ServicePageTemplate content={servicePages.rent} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Rent%20Page%20Video.mp4" />

      {/* Featured Rentals Section */}
      <section style={{ background:"var(--navy)",padding:"104px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Available Rentals</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Verified Rental Properties<span style={{ color:"var(--gold-lt)" }}> in Delhi NCR</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Each rental listing is verified for authenticity, lease terms, and property condition.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {rentalListings.map((property,index)=>(
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
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"5px 12px",borderRadius:20,background:property.status==="Available"?"rgba(184,146,42,0.15)":"rgba(255,255,255,0.06)",color:property.status==="Available"?"var(--gold-lt)":"rgba(252,250,244,0.5)",border:"1px solid "+ (property.status==="Available"?"rgba(184,146,42,0.3)":"rgba(255,255,255,0.08)") }}>
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding:24,flex:1,display:"flex",flexDirection:"column" }}>
                    {/* Type & Furnished badges */}
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap" }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"4px 10px",background:"rgba(184,146,42,0.1)",color:"var(--gold-lt)",borderRadius:4 }}>
                        {property.type}
                      </span>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:600,letterSpacing:"0.04em",padding:"4px 10px",background:"rgba(255,255,255,0.04)",color:"rgba(252,250,244,0.5)",borderRadius:4 }}>
                        {property.furnished}
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
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Monthly Rent</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--gold-lt)" }}>{property.monthlyRent}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Deposit</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--light)" }}>{property.deposit}</p>
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
                      href="/contact?service=rent"
                      className="btn btn-ghost"
                      style={{ alignSelf:"flex-start",marginTop:"auto" }}
                    >
                      Schedule a Visit →
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
                Don&apos;t see what you&apos;re looking for? We have 80+ verified rental listings across Delhi NCR.
              </p>
              <Link href="/contact?service=rent" className="btn btn-primary">
                Get Rental Assistance →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
