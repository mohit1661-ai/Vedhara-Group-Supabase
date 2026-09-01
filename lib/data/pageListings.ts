/**
 * Listing data for the service pages (buy, sell, commercial, luxury, rent,
 * new-launches, tricity). Single source of truth: the pages render from these
 * arrays and lib/data/listingAnchors.ts indexes them for deep links, so a
 * listing title always resolves to the card id on its own page.
 */

interface LaunchProject {
  id:string;
  projectName:string;
  developer:string;
  location:string;
  startingPrice:string;
  configs:string;
  possession:string;
  type:"Residential"|"Luxury"|"Commercial"|"Plotted";
  status:"Just Launched"|"Pre-Launch"|"Under Construction"|"Phase 2 Released";
  highlights:string[];
  image:string;
  pos?:string;
  alt?:string;
}

export const launchProjects: LaunchProject[] = [
  {
    id:"ved-n01",
    projectName:"Aura Sky Villas",
    developer:"Prestige Group",
    location:"Sector 152, Noida",
    startingPrice:"₹ 1.85 Cr",
    configs:"2, 3, 4 BHK",
    possession:"Dec 2028",
    type:"Residential",
    status:"Just Launched",
    highlights:["RERA Applied","53 Towers","7 Acres Green","Club & Pool"],
    image:"https://images.pexels.com/photos/38341175/pexels-photo-38341175.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"84%",
    alt:"Aura Sky Villas by Prestige Group in Sector 152, Noida",
  },
  {
    id:"ved-n02",
    projectName:"The Presidential",
    developer:"DLF",
    location:"Sector 63A, Gurugram",
    startingPrice:"₹ 3.20 Cr",
    configs:"3, 4 BHK + Penthouse",
    possession:"Mar 2029",
    type:"Luxury",
    status:"Pre-Launch",
    highlights:["Limited Inventory","Golf Course Road","Private Elevator","Concierge"],
    image:"https://images.pexels.com/photos/30608874/pexels-photo-30608874.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"71%",
    alt:"The Presidential luxury project by DLF in Sector 63A, Gurugram",
  },
  {
    id:"ved-n03",
    projectName:"Central Business Park",
    developer:"Godrej Properties",
    location:"Sector 44, Gurugram",
    startingPrice:"₹ 95 Lakhs",
    configs:"500-2,500 sq.ft. Offices",
    possession:"Jun 2028",
    type:"Commercial",
    status:"Just Launched",
    highlights:["LEED Platinum","Metro Connector","Food Court","24hr Operation"],
    image:"https://images.pexels.com/photos/36903834/pexels-photo-36903834.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"84%",
    alt:"Central Business Park commercial offices by Godrej in Sector 44, Gurugram",
  },
  {
    id:"ved-n04",
    projectName:"Emerald County",
    developer:"Tata Housing",
    location:"Sector 150, Noida",
    startingPrice:"₹ 2.45 Cr",
    configs:"3, 4, 5 BHK",
    possession:"Sep 2028",
    type:"Residential",
    status:"Under Construction",
    highlights:["RERA Registered","35% Open Space","School Tie-up","Lake View"],
    image:"https://images.pexels.com/photos/11729105/pexels-photo-11729105.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"66%",
    alt:"Emerald County residential project by Tata Housing in Sector 150, Noida",
  },
  {
    id:"ved-n05",
    projectName:"Imperial Heights",
    developer:"M3M India",
    location:"Southern Peripheral Road, Gurugram",
    startingPrice:"₹ 2.85 Cr",
    configs:"3, 4 BHK",
    possession:"Apr 2028",
    type:"Residential",
    status:"Under Construction",
    highlights:["RERA Registered","Golf Course View","70% Sold","Possession Apr 2028"],
    image:"https://images.pexels.com/photos/30368780/pexels-photo-30368780.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"74%",
    alt:"Imperial Heights residential project by M3M India on Southern Peripheral Road, Gurugram",
  },
  {
    id:"ved-n06",
    projectName:"The Green Mile",
    developer:"Signature Global",
    location:"Sector 36, Sohna Road, Gurugram",
    startingPrice:"₹ 1.55 Cr",
    configs:"2, 3 BHK",
    possession:"Phase 2, Dec 2027",
    type:"Residential",
    status:"Phase 2 Released",
    highlights:["RERA Registered","Affordable Luxury","Duplex Options","Easy Payment Plan"],
    image:"https://images.pexels.com/photos/5711363/pexels-photo-5711363.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"The Green Mile affordable luxury project by Signature Global on Sohna Road, Gurugram",
  },
  {
    id:"ved-n07",
    projectName:"Santorini Bay",
    developer:"Sobha Ltd.",
    location:"Sector 47, Faridabad",
    startingPrice:"₹ 1.25 Cr",
    configs:"2, 3 BHK + Retail Shops",
    possession:"Aug 2028",
    type:"Residential",
    status:"Just Launched",
    highlights:["RERA Applied","Metro 800m","Neighbourhood Mall","Landscaped Gardens"],
    image:"https://images.pexels.com/photos/30381835/pexels-photo-30381835.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"82%",
    alt:"Santorini Bay residential project by Sobha in Sector 47, Faridabad",
  },
  {
    id:"ved-n08",
    projectName:"Oakwood Estate",
    developer:"Antriksh Group",
    location:"Sector 77, Noida",
    startingPrice:"₹ 1.85 Cr",
    configs:"3, 4 BHK + Plots",
    possession:"Plots Ready; Tower Dec 2028",
    type:"Plotted",
    status:"Under Construction",
    highlights:["RERA Registered","Gated Community","Plots Available","Bank Tied-up"],
    image:"https://images.pexels.com/photos/8330963/pexels-photo-8330963.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"Oakwood Estate gated community project by Antriksh Group in Sector 77, Noida",
  },
  {
    id:"ved-n09",
    projectName:"Altius Tower",
    developer:"Brigade Group",
    location:"Sector 152, Noida",
    startingPrice:"₹ 2.15 Cr",
    configs:"3, 4 BHK",
    possession:"Feb 2029",
    type:"Residential",
    status:"Pre-Launch",
    highlights:["Early Bird Pricing","RERA Applied","Noida Extension","High Appreciation Zone"],
    image:"https://images.pexels.com/photos/31325988/pexels-photo-31325988.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Altius Tower residential project by Brigade Group in Sector 152, Noida",
  },
];

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
  image:string;
  pos?:string;
  alt?:string;
}

