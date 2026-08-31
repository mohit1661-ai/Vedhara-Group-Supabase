import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ListingGallery from "@/components/ui/ListingGallery";
import { servicePages } from "@/lib/data/servicePages";
import JsonLd from "@/components/seo/JsonLd";
import { listingsSchema } from "@/lib/seo/listings";

export const metadata: Metadata = { title:"Luxury Properties in Delhi NCR | Premium Homes", description:"Curated luxury homes and premium residences across Delhi NCR, Gurugram, Noida, Chandigarh Tricity and North India. Discreet advisory from Vedhara Group.", alternates:{ canonical:"https://www.vedharagroup.com/luxury" } };

interface LuxuryListing {
  id:string;
  title:string;
  location:string;
  price:string;
  config:string;
  size:string;
  type:"Penthouse"|"Villa"|"Independent Floor"|"Estate";
  status:"Available"|"Under Offer"|"Sold";
  highlights:string[];
  image:string;
  pos?:string;
  alt?:string;
}

const luxuryListings: LuxuryListing[] = [
  // NEWEST LISTINGS FIRST, add new properties at the top of this array
  {
    id:"ved-l07",
    title:"Sector 15 Duplex Kothi",
    location:"Sector 15 Part 2, Gurugram",
    price:"₹ 18 Cr",
    config:"4 BHK + Servant Quarter",
    size:"502 sq.yds.",
    type:"Villa",
    status:"Available",
    highlights:["Prime Sector 15","Duplex Layout","Servant Quarter","NH-8 Connectivity"],
    image:"https://images.pexels.com/photos/35808145/pexels-photo-35808145.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Sector 15 duplex kothi villa in Gurugram",
  },
  {
    id:"ved-l01",
    title:"One Golf Course Penthouse",
    location:"Golf Course Road, Gurugram",
    price:"₹ 12.80 Cr",
    config:"5 BHK + Pool",
    size:"4,200 sq.ft.",
    type:"Penthouse",
    status:"Available",
    highlights:["Panoramic View","Private Terrace","Jacuzzi","Butler Service"],
    image:"https://images.pexels.com/photos/20418771/pexels-photo-20418771.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"One Golf Course Penthouse luxury penthouse on Golf Course Road, Gurugram",
  },
  {
    id:"ved-l02",
    title:"Sovereign Villa",
    location:"Sector 150, Noida",
    price:"₹ 9.50 Cr",
    config:"6 BHK + Study",
    size:"5,800 sq.ft.",
    type:"Villa",
    status:"Available",
    highlights:["Lake Front","Private Garden","Modular Kitchen","Home Theatre"],
    image:"https://images.pexels.com/photos/16573669/pexels-photo-16573669.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"72%",
    alt:"Sovereign Villa lakefront luxury villa in Sector 150, Noida",
  },
  {
    id:"ved-l03",
    title:"The Claridge Estate",
    location:"Jubilee Hills, Delhi",
    price:"₹ 18.50 Cr",
    config:"7 BHK + Guest Wing",
    size:"8,200 sq.ft.",
    type:"Estate",
    status:"Available",
    highlights:["South Delhi Prime","Heritage Architecture","Landscaped Lawns","Staff Quarters"],
    image:"https://images.pexels.com/photos/33985273/pexels-photo-33985273.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"31%",
    alt:"The Claridge Estate heritage luxury mansion in Jubilee Hills, Delhi",
  },
  {
    id:"ved-l04",
    title:"Skydeck Residence",
    location:"Sector 62, Gurugram",
    price:"₹ 7.95 Cr",
    config:"4 BHK Penthouse",
    size:"3,100 sq.ft.",
    type:"Penthouse",
    status:"Under Offer",
    highlights:["Sky Deck","Private Elevator","Wine Cellar","Smart Home"],
    image:"https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Skydeck Residence luxury penthouse in Sector 62, Gurugram",
  },
  {
    id:"ved-l05",
    title:"Magnolia Mansion",
    location:"Greater Kailash II, Delhi",
    price:"₹ 14.20 Cr",
    config:"5 BHK Independent Floor",
    size:"4,500 sq.ft.",
    type:"Independent Floor",
    status:"Available",
    highlights:["GK II Address","Rooftop Terrace","Puja Room","Family Lounge"],
    image:"https://images.pexels.com/photos/1630114/pexels-photo-1630114.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"16%",
    alt:"Magnolia Mansion luxury independent floor in Greater Kailash II, Delhi",
  },
  {
    id:"ved-l06",
    title:"Tuscan Valley Retreat",
    location:"Sohna Road, Gurugram",
    price:"₹ 6.50 Cr",
    config:"4 BHK + Pool",
    size:"3,600 sq.ft.",
    type:"Villa",
    status:"Available",
    highlights:["Golf Estate","Private Pool","Club Membership","Aravalli Views"],
    image:"https://images.pexels.com/photos/36676879/pexels-photo-36676879.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"63%",
    alt:"Tuscan Valley Retreat luxury villa with pool on Sohna Road, Gurugram",
  },
];

