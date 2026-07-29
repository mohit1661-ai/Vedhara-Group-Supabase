import type { Metadata } from "next";
import Link from "next/link";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { servicePages } from "@/lib/data/servicePages";

export const metadata: Metadata = { title:"Sell Property in Delhi NCR | Get Fair Market Value | Vedhara Group", description:"Sell your property in Delhi, Gurugram, Noida, Faridabad or Ghaziabad at the right price. Strategic pricing, qualified buyer access, end-to-end sale management.", alternates:{ canonical:"https://www.vedharagroup.com/sell" } };

interface SellListing {
  id:string;
  title:string;
  location:string;
  askingPrice:string;
  config:string;
  size:string;
  type:"Residential"|"Commercial"|"Luxury"|"Plotted";
  status:"Available for Sale"|"Under Offer"|"Sold";
  highlights:string[];
  imageGradient:string;
}

const sellListings: SellListing[] = [
  {
    id:"ved-s01",
    title:"Sunset Villa",
    location:"Sector 23, Dwarka, Delhi",
    askingPrice:"₹ 3.95 Cr",
    config:"4 BHK Independent Floor",
    size:"2,600 sq.ft.",
    type:"Residential",
    status:"Available for Sale",
    highlights:["Dwarka Prime","Park Facing","3 Sidus Open","Vastu Compliant"],
    imageGradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#3a6a8f 100%)",
  },
  {
    id:"ved-s02",
    title:"Green Valley Apartment",
    location:"Sector 49, Gurugram",
    askingPrice:"₹ 2.35 Cr",
    config:"3 BHK",
    size:"1,580 sq.ft.",
    type:"Residential",
    status:"Available for Sale",
    highlights:["Golf Course Extn","Clubhouse","Covered Parking","High Floor"],
    imageGradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#5a7a9a 100%)",
  },
  {
    id:"ved-s03",
    title:"Lotus Business Center",
    location:"Sector 44, Gurugram",
    askingPrice:"₹ 6.80 Cr",
    config:"3,200 sq.ft. Office",
    size:"3,200 sq.ft.",
    type:"Commercial",
    status:"Available for Sale",
    highlights:["Commercial Zone","Leased Until Apr 27","High ROI","Corner Location"],
    imageGradient:"linear-gradient(135deg,#1a1a2e 0%,#D4A843 30%,#E8C970 70%,#F0DBA8 100%)",
  },
  {
    id:"ved-s04",
    title:"Royal Heritage Penthouse",
    location:"Golf Course Road, Gurugram",
    askingPrice:"₹ 8.75 Cr",
    config:"4 BHK Penthouse",
    size:"3,400 sq.ft.",
    type:"Luxury",
    status:"Available for Sale",
    highlights:["Golf Course View","Private Terrace","Smart Home","Jacuzzi"],
    imageGradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 50%,#D4A843 100%)",
  },
  {
    id:"ved-s05",
    title:"Serene Garden Plot",
    location:"Sector 150, Noida",
    askingPrice:"₹ 4.50 Cr",
    config:"450 sq.yds. Plot",
    size:"450 sq.yds.",
    type:"Plotted",
    status:"Available for Sale",
    highlights:["Sector 150","Corner Plot","All Approvals","Immediate Registration"],
    imageGradient:"linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 50%,#2a5a2a 100%)",
  },
  {
    id:"ved-s06",
    title:"Heritage Haveli",
    location:"Mehrauli, Delhi",
    askingPrice:"₹ 12.50 Cr",
    config:"5 BHK + Courtyard",
    size:"5,200 sq.ft.",
    type:"Luxury",
    status:"Under Offer",
    highlights:["South Delhi Prime","Heritage Architecture","Large Courtyard","Rare Offering"],
    imageGradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#6a3a2a 100%)",
  },
];

const sellFaqs = [
  { q:"How does Vedhara determine my property's value?", a:"We analyse recent comparable transactions in your locality, current demand trends, and the specific condition and positioning of your property, arriving at a price range that is realistic, not aspirational." },
  { q:"What if I'm not ready to sell yet but want an opinion?", a:"That's exactly the kind of conversation we welcome. Our Portfolio Health Check service is designed for owners who want an honest hold, sell, or rebalance assessment, with no obligation to act." },
  { q:"How long does it typically take to sell a property with Vedhara?", a:"Timelines vary by property type, location, and market conditions. On average, our listings receive qualified interest within 4–6 weeks of active marketing. We provide a transparent timeline estimate upfront." },
  { q:"Do I need to vacate my property before you start marketing it?", a:"No. We coordinate marketing and site visits around your schedule. For tenanted properties, we work with existing tenants to arrange convenient viewing windows." },
  { q:"What costs are involved in selling through Vedhara?", a:"Vedhara charges a success-fee structure — you pay only when your property is sold. The fee is a fixed percentage of the final sale price, disclosed upfront with no hidden charges." },
];

export default function SellPage() {
  return (
    <>
      <ServicePageTemplate content={servicePages.sell} videoSrc="/videos/Vedhara%20Group%20Delhi%20NCR%20Sell%20Page%20Video%20(1).mp4" hideFAQ />

      {/* Properties for Sale Section */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Listed for Sale</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Properties Currently<span style={{ color:"var(--gold-lt)" }}> on the Market</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Each listing comes with a Vedhara Market Analysis Report detailing pricing rationale and comparable sales.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {sellListings.map((property,index)=>(
              <ScrollReveal key={property.id} delay={index * 80}>
                <Link href="/contact?service=sell" className="hover-lift" style={{ display:"flex",flexDirection:"column",height:"100%",background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}>
                  {/* Image area */}
                  <div style={{ height:180,flexShrink:0,background:property.imageGradient,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
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

                  {/* Content */}
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-dk)",borderRadius:3 }}>
                        {property.type}
                      </span>
                    </div>
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
                      <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0 }}>{property.askingPrice}</p>
                      <span className="btn-ghost" style={{ color:"var(--gold)",fontSize:9,display:"inline-flex",alignItems:"center",gap:4 }}>
                        Inquire →
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:40 }}>
              <p className="body-md" style={{ color:"rgba(252,250,244,0.35)",marginBottom:20 }}>
                Want to list your property? Vedhara helps you price and position it for the right buyer.
              </p>
              <Link href="/contact?service=sell" className="btn btn-primary">
                List Your Property →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Separator */}
      <div style={{ background:"var(--navy)",display:"flex",justifyContent:"center",padding:"0 32px" }}>
        <div style={{ width:80,height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* FAQ */}
      <FAQSection faqs={sellFaqs} title="Selling Property in Delhi NCR, FAQ" />
    </>
  );
}
