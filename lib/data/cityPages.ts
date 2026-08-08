/**
 * City real-estate pages — single source of truth for the 9 city pages
 * (Gurugram, Noida, Greater Noida, South Delhi, Chandigarh, Mohali,
 * Panchkula, Faridabad, Ghaziabad). Each page is rendered by the reusable
 * `CityPageTemplate` (mirrors the Chandigarh Tricity page design) with unique,
 * SEO-optimised copy, ~20 verified listings, micro-markets, authorities,
 * a market guide and relevant FAQs.
 */

export interface CityListing {
  id: string;
  title: string;
  location: string;
  price: string;
  config: string;
  size: string;
  type: "Residential" | "Luxury" | "Commercial" | "Plotted";
  status: "Ready to Move" | "Possession Dec 2026" | "Under Construction" | "Available for Sale" | "Just Launched";
  highlights: string[];
  image: string;
  pos?: string;
  alt?: string;
}

export interface MicroMarket {
  name: string;
  tag: string;
  desc: string;
  points: string[];
}

export interface Authority {
  title: string;
  applies: string;
  mono: string;
  image: string;
  pos?: string;
  alt: string;
  body: string;
}

export interface CityPageData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroVideo: string;
  heroVideoMobile?: string;
  heroPoster: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  heroBody: string;
  introEyebrow: string;
  introTitle: string;
  introAccent: string;
  introBody: string;
  listingsEyebrow: string;
  listingsTitle: string;
  listingsAccent: string;
  listingsSub: string;
  listings: CityListing[];
  microMarkets: { eyebrow: string; title: string; accent: string; items: MicroMarket[] };
  authorities: { eyebrow: string; title: string; accent: string; items: Authority[] };
  guide: { eyebrow: string; title: string; accent: string; items: { t: string; d: string }[] };
  faqTitle: string;
  faqs: { q: string; a: string }[];
  schemaName: string;
  schemaAreaServed: string[];
  schemaDescription: string;
}

const img = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

/* ═══════════════════════════════════════════════════════════════
   GURUGRAM
   ═══════════════════════════════════════════════════════════════ */
const gurugram: CityPageData = {
  slug: "gurugram",
  name: "Gurugram",
  metaTitle: "Real Estate in Gurugram | Verified Property Advisory",
  metaDescription: "Buy, rent, sell or invest in Gurugram property with verified listings. Golf Course Road, Dwarka Expressway, Sector 62 & 150 guidance with RERA due diligence.",
  heroVideo: "/videos/gurugram-city.mp4",
  heroPoster: img(11729105),
  eyebrow: "Gurugram",
  h1: "Real Estate in Gurugram.",
  h1Accent: "India's Corporate Capital, Verified.",
  heroBody:
    "Golf Course Road, Dwarka Expressway, Sohna Road, Sector 62, Gurugram is Delhi NCR's most active and liquid property market. We verify every listing against Haryana RERA, benchmark pricing to registered transactions, and assign one named advisor to your search from day one.",
  introEyebrow: "Why Gurugram",
  introTitle: "A High-Growth Market.",
  introAccent: "Demanding Higher Due Diligence.",
  introBody:
    "Gurugram's property story is one of rapid infrastructure, corporate migration and micro-market variance. A penthouse on Golf Course Road and a 3 BHK on Dwarka Expressway behave like different markets entirely. Our job is to make that complexity an advantage: verified approvals, honest pricing and advice that reflects the specific sector, not the brochure.",
  listingsEyebrow: "Featured Listings",
  listingsTitle: "Verified Properties",
  listingsAccent: "in Gurugram",
  listingsSub:
    "Every listing is Haryana RERA-verified and independently assessed through the Vedhara Verification Framework.",
  listings: [
    { id:"gg-01", title:"One Golf Course Penthouse", location:"Golf Course Road, Gurugram", price:"₹ 12.80 Cr", config:"5 BHK + Pool", size:"4,200 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["HRERA Registered","Panoramic View","Private Terrace","Butler Service"], image:img(20418771), alt:"One Golf Course Penthouse luxury penthouse on Golf Course Road, Gurugram" },
    { id:"gg-02", title:"Amaryllis Residences", location:"Golf Course Road, Gurugram", price:"₹ 6.20 Cr", config:"3 BHK + Servant", size:"2,150 sq.ft.", type:"Luxury", status:"Possession Dec 2026", highlights:["HRERA Registered","Corner Unit","Private Terrace","Smart Home"], image:img(31684126), pos:"100%", alt:"Amaryllis Residences luxury apartments on Golf Course Road, Gurugram" },
    { id:"gg-03", title:"One Golden Mile", location:"Sector 62, Gurugram", price:"₹ 8.50 Cr", config:"4,500 sq.ft. Office", size:"4,500 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["HRERA Registered","LEED Platinum","24hr Security","100+ Car Parking"], image:img(5859963), pos:"100%", alt:"One Golden Mile commercial office building in Sector 62, Gurugram" },
    { id:"gg-04", title:"Platinum Towers", location:"Dwarka Expressway, Gurugram", price:"₹ 2.95 Cr", config:"3 BHK", size:"1,650 sq.ft.", type:"Residential", status:"Possession Dec 2026", highlights:["HRERA Registered","Metro Proximity","85% Open Area","Premium Finishes"], image:img(7672058), pos:"100%", alt:"Platinum Towers residential high-rise on Dwarka Expressway, Gurugram" },
    { id:"gg-05", title:"Skydeck Residence", location:"Sector 62, Gurugram", price:"₹ 7.95 Cr", config:"4 BHK Penthouse", size:"3,100 sq.ft.", type:"Luxury", status:"Under Construction", highlights:["Sky Deck","Private Elevator","Wine Cellar","Smart Home"], image:img(8082227), pos:"64%", alt:"Skydeck Residence luxury penthouse in Sector 62, Gurugram" },
    { id:"gg-06", title:"One Horizon Center", location:"Sector 43, Gurugram", price:"₹ 12.50 Cr", config:"4,800 sq.ft. Office", size:"4,800 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Golf Course Road","LEED Gold","Deal Floor","24hr Security"], image:img(38340685), pos:"60%", alt:"One Horizon Center office tower on Golf Course Road, Gurugram" },
    { id:"gg-07", title:"The Aspen Residency", location:"Sector 57, Gurugram", price:"₹ 58,000/mo", config:"3 BHK", size:"1,550 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Prime Location","Gated Society","Parking Included","Power Backup"], image:img(33559373), pos:"0%", alt:"The Aspen Residency 3 BHK rental apartment in Sector 57, Gurugram" },
    { id:"gg-08", title:"Corporate Square", location:"Sector 62, Gurugram", price:"₹ 1,85,000/mo", config:"2,800 sq.ft. Office", size:"2,800 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["IT/Tech Hub","Conference Room","Pantry","24hr Security"], image:img(5859962), pos:"95%", alt:"Corporate Square office space for rent in Sector 62, Gurugram" },
    { id:"gg-09", title:"The Presidential", location:"Sector 63A, Gurugram", price:"₹ 3.20 Cr", config:"3 BHK", size:"1,800 sq.ft.", type:"Luxury", status:"Under Construction", highlights:["DLF Group","Clubhouse","Landscaped Gardens","Smart Home"], image:img(30608874), pos:"71%", alt:"The Presidential luxury project by DLF in Sector 63A, Gurugram" },
    { id:"gg-10", title:"Central Business Park", location:"Sector 44, Gurugram", price:"₹ 95 Lakhs", config:"Commercial Offices", size:"1,200 sq.ft.", type:"Commercial", status:"Just Launched", highlights:["Godrej Project","Plug & Play","Meeting Rooms","High Footfall"], image:img(36903834), pos:"84%", alt:"Central Business Park commercial offices by Godrej in Sector 44, Gurugram" },
    { id:"gg-11", title:"Imperial Heights", location:"Southern Peripheral Road, Gurugram", price:"₹ 2.85 Cr", config:"3 BHK", size:"1,620 sq.ft.", type:"Residential", status:"Under Construction", highlights:["M3M Project","Golf Course View","Clubhouse","Premium Finishes"], image:img(24814754), pos:"65%", alt:"Imperial Heights residential project by M3M India on Southern Peripheral Road, Gurugram" },
    { id:"gg-12", title:"The Green Mile", location:"Sector 36, Sohna Road, Gurugram", price:"₹ 1.55 Cr", config:"2 BHK", size:"1,150 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Signature Global","Affordable Luxury","Metro Proposed","Gated Community"], image:img(19190343), pos:"77%", alt:"The Green Mile affordable luxury project by Signature Global on Sohna Road, Gurugram" },
    { id:"gg-13", title:"Galleria Business Hub", location:"MG Road, Gurugram", price:"₹ 2,40,000/mo", config:"3,500 sq.ft. Retail", size:"3,500 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","MG Road","Signage Visible","Car Parking"], image:img(13425897), pos:"44%", alt:"Galleria Business Hub retail space for rent on MG Road, Gurugram" },
    { id:"gg-14", title:"Cyber Park", location:"Sector 67, Gurugram", price:"₹ 95 Lakhs/yr", config:"2,200 sq.ft. Co-working", size:"2,200 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Plug & Play","Meeting Rooms","Cafeteria","Networking Events"], image:img(36926207), pos:"62%", alt:"Cyber Park co-working office space in Sector 67, Gurugram" },
    { id:"gg-15", title:"Platinum Business Centre", location:"MG Road, Gurugram", price:"₹ 3.40 Cr", config:"2,000 sq.ft. Office", size:"2,000 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["MG Road","High Street","Deal Floor","24hr Security"], image:img(12522753), pos:"50%", alt:"Platinum Business Centre office space on MG Road, Gurugram" },
    { id:"gg-16", title:"Emerald County", location:"Golf Course Extension Road, Gurugram", price:"₹ 2.45 Cr", config:"3 BHK", size:"1,520 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Tata Housing","Gated Community","Clubhouse","Smart Home"], image:img(17719719), pos:"67%", alt:"Emerald County residential project by Tata Housing on Golf Course Extension Road, Gurugram" },
    { id:"gg-17", title:"Lake Vista Heights", location:"Sector 150, Gurugram", price:"₹ 75,000/mo", config:"4 BHK", size:"2,200 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Lake View","Premium Finishes","Clubhouse","Modular Kitchen"], image:img(4792297), pos:"63%", alt:"Lake Vista Heights 4 BHK rental with lake view in Sector 150, Gurugram" },
    { id:"gg-18", title:"Sovereign Villas", location:"Sector 150, Gurugram", price:"₹ 9.50 Cr", config:"6 BHK Villa", size:"5,800 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Lake Front","Private Garden","Home Theatre","Modular Kitchen"], image:img(16573669), pos:"72%", alt:"Sovereign Villas lakefront luxury villas in Sector 150, Gurugram" },
    { id:"gg-19", title:"Retail Arcade", location:"Sector 18, Gurugram", price:"₹ 2.85 Cr", config:"1,200 sq.ft. Retail", size:"1,200 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Loading Bay","Signage Visible"], image:img(16140814), pos:"50%", alt:"Retail Arcade shopping arcade storefronts in Sector 18, Gurugram" },
    { id:"gg-20", title:"The Cullinan Heights", location:"Sector 150, Gurugram", price:"₹ 4.85 Cr", config:"4 BHK + Study", size:"2,450 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Golf Course View","Clubhouse Access","Vastu Compliant"], image:img(11729105), pos:"77%", alt:"The Cullinan Heights luxury high-rise illuminated at dusk in Sector 150, Gurugram" },
  ],
  microMarkets: {
    eyebrow: "The Micro-Markets",
    title: "Every Sector, Its Own Story.",
    accent: "One Standard of Care.",
    items: [
      { name:"Golf Course Road", tag:"Luxury Corridor", desc:"Gurugram's most prestigious residential address and its highest price band. Scarce land, corporate C-suite demand and premium builders define this micro-market; verification focuses on builder pedigree and true title.", points:["Highest per-sq.ft. values in NCR","Limited new supply, strong resale","Penthouse and super-luxury demand"] },
      { name:"Dwarka Expressway", tag:"High Growth", desc:"The 29-km expressway connecting Delhi to Gurugram has become the market's fastest-moving corridor. Newer towers, metro connectivity and developer inventory make approval and delivery-history checks essential.", points:["Metro line driving appreciation","New supply with delivery risk","Budget to premium mix"] },
      { name:"Sector 62 & Udyog Vihar", tag:"Commercial Hub", desc:"Gurugram's IT and office heartland around the old commercial core. Office, retail and co-working inventory is deep; lease structures, zoning and parking are the key diligence points.", points:["IT/Tech employment base","Office & retail absorption","Lease and zoning checks"] },
      { name:"Sohna Road & SPR", tag:"Affordable Premium", desc:"The southern growth belt connecting Gurugram to Sohna. Projects here target value-seeking buyers with clubhouse-driven communities; price-to-circle-rate benchmarking matters most.", points:["Value-for-money segments","Clubhouse communities","Circle-rate benchmarking"] },
      { name:"MG Road & Old Gurugram", tag:"Established", desc:"The mature core of the city with established schools, hospitals and offices. Inventory is older and resale-heavy, so title chains and redevelopment potential deserve close review.", points:["Established infrastructure","Resale-heavy inventory","Redevelopment potential"] },
    ],
  },
  authorities: {
    eyebrow: "Authority Guide",
    title: "Who Approves, Who Registers,",
    accent: "and Who You Can Trust",
    items: [
      { title:"Haryana RERA (HRERA)", applies:"Gurugram", mono:"HR", image:img(33217250), pos:"50% 70%", alt:"Haryana RERA registration office for Gurugram real estate projects", body:"All new residential and commercial projects in Gurugram must register with HRERA (Gurugram). We verify the registration number, quarterly progress filings and complaint history on the official portal before any listing goes live." },
      { title:"Haryana Urban Development (HSVP/HUDA)", applies:"Sector Plots & Licenses", mono:"HS", image:img(34968154), pos:"100%", alt:"Haryana Urban Development authority for Gurugram plots and licences", body:"Plots in older HSVP sectors and commercial licences fall under Haryana Urban Development Authority. We confirm layout sanctions, allotment chains and conversion status for resale plots." },
      { title:"GMDA (Gurugram Metropolitan)", applies:"Infrastructure & Approvals", mono:"GM", image:img(33848325), pos:"79%", alt:"Gurugram Metropolitan Development Authority for infrastructure approvals", body:"GMDA manages Gurugram's master plan, roads and infrastructure. Building plan sanctions and commencement certificates are checked against the relevant civic and authority records." },
    ],
  },
  guide: {
    eyebrow: "Market Guide",
    title: "Before You Buy in Gurugram",
    accent: "Three Things That Actually Matter",
    items: [
      { t:"Check the Builder's Delivery Record", d:"Gurugram's new supply carries delivery risk. We review past project completion timelines, RERA filings and litigation before you commit, not after." },
      { t:"Benchmark Price to Circle Rate", d:"Asking prices across Gurugram often exceed government circle rates. We compare shortlists against registered transactions in the same sector so you pay the market rate, not the marketing rate." },
      { t:"Verify Title & Approvals, Not Brochures", d:"Approval status, floor-area ratio and clear title vary sector to sector. We verify against authority records and the registered title chain, never the developer's sales pitch." },
    ],
  },
  faqTitle: "Gurugram Questions, Answered Straight",
  faqs: [
    { q:"Is it a good time to buy property in Gurugram in 2026?", a:"Gurugram remains Delhi NCR's most liquid market, but the opportunity varies sharply by micro-market. Dwarka Expressway and Southern Peripheral Road offer growth at lower entry points, while Golf Course Road delivers stability at premium prices. We benchmark every shortlist against recent registered transactions in the same sector before advising." },
    { q:"Which area of Gurugram is best to buy a house?", a:"There is no single best area, it depends on budget and purpose. Golf Course Road suits premium and luxury buyers; Dwarka Expressway suits value-seeking buyers with a medium-term horizon; Sector 62 and MG Road suit commercial and rental investors. We model the trade-offs side by side based on your goals." },
    { q:"Is Gurugram property freehold or leasehold?", a:"Most modern Gurugram projects are freehold with clear title. Some older HSVP sectors and specific commercial licences carry leasehold or licence-based tenure. We verify the actual tenure from the title chain and authority records, not from the brochure." },
    { q:"How does HRERA protect Gurugram buyers?", a:"Every registered project in Gurugram must file quarterly progress reports and cannot advertise without a valid RERA number. If a builder delays possession, buyers can claim compensation through HRERA. We confirm registration, filings and complaint history on the official portal before recommending anything." },
    { q:"Is renting in Gurugram a good option in 2026?", a:"Yes. Gurugram's corporate workforce keeps rental demand strong, especially around Golf Course Road, Sector 62 and Dwarka Expressway. Yields are competitive, and transparent lease terms protect both tenants and landlords when the paperwork is done right." },
    { q:"What are the stamp duty and registration charges in Gurugram?", a:"Haryana levies stamp duty in the 7–8% band with a lower rate for women buyers, plus registration and mutation charges. Rates shift with state budgets and circle rates. We compute the exact all-in cost for your specific property and buyer profile at the time of transaction." },
    { q:"Can an NRI buy property in Gurugram?", a:"Yes. NRIs and Persons of Indian Origin can freely buy residential and commercial property in Gurugram without RBI approval. Funds must flow through NRE/NRO banking channels. Our NRI desk manages the entire remote purchase, including HRERA checks and documentation." },
    { q:"What does Vedhara Group charge to buy in Gurugram?", a:"We charge a disclosed advisory or brokerage fee, never a hidden margin. For portfolio-level investment advisory an optional flat retainer is available. The fee is clearly stated before we begin, in writing." },
  ],
  schemaName: "Real Estate Advisory in Gurugram",
  schemaAreaServed: ["Gurugram"],
  schemaDescription: "Independent real estate advisory across Gurugram: verified buying, selling, renting and investing in Golf Course Road, Dwarka Expressway, Sector 62 and Sohna Road with HRERA due diligence.",
};

/* ═══════════════════════════════════════════════════════════════
   NOIDA
   ═══════════════════════════════════════════════════════════════ */