export const featuredListings: PropertyListing[] = [
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
    image:"https://images.pexels.com/photos/11729105/pexels-photo-11729105.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"The Cullinan Heights luxury high-rise illuminated at dusk in Sector 150, Noida",
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
    image:"https://images.pexels.com/photos/31684126/pexels-photo-31684126.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"Amaryllis Residences luxury apartments on Golf Course Road, Gurugram",
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
    image:"https://images.pexels.com/photos/7672058/pexels-photo-7672058.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"Platinum Towers residential high-rise on Dwarka Expressway, Gurugram",
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
    image:"https://images.pexels.com/photos/5859963/pexels-photo-5859963.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"One Golden Mile commercial office building in Sector 62, Gurugram",
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
    image:"https://images.pexels.com/photos/20581232/pexels-photo-20581232.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Veda Forest Villas luxury villas in Sector 150, Noida",
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
    image:"https://images.pexels.com/photos/35114454/pexels-photo-35114454.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"80%",
    alt:"Magnolia Court premium apartments in Greater Kailash II, Delhi",
  },
];

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
  image:string;
  pos?:string;
  alt?:string;
}

export const sellListings: SellListing[] = [
  // NEWEST LISTINGS FIRST, add new properties at the top of this array
  {
    id:"ved-s07",
    title:"NH-8 Facing Plot, Sector 15",
    location:"Sector 15 Part 2, Gurugram",
    askingPrice:"₹ 18.50 Cr",
    config:"500 sq.yds. Plot",
    size:"500 sq.yds.",
    type:"Plotted",
    status:"Available for Sale",
    highlights:["Main NH-8 Facing","Green Belt Facing","Cheque Flexible","Prime Location"],
    image:"https://images.pexels.com/photos/11201060/pexels-photo-11201060.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"NH-8 facing residential plot in Sector 15 Part 2, Gurugram",
  },
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
    image:"https://images.pexels.com/photos/35808145/pexels-photo-35808145.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"19%",
    alt:"Sunset Villa independent floor in Sector 23, Dwarka, Delhi",
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
    image:"https://images.pexels.com/photos/7672060/pexels-photo-7672060.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Green Valley Apartment 3 BHK for sale in Sector 49, Gurugram",
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
    image:"https://images.pexels.com/photos/36676751/pexels-photo-36676751.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"67%",
    alt:"Lotus Business Center commercial office space in Sector 44, Gurugram",
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
    image:"https://images.pexels.com/photos/35203563/pexels-photo-35203563.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"28%",
    alt:"Royal Heritage Penthouse luxury penthouse on Golf Course Road, Gurugram",
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
    image:"https://images.pexels.com/photos/15422584/pexels-photo-15422584.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50%",
    alt:"Serene Garden Plot green residential plot land in Sector 150, Noida",
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
    image:"https://images.pexels.com/photos/33520069/pexels-photo-33520069.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"32%",
    alt:"Heritage Haveli heritage mansion in Mehrauli, South Delhi",
  },
];

