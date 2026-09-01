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
import JsonLd from "@/components/seo/JsonLd";
import { listingsSchema } from "@/lib/seo/listings";
import { commercialListings } from "@/lib/data/pageListings";

export const metadata: Metadata = { title:"Commercial Property Advisory in Delhi NCR", description:"Independent commercial property advisory in Delhi NCR, Faridabad & Manesar: office space leasing, retail site selection, industrial sheds and acquisition.", alternates:{ canonical:"https://www.vedharagroup.com/commercial" } };


export default function CommercialPage() {
  return (
    <>
      <Breadcrumbs items={[{ name:"Home", href:"/" },{ name:"Commercial Real Estate", href:"/commercial" }]} />
      <JsonLd data={listingsSchema("/commercial", commercialListings.map((l) => ({
        id: l.id,
        name: l.title,
        description: l.highlights.join("; "),
        priceDisplay: l.price,
        locality: l.location,
        propertyType: l.type,
        size: l.size,
        status: l.status,
        image: l.image,
      })))} />
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
              <ScrollReveal key={property.id} id={property.id} delay={index * 80} style={{ display:"flex" }}>
                <Link
                  href="/contact#commercial"
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
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column",height:"100%" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-ink)",borderRadius:3 }}>
                        {property.type}
                      </span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:6,lineHeight:1.3 }}>{property.title}</h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{property.location}</p>
                      <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--navy)",marginBottom:10,lineHeight:1.4 }}>{property.size}</p>
                    <div style={{ display:"flex",flexWrap:"wrap",gap:4,marginBottom:10 }}>
                      {property.highlights.map(h=>(
                        <span key={h} style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:600,letterSpacing:"0.04em",padding:"3px 7px",background:"rgba(212,168,67,0.08)",color:"var(--gold-ink)",borderRadius:3 }}>
                          {h}
                        </span>
                      ))}
                    </div>
                    <div style={{ flex:1 }} />
                    {/* Small photo cards, click to open the full-size lightbox viewer. Uses the full photo set (scroller appears when > 4 photos). Bottom-anchored so the gallery + CTA row stay aligned across all cards. */}
                    <ListingGallery
                      images={property.images && property.images.length > 0
                        ? property.images
                        : property.gallery && property.gallery.length > 0
                          ? property.gallery
                          : [property.image]}
                      title={property.title}
                    />
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12,flexShrink:0,minHeight:73,height:73 }}>
                      <div>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"rgba(42,45,53,0.35)",marginBottom:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>Price</p>
                        <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{property.price}</p>
                        {/* Always reserve the note line so every card's CTA row has the same height → gallery + Inquire button stay aligned across cards. */}
                        <p style={{ fontFamily:"var(--t-body)",fontSize:10.5,fontWeight:600,color:"var(--gold-ink)",margin:"2px 0 0",lineHeight:1.2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{property.priceNote || "\u00A0"}</p>
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
              <Link href="/contact#commercial" className="btn btn-primary">
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