const noida: CityPageData = {
  slug: "noida",
  name: "Noida",
  metaTitle: "Real Estate in Noida | Verified Property Advisory",
  metaDescription: "Buy, rent, sell or invest in Noida property with verified listings. Sector 150, Sector 44, Expressway & Greater Noida guidance with UP RERA due diligence.",
  heroVideo: "/videos/noida-city.mp4",
  heroPoster: img(31684126),
  eyebrow: "Noida",
  h1: "Real Estate in Noida.",
  h1Accent: "The Expressway Growth Story, Verified.",
  heroBody:
    "Sector 150, the Noida Expressway, Sector 44 and the emerging sector along the Yamuna, Noida offers some of Delhi NCR's best value-to-appreciation ratios. Every listing we show you is UP RERA-verified, price-benchmarked and supported by one named advisor throughout.",
  introEyebrow: "Why Noida",
  introTitle: "A Planned City.",
  introAccent: "Compounding Into a Prime Market.",
  introBody:
    "Noida was built on master-planning: wide sectors, green belts and a metro spine that now connects it to Delhi. The result is an orderly market where a 2 BHK near Sector 44 and a 4 BHK in Sector 150 are both investable, but for very different reasons. We help you pick the sector, the project and the price that fit your plan.",
  listingsEyebrow: "Featured Listings",
  listingsTitle: "Verified Properties",
  listingsAccent: "in Noida",
  listingsSub:
    "Every listing is UP RERA-verified and independently assessed through the Vedhara Verification Framework.",
  listings: [
    { id:"nd-01", title:"The Cullinan Heights", location:"Sector 150, Noida", price:"₹ 4.85 Cr", config:"4 BHK + Study", size:"2,450 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Golf Course View","Clubhouse Access","Vastu Compliant"], image:img(11729105), pos:"77%", alt:"The Cullinan Heights luxury high-rise illuminated at dusk in Sector 150, Noida" },
    { id:"nd-02", title:"Veda Forest Villas", location:"Sector 150, Noida", price:"₹ 7.50 Cr", config:"5 BHK Independent Floor", size:"3,800 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["RERA Registered","Park Facing","Private Pool","Modular Kitchen"], image:img(20581232), alt:"Veda Forest Villas luxury villas in Sector 150, Noida" },
    { id:"nd-03", title:"Magnolia Court", location:"Sector 44, Noida", price:"₹ 3.40 Cr", config:"3 BHK", size:"1,550 sq.ft.", type:"Residential", status:"Under Construction", highlights:["RERA Registered","Metro Proximity","Premium Location","High Appreciation"], image:img(35114454), pos:"80%", alt:"Magnolia Court premium apartments in Sector 44, Noida" },
    { id:"nd-04", title:"Aura Sky Villas", location:"Sector 152, Noida", price:"₹ 1.85 Cr", config:"3 BHK Villas", size:"1,900 sq.ft.", type:"Residential", status:"Just Launched", highlights:["Prestige Group","Gated Community","Clubhouse","Smart Home"], image:img(38341175), pos:"84%", alt:"Aura Sky Villas by Prestige Group in Sector 152, Noida" },
    { id:"nd-05", title:"Oakwood Estate", location:"Sector 77, Noida", price:"₹ 1.85 Cr", config:"300 sq.yds. Plot", size:"300 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Antriksh Group","Gated Community","Clear Title","Immediate Registry"], image:img(8330963), pos:"100%", alt:"Oakwood Estate gated community project by Antriksh Group in Sector 77, Noida" },
    { id:"nd-06", title:"Altius Tower", location:"Sector 152, Noida", price:"₹ 2.15 Cr", config:"3 BHK", size:"1,420 sq.ft.", type:"Residential", status:"Just Launched", highlights:["Brigade Group","Metro Proximity","Gated Community","Premium Finishes"], image:img(31325988), alt:"Altius Tower residential project by Brigade Group in Sector 152, Noida" },
    { id:"nd-07", title:"Retail Arcade", location:"Sector 18, Noida", price:"₹ 2.85 Cr", config:"1,200 sq.ft. Retail", size:"1,200 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Loading Bay","Signage Visible"], image:img(16140814), pos:"50%", alt:"Retail Arcade shopping arcade storefronts in Sector 18, Noida" },
    { id:"nd-08", title:"Palm Grove Apartments", location:"Sector 44, Noida", price:"₹ 42,000/mo", config:"2 BHK", size:"1,250 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Noida Sec 44","Metro 500m","Balcony","24hr Water"], image:img(27085225), pos:"61%", alt:"Palm Grove Apartments 2 BHK rental in Sector 44, Noida" },
    { id:"nd-09", title:"Lake Vista Heights", location:"Sector 150, Noida", price:"₹ 75,000/mo", config:"4 BHK", size:"2,200 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Lake View","Premium Finishes","Clubhouse","Modular Kitchen"], image:img(4792297), pos:"63%", alt:"Lake Vista Heights 4 BHK rental with lake view in Sector 150, Noida" },
    { id:"nd-10", title:"Commercial Plot, Sector 150", location:"Sector 150, Noida", price:"₹ 6.80 Cr", config:"2,500 sq.yds. Land", size:"2,500 sq.yds.", type:"Commercial", status:"Available for Sale", highlights:["Mixed-Use Zoning","Noida Authority","Corner Plot","Ideal for Mall"], image:img(7765190), pos:"65%", alt:"Commercial plot land parcel for mixed-use development in Sector 150, Noida" },
    { id:"nd-11", title:"Sovereign Villa", location:"Sector 150, Noida", price:"₹ 9.50 Cr", config:"6 BHK + Study", size:"5,800 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Lake Front","Private Garden","Home Theatre","Modular Kitchen"], image:img(16573669), pos:"72%", alt:"Sovereign Villa lakefront luxury villa in Sector 150, Noida" },
    { id:"nd-12", title:"Serene Garden Plot", location:"Sector 150, Noida", price:"₹ 4.50 Cr", config:"450 sq.yds.", size:"450 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Green Locality","Corner Plot","Immediate Registry"], image:img(15422584), pos:"50%", alt:"Serene Garden Plot green residential plot in Sector 150, Noida" },
    { id:"nd-13", title:"Emerald County", location:"Sector 150, Noida", price:"₹ 2.45 Cr", config:"3 BHK", size:"1,520 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Tata Housing","Gated Community","Clubhouse","Smart Home"], image:img(17719719), pos:"67%", alt:"Emerald County residential project by Tata Housing in Sector 150, Noida" },
    { id:"nd-14", title:"Santorini Bay", location:"Sector 47, Noida", price:"₹ 1.25 Cr", config:"2 BHK", size:"1,150 sq.ft.", type:"Residential", status:"Just Launched", highlights:["Sobha Group","Affordable Luxury","Gated Community","Clubhouse"], image:img(30381835), pos:"82%", alt:"Santorini Bay residential project by Sobha in Sector 47, Noida" },
    { id:"nd-15", title:"Galleria Retail Hub", location:"Sector 18, Noida", price:"₹ 1,80,000/mo", config:"2,400 sq.ft. Retail", size:"2,400 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Signage Visible","Car Parking"], image:img(7768552), pos:"50%", alt:"Galleria Retail Hub retail space in Sector 18, Noida" },
    { id:"nd-16", title:"Platinum Business Park", location:"Sector 62, Noida", price:"₹ 4.20 Cr", config:"3,000 sq.ft. Office", size:"3,000 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["IT Corridor","Deal Floor","24hr Security","100+ Parking"], image:img(941053), pos:"85%", alt:"Platinum Business Park office space in Sector 62, Noida" },
    { id:"nd-17", title:"Sunrise Residency", location:"Sector 137, Noida", price:"₹ 1.65 Cr", config:"3 BHK", size:"1,350 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Gated Community","Clubhouse","Metro Proposed","Premium Finishes"], image:img(30368780), pos:"74%", alt:"Sunrise Residency apartments in Sector 137, Noida" },
    { id:"nd-18", title:"Aspen Heights", location:"Sector 150, Noida", price:"₹ 3.95 Cr", config:"4 BHK", size:"2,100 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Golf Course View","Clubhouse","Gated Community","Vastu Compliant"], image:img(20538974), pos:"68%", alt:"Aspen Heights luxury apartments in Sector 150, Noida" },
    { id:"nd-19", title:"Crown Plaza Residences", location:"Sector 150, Noida", price:"₹ 2.75 Cr", config:"3 BHK", size:"1,680 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Gated Community","Clubhouse","Smart Home","Premium Finishes"], image:img(5711363), pos:"100%", alt:"Crown Plaza Residences apartments in Sector 150, Noida" },
    { id:"nd-20", title:"Industrial Shed Complex", location:"Noida Phase 2", price:"₹ 4.20 Cr", config:"8,500 sq.ft.", size:"8,500 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["NH-24 Access","Heavy Power","Warehouse","Loading Dock"], image:img(12347763), pos:"50%", alt:"Industrial Shed Complex warehouse in Noida Phase 2" },
  ],
  microMarkets: {
    eyebrow: "The Micro-Markets",
    title: "Sectors With Purpose.",
    accent: "One Standard of Care.",
    items: [
      { name:"Sector 150 & 152", tag:"Premium New", desc:"Noida's newest premium residential belt with golf-course views, lakefront villas and high-rise towers. Pricing is higher but infrastructure is complete and appreciation has been steady.", points:["Premium high-rises & villas","Golf course & lake frontage","Steady appreciation"] },
      { name:"Sector 44 & the Core", tag:"Established", desc:"Noida's mature residential core with metro connectivity, schools and shopping. Inventory is older and resale-driven; title chains and redevelopment matter most here.", points:["Metro connectivity","Established infrastructure","Resale-heavy market"] },
      { name:"Sector 18 & the Hub", tag:"Commercial Heart", desc:"Noida's retail and commercial centre around the famous Sector 18 market and DLF mall. High-footfall retail and office space with strong tenant demand.", points:["Retail & office demand","High footfall","DLF mall catchment"] },
      { name:"Noida Expressway", tag:"High Visibility", desc:"The corridor between Noida and Greater Noida lined with IT parks and premium residential projects. Employment-driven demand keeps absorption healthy.", points:["IT employment base","Premium residential","Strong absorption"] },
      { name:"Sector 137 & 168", tag:"Emerging", desc:"The fast-developing southern sectors with newer projects and lower entry prices. Growth potential is high; delivery and approval checks are essential.", points:["Lower entry prices","High growth potential","Approval checks vital"] },
    ],
  },
  authorities: {
    eyebrow: "Authority Guide",
    title: "Who Approves, Who Registers,",
    accent: "and Who You Can Trust",
    items: [
      { title:"Uttar Pradesh RERA", applies:"Noida", mono:"UP", image:img(33217250), pos:"50% 70%", alt:"Uttar Pradesh RERA registration office for Noida real estate projects", body:"All projects in Noida and Greater Noida must register with UP RERA (rera.up.gov.in). We verify registration numbers, quarterly progress reports and complaint history on the official portal before any listing goes live." },
      { title:"Noida Authority", applies:"Sectors & Approvals", mono:"NO", image:img(34968154), pos:"100%", alt:"Noida Authority for sector approvals and plot allotments", body:"The Noida Authority sanctions layouts, allots plots and issues NOCs across Noida. We confirm sector approvals, allotment chains and any dues before recommending resale plots or commercial space." },
      { title:"Yamuna Expressway Authority (YEIDA)", applies:"Greater Noida West & Yamuna", mono:"YE", image:img(33848325), pos:"79%", alt:"Yamuna Expressway Industrial Development Authority for approvals", body:"Projects along the Yamuna Expressway fall under YEIDA. We verify the sanctioned layout, approval status and whether the unit sits inside an approved sector before any recommendation." },
    ],
  },
  guide: {
    eyebrow: "Market Guide",
    title: "Before You Buy in Noida",
    accent: "Three Things That Actually Matter",
    items: [
      { t:"Compare the Sector, Not Just the Tower", d:"Noida's value is highly sector-specific. The same builder's tower can trade very differently across sectors. We benchmark against registered transactions in the exact sector before advising." },
      { t:"Verify UP RERA Status", d:"RERA registration and quarterly filings are public on rera.up.gov.in. We confirm the number, delivery timeline and any complaints so you never rely on a builder's word alone." },
      { t:"Check Plots for Dues & Title", d:"For plotted development, we verify the Noida Authority allotment chain, outstanding dues and conversion status. A clean registry is the difference between an asset and a liability." },
    ],
  },
  faqTitle: "Noida Questions, Answered Straight",
  faqs: [
    { q:"Is Noida a good place to invest in property in 2026?", a:"Noida offers strong value-to-appreciation ratios, especially in Sector 150, Sector 152 and along the Expressway. UP RERA oversight, metro connectivity and planned infrastructure make it one of Delhi NCR's most orderly markets for both end-users and investors." },
    { q:"Which sector in Noida is best for buying a house?", a:"It depends on budget and purpose. Sector 150 and 152 suit premium buyers and investors; Sector 44 and 137 suit families wanting established infrastructure; the Expressway corridor suits those who want growth with employment proximity. We model the trade-offs for you." },
    { q:"Is Noida property freehold or leasehold?", a:"Most Noida residential projects are freehold with clear title. Commercial plots and some older allotments carry leasehold or licence terms from the Noida Authority. We verify tenure from the title chain and authority records before recommending." },
    { q:"What is the difference between Noida and Greater Noida?", a:"Noida is more established with higher prices and better connectivity, while Greater Noida offers larger floor plans and lower entry prices with a longer growth horizon. We help you decide based on your timeline and budget." },
    { q:"Are there good rental options in Noida?", a:"Yes. Noida's IT parks and corporate belt around Sector 44, Sector 62 and the Expressway keep rental demand strong. Transparent lease terms and verified tenants/landlords are the key to a smooth experience." },
    { q:"What are the stamp duty and registration charges in Noida?", a:"Uttar Pradesh levies stamp duty in the 7% band with a lower rate for women buyers, plus registration and mutation charges. We compute the exact all-in cost for your property and profile at the time of transaction." },
    { q:"Can an NRI buy property in Noida?", a:"Yes. NRIs can freely buy residential and commercial property in Noida through NRE/NRO banking channels, without RBI approval. Our NRI desk manages the full remote purchase, including UP RERA checks and documentation." },
    { q:"How does Vedhara verify Noida listings?", a:"Every listing passes our five-check framework: UP RERA registration, builder delivery history, project-level approvals, price-to-locality fairness and title documents. Results are published on the listing page, not hidden in fine print." },
  ],
  schemaName: "Real Estate Advisory in Noida",
  schemaAreaServed: ["Noida"],
  schemaDescription: "Independent real estate advisory across Noida: verified buying, selling, renting and investing in Sector 150, Sector 44, Sector 137 and the Expressway corridor with UP RERA due diligence.",
};

/* ═══════════════════════════════════════════════════════════════
   GREATER NOIDA
   ═══════════════════════════════════════════════════════════════ */
