import type { Metadata } from "next";
import Link from "next/link";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
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
    imageGradient:"linear-gradient(135deg,#0F1E38 0%,#B8922A 30%,#D4AA52 70%,#F0DBA8 100%)",
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
      <ServicePageTemplate content={servicePages.luxury} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Luxury%20Properties%20Page%20Video%20(1).mp4" />

      {/* Luxury Listings Section */}
      <section style={{ background:"var(--navy)",padding:"80px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Curated Luxury</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Premium Properties<span style={{ color:"var(--gold-lt)" }}> for Discerning Buyers</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Each residence is hand-selected and discreetly presented. No public listings, no speculative deals.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {luxuryListings.map((property,index)=>(
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
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(252,250,244,0.3)",marginBottom:2 }}>Configuration</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--light)" }}>{property.config}</p>
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
                      href="/contact?service=luxury"
                      className="btn btn-ghost"
                      style={{ alignSelf:"flex-start",marginTop:"auto" }}
                    >
                      Inquire Discreetly →
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:52 }}>
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
    </>
  );
}
