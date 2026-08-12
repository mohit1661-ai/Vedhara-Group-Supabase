import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import VideoOnHover from "@/components/ui/VideoOnHover";
import ImageSliderOnHover from "@/components/ui/ImageSliderOnHover";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ListingGallery from "@/components/ui/ListingGallery";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Commercial Property Advisory in Delhi NCR", description:"Independent commercial property advisory in Delhi NCR, Faridabad & Manesar: office space leasing, retail site selection, industrial sheds and acquisition.", alternates:{ canonical:"https://www.vedharagroup.com/commercial" } };

interface CommercialListing {
  id:string;
  title:string;
  location:string;
  price:string;
  priceNote?:string;
  size:string;
  type:"Office"|"Retail"|"Industrial"|"Co-working"|"Land"|"Commercial";
  status:"Available"|"Leased"|"Under Offer"|"JV Opportunity"|"For Sale";
  highlights:string[];
  image:string;
  video?:string;
  poster?:string;
  images?:string[];
  gallery?:string[];
  pos?:string;
  alt?:string;
}

const commercialListings: CommercialListing[] = [
  // NEWEST LISTINGS FIRST — add new properties at the top of this array
  {
    id:"ved-c13",
    title:"Fortune Questa",
    location:"Udyog Vihar Phase VII, Sector 35, Gurugram",
    price:"₹ 150 Cr Demand",
    priceNote:"A/C Load 568 KW (COP 5.0) · 300 KW (COP 6.15 + heat recovery) · Lighting Load 150 KW (1.5W/sq.ft.)",
    size:"2.84 lakh sq. ft. total leasable · 40,000 sq. ft. floor plate · Efficiency 70%",
    type:"Office",
    status:"For Sale",
    highlights:["LEED Silver Certified","Single ownership (not strata-titled)","2.84 lakh sq. ft. leasable area","40,000 sq. ft. floor plates","500 cars parking across 3 basement levels","NH-8 frontage · ~1.75L vehicles/day","Within 5 km (sanctioned station)","Airport Distance 25 km (International)"],
    image:"/Images/udyog-vihar-01.jpeg",
    images:[
      "/Images/udyog-vihar-01.jpeg",
      "/Images/udyog-vihar-02.jpeg",
    ],
    gallery:[
      "/Images/udyog-vihar-01.jpeg",
      "/Images/udyog-vihar-02.jpeg",
    ],
    alt:"LEED Silver Grade-A office building on NH-8, Gurugram",
  },
  {
    id:"ved-c12",
    title:"Pre-Rented Commercial Building",
    location:"Film City, Sector 16A, Noida",
    price:"₹ 220 Cr Demand",
    priceNote:"Rent ₹1.41 Cr / month · Pre-rented",
    size:"4,034 sq.yds. plot · 165,319 sq.ft. built-up",
    type:"Commercial",
    status:"For Sale",
    highlights:["Pre-rented income asset","165,319 sq.ft. built-up","Basement + Stilt + 9 floors","90-yr Noida lease from 2006","Escalation 10–15% every 3–5 yrs","South-West facing"],
    image:"/Images/film-city-noida-aerial.jpeg",
    images:[
      "/Images/film-city-noida-aerial.jpeg",
      "/Images/film-city-noida-02.jpeg",
    ],
    gallery:[
      "/Images/film-city-noida-aerial.jpeg",
      "/Images/film-city-noida-02.jpeg",
    ],
    alt:"Pre-rented commercial building for sale at Film City, Sector 16A, Noida",
  },
  {
    id:"ved-c10",
    title:"Commercial Building for Sale",
    location:"Udyog Vihar Phase 5, Gurugram",
    price:"₹ 40 Cr Demand",
    priceNote:"40,000 sq.ft. built-up",
    size:"1,000 sq. m. plot",
    type:"Commercial",
    status:"For Sale",
    highlights:["Udyog Vihar 5","1,000 sq. m. plot","40,000 sq.ft. built-up","Established commercial zone"],
    image:"/Images/udyog-vihar-05.jpeg",
    images:[
      "/Images/udyog-vihar-05.jpeg",
      "/Images/udyog-vihar-07.jpeg",
      "/Images/udyog-vihar-09.jpeg",
    ],
    gallery:[
      "/Images/udyog-vihar-05.jpeg",
      "/Images/udyog-vihar-07.jpeg",
      "/Images/udyog-vihar-09.jpeg",
    ],
    alt:"Commercial building for sale in Udyog Vihar Phase 5, Gurugram",
  },
  {
    id:"ved-c11",
    title:"MG Road Commercial Building",
    location:"Sector 16, Gurugram",
    price:"₹ 25 Cr Demand",
    size:"1,000 sq. m. plot",
    type:"Commercial",
    status:"For Sale",
    highlights:["MG Road","Opp. Sector 14","1,000 sq. m. plot","Prime commercial corridor"],
    image:"https://images.pexels.com/photos/5859963/pexels-photo-5859963.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    gallery:[
      "/Images/MG%20Road%20Commercial%20Building%20Images.webp",
      "/Images/Office%20Space%20in%20MG%20Road%20Gurgaon.webp",
      "/Images/Commercia%20Office%20Space%20in%20MG%20Road%20Gurgaon.jpg",
    ],
    alt:"Commercial building for sale in Sector 16 on MG Road, Gurugram",
  },
  {
    id:"ved-c07",
    title:"Commercial Land for JV",
    location:"Sector 67, Ansal Essencia, Gurgaon",
    price:"₹ 160 Cr Outright",
    priceNote:"JV: ₹35 Cr (non-adjustable) · 50:50",
    size:"1.75 Acre",
    type:"Land",
    status:"JV Opportunity",
    highlights:["FSI 1,33,000 sq.ft.","Salable 2,60,000 sq.ft.","Structure G+3","Frontage 220 ft","Front road 60 m","M3M · IREO · Bestech · Emaar · BPTP"],
    image:"/Images/Commercial%20land%20available%20for%20JV%20in%20Gurgaon%20Site%20Plan.jpeg",
    video:"/videos/Commercial%20Land%20Available%20for%20JV%20in%20Gurgaon%20Video.mp4",
    poster:"/Images/Commercial%20land%20available%20for%20JV%20in%20Gurgaon%20Site%20Plan.jpeg",
    gallery:[
      "/Images/Commercial%20land%20available%20for%20JV%20in%20Gurgaon%20Site%20Plan.jpeg",
      "/Images/Digital%20Plan%20Gurgaon%20Commercial%20Land.jpeg",
      "/Images/Digital%20Plan%20Gurgaon%20Commercial%20Land%20Image.jpeg",
    ],
    alt:"Commercial land available for JV in Sector 67, Ansal Essencia, Gurgaon",
  },
  {
    id:"ved-c08",
    title:"Rented Commercial Building for Sale",
    location:"Udyog Vihar 2, Gurgaon",
    price:"₹ 270 Cr Demand",
    priceNote:"Rent ₹1.65 Cr / month",
    size:"4,000 sq. m. plot",
    type:"Commercial",
    status:"For Sale",
    highlights:["4,000 sq. m. plot","₹1.65 Cr/month rent","Newly constructed, fully furnished","Reliable existing tenant","Payment 50:50"],
    image:"/Images/udyog-vihar-01.jpeg",
    images:[
      "/Images/udyog-vihar-01.jpeg",
      "/Images/udyog-vihar-02.jpeg",
      "/Images/udyog-vihar-03.jpeg",
      "/Images/udyog-vihar-04.jpeg",
      "/Images/udyog-vihar-05.jpeg",
      "/Images/udyog-vihar-06.jpeg",
      "/Images/udyog-vihar-07.jpeg",
      "/Images/udyog-vihar-08.jpeg",
      "/Images/udyog-vihar-09.jpeg",
      "/Images/udyog-vihar-10.jpeg",
      "/Images/udyog-vihar-11.jpeg",
      "/Images/udyog-vihar-12.jpeg",
      "/Images/udyog-vihar-13.jpeg",
      "/Images/udyog-vihar-14.jpeg",
      "/Images/udyog-vihar-15.jpeg",
      "/Images/udyog-vihar-16.jpeg",
      "/Images/udyog-vihar-17.jpeg",
      "/Images/udyog-vihar-18.jpeg",
      "/Images/udyog-vihar-19.jpeg",
    ],
    gallery:[
      "/Images/udyog-vihar-01.jpeg",
      "/Images/udyog-vihar-02.jpeg",
      "/Images/udyog-vihar-03.jpeg",
      "/Images/udyog-vihar-05.jpeg",
    ],
    alt:"Rented commercial building for sale in Udyog Vihar 2, Gurgaon",
  },
  {
    id:"ved-c09",
    title:"IT Pass Building for Sale",
    location:"Phase 1, Udyog Vihar, Gurgaon",
    price:"₹ 17 Cr Asking",
    priceNote:"Rent ₹5.0 L / month · Mix Cheque Deal",
    size:"450 sq. m. · 12,000 sq. ft. constructed",
    type:"Commercial",
    status:"For Sale",
    highlights:["IT Pass Building","Basement, GF+2","Shed-covered cafeteria on terrace","Basement vacant · rest floors rented","₹5.0 L / month rent","Mix Cheque Deal"],
    image:"/Images/udyog-vihar-p1-03.jpeg",
    images:[
      "/Images/udyog-vihar-p1-03.jpeg",
      "/Images/udyog-vihar-p1-01.jpeg",
      "/Images/udyog-vihar-p1-02.jpeg",
      "/Images/udyog-vihar-p1-04.jpeg",
      "/Images/udyog-vihar-p1-05.jpeg",
      "/Images/udyog-vihar-p1-06.jpeg",
    ],
    gallery:[
      "/Images/udyog-vihar-p1-03.jpeg",
      "/Images/udyog-vihar-p1-01.jpeg",
      "/Images/udyog-vihar-p1-02.jpeg",
      "/Images/udyog-vihar-p1-04.jpeg",
    ],
    alt:"IT-pass commercial building for sale in Phase 1, Udyog Vihar, Gurgaon",
  },
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
    alt:"One Horizon Center office tower on Golf Course Road, Gurugram",
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
    image:"https://images.pexels.com/photos/16140814/pexels-photo-16140814.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50%",
    alt:"Retail Arcade shopping arcade storefronts in Sector 18, Noida",
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
    image:"https://images.pexels.com/photos/12347763/pexels-photo-12347763.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50%",
    alt:"Industrial Shed Complex warehouse in Bhiwadi, Rajasthan NCR",
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
    alt:"Cyber Park co-working office space in Sector 67, Gurugram",
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
    image:"https://images.pexels.com/photos/7765190/pexels-photo-7765190.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50%",
    alt:"Commercial plot land parcel for mixed-use development in Sector 150, Noida",
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
    alt:"Platinum Business Centre corporate office on MG Road, Gurugram",
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
                    {property.video ? (
                      <VideoOnHover src={property.video} poster={property.poster} alt={property.alt || property.title} />
                    ) : property.images && property.images.length > 0 ? (
                      <ImageSliderOnHover images={property.images} alt={property.alt || property.title} />
                    ) : (
                      <Image
                        src={property.image}
                        alt={property.alt || property.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit:"cover", objectPosition: property.pos ? (property.pos.indexOf(" ") > -1 ? property.pos : "50% " + property.pos) : "50% 50%" }}
                      />
                    )}
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(9,15,29,0.05) 0%,rgba(9,15,29,0.45) 100%)",pointerEvents:"none" }} />
                    {property.video ? (
                      <div style={{ position:"absolute",top:14,left:14,zIndex:2 }}>
                        <span style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(9,15,29,0.55)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(4px)",display:"inline-flex",alignItems:"center",gap:5 }}>
                          ▶ Video Tour
                        </span>
                      </div>
                    ) : property.images && property.images.length > 0 ? (
                      <div style={{ position:"absolute",top:14,left:14,zIndex:2 }}>
                        <span style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(9,15,29,0.55)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(4px)",display:"inline-flex",alignItems:"center",gap:5 }}>
                          📷 {property.images.length} Photos
                        </span>
                      </div>
                    ) : null}
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(9,15,29,0.55)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(4px)" }}>
                        {property.status}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-ink)",borderRadius:3 }}>
                        {property.type}
                      </span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:6,lineHeight:1.3 }}>{property.title}</h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{property.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--navy)",marginBottom:10,lineHeight:1.4 }}>{property.size}</p>
                    <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:10 }}>
                      {property.highlights.map(h=>(
                        <span key={h} style={{ fontFamily:"var(--t-head)",fontSize:7.5,fontWeight:600,letterSpacing:"0.04em",padding:"3px 7px",background:"rgba(212,168,67,0.08)",color:"var(--gold-ink)",borderRadius:3 }}>
                          {h}
                        </span>
                      ))}
                    </div>
                    <div style={{ flex:1 }} />
                    {/* Small photo cards — click to open the full-size lightbox viewer. Uses the full photo set (scroller appears when > 4 photos). Bottom-anchored so the gallery + CTA row stay aligned across all cards. */}
                    <ListingGallery
                      images={property.images && property.images.length > 0
                        ? property.images
                        : property.gallery && property.gallery.length > 0
                          ? property.gallery
                          : [property.image]}
                      title={property.title}
                    />
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12,flexShrink:0,minHeight:73 }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(42,45,53,0.35)",marginBottom:1 }}>Price</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0 }}>{property.price}</p>
                        {/* Always reserve the note line so every card's CTA row has the same height → gallery + Inquire button stay aligned across cards. */}
                        <p style={{ fontFamily:"var(--t-body)",fontSize:10.5,fontWeight:600,color:"var(--gold-ink)",margin:"2px 0 0" }}>{property.priceNote || "\u00A0"}</p>
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