const greaterNoida: CityPageData = {
  slug: "greater-noida",
  name: "Greater Noida",
  metaTitle: "Real Estate in Greater Noida | Verified Property Advisory",
  metaDescription: "Buy plots, apartments and new projects in Greater Noida with verified listings. GNIDA & YEIDA guidance, UP RERA due diligence and price benchmarking.",
  heroVideo: "/videos/greater-noida-city.mp4",
  heroPoster: img(15422584),
  eyebrow: "Greater Noida",
  h1: "Real Estate in Greater Noida.",
  h1Accent: "Bigger Plots, Smarter Value, Verified.",
  heroBody:
    "Greater Noida is where NCR's value-seeking buyer finds space: wider floor plans, plotted townships and a new expressway spine. From GNIDA-approved sectors to Yamuna Expressway projects, we verify every listing and benchmark pricing to what the market actually pays.",
  introEyebrow: "Why Greater Noida",
  introTitle: "A Canvas of New Development.",
  introAccent: "With Room to Grow, and Rules to Check.",
  introBody:
    "Greater Noida's appeal is space and value, but its risk is unapproved colonies and delivery timelines. The GNIDA-approved sectors offer plotted and apartment options at entry-friendly prices, while the Yamuna belt rewards patient investors. We make sure you buy inside the plan, not outside it.",
  listingsEyebrow: "Featured Listings",
  listingsTitle: "Verified Properties",
  listingsAccent: "in Greater Noida",
  listingsSub:
    "Every listing is UP RERA-verified, GNIDA/YEIDA-approved and independently assessed through the Vedhara Verification Framework.",
  listings: [
    { id:"gn-01", title:"Oakwood Estate", location:"Sector 77, Greater Noida", price:"₹ 1.85 Cr", config:"300 sq.yds. Plot", size:"300 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["GNIDA Approved","Gated Community","Clear Title","Immediate Registry"], image:img(8330963), pos:"100%", alt:"Oakwood Estate gated community plots in Sector 77, Greater Noida" },
    { id:"gn-02", title:"Green Valley Plots", location:"Sector 16B, Greater Noida", price:"₹ 1.35 Cr", config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["GNIDA Approved","Corner Plot","Clear Title","Immediate Registry"], image:img(3030307), pos:"50%", alt:"Green Valley Plots green residential plots in Sector 16B, Greater Noida" },
    { id:"gn-03", title:"Aura Sky Villas", location:"Sector 152, Greater Noida West", price:"₹ 1.85 Cr", config:"3 BHK Villas", size:"1,900 sq.ft.", type:"Residential", status:"Just Launched", highlights:["Prestige Group","Gated Community","Clubhouse","Smart Home"], image:img(38341175), pos:"84%", alt:"Aura Sky Villas new launch villas in Greater Noida West" },
    { id:"gn-04", title:"Altius Tower", location:"Sector 152, Greater Noida West", price:"₹ 2.15 Cr", config:"3 BHK", size:"1,420 sq.ft.", type:"Residential", status:"Just Launched", highlights:["Brigade Group","Metro Proximity","Gated Community","Premium Finishes"], image:img(31325988), alt:"Altius Tower residential project in Greater Noida West" },
    { id:"gn-05", title:"Yamuna Gardens", location:"Sector 20, Yamuna Expressway", price:"₹ 1.20 Cr", config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["YEIDA Approved","Gated Community","Clear Title","High Appreciation"], image:img(7793089), pos:"59%", alt:"Yamuna Gardens residential plots on the Yamuna Expressway" },
    { id:"gn-06", title:"Santorini Bay", location:"Sector 47, Greater Noida West", price:"₹ 1.25 Cr", config:"2 BHK", size:"1,150 sq.ft.", type:"Residential", status:"Just Launched", highlights:["Sobha Group","Affordable Luxury","Gated Community","Clubhouse"], image:img(30381835), pos:"82%", alt:"Santorini Bay residential project in Greater Noida West" },
    { id:"gn-07", title:"Sunrise Residency", location:"Sector 137, Greater Noida", price:"₹ 1.65 Cr", config:"3 BHK", size:"1,350 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Gated Community","Clubhouse","Metro Proposed","Premium Finishes"], image:img(30368780), pos:"74%", alt:"Sunrise Residency apartments in Greater Noida" },
    { id:"gn-08", title:"Crown Plaza Residences", location:"Sector 150, Greater Noida West", price:"₹ 2.75 Cr", config:"3 BHK", size:"1,680 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Gated Community","Clubhouse","Smart Home","Premium Finishes"], image:img(5711363), pos:"100%", alt:"Crown Plaza Residences apartments in Greater Noida West" },
    { id:"gn-09", title:"Amaryllis Residences", location:"Sector 152, Greater Noida West", price:"₹ 6.20 Cr", config:"3 BHK + Servant", size:"2,150 sq.ft.", type:"Luxury", status:"Possession Dec 2026", highlights:["RERA Registered","Corner Unit","Private Terrace","Smart Home"], image:img(31684126), pos:"100%", alt:"Amaryllis Residences luxury apartments in Greater Noida West" },
    { id:"gn-10", title:"One Golden Mile", location:"Sector 62, Greater Noida", price:"₹ 8.50 Cr", config:"4,500 sq.ft. Office", size:"4,500 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["RERA Registered","LEED Platinum","24hr Security","100+ Car Parking"], image:img(5859963), pos:"100%", alt:"One Golden Mile commercial office building in Greater Noida" },
    { id:"gn-11", title:"Knowledge Park Offices", location:"Knowledge Park V, Greater Noida", price:"₹ 2.40 Cr", config:"2,200 sq.ft. Office", size:"2,200 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Education Hub","Deal Floor","24hr Security","Parking"], image:img(946310), pos:"50%", alt:"Knowledge Park commercial office space in Greater Noida" },
    { id:"gn-12", title:"Retail Arcade", location:"Sector Alpha II, Greater Noida", price:"₹ 1.85 Cr", config:"1,200 sq.ft. Retail", size:"1,200 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Signage Visible","Loading Bay"], image:img(16140814), pos:"50%", alt:"Retail Arcade shopping arcade in Greater Noida" },
    { id:"gn-13", title:"Lake Vista Heights", location:"Sector 150, Greater Noida West", price:"₹ 75,000/mo", config:"4 BHK", size:"2,200 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Lake View","Premium Finishes","Clubhouse","Modular Kitchen"], image:img(4792297), pos:"63%", alt:"Lake Vista Heights rental apartments in Greater Noida West" },
    { id:"gn-14", title:"Palm Grove Apartments", location:"Sector 44, Greater Noida", price:"₹ 42,000/mo", config:"2 BHK", size:"1,250 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Metro 500m","Balcony","24hr Water","Parking"], image:img(27085225), pos:"61%", alt:"Palm Grove Apartments rental in Greater Noida" },
    { id:"gn-15", title:"Aspen Heights", location:"Sector 150, Greater Noida West", price:"₹ 3.95 Cr", config:"4 BHK", size:"2,100 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Golf Course View","Clubhouse","Gated Community","Vastu Compliant"], image:img(20538974), pos:"68%", alt:"Aspen Heights luxury apartments in Greater Noida West" },
    { id:"gn-16", title:"Emerald County", location:"Sector 150, Greater Noida West", price:"₹ 2.45 Cr", config:"3 BHK", size:"1,520 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Tata Housing","Gated Community","Clubhouse","Smart Home"], image:img(17719719), pos:"67%", alt:"Emerald County residential project in Greater Noida West" },
    { id:"gn-17", title:"Industrial Shed Complex", location:"Greater Noida West", price:"₹ 3.80 Cr", config:"8,500 sq.ft.", size:"8,500 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Expressway Access","Heavy Power","Warehouse","Loading Dock"], image:img(12347763), pos:"50%", alt:"Industrial Shed Complex warehouse in Greater Noida West" },
    { id:"gn-18", title:"Serene Garden Plot", location:"Sector 150, Greater Noida West", price:"₹ 4.50 Cr", config:"450 sq.yds.", size:"450 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Green Locality","Corner Plot","Immediate Registry"], image:img(15422584), pos:"50%", alt:"Serene Garden Plot green residential plot in Greater Noida West" },
    { id:"gn-19", title:"Skydeck Residence", location:"Sector 62, Greater Noida", price:"₹ 7.95 Cr", config:"4 BHK Penthouse", size:"3,100 sq.ft.", type:"Luxury", status:"Under Construction", highlights:["Sky Deck","Private Elevator","Wine Cellar","Smart Home"], image:img(8082227), pos:"64%", alt:"Skydeck Residence penthouse in Greater Noida" },
    { id:"gn-20", title:"Veda Forest Villas", location:"Sector 150, Greater Noida West", price:"₹ 7.50 Cr", config:"5 BHK Independent Floor", size:"3,800 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["RERA Registered","Park Facing","Private Pool","Modular Kitchen"], image:img(20581232), alt:"Veda Forest Villas luxury villas in Greater Noida West" },
  ],
  microMarkets: {
    eyebrow: "The Micro-Markets",
    title: "Sectors Built for Growth.",
    accent: "One Standard of Care.",
    items: [
      { name:"Greater Noida West (Noida Extension)", tag:"High Demand", desc:"The most active residential belt with metro extension and affordable premium projects. High absorption keeps resale liquid; delivery timelines and approvals are the key checks.", points:["Metro extension driving demand","Affordable premium supply","Liquid resale market"] },
      { name:"Greater Noida Main", tag:"Planned Core", desc:"The original planned sectors with wider plots, institutions and the F1 track area. Plotted development dominates; GNIDA approval and title checks are essential.", points:["Wide plots & institutions","GNIDA-approved sectors","Plotted-led market"] },
      { name:"Yamuna Expressway", tag:"Long Horizon", desc:"The expressway corridor towards Jewar Airport and the upcoming film city. Discovery-stage pricing with strong long-term potential; approvals and liquidity are the risks to manage.", points:["Jewar Airport upside","Discovery-stage pricing","Patience required"] },
      { name:"Knowledge Park & Institution Belt", tag:"Education Hub", desc:"Clusters of universities and institutions create steady rental demand for student and faculty housing. Compact units and predictable yields define this micro-market.", points:["Steady rental demand","Compact, affordable units","Predictable yields"] },
      { name:"Commercial & IT Hubs", tag:"Emerging", desc:"Office and retail space along the expressway and Alpha sectors is maturing as employment follows infrastructure. Zoning and parking are the diligence priorities.", points:["Maturing office supply","Expressway visibility","Zoning checks"] },
    ],
  },
  authorities: {
    eyebrow: "Authority Guide",
    title: "Who Approves, Who Registers,",
    accent: "and Who You Can Trust",
    items: [
      { title:"GNIDA (Greater Noida Authority)", applies:"Greater Noida", mono:"GN", image:img(34968154), pos:"100%", alt:"Greater Noida Industrial Development Authority for sector approvals", body:"GNIDA sanctions layouts and allots plots across Greater Noida. We verify the sector's sanctioned layout, the project's approval status and any outstanding dues before recommending anything." },
      { title:"YEIDA (Yamuna Expressway)", applies:"Yamuna Corridor", mono:"YE", image:img(33848325), pos:"79%", alt:"Yamuna Expressway Industrial Development Authority for approvals", body:"Projects along the Yamuna Expressway fall under YEIDA. We confirm the sanctioned layout and whether the unit sits inside an approved sector before any recommendation." },
      { title:"Uttar Pradesh RERA", applies:"All Projects", mono:"UP", image:img(33217250), pos:"50% 70%", alt:"Uttar Pradesh RERA registration office for Greater Noida projects", body:"All new projects must register with UP RERA (rera.up.gov.in). We verify registration numbers, quarterly progress reports and complaint history on the official portal." },
    ],
  },
  guide: {
    eyebrow: "Market Guide",
    title: "Before You Buy in Greater Noida",
    accent: "Three Things That Actually Matter",
    items: [
      { t:"Buy Inside the Approved Plan", d:"GNIDA and YEIDA sanction specific sectors. Buying outside the sanctioned plan carries serious title and approval risk. Our first check is always the approval status." },
      { t:"Verify Delivery Timelines", d:"Greater Noida's growth story depends on builders delivering. We review RERA filings, past delivery and complaint history so you don't tie up capital in a stalled project." },
      { t:"Check Plots for Dues & Clear Title", d:"For plotted development, we verify the authority allotment chain, outstanding dues and clear registry. The right plot appreciates; the wrong one is a long legal problem." },
    ],
  },
  faqTitle: "Greater Noida Questions, Answered Straight",
  faqs: [
    { q:"Is Greater Noida good for investment in 2026?", a:"Yes, for buyers with a medium-to-long horizon. Greater Noida offers larger plots and lower entry prices than Noida, and the Jewar Airport and metro extensions add real upside. Liquidity takes time to mature, so it suits investors who don't need a quick exit." },
    { q:"Is Noida or Greater Noida better for buying property?", a:"Noida is more established with higher prices and better connectivity; Greater Noida offers more space and value with a longer growth runway. We help you choose based on budget, timeline and whether you need rental income now." },
    { q:"What is the risk of buying in Greater Noida?", a:"The main risks are unapproved colonies and delayed delivery. Buying inside a GNIDA or YEIDA-approved sector with a UP RERA-registered builder mitigates both. Our verification framework is designed exactly around these two risks." },
    { q:"Is property in Greater Noida freehold or leasehold?", a:"Most GNIDA-approved residential plots and apartments are freehold with clear title. Some commercial and institutional allotments carry lease terms. We verify tenure from the title chain and authority records before recommending." },
    { q:"Are plots a good investment in Greater Noida?", a:"Plots in approved sectors have been a consistent value proposition, especially along the Yamuna Expressway with the Jewar Airport upside. The key is approval status, clear title and holding period. We benchmark against recent registered plot sales in the same sector." },
    { q:"What are the stamp duty and registration charges in Greater Noida?", a:"Greater Noida follows Uttar Pradesh stamp duty (around 7% with a lower rate for women buyers) plus registration and mutation charges. We compute the exact all-in cost for your property at the time of transaction." },
    { q:"Can an NRI buy property in Greater Noida?", a:"Yes. NRIs can buy residential and commercial property in Greater Noida through NRE/NRO channels without RBI approval. Our NRI desk handles the full remote purchase, including GNIDA/YEIDA and UP RERA checks." },
    { q:"Which sector in Greater Noida is best?", a:"Greater Noida West (Noida Extension) is best for apartments with metro access; Greater Noida Main suits plotted buyers; the Yamuna Expressway suits long-horizon investors. We recommend based on your specific goals and budget." },
  ],
  schemaName: "Real Estate Advisory in Greater Noida",
  schemaAreaServed: ["Greater Noida"],
  schemaDescription: "Independent real estate advisory across Greater Noida: verified buying, selling, renting and investing in GNIDA and YEIDA sectors with UP RERA due diligence.",
};

/* ═══════════════════════════════════════════════════════════════
   SOUTH DELHI
   ═══════════════════════════════════════════════════════════════ */
const southDelhi: CityPageData = {
  slug: "south-delhi",
  name: "South Delhi",
  metaTitle: "Real Estate in South Delhi | Verified Property Advisory",
  metaDescription: "Buy luxury homes, penthouses and independent floors in South Delhi. Lutyens', Vasant Vihar & Greater Kailash guidance with verified title and approvals.",
  heroVideo: "/videos/south-delhi-city.mp4",
  heroPoster: img(20418771),
  eyebrow: "South Delhi",
  h1: "Real Estate in South Delhi.",
  h1Accent: "The Address That Needs No Introduction.",
  heroBody:
    "Lutyens' Delhi, Vasant Vihar, Greater Kailash, Defence Colony, South Delhi is the capital's most coveted residential market. Scarcity, legacy titles and high ticket sizes make independent verification non-negotiable. We verify title, approvals and price on every South Delhi listing.",
  introEyebrow: "Why South Delhi",
  introTitle: "Scarcity, Legacy and Status.",
  introAccent: "A Market That Demands Precision.",
  introBody:
    "South Delhi property is as much about the address as the asset. Inventory is scarce, titles are complex and prices are among the highest in the country. Whether you want a penthouse in Greater Kailash, an independent floor in Defence Colony or a heritage estate, our job is to make sure the title, the approvals and the price are all exactly as represented.",
  listingsEyebrow: "Featured Listings",
  listingsTitle: "Verified Properties",
  listingsAccent: "in South Delhi",
  listingsSub:
    "Every listing is title-verified and independently assessed through the Vedhara Verification Framework.",
  listings: [
    { id:"sd-01", title:"The Claridge Estate", location:"Jubilee Hills, Delhi", price:"₹ 18.50 Cr", config:"7 BHK + Guest Wing", size:"8,200 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Prime South Delhi","Heritage Architecture","Landscaped Lawns","Staff Quarters"], image:img(33985273), pos:"31%", alt:"The Claridge Estate heritage luxury mansion in Jubilee Hills, Delhi" },
    { id:"sd-02", title:"Magnolia Mansion", location:"Greater Kailash II, Delhi", price:"₹ 14.20 Cr", config:"5 BHK Independent Floor", size:"4,500 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["GK II Address","Rooftop Terrace","Puja Room","Family Lounge"], image:img(1630114), pos:"16%", alt:"Magnolia Mansion luxury independent floor in Greater Kailash II, Delhi" },
    { id:"sd-03", title:"Magnolia Court", location:"Greater Kailash II, Delhi", price:"₹ 3.40 Cr", config:"3 BHK", size:"1,550 sq.ft.", type:"Residential", status:"Under Construction", highlights:["RERA Registered","South Delhi","Premium Location","High Appreciation"], image:img(35114454), pos:"80%", alt:"Magnolia Court premium apartments in Greater Kailash II, Delhi" },
    { id:"sd-04", title:"Vasant Residency", location:"Vasant Kunj, Delhi", price:"₹ 65,000/mo", config:"3 BHK + Servant", size:"1,750 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["South Delhi","Lawns & Park","Covered Parking","Close to Airport"], image:img(34623003), pos:"80%", alt:"Vasant Residency 3 BHK rental in Vasant Kunj, Delhi" },
    { id:"sd-05", title:"One Golf Course Penthouse", location:"Golf Course Road, Gurugram", price:"₹ 12.80 Cr", config:"5 BHK + Pool", size:"4,200 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["HRERA Registered","Panoramic View","Private Terrace","Butler Service"], image:img(20418771), alt:"One Golf Course Penthouse luxury penthouse near South Delhi" },
    { id:"sd-06", title:"Sovereign Villa", location:"Sector 150, Noida", price:"₹ 9.50 Cr", config:"6 BHK + Study", size:"5,800 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Lake Front","Private Garden","Home Theatre","Modular Kitchen"], image:img(16573669), pos:"72%", alt:"Sovereign Villa lakefront luxury villa" },
    { id:"sd-07", title:"Skydeck Residence", location:"Sector 62, Gurugram", price:"₹ 7.95 Cr", config:"4 BHK Penthouse", size:"3,100 sq.ft.", type:"Luxury", status:"Under Construction", highlights:["Sky Deck","Private Elevator","Wine Cellar","Smart Home"], image:img(8082227), pos:"64%", alt:"Skydeck Residence luxury penthouse" },
    { id:"sd-08", title:"Defence Colony Floor", location:"Defence Colony, Delhi", price:"₹ 8.75 Cr", config:"4 BHK Independent Floor", size:"2,900 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Prime Address","Wide Frontage","Family Lounge","Rooftop Terrace"], image:img(19516616), pos:"100%", alt:"Defence Colony independent floor in South Delhi" },
    { id:"sd-09", title:"Amaryllis Residences", location:"Golf Course Road, Gurugram", price:"₹ 6.20 Cr", config:"3 BHK + Servant", size:"2,150 sq.ft.", type:"Luxury", status:"Possession Dec 2026", highlights:["RERA Registered","Corner Unit","Private Terrace","Smart Home"], image:img(31684126), pos:"100%", alt:"Amaryllis Residences luxury apartments" },
    { id:"sd-10", title:"Vasant Vihar Penthouse", location:"Vasant Vihar, Delhi", price:"₹ 16.80 Cr", config:"4 BHK Penthouse", size:"3,800 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Prime Address","Panoramic View","Private Terrace","Butler Service"], image:img(323780), pos:"100%", alt:"Vasant Vihar penthouse in South Delhi" },
    { id:"sd-11", title:"Greater Kailash I Villa", location:"Greater Kailash I, Delhi", price:"₹ 22.50 Cr", config:"6 BHK Villa", size:"6,500 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["GK I Address","Landscaped Lawns","Private Pool","Staff Quarters"], image:img(12359235), pos:"89%", alt:"Greater Kailash I luxury villa in South Delhi" },
    { id:"sd-12", title:"Hauz Khas Enclave Floor", location:"Hauz Khas Enclave, Delhi", price:"₹ 7.90 Cr", config:"3 BHK Independent Floor", size:"2,400 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Hauz Khas Address","Green Surroundings","Rooftop Terrace","Family Lounge"], image:img(323781), pos:"92%", alt:"Hauz Khas Enclave independent floor in South Delhi" },
    { id:"sd-13", title:"Saket Residency", location:"Saket, Delhi", price:"₹ 4.85 Cr", config:"3 BHK", size:"1,750 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Saket Address","Metro Proximity","Gated Complex","Premium Finishes"], image:img(6699988), pos:"72%", alt:"Saket Residency apartments in South Delhi" },
    { id:"sd-14", title:"Nehru Place Offices", location:"Nehru Place, Delhi", price:"₹ 3.20 Cr", config:"1,800 sq.ft. Office", size:"1,800 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Business Hub","Deal Floor","24hr Security","Parking"], image:img(290275), pos:"72%", alt:"Nehru Place commercial office space in South Delhi" },
    { id:"sd-15", title:"South Extension Retail", location:"South Extension II, Delhi", price:"₹ 5.60 Cr", config:"1,500 sq.ft. Retail", size:"1,500 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Signage Visible","Loading Bay"], image:img(8465844), pos:"100%", alt:"South Extension retail space in South Delhi" },
    { id:"sd-16", title:"Lodhi Road Residence", location:"Lodhi Road, Delhi", price:"₹ 11.40 Cr", config:"4 BHK", size:"3,200 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Lodhi Road Address","Golf Course Proximity","Premium Finishes","Family Lounge"], image:img(28537915), pos:"81%", alt:"Lodhi Road premium residence in South Delhi" },
    { id:"sd-17", title:"Malcha Marg Villa", location:"Malcha Marg, Delhi", price:"₹ 26.00 Cr", config:"6 BHK Villa", size:"7,800 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Lutyens' Address","Heritage Charm","Landscaped Lawns","Staff Quarters"], image:img(740587), pos:"100%", alt:"Malcha Marg luxury villa in Lutyens' Delhi" },
    { id:"sd-18", title:"Vasant Kunj Apartment", location:"Vasant Kunj, Delhi", price:"₹ 5.20 Cr", config:"4 BHK", size:"2,100 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["South Delhi","Gated Complex","Clubhouse","Covered Parking"], image:img(7189284), pos:"70%", alt:"Vasant Kunj apartment in South Delhi" },
    { id:"sd-19", title:"Green Park Floor", location:"Green Park, Delhi", price:"₹ 6.40 Cr", config:"3 BHK Independent Floor", size:"2,200 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Green Park Address","Rooftop Terrace","Puja Room","Family Lounge"], image:img(18078684), pos:"57%", alt:"Green Park independent floor in South Delhi" },
    { id:"sd-20", title:"Shanti Niketan Residence", location:"Shanti Niketan, Delhi", price:"₹ 9.60 Cr", config:"4 BHK Independent Floor", size:"3,100 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Prime Address","Wide Frontage","Family Lounge","Rooftop Terrace"], image:img(27953061), pos:"100%", alt:"Shanti Niketan independent floor in South Delhi" },
  ],
  microMarkets: {
    eyebrow: "The Micro-Markets",
    title: "Each Address, a Distinct Asset.",
    accent: "One Standard of Care.",
    items: [
      { name:"Lutyens' Delhi", tag:"Iconic", desc:"The capital's most prestigious address, home to heritage bungalows and official residences. Inventory is extremely scarce, titles are complex, and every transaction warrants deep legal review.", points:["Heritage bungalows & estates","Extremely scarce supply","Complex legacy titles"] },
      { name:"Greater Kailash & Defence Colony", tag:"Premium", desc:"Two of the most sought-after residential colonies with wide roads, luxury floors and high-end retail. Independent floors and penthouses dominate the premium segment.", points:["Independent floors & penthouses","Wide roads & green blocks","High-end retail catchment"] },
      { name:"Vasant Vihar & Vasant Kunj", tag:"Established", desc:"South Delhi's leafy, established colonies close to the airport and diplomatic enclave. Family homes and long-term residents define a stable, low-turnover market.", points:["Close to airport & embassies","Family-oriented & stable","Low turnover, steady value"] },
      { name:"Hauz Khas & Green Park", tag:"Lifestyle", desc:"Trendy, high-street neighbourhoods with a mix of modern floors, cafes and galleries. Younger, design-led buyers drive a dynamic premium segment.", points:["High-street lifestyle","Design-led premium buyers","Modern floors & penthouses"] },
      { name:"Nehru Place & South Ex", tag:"Commercial", desc:"South Delhi's commercial heart, Nehru Place for offices and South Extension for retail. Well-connected, high-footfall assets with strong rental demand.", points:["Office & retail demand","High footfall & connectivity","Strong rentals"] },
    ],
  },
  authorities: {
    eyebrow: "Authority Guide",
    title: "Who Approves, Who Registers,",
    accent: "and Who You Can Trust",
    items: [
      { title:"Delhi RERA (DDA RERA)", applies:"Delhi", mono:"DR", image:img(33217250), pos:"50% 70%", alt:"Delhi RERA registration office for South Delhi projects", body:"Delhi has a functional RERA authority (rera.delhi.gov.in). We verify registration, filings and complaint history for projects, while resale and independent floors rely on title-chain and civic-record verification." },
      { title:"MCD & Civic Approvals", applies:"Colonies & Buildings", mono:"MC", image:img(34968154), pos:"100%", alt:"Municipal Corporation of Delhi for building approvals", body:"Building sanctions, completion certificates and regularisation status for South Delhi colonies fall under MCD. We verify the sanctioned plan and any unauthorised-construction issues." },
      { title:"DDA & Land Records", applies:"Title & Land Use", mono:"DD", image:img(33848325), pos:"79%", alt:"Delhi Development Authority for land records and title", body:"DDA manages Delhi's land use and many colony layouts. We verify the registered title chain, lease/conversion status and land-use classification for independent floors and villas." },
    ],
  },
  guide: {
    eyebrow: "Market Guide",
    title: "Before You Buy in South Delhi",
    accent: "Three Things That Actually Matter",
    items: [
      { t:"Verify the Title Chain Deeply", d:"South Delhi titles are often decades old with multiple transfers, family partitions and legacy complexities. We trace the registered chain and flag anything adverse before you commit." },
      { t:"Check Approvals & Regularisation", d:"Many South Delhi properties involve DDA, MCD and land-use questions. We verify sanctioned plans, completion certificates and regularisation status so your asset is clean." },
      { t:"Benchmark Against Real Sales", d:"Asking prices in South Delhi can carry a status premium far beyond market value. We compare against recent registered transactions in the same colony before advising." },
    ],
  },
  faqTitle: "South Delhi Questions, Answered Straight",
  faqs: [
    { q:"Is South Delhi property a good investment?", a:"Yes, South Delhi remains one of India's most stable and prestigious residential markets. Scarcity protects value over time, though entry prices are high and capital appreciation is steady rather than spectacular. It suits long-term holders and those who value the address itself." },
    { q:"Which is the best area in South Delhi to buy?", a:"Lutyens' Delhi is the most prestigious; Greater Kailash and Defence Colony offer premium independent floors; Vasant Vihar suits families; Hauz Khas attracts a younger, design-led buyer. The best area depends on your budget, lifestyle and holding horizon." },
    { q:"Is South Delhi property freehold or leasehold?", a:"It varies. Many Lutyens' and DDA colony properties have leasehold or converted-freehold tenure, while independent floors in colonies like Defence Colony and Greater Kailash are often freehold. We verify the exact tenure from the title chain, never the brochure." },
    { q:"What should I check before buying a South Delhi independent floor?", a:"Check the registered title chain, the builder-buyer agreement, municipal sanction, floor-area ratio and whether the floor has proper access and common-area arrangements. We run all of these checks before you commit." },
    { q:"Are there good rental options in South Delhi?", a:"Yes. South Delhi's corporate, diplomatic and expatriate demand keeps rentals strong, especially in Vasant Vihar, Vasant Kunj, Greater Kailash and Defence Colony. Yields are moderate but tenants are stable." },
    { q:"What are the stamp duty and registration charges in Delhi?", a:"Delhi levies stamp duty in the 6% band plus registration and transfer charges, with a lower rate for women buyers. We compute the exact all-in cost for your property and buyer profile at the time of transaction." },
    { q:"Can an NRI buy property in South Delhi?", a:"Yes. NRIs can buy residential and commercial property in Delhi through NRE/NRO channels without RBI approval, except agricultural land and farmhouses. Our NRI desk manages the full remote purchase, including title and approval checks." },
    { q:"How does Vedhara verify South Delhi listings?", a:"Every listing passes our five-check framework with an emphasis on deep title-chain verification, civic approval checks and price benchmarking to registered transactions. Results are published on the listing page." },
  ],
  schemaName: "Real Estate Advisory in South Delhi",
  schemaAreaServed: ["South Delhi"],
  schemaDescription: "Independent luxury real estate advisory across South Delhi: verified buying, selling and renting in Lutyens' Delhi, Greater Kailash, Vasant Vihar, Defence Colony and Hauz Khas.",
};

