import type { Metadata } from "next";
import Link from "next/link";
import { withAnchor } from "@/lib/data/listingAnchors";
import JsonLd from "@/components/seo/JsonLd";
import { listingsSchema } from "@/lib/seo/listings";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import FAQSection, { FAQItem } from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";
export const metadata: Metadata = { title:"Real Estate Advisory Services in Delhi NCR", description:"Vedhara Group's full real estate advisory across Delhi NCR, Faridabad, Manesar & Chandigarh: buy, sell, rent, invest and NRI services.", alternates:{ canonical:"https://www.vedharagroup.com/services" } };
const servicesSchema = {
  "@context":"https://schema.org",
  "@type":"ItemList",
  name:"Real Estate Advisory Services in Delhi NCR",
  itemListElement: [
    { "@type":"ListItem", position:1, item:{ "@type":"Service", name:"Buy Property", url:"https://www.vedharagroup.com/buy", provider:{"@id":"https://www.vedharagroup.com/#organization"} } },
    { "@type":"ListItem", position:2, item:{ "@type":"Service", name:"Sell Property", url:"https://www.vedharagroup.com/sell", provider:{"@id":"https://www.vedharagroup.com/#organization"} } },
    { "@type":"ListItem", position:3, item:{ "@type":"Service", name:"Rent Property", url:"https://www.vedharagroup.com/rent", provider:{"@id":"https://www.vedharagroup.com/#organization"} } },
    { "@type":"ListItem", position:4, item:{ "@type":"Service", name:"Commercial Real Estate Advisory", url:"https://www.vedharagroup.com/commercial", provider:{"@id":"https://www.vedharagroup.com/#organization"} } },
    { "@type":"ListItem", position:5, item:{ "@type":"Service", name:"Luxury Properties", url:"https://www.vedharagroup.com/luxury", provider:{"@id":"https://www.vedharagroup.com/#organization"} } },
    { "@type":"ListItem", position:6, item:{ "@type":"Service", name:"New Launches", url:"https://www.vedharagroup.com/new-launches", provider:{"@id":"https://www.vedharagroup.com/#organization"} } },
    { "@type":"ListItem", position:7, item:{ "@type":"Service", name:"Investment Advisory", url:"https://www.vedharagroup.com/investment-advisory", provider:{"@id":"https://www.vedharagroup.com/#organization"} } },
    { "@type":"ListItem", position:8, item:{ "@type":"Service", name:"NRI Services", url:"https://www.vedharagroup.com/nri-services", provider:{"@id":"https://www.vedharagroup.com/#organization"} } },
    { "@type":"ListItem", position:9, item:{ "@type":"Service", name:"Property Management", url:"https://www.vedharagroup.com/property-management", provider:{"@id":"https://www.vedharagroup.com/#organization"} } },
  ],
};
const services = [
  { icon:"B",title:"Buy Property",href:"/buy",desc:"Independent guidance through verified listings from shortlist to registration.",gradient:"linear-gradient(135deg,#0F1E38,#1a3a5c)" },
  { icon:"S",title:"Sell Property",href:"/sell",desc:"Strategic pricing and qualified buyer access for fair-value sales.",gradient:"linear-gradient(135deg,#0F1E38,#2a4a6a)" },
  { icon:"R",title:"Rent Property",href:"/rent",desc:"Verified rentals with transparent lease terms for tenants and landlords.",gradient:"linear-gradient(135deg,#0F1E38,#3a6a8f)" },
  { icon:"C",title:"Commercial Real Estate",href:"/commercial",desc:"Site selection and lease advisory for retail, office, and industrial spaces.",gradient:"linear-gradient(135deg,#1a1a2e,#D4A843)" },
  { icon:"L",title:"Luxury Properties",href:"/luxury",desc:"Curated premium residences with white-glove advisory service.",gradient:"linear-gradient(135deg,#0F1E38,#D4A843)" },
  { icon:"N",title:"New Launches",href:"/new-launches",desc:"Verified upcoming developer projects across Delhi NCR, Faridabad, Manesar and Chandigarh.",gradient:"linear-gradient(135deg,#0F1E38,#2a3f6f)" },
  { icon:"I",title:"Investment Advisory",href:"/investment-advisory",desc:"Portfolio-level real estate strategy for long-term investors.",gradient:"linear-gradient(135deg,#0F1E38,#4a7a9f)" },
  { icon:"N",title:"NRI Services",href:"/nri-services",desc:"Remote-friendly advisory for Indian diaspora worldwide.",gradient:"linear-gradient(135deg,#0F1E38,#3a6a8f)" },
  { icon:"P",title:"Property Management",href:"/property-management",desc:"Tenant and maintenance management for property owners.",gradient:"linear-gradient(135deg,#0F1E38,#5a6070)" },
];

