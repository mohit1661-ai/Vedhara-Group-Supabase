import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Commercial Property Advisory in Delhi NCR", description:"Independent commercial property advisory in Delhi NCR, Faridabad & Manesar: office space leasing, retail site selection, industrial sheds and acquisition.", alternates:{ canonical:"https://www.vedharagroup.com/commercial" } };

interface CommercialListing {
  id:string;
  title:string;
  location:string;
  price:string;
  size:string;
  type:"Office"|"Retail"|"Industrial"|"Co-working"|"Land";
  status:"Available"|"Leased"|"Under Offer";
  highlights:string[];
  image:string;
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
    image:"https://images.pexels.com/photos/38340685/pexels-photo-38340685.jpeg?auto=compress&cs=tinysrgb&w=900",
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
    image:"https://images.pexels.com/photos/17391304/pexels-photo-17391304.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"83%",
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
    image:"https://images.pexels.com/photos/4115457/pexels-photo-4115457.jpeg?auto=compress&cs=tinysrgb&w=900",
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
    image:"https://images.pexels.com/photos/36926207/pexels-photo-36926207.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"62%",
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
    image:"https://images.pexels.com/photos/32370508/pexels-photo-32370508.jpeg?auto=compress&cs=tinysrgb&w=900",
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
    image:"https://images.pexels.com/photos/30704251/pexels-photo-30704251.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"59%",
  },
];

export default function CommercialPage() {
  return (
    <>
      <Breadcrumbs items={[{ name:"Home", href:"/" },{ name:"Commercial Real Estate", href:"/commercial" }]} />
      <ServicePageTemplate content={servicePages.commercial} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Commercial%20Page%20Video.mp4" hideFAQ />

      {/* Commercial Listings Section */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Commercial Spaces</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Available Commercial<br /><span style={{ color:"var(--gold-lt)" }}>Properties</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Office, retail, industrial, and land opportunities, each with Vedhara&apos;s independent commercial advisory.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {commercialListings.map((property,index)=>(
              <ScrollReveal key={property.id} delay={index * 80} style={{ display:"flex" }}>
                <Link
                  href="/contact?service=commercial"
                  className="hover-lift"
                  style={{ display:"flex",flexDirection:"column",flex:1,background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}
                >
                  <div style={{ height:180,position:"relative",overflow:"hidden",flexShrink:0 }}>
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit:"cover", objectPosition: property.pos || "50% 50%" }}
                    />
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(9,15,29,0.05) 0%,rgba(9,15,29,0.45) 100%)" }} />
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(9,15,29,0.55)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(4px)" }}>
                        {property.status}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-dk)",borderRadius:3 }}>
                        {property.type}
                      </span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:6,lineHeight:1.3 }}>{property.title}</h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{property.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--navy)",marginBottom:10,lineHeight:1.4 }}>{property.size}</p>
                    <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:10 }}>
                      {property.highlights.map(h=>(
                        <span key={h} style={{ fontFamily:"var(--t-head)",fontSize:7.5,fontWeight:600,letterSpacing:"0.04em",padding:"3px 7px",background:"rgba(212,168,67,0.08)",color:"var(--gold-dk)",borderRadius:3 }}>
                          {h}
                        </span>
                      ))}
                    </div>
                    <div style={{ flex:1 }} />
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12,flexShrink:0 }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(42,45,53,0.35)",marginBottom:1 }}>Price</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0 }}>{property.price}</p>
                      </div>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",display:"inline-flex",alignItems:"center",gap:5,padding:"10px 16px",background:"var(--navy)",color:"var(--gold-lt)",borderRadius:6,whiteSpace:"nowrap" }}>
                        Inquire →
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
                Looking for something specific? We have 40+ commercial properties across Delhi NCR, Faridabad and Manesar.
              </p>
              <Link href="/contact?service=commercial" className="btn btn-primary">
                Discuss Your Commercial Requirement →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ then CTA */}
      <FAQSection faqs={servicePages.commercial.faqs} title="Commercial Real Estate FAQ" />
      <CTASection />
    </>
  );
}
