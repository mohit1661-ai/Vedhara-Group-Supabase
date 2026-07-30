import type { Metadata } from "next";
import Link from "next/link";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
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
    imageGradient:"linear-gradient(135deg,#1a1a2e 0%,#D4A843 30%,#E8C970 70%,#F0DBA8 100%)",
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
    imageGradient:"linear-gradient(135deg,#2a2a4a 0%,#4a4a7a 50%,#D4A843 100%)",
  },
];

export default function RentPage() {
  return (
    <>
      <ServicePageTemplate content={servicePages.rent} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Rent%20Page%20Video.mp4" hideFAQ />

      {/* Featured Rentals Section - Homepage-style cards */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Available Rentals</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Verified Rental Properties<br /><span style={{ color:"var(--gold-lt)" }}>in Delhi NCR</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Each rental listing is verified for authenticity,<br />lease terms, and property condition.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {rentalListings.map((property,index)=>(
              <ScrollReveal key={property.id} delay={index * 80} style={{ display:"flex" }}>
                <Link
                  href="/contact?service=rent"
                  className="hover-lift"
                  style={{ display:"flex",flexDirection:"column",flex:1,background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}
                >
                  {/* Image area */}
                  <div style={{ height:180,background:property.imageGradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:18,color:"rgba(255,255,255,0.85)",textAlign:"center",padding:"0 20px",position:"relative",zIndex:1 }}>
                      {property.title}
                    </div>
                    {/* Status badge */}
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.9)",border:"1px solid rgba(255,255,255,0.25)" }}>
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding:20 }}>
                    {/* Type & Furnished badges */}
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8,flexWrap:"wrap" }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-dk)",borderRadius:3 }}>
                        {property.type}
                      </span>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:600,letterSpacing:"0.04em",padding:"3px 8px",background:"rgba(42,45,53,0.04)",color:"var(--slate)",borderRadius:3 }}>
                        {property.furnished}
                      </span>
                    </div>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{property.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--navy)",marginBottom:10,lineHeight:1.4 }}>{property.config} · {property.size}</p>
                    
                    {/* Highlights as small tags */}
                    <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:10 }}>
                      {property.highlights.map(h=>(
                        <span key={h} style={{ fontFamily:"var(--t-head)",fontSize:7.5,fontWeight:600,letterSpacing:"0.04em",padding:"3px 7px",background:"rgba(212,168,67,0.08)",color:"var(--gold-dk)",borderRadius:3 }}>
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Price row */}
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12 }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(42,45,53,0.35)",marginBottom:1 }}>Monthly Rent</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0 }}>{property.monthlyRent}</p>
                      </div>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",display:"inline-flex",alignItems:"center",gap:5,padding:"10px 16px",background:"var(--navy)",color:"var(--gold-lt)",borderRadius:6,whiteSpace:"nowrap" }}>
                        Schedule Visit →
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:32 }}>
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

      {/* FAQ then CTA (FAQ before Ready to make your next property move?) */}
      <FAQSection faqs={servicePages.rent.faqs} title="Rent & Lease FAQ" />
      <CTASection />
    </>
  );
}