/* ═══════════════════════════════════════════════════════════════
   CHANDIGARH
   ═══════════════════════════════════════════════════════════════ */
const chandigarh: CityPageData = {
  slug: "chandigarh",
  name: "Chandigarh",
  metaTitle: "Real Estate in Chandigarh | Verified Property Advisory",
  metaDescription: "Buy freehold flats, villas and commercial property in Chandigarh with verified listings. Estate Office rules, NOC checks and price benchmarking.",
  heroVideo: "/videos/Chandigarh%20Tricity%20Hero%20Desktop.mp4",
  heroVideoMobile: "/videos/Chandigarh%20Tricity%20Hero%20Mobile.mp4",
  heroPoster: img(32355381),
  eyebrow: "Chandigarh",
  h1: "Real Estate in Chandigarh.",
  h1Accent: "India's First Planned City, Verified.",
  heroBody:
    "Chandigarh is the Tricity's anchor market, a low-volume, high-ticket market with scarce freehold inventory governed by the Estate Office. We verify allotment letters, NOCs and the registered title chain so you can buy, sell or invest with certainty.",
  introEyebrow: "Why Chandigarh",
  introTitle: "Scarcity, Prestige and Order.",
  introAccent: "A Market That Rewards Due Diligence.",
  introBody:
    "Chandigarh's planned sectors, wide avenues and strict rules make it one of India's most orderly property markets, but also one of its least transparent to outsiders. With no fully functional RERA, the Estate Office and the registered title chain carry the weight. Our verification is built around exactly that reality.",
  listingsEyebrow: "Featured Listings",
  listingsTitle: "Verified Properties",
  listingsAccent: "in Chandigarh",
  listingsSub:
    "Every listing is Estate Office-verified and independently assessed through the Vedhara Verification Framework.",
  listings: [
    { id:"ch-01", title:"The Corbusier Residences", location:"Sector 17, Chandigarh", price:"₹ 6.75 Cr", config:"4 BHK + Study", size:"2,850 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Golf Course View","Clubhouse Access"], image:img(32355381), pos:"58%", alt:"The Corbusier Residences apartment building in Sector 17, Chandigarh" },
    { id:"ch-02", title:"Sector 8 Heritage Flat", location:"Sector 8, Chandigarh", price:"₹ 4.60 Cr", config:"3 BHK", size:"1,850 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Central Location","Family Residence"], image:img(14846410), pos:"50%", alt:"Heritage flat in Sector 8, Chandigarh" },
    { id:"ch-03", title:"Sector 22 Commercial", location:"Sector 22, Chandigarh", price:"₹ 7.80 Cr", config:"2,000 sq.ft. Retail", size:"2,000 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Estate Office NOC","Signage Visible","Car Parking"], image:img(35596695), pos:"50%", alt:"Sector 22 commercial retail space in Chandigarh" },
    { id:"ch-04", title:"Sector 33 Residence", location:"Sector 33, Chandigarh", price:"₹ 3.95 Cr", config:"3 BHK", size:"1,650 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Green Surroundings","Family Residence"], image:img(32666364), pos:"62%", alt:"Sector 33 residence in Chandigarh" },
    { id:"ch-05", title:"Sector 26 Villa", location:"Sector 26, Chandigarh", price:"₹ 5.40 Cr", config:"4 BHK Villa", size:"2,600 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Private Garden","Premium Finishes"], image:img(28586227), pos:"66%", alt:"Sector 26 luxury villa in Chandigarh" },
    { id:"ch-06", title:"Sector 15 Flat", location:"Sector 15, Chandigarh", price:"₹ 3.10 Cr", config:"2 BHK", size:"1,350 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Central Location","Family Residence"], image:img(15951714), pos:"100%", alt:"Sector 15 apartment in Chandigarh" },
    { id:"ch-07", title:"Sector 18 Office", location:"Sector 18, Chandigarh", price:"₹ 2.80 Cr", config:"1,200 sq.ft. Office", size:"1,200 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Business Hub","Deal Floor","24hr Security","Parking"], image:img(37320179), pos:"50%", alt:"Sector 18 commercial office in Chandigarh" },
    { id:"ch-08", title:"Sector 9 Penthouse", location:"Sector 9, Chandigarh", price:"₹ 8.90 Cr", config:"4 BHK Penthouse", size:"3,400 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Estate Office NOC","Panoramic View","Private Terrace","Family Lounge"], image:img(15173334), pos:"100%", alt:"Sector 9 penthouse in Chandigarh" },
    { id:"ch-09", title:"Sector 20 Residence", location:"Sector 20, Chandigarh", price:"₹ 2.45 Cr", config:"3 BHK", size:"1,400 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Family Residence","Premium Finishes"], image:img(16631149), pos:"86%", alt:"Sector 20 residence in Chandigarh" },
    { id:"ch-10", title:"Sector 35 Floor", location:"Sector 35, Chandigarh", price:"₹ 3.60 Cr", config:"3 BHK Independent Floor", size:"1,750 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Wide Frontage","Family Lounge"], image:img(19344325), pos:"66%", alt:"Sector 35 independent floor in Chandigarh" },
    { id:"ch-11", title:"Sector 46 Flat", location:"Sector 46, Chandigarh", price:"₹ 2.85 Cr", config:"3 BHK", size:"1,520 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Green Surroundings","Family Residence"], image:img(9308434), pos:"100%", alt:"Sector 46 apartment in Chandigarh" },
    { id:"ch-12", title:"Sector 37 Villa", location:"Sector 37, Chandigarh", price:"₹ 6.20 Cr", config:"4 BHK Villa", size:"3,000 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Private Garden","Premium Finishes"], image:img(30165027), pos:"75%", alt:"Sector 37 luxury villa in Chandigarh" },
    { id:"ch-13", title:"Sector 14 Retail", location:"Sector 14, Chandigarh", price:"₹ 3.40 Cr", config:"1,000 sq.ft. Retail", size:"1,000 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Signage Visible","Loading Bay"], image:img(5864248), pos:"70%", alt:"Sector 14 retail space in Chandigarh" },
    { id:"ch-14", title:"Sector 5 Heritage Flat", location:"Sector 5, Chandigarh", price:"₹ 4.10 Cr", config:"3 BHK", size:"1,700 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Heritage Sector","Family Residence"], image:img(36282179), pos:"100%", alt:"Heritage flat in Sector 5, Chandigarh" },
    { id:"ch-15", title:"Sector 38 Residence", location:"Sector 38 West, Chandigarh", price:"₹ 3.75 Cr", config:"3 BHK", size:"1,620 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Family Residence","Premium Finishes"], image:img(1330753), pos:"63%", alt:"Sector 38 West residence in Chandigarh" },
    { id:"ch-16", title:"Sector 27 Office", location:"Sector 27, Chandigarh", price:"₹ 2.95 Cr", config:"1,400 sq.ft. Office", size:"1,400 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Business Hub","Deal Floor","24hr Security","Parking"], image:img(934586), pos:"81%", alt:"Sector 27 commercial office in Chandigarh" },
    { id:"ch-17", title:"Sector 40 Flat", location:"Sector 40, Chandigarh", price:"₹ 2.30 Cr", config:"2 BHK", size:"1,250 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Family Residence","Premium Finishes"], image:img(16285020), pos:"56%", alt:"Sector 40 apartment in Chandigarh" },
    { id:"ch-18", title:"Sector 23 Floor", location:"Sector 23, Chandigarh", price:"₹ 3.85 Cr", config:"3 BHK Independent Floor", size:"1,800 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Wide Frontage","Family Lounge"], image:img(1974596), pos:"56%", alt:"Sector 23 independent floor in Chandigarh" },
    { id:"ch-19", title:"Sector 45 Residence", location:"Sector 45, Chandigarh", price:"₹ 2.65 Cr", config:"3 BHK", size:"1,480 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Green Surroundings","Family Residence"], image:img(11631278), pos:"59%", alt:"Sector 45 residence in Chandigarh" },
    { id:"ch-20", title:"Sector 30 Villa", location:"Sector 30, Chandigarh", price:"₹ 5.80 Cr", config:"4 BHK Villa", size:"2,800 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Private Garden","Premium Finishes"], image:img(36466231), pos:"74%", alt:"Sector 30 luxury villa in Chandigarh" },
  ],
  microMarkets: {
    eyebrow: "The Micro-Markets",
    title: "Every Sector, Its Own Character.",
    accent: "One Standard of Care.",
    items: [
      { name:"Sectors 1–12", tag:"Heritage Core", desc:"The oldest, most prestigious sectors with wide tree-lined avenues and classic architecture. High scarcity, complex legacy titles and premium pricing define this belt.", points:["Heritage architecture","High scarcity","Premium pricing"] },
      { name:"Sectors 16–30", tag:"Central", desc:"The commercial and institutional heart of Chandigarh, home to the Capitol Complex, markets and offices. Mixed residential and commercial demand keeps this belt active.", points:["Commercial & institutional","Mixed-use demand","High visibility"] },
      { name:"Sectors 33–46", tag:"Residential West", desc:"The western residential sectors with more contemporary housing and a family-friendly character. Balanced prices and steady demand make them popular with end-users.", points:["Contemporary housing","Family-friendly","Steady demand"] },
      { name:"Sector 17 & the Core Market", tag:"Commercial Hub", desc:"Chandigarh's iconic shopping and business district. High-footfall retail and premium office space with the strongest commercial demand in the city.", points:["Iconic retail district","Strong office demand","High footfall"] },
      { name:"Capital Complex & Institutional", tag:"Landmark", desc:"The Le Corbusier-planned civic core with government and institutional land. Limited but highly symbolic inventory with strict use rules.", points:["Le Corbusier legacy","Institutional land","Strict use rules"] },
    ],
  },
  authorities: {
    eyebrow: "Authority Guide",
    title: "Who Approves, Who Registers,",
    accent: "and Who You Can Trust",
    items: [
      { title:"Chandigarh Estate Office", applies:"Chandigarh UT", mono:"EO", image:img(34968154), pos:"100%", alt:"Chandigarh Estate Office for allotments and NOCs", body:"No separate RERA authority is yet functional in Chandigarh UT. Allotments, resale permissions and NOCs are handled by the Estate Office under the 1960 Rules. We verify allotment letters, the registered chain and approvals." },
      { title:"Chandigarh Administration", applies:"Rules & Approvals", mono:"CA", image:img(33848325), pos:"79%", alt:"Chandigarh Administration for property rules and approvals", body:"The Chandigarh Administration sets building rules, zoning and transfer permissions. We confirm the sanctioned plan, land-use and any pending permissions before recommending." },
      { title:"Sub-Registrar & Land Records", applies:"Title & Registration", mono:"SR", image:img(33217250), pos:"50% 70%", alt:"Sub-Registrar office for title registration in Chandigarh", body:"The registered sale deed and mutation records establish title in Chandigarh. We trace the full registered chain and verify mutation before any recommendation." },
    ],
  },
  guide: {
    eyebrow: "Market Guide",
    title: "Before You Buy in Chandigarh",
    accent: "Three Things That Actually Matter",
    items: [
      { t:"Verify the Estate Office Chain", d:"Chandigarh transactions hinge on allotment letters and Estate Office NOCs. We verify the allotment chain, any transfer permissions and outstanding dues before you commit." },
      { t:"Check Tenure & Conversion", d:"Chandigarh is majority freehold with leasehold pockets. We confirm the actual tenure from the title and authority records, not from the broker's word." },
      { t:"Benchmark to Registered Sales", d:"Asking prices in Chandigarh can carry a scarcity premium. We compare against recent registered transactions in the same sector before advising." },
    ],
  },
  faqTitle: "Chandigarh Questions, Answered Straight",
  faqs: [
    { q:"Is it a good time to buy property in Chandigarh?", a:"Chandigarh offers price stability and scarcity value rather than speculative appreciation. It suits end-users and long-horizon investors. We benchmark every shortlist against recent registered transactions in the same sector before advising." },
    { q:"Is Chandigarh property freehold or leasehold?", a:"Chandigarh is majority freehold with leasehold pockets in specific sectors. The tenure matters enormously for resale and financing. We verify the actual tenure from the title chain and Estate Office records, never the brochure." },
    { q:"Does RERA apply to Chandigarh property?", a:"Chandigarh is a Union Territory and, as of now, does not have a fully functional RERA authority. Property is regulated by the Chandigarh Administration under the 1960 Rules, with the Estate Office handling allotments and NOCs." },
    { q:"Which sector in Chandigarh is best to buy?", a:"Sectors 1–12 offer heritage and prestige at a premium; Sectors 16–30 offer central convenience; Sectors 33–46 offer family-friendly value. The best sector depends on budget, lifestyle and purpose." },
    { q:"Can an NRI buy property in Chandigarh?", a:"Yes. NRIs can freely purchase residential and commercial property in Chandigarh without RBI approval, except agricultural land. Funds must flow through NRE/NRO channels, and keeping transfer receipts makes sale proceeds repatriable." },
    { q:"What are the stamp duty and registration charges in Chandigarh?", a:"Chandigarh UT follows the Indian Stamp Act with its own rates, typically in the 6–8% band depending on the property and buyer. We compute the exact all-in cost for your property at the time of transaction." },
    { q:"Is renting in Chandigarh a good option?", a:"Yes. Chandigarh's institutional and corporate workforce keeps rental demand steady, especially in central and western sectors. Yields are moderate but tenants are stable and reliable." },
    { q:"How does Vedhara verify Chandigarh listings?", a:"Because there is no functional RERA in Chandigarh, our verification leans on Estate Office checks, the registered title chain and legal review. Results are published on every listing page." },
  ],
  schemaName: "Real Estate Advisory in Chandigarh",
  schemaAreaServed: ["Chandigarh"],
  schemaDescription: "Independent real estate advisory in Chandigarh: verified buying, selling and investing with Estate Office NOC checks and registered-title due diligence.",
};