const servicesFaqs: FAQItem[] = [
  {
    q:"Does Vedhara charge a fee for all services?",
    a:"Vedhara's advisory model varies by service. A disclosed commission applies on both the buyer and seller sides, in line with the standard rules and practices followed by real estate businesses, while sell-side, property management, and dedicated advisory engagements operate on a disclosed fee basis. We always clarify the fee structure before any engagement begins.",
  },
  {
    q:"Can I use multiple Vedhara services at the same time?",
    a:"Yes. Many clients combine services, for example, selling one property through Vedhara while using our buy-side advisory to acquire another, or using property management alongside investment advisory for their portfolio.",
  },
  {
    q:"How does Vedhara verify properties across different service categories?",
    a:"All properties listed across Vedhara's services pass our five-point Verification Framework: RERA registration or application confirmation, builder track record assessment, legal title review, project progress verification (for under-construction), and pricing transparency. The same standard applies whether you are buying, renting, or investing.",
  },
  {
    q:"Is Vedhara's advisory independent, or do you push certain developers?",
    a:"Vedhara is an independent advisory firm. We do not have exclusive tie-ups with any developer or project. Our recommendations are based solely on the client's requirements and the property's merits under our Verification Framework.",
  },
  {
    q:"Can NRI clients access all Vedhara services remotely?",
    a:"Yes. Every Vedhara service, from buying and selling to property management and investment advisory, is designed to be accessible remotely. Video site visits, digital documentation, and remote coordination are standard across all services.",
  },
];