interface CommercialListing {
  id:string;
  title:string;
  location:string;
  price:string;
  priceNote?:string;
  size:string;
  type:"Office"|"Retail"|"Industrial"|"Co-working"|"Land"|"Commercial";
  status:"Available"|"Leased"|"Under Offer"|"JV Opportunity"|"For Sale";
  highlights:string[];
  image:string;
  video?:string;
  poster?:string;
  images?:string[];
  gallery?:string[];
  pos?:string;
  alt?:string;
}

export const commercialListings: CommercialListing[] = [
  // NEWEST LISTINGS FIRST, add new properties at the top of this array
  {
    id:"ved-c16",
    title:"Fully Furnished Pre-Rented Building",
    location:"Sector 32, Gurugram",
    price:"₹ 200 Cr Demand",
    priceNote:"Rent ₹1.17 Cr/mo · Pre-Rented",
    size:"",
    type:"Commercial",
    status:"For Sale",
    highlights:[
      "4,000 sq.m. Plot · B2 + 5 Floors",
      "1,25,000 sq.ft. Leased Area",
      "Single Tenant · Highly Reputed Company",
      "Newly & Fully Furnished · Running",
      "New Lease · 3-Year Lock-in",
      "15% Escalation Every 3 Years",
    ],
    image:"/Images/Fully%20Newly%20Furnished%20rented%20building%20in%20Sector%2032%20Gurgaon.webp",
    images:[
      "/Images/Fully%20Newly%20Furnished%20rented%20building%20in%20Sector%2032%20Gurgaon.webp",
      "/Images/Sector%2032%20Furnished%20Rented%20property.png",
      "/Images/Furnished%20rented%20building%20in%20Sector%2032%20Gurgaon.webp",
      "/Images/Furnished%20rented%20building%20in%20sector%2032%20gurgaon%20image.webp",
      "/Images/Rented%20Furnished%20building%20in%20sector%2032%20gurugram%20image.webp",
    ],
    gallery:[
      "/Images/Fully%20Newly%20Furnished%20rented%20building%20in%20Sector%2032%20Gurgaon.webp",
      "/Images/Sector%2032%20Furnished%20Rented%20property.png",
      "/Images/Furnished%20rented%20building%20in%20Sector%2032%20Gurgaon.webp",
      "/Images/Furnished%20rented%20building%20in%20sector%2032%20gurgaon%20image.webp",
      "/Images/Rented%20Furnished%20building%20in%20sector%2032%20gurugram%20image.webp",
    ],
    alt:"Fully furnished pre-rented commercial building with single reputed tenant in Sector 32, Gurugram",
  },
  {
    id:"ved-c15",
    title:"Pre-Leased Industrial Estate",
    location:"Ghiloth Industrial Area, Neemrana, Rajasthan",
    price:"₹ 250 Cr Demand",
    priceNote:"₹225 Cr Net (Non-Negotiable) · Rent ₹1.60 Cr/mo",
    size:"",
    type:"Industrial",
    status:"For Sale",
    highlights:[
      "20-Acre Approved Industrial Plot",
      "6.5 Lakh sq.ft. Shed Area Across 3 Sheds",
      "1.10 Lakh sq.ft. RCC · Ground + 2 Floors",
      "Top MNC · Electronics Manufacturing",
      "Fresh 12-Year Lease · 3-Year Lock-in",
    ],
    image:"/Images/Neemrana%20Ghilot%20industrial%20area%20Image%20-%204.jpg",
    images:[
      "/Images/Neemrana%20Ghilot%20industrial%20area%20Image%20-%204.jpg",
      "/Images/Neemrana%20Ghilot%20industrial%20area%20Image%20-1.webp",
      "/Images/Neemrana%20Ghilot%20industrial%20area%20Image%20-%202.webp",
      "/Images/Neemrana%20Ghilot%20industrial%20area%20Image%20-%203.webp",
    ],
    gallery:[
      "/Images/Neemrana%20Ghilot%20industrial%20area%20Image%20-%204.jpg",
      "/Images/Neemrana%20Ghilot%20industrial%20area%20Image%20-1.webp",
      "/Images/Neemrana%20Ghilot%20industrial%20area%20Image%20-%202.webp",
      "/Images/Neemrana%20Ghilot%20industrial%20area%20Image%20-%203.webp",
    ],
    alt:"Pre-leased industrial estate with MNC electronics manufacturing tenant in Ghiloth Industrial Area, Neemrana",
  },
  {
    id:"ved-c14",
    title:"Laxman Public School",
    location:"Hauz Khas Enclave, South Delhi",
    price:"₹ 450 Cr (Negotiable)",
    priceNote:"Rental ₹25 L/mo · Hostel ₹1.95 Cr/mo",
    size:"",
    type:"Commercial",
    status:"For Sale",
    highlights:["8.5 Acres · 4 Owned + 4.5 DDA Lease","~1 Lakh sq.ft. Built-up","Running 40+ Years · CBSE · Co-Ed","Nursery–Class XII · 4,400 Students","160 Teaching + 40 Support Staff","Hostel: 1,300 Residents · 35 Buses","Cricket, Tennis, Basketball, Swimming Pool","Society-Owned · Zero Loans or Liability","Rentals: Bank, 2 Canteens, FIITJEE, Aakash"],
    image:"/Images/Laxman%20Public%20School%20Image%20-%203.jpg",
    images:[
      "/Images/Laxman%20Public%20School%20Image%20-%203.jpg",
      "/Images/Laxman%20Public%20School%20Image%20-%201.jpg",
      "/Images/Laxman%20Public%20School%20Image%20-%202.jpg",
      "/Images/Laxman%20Public%20School%20Image%20-%204.jpg",
      "/Images/Laxman%20Public%20School%20Image%20-%205.jpg",
    ],
    gallery:[
      "/Images/Laxman%20Public%20School%20Image%20-%203.jpg",
      "/Images/Laxman%20Public%20School%20Image%20-%201.jpg",
      "/Images/Laxman%20Public%20School%20Image%20-%202.jpg",
      "/Images/Laxman%20Public%20School%20Image%20-%204.jpg",
      "/Images/Laxman%20Public%20School%20Image%20-%205.jpg",
    ],
    alt:"Laxman Public School exterior building in Hauz Khas Enclave, South Delhi",
  },
  {
    id:"ved-c13",
    title:"Fortune Questa",
    location:"Udyog Vihar Phase VII, Sector 35, Gurugram",
    price:"₹ 150 Cr Demand",
    size:"",
    type:"Office",
    status:"For Sale",
    highlights:["LEED Silver Certified","Single ownership (not strata-titled)","2.84 lakh sq. ft. leasable area","40,000 sq. ft. floor plates","Within 5 km (sanctioned station)","Airport Distance 25 km (International)"],
    image:"https://images.pexels.com/photos/36676751/pexels-photo-36676751.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    images:[
      "https://images.pexels.com/photos/36676751/pexels-photo-36676751.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/35426261/pexels-photo-35426261.jpeg?auto=compress&cs=tinysrgb&w=500",
      "/Images/fortune-questa-location-map.webp",
    ],
    gallery:[
      "https://images.pexels.com/photos/36676751/pexels-photo-36676751.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/35426261/pexels-photo-35426261.jpeg?auto=compress&cs=tinysrgb&w=500",
      "/Images/fortune-questa-location-map.webp",
    ],
    alt:"LEED Silver Grade-A office building on NH-8, Gurugram",
  },
  {
    id:"ved-c12",
    title:"Pre-Rented Commercial Building",
    location:"Film City, Sector 16A, Noida",
    price:"₹ 220 Cr Demand",
    priceNote:"Rent ₹1.41 Cr / month · Pre-rented",
    size:"",
    type:"Commercial",
    status:"For Sale",
    highlights:["Pre-rented income asset","165,319 sq.ft. built-up","Basement + Stilt + 9 floors","90-yr Noida lease from 2006","Escalation 10–15% every 3–5 yrs","South-West facing","4,034 sq.yds. plot"],
    image:"/Images/film-city-noida-aerial.jpeg",
    images:[
      "/Images/film-city-noida-aerial.jpeg",
      "/Images/film-city-noida-02.jpeg",
    ],
    gallery:[
      "/Images/film-city-noida-aerial.jpeg",
      "/Images/film-city-noida-02.jpeg",
    ],
    alt:"Pre-rented commercial building for sale at Film City, Sector 16A, Noida",
  },
  {
    id:"ved-c10",
    title:"Commercial Building for Sale",
    location:"Udyog Vihar Phase 5, Gurugram",
    price:"₹ 40 Cr Demand",
    priceNote:"40,000 sq.ft. built-up",
    size:"",
    type:"Commercial",
    status:"For Sale",
    highlights:["Udyog Vihar 5","1,000 sq. m. plot","40,000 sq.ft. built-up","Established commercial zone"],
    image:"/Images/udyog-vihar-05.jpeg",
    images:[
      "/Images/udyog-vihar-05.jpeg",
      "/Images/udyog-vihar-07.jpeg",
      "/Images/udyog-vihar-09.jpeg",
    ],
    gallery:[
      "/Images/udyog-vihar-05.jpeg",
      "/Images/udyog-vihar-07.jpeg",
      "/Images/udyog-vihar-09.jpeg",
    ],
    alt:"Commercial building for sale in Udyog Vihar Phase 5, Gurugram",
  },
  {
    id:"ved-c11",
    title:"MG Road Commercial Building",
    location:"Sector 16, Gurugram",
    price:"₹ 25 Cr Demand",
    size:"",
    type:"Commercial",
    status:"For Sale",
    highlights:["MG Road","Opp. Sector 14","1,000 sq. m. plot","Prime commercial corridor"],
    image:"https://images.pexels.com/photos/5859963/pexels-photo-5859963.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    gallery:[
      "/Images/MG%20Road%20Commercial%20Building%20Images.webp",
      "/Images/Office%20Space%20in%20MG%20Road%20Gurgaon.webp",
      "/Images/Commercia%20Office%20Space%20in%20MG%20Road%20Gurgaon.jpg",
    ],
    alt:"Commercial building for sale in Sector 16 on MG Road, Gurugram",
  },
  {
    id:"ved-c07",
    title:"Commercial Land for JV",
    location:"Sector 67, Ansal Essencia, Gurgaon",
    price:"₹ 160 Cr Outright",
    priceNote:"JV: ₹35 Cr (non-adjustable) · 50:50",
    size:"",
    type:"Land",
    status:"JV Opportunity",
    highlights:["FSI 1,33,000 sq.ft.","Salable 2,60,000 sq.ft.","Structure G+3","Frontage 220 ft","Front road 60 m","M3M · IREO · Bestech · Emaar · BPTP","1.75 Acre"],
    image:"/Images/Commercial%20land%20available%20for%20JV%20in%20Gurgaon%20Site%20Plan.jpeg",
    video:"/videos/Commercial%20Land%20Available%20for%20JV%20in%20Gurgaon%20Video.mp4",
    poster:"/Images/Commercial%20land%20available%20for%20JV%20in%20Gurgaon%20Site%20Plan.jpeg",
    gallery:[
      "/Images/Commercial%20land%20available%20for%20JV%20in%20Gurgaon%20Site%20Plan.jpeg",
      "/Images/Digital%20Plan%20Gurgaon%20Commercial%20Land.jpeg",
      "/Images/Digital%20Plan%20Gurgaon%20Commercial%20Land%20Image.jpeg",
    ],
    alt:"Commercial land available for JV in Sector 67, Ansal Essencia, Gurgaon",
  },
  {
    id:"ved-c08",
    title:"Rented Commercial Building for Sale",
    location:"Udyog Vihar 2, Gurgaon",
    price:"₹ 270 Cr Demand",
    priceNote:"Rent ₹1.65 Cr / month",
    size:"",
    type:"Commercial",
    status:"For Sale",
    highlights:["4,000 sq. m. plot","₹1.65 Cr/month rent","Newly constructed, fully furnished","Reliable existing tenant","Payment 50:50"],
    image:"/Images/udyog-vihar-01.jpeg",
    images:[
      "/Images/udyog-vihar-01.jpeg",
      "/Images/udyog-vihar-02.jpeg",
      "/Images/udyog-vihar-03.jpeg",
      "/Images/udyog-vihar-04.jpeg",
      "/Images/udyog-vihar-05.jpeg",
      "/Images/udyog-vihar-06.jpeg",
      "/Images/udyog-vihar-07.jpeg",
      "/Images/udyog-vihar-08.jpeg",
      "/Images/udyog-vihar-09.jpeg",
      "/Images/udyog-vihar-10.jpeg",
      "/Images/udyog-vihar-11.jpeg",
      "/Images/udyog-vihar-12.jpeg",
      "/Images/udyog-vihar-13.jpeg",
      "/Images/udyog-vihar-14.jpeg",
      "/Images/udyog-vihar-15.jpeg",
      "/Images/udyog-vihar-16.jpeg",
      "/Images/udyog-vihar-17.jpeg",
      "/Images/udyog-vihar-18.jpeg",
      "/Images/udyog-vihar-19.jpeg",
    ],
    gallery:[
      "/Images/udyog-vihar-01.jpeg",
      "/Images/udyog-vihar-02.jpeg",
      "/Images/udyog-vihar-03.jpeg",
      "/Images/udyog-vihar-05.jpeg",
    ],
    alt:"Rented commercial building for sale in Udyog Vihar 2, Gurgaon",
  },
  {
    id:"ved-c09",
    title:"IT Pass Building for Sale",
    location:"Phase 1, Udyog Vihar, Gurgaon",
    price:"₹ 17 Cr Asking",
    priceNote:"Rent ₹5.0 L / month · Mix Cheque Deal",
    size:"",
    type:"Commercial",
    status:"For Sale",
    highlights:["IT Pass Building","Basement, GF+2","Shed-covered cafeteria on terrace","Basement vacant · rest floors rented","₹5.0 L / month rent","Mix Cheque Deal","450 sq. m. · 12,000 sq. ft. constructed"],
    image:"/Images/udyog-vihar-p1-03.jpeg",
    images:[
      "/Images/udyog-vihar-p1-03.jpeg",
      "/Images/udyog-vihar-p1-01.jpeg",
      "/Images/udyog-vihar-p1-02.jpeg",
      "/Images/udyog-vihar-p1-04.jpeg",
      "/Images/udyog-vihar-p1-05.jpeg",
      "/Images/udyog-vihar-p1-06.jpeg",
    ],
    gallery:[
      "/Images/udyog-vihar-p1-03.jpeg",
      "/Images/udyog-vihar-p1-01.jpeg",
      "/Images/udyog-vihar-p1-02.jpeg",
      "/Images/udyog-vihar-p1-04.jpeg",
    ],
    alt:"IT-pass commercial building for sale in Phase 1, Udyog Vihar, Gurgaon",
  },
  {
    id:"ved-c01",
    title:"One Horizon Center",
    location:"Sector 43, Gurugram",
    price:"₹ 12.50 Cr",
    size:"",
    type:"Office",
    status:"Available",
    highlights:["Golf Course Road","LEED Gold","Deal Floor","24hr Security","4,800 sq.ft."],
    image:"https://images.pexels.com/photos/38340685/pexels-photo-38340685.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"One Horizon Center office tower on Golf Course Road, Gurugram",
  },
  {
    id:"ved-c02",
    title:"Retail Arcade",
    location:"Sector 18, Noida",
    price:"₹ 2.85 Cr",
    size:"",
    type:"Retail",
    status:"Available",
    highlights:["High Footfall","Market Centre","Loading Bay","Signage Visible","1,200 sq.ft."],
    image:"https://images.pexels.com/photos/16140814/pexels-photo-16140814.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50%",
    alt:"Retail Arcade shopping arcade storefronts in Sector 18, Noida",
  },
  {
    id:"ved-c03",
    title:"Industrial Shed Complex",
    location:"Bhiwadi, Rajasthan (NCR)",
    price:"₹ 4.20 Cr",
    size:"",
    type:"Industrial",
    status:"Available",
    highlights:["NH-48 Access","Heavy Power","Warehouse","Loading Dock","8,500 sq.ft."],
    image:"https://images.pexels.com/photos/12347763/pexels-photo-12347763.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50%",
    alt:"Industrial Shed Complex warehouse in Bhiwadi, Rajasthan NCR",
  },
  {
    id:"ved-c04",
    title:"Cyber Park",
    location:"Sector 67, Gurugram",
    price:"₹ 95 Lakhs/yr",
    size:"",
    type:"Co-working",
    status:"Available",
    highlights:["Plug & Play","Meeting Rooms","Cafeteria","Networking Events","2,200 sq.ft."],
    image:"https://images.pexels.com/photos/36926207/pexels-photo-36926207.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"62%",
    alt:"Cyber Park co-working office space in Sector 67, Gurugram",
  },
  {
    id:"ved-c05",
    title:"Commercial Plot, Sector 150",
    location:"Sector 150, Noida",
    price:"₹ 6.80 Cr",
    size:"",
    type:"Land",
    status:"Available",
    highlights:["Mixed-Use Zoning","Noida Authority","Corner Plot","Ideal for Mall","2,500 sq.yds."],
    image:"https://images.pexels.com/photos/7765190/pexels-photo-7765190.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"50%",
    alt:"Commercial plot land parcel for mixed-use development in Sector 150, Noida",
  },
  {
    id:"ved-c06",
    title:"Platinum Business Centre",
    location:"MG Road, Gurugram",
    price:"₹ 18.00 Cr",
    size:"",
    type:"Office",
    status:"Under Offer",
    highlights:["MG Road Frontage","Corporate Zone","Basement Parking","100% Power Backup","6,200 sq.ft."],
    image:"https://images.pexels.com/photos/30704251/pexels-photo-30704251.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"59%",
    alt:"Platinum Business Centre corporate office on MG Road, Gurugram",
  },
];

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
  image:string;
  pos?:string;
  alt?:string;
}