/* ═══════════════════════════════════════════════════════════════
   MOHALI
   ═══════════════════════════════════════════════════════════════ */
const mohali: CityPageData = {
  slug: "mohali",
  name: "Mohali",
  metaTitle: "Real Estate in Mohali | Verified Property Advisory",
  metaDescription: "Buy flats, plots and villas in Mohali with verified listings. GMADA-approved sectors, Punjab RERA due diligence and IT corridor guidance.",
  heroVideo: "/videos/mohali-city.mp4",
  heroPoster: img(35229793),
  eyebrow: "Mohali",
  h1: "Real Estate in Mohali.",
  h1Accent: "Chandigarh's Growth Engine, Verified.",
  heroBody:
    "Mohali is the Tricity's fastest-growing employment and IT corridor. GMADA-planned sectors, Punjab RERA oversight and strong rental demand make it the most active market in the region. We verify every listing and benchmark pricing to real registered transactions.",
  introEyebrow: "Why Mohali",
  introTitle: "IT-Powered, GMADA-Planned.",
  introAccent: "The Tricity's Most Active Market.",
  introBody:
    "Mohali's story is employment-led growth: IT parks, the airport corridor and new residential sectors planned by GMADA. The result is high transaction volume, strong rental absorption and steady appreciation. The catch is verifying GMADA approval and Punjab RERA status on every project, exactly what our framework does.",
  listingsEyebrow: "Featured Listings",
  listingsTitle: "Verified Properties",
  listingsAccent: "in Mohali",
  listingsSub:
    "Every listing is GMADA-approved, Punjab RERA-verified and independently assessed through the Vedhara Verification Framework.",
  listings: [
    { id:"mo-01", title:"Aero City Heights", location:"Airport Road, Mohali", price:"₹ 2.65 Cr", config:"3 BHK", size:"1,650 sq.ft.", type:"Residential", status:"Possession Dec 2026", highlights:["Punjab RERA","IT Park Proximity","Gated Community","Metro Proposed"], image:img(35229793), pos:"100%", alt:"Aero City Heights apartments on Airport Road, Mohali" },
    { id:"mo-02", title:"Kharar Green County", location:"Kharar, Mohali", price:"₹ 2.10 Cr", config:"300 sq.yds. Plot", size:"300 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["GMADA Approved","Corner Plot","Clear Title","Immediate Registry"], image:img(9716228), pos:"100%", alt:"Kharar Green County residential plot in Kharar, Mohali" },
    { id:"mo-03", title:"New Chandigarh Skyline", location:"Sector 101, New Chandigarh", price:"₹ 4.20 Cr", config:"4 BHK", size:"2,350 sq.ft.", type:"Residential", status:"Under Construction", highlights:["GMADA Approved","High Appreciation","Smart Home","Panoramic Balcony"], image:img(11442140), pos:"98%", alt:"New Chandigarh Skyline apartments in Sector 101" },
    { id:"mo-04", title:"Sukna Lakefront Villas", location:"Sector 4, Panchkula", price:"₹ 8.90 Cr", config:"5 BHK Villa", size:"4,200 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["HRERA Registered","Lake Front","Freehold Converted","Private Garden"], image:img(37433082), pos:"41%", alt:"Sukna Lakefront Villas luxury villas in Sector 4, Panchkula" },
    { id:"mo-05", title:"The Corbusier Residences", location:"Sector 17, Chandigarh", price:"₹ 6.75 Cr", config:"4 BHK + Study", size:"2,850 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Estate Office NOC","Freehold Title","Golf Course View","Clubhouse Access"], image:img(32355381), pos:"58%", alt:"The Corbusier Residences apartment building in Sector 17, Chandigarh" },
    { id:"mo-06", title:"Sector 82 Residences", location:"Sector 82, Mohali", price:"₹ 1.85 Cr", config:"3 BHK", size:"1,420 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Punjab RERA","GMADA Approved","Gated Community","Clubhouse"], image:img(5674684), pos:"100%", alt:"Sector 82 residences in Mohali" },
    { id:"mo-07", title:"Sector 91 Flats", location:"Sector 91, Mohali", price:"₹ 1.65 Cr", config:"2 BHK", size:"1,150 sq.ft.", type:"Residential", status:"Just Launched", highlights:["Punjab RERA","GMADA Approved","Affordable","Metro Proposed"], image:img(11643330), pos:"66%", alt:"Sector 91 flats in Mohali" },
    { id:"mo-08", title:"IT Park Offices", location:"Mohali IT Park", price:"₹ 3.20 Cr", config:"2,000 sq.ft. Office", size:"2,000 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["IT Park Address","Deal Floor","24hr Security","Parking"], image:img(27647440), pos:"64%", alt:"Mohali IT Park commercial office space" },
    { id:"mo-09", title:"Sector 70 Villa", location:"Sector 70, Mohali", price:"₹ 2.40 Cr", config:"4 BHK Villa", size:"2,400 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Punjab RERA","GMADA Approved","Gated Community","Private Garden"], image:img(13562772), pos:"94%", alt:"Sector 70 villa in Mohali" },
    { id:"mo-10", title:"Sector 88 Apartments", location:"Sector 88, Mohali", price:"₹ 1.95 Cr", config:"3 BHK", size:"1,480 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Punjab RERA","GMADA Approved","Gated Community","Clubhouse"], image:img(7735233), pos:"58%", alt:"Sector 88 apartments in Mohali" },
    { id:"mo-11", title:"Vip Road Retail", location:"Zirakpur, Mohali", price:"₹ 1.85 Cr", config:"1,800 sq.ft. Retail", size:"1,800 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","GMADA Zone","Signage Visible","Car Parking"], image:img(11840337), pos:"69%", alt:"VIP Road retail space in Zirakpur, Mohali" },
    { id:"mo-12", title:"Sector 100 Plots", location:"Sector 100, New Chandigarh", price:"₹ 1.60 Cr", config:"250 sq.yds. Plot", size:"250 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["GMADA Approved","Clear Title","Immediate Registry","High Appreciation"], image:img(37214905), pos:"100%", alt:"Sector 100 residential plots in New Chandigarh, Mohali" },
    { id:"mo-13", title:"Airport Road Apartments", location:"Airport Road, Mohali", price:"₹ 2.20 Cr", config:"3 BHK", size:"1,520 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Punjab RERA","Airport Proximity","Gated Community","Premium Finishes"], image:img(18774970), pos:"82%", alt:"Airport Road apartments in Mohali" },
    { id:"mo-14", title:"Sector 93 Flats", location:"Sector 93, Mohali", price:"₹ 1.45 Cr", config:"2 BHK", size:"1,050 sq.ft.", type:"Residential", status:"Just Launched", highlights:["Punjab RERA","GMADA Approved","Affordable","Metro Proposed"], image:img(18214902), pos:"50%", alt:"Sector 93 flats in Mohali" },
    { id:"mo-15", title:"Sector 78 Villa", location:"Sector 78, Mohali", price:"₹ 2.85 Cr", config:"4 BHK Villa", size:"2,600 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Punjab RERA","GMADA Approved","Gated Community","Private Garden"], image:img(2476632), pos:"79%", alt:"Sector 78 villa in Mohali" },
    { id:"mo-16", title:"Sector 95 Offices", location:"Sector 95, Mohali", price:"₹ 2.60 Cr", config:"1,600 sq.ft. Office", size:"1,600 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["IT Corridor","Deal Floor","24hr Security","Parking"], image:img(937513), pos:"70%", alt:"Sector 95 commercial office in Mohali" },
    { id:"mo-17", title:"Sector 84 Residences", location:"Sector 84, Mohali", price:"₹ 1.75 Cr", config:"3 BHK", size:"1,350 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Punjab RERA","GMADA Approved","Gated Community","Clubhouse"], image:img(38022580), pos:"74%", alt:"Sector 84 residences in Mohali" },
    { id:"mo-18", title:"Sector 110 Plots", location:"Sector 110, New Chandigarh", price:"₹ 1.40 Cr", config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["GMADA Approved","Clear Title","Immediate Registry","High Appreciation"], image:img(27062931), pos:"20%", alt:"Sector 110 residential plots in New Chandigarh, Mohali" },
    { id:"mo-19", title:"Sector 90 Flats", location:"Sector 90, Mohali", price:"₹ 2.05 Cr", config:"3 BHK", size:"1,500 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["Punjab RERA","GMADA Approved","Gated Community","Premium Finishes"], image:img(18153132), pos:"75%", alt:"Sector 90 flats in Mohali" },
    { id:"mo-20", title:"Sector 76 Apartment", location:"Sector 76, Mohali", price:"₹ 1.55 Cr", config:"2 BHK", size:"1,100 sq.ft.", type:"Residential", status:"Just Launched", highlights:["Punjab RERA","GMADA Approved","Affordable","Metro Proposed"], image:img(18587809), pos:"66%", alt:"Sector 76 apartment in Mohali" },
  ],
  microMarkets: {
    eyebrow: "The Micro-Markets",
    title: "Sectors Built for Working Life.",
    accent: "One Standard of Care.",
    items: [
      { name:"Airport Road & IT Park", tag:"Employment Core", desc:"Mohali's IT and airport corridor with the densest employment base. High rental demand and fast absorption define this belt; delivery timelines are the key check.", points:["IT & airport employment","High rental demand","Fast absorption"] },
      { name:"Sector 82–93", tag:"New Residential", desc:"The newer GMADA residential sectors with contemporary apartments and gated communities. Affordable entry points and steady appreciation attract first-time and upgrade buyers.", points:["Affordable entry points","Gated communities","Steady appreciation"] },
      { name:"New Chandigarh (Sectors 98+ )", tag:"Planned Extension", desc:"The planned extension of Chandigarh across the Mohali side. Plots and units are GMADA-approved with defined land-use; pricing is still discovery-stage, rewarding careful selection.", points:["GMADA-planned sectors","Discovery-stage pricing","Medium-term upside"] },
      { name:"Kharar Belt", tag:"Value Corridor", desc:"The emerging residential belt on Mohali's edge with the highest transaction volume. Entry-friendly prices and strong absorption, but approval checks are essential.", points:["High transaction volume","Entry-friendly prices","Approval checks vital"] },
      { name:"Zirakpur Border", tag:"Connectivity Hub", desc:"The retail and connectivity hub straddling the Tricity periphery. High-density, affordable options with strong rental absorption for value-seeking buyers.", points:["Retail & connectivity hub","Affordable options","Strong rentals"] },
    ],
  },
  authorities: {
    eyebrow: "Authority Guide",
    title: "Who Approves, Who Registers,",
    accent: "and Who You Can Trust",
    items: [
      { title:"GMADA", applies:"Mohali · Kharar · New Chandigarh", mono:"GM", image:img(33848325), pos:"79%", alt:"GMADA office for sector approvals in Mohali", body:"Mohali projects are planned and approved by GMADA. We verify the sector's sanctioned layout, the project's approval status, and whether the unit sits inside an approved colony before any recommendation." },
      { title:"Punjab RERA (PunRERA)", applies:"Mohali", mono:"PR", image:img(33217250), pos:"50% 70%", alt:"Punjab RERA registration office for Mohali projects", body:"Mohali, Zirakpur and Kharar fall under Punjab RERA (PunRERA). We verify registration, quarterly progress filings and complaint history on the official state portal for each project." },
      { title:"GMADA Estate Cell", applies:"Plots & Allotments", mono:"GE", image:img(34968154), pos:"100%", alt:"GMADA estate cell for plot allotments in Mohali", body:"For plotted development, GMADA's estate cell handles allotments and resale permissions. We verify the allotment chain, outstanding dues and conversion status before recommending plots." },
    ],
  },
  guide: {
    eyebrow: "Market Guide",
    title: "Before You Buy in Mohali",
    accent: "Three Things That Actually Matter",
    items: [
      { t:"Confirm GMADA Approval", d:"Buying inside a GMADA-approved sector gives you legal protection; buying in an unapproved colony carries serious risk. Our first check is always the approval status." },
      { t:"Verify Punjab RERA Status", d:"Registered projects file quarterly progress reports with PunRERA. We confirm the number, delivery timeline and any complaints before you commit." },
      { t:"Check Plots for Dues & Title", d:"For plotted development, we verify the GMADA allotment chain, outstanding dues and clear registry. The right plot appreciates; the wrong one is a legal problem." },
    ],
  },
  faqTitle: "Mohali Questions, Answered Straight",
  faqs: [
    { q:"Is Mohali a good place to invest in property?", a:"Yes. Mohali offers the Tricity's strongest employment-led growth story, with the IT park, airport corridor and GMADA-planned sectors driving steady appreciation and rental demand. It suits both end-users and investors with a medium horizon." },
    { q:"Which sector in Mohali is best to buy?", a:"Airport Road and the IT corridor suit those wanting rental income and employment proximity; Sectors 82–93 offer affordable new apartments; New Chandigarh (Sectors 98+) suits long-horizon investors. We recommend based on your goals." },
    { q:"Is Mohali property freehold or leasehold?", a:"GMADA sectors in Mohali are predominantly freehold with clear title. Some older allotments and commercial licences carry lease terms. We verify tenure from the title chain and GMADA records before recommending." },
    { q:"What is GMADA and how does it affect Mohali property?", a:"GMADA, the Greater Mohali Area Development Authority, is Punjab's planning authority for the Mohali region. It sanctions layouts, allots plots and sets development charges. Buying inside a GMADA-approved sector gives you legal protection." },
    { q:"Are there good rental options in Mohali?", a:"Yes. Mohali's IT workforce keeps rental demand strong, especially around the IT park, Airport Road and newer sectors. Transparent lease terms and verified tenants/landlords are the key to a smooth experience." },
    { q:"What are the stamp duty and registration charges in Mohali?", a:"Punjab levies stamp duty in the 6–8% band depending on the property and buyer, plus registration charges. We compute the exact all-in cost for your property at the time of transaction." },
    { q:"Can an NRI buy property in Mohali?", a:"Yes. NRIs can buy residential and commercial property in Mohali through NRE/NRO channels without RBI approval. Our NRI desk manages the full remote purchase, including GMADA and PunRERA checks." },
    { q:"Is New Chandigarh a good investment?", a:"New Chandigarh is a planned GMADA extension with discovery-stage pricing. It suits buyers with a 5–10 year horizon who want the Chandigarh address at a lower entry point. We always verify the unit is inside a GMADA-sanctioned sector." },
  ],
  schemaName: "Real Estate Advisory in Mohali",
  schemaAreaServed: ["Mohali"],
  schemaDescription: "Independent real estate advisory across Mohali: verified buying, selling and investing in GMADA-approved sectors with Punjab RERA due diligence.",
};

/* ═══════════════════════════════════════════════════════════════
   PANCHKULA
   ═══════════════════════════════════════════════════════════════ */
