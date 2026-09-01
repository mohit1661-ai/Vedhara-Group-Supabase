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
import { sellListings } from "@/lib/data/pageListings";

export const metadata: Metadata = { title:"Sell Property in Delhi NCR at the Right Price", description:"Sell your property in Delhi NCR with a data-backed price, qualified buyer access and end-to-end sale management across Gurugram, Noida and Faridabad.", alternates:{ canonical:"https://www.vedharagroup.com/sell" } };


const sellFaqs = [
  { q:"How does Vedhara determine my property's value?", a:"We analyse recent comparable transactions in your locality, current demand trends, and the specific condition and positioning of your property, arriving at a price range that is realistic, not aspirational." },
  { q:"What if I'm not ready to sell yet but want an opinion?", a:"That's exactly the kind of conversation we welcome. Our Portfolio Health Check service is designed for owners who want an honest hold, sell, or rebalance assessment, with no obligation to act." },
  { q:"How long does it typically take to sell a property with Vedhara?", a:"Timelines vary by property type, location, and market conditions. On average, our listings receive qualified interest within 4–6 weeks of active marketing. We provide a transparent timeline estimate upfront." },
  { q:"Do I need to vacate my property before you start marketing it?", a:"No. We coordinate marketing and site visits around your schedule. For tenanted properties, we work with existing tenants to arrange convenient viewing windows." },
  { q:"What costs are involved in selling through Vedhara?", a:"Vedhara charges a success-fee structure; you pay only when your property is sold. The fee is a fixed percentage of the final sale price, disclosed upfront with no hidden charges." },
];

export default function SellPage() {
  return (
    <>
      <Breadcrumbs items={[{ name:"Home", href:"/" },{ name:"Sell Property", href:"/sell" }]} />
      <JsonLd data={listingsSchema("/sell", sellListings.map((l) => ({
        id: l.id,
        name: l.title,
        description: l.highlights.join("; "),
        priceDisplay: l.askingPrice,
        locality: l.location,
        propertyType: l.type,
        size: `${l.config} · ${l.size}`,
        status: l.status,
        image: l.image,
      })))} />
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
              <ScrollReveal key={property.id} id={property.id} delay={index * 80} style={{ display:"flex" }}>
                <Link href="/contact#sell" className="hover-lift" style={{ display:"flex",flexDirection:"column",flex:1,background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}>
                  {/* Image area */}
                  <div style={{ height:180,flexShrink:0,position:"relative",overflow:"hidden" }}>
                    <Image
                      src={property.image}
                      alt={property.alt || property.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit:"cover", objectPosition: property.pos ? (property.pos.indexOf(" ") > -1 ? property.pos : "50% " + property.pos) : "50% 50%" }}
                    />
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(9,15,29,0.05) 0%,rgba(9,15,29,0.45) 100%)",pointerEvents:"none" }} />
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(9,15,29,0.55)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(4px)" }}>
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column",height:"100%" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-ink)",borderRadius:3 }}>
                        {property.type}
                      </span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:6,lineHeight:1.3 }}>{property.title}</h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--slate)",marginBottom:4 }}>{property.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--navy)",marginBottom:10,lineHeight:1.4 }}>{property.config} · {property.size}</p>
                    <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:10 }}>
                      {property.highlights.map(h=>(
                        <span key={h} style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:600,letterSpacing:"0.04em",padding:"3px 7px",background:"rgba(212,168,67,0.08)",color:"var(--gold-ink)",borderRadius:3 }}>
                          {h}
                        </span>
                      ))}
                    </div>
                    <div style={{ flex:1 }} />
                    <ListingGallery images={[property.image]} title={property.title} />
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12,flexShrink:0,minHeight:73,height:73 }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(42,45,53,0.35)",marginBottom:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>Price</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{property.askingPrice}</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:10.5,fontWeight:600,color:"var(--gold-ink)",margin:"2px 0 0",lineHeight:1.2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{property.status === "Under Offer" ? "Under Offer" : property.status === "Sold" ? "Sold" : "\u00A0"}</p>
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

          {/* Bottom CTA */}
          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:40 }}>
              <p className="body-md" style={{ color:"rgba(252,250,244,0.35)",marginBottom:20 }}>
                Want to list your property? Vedhara helps you price and position it for the right buyer. <Link href="/sell/valuation" style={{ color:"var(--gold-lt)" }}>Review our valuation tool.</Link>
              </p>
              <Link href="/contact#sell" className="btn btn-primary">
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

      <FAQSection faqs={sellFaqs} title="Selling Property in Delhi NCR, FAQ" />
      <CTASection />
    </>
  );
}