export const luxuryListings: LuxuryListing[] = [
  // NEWEST LISTINGS FIRST, add new properties at the top of this array
  {
    id:"ved-l07",
    title:"Sector 15 Duplex Kothi",
    location:"Sector 15 Part 2, Gurugram",
    price:"₹ 18 Cr",
    config:"4 BHK + Servant Quarter",
    size:"502 sq.yds.",
    type:"Villa",
    status:"Available",
    highlights:["Prime Sector 15","Duplex Layout","Servant Quarter","NH-8 Connectivity"],
    image:"https://images.pexels.com/photos/35808145/pexels-photo-35808145.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Sector 15 duplex kothi villa in Gurugram",
  },
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
    image:"https://images.pexels.com/photos/20418771/pexels-photo-20418771.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"One Golf Course Penthouse luxury penthouse on Golf Course Road, Gurugram",
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
    image:"https://images.pexels.com/photos/16573669/pexels-photo-16573669.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"72%",
    alt:"Sovereign Villa lakefront luxury villa in Sector 150, Noida",
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
    image:"https://images.pexels.com/photos/33985273/pexels-photo-33985273.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"31%",
    alt:"The Claridge Estate heritage luxury mansion in Jubilee Hills, Delhi",
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
    image:"https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Skydeck Residence luxury penthouse in Sector 62, Gurugram",
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
    image:"https://images.pexels.com/photos/1630114/pexels-photo-1630114.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"16%",
    alt:"Magnolia Mansion luxury independent floor in Greater Kailash II, Delhi",
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
    image:"https://images.pexels.com/photos/36676879/pexels-photo-36676879.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"63%",
    alt:"Tuscan Valley Retreat luxury villa with pool on Sohna Road, Gurugram",
  },
];