const panchkula: CityPageData = {
  slug: "panchkula",
  name: "Panchkula",
  metaTitle: "Real Estate in Panchkula | Verified Property Advisory",
  metaDescription: "Buy villas, flats and plots in Panchkula with verified listings. HRERA due diligence, freehold-conversion guidance and price benchmarking.",
  heroVideo: "/videos/panchkula-city.mp4",
  heroPoster: img(37433082),
  eyebrow: "Panchkula",
  h1: "Real Estate in Panchkula.",
  h1Accent: "The Green, Planned Haryana Neighbour, Verified.",
  heroBody:
    "Panchkula is the green, quiet Haryana neighbour of Chandigarh, planned sectors, lakefront villas and family-friendly streets. We verify HRERA registration, freehold-conversion status and pricing on every listing so you buy with certainty.",
  introEyebrow: "Why Panchkula",
  introTitle: "Green, Quiet and Planned.",
  introAccent: "A Market Built for Families.",
  introBody:
    "Panchkula offers the Tricity's most family-oriented living: tree-lined sectors, strict height controls and the Morni hills on the horizon. Many older sectors were leasehold and have converted to freehold under Haryana's policy. Our verification confirms the actual tenure, HRERA status and price fairness on every listing.",
  listingsEyebrow: "Featured Listings",
  listingsTitle: "Verified Properties",
  listingsAccent: "in Panchkula",
  listingsSub:
    "Every listing is HRERA-verified and independently assessed through the Vedhara Verification Framework.",
  listings: [
    { id:"pk-01", title:"Sukna Lakefront Villas", location:"Sector 4, Panchkula", price:"₹ 8.90 Cr", config:"5 BHK Villa", size:"4,200 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["HRERA Registered","Lake Front","Freehold Converted","Private Garden"], image:img(37433082), pos:"41%", alt:"Sukna Lakefront Villas luxury villas in Sector 4, Panchkula" },
    { id:"pk-02", title:"Sector 8 Villa", location:"Sector 8, Panchkula", price:"₹ 4.60 Cr", config:"4 BHK Villa", size:"2,600 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Gated Community","Private Garden"], image:img(12124723), pos:"63%", alt:"Sector 8 villa in Panchkula" },
    { id:"pk-03", title:"Sector 5 Flats", location:"Sector 5, Panchkula", price:"₹ 2.10 Cr", config:"3 BHK", size:"1,420 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Family Residence","Premium Finishes"], image:img(27307400), pos:"64%", alt:"Sector 5 flats in Panchkula" },
    { id:"pk-04", title:"Sector 2 Residence", location:"Sector 2, Panchkula", price:"₹ 2.85 Cr", config:"3 BHK", size:"1,620 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Green Surroundings","Family Residence"], image:img(7031581), pos:"44%", alt:"Sector 2 residence in Panchkula" },
    { id:"pk-05", title:"Sector 10 Apartment", location:"Sector 10, Panchkula", price:"₹ 3.40 Cr", config:"4 BHK", size:"2,050 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Gated Complex","Clubhouse"], image:img(14424262), pos:"83%", alt:"Sector 10 apartment in Panchkula" },
    { id:"pk-06", title:"Sector 7 Floor", location:"Sector 7, Panchkula", price:"₹ 2.40 Cr", config:"3 BHK Independent Floor", size:"1,550 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Wide Frontage","Family Lounge"], image:img(17707574), pos:"85%", alt:"Sector 7 independent floor in Panchkula" },
    { id:"pk-07", title:"Sector 20 Villas", location:"Sector 20, Panchkula", price:"₹ 5.20 Cr", config:"4 BHK Villa", size:"3,000 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Private Garden","Premium Finishes"], image:img(28586234), pos:"100%", alt:"Sector 20 villas in Panchkula" },
    { id:"pk-08", title:"Sector 15 Flats", location:"Sector 15, Panchkula", price:"₹ 1.85 Cr", config:"2 BHK", size:"1,150 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Family Residence","Premium Finishes"], image:img(16583796), pos:"100%", alt:"Sector 15 flats in Panchkula" },
    { id:"pk-09", title:"Sector 9 Residence", location:"Sector 9, Panchkula", price:"₹ 2.65 Cr", config:"3 BHK", size:"1,550 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Green Surroundings","Family Residence"], image:img(7031411), pos:"35%", alt:"Sector 9 residence in Panchkula" },
    { id:"pk-10", title:"Sector 12 Villa", location:"Sector 12, Panchkula", price:"₹ 3.90 Cr", config:"4 BHK Villa", size:"2,400 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Gated Community","Private Garden"], image:img(36676879), pos:"56%", alt:"Sector 12 villa in Panchkula" },
    { id:"pk-11", title:"Sector 16 Office", location:"Sector 16, Panchkula", price:"₹ 1.75 Cr", config:"1,200 sq.ft. Office", size:"1,200 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Business Hub","Deal Floor","24hr Security","Parking"], image:img(16370914), pos:"50%", alt:"Sector 16 commercial office in Panchkula" },
    { id:"pk-12", title:"Sector 19 Plots", location:"Sector 19, Panchkula", price:"₹ 1.45 Cr", config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["HRERA Zone","Clear Title","Immediate Registry","Green Locality"], image:img(16408959), pos:"11%", alt:"Sector 19 residential plots in Panchkula" },
    { id:"pk-13", title:"Sector 3 Residence", location:"Sector 3, Panchkula", price:"₹ 2.20 Cr", config:"3 BHK", size:"1,420 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Family Residence","Premium Finishes"], image:img(7031405), pos:"50%", alt:"Sector 3 residence in Panchkula" },
    { id:"pk-14", title:"Sector 11 Villa", location:"Sector 11, Panchkula", price:"₹ 4.20 Cr", config:"4 BHK Villa", size:"2,600 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Private Garden","Premium Finishes"], image:img(35069531), pos:"59%", alt:"Sector 11 villa in Panchkula" },
    { id:"pk-15", title:"Sector 14 Retail", location:"Sector 14, Panchkula", price:"₹ 1.60 Cr", config:"1,000 sq.ft. Retail", size:"1,000 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Signage Visible","Loading Bay"], image:img(7996793), pos:"8%", alt:"Sector 14 retail space in Panchkula" },
    { id:"pk-16", title:"Sector 21 Flats", location:"Sector 21, Panchkula", price:"₹ 1.95 Cr", config:"3 BHK", size:"1,380 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Family Residence","Premium Finishes"], image:img(16110999), pos:"50%", alt:"Sector 21 flats in Panchkula" },
    { id:"pk-17", title:"Sector 6 Villa", location:"Sector 6, Panchkula", price:"₹ 3.60 Cr", config:"4 BHK Villa", size:"2,300 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Gated Community","Private Garden"], image:img(28054862), pos:"100%", alt:"Sector 6 villa in Panchkula" },
    { id:"pk-18", title:"Sector 13 Apartment", location:"Sector 13, Panchkula", price:"₹ 2.35 Cr", config:"3 BHK", size:"1,500 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Green Surroundings","Family Residence"], image:img(5403840), pos:"80%", alt:"Sector 13 apartment in Panchkula" },
    { id:"pk-19", title:"Sector 17 Plot", location:"Sector 17, Panchkula", price:"₹ 1.35 Cr", config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["HRERA Zone","Clear Title","Immediate Registry","Green Locality"], image:img(30557705), pos:"50%", alt:"Sector 17 residential plot in Panchkula" },
    { id:"pk-20", title:"Sector 22 Residence", location:"Sector 22, Panchkula", price:"₹ 2.05 Cr", config:"3 BHK", size:"1,400 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Freehold Converted","Family Residence","Premium Finishes"], image:img(15422346), pos:"81%", alt:"Sector 22 residence in Panchkula" },
  ],
  microMarkets: {
    eyebrow: "The Micro-Markets",
    title: "Quiet Sectors, Solid Value.",
    accent: "One Standard of Care.",
    items: [
      { name:"Sector 1–5", tag:"Established", desc:"Panchkula's original sectors with mature infrastructure, schools and markets. Freehold-converted and highly livable, they suit families and long-term residents.", points:["Mature infrastructure","Freehold-converted","Family-oriented"] },
      { name:"Sector 6–12", tag:"Premium", desc:"The leafy mid sectors with larger plots, villas and green buffers. Higher price points with strong value stability and low turnover.", points:["Larger plots & villas","Value stability","Low turnover"] },
      { name:"Sector 15–22", tag:"Value Belt", desc:"The newer sectors offering more affordable entry points while retaining Panchkula's planning discipline. Good for first-time buyers and investors.", points:["Affordable entry points","Planned sectors","Investor-friendly"] },
      { name:"Sector 25 & beyond", tag:"Emerging", desc:"The fast-developing outer sectors with newer projects and lower prices. Growth potential is real; approval and delivery checks are essential.", points:["Newer projects","Lower prices","Approval checks vital"] },
      { name:"Morni & periphery", tag:"Lifestyle", desc:"The hillside and peripheral pockets offering scenic plots and weekend homes. Niche demand with a premium on the view; careful due diligence required.", points:["Scenic plots","Weekend-home demand","Niche market"] },
    ],
  },
  authorities: {
    eyebrow: "Authority Guide",
    title: "Who Approves, Who Registers,",
    accent: "and Who You Can Trust",
    items: [
      { title:"HRERA (Haryana)", applies:"Panchkula", mono:"HR", image:img(33217250), pos:"50% 70%", alt:"Haryana RERA registration office for Panchkula projects", body:"New projects in Panchkula fall under HRERA (Haryana). We verify registration, quarterly progress filings and complaint history on the official portal before any listing goes live." },
      { title:"HSVP / HUDA", applies:"Sector Plots & Conversion", mono:"HS", image:img(34968154), pos:"100%", alt:"Haryana urban development authority for Panchkula plots and conversion", body:"HSVP (formerly HUDA) manages Panchkula's sectors and leasehold-to-freehold conversion. We verify the sector layout, allotment chain and freehold-conversion status for plots and homes." },
      { title:"Municipal Corporation Panchkula", applies:"Approvals & Taxes", mono:"MC", image:img(33848325), pos:"79%", alt:"Municipal Corporation Panchkula for building approvals and taxes", body:"Building sanctions, completion certificates and property taxes for Panchkula fall under the Municipal Corporation. We confirm the sanctioned plan and any pending dues." },
    ],
  },
  guide: {
    eyebrow: "Market Guide",
    title: "Before You Buy in Panchkula",
    accent: "Three Things That Actually Matter",
    items: [
      { t:"Confirm Freehold Conversion", d:"Many Panchkula sectors were 99-year leasehold and have since converted to freehold. We verify the actual conversion status from HSVP records, not the broker's word." },
      { t:"Verify HRERA & Approvals", d:"New projects must register with HRERA. We confirm the registration number, delivery timeline and any complaints before you commit." },
      { t:"Check the Title Chain", d:"For plots and older homes, we trace the full registered chain and verify the allotment, mutation and any dues. A clean title is the foundation of a sound investment." },
    ],
  },
  faqTitle: "Panchkula Questions, Answered Straight",
  faqs: [
    { q:"Is Panchkula property freehold or leasehold?", a:"Historically most Panchkula sectors were 99-year leasehold. Haryana has allowed conversion to freehold at prescribed rates, and most older sectors (2–12 and others) have converted or are convertible. We verify the actual tenure from the title and HSVP records." },
    { q:"Is Panchkula a good place to buy a house?", a:"Yes, especially for families and retirees. Panchkula offers planned, green, quiet living with strong value stability. It suits end-users more than speculators; appreciation is steady rather than spectacular." },
    { q:"Which sector in Panchkula is best?", a:"Sectors 1–5 offer mature infrastructure; Sectors 6–12 offer premium villas and green buffers; Sectors 15–22 offer value. The best sector depends on budget, lifestyle and purpose." },
    { q:"Is Panchkula better than Mohali for buying?", a:"Panchkula is quieter, greener and more family-oriented with steady values; Mohali offers stronger IT-led growth and rental demand. The choice depends on whether you prioritise lifestyle or appreciation." },
    { q:"Are there good rental options in Panchkula?", a:"Yes, though yields are moderate. Panchkula's institutional and corporate residents keep demand steady, especially in sectors close to Chandigarh and the IT corridor." },
    { q:"What are the stamp duty and registration charges in Panchkula?", a:"Haryana levies stamp duty in the 7–8% band with a lower rate for women buyers, plus registration and mutation charges. We compute the exact all-in cost for your property at the time of transaction." },
    { q:"Can an NRI buy property in Panchkula?", a:"Yes. NRIs can buy residential and commercial property in Panchkula through NRE/NRO channels without RBI approval. Our NRI desk manages the full remote purchase, including HRERA and HSVP checks." },
    { q:"How does Vedhara verify Panchkula listings?", a:"Every listing passes our five-check framework with emphasis on freehold-conversion status, HRERA registration and title-chain verification. Results are published on every listing page." },
  ],
  schemaName: "Real Estate Advisory in Panchkula",
  schemaAreaServed: ["Panchkula"],
  schemaDescription: "Independent real estate advisory in Panchkula: verified buying, selling and investing in planned Haryana sectors with HRERA due diligence and freehold-conversion checks.",
};

/* ═══════════════════════════════════════════════════════════════
   FARIDABAD
   ═══════════════════════════════════════════════════════════════ */
const faridabad: CityPageData = {
  slug: "faridabad",
  name: "Faridabad",
  metaTitle: "Real Estate in Faridabad | Verified Property Advisory",
  metaDescription: "Buy, rent or invest in Faridabad property with verified listings. Sector 47, Sector 79 & Neharpar guidance with HRERA due diligence.",
  heroVideo: "/videos/faridabad-city.mp4",
  heroPoster: img(30381835),
  eyebrow: "Faridabad",
  h1: "Real Estate in Faridabad.",
  h1Accent: "Delhi's Affordable, Connected Neighbour, Verified.",
  heroBody:
    "Faridabad offers some of Delhi NCR's most affordable planned living, minutes from Delhi with the metro and the Expressway. We verify HRERA registration, approvals and price fairness on every Faridabad listing.",
  introEyebrow: "Why Faridabad",
  introTitle: "Affordability With Connectivity.",
  introAccent: "A Market Coming Into Its Own.",
  introBody:
    "Faridabad's story is one of infrastructure catching up with potential: the metro, the Delhi–Mumbai Expressway and new residential sectors. The result is an affordable, fast-connecting market with real upside. Our verification makes sure you buy inside the plan, not outside it.",
  listingsEyebrow: "Featured Listings",
  listingsTitle: "Verified Properties",
  listingsAccent: "in Faridabad",
  listingsSub:
    "Every listing is HRERA-verified and independently assessed through the Vedhara Verification Framework.",
  listings: [
    { id:"fb-01", title:"Santorini Bay", location:"Sector 47, Faridabad", price:"₹ 1.25 Cr", config:"2 BHK", size:"1,150 sq.ft.", type:"Residential", status:"Just Launched", highlights:["Sobha Group","Affordable Luxury","Gated Community","Clubhouse"], image:img(30381835), pos:"82%", alt:"Santorini Bay residential project in Sector 47, Faridabad" },
    { id:"fb-02", title:"Sector 79 Residences", location:"Sector 79, Faridabad", price:"₹ 2.40 Cr", config:"3 BHK", size:"1,520 sq.ft.", type:"Residential", status:"Under Construction", highlights:["HRERA Registered","Metro Proximity","Gated Community","Clubhouse"], image:img(20296321), pos:"72%", alt:"Sector 79 residences in Faridabad" },
    { id:"fb-03", title:"Neharpar Plots", location:"Neharpar, Faridabad", price:"₹ 1.10 Cr", config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Immediate Registry","High Appreciation","Green Locality"], image:img(32370508), pos:"76%", alt:"Neharpar residential plots in Faridabad" },
    { id:"fb-04", title:"Sector 21C Apartments", location:"Sector 21C, Faridabad", price:"₹ 1.85 Cr", config:"3 BHK", size:"1,350 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Metro Proximity","Gated Complex","Premium Finishes"], image:img(33244441), pos:"84%", alt:"Sector 21C apartments in Faridabad" },
    { id:"fb-05", title:"Sector 86 Flats", location:"Sector 86, Faridabad", price:"₹ 1.55 Cr", config:"3 BHK", size:"1,250 sq.ft.", type:"Residential", status:"Under Construction", highlights:["HRERA Registered","Affordable","Gated Community","Clubhouse"], image:img(31656143), pos:"69%", alt:"Sector 86 flats in Faridabad" },
    { id:"fb-06", title:"Crown Plaza Residences", location:"Sector 150, Faridabad", price:"₹ 2.75 Cr", config:"3 BHK", size:"1,680 sq.ft.", type:"Residential", status:"Under Construction", highlights:["Gated Community","Clubhouse","Smart Home","Premium Finishes"], image:img(5711363), pos:"100%", alt:"Crown Plaza Residences apartments in Faridabad" },
    { id:"fb-07", title:"Sector 14 Market Retail", location:"Sector 14, Faridabad", price:"₹ 1.75 Cr", config:"1,100 sq.ft. Retail", size:"1,100 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Signage Visible","Loading Bay"], image:img(30929605), pos:"50%", alt:"Sector 14 market retail space in Faridabad" },
    { id:"fb-08", title:"Sector 85 Villa", location:"Sector 85, Faridabad", price:"₹ 1.95 Cr", config:"3 BHK Villa", size:"1,800 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Gated Community","Private Garden","Premium Finishes"], image:img(32563332), pos:"76%", alt:"Sector 85 villa in Faridabad" },
    { id:"fb-09", title:"Sector 78 Flats", location:"Sector 78, Faridabad", price:"₹ 1.35 Cr", config:"2 BHK", size:"1,050 sq.ft.", type:"Residential", status:"Just Launched", highlights:["HRERA Registered","Affordable","Metro Proposed","Gated Community"], image:img(31640021), pos:"67%", alt:"Sector 78 flats in Faridabad" },
    { id:"fb-10", title:"Sector 89 Apartments", location:"Sector 89, Faridabad", price:"₹ 2.10 Cr", config:"3 BHK", size:"1,420 sq.ft.", type:"Residential", status:"Under Construction", highlights:["HRERA Registered","Metro Proximity","Gated Community","Clubhouse"], image:img(13070528), pos:"64%", alt:"Sector 89 apartments in Faridabad" },
    { id:"fb-11", title:"Sector 82 Plots", location:"Sector 82, Faridabad", price:"₹ 1.20 Cr", config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Immediate Registry","High Appreciation","Green Locality"], image:img(11201060), pos:"59%", alt:"Sector 82 residential plots in Faridabad" },
    { id:"fb-12", title:"Sector 15A Office", location:"Sector 15A, Faridabad", price:"₹ 1.50 Cr", config:"1,200 sq.ft. Office", size:"1,200 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Business Hub","Deal Floor","24hr Security","Parking"], image:img(13219418), pos:"50%", alt:"Sector 15A commercial office in Faridabad" },
    { id:"fb-13", title:"Green Valley Residency", location:"Sector 16, Faridabad", price:"₹ 1.65 Cr", config:"2 BHK", size:"1,100 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Gated Complex","Premium Finishes","Metro Proximity"], image:img(30580640), pos:"100%", alt:"Green Valley Residency apartments in Faridabad" },
    { id:"fb-14", title:"Sector 84 Villa", location:"Sector 84, Faridabad", price:"₹ 2.20 Cr", config:"4 BHK Villa", size:"2,200 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Gated Community","Private Garden","Premium Finishes"], image:img(29679172), pos:"90%", alt:"Sector 84 villa in Faridabad" },
    { id:"fb-15", title:"Sector 87 Flats", location:"Sector 87, Faridabad", price:"₹ 1.45 Cr", config:"2 BHK", size:"1,080 sq.ft.", type:"Residential", status:"Just Launched", highlights:["HRERA Registered","Affordable","Metro Proposed","Gated Community"], image:img(27675475), pos:"100%", alt:"Sector 87 flats in Faridabad" },
    { id:"fb-16", title:"Sector 28 Retail", location:"Sector 28, Faridabad", price:"₹ 1.30 Cr", config:"900 sq.ft. Retail", size:"900 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Signage Visible","Loading Bay"], image:img(1710477), pos:"58%", alt:"Sector 28 retail space in Faridabad" },
    { id:"fb-17", title:"Sector 91 Apartments", location:"Sector 91, Faridabad", price:"₹ 2.30 Cr", config:"3 BHK", size:"1,500 sq.ft.", type:"Residential", status:"Under Construction", highlights:["HRERA Registered","Metro Proximity","Gated Community","Clubhouse"], image:img(14433524), pos:"68%", alt:"Sector 91 apartments in Faridabad" },
    { id:"fb-18", title:"Sector 88 Plots", location:"Sector 88, Faridabad", price:"₹ 1.15 Cr", config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Immediate Registry","High Appreciation","Green Locality"], image:img(20074182), pos:"85%", alt:"Sector 88 residential plots in Faridabad" },
    { id:"fb-19", title:"Sector 17 Residence", location:"Sector 17, Faridabad", price:"₹ 1.75 Cr", config:"2 BHK", size:"1,120 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["HRERA Registered","Gated Complex","Premium Finishes","Metro Proximity"], image:img(6342356), pos:"38%", alt:"Sector 17 residence in Faridabad" },
    { id:"fb-20", title:"Sector 90 Flats", location:"Sector 90, Faridabad", price:"₹ 2.05 Cr", config:"3 BHK", size:"1,400 sq.ft.", type:"Residential", status:"Under Construction", highlights:["HRERA Registered","Metro Proximity","Gated Community","Clubhouse"], image:img(7510459), pos:"44%", alt:"Sector 90 flats in Faridabad" },
  ],
  microMarkets: {
    eyebrow: "The Micro-Markets",
    title: "Sectors With Real Connectivity.",
    accent: "One Standard of Care.",
    items: [
      { name:"Sector 47 & Neharpar", tag:"Affordable New", desc:"Faridabad's fast-growing residential belt with affordable apartments and plotted development. Strong value for first-time buyers; approval and delivery checks are essential.", points:["Affordable entry points","Plotted development","First-time buyer friendly"] },
      { name:"Sector 79–91", tag:"Emerging", desc:"The newer expressway-adjacent sectors with contemporary projects and metro potential. Lower prices with real upside; infrastructure is still maturing.", points:["Expressway proximity","Metro potential","Maturing infrastructure"] },
      { name:"Sector 21C & the Core", tag:"Established", desc:"Faridabad's established residential core with metro connectivity, schools and markets. Stable values and mature living define this belt.", points:["Metro connectivity","Mature living","Stable values"] },
      { name:"Sector 14 & 15A", tag:"Commercial", desc:"Faridabad's traditional commercial heart with markets, offices and retail. High footfall and established trade drive steady demand.", points:["Established trade","High footfall","Steady demand"] },
      { name:"Sector 85–90", tag:"Premium Emerging", desc:"The up-and-coming premium pockets with villas and larger apartments. Higher specification at still-competitive prices for those who buy early.", points:["Villas & larger units","Competitive prices","Early-stage upside"] },
    ],
  },
  authorities: {
    eyebrow: "Authority Guide",
    title: "Who Approves, Who Registers,",
    accent: "and Who You Can Trust",
    items: [
      { title:"HRERA (Haryana)", applies:"Faridabad", mono:"HR", image:img(33217250), pos:"50% 70%", alt:"Haryana RERA registration office for Faridabad projects", body:"New projects in Faridabad fall under HRERA (Haryana). We verify registration, quarterly progress filings and complaint history on the official portal before any listing goes live." },
      { title:"HSVP / HUDA", applies:"Sector Plots", mono:"HS", image:img(34968154), pos:"100%", alt:"Haryana urban development authority for Faridabad sector plots", body:"HSVP (formerly HUDA) manages Faridabad's sector layouts and plot allotments. We verify the sanctioned layout, allotment chain and any dues for plotted development." },
      { title:"Municipal Corporation Faridabad", applies:"Approvals & Taxes", mono:"MC", image:img(33848325), pos:"79%", alt:"Municipal Corporation Faridabad for building approvals and taxes", body:"Building sanctions, completion certificates and property taxes fall under the Municipal Corporation. We confirm the sanctioned plan and any pending dues." },
    ],
  },
  guide: {
    eyebrow: "Market Guide",
    title: "Before You Buy in Faridabad",
    accent: "Three Things That Actually Matter",
    items: [
      { t:"Verify HRERA & Approvals", d:"New projects must register with HRERA. We confirm the registration number, delivery timeline and any complaints before you commit." },
      { t:"Check the Title & Dues", d:"For plots and older homes, we trace the registered title chain and verify HSVP allotments, mutation and any outstanding dues." },
      { t:"Benchmark to Circle Rate", d:"Asking prices can outpace circle rates in emerging sectors. We compare against registered transactions in the same sector before advising." },
    ],
  },
  faqTitle: "Faridabad Questions, Answered Straight",
  faqs: [
    { q:"Is Faridabad a good place to invest in property?", a:"Yes, particularly for value-seeking buyers. Faridabad offers affordable planned living with metro and expressway connectivity, and newer sectors carry real appreciation potential. It suits first-time buyers and medium-horizon investors." },
    { q:"Which sector in Faridabad is best to buy?", a:"Sector 47 and Neharpar offer affordable new development; Sectors 79–91 offer emerging growth; the core sectors around 21C offer mature living. The best choice depends on budget and whether you want immediate livability or growth." },
    { q:"Is Faridabad property freehold or leasehold?", a:"Most modern Faridabad projects are freehold with clear title. Some older HSVP sectors and commercial licences carry lease terms. We verify tenure from the title chain and authority records before recommending." },
    { q:"How close is Faridabad to Delhi?", a:"Faridabad shares a long border with Delhi, and the metro and expressway make it one of the most connected NCR satellites. Commute times vary by sector, which we factor into every recommendation." },
    { q:"Are there good rental options in Faridabad?", a:"Yes. Faridabad's growing corporate and institutional base keeps rental demand steady, especially in sectors near the metro and expressway. Yields are competitive for the price point." },
    { q:"What are the stamp duty and registration charges in Faridabad?", a:"Haryana levies stamp duty in the 7–8% band with a lower rate for women buyers, plus registration and mutation charges. We compute the exact all-in cost for your property at the time of transaction." },
    { q:"Can an NRI buy property in Faridabad?", a:"Yes. NRIs can buy residential and commercial property in Faridabad through NRE/NRO channels without RBI approval. Our NRI desk manages the full remote purchase, including HRERA checks." },
    { q:"How does Vedhara verify Faridabad listings?", a:"Every listing passes our five-check framework: HRERA registration, builder delivery history, project approvals, price fairness and title documents. Results are published on every listing page." },
  ],
  schemaName: "Real Estate Advisory in Faridabad",
  schemaAreaServed: ["Faridabad"],
  schemaDescription: "Independent real estate advisory across Faridabad: verified buying, selling and investing in Sector 47, Neharpar and emerging sectors with HRERA due diligence.",
};

