import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ListingGallery from "@/components/ui/ListingGallery";
import JsonLd from "@/components/seo/JsonLd";
import { listingsSchema } from "@/lib/seo/listings";
import { tricityListings } from "@/lib/data/pageListings";

export const metadata: Metadata = {
  title:"Chandigarh Tricity Real Estate",
  description:"Independent property advisory for Chandigarh Tricity: Chandigarh, Mohali, Panchkula, Zirakpur & Kharar. GMADA, HRERA and Punjab RERA due diligence.",
  alternates:{ canonical:"https://www.vedharagroup.com/tricity" },
};

const markets = [
  {
    name:"Chandigarh", tag:"Union Territory",
    desc:"India's first planned city and the Tricity's anchor market. Property is governed by the Chandigarh (Sale of Sites and Buildings) Rules, 1960, with the Chandigarh Estate Office overseeing allotments, NOCs, and transfer permissions. Most residential is freehold; a limited set of sectors retains leasehold terms.",
    points:["Chandigarh Estate Office rules and NOC requirements","Freehold majority with leasehold pockets in specific sectors","Capital project zones with strict floor-area and resale rules"],
  },
  {
    name:"Mohali (SAS Nagar)", tag:"Punjab · GMADA",
    desc:"Chandigarh's fastest-growing employment and IT corridor. Newer sectors are planned by GMADA (Greater Mohali Area Development Authority) and fall under Punjab RERA oversight. Strong rental demand from IT parks and easy highway access make it the most active micro-market.",
    points:["GMADA-approved sectors with defined development plans","Punjab RERA (PunRERA) registered projects","IT Parks, Airport Road and Kharar connectivity driving demand"],
  },
  {
    name:"Panchkula", tag:"Haryana",
    desc:"The green, planned Haryana neighbour with strict height and density controls. Many older sectors were 99-year leasehold and have been converted to freehold under Haryana's conversion policy. Transactions fall under HRERA (Haryana) and Haryana stamp duty.",
    points:["HRERA registration for new projects","Legacy HUDA/HSVP sectors, many now freehold-converted","Haryana circle rates and stamp duty apply"],
  },
  {
    name:"Zirakpur & Kharar", tag:"Punjab · GMADA",
    desc:"High-density, affordable corridors straddling the Chandigarh periphery. Zirakpur is a retail and connectivity hub on the Ambala highway; Kharar is an emerging residential belt on the Mohali side. Higher transaction volume at lower ticket sizes, with more developer inventory to verify.",
    points:["Entry-friendly price points with strong rental absorption","GMADA approvals and Punjab RERA verification essential","Beware of unapproved colonies, title checks are critical"],
  },
  {
    name:"New Chandigarh", tag:"Punjab · GMADA",
    desc:"The planned extension of Chandigarh across the Mohali side. Plots and units here are typically GMADA-approved with defined land-use. Pricing is discovery-stage, which rewards careful selection and penalises hasty buying in unapproved pockets.",
    points:["Planned extension with premium positioning","GMADA sector allotments and resale rules","Medium-term appreciation play, not instant liquidity"],
  },
];

