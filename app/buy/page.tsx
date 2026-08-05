import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Buy Verified Property in Delhi NCR", description:"Buy verified residential and commercial property in Delhi NCR, Faridabad, Manesar, Chandigarh and across North India with RERA-verified listings.", alternates:{ canonical:"https://www.vedharagroup.com/buy" } };

interface PropertyListing {
  id:string;
  title:string;
  location:string;
  price:string;
  config:string;
  size:string;
  type:"Residential"|"Commercial"|"Luxury"|"Plotted";
  status:"Ready to Move"|"Possession Oct 2026"|"Possession Dec 2026"|"Under Construction";
  highlights:string[];
  image:string;
  pos?:string;
  alt?:string;
}

const featuredListings: PropertyListing[] = [
  {
    id:"ved-001",
    title:"The Cullinan Heights",
    location:"Sector 150, Noida",
    price:"₹ 4.85 Cr",
    config:"4 BHK + Study",
    size:"2,450 sq.ft.",
    type:"Residential",
    status:"Ready to Move",
    highlights:["RERA Registered","Golf Course View","Clubhouse Access","Vastu Compliant"],
    image:"https://images.pexels.com/photos/11729105/pexels-photo-11729105.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"The Cullinan Heights luxury high-rise illuminated at dusk in Sector 150, Noida",
  },
  {
    id:"ved-002",
    title:"Amaryllis Residences",
    location:"Golf Course Road, Gurugram",
    price:"₹ 6.20 Cr",
    config:"3 BHK + Servant",
    size:"2,150 sq.ft.",
    type:"Luxury",
    status:"Possession Oct 2026",
    highlights:["RERA Registered","Corner Unit","Private Terrace","Smart Home"],
    image:"https://images.pexels.com/photos/31684126/pexels-photo-31684126.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"Amaryllis Residences luxury apartments on Golf Course Road, Gurugram",
  },
  {
    id:"ved-003",
    title:"Platinum Towers",
    location:"Dwarka Expressway, Gurugram",
    price:"₹ 2.95 Cr",
    config:"3 BHK",
    size:"1,650 sq.ft.",
    type:"Residential",
    status:"Possession Dec 2026",
    highlights:["RERA Registered","Metro Proximity","85% Open Area","Premium Finishes"],
    image:"https://images.pexels.com/photos/7672058/pexels-photo-7672058.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"Platinum Towers residential high-rise on Dwarka Expressway, Gurugram",
  },
  {
    id:"ved-004",
    title:"One Golden Mile",
    location:"Sector 62, Gurugram",
    price:"₹ 8.50 Cr",
    config:"4,500 sq.ft. Office",
    size:"4,500 sq.ft.",
    type:"Commercial",
    status:"Ready to Move",
    highlights:["RERA Registered","LEED Platinum","24hr Security","100+ Car Parking"],
    image:"https://images.pexels.com/photos/5859963/pexels-photo-5859963.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"One Golden Mile commercial office building in Sector 62, Gurugram",
  },
  {
    id:"ved-005",
    title:"Veda Forest Villas",
    location:"Sector 150, Noida",
    price:"₹ 7.50 Cr",
    config:"5 BHK Independent Floor",
    size:"3,800 sq.ft.",
    type:"Luxury",
    status:"Ready to Move",
    highlights:["RERA Registered","Park Facing","Private Pool","Modular Kitchen"],
    image:"https://images.pexels.com/photos/20581232/pexels-photo-20581232.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Veda Forest Villas luxury villas in Sector 150, Noida",
  },
  {
    id:"ved-006",
    title:"Magnolia Court",
    location:"Greater Kailash II, Delhi",
    price:"₹ 3.40 Cr",
    config:"3 BHK",
    size:"1,550 sq.ft.",
    type:"Residential",
    status:"Under Construction",
    highlights:["RERA Registered","South Delhi","Premium Location","High Appreciation"],
    image:"https://images.pexels.com/photos/35114454/pexels-photo-35114454.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"80%",
    alt:"Magnolia Court premium apartments in Greater Kailash II, Delhi",
  },
];