/* ═══════════════════════════════════════════════════════════════
   GHAZIABAD
   ═══════════════════════════════════════════════════════════════ */
const ghaziabad: CityPageData = {
  slug: "ghaziabad",
  name: "Ghaziabad",
  metaTitle: "Real Estate in Ghaziabad | Verified Property Advisory",
  metaDescription: "Buy, rent or invest in Ghaziabad property with verified listings. Indirapuram, Raj Nagar & Vaishali guidance with UP RERA due diligence.",
  heroVideo: "/videos/ghaziabad-city.mp4",
  heroPoster: img(30368780),
  eyebrow: "Ghaziabad",
  h1: "Real Estate in Ghaziabad.",
  h1Accent: "Delhi NCR's Value Workhorse, Verified.",
  heroBody:
    "Ghaziabad is where Delhi NCR's affordability meets connectivity: Indirapuram, Raj Nagar Extension, Vaishali and the metro line. We verify UP RERA registration, approvals and price fairness on every Ghaziabad listing.",
  introEyebrow: "Why Ghaziabad",
  introTitle: "Affordable, Connected, Expanding.",
  introAccent: "A Market of Real Opportunity.",
  introBody:
    "Ghaziabad has long been Delhi NCR's value workhorse, affordable homes, strong connectivity and a metro that ties it to Delhi. New corridors like Raj Nagar Extension and Crossings Republik are reshaping the market. Our verification makes sure you buy inside the plan, with clean title and fair pricing.",
  listingsEyebrow: "Featured Listings",
  listingsTitle: "Verified Properties",
  listingsAccent: "in Ghaziabad",
  listingsSub:
    "Every listing is UP RERA-verified and independently assessed through the Vedhara Verification Framework.",
  listings: [
    { id:"gz-01", title:"Raj Nagar Extension Residences", location:"Raj Nagar Extension, Ghaziabad", price:"₹ 1.35 Cr", config:"3 BHK", size:"1,250 sq.ft.", type:"Residential", status:"Under Construction", highlights:["RERA Registered","Affordable","Gated Community","Clubhouse"], image:img(7031604), pos:"16%", alt:"Raj Nagar Extension residences in Ghaziabad" },
    { id:"gz-02", title:"Indirapuram Apartments", location:"Indirapuram, Ghaziabad", price:"₹ 1.85 Cr", config:"3 BHK", size:"1,420 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Metro Proximity","Gated Complex","Premium Finishes"], image:img(37224965), pos:"79%", alt:"Indirapuram apartments in Ghaziabad" },
    { id:"gz-03", title:"Vaishali Flats", location:"Vaishali, Ghaziabad", price:"₹ 2.10 Cr", config:"3 BHK", size:"1,520 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Metro Connectivity","Gated Complex","Clubhouse"], image:img(13812522), pos:"50%", alt:"Vaishali flats in Ghaziabad" },
    { id:"gz-04", title:"Crossings Republik Flats", location:"Crossings Republik, Ghaziabad", price:"₹ 1.60 Cr", config:"3 BHK", size:"1,300 sq.ft.", type:"Residential", status:"Under Construction", highlights:["RERA Registered","Gated Community","Clubhouse","Premium Finishes"], image:img(87223), pos:"100%", alt:"Crossings Republik flats in Ghaziabad" },
    { id:"gz-05", title:"Kaushambi Residences", location:"Kaushambi, Ghaziabad", price:"₹ 1.95 Cr", config:"3 BHK", size:"1,450 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Metro Proximity","Gated Complex","Premium Finishes"], image:img(21071043), pos:"100%", alt:"Kaushambi residences in Ghaziabad" },
    { id:"gz-06", title:"Govindpuram Plots", location:"Govindpuram, Ghaziabad", price:"₹ 0.95 Cr", config:"150 sq.yds. Plot", size:"150 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Immediate Registry","Affordable","Green Locality"], image:img(32370506), pos:"80%", alt:"Govindpuram residential plots in Ghaziabad" },
    { id:"gz-07", title:"Noida Extension Edge", location:"Sector 16B, Ghaziabad", price:"₹ 1.25 Cr", config:"2 BHK", size:"1,050 sq.ft.", type:"Residential", status:"Just Launched", highlights:["RERA Registered","Affordable","Gated Community","Metro Proposed"], image:img(9170385), pos:"100%", alt:"Noida Extension edge apartments in Ghaziabad" },
    { id:"gz-08", title:"Sahibabad Industrial Shed", location:"Sahibabad, Ghaziabad", price:"₹ 2.60 Cr", config:"6,000 sq.ft.", size:"6,000 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Industrial Zone","Heavy Power","Warehouse","Loading Dock"], image:img(11666903), pos:"67%", alt:"Sahibabad industrial shed in Ghaziabad" },
    { id:"gz-09", title:"Raj Nagar Flats", location:"Raj Nagar, Ghaziabad", price:"₹ 1.75 Cr", config:"3 BHK", size:"1,350 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Established Locality","Gated Complex","Premium Finishes"], image:img(31656173), pos:"71%", alt:"Raj Nagar flats in Ghaziabad" },
    { id:"gz-10", title:"Vasundhara Residences", location:"Vasundhara, Ghaziabad", price:"₹ 1.90 Cr", config:"3 BHK", size:"1,400 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Gated Complex","Metro Proximity","Premium Finishes"], image:img(3027448), pos:"56%", alt:"Vasundhara residences in Ghaziabad" },
    { id:"gz-11", title:"Ghaziabad City Centre Retail", location:"Ghaziabad City Centre", price:"₹ 1.45 Cr", config:"900 sq.ft. Retail", size:"900 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Signage Visible","Loading Bay"], image:img(31763620), pos:"31%", alt:"Ghaziabad City Centre retail space" },
    { id:"gz-12", title:"Crossings Republik Plots", location:"Crossings Republik, Ghaziabad", price:"₹ 1.20 Cr", config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Immediate Registry","Gated Community","High Appreciation"], image:img(35101084), pos:"100%", alt:"Crossings Republik residential plots in Ghaziabad" },
    { id:"gz-13", title:"Vaishali Retail", location:"Vaishali, Ghaziabad", price:"₹ 1.80 Cr", config:"1,200 sq.ft. Retail", size:"1,200 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Metro Adjacent","Signage Visible","Loading Bay"], image:img(15301578), pos:"50%", alt:"Vaishali retail space in Ghaziabad" },
    { id:"gz-14", title:"Indirapuram Villa", location:"Indirapuram, Ghaziabad", price:"₹ 2.40 Cr", config:"4 BHK Villa", size:"2,300 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Gated Community","Private Garden","Premium Finishes"], image:img(28054849), pos:"90%", alt:"Indirapuram villa in Ghaziabad" },
    { id:"gz-15", title:"Sector 16B Apartments", location:"Sector 16B, Ghaziabad", price:"₹ 1.15 Cr", config:"2 BHK", size:"1,000 sq.ft.", type:"Residential", status:"Just Launched", highlights:["RERA Registered","Affordable","Gated Community","Metro Proposed"], image:img(27459248), pos:"59%", alt:"Sector 16B apartments in Ghaziabad" },
    { id:"gz-16", title:"Kaushambi Office", location:"Kaushambi, Ghaziabad", price:"₹ 1.35 Cr", config:"1,000 sq.ft. Office", size:"1,000 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Metro Adjacent","Deal Floor","24hr Security","Parking"], image:img(19279351), pos:"71%", alt:"Kaushambi office space in Ghaziabad" },
    { id:"gz-17", title:"Raj Nagar Extension Plots", location:"Raj Nagar Extension, Ghaziabad", price:"₹ 1.00 Cr", config:"160 sq.yds. Plot", size:"160 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Immediate Registry","High Appreciation","Gated Community"], image:img(33974297), pos:"86%", alt:"Raj Nagar Extension residential plots in Ghaziabad" },
    { id:"gz-18", title:"Vasundhara Apartments", location:"Vasundhara, Ghaziabad", price:"₹ 2.05 Cr", config:"3 BHK", size:"1,480 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Gated Complex","Metro Proximity","Premium Finishes"], image:img(12993967), pos:"100%", alt:"Vasundhara apartments in Ghaziabad" },
    { id:"gz-19", title:"Ghaziabad Industrial Shed", location:"Ghaziabad Industrial Area", price:"₹ 3.20 Cr", config:"7,500 sq.ft.", size:"7,500 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Industrial Zone","Heavy Power","Warehouse","Loading Dock"], image:img(5827062), pos:"37%", alt:"Ghaziabad industrial shed" },
    { id:"gz-20", title:"Niti Khand Flats", location:"Indirapuram, Ghaziabad", price:"₹ 1.70 Cr", config:"3 BHK", size:"1,300 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Gated Complex","Metro Proximity","Premium Finishes"], image:img(36611285), pos:"50%", alt:"Niti Khand flats in Indirapuram, Ghaziabad" },
  ],
  microMarkets: {
    eyebrow: "The Micro-Markets",
    title: "Affordable Corridors, Real Connectivity.",
    accent: "One Standard of Care.",
    items: [
      { name:"Raj Nagar Extension", tag:"High Demand", desc:"Ghaziabad's fastest-moving residential corridor with affordable apartments and plotted development. High absorption and metro potential define this belt.", points:["Affordable apartments","Plotted development","High absorption"] },
      { name:"Indirapuram", tag:"Established", desc:"One of Ghaziabad's most mature residential hubs with gated complexes, malls and metro connectivity. Stable values and complete infrastructure.", points:["Mature infrastructure","Metro connectivity","Stable values"] },
      { name:"Vaishali & Kaushambi", tag:"Connectivity Core", desc:"The metro-linked gateway to Delhi with high-rise living and strong rental demand. Compact, well-connected and liquid for investors.", points:["Metro-linked to Delhi","High-rise living","Strong rentals"] },
      { name:"Crossings Republik", tag:"Integrated", desc:"The planned integrated township with a mix of residential and commercial sectors. Self-contained living with ongoing development.", points:["Integrated township","Mixed-use sectors","Ongoing development"] },
      { name:"Sahibabad & Industrial Belt", tag:"Commercial", desc:"Ghaziabad's industrial and logistics heart along the NH-9 corridor. Warehouses and industrial sheds with strong demand from trade.", points:["Industrial & logistics","NH-9 corridor","Strong trade demand"] },
    ],
  },
  authorities: {
    eyebrow: "Authority Guide",
    title: "Who Approves, Who Registers,",
    accent: "and Who You Can Trust",
    items: [
      { title:"Uttar Pradesh RERA", applies:"Ghaziabad", mono:"UP", image:img(33217250), pos:"50% 70%", alt:"Uttar Pradesh RERA registration office for Ghaziabad projects", body:"All new projects in Ghaziabad must register with UP RERA (rera.up.gov.in). We verify registration numbers, quarterly progress reports and complaint history on the official portal before any listing goes live." },
      { title:"GDA (Ghaziabad Development Authority)", applies:"Sectors & Plots", mono:"GD", image:img(34968154), pos:"100%", alt:"Ghaziabad Development Authority for sector approvals and plots", body:"GDA sanctions layouts and allots plots across Ghaziabad. We verify sector approvals, allotment chains and any outstanding dues before recommending plotted development or commercial space." },
      { title:"Municipal Corporation Ghaziabad", applies:"Approvals & Taxes", mono:"MC", image:img(33848325), pos:"79%", alt:"Municipal Corporation Ghaziabad for building approvals and taxes", body:"Building sanctions, completion certificates and property taxes fall under the Municipal Corporation. We confirm the sanctioned plan and any pending dues." },
    ],
  },
  guide: {
    eyebrow: "Market Guide",
    title: "Before You Buy in Ghaziabad",
    accent: "Three Things That Actually Matter",
    items: [
      { t:"Verify UP RERA Status", d:"Registered projects file quarterly reports on rera.up.gov.in. We confirm the number, delivery timeline and any complaints before you commit." },
      { t:"Check GDA Approvals", d:"For plots and new corridors, we verify the GDA sanctioned layout, allotment chain and any dues. Buying inside the approved plan protects your investment." },
      { t:"Benchmark to Circle Rate", d:"Emerging corridors can carry speculative pricing. We compare against registered transactions in the same sector before advising." },
    ],
  },
  faqTitle: "Ghaziabad Questions, Answered Straight",
  faqs: [
    { q:"Is Ghaziabad a good place to invest in property?", a:"Yes, particularly for value-conscious buyers and investors. Ghaziabad offers affordable homes with metro connectivity, and high-demand corridors like Raj Nagar Extension carry real appreciation potential." },
    { q:"Which area in Ghaziabad is best to buy?", a:"Raj Nagar Extension offers growth and affordability; Indirapuram offers mature living; Vaishali and Kaushambi offer metro-linked convenience. The best choice depends on budget and whether you want immediate livability or growth." },
    { q:"Is Ghaziabad property freehold or leasehold?", a:"Most modern Ghaziabad projects are freehold with clear title. Some GDA allotments and commercial licences carry lease terms. We verify tenure from the title chain and authority records before recommending." },
    { q:"Is Ghaziabad closer to Delhi than Noida?", a:"Connectivity varies by sector. Vaishali and Kaushambi are metro-linked to Delhi quickly, while Indirapuram and Crossings Republik are well connected by road. We factor actual commute into every recommendation." },
    { q:"Are there good rental options in Ghaziabad?", a:"Yes. Ghaziabad's metro-linked localities and corporate base keep rental demand steady, especially in Vaishali, Kaushambi and Indirapuram. Yields are competitive for the price point." },
    { q:"What are the stamp duty and registration charges in Ghaziabad?", a:"Ghaziabad follows Uttar Pradesh stamp duty (around 7% with a lower rate for women buyers) plus registration and mutation charges. We compute the exact all-in cost for your property at the time of transaction." },
    { q:"Can an NRI buy property in Ghaziabad?", a:"Yes. NRIs can buy residential and commercial property in Ghaziabad through NRE/NRO channels without RBI approval. Our NRI desk manages the full remote purchase, including UP RERA checks." },
    { q:"How does Vedhara verify Ghaziabad listings?", a:"Every listing passes our five-check framework: UP RERA registration, builder delivery history, project approvals, price fairness and title documents. Results are published on every listing page." },
  ],
  schemaName: "Real Estate Advisory in Ghaziabad",
  schemaAreaServed: ["Ghaziabad"],
  schemaDescription: "Independent real estate advisory across Ghaziabad: verified buying, selling and investing in Indirapuram, Raj Nagar Extension, Vaishali and Crossings Republik with UP RERA due diligence.",
};