const jurisdictions = [
  {
    title:"Chandigarh Estate Office", applies:"Chandigarh UT", mono:"EO",
    image:"https://images.pexels.com/photos/34968154/pexels-photo-34968154.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"Chandigarh Estate Office for property allotments and NOCs in Chandigarh UT",
    body:"No separate RERA authority is yet functional in Chandigarh UT. Allotments, resale permissions, and NOCs are handled by the Chandigarh Administration's Estate Office under the 1960 Rules. Title checks focus on the registered chain, allotment letters, and Estate Office approvals.",
  },
  {
    title:"GMADA", applies:"Mohali · Zirakpur · Kharar · New Chandigarh", mono:"GM",
    image:"https://images.pexels.com/photos/33848325/pexels-photo-33848325.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"79%",
    alt:"GMADA office for sector approvals in Mohali, Zirakpur and Kharar",
    body:"Punjab projects are planned and approved by GMADA. We verify the sector's sanctioned layout, the project's approval status, and whether the unit sits inside an approved or unauthorised colony before any recommendation.",
  },
  {
    title:"Punjab RERA (PunRERA) & HRERA", applies:"Punjab · Haryana", mono:"RA",
    image:"https://images.pexels.com/photos/33217250/pexels-photo-33217250.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50% 70%",
    alt:"Punjab RERA and HRERA registration office for real estate projects in Punjab and Haryana",
    body:"Mohali, Zirakpur, Kharar and New Chandigarh fall under Punjab RERA (PSIARA/PunRERA); Panchkula falls under HRERA (Haryana). RERA registration, quarterly progress filings, and complaint history are checked on the correct state portal for each project.",
  },
];

const freeholdLeasehold = [
  { t:"Freehold", d:"Full ownership of land and structure with no time limit. Transferable by registered sale deed without the authority's permission in most cases. Generally preferred and carries a price premium over comparable leasehold." },
  { t:"Leasehold", d:"Ownership of the structure with the land on a long lease (typically 99 years) from the authority. Transfer requires the authority's permission or NOC, and conversion to freehold is possible in many sectors at prescribed charges." },
  { t:"The Tricity Nuance", d:"Chandigarh is majority freehold with leasehold pockets; Panchkula was historically leasehold and many sectors have converted to freehold; Mohali and GMADA sectors are predominantly freehold. Always confirm the tenure on the title, not on the brochure." },
];


