import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Rent Property in Delhi NCR | Verified Rentals", description:"Find verified rental properties across Delhi NCR, Faridabad, Manesar and Chandigarh. Tenant advisory, landlord representation and transparent lease terms.", alternates:{ canonical:"https://www.vedharagroup.com/rent" } };

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
  image:string;
  pos?:string;
  alt?:string;
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
    image:"https://images.pexels.com/photos/33559373/pexels-photo-33559373.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"0%",
    alt:"The Aspen Residency 3 BHK rental apartment in Sector 57, Gurugram",
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
    image:"https://images.pexels.com/photos/27085225/pexels-photo-27085225.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"61%",
    alt:"Palm Grove Apartments 2 BHK rental in Sector 44, Noida",
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
    image:"https://images.pexels.com/photos/5859962/pexels-photo-5859962.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"95%",
    alt:"Corporate Square office space for rent in Sector 62, Gurugram",
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
    image:"https://images.pexels.com/photos/34623003/pexels-photo-34623003.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"80%",
    alt:"Vasant Residency 3 BHK rental in Vasant Kunj, Delhi",
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
    image:"https://images.pexels.com/photos/4792297/pexels-photo-4792297.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"63%",
    alt:"Lake Vista Heights 4 BHK rental with lake view in Sector 150, Noida",
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
    image:"https://images.pexels.com/photos/12522753/pexels-photo-12522753.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Galleria Business Hub retail space on MG Road, Gurugram",
  },
];

export default function RentPage() {
  return (
    <>
      <Breadcrumbs items={[{ name:"Home", href:"/" },{ name:"Rent Property", href:"/rent" }]} />
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
                Each rental listing is verified for authenticity,<br className="br-desktop" />lease terms, and property condition.
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
                  <div style={{ height:180,position:"relative",overflow:"hidden" }}>
                    <Image
                      src={property.image}
                      alt={property.alt || property.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit:"cover", objectPosition: property.pos ? (property.pos.indexOf(" ") > -1 ? property.pos : "50% " + property.pos) : "50% 50%" }}
                    />
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(9,15,29,0.05) 0%,rgba(9,15,29,0.45) 100%)" }} />
                    {/* Status badge */}
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(9,15,29,0.55)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(4px)" }}>
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
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:6,lineHeight:1.3 }}>{property.title}</h3>
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
                Don&apos;t see what you&apos;re looking for? We have 80+ verified rental listings across Delhi NCR, Faridabad, Manesar and Chandigarh.
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
