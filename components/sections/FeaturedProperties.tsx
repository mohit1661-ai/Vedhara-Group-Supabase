import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoOnHover from "@/components/ui/VideoOnHover";

type FeaturedProperty = {
  category: string;
  title: string;
  location: string;
  price: string;
  config: string;
  size: string;
  image: string;
  alt?: string;
  link: string;
  tag: string;
  pos?: string;
  video?: string;
  poster?: string;
};

const featuredProperties: FeaturedProperty[] = [
  // ONE PER CATEGORY — one commercial, one residential, one luxury, etc. (newest first)
  {
    category: "Luxury",
    title: "Sector 15 Duplex Kothi",
    location: "Sector 15 Part 2, Gurugram",
    price: "₹ 18 Cr",
    config: "4 BHK + Servant Quarter",
    size: "502 sq.yds.",
    image: "https://images.pexels.com/photos/35808145/pexels-photo-35808145.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Sector 15 duplex kothi villa in Gurugram",
    link: "/luxury",
    tag: "Available for Sale",
  },
  {
    category: "Plotted",
    title: "NH-8 Facing Plot, Sector 15",
    location: "Sector 15 Part 2, Gurugram",
    price: "₹ 18.50 Cr",
    config: "500 sq.yds. Plot",
    size: "500 sq.yds.",
    image: "https://images.pexels.com/photos/11201060/pexels-photo-11201060.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "NH-8 facing residential plot in Sector 15 Part 2, Gurugram",
    link: "/sell",
    tag: "Available for Sale",
  },
  {
    category: "Commercial",
    title: "Commercial Building, Udyog Vihar 5",
    location: "Udyog Vihar Phase 5, Gurugram",
    price: "₹ 40 Cr",
    config: "40,000 sq.ft. Built-up",
    size: "1,000 sq. m.",
    image: "/Images/udyog-vihar-05.jpeg",
    alt: "Commercial building for sale in Udyog Vihar Phase 5, Gurugram",
    link: "/commercial",
    tag: "For Sale",
  },
  {
    category: "Residential",
    title: "The Cullinan Heights",
    location: "Sector 150, Noida",
    price: "₹ 4.85 Cr",
    config: "4 BHK + Study",
    size: "2,450 sq.ft.",
    image: "https://images.pexels.com/photos/11729105/pexels-photo-11729105.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "The Cullinan Heights luxury high-rise illuminated at dusk in Sector 150, Noida",
    link: "/buy",
    tag: "Ready to Move",
  },
  {
    category: "New Launch",
    title: "Amaryllis Residences",
    location: "Golf Course Road, Gurugram",
    price: "₹ 6.20 Cr",
    config: "3 BHK + Servant",
    size: "2,150 sq.ft.",
    image: "https://images.pexels.com/photos/31684126/pexels-photo-31684126.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos: "100%",
    alt: "Amaryllis Residences luxury apartments on Golf Course Road, Gurugram",
    link: "/new-launches",
    tag: "Possession Oct 2026",
  },
  {
    category: "Rental",
    title: "The Aspen Residency",
    location: "Sector 57, Gurugram",
    price: "₹ 58,000/mo",
    config: "3 BHK",
    size: "1,550 sq.ft.",
    image: "https://images.pexels.com/photos/33559373/pexels-photo-33559373.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos: "0%",
    alt: "The Aspen Residency 3 BHK rental apartment in Sector 57, Gurugram",
    link: "/rent",
    tag: "Available",
  },
];

/**
 * Homepage "Featured Properties" showcase — premium property cards on a navy
 * band. Extracted from app/page.tsx so it can be positioned prominently right
 * after the "Find Your Property" opener (real-estate-first page flow).
 */
export default function FeaturedProperties() {
  return (
    <section style={{ background:"var(--navy)",padding:"60px 32px",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:"10%",right:"-5%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.05) 0%,transparent 70%)",pointerEvents:"none" }} />
      <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
        <ScrollReveal>
          <div style={{ textAlign:"center",marginBottom:36 }}>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>Featured Properties</p>
            <h2 className="heading-xl" style={{ color:"var(--light)",lineHeight:1.1,marginBottom:16 }}>
              Explore Premium Listings<span style={{ color:"var(--gold-lt)" }}> Across Delhi NCR</span>
            </h2>
            <p className="body-lg" style={{ color:"rgba(252,250,244,0.55)",maxWidth:560,margin:"0 auto" }}>
              Hand-picked properties from our verified inventory, each independently assessed through the Vedhara Verification Framework.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }} className="prop-grid">
          {featuredProperties.map((p,i)=>(
            <ScrollReveal key={p.title} delay={i*80}>
              <Link href={p.link} className="hover-lift" style={{ display:"block",background:"var(--cream)",border:"1px solid rgba(212,168,67,0.15)",borderRadius:16,overflow:"hidden",textDecoration:"none" }}>
                <div style={{ height:190,position:"relative",overflow:"hidden" }}>
                  {p.video ? (
                    <VideoOnHover src={p.video} poster={p.poster} alt={p.alt || p.title} />
                  ) : (
                    <Image
                      src={p.image}
                      alt={p.alt || p.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit:"cover", objectPosition: p.pos ? (p.pos.indexOf(" ") > -1 ? p.pos : "50% " + p.pos) : "50% 50%" }}
                    />
                  )}
                  {/* subtle dark overlay for text legibility */}
                  <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(9,15,29,0.05) 0%,rgba(9,15,29,0.45) 100%)",pointerEvents:"none" }} />
                  {p.video && (
                    <div style={{ position:"absolute",top:14,left:14,zIndex:2 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:8,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(9,15,29,0.55)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(4px)",display:"inline-flex",alignItems:"center",gap:5 }}>
                        ▶ Video Tour
                      </span>
                    </div>
                  )}
                  <div style={{ position:"absolute",top:14,right:14,zIndex:2 }}>
                    <span style={{ fontFamily:"var(--t-head)",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,background:"rgba(9,15,29,0.55)",color:"rgba(255,255,255,0.95)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(4px)" }}>
                      {p.tag}
                    </span>
                  </div>
                </div>
                <div style={{ padding:20 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                    <span style={{ fontFamily:"var(--t-head)",fontSize:8.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(212,168,67,0.12)",color:"var(--gold-ink)",borderRadius:3 }}>
                      {p.category}
                    </span>
                  </div>
                  <h3 style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:6,lineHeight:1.3 }}>{p.title}</h3>
                  <p style={{ fontFamily:"var(--t-body)",fontSize:11.5,color:"var(--slate)",marginBottom:4 }}>{p.location}</p>
                  <p style={{ fontFamily:"var(--t-body)",fontSize:13,color:"var(--navy)",marginBottom:10,lineHeight:1.4 }}>{p.config} · {p.size}</p>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(212,168,67,0.2)",paddingTop:12 }}>
                    <p style={{ fontFamily:"var(--t-head)",fontSize:17,fontWeight:700,color:"var(--navy)",margin:0 }}>{p.price}</p>
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
              Our full inventory spans 500+ verified listings across Delhi NCR.
            </p>
            <Link href="/buy" className="btn btn-primary">
              Browse All Properties →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