const faqs = [
  { q:"Is it a good time to buy property in Chandigarh Tricity in 2026?", a:"Demand is concentrated in Mohali's IT corridor, New Chandigarh, and Panchkula's converted-freehold sectors, while Zirakpur offers affordable entry points with strong rental absorption. Tricity prices are more stable than Delhi NCR's speculative corridors, which suits end-users and long-horizon investors. We benchmark every shortlist against recent registered transactions in the same sector before advising, rather than relying on asking prices." },
  { q:"Which is better to buy, Mohali, Panchkula, or Chandigarh?", a:"There is no single answer, each serves a different buyer. Chandigarh offers prestige and scarcity but the highest entry prices and limited inventory. Panchkula is green and quiet with many freehold-converted sectors, better for families and retirees. Mohali has the strongest IT-led rental and appreciation story and the most active market. Your choice depends on budget, whether you need rental income, and how soon you need possession, we model the trade-offs side by side." },
  { q:"Is Panchkula property freehold or leasehold?", a:"Historically, most Panchkula sectors were 99-year leasehold. Haryana has since allowed conversion to freehold at prescribed rates, and the majority of older sectors (Sectors 2–12 and others) have been converted or are convertible. Newer HSVP projects vary. We verify the actual tenure from the title chain and conversion records, not from the developer's marketing, before recommending anything." },
  { q:"What is GMADA and how does it affect property in Mohali?", a:"GMADA, the Greater Mohali Area Development Authority, is Punjab's planning and development authority for the Mohali region, including Zirakpur, Kharar, and New Chandigarh. It sanctions layouts, allots plots, and sets development charges. Buying inside a GMADA-approved sector gives you legal protection; buying in an unapproved colony outside GMADA's sanctioned plans carries significant title and approval risk, which is why our first check is always the approval status." },
  { q:"Does RERA apply to property in Chandigarh city?", a:"Chandigarh is a Union Territory and, as of now, does not have a fully functional RERA authority of its own. Property in Chandigarh city is regulated by the Chandigarh Administration under the Chandigarh (Sale of Sites and Buildings) Rules, 1960, with the Estate Office handling allotments and NOCs. Buyers should therefore rely on Estate Office checks, the registered title chain, and legal review, which is exactly what our verification process covers for Chandigarh UT." },
  { q:"Can an NRI buy property in Chandigarh Tricity?", a:"Yes. NRIs and Persons of Indian Origin can freely purchase residential and commercial property in Chandigarh, Mohali, Panchkula, and the rest of Tricity, without RBI approval. Agricultural land and farmhouses are not permitted without special RBI permission. Funds must flow through NRE/NRO banking channels, and keeping transfer receipts makes future sale proceeds fully repatriable. Our NRI desk manages the entire remote purchase, including GMADA/HRERA checks and documentation." },
  { q:"What are the stamp duty and registration charges in Tricity?", a:"Charges differ by state and by buyer. Haryana (Panchkula) levies stamp duty in the 7–8% band with a lower rate for women buyers; Punjab (Mohali, Zirakpur, Kharar, New Chandigarh) has its own stamp duty and registration structure, and Chandigarh UT follows the Indian Stamp Act with its own rates. Rates also shift with circle rates and state budgets. We compute the exact all-in cost for your specific property and buyer profile at the time of your transaction, itemised in writing." },
  { q:"Is New Chandigarh a good investment?", a:"New Chandigarh is a planned GMADA extension with a premium positioning and currently discovery-stage pricing. It suits buyers with a 5–10 year horizon who want the Chandigarh address at a lower entry point. Liquidity is still maturing, so we recommend it primarily as a medium-term appreciation play for buyers who do not need quick exit, and we always verify that the plot or unit is inside a GMADA-sanctioned sector before advising." },
  { q:"What is the difference between the Chandigarh and Mohali property markets?", a:"Chandigarh is a low-volume, high-ticket market with scarce freehold inventory, governed by the Estate Office with no functional RERA, making due diligence more manual. Mohali is a high-volume, more affordable market with GMADA planning, Punjab RERA registration, and stronger IT-led rental demand. In short, Chandigarh trades on scarcity and prestige; Mohali trades on growth and rental yield." },
  { q:"How do I verify the title of a property in Tricity?", a:"The essentials are the same as anywhere, but the authority matters. For Chandigarh, check the registered sale chain, the allotment letter, and Estate Office NOC/permission where applicable. For Mohali, Zirakpur, Kharar and New Chandigarh, confirm GMADA approval and Punjab RERA status. For Panchkula, confirm HSVP/HRERA status and whether the sector is freehold or converted. We run these checks directly on the respective portals and disclose anything adverse we find." },
  { q:"Are returns in Zirakpur or Kharar better than central Chandigarh?", a:"Zirakpur and Kharar offer lower entry prices and strong rental absorption, which can produce attractive rental yields, but their capital appreciation is typically steadier and more dependent on infrastructure. Central Chandigarh offers lower yield but greater price stability and scarcity value. The better choice depends on whether you prioritise rental income or capital preservation, which is exactly the analysis we run before recommending." },
  { q:"What does Vedhara Group actually do for clients in Tricity?", a:"We act as an independent advisor, not a developer. We shortlist verified options across Chandigarh, Mohali, Panchkula, Zirakpur, Kharar and New Chandigarh based on your budget and goals, run our verification framework on each (approvals, RERA where applicable, title, price fairness), negotiate on your behalf, and manage the paperwork. For NRIs we do this fully remotely with video consultations and e-signatures. We charge a disclosed advisory or brokerage fee, never a hidden margin." },
];

const serviceSchema = {
  "@context":"https://schema.org",
  "@type":"Service",
  name:"Real Estate Advisory in Chandigarh Tricity",
  serviceType:"Property Advisory and Brokerage",
  provider:{ "@id":"https://www.vedharagroup.com/#organization" },
  areaServed:[{ "@type":"City", name:"Chandigarh" },{ "@type":"City", name:"Mohali" },{ "@type":"City", name:"Panchkula" },{ "@type":"City", name:"Zirakpur" },{ "@type":"City", name:"Kharar" },{ "@type":"City", name:"New Chandigarh" }],
  description:"Independent real estate advisory across Chandigarh Tricity: verified buying, selling, renting and investing in Chandigarh, Mohali, Panchkula, Zirakpur and Kharar with GMADA, HRERA and Punjab RERA due diligence.",
  offers:{ "@type":"Offer", priceSpecification:{ "@type":"PriceSpecification", priceCurrency:"INR" } },
};