interface RentalListing {
  id:string;
  title:string;
  location:string;
  monthlyRent:string;
  deposit:string;
  config:string;
  size:string;
  furnished:"Fully Furnished"|"Semi Furnished"|"Unfurnished";
  type:"Residential"|"Commercial";
  status:"Available"|"Recently Leased"|"Under Offer";
  highlights:string[];
  image:string;
  pos?:string;
  alt?:string;
}

export const rentalListings: RentalListing[] = [
  {
    id:"ved-r01",
    title:"The Aspen Residency",
    location:"Sector 57, Gurugram",
    monthlyRent:"₹ 58,000/mo",
    deposit:"₹ 1.74 Lakhs",
    config:"3 BHK",
    size:"1,550 sq.ft.",
    furnished:"Fully Furnished",
    type:"Residential",
    status:"Available",
    highlights:["Gurugram prime location","Gated Society","Parking Included","Power Backup"],
    image:"https://images.pexels.com/photos/33559373/pexels-photo-33559373.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"0%",
    alt:"The Aspen Residency 3 BHK rental apartment in Sector 57, Gurugram",
  },
  {
    id:"ved-r02",
    title:"Palm Grove Apartments",
    location:"Sector 44, Noida",
    monthlyRent:"₹ 42,000/mo",
    deposit:"₹ 1.26 Lakhs",
    config:"2 BHK",
    size:"1,250 sq.ft.",
    furnished:"Semi Furnished",
    type:"Residential",
    status:"Available",
    highlights:["Noida Sec 44","Metro 500m","Balcony","24hr Water"],
    image:"https://images.pexels.com/photos/27085225/pexels-photo-27085225.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"61%",
    alt:"Palm Grove Apartments 2 BHK rental in Sector 44, Noida",
  },
  {
    id:"ved-r03",
    title:"Corporate Square",
    location:"Sector 62, Gurugram",
    monthlyRent:"₹ 1,85,000/mo",
    deposit:"₹ 5.55 Lakhs",
    config:"2,800 sq.ft. Office",
    size:"2,800 sq.ft.",
    furnished:"Fully Furnished",
    type:"Commercial",
    status:"Available",
    highlights:["IT/Tech Hub","Conference Room","Pantry","24hr Security"],
    image:"https://images.pexels.com/photos/5859962/pexels-photo-5859962.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"95%",
    alt:"Corporate Square office space for rent in Sector 62, Gurugram",
  },
  {
    id:"ved-r04",
    title:"Vasant Residency",
    location:"Vasant Kunj, Delhi",
    monthlyRent:"₹ 65,000/mo",
    deposit:"₹ 2.60 Lakhs",
    config:"3 BHK + Servant",
    size:"1,750 sq.ft.",
    furnished:"Semi Furnished",
    type:"Residential",
    status:"Available",
    highlights:["South Delhi","Lawns & Park","Covered Parking","Close to Airport"],
    image:"https://images.pexels.com/photos/34623003/pexels-photo-34623003.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"80%",
    alt:"Vasant Residency 3 BHK rental in Vasant Kunj, Delhi",
  },
  {
    id:"ved-r05",
    title:"Lake Vista Heights",
    location:"Sector 150, Noida",
    monthlyRent:"₹ 75,000/mo",
    deposit:"₹ 3.00 Lakhs",
    config:"4 BHK",
    size:"2,200 sq.ft.",
    furnished:"Fully Furnished",
    type:"Residential",
    status:"Under Offer",
    highlights:["Lake View","Premium Finishes","Clubhouse","Modular Kitchen"],
    image:"https://images.pexels.com/photos/4792297/pexels-photo-4792297.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"63%",
    alt:"Lake Vista Heights 4 BHK rental with lake view in Sector 150, Noida",
  },
  {
    id:"ved-r06",
    title:"Galleria Business Hub",
    location:"MG Road, Gurugram",
    monthlyRent:"₹ 2,40,000/mo",
    deposit:"₹ 7.20 Lakhs",
    config:"3,500 sq.ft. Retail",
    size:"3,500 sq.ft.",
    furnished:"Semi Furnished",
    type:"Commercial",
    status:"Available",
    highlights:["MG Road Front","High Footfall","Washroom","Loading Bay"],
    image:"https://images.pexels.com/photos/13425897/pexels-photo-13425897.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Galleria Business Hub retail mall on MG Road, Gurugram",
  },
];