const featuredProperties = [
  {
    id:"fp-01",
    title:"The Cullinan Heights",
    location:"Sector 150, Noida",
    price:"₹ 4.85 Cr",
    tag:"Buy",
    tagHref:"/buy",
    desc:"4 BHK verified residence ready to move.",
    gradient:"linear-gradient(135deg,#0F1E38 0%,#1a3a5c 50%,#2a5f8f 100%)",
    image:"https://images.pexels.com/photos/11729105/pexels-photo-11729105.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50%",
    alt:"The Cullinan Heights luxury high-rise illuminated at dusk in Sector 150, Noida",
  },
  {
    id:"fp-02",
    title:"The Aspen Residency",
    location:"Sector 57, Gurugram",
    price:"₹ 58,000/mo",
    tag:"Rent",
    tagHref:"/rent",
    desc:"Fully furnished 3 BHK in prime Gurugram.",
    gradient:"linear-gradient(135deg,#16243F 0%,#2a4a6a 50%,#6a8aaa 100%)",
    image:"https://images.pexels.com/photos/33559373/pexels-photo-33559373.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"0%",
    alt:"The Aspen Residency 3 BHK rental apartment in Sector 57, Gurugram",
  },
  {
    id:"fp-03",
    title:"Sunset Villa",
    location:"Sector 23, Dwarka, Delhi",
    price:"₹ 3.95 Cr",
    tag:"Sell",
    tagHref:"/sell",
    desc:"4 BHK independent floor for sale.",
    gradient:"linear-gradient(135deg,#2a1a0a 0%,#4a2a1a 50%,#6a4a2a 100%)",
    image:"https://images.pexels.com/photos/35808145/pexels-photo-35808145.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"19%",
    alt:"Sunset Villa independent floor in Sector 23, Dwarka, Delhi",
  },
  {
    id:"fp-04",
    title:"One Horizon Center",
    location:"Golf Course Road, Gurugram",
    price:"₹ 12.50 Cr",
    tag:"Commercial",
    tagHref:"/commercial",
    desc:"4,800 sq.ft. LEED Gold office space.",
    gradient:"linear-gradient(135deg,#1a1a2e 0%,#2a2a4a 50%,#D4A843 100%)",
    image:"https://images.pexels.com/photos/38340685/pexels-photo-38340685.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50%",
    alt:"One Horizon Center office tower on Golf Course Road, Gurugram",
  },
  {
    id:"fp-05",
    title:"One Golf Course Penthouse",
    location:"Golf Course Road, Gurugram",
    price:"₹ 12.80 Cr",
    tag:"Luxury",
    tagHref:"/luxury",
    desc:"5 BHK penthouse with panoramic views.",
    gradient:"linear-gradient(135deg,#0F1E38 0%,#D4A843 30%,#E8C970 70%,#F0DBA8 100%)",
    image:"https://images.pexels.com/photos/20418771/pexels-photo-20418771.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50%",
    alt:"One Golf Course Penthouse luxury penthouse on Golf Course Road, Gurugram",
  },
  {
    id:"fp-06",
    title:"Aura Sky Villas",
    location:"Sector 152, Noida",
    price:"₹ 1.85 Cr",
    tag:"New Launch",
    tagHref:"/new-launches",
    desc:"Pre-launch bookings open at Prestige Group.",
    gradient:"linear-gradient(135deg,#0a1a2a 0%,#1a3a5a 50%,#3a6a8a 100%)",
    image:"https://images.pexels.com/photos/38341175/pexels-photo-38341175.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"84%",
    alt:"Aura Sky Villas by Prestige Group in Sector 152, Noida",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema} />
      <JsonLd data={listingsSchema("/services", featuredProperties.map((p) => ({
        id: p.id,
        name: p.title,
        description: p.desc,
        priceDisplay: p.price,
        locality: p.location,
        propertyType: p.tag,
        image: p.image,
      })))} />
      <VideoHeroSection videoSrc="/videos/All%20Services%20Hero%20Video.mp4">
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>All Services</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(28px,5vw,56px)",color:"var(--light)",lineHeight:1.1,marginBottom:24 }}>
            Real Estate Advisory Services<br /><span style={{ color:"var(--gold-lt)" }}>for Every Property Journey</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Independent guidance tailored to your specific goals,<br className="br-desktop" />from your first home to a multi-property portfolio.</p>
      </VideoHeroSection>

      {/* Gold differentiator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* Intro block */}
      <div style={{ background:"var(--cream)",textAlign:"center",padding:"48px 32px 0" }}>
        <div style={{ maxWidth:700,margin:"0 auto" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ color:"var(--gold-ink)",marginBottom:14 }}>All Services</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>Your Complete Property<br /><span style={{ color:"var(--gold-ink)" }}>Advisory Partner</span></h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              From buying your first home to managing a portfolio of properties, Vedhara Group offers end-to-end advisory across every stage of your real estate journey. Each service is built on the same foundation: independent advice, verified listings, and transparent pricing. Explore what we offer below.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* What we do — SEO body copy */}
      <section style={{ background:"var(--cream)",padding:"8px 32px" }}>
        <div style={{ maxWidth:1080,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:36 }} className="grid-2">
            <ScrollReveal>
              <div>
                <h2 className="heading-md" style={{ color:"var(--navy)",marginBottom:12 }}>A Single Team for Buying and Selling Across Delhi NCR</h2>
                <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.8,marginBottom:14 }}>
                  Whether you are looking for residential property for sale in Gurugram, a Noida flat for rent, commercial real estate in Faridabad or a plotted investment in Mohali, Vedhara Group keeps your search, negotiation, legal due diligence and paperwork under one disciplined roof. Each city team maps the local micro-markets, from the Dwarka Expressway and Golf Course Extension Road in Gurugram to the Noida Expressway and Yamuna Expressway corridors, so you compare properties like-for-like instead of against a generic brochure description.
                </p>
                <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.8,marginBottom:14 }}>
                  Every recommendation passes the five-point Vedhara Verification Framework: RERA registration status, builder delivery history, project-level approvals, price fairness against comparable sales, and a clean title chain. If a property fails any check, it is not published. That is why our buyers shortlist with confidence and our sellers gain access to genuinely pre-qualified demand.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div>
                <h2 className="heading-md" style={{ color:"var(--navy)",marginBottom:12 }}>Advisory Beyond the Transaction, for NRIs and Investors</h2>
                <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.8,marginBottom:14 }}>
                  For non-resident Indians managing property from abroad, we coordinate site visits, documentation, Power of Attorney, and rental or resale decisions through a single named advisor. Property investors use our portfolio-level guidance, backed by free tools such as the ROI and rental-yield calculator, home loan EMI calculator and stamp duty estimator, to model a purchase before committing capital.
                </p>
                <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.8,marginBottom:14 }}>
                  Our fee model is disclosed up front for every engagement, whether you buy, sell, rent or commercialise real estate in Delhi NCR, Chandigarh Tricity or across North India. The result is a property advisory partner you can hold accountable from the first site visit to the final registration.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-3 svc-card-alt">
          {services.map((svc,i)=>(
            <ScrollReveal key={svc.href} delay={i*60}>
              <Link href={svc.href} className="svc-card" style={{ borderRadius:0 }}>
                <div className="gold-accent"></div>
                <h2 className="svc-card-title">{svc.title}</h2>
                <p className="svc-card-desc">{svc.desc}</p>
                <span className="svc-card-arrow">Explore →</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Properties Showcase */}
      <section className="section-navy">
        <div className="glow-orb" />
        <div className="section-inner">
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:60 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Featured Properties</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:16 }}>
                A Selection Across<span style={{ color:"var(--gold-lt)" }}> Every Category</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.48)",maxWidth:560,margin:"0 auto" }}>
                Browse hand-picked properties from every Vedhara service,<br />all independently verified.
              </p>
            </div>
          </ScrollReveal>

          <div className="prop-grid">
            {featuredProperties.map((p,i)=>(
              <ScrollReveal key={p.id} id={p.id} delay={i*80} style={{ display:"flex" }}>
                <Link href={withAnchor(p.tagHref, p.title)} className="hover-lift listing-card-link">
                  <div className="listing-img-wrap" style={{ background:p.gradient }}>
                    <Image
                      src={p.image}
                      alt={p.alt || p.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit:"cover", objectPosition: p.pos ? (p.pos.indexOf(" ") > -1 ? p.pos : "50% " + p.pos) : "50% 50%" }}
                    />
                    <div className="video-gradient-overlay" />
                    <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                      <span className="pill-status">
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding:20,flex:1,display:"flex",flexDirection:"column" }}>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:6,lineHeight:1.3 }}>{p.title}</h3>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{p.location}</p>
                    <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--ink)",marginBottom:10,lineHeight:1.4,flex:1 }}>{p.desc}</p>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12,flexShrink:0 }}>
                      <p className="price-block">{p.price}</p>
                      <span className="inquire-btn" style={{ padding:"8px 14px",fontSize:10 }}>
                        View {p.tag} →
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <div style={{ textAlign:"center",marginTop:52 }}>
              <p className="body-md" style={{ color:"rgba(252,250,244,0.35)",marginBottom:20 }}>
                Explore the full range of Vedhara&apos;s advisory services and verified listings.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Book a Free Consultation →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={servicesFaqs} title="Vedhara Services FAQ" dark={false} />
      <CTASection />
    </>
  );
}
