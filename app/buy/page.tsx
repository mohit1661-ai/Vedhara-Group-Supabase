import type { Metadata } from "next";
import Link from "next/link";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Buy Verified Property in Delhi NCR | Independent Advisory | Vedhara Group", description:"Buy verified residential and commercial property in Delhi, Gurugram, Noida, Faridabad and Ghaziabad with Vedhara Group, independent advisory, RERA-verified listings, transparent pricing.", alternates:{ canonical:"https://www.vedharagroup.com/buy" } };

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
  imageGradient:string;
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
    imageGradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#2a5f8f 100%)",
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
    imageGradient:"linear-gradient(135deg,#16243F 0%,#2a3f6f 50%,#B8922A 100%)",
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
    imageGradient:"linear-gradient(135deg,#090F1D 0%,#1a2a4a 50%,#4a6a8a 100%)",
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
    imageGradient:"linear-gradient(135deg,#1a1a2e 0%,#B8922A 30%,#D4AA52 70%,#F0DBA8 100%)",
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
    imageGradient:"linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 50%,#2a5a2a 100%)",
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
    imageGradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#6a3a2a 100%)",
  },
];

export default function BuyPage() {
  return (
    <>
      <ServicePageTemplate content={servicePages.buy} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Buy%20Page%20Video.mp4" />

      {/* Featured Listings Section */}
      <section style={{ background:"var(--navy)",padding:"104px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Featured Listings</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Verified Properties<span style={{ color:"var(--gold-lt)" }}> in Delhi NCR</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:540,margin:"0 auto" }}>
                Every listing is RERA-verified and independently assessed through the Vedhara Verification Framework.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {featuredListings.map((property,index)=>(
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
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"5px 12px",borderRadius:20,background:property.status==="Ready to Move"?"rgba(184,146,42,0.15)":"rgba(255,255,255,0.06)",color:property.status==="Ready to Move"?"var(--gold-lt)":"rgba(252,250,244,0.5)",border:"1px solid "+ (property.status==="Ready to Move"?"rgba(184,146,42,0.3)":"rgba(255,255,255,0.08)") }}>
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
                      href="/contact?service=buy"
                      className="btn btn-ghost"
                      style={{ alignSelf:"flex-start",marginTop:"auto" }}
                    >
                      Inquire About This Property →
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
                Don&apos;t see what you&apos;re looking for? Our full inventory spans 200+ verified listings across Delhi NCR.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Talk to an Advisor →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
