import type { Metadata } from "next";
import Link from "next/link";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Luxury Properties in Delhi NCR | Premium Residential Advisory | Vedhara Group", description:"Curated luxury homes and premium residences in South Delhi, Gurugram Golf Course Road, and Noida Sector 150. Discreet advisory from Vedhara Group.", alternates:{ canonical:"https://www.vedharagroup.com/luxury" } };

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
  imageGradient:string;
}

const luxuryListings: LuxuryListing[] = [
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
    imageGradient:"linear-gradient(135deg,#0F1E38 0%,#D4A843 30%,#E8C970 70%,#F0DBA8 100%)",
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
    imageGradient:"linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 50%,#2a5a2a 100%)",
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
    imageGradient:"linear-gradient(135deg,#1a0a2a 0%,#3a1a4a 50%,#5a2a6a 100%)",
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
    imageGradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#4a7a9f 100%)",
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
    imageGradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#6a4a2a 100%)",
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
    imageGradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 50%,#3a6a8a 100%)",
  },
];

export default function LuxuryPage() {
  return (
    <>
      <ServicePageTemplate content={servicePages.luxury} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Luxury%20Properties%20Page%20Video%20(1).mp4" hideFAQ />

      {/* Luxury Listings Section */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Curated Luxury</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Premium Properties<br /><span style={{ color:"var(--gold-lt)" }}>for Discerning Buyers</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Each residence is hand-selected and discreetly presented. No public listings, no speculative deals.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {luxuryListings.map((property,index)=>(
              <ScrollReveal key={property.id} delay={index * 80} style={{ display:"flex" }}>
                <Link
                  href="/contact?service=luxury"
                  className="hover-lift"
                  style={{ display:"flex",flexDirection:"column",flex:1,background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}
                >
                  <div style={{ height:180,background:property.imageGradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0 }}>
                    <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 30% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)" }} />
                    <div style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:18,color:"rgba(255,255,255,0.85)",textAlign:"center",padding:"0 20px",position:"relative",zIndex:1 }}>
                      {property.title}
                    </div>
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.9)",border:"1px solid rgba(255,255,255,0.25)" }}>
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
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{property.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--navy)",marginBottom:10,lineHeight:1.4 }}>{property.config} · {property.size}</p>
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
                Not on the market? Our Luxury Desk has access to off-market listings not shown publicly.
              </p>
              <Link href="/contact?service=luxury" className="btn btn-primary">
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