const buyFaqs = [
  { q:"Do I pay Vedhara a fee to buy a property?", a:"In most cases, no direct fee is charged to buyers; Vedhara is compensated through standard brokerage commission paid by the seller or developer side, disclosed on the specific listing." },
  { q:"Can I see properties that aren't from partner developers?", a:"Our listed inventory comes from verified partner developers. If you've already found a property elsewhere and want an independent opinion on it, our advisory team can offer a Second Opinion review as a separate engagement." },
  { q:"How does the Verification Framework protect buyers?", a:"Every property we list passes five documented checks: RERA registration validity, builder delivery history, project-level approvals, price-to-locality fairness, and title document availability. Results are published on every listing page." },
  { q:"What if I need help after purchasing?", a:"Our relationship does not end at registration. Post-purchase support includes handover coordination, utility connections, property tax guidance, and referrals for interior design and moving services." },
  { q:"Can Vedhara help me compare properties across different developers?", a:"Yes. Our advisors prepare an objective comparison across shortlisted properties, covering pricing, floor plans, amenities, possession timelines, and total cost of ownership, to help you make an informed decision." },
];

export default function BuyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name:"Home", href:"/" },{ name:"Buy Property", href:"/buy" }]} />
      <ServicePageTemplate content={servicePages.buy} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Buy%20Page%20Video.mp4" hideFAQ />

      {/* Featured Listings Section */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Featured Listings</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Verified Properties<span style={{ color:"var(--gold-lt)" }}> in Delhi NCR</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Every listing is RERA-verified and independently assessed through the Vedhara Verification Framework.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {featuredListings.map((property,index)=>(
              <ScrollReveal key={property.id} delay={index * 80}>
                <Link href="/contact?service=buy" className="hover-lift" style={{ display:"flex",flexDirection:"column",height:"100%",background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}>
                  {/* Image area */}
                  <div style={{ height:180,flexShrink:0,position:"relative",overflow:"hidden" }}>
                    <Image
                      src={property.image}
                      alt={property.alt || property.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit:"cover", objectPosition: property.pos ? (property.pos.indexOf(" ") > -1 ? property.pos : "50% " + property.pos) : "50% 50%" }}
                    />
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(9,15,29,0.05) 0%,rgba(9,15,29,0.45) 100%)" }} />
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(9,15,29,0.55)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(4px)" }}>
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-dk)",borderRadius:3 }}>
                        {property.type}
                      </span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:6,lineHeight:1.3 }}>{property.title}</h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{property.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--navy)",marginBottom:10,lineHeight:1.4 }}>{property.config} · {property.size}</p>
                    <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:14,flex:1,alignContent:"flex-start" }}>
                      {property.highlights.map(h=>(
                        <span key={h} style={{ fontFamily:"var(--t-head)",fontSize:7.5,fontWeight:600,letterSpacing:"0.04em",padding:"3px 8px",background:"rgba(212,168,67,0.08)",color:"var(--gold-dk)",borderRadius:3 }}>
                          {h}
                        </span>
                      ))}
                    </div>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12,flexShrink:0 }}>
                      <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0 }}>{property.price}</p>
                      <span className="btn-ghost" style={{ color:"var(--gold)",fontSize:9,display:"inline-flex",alignItems:"center",gap:4 }}>
                        Inquire →
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:40 }}>
              <p className="body-md" style={{ color:"rgba(252,250,244,0.35)",marginBottom:20 }}>
                Don&apos;t see what you&apos;re looking for? Our full inventory spans 500+ verified listings across Delhi NCR, Faridabad, Manesar, Chandigarh and North India.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Talk to an Advisor →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Separator */}
      <div style={{ background:"var(--navy)",display:"flex",justifyContent:"center",padding:"0 32px" }}>
        <div style={{ width:80,height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      <FAQSection faqs={buyFaqs} title="Buying Property in Delhi NCR, FAQ" />
      <CTASection />
    </>
  );
}