export default function TricityPage() {
  return (
    <>
      <Breadcrumbs items={[{ name:"Home", href:"/" },{ name:"Tricity Real Estate", href:"/tricity" }]} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={listingsSchema("/tricity", tricityListings.map((l) => ({
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

      {/* Hero */}
      <VideoHeroSection
        videoSrc="/videos/Chandigarh%20Tricity%20Hero%20Desktop.mp4"
        videoSrcMobile="/videos/Chandigarh%20Tricity%20Hero%20Mobile.mp4"
      >
        <span className="v-line" style={{ margin:"0 auto 16px" }} />
        <p className="eyebrow" style={{ marginBottom:18 }}>Chandigarh Tricity</p>
        <h1 style={{ fontFamily:"var(--t-display)", fontStyle:"italic", fontWeight:300, fontSize:"clamp(32px,5vw,50px)", color:"var(--light)", lineHeight:1.1, marginBottom:26 }}>
          Real Estate in Chandigarh Tricity.<br />
          <span style={{ color:"var(--gold-lt)" }}>Verified, Whatever the Jurisdiction.</span>
        </h1>
        <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)", maxWidth:600, margin:"0 auto 30px" }}>
          Three states, three rulebooks, one market. From the Chandigarh Estate Office to GMADA and HRERA, we make Tricity property safe to buy, sell and invest in, no matter which side of the border it sits.
        </p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/contact#enquiry-form" className="btn btn-primary">Book a Free Consultation</Link>
          <a href="https://wa.me/919810647063?text=Hello%20Vedhara%20Group%2C%20I%20need%20advice%20on%20Chandigarh%20Tricity%20property" target="_blank" rel="noopener noreferrer" className="btn btn-outline">WhatsApp Us</a>
        </div>
      </VideoHeroSection>

      {/* Intro */}
      <section style={{ background:"var(--cream)", padding:"72px 32px" }}>
        <div style={{ maxWidth:840, margin:"0 auto", textAlign:"center" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ marginBottom:14 }}>Why Tricity</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)", lineHeight:1.1, marginBottom:20 }}>
              A Different Market.<br />
              <em style={{ fontFamily:"var(--t-display)", fontStyle:"italic", fontWeight:300, color:"var(--gold)" }}>A Different Kind of Due Diligence.</em>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)" }}>
              Chandigarh Tricity sits across three jurisdictions, Chandigarh UT, Punjab, and Haryana, each with its own authority, stamp duty, and RERA situation. A title that is clean in Mohali can be unverifiable in Chandigarh. Our job is to make that complexity your advantage: verified approvals, honest tenure, and pricing benchmarked to real registered transactions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Tricity Properties */}
      <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"20%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Featured Listings</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                Verified Properties<span style={{ color:"var(--gold-lt)" }}> in Tricity</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Every listing is RERA/HRERA-verified and independently assessed through the Vedhara Verification Framework.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {tricityListings.map((property,index)=>(
              <ScrollReveal key={property.id} id={property.id} delay={index * 80} style={{ display:"flex" }}>
                <Link href="/contact#tricity" className="hover-lift" style={{ display:"flex",flexDirection:"column",flex:1,background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}>
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
                        <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{property.price}</p>
                        <p style={{ fontFamily:"var(--t-body)",fontSize:10.5,fontWeight:600,color:"var(--gold-ink)",margin:"2px 0 0",lineHeight:1.2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{"\u00A0"}</p>
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
            <div style={{ textAlign:"center",marginTop:40 }}>
              <p className="body-md" style={{ color:"rgba(252,250,244,0.35)",marginBottom:20 }}>
                Don&apos;t see what you&apos;re looking for? Our full inventory spans Chandigarh, Mohali, Panchkula, Zirakpur, Kharar and New Chandigarh.
              </p>
              <Link href="/contact#enquiry-form" className="btn btn-primary">
                Talk to an Advisor →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Micro-markets */}
      <section style={{ background:"var(--light)", padding:"72px 32px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>The Micro-Markets</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)", lineHeight:1.1 }}>
                Five Markets, One <em style={{ fontFamily:"var(--t-display)", fontStyle:"italic", fontWeight:300, color:"var(--gold)" }}>Standard of Care</em>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, minmax(0,1fr))", gap:24 }} className="grid-3">
            {markets.slice(0, 3).map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 60}>
                <div className="svc-card mm-card" style={{ display:"flex", flexDirection:"column", padding:"30px 26px 24px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                    <span className="mm-tag">{m.tag}</span>
                    <div className="gold-accent" style={{ margin:0, flex:1 }} />
                  </div>
                  <h3 className="svc-card-title" style={{ fontSize:18, marginBottom:10 }}>{m.name}</h3>
                  <p className="svc-card-desc" style={{ marginBottom:16 }}>{m.desc}</p>
                  <div style={{ marginTop:"auto", paddingTop:14, borderTop:"1px solid rgba(212,168,67,0.22)" }}>
                    <ul style={{ margin:0, padding:0, listStyle:"none" }}>
                      {m.points.map(p => (
                        <li key={p} style={{ display:"flex", gap:9, marginBottom:7, alignItems:"flex-start" }}>
                          <span style={{ color:"var(--gold)", flexShrink:0, fontSize:10, lineHeight:1.6 }}>◆</span>
                          <span className="svc-card-desc" style={{ fontSize:11.5, lineHeight:1.55, margin:0 }}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          {/* Remaining two markets centred so the last row has no empty cell */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2, minmax(0,1fr))", gap:24, marginTop:24 }} className="grid-2 journey-center-row">
            {markets.slice(3).map((m, i) => (
              <ScrollReveal key={m.name} delay={(i + 3) * 60}>
                <div className="svc-card mm-card" style={{ display:"flex", flexDirection:"column", padding:"30px 26px 24px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                    <span className="mm-tag">{m.tag}</span>
                    <div className="gold-accent" style={{ margin:0, flex:1 }} />
                  </div>
                  <h3 className="svc-card-title" style={{ fontSize:18, marginBottom:10 }}>{m.name}</h3>
                  <p className="svc-card-desc" style={{ marginBottom:16 }}>{m.desc}</p>
                  <div style={{ marginTop:"auto", paddingTop:14, borderTop:"1px solid rgba(212,168,67,0.22)" }}>
                    <ul style={{ margin:0, padding:0, listStyle:"none" }}>
                      {m.points.map(p => (
                        <li key={p} style={{ display:"flex", gap:9, marginBottom:7, alignItems:"flex-start" }}>
                          <span style={{ color:"var(--gold)", flexShrink:0, fontSize:10, lineHeight:1.6 }}>◆</span>
                          <span className="svc-card-desc" style={{ fontSize:11.5, lineHeight:1.55, margin:0 }}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Jurisdiction */}
      <section style={{ background:"var(--navy)", padding:"72px 32px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 60% 40% at 50% 100%,rgba(212,168,67,0.05) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)", marginBottom:14 }}>Jurisdiction Guide</p>
              <h2 className="heading-xl" style={{ color:"var(--light)", lineHeight:1.1 }}>
                Who Approves, Who Registers,<br />
                <span style={{ color:"var(--gold-lt)" }}>and Who Can You Trust</span>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, minmax(0,1fr))", gap:24 }} className="grid-3">
            {jurisdictions.map((j, i) => (
              <ScrollReveal key={j.title} delay={i * 60}>
                <div className="team-card hover-lift" style={{ display:"block", background:"var(--cream)", border:"1px solid rgba(212,168,67,0.15)", borderRadius:16, overflow:"hidden", textDecoration:"none", height:"100%" }}>
                  {/* Image banner with authority monogram */}
                  <div style={{ height:170, position:"relative", overflow:"hidden" }}>
                    <Image src={j.image} alt={j.alt || j.title} fill sizes="(max-width: 1024px) 50vw, 33vw" style={{ objectFit:"cover", objectPosition: j.pos ? (j.pos.indexOf(" ") > -1 ? j.pos : "50% " + j.pos) : "50% 50%" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(9,15,29,0.10) 0%,rgba(9,15,29,0.55) 100%)" }} />
                    <div style={{ position:"absolute", bottom:14, left:14, width:52, height:52, borderRadius:10, background:"rgba(15,30,56,0.65)", border:"2px solid rgba(212,168,67,0.45)", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)", zIndex:1 }}>
                      <span style={{ fontFamily:"var(--t-head)", fontSize:18, fontWeight:700, color:"var(--gold-lt)", letterSpacing:"0.05em" }}>{j.mono}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div style={{ padding:20, display:"flex", flexDirection:"column", height:"calc(100% - 170px)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                      <span style={{ fontFamily:"var(--t-head)", fontSize:8.5, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 8px", background:"rgba(212,168,67,0.12)", color:"var(--gold-ink)", borderRadius:3 }}>{j.applies}</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)", fontSize:16, fontWeight:700, color:"var(--navy)", marginBottom:6, marginTop:4 }}>{j.title}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)", lineHeight:1.7, fontSize:12, margin:"0 0 12px", flex:1 }}>{j.body}</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(212,168,67,0.2)", paddingTop:12 }}>
                      <span style={{ fontFamily:"var(--t-head)", fontSize:9.5, fontWeight:700, color:"var(--gold-ink)", textTransform:"uppercase", letterSpacing:"0.06em" }}>Verified Authority</span>
                      <Link href="/verification-center" style={{ fontFamily:"var(--t-head)", fontSize:9, fontWeight:700, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.06em", display:"inline-flex", alignItems:"center", gap:4, textDecoration:"none" }}>Check Process →</Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Freehold vs leasehold */}
      <section style={{ background:"var(--cream)", padding:"72px 32px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ marginBottom:14 }}>Tenure Explained</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)", lineHeight:1.1 }}>
                Freehold vs Leasehold:<br />
                <em style={{ fontFamily:"var(--t-display)", fontStyle:"italic", fontWeight:300, color:"var(--gold)" }}>Read the Title, Not the Brochure</em>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, minmax(0,1fr))", gap:1, background:"rgba(42,45,53,0.08)" }} className="grid-3 svc-card-alt">
            {freeholdLeasehold.map((f, i) => (
              <ScrollReveal key={f.t} delay={i * 60}>
                <div className="svc-card" style={{ borderRadius:0, height:"100%", padding:"34px 28px", display:"flex", flexDirection:"column" }}>
                  <div className="gold-accent" />
                  <h3 className="svc-card-title" style={{ fontSize:18, marginBottom:10 }}>{f.t}</h3>
                  <p className="svc-card-desc" style={{ marginBottom:0 }}>{f.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={120}>
            <div style={{ maxWidth:760, margin:"44px auto 0", textAlign:"center" }}>
              <p className="body-lg" style={{ color:"var(--slate)" }}>
                Conversion charges, transfer permissions, and authority NOCs change over time. We confirm the current tenure, conversion status, and stamp duty implications at the time of your transaction, not from a dated brochure.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection title="Tricity Questions, Answered Straight" faqs={faqs} dark decor />
      <CTASection />
    </>
  );
}