export default function LuxuryPage() {
  return (
    <>
      <Breadcrumbs items={[{ name:"Home", href:"/" },{ name:"Luxury Properties", href:"/luxury" }]} />
      <JsonLd data={listingsSchema("/luxury", luxuryListings.map((l) => ({
        id: l.id,
        name: l.title,
        description: l.highlights.join("; "),
        priceDisplay: l.price,
        locality: l.location,
        propertyType: l.type,
        size: `${l.config} · ${l.size}`,
        status: l.status,
        image: l.image,
      })))} />
      <ServicePageTemplate content={servicePages.luxury} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Luxury%20Properties%20Page%20Video%20(1).mp4" hideFAQ />

      {/* Luxury Listings Section */}
      <section className="section-navy">
        <div className="glow-orb" />
        <div className="section-inner">
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Curated Luxury</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Premium Properties<br /><span style={{ color:"var(--gold-lt)" }}>for Discerning Buyers</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Each residence is hand-selected and discreetly presented.<br className="br-desktop" />No public listings, no speculative deals.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {luxuryListings.map((property,index)=>(
              <ScrollReveal key={property.id} id={property.id} delay={index * 80} style={{ display:"flex" }}>
                <Link
                  href={`#${property.id}`}
                  className="hover-lift listing-card-link"
                >
                  <div className="listing-img-wrap">
                    <Image
                      src={property.image}
                      alt={property.alt || property.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit:"cover", objectPosition: property.pos ? (property.pos.indexOf(" ") > -1 ? property.pos : "50% " + property.pos) : "50% 50%" }}
                    />
                    <div className="listing-img-shade" />
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span className="pill-status">
                        {property.status}
                      </span>
                    </div>
                  </div>
                  <div className="listing-body">
                    <div className="listing-tag-row">
                      <span className="pill-sm">
                        {property.type}
                      </span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:6,lineHeight:1.3 }}>{property.title}</h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--slate)",marginBottom:4 }}>{property.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--navy)",marginBottom:10,lineHeight:1.4 }}>{property.config} · {property.size}</p>
                    <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:10 }}>
                      {property.highlights.map(h=>(
                          <span key={h} className="highlight-chip">
                          {h}
                        </span>
                      ))}
                    </div>
                    <div style={{ flex:1 }} />
                    <ListingGallery images={[property.image]} title={property.title} />
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12,flexShrink:0,minHeight:73,height:73 }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(42,45,53,0.35)",marginBottom:1 }}>Price</p>
                        <p className="price-block">{property.price}</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:11,fontWeight:600,color:"var(--gold-ink)",margin:0 }}>&nbsp;</p>
                      </div>
                      <span className="inquire-btn">
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
                Not on the market? Our Luxury Desk has access to off-market listings not shown publicly.
              </p>
              <Link href="/contact#luxury" className="btn btn-primary">
                Speak to Our Luxury Desk →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ then CTA */}
      <FAQSection faqs={servicePages.luxury.faqs} title="Luxury Properties FAQ" />
      <CTASection />
    </>
  );
}