interface TricityListing {
  id:string;
  title:string;
  location:string;
  price:string;
  config:string;
  size:string;
  type:"Residential"|"Luxury"|"Commercial"|"Plotted";
  status:"Ready to Move"|"Possession Dec 2026"|"Under Construction"|"Available for Sale";
  highlights:string[];
  image:string;
  pos?:string;
  alt?:string;
}

export const tricityListings: TricityListing[] = [
  {
    id:"ved-t01",
    title:"The Corbusier Residences",
    location:"Sector 17, Chandigarh",
    price:"₹ 6.75 Cr",
    config:"4 BHK + Study",
    size:"2,850 sq.ft.",
    type:"Residential",
    status:"Ready to Move",
    highlights:["Estate Office NOC","Freehold Title","Golf Course View","Clubhouse Access"],
    image:"https://images.pexels.com/photos/32355381/pexels-photo-32355381.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"58%",
    alt:"The Corbusier Residences apartment building in Sector 17, Chandigarh",
  },
  {
    id:"ved-t02",
    title:"Sukna Lakefront Villas",
    location:"Sector 4, Panchkula",
    price:"₹ 8.90 Cr",
    config:"5 BHK Villa",
    size:"4,200 sq.ft.",
    type:"Luxury",
    status:"Ready to Move",
    highlights:["HRERA Registered","Lake Front","Freehold Converted","Private Garden"],
    image:"https://images.pexels.com/photos/37433082/pexels-photo-37433082.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt:"Sukna Lakefront Villas luxury villas in Sector 4, Panchkula",
  },
  {
    id:"ved-t03",
    title:"Aero City Heights",
    location:"Airport Road, Mohali",
    price:"₹ 2.65 Cr",
    config:"3 BHK",
    size:"1,650 sq.ft.",
    type:"Residential",
    status:"Possession Dec 2026",
    highlights:["Punjab RERA","IT Park Proximity","Gated Community","Metro Proposed"],
    image:"https://images.pexels.com/photos/35229793/pexels-photo-35229793.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"Aero City Heights apartments on Airport Road, Mohali",
  },
  {
    id:"ved-t04",
    title:"New Chandigarh Skyline",
    location:"Sector 101, New Chandigarh",
    price:"₹ 4.20 Cr",
    config:"4 BHK",
    size:"2,350 sq.ft.",
    type:"Residential",
    status:"Under Construction",
    highlights:["GMADA Approved","High Appreciation","Smart Home","Panoramic Balcony"],
    image:"https://images.pexels.com/photos/11442140/pexels-photo-11442140.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"98%",
    alt:"New Chandigarh Skyline apartments in Sector 101, New Chandigarh",
  },
  {
    id:"ved-t05",
    title:"Zirakpur Metro Square",
    location:"VIP Road, Zirakpur",
    price:"₹ 1.85 Cr",
    config:"1,800 sq.ft. Retail",
    size:"1,800 sq.ft.",
    type:"Commercial",
    status:"Ready to Move",
    highlights:["High Footfall","GMADA Zone","Signage Visible","Car Parking"],
    image:"https://images.pexels.com/photos/11840337/pexels-photo-11840337.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"69%",
    alt:"Zirakpur Metro Square retail space on VIP Road, Zirakpur",
  },
  {
    id:"ved-t06",
    title:"Kharar Green County",
    location:"Kharar, Mohali",
    price:"₹ 2.10 Cr",
    config:"300 sq.yds. Plot",
    size:"300 sq.yds.",
    type:"Plotted",
    status:"Available for Sale",
    highlights:["GMADA Approved","Corner Plot","Clear Title","Immediate Registry"],
    image:"https://images.pexels.com/photos/9716228/pexels-photo-9716228.jpeg?auto=compress&cs=tinysrgb&w=900",
    pos:"100%",
    alt:"Kharar Green County residential plot in Kharar, Mohali",
  },
];