/* ═══════════════════════════════════════════════════════════════
   MATHURA & VRINDAVAN
   ═══════════════════════════════════════════════════════════════ */
const mathuraVrindavan: CityPageData = {
  slug: "mathura-vrindavan",
  name: "Mathura & Vrindavan",
  metaTitle: "Real Estate in Mathura & Vrindavan | Verified Property Advisory",
  metaDescription: "Buy, rent or invest in Mathura Vrindavan property with verified listings. Yamuna Expressway plots, Vrindavan villas & temple-town homes with UP RERA due diligence.",
  heroVideo: "/videos/mathura-vrindavan-city.mp4",
  heroPoster: img(11969919),
  eyebrow: "Mathura & Vrindavan",
  h1: "Real Estate in Mathura & Vrindavan.",
  h1Accent: "The Braj Heartland, Verified.",
  heroBody:
    "Mathura and Vrindavan blend India's most sacred pilgrimage corridor with one of its fastest-appreciating land markets: the Yamuna Expressway. From Vrindavan's gated villas to YEIDA-approved plotted sectors, we verify every listing against UP RERA and the MVDA master plan before it reaches you.",
  introEyebrow: "Why Mathura & Vrindavan",
  introTitle: "A Sacred City, A Serious Market.",
  introAccent: "Faith Meets Infrastructure.",
  introBody:
    "Few markets pair devotion with development like Braj. Lakhs of pilgrims visit Vrindavan's Prem Mandir and ISKCON every year, while the Yamuna Expressway and the upcoming high-speed rail station make Mathura a credible commuting and investment corridor. We turn that rare combination into an advantage: verified approvals, tourism-aware advice and pricing benchmarked to registered transactions.",
  listingsEyebrow: "Featured Listings",
  listingsTitle: "Verified Properties",
  listingsAccent: "in Mathura & Vrindavan",
  listingsSub:
    "Every listing is UP RERA-verified and independently assessed through the Vedhara Verification Framework.",
  listings: [
    { id:"mv-01", title:"Vrindavan Gated Plots", location:"Vrindavan, Mathura", price:"₹ 28 L", config:"120 sq.yds. Plot", size:"120 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["YEIDA Approved","Clear Title","Gated Community","High Appreciation"], image:img(33974297), pos:"86%", alt:"Vrindavan gated residential plots in Mathura" },
    { id:"mv-02", title:"Yamuna Expressway Farm Plots", location:"Yamuna Expressway, Mathura", price:"₹ 42 L", config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["YEIDA Approved","Expressway Frontage","Clear Title","Immediate Registry"], image:img(35101084), pos:"100%", alt:"Yamuna Expressway farm plots near Mathura" },
    { id:"mv-03", title:"Prem Mandir Villas", location:"Prem Mandir Road, Vrindavan", price:"₹ 1.65 Cr", config:"4 BHK Villa", size:"2,400 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Gated Community","Private Garden","Premium Finishes"], image:img(28054849), pos:"90%", alt:"Prem Mandir luxury villa in Vrindavan" },
    { id:"mv-04", title:"Dwarkadhish Residences", location:"Dwarkadhish Temple Road, Mathura", price:"₹ 72 L", config:"3 BHK", size:"1,380 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Temple Proximity","Gated Complex","Premium Finishes"], image:img(37224965), pos:"79%", alt:"Dwarkadhish residences in Mathura" },
    { id:"mv-05", title:"Holi Gate Retail", location:"Holi Gate, Mathura", price:"₹ 1.85 Cr", config:"1,000 sq.ft. Retail", size:"1,000 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Signage Visible","Loading Bay"], image:img(31763620), pos:"31%", alt:"Holi Gate retail space in Mathura" },
    { id:"mv-06", title:"ISKCON Avenue Apartments", location:"ISKCON Road, Vrindavan", price:"₹ 58 L", config:"2 BHK", size:"1,050 sq.ft.", type:"Residential", status:"Under Construction", highlights:["RERA Registered","Temple Proximity","Gated Community","Clubhouse"], image:img(7031604), pos:"16%", alt:"ISKCON Avenue apartments in Vrindavan" },
    { id:"mv-07", title:"Mathura Cantt Flats", location:"Mathura Cantt", price:"₹ 66 L", config:"3 BHK", size:"1,250 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Railway Proximity","Gated Complex","Premium Finishes"], image:img(13812522), pos:"50%", alt:"Mathura Cantonment flats" },
    { id:"mv-08", title:"Govardhan Road Plots", location:"Govardhan Road, Vrindavan", price:"₹ 34 L", config:"150 sq.yds. Plot", size:"150 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Pilgrimage Corridor","Affordable","Immediate Registry"], image:img(32370506), pos:"80%", alt:"Govardhan Road residential plots in Vrindavan" },
    { id:"mv-09", title:"Serviced Apartment (Tourism)", location:"Chatikara Road, Vrindavan", price:"₹ 48 L", config:"1 BHK Serviced", size:"650 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Tourism Demand","Fully Furnished","Hotel Managed","High Occupancy"], image:img(19279351), pos:"71%", alt:"Tourism serviced apartment in Vrindavan" },
    { id:"mv-10", title:"Gokul Riverside Residences", location:"Gokul, Mathura", price:"₹ 52 L", config:"3 BHK", size:"1,200 sq.ft.", type:"Residential", status:"Under Construction", highlights:["RERA Registered","Yamuna Views","Gated Community","Affordable"], image:img(9170385), pos:"100%", alt:"Gokul riverside residences in Mathura" },
    { id:"mv-11", title:"Barsana Farm Villa", location:"Barsana Road, Mathura", price:"₹ 1.25 Cr", config:"3 BHK Farmhouse", size:"5,000 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Heritage Town","Private Land","Farmhouse Living","Premium Finishes"], image:img(3027448), pos:"56%", alt:"Barsana farm villa in Braj region" },
    { id:"mv-12", title:"NH-19 Commercial Plaza", location:"NH-19 (Agra Road), Mathura", price:"₹ 2.40 Cr", config:"1,500 sq.ft. Retail", size:"1,500 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["Highway Frontage","High Footfall","Loading Bay","Signage Visible"], image:img(15301578), pos:"50%", alt:"NH-19 commercial plaza in Mathura" },
    { id:"mv-13", title:"Vrindavan Garden Villas", location:"Raman Reti, Vrindavan", price:"₹ 95 L", config:"3 BHK Villa", size:"1,800 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Gated Community","Private Garden","Temple Proximity"], image:img(87223), pos:"100%", alt:"Raman Reti garden villas in Vrindavan" },
    { id:"mv-14", title:"Radha Rani Heights", location:"Radha Rani Temple Road, Barsana", price:"₹ 78 L", config:"3 BHK", size:"1,450 sq.ft.", type:"Residential", status:"Under Construction", highlights:["RERA Registered","Heritage Town","Gated Community","Premium Finishes"], image:img(21071043), pos:"100%", alt:"Radha Rani Heights apartments in Barsana" },
    { id:"mv-15", title:"Nandgaon Green Plots", location:"Nandgaon, Mathura", price:"₹ 22 L", config:"100 sq.yds. Plot", size:"100 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Affordable","Pilgrimage Town","Green Locality"], image:img(5827062), pos:"37%", alt:"Nandgaon residential plots in Braj" },
    { id:"mv-16", title:"Mathura Mall Avenue", location:"Bhuteshwar, Mathura", price:"₹ 1.95 Cr", config:"1,200 sq.ft. Retail", size:"1,200 sq.ft.", type:"Commercial", status:"Ready to Move", highlights:["High Footfall","Market Centre","Signage Visible","Parking"], image:img(11666903), pos:"67%", alt:"Bhuteshwar commercial retail in Mathura" },
    { id:"mv-17", title:"Yamuna Ghat Heritage Residences", location:"Yamuna Ghat Road, Mathura", price:"₹ 88 L", config:"3 BHK", size:"1,550 sq.ft.", type:"Residential", status:"Under Construction", highlights:["RERA Registered","Yamuna Views","Gated Complex","Temple Proximity"], image:img(31656173), pos:"71%", alt:"Yamuna Ghat heritage residences in Mathura" },
    { id:"mv-18", title:"Vrindavan Serviced Suites", location:"Prem Mandir Road, Vrindavan", price:"₹ 62 L", config:"2 BHK Serviced", size:"900 sq.ft.", type:"Luxury", status:"Ready to Move", highlights:["Tourism Demand","Fully Furnished","Hotel Managed","High Occupancy"], image:img(27459248), pos:"59%", alt:"Prem Mandir serviced suites in Vrindavan" },
    { id:"mv-19", title:"Kosi Kalan Farm Plots", location:"Kosi Kalan, Mathura", price:"₹ 38 L", config:"250 sq.yds. Plot", size:"250 sq.yds.", type:"Plotted", status:"Available for Sale", highlights:["Clear Title","Expressway Proximity","Affordable","High Appreciation"], image:img(12993967), pos:"100%", alt:"Kosi Kalan farm plots in Mathura" },
    { id:"mv-20", title:"Mathura-Vrindavan Enclave", location:"Chatikara Road, Vrindavan", price:"₹ 1.05 Cr", config:"3 BHK Villa", size:"1,900 sq.ft.", type:"Residential", status:"Ready to Move", highlights:["RERA Registered","Gated Community","Private Garden","Premium Finishes"], image:img(36611285), pos:"50%", alt:"Mathura-Vrindavan enclave villa" },
  ],
  microMarkets: {
    eyebrow: "The Micro-Markets",
    title: "Sacred Corridors, Real Returns.",
    accent: "One Standard of Care.",
    items: [
      { name:"Vrindavan", tag:"Spiritual Hub", desc:"The temple heart of Braj; Prem Mandir, ISKCON and Banke Bihari draw pilgrims year-round. Gated plots and villas here enjoy both lifestyle value and strong tourism-driven rental demand.", points:["Prem Mandir & ISKCON","Gated villas & plots","Tourism rentals"] },
      { name:"Yamuna Expressway Corridor", tag:"High Appreciation", desc:"The 165-km expressway linking Greater Noida to Agra is reshaping Mathura's outskirts. YEIDA-approved plotted sectors near interchange points carry the region's strongest land appreciation.", points:["YEIDA approvals","Expressway frontage","Land appreciation"] },
      { name:"Mathura City", tag:"Established", desc:"Dwarkadhish, Holi Gate and the Cantonment anchor mature residential and commercial pockets with schools, hospitals and the railway junction. Stable values and complete infrastructure.", points:["Mature infrastructure","Railway connectivity","Stable values"] },
      { name:"Barsana & Nandgaon", tag:"Heritage", desc:"The birthplace of Radha Rani and home to Lathmar Holi. Growing demand for farmhouses, heritage villas and tourism properties as the Braj circuit develops.", points:["Heritage circuit","Farmhouse living","Tourism growth"] },
      { name:"Govardhan & Gokul", tag:"Pilgrimage Belt", desc:"Sacred towns along the 84-kos Braj parikrama. Affordable plots and riverside residences with steady devotional footfall and improving road connectivity.", points:["Pilgrimage corridor","Affordable plots","Yamuna views"] },
    ],
  },
  authorities: {
    eyebrow: "Authority Guide",
    title: "Who Approves, Who Registers,",
    accent: "and Who You Can Trust",
    items: [
      { title:"Uttar Pradesh RERA", applies:"Mathura & Vrindavan", mono:"UP", image:img(33217250), pos:"50% 70%", alt:"Uttar Pradesh RERA registration office for Mathura Vrindavan projects", body:"All new projects in Mathura and Vrindavan must register with UP RERA (rera.up.gov.in). We verify registration numbers, quarterly progress reports and complaint history on the official portal before any listing goes live." },
      { title:"MVDA (Mathura Vrindavan Development Authority)", applies:"Master Plan & Plots", mono:"MV", image:img(34968154), pos:"100%", alt:"Mathura Vrindavan Development Authority for master plan and plot approvals", body:"MVDA prepares the regional master plan and sanctions layouts and plot allotments. We verify master plan zoning, sector approvals and any outstanding dues before recommending plotted or commercial development." },
      { title:"Yamuna Expressway Industrial Development Authority", applies:"Expressway Corridor", mono:"YE", image:img(33848325), pos:"79%", alt:"Yamuna Expressway Industrial Development Authority for YEIDA sectors", body:"YEIDA governs notified sectors along the Yamuna Expressway, including several near Mathura. For corridor projects we confirm YEIDA allotment, land use and payment schedules directly on the official portal." },
    ],
  },
  guide: {
    eyebrow: "Market Guide",
    title: "Before You Buy in Mathura & Vrindavan",
    accent: "Three Things That Actually Matter",
    items: [
      { t:"Verify UP RERA & Land Use", d:"Registered projects file quarterly reports on rera.up.gov.in. For land, we confirm MVDA master plan zoning and YEIDA notification so you never buy outside the sanctioned plan." },
      { t:"Check Temple-Town Approvals", d:"Parts of Mathura and Vrindavan sit in heritage and pilgrimage zones with specific construction rules. We verify sanctioned plans, floor-area rules and clearances before you commit." },
      { t:"Benchmark to Circle Rate", d:"Corridor plots can carry speculative pricing. We compare against registered transactions and circle rates in the same sector before advising." },
    ],
  },
  faqTitle: "Mathura & Vrindavan Questions, Answered Straight",
  faqs: [
    { q:"Is it a good time to invest in Mathura Vrindavan property?", a:"Yes, particularly for long-horizon buyers. Vrindavan offers steady tourism-driven rentals, while YEIDA-approved plots along the Yamuna Expressway carry strong appreciation potential as infrastructure develops." },
    { q:"What are the land prices on the Yamuna Expressway near Mathura?", a:"Rates vary by sector and distance from interchange points. Plotted land in notified YEIDA sectors near Mathura typically starts in the ₹2,000–₹4,000 per sq.ft. range depending on location, approvals and frontage. We benchmark every shortlist to recent registered transactions." },
    { q:"Is Vrindavan property good for rental income?", a:"Vrindavan's year-round pilgrimage creates consistent demand for serviced apartments, guest houses and rental villas, especially around Prem Mandir, ISKCON and Banke Bihari. Hotel-managed serviced units often achieve higher occupancy than conventional residential." },
    { q:"Which is better to buy: Mathura or Vrindavan?", a:"It depends on your goal. Mathura offers mature living with railway and highway connectivity; Vrindavan offers temple-town lifestyle and tourism rentals. For land appreciation, the Yamuna Expressway corridor around both cities tends to outperform." },
    { q:"How will the high-speed rail station affect Mathura property?", a:"The proposed Delhi–Varanasi high-speed rail corridor includes a station near Mathura, which is expected to improve connectivity and lift demand in surrounding areas. We track sanctioned infrastructure and factor it into location advice." },
    { q:"Can an NRI buy property in Mathura Vrindavan?", a:"Yes. NRIs can freely buy residential and commercial property in Mathura and Vrindavan through NRE/NRO channels without RBI approval. Our NRI desk manages the complete remote purchase, including UP RERA and MVDA checks." },
    { q:"What are the stamp duty and registration charges in Mathura?", a:"Mathura follows Uttar Pradesh stamp duty (around 7%, with a reduced rate for women buyers) plus registration and mutation charges. We compute the exact all-in cost for your property at the time of transaction." },
    { q:"How does Vedhara verify Mathura Vrindavan listings?", a:"Every listing passes our five-check framework: UP RERA registration, builder delivery history, project approvals and master plan zoning, price fairness and title documents. Results are published on every listing page." },
  ],
  schemaName: "Real Estate Advisory in Mathura & Vrindavan",
  schemaAreaServed: ["Mathura", "Vrindavan"],
  schemaDescription: "Independent real estate advisory across Mathura and Vrindavan: verified buying, selling and investing in Vrindavan villas, Yamuna Expressway plots and Mathura city homes with UP RERA and MVDA due diligence.",
};

export const cityPages: Record<string, CityPageData> = {
  gurugram,
  noida,
  "greater-noida": greaterNoida,
  "south-delhi": southDelhi,
  chandigarh,
  mohali,
  panchkula,
  faridabad,
  ghaziabad,
  "mathura-vrindavan": mathuraVrindavan,
};
