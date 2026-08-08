/**
 * Shared search dataset for the /search results page.
 * Normalized from the real listing arrays on the buy/rent/commercial/luxury/
 * new-launches/tricity pages so the site-wide search returns real, consistent
 * inventory. `value` is numeric for budget filtering — lakhs (₹) for buy/sell,
 * monthly rent (₹) for rent.
 */

export type SearchMode = "buy" | "rent" | "sell";
export type SearchType = "apartment" | "villa" | "plot" | "penthouse" | "commercial";

export interface SearchListing {
  id: string;
  title: string;
  location: string;
  city: string;
  price: string;
  value: number;
  config: string;
  size: string;
  type: SearchType;
  mode: SearchMode;
  category: string;
  image: string;
  pos?: string;
  alt?: string;
  link: string;
  tag: string;
  keywords: string;
}

const img = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

function kw(...parts: string[]) {
  return parts.join(" ").toLowerCase();
}

const L: SearchListing[] = [
  // ── BUY ────────────────────────────────────────────────
  { id:"ved-001", title:"The Cullinan Heights", location:"Sector 150, Noida", city:"noida", price:"₹ 4.85 Cr", value:485, config:"4 BHK + Study", size:"2,450 sq.ft.", type:"apartment", mode:"buy", category:"Residential", image:img(11729105), alt:"The Cullinan Heights luxury high-rise in Sector 150, Noida", link:"/buy", tag:"Ready to Move", keywords:kw("cullinan heights noida sector 150 4 bhk apartment buy verified residential ready to move golf course view") },
  { id:"ved-002", title:"Amaryllis Residences", location:"Golf Course Road, Gurugram", city:"gurugram", price:"₹ 6.20 Cr", value:620, config:"3 BHK + Servant", size:"2,150 sq.ft.", type:"apartment", mode:"buy", category:"Luxury", image:img(31684126), pos:"100%", alt:"Amaryllis Residences luxury apartments on Golf Course Road, Gurugram", link:"/new-launches", tag:"Possession Oct 2026", keywords:kw("amaryllis residences gurugram golf course road 3 bhk apartment luxury new launch buy") },
  { id:"ved-003", title:"Platinum Towers", location:"Dwarka Expressway, Gurugram", city:"gurugram", price:"₹ 2.95 Cr", value:295, config:"3 BHK", size:"1,650 sq.ft.", type:"apartment", mode:"buy", category:"Residential", image:img(7672058), pos:"100%", alt:"Platinum Towers residential high-rise on Dwarka Expressway, Gurugram", link:"/buy", tag:"Possession Dec 2026", keywords:kw("platinum towers gurugram dwarka expressway 3 bhk apartment buy metro") },
  { id:"ved-004", title:"One Golden Mile", location:"Sector 62, Gurugram", city:"gurugram", price:"₹ 8.50 Cr", value:850, config:"4,500 sq.ft. Office", size:"4,500 sq.ft.", type:"commercial", mode:"buy", category:"Commercial", image:img(5859963), pos:"100%", alt:"One Golden Mile commercial office building in Sector 62, Gurugram", link:"/commercial", tag:"Ready to Move", keywords:kw("one golden mile gurugram sector 62 office commercial buy leed") },
  { id:"ved-005", title:"Veda Forest Villas", location:"Sector 150, Noida", city:"noida", price:"₹ 7.50 Cr", value:750, config:"5 BHK Independent Floor", size:"3,800 sq.ft.", type:"villa", mode:"buy", category:"Luxury", image:img(20581232), alt:"Veda Forest Villas luxury villas in Sector 150, Noida", link:"/buy", tag:"Ready to Move", keywords:kw("veda forest villas noida sector 150 5 bhk villa luxury buy private pool") },
  { id:"ved-006", title:"Magnolia Court", location:"Greater Kailash II, Delhi", city:"delhi", price:"₹ 3.40 Cr", value:340, config:"3 BHK", size:"1,550 sq.ft.", type:"apartment", mode:"buy", category:"Residential", image:img(35114454), pos:"80%", alt:"Magnolia Court premium apartments in Greater Kailash II, Delhi", link:"/buy", tag:"Under Construction", keywords:kw("magnolia court delhi greater kailash 3 bhk apartment buy south delhi") },
  { id:"ved-c01", title:"One Horizon Center", location:"Sector 43, Gurugram", city:"gurugram", price:"₹ 12.50 Cr", value:1250, config:"4,800 sq.ft. Office", size:"4,800 sq.ft.", type:"commercial", mode:"buy", category:"Commercial", image:img(38340685), alt:"One Horizon Center office tower on Golf Course Road, Gurugram", link:"/commercial", tag:"Available", keywords:kw("one horizon center gurugram golf course road office commercial buy leed gold") },
  { id:"ved-c02", title:"Retail Arcade", location:"Sector 18, Noida", city:"noida", price:"₹ 2.85 Cr", value:285, config:"1,200 sq.ft. Retail", size:"1,200 sq.ft.", type:"commercial", mode:"buy", category:"Commercial", image:img(16140814), pos:"50%", alt:"Retail Arcade shopping arcade storefronts in Sector 18, Noida", link:"/commercial", tag:"Available", keywords:kw("retail arcade noida sector 18 retail shop commercial buy footfall") },
  { id:"ved-c05", title:"Commercial Plot, Sector 150", location:"Sector 150, Noida", city:"noida", price:"₹ 6.80 Cr", value:680, config:"2,500 sq.yds. Land", size:"2,500 sq.yds.", type:"plot", mode:"buy", category:"Commercial", image:img(7765190), pos:"50%", alt:"Commercial plot land parcel for mixed-use development in Sector 150, Noida", link:"/commercial", tag:"Available", keywords:kw("commercial plot noida sector 150 land plot buy mixed use") },
  { id:"ved-l01", title:"One Golf Course Penthouse", location:"Golf Course Road, Gurugram", city:"gurugram", price:"₹ 12.80 Cr", value:1280, config:"5 BHK + Pool", size:"4,200 sq.ft.", type:"penthouse", mode:"buy", category:"Luxury", image:img(20418771), alt:"One Golf Course Penthouse luxury penthouse on Golf Course Road, Gurugram", link:"/luxury", tag:"Available", keywords:kw("one golf course penthouse gurugram golf course road penthouse 5 bhk luxury buy jacuzzi") },
  { id:"ved-l02", title:"Sovereign Villa", location:"Sector 150, Noida", city:"noida", price:"₹ 9.50 Cr", value:950, config:"6 BHK + Study", size:"5,800 sq.ft.", type:"villa", mode:"buy", category:"Luxury", image:img(16573669), pos:"72%", alt:"Sovereign Villa lakefront luxury villa in Sector 150, Noida", link:"/luxury", tag:"Available", keywords:kw("sovereign villa noida sector 150 6 bhk villa luxury buy lake front") },
  { id:"ved-l03", title:"The Claridge Estate", location:"Jubilee Hills, Delhi", city:"delhi", price:"₹ 18.50 Cr", value:1850, config:"7 BHK + Guest Wing", size:"8,200 sq.ft.", type:"villa", mode:"buy", category:"Luxury", image:img(33985273), pos:"31%", alt:"The Claridge Estate heritage luxury mansion in Jubilee Hills, Delhi", link:"/luxury", tag:"Available", keywords:kw("claridge estate delhi jubilee hills villa estate luxury buy heritage") },
  { id:"ved-l04", title:"Skydeck Residence", location:"Sector 62, Gurugram", city:"gurugram", price:"₹ 7.95 Cr", value:795, config:"4 BHK Penthouse", size:"3,100 sq.ft.", type:"penthouse", mode:"buy", category:"Luxury", image:img(8082227), alt:"Skydeck Residence luxury penthouse in Sector 62, Gurugram", link:"/luxury", tag:"Under Offer", keywords:kw("skydeck residence gurugram sector 62 penthouse 4 bhk luxury buy") },
  { id:"ved-n01", title:"Aura Sky Villas", location:"Sector 152, Noida", city:"noida", price:"₹ 1.85 Cr", value:185, config:"3 BHK Villas", size:"On request", type:"villa", mode:"buy", category:"New Launch", image:img(38341175), pos:"84%", alt:"Aura Sky Villas new launch villas in Sector 152, Noida", link:"/new-launches", tag:"Just Launched", keywords:kw("aura sky villas noida sector 152 villa new launch buy") },
  { id:"ved-n03", title:"Central Business Park", location:"Sector 44, Gurugram", city:"gurugram", price:"₹ 95 Lakhs", value:95, config:"Commercial Offices", size:"On request", type:"commercial", mode:"buy", category:"New Launch", image:img(36903834), pos:"84%", alt:"Central Business Park commercial offices by Godrej in Sector 44, Gurugram", link:"/new-launches", tag:"Just Launched", keywords:kw("central business park gurugram sector 44 office commercial new launch buy") },
  { id:"ved-n07", title:"Oakwood Estate", location:"Sector 77, Noida", city:"noida", price:"₹ 1.85 Cr", value:185, config:"Plotted Development", size:"On request", type:"plot", mode:"buy", category:"New Launch", image:img(8330963), pos:"100%", alt:"Oakwood Estate gated community plots in Sector 77, Noida", link:"/new-launches", tag:"Under Construction", keywords:kw("oakwood estate noida sector 77 plot plotted new launch buy gated community") },
  { id:"ved-t01", title:"The Corbusier Residences", location:"Sector 17, Chandigarh", city:"chandigarh", price:"₹ 6.75 Cr", value:675, config:"4 BHK", size:"On request", type:"apartment", mode:"buy", category:"Tricity", image:img(32355381), alt:"The Corbusier Residences apartment building in Sector 17, Chandigarh", link:"/tricity", tag:"Ready to Move", keywords:kw("corbusier residences chandigarh sector 17 4 bhk apartment buy tricity") },
  { id:"ved-t02", title:"Sukna Lakefront Villas", location:"Sector 4, Panchkula", city:"panchkula", price:"₹ 8.90 Cr", value:890, config:"5 BHK Villas", size:"On request", type:"villa", mode:"buy", category:"Tricity", image:img(37433082), alt:"Sukna Lakefront Villas luxury villas in Sector 4, Panchkula", link:"/tricity", tag:"Ready to Move", keywords:kw("sukna lakefront villas panchkula villa luxury buy tricity") },

  // ── RENT ────────────────────────────────────────────────
  { id:"ved-r01", title:"The Aspen Residency", location:"Sector 57, Gurugram", city:"gurugram", price:"₹ 58,000/mo", value:58000, config:"3 BHK", size:"1,550 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(33559373), pos:"0%", alt:"The Aspen Residency 3 BHK rental apartment in Sector 57, Gurugram", link:"/rent", tag:"Available", keywords:kw("aspen residency gurugram sector 57 3 bhk apartment rent fully furnished") },
  { id:"ved-r02", title:"Palm Grove Apartments", location:"Sector 44, Noida", city:"noida", price:"₹ 42,000/mo", value:42000, config:"2 BHK", size:"1,250 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(27085225), pos:"61%", alt:"Palm Grove Apartments 2 BHK rental in Sector 44, Noida", link:"/rent", tag:"Available", keywords:kw("palm grove noida sector 44 2 bhk apartment rent metro") },
  { id:"ved-r03", title:"Corporate Square", location:"Sector 62, Gurugram", city:"gurugram", price:"₹ 1,85,000/mo", value:185000, config:"2,800 sq.ft. Office", size:"2,800 sq.ft.", type:"commercial", mode:"rent", category:"Commercial", image:img(5859962), pos:"95%", alt:"Corporate Square office space for rent in Sector 62, Gurugram", link:"/rent", tag:"Available", keywords:kw("corporate square gurugram sector 62 office commercial rent") },
  { id:"ved-r04", title:"Vasant Residency", location:"Vasant Kunj, Delhi", city:"delhi", price:"₹ 65,000/mo", value:65000, config:"3 BHK + Servant", size:"1,750 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(34623003), pos:"80%", alt:"Vasant Residency 3 BHK rental in Vasant Kunj, Delhi", link:"/rent", tag:"Available", keywords:kw("vasant residency delhi vasant kunj 3 bhk apartment rent south delhi") },
  { id:"ved-r05", title:"Lake Vista Heights", location:"Sector 150, Noida", city:"noida", price:"₹ 75,000/mo", value:75000, config:"4 BHK", size:"2,200 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(4792297), pos:"63%", alt:"Lake Vista Heights 4 BHK rental with lake view in Sector 150, Noida", link:"/rent", tag:"Under Offer", keywords:kw("lake vista heights noida sector 150 4 bhk apartment rent lake view") },
  { id:"ved-r06", title:"Galleria Business Hub", location:"MG Road, Gurugram", city:"gurugram", price:"₹ 2,40,000/mo", value:240000, config:"3,500 sq.ft. Retail", size:"3,500 sq.ft.", type:"commercial", mode:"rent", category:"Commercial", image:img(13425897), alt:"Galleria Business Hub retail space for rent on MG Road, Gurugram", link:"/rent", tag:"Available", keywords:kw("galleria business hub gurugram mg road retail commercial rent") },

  // ── SELL ────────────────────────────────────────────────
  { id:"ved-s01", title:"Serene Garden Plot", location:"Sector 150, Noida", city:"noida", price:"₹ 4.50 Cr", value:450, config:"450 sq.yds.", size:"450 sq.yds.", type:"plot", mode:"sell", category:"Plotted", image:img(15422584), pos:"50%", alt:"Serene Garden Plot green residential plot in Sector 150, Noida", link:"/sell", tag:"Available for Sale", keywords:kw("serene garden plot noida sector 150 plot sell plotted") },
  { id:"ved-t03", title:"Kharar Green County", location:"Kharar, Mohali", city:"mohali", price:"₹ 2.10 Cr", value:210, config:"Plotted Development", size:"On request", type:"plot", mode:"sell", category:"Plotted", image:img(9716228), alt:"Kharar Green County gated community plots in Kharar, Mohali", link:"/tricity", tag:"Available for Sale", keywords:kw("kharar green county mohali kharar plot plotted sell tricity") },

  // ── FARIDABAD ───────────────────────────────────────────
  { id:"ved-fb1", title:"Santorini Bay", location:"Sector 47, Faridabad", city:"faridabad", price:"₹ 1.25 Cr", value:125, config:"2 BHK", size:"1,150 sq.ft.", type:"apartment", mode:"buy", category:"Residential", image:img(30381835), pos:"82%", alt:"Santorini Bay 2 BHK apartments in Sector 47, Faridabad", link:"/faridabad", tag:"Just Launched", keywords:kw("santorini bay faridabad sector 47 2 bhk apartment flat buy sobha group affordable luxury gated community ready to move fbd") },
  { id:"ved-fb2", title:"Sector 85 Villa", location:"Sector 85, Faridabad", city:"faridabad", price:"₹ 1.95 Cr", value:195, config:"3 BHK Villa", size:"1,800 sq.ft.", type:"villa", mode:"buy", category:"Residential", image:img(32563332), pos:"76%", alt:"Sector 85 villa in Faridabad", link:"/faridabad", tag:"Ready to Move", keywords:kw("sector 85 villa faridabad 3 bhk villa house bungalow buy ready to move fbd") },
  { id:"ved-fb3", title:"Sector 14 Market Retail", location:"Sector 14, Faridabad", city:"faridabad", price:"₹ 1.75 Cr", value:175, config:"1,100 sq.ft. Retail", size:"1,100 sq.ft.", type:"commercial", mode:"buy", category:"Commercial", image:img(30929605), pos:"50%", alt:"Sector 14 market retail space in Faridabad", link:"/faridabad", tag:"Ready to Move", keywords:kw("sector 14 market retail faridabad commercial shop retail space showroom buy fbd") },
  { id:"ved-fb4", title:"Sector 21C Rental", location:"Sector 21C, Faridabad", city:"faridabad", price:"₹ 28,000/mo", value:28000, config:"3 BHK", size:"1,350 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(33244441), pos:"84%", alt:"Sector 21C 3 BHK rental apartment in Faridabad", link:"/faridabad", tag:"Available", keywords:kw("sector 21c faridabad 3 bhk apartment flat rent lease rental furnished fbd") },
  { id:"ved-fb5", title:"Sector 15A Office Rent", location:"Sector 15A, Faridabad", city:"faridabad", price:"₹ 95,000/mo", value:95000, config:"1,200 sq.ft. Office", size:"1,200 sq.ft.", type:"commercial", mode:"rent", category:"Commercial", image:img(13219418), pos:"50%", alt:"Sector 15A commercial office for rent in Faridabad", link:"/faridabad", tag:"Available", keywords:kw("sector 15a faridabad office commercial space workspace rent lease fbd") },
  { id:"ved-fb6", title:"Sector 82 Plots", location:"Sector 82, Faridabad", city:"faridabad", price:"₹ 1.20 Cr", value:120, config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"plot", mode:"sell", category:"Plotted", image:img(11201060), pos:"59%", alt:"Sector 82 residential plots for sale in Faridabad", link:"/faridabad", tag:"Available for Sale", keywords:kw("sector 82 faridabad plot land for sale residential plot fbd") },

  // ── GHAZIABAD ───────────────────────────────────────────
  { id:"ved-gz1", title:"Indirapuram Apartments", location:"Indirapuram, Ghaziabad", city:"ghaziabad", price:"₹ 1.85 Cr", value:185, config:"3 BHK", size:"1,420 sq.ft.", type:"apartment", mode:"buy", category:"Residential", image:img(37224965), pos:"79%", alt:"Indirapuram 3 BHK apartments in Ghaziabad", link:"/ghaziabad", tag:"Ready to Move", keywords:kw("indirapuram ghaziabad 3 bhk apartment flat buy gated complex metro gzb") },
  { id:"ved-gz2", title:"Indirapuram Villa", location:"Indirapuram, Ghaziabad", city:"ghaziabad", price:"₹ 2.40 Cr", value:240, config:"4 BHK Villa", size:"2,300 sq.ft.", type:"villa", mode:"buy", category:"Residential", image:img(28054849), pos:"90%", alt:"Indirapuram 4 BHK villa in Ghaziabad", link:"/ghaziabad", tag:"Ready to Move", keywords:kw("indirapuram villa ghaziabad 4 bhk villa house bungalow buy gzb") },
  { id:"ved-gz3", title:"Vaishali Retail", location:"Vaishali, Ghaziabad", city:"ghaziabad", price:"₹ 1.80 Cr", value:180, config:"1,200 sq.ft. Retail", size:"1,200 sq.ft.", type:"commercial", mode:"buy", category:"Commercial", image:img(15301578), pos:"50%", alt:"Vaishali retail space in Ghaziabad", link:"/ghaziabad", tag:"Ready to Move", keywords:kw("vaishali ghaziabad retail shop commercial space buy metro gzb") },
  { id:"ved-gz4", title:"Vaishali Rental Flats", location:"Vaishali, Ghaziabad", city:"ghaziabad", price:"₹ 22,000/mo", value:22000, config:"3 BHK", size:"1,250 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(13812522), pos:"50%", alt:"Vaishali 3 BHK rental flats in Ghaziabad", link:"/ghaziabad", tag:"Available", keywords:kw("vaishali ghaziabad 3 bhk apartment flat rent lease metro gzb") },
  { id:"ved-gz5", title:"Kaushambi Office Rent", location:"Kaushambi, Ghaziabad", city:"ghaziabad", price:"₹ 85,000/mo", value:85000, config:"1,000 sq.ft. Office", size:"1,000 sq.ft.", type:"commercial", mode:"rent", category:"Commercial", image:img(19279351), pos:"71%", alt:"Kaushambi office space for rent in Ghaziabad", link:"/ghaziabad", tag:"Available", keywords:kw("kaushambi ghaziabad office commercial space rent lease gzb") },
  { id:"ved-gz6", title:"Govindpuram Plots", location:"Govindpuram, Ghaziabad", city:"ghaziabad", price:"₹ 95 Lakhs", value:95, config:"150 sq.yds. Plot", size:"150 sq.yds.", type:"plot", mode:"sell", category:"Plotted", image:img(32370506), pos:"80%", alt:"Govindpuram residential plots for sale in Ghaziabad", link:"/ghaziabad", tag:"Available for Sale", keywords:kw("govindpuram ghaziabad plot land for sale gzb") },

  // ── GREATER NOIDA ───────────────────────────────────────
  { id:"ved-gn1", title:"Altius Tower", location:"Sector 152, Greater Noida West", city:"greater-noida", price:"₹ 2.15 Cr", value:215, config:"3 BHK", size:"1,420 sq.ft.", type:"apartment", mode:"buy", category:"Residential", image:img(31325988), alt:"Altius Tower 3 BHK apartments in Greater Noida West", link:"/greater-noida", tag:"Just Launched", keywords:kw("altius tower greater noida west sector 152 3 bhk apartment flat buy brigade group gnida gr noida g noida") },
  { id:"ved-gn2", title:"Aura Sky Villas", location:"Sector 152, Greater Noida West", city:"greater-noida", price:"₹ 1.85 Cr", value:185, config:"3 BHK Villas", size:"1,900 sq.ft.", type:"villa", mode:"buy", category:"New Launch", image:img(38341175), pos:"84%", alt:"Aura Sky Villas new launch villas in Greater Noida West", link:"/greater-noida", tag:"Just Launched", keywords:kw("aura sky villas greater noida west sector 152 villa house buy prestige new launch gr noida") },
  { id:"ved-gn3", title:"Knowledge Park Offices", location:"Knowledge Park V, Greater Noida", city:"greater-noida", price:"₹ 2.40 Cr", value:240, config:"2,200 sq.ft. Office", size:"2,200 sq.ft.", type:"commercial", mode:"buy", category:"Commercial", image:img(946310), pos:"50%", alt:"Knowledge Park commercial office space in Greater Noida", link:"/greater-noida", tag:"Ready to Move", keywords:kw("knowledge park greater noida office commercial space buy gr noida") },
  { id:"ved-gn4", title:"Skydeck Residence", location:"Sector 62, Greater Noida", city:"greater-noida", price:"₹ 7.95 Cr", value:795, config:"4 BHK Penthouse", size:"3,100 sq.ft.", type:"penthouse", mode:"buy", category:"Luxury", image:img(8082227), pos:"64%", alt:"Skydeck Residence penthouse in Greater Noida", link:"/greater-noida", tag:"Under Construction", keywords:kw("skydeck residence greater noida sector 62 penthouse 4 bhk luxury buy gr noida") },
  { id:"ved-gn5", title:"Palm Grove Apartments", location:"Sector 44, Greater Noida", city:"greater-noida", price:"₹ 42,000/mo", value:42000, config:"2 BHK", size:"1,250 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(27085225), pos:"61%", alt:"Palm Grove 2 BHK rental apartment in Greater Noida", link:"/greater-noida", tag:"Available", keywords:kw("palm grove greater noida sector 44 2 bhk apartment flat rent metro gr noida") },
  { id:"ved-gn6", title:"Lake Vista Heights", location:"Sector 150, Greater Noida West", city:"greater-noida", price:"₹ 75,000/mo", value:75000, config:"4 BHK", size:"2,200 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(4792297), pos:"63%", alt:"Lake Vista Heights 4 BHK rental with lake view in Greater Noida West", link:"/greater-noida", tag:"Available", keywords:kw("lake vista heights greater noida west sector 150 4 bhk apartment rent lake view gr noida") },
  { id:"ved-gn7", title:"Yamuna Gardens", location:"Sector 20, Yamuna Expressway, Greater Noida", city:"greater-noida", price:"₹ 1.20 Cr", value:120, config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"plot", mode:"sell", category:"Plotted", image:img(7793089), pos:"59%", alt:"Yamuna Gardens residential plots on the Yamuna Expressway, Greater Noida", link:"/greater-noida", tag:"Available for Sale", keywords:kw("yamuna gardens greater noida yamuna expressway plot land for sale yeida gr noida") },

  // ── SOUTH DELHI ─────────────────────────────────────────
  { id:"ved-sd1", title:"Saket Residency", location:"Saket, Delhi", city:"south-delhi", price:"₹ 4.85 Cr", value:485, config:"3 BHK", size:"1,750 sq.ft.", type:"apartment", mode:"buy", category:"Residential", image:img(6699988), pos:"72%", alt:"Saket Residency 3 BHK apartments in South Delhi", link:"/south-delhi", tag:"Ready to Move", keywords:kw("saket south delhi 3 bhk apartment flat buy metro new delhi") },
  { id:"ved-sd2", title:"Greater Kailash I Villa", location:"Greater Kailash I, Delhi", city:"south-delhi", price:"₹ 22.50 Cr", value:2250, config:"6 BHK Villa", size:"6,500 sq.ft.", type:"villa", mode:"buy", category:"Luxury", image:img(12359235), pos:"89%", alt:"Greater Kailash I luxury villa in South Delhi", link:"/south-delhi", tag:"Ready to Move", keywords:kw("greater kailash gk south delhi 6 bhk villa house bungalow luxury buy") },
  { id:"ved-sd3", title:"Nehru Place Offices", location:"Nehru Place, Delhi", city:"south-delhi", price:"₹ 3.20 Cr", value:320, config:"1,800 sq.ft. Office", size:"1,800 sq.ft.", type:"commercial", mode:"buy", category:"Commercial", image:img(290275), pos:"72%", alt:"Nehru Place commercial office space in South Delhi", link:"/south-delhi", tag:"Ready to Move", keywords:kw("nehru place south delhi office commercial space buy business hub") },
  { id:"ved-sd4", title:"Vasant Vihar Penthouse", location:"Vasant Vihar, Delhi", city:"south-delhi", price:"₹ 16.80 Cr", value:1680, config:"4 BHK Penthouse", size:"3,800 sq.ft.", type:"penthouse", mode:"buy", category:"Luxury", image:img(323780), pos:"100%", alt:"Vasant Vihar penthouse in South Delhi", link:"/south-delhi", tag:"Ready to Move", keywords:kw("vasant vihar south delhi penthouse 4 bhk luxury buy") },
  { id:"ved-sd5", title:"Saket Rental Apartment", location:"Saket, Delhi", city:"south-delhi", price:"₹ 55,000/mo", value:55000, config:"2 BHK", size:"1,200 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(7189284), pos:"70%", alt:"Saket 2 BHK rental apartment in South Delhi", link:"/south-delhi", tag:"Available", keywords:kw("saket south delhi 2 bhk apartment flat rent lease") },
  { id:"ved-sd6", title:"Defence Colony Floor", location:"Defence Colony, Delhi", city:"south-delhi", price:"₹ 8.75 Cr", value:875, config:"4 BHK Independent Floor", size:"2,900 sq.ft.", type:"apartment", mode:"sell", category:"Residential", image:img(19516616), pos:"100%", alt:"Defence Colony independent floor for sale in South Delhi", link:"/south-delhi", tag:"Available for Sale", keywords:kw("defence colony south delhi 4 bhk independent floor apartment sell resale") },

  // ── MODE BALANCE (gurugram / chandigarh / panchkula / mohali) ──
  { id:"ved-gr1", title:"Dwarka Expressway Plot", location:"Dwarka Expressway, Gurugram", city:"gurugram", price:"₹ 2.25 Cr", value:225, config:"300 sq.yds. Plot", size:"300 sq.yds.", type:"plot", mode:"sell", category:"Plotted", image:img(15422584), pos:"50%", alt:"Dwarka Expressway residential plot for sale in Gurugram", link:"/gurugram", tag:"Available for Sale", keywords:kw("dwarka expressway gurugram gurgaon plot land for sale resale") },
  { id:"ved-ch2", title:"Sector 33 Rental Flat", location:"Sector 33, Chandigarh", city:"chandigarh", price:"₹ 35,000/mo", value:35000, config:"3 BHK", size:"1,650 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(32666364), pos:"62%", alt:"Sector 33 3 BHK rental flat in Chandigarh", link:"/chandigarh", tag:"Available", keywords:kw("sector 33 chandigarh 3 bhk apartment flat rent lease chd") },
  { id:"ved-ch3", title:"Sector 15 Flat For Sale", location:"Sector 15, Chandigarh", city:"chandigarh", price:"₹ 3.10 Cr", value:310, config:"2 BHK", size:"1,350 sq.ft.", type:"apartment", mode:"sell", category:"Residential", image:img(15951714), pos:"100%", alt:"Sector 15 2 BHK flat for sale in Chandigarh", link:"/chandigarh", tag:"Available for Sale", keywords:kw("sector 15 chandigarh 2 bhk apartment flat sell resale chd") },
  { id:"ved-pk2", title:"Sector 8 Villa Rent", location:"Sector 8, Panchkula", city:"panchkula", price:"₹ 55,000/mo", value:55000, config:"4 BHK Villa", size:"2,600 sq.ft.", type:"villa", mode:"rent", category:"Residential", image:img(12124723), pos:"63%", alt:"Sector 8 4 BHK villa for rent in Panchkula", link:"/panchkula", tag:"Available", keywords:kw("sector 8 panchkula 4 bhk villa house rent lease pkl") },
  { id:"ved-pk3", title:"Sector 19 Plots", location:"Sector 19, Panchkula", city:"panchkula", price:"₹ 1.45 Cr", value:145, config:"200 sq.yds. Plot", size:"200 sq.yds.", type:"plot", mode:"sell", category:"Plotted", image:img(16408959), pos:"11%", alt:"Sector 19 residential plots for sale in Panchkula", link:"/panchkula", tag:"Available for Sale", keywords:kw("sector 19 panchkula plot land for sale pkl") },
  { id:"ved-mo2", title:"Aero City Heights", location:"Airport Road, Mohali", city:"mohali", price:"₹ 2.65 Cr", value:265, config:"3 BHK", size:"1,650 sq.ft.", type:"apartment", mode:"buy", category:"Residential", image:img(35229793), pos:"100%", alt:"Aero City Heights 3 BHK apartments on Airport Road, Mohali", link:"/mohali", tag:"Possession Dec 2026", keywords:kw("aero city heights mohali airport road 3 bhk apartment flat buy it park") },
  { id:"ved-mo3", title:"Sector 91 Flats Rent", location:"Sector 91, Mohali", city:"mohali", price:"₹ 20,000/mo", value:20000, config:"2 BHK", size:"1,150 sq.ft.", type:"apartment", mode:"rent", category:"Residential", image:img(11643330), pos:"66%", alt:"Sector 91 2 BHK rental flats in Mohali", link:"/mohali", tag:"Available", keywords:kw("sector 91 mohali 2 bhk apartment flat rent lease") },
];

export const searchListings = L;

/** Budget ranges (key → min/max). buy/sell values are in lakhs; rent in monthly ₹. */
export const BUY_BUDGETS: Record<string, [number, number] | null> = {
  any: null,
  under1: [0, 100],
  "1-3": [100, 300],
  "3-5": [300, 500],
  "5-10": [500, 1000],
  "10plus": [1000, Infinity],
};
export const RENT_BUDGETS: Record<string, [number, number] | null> = {
  any: null,
  under20k: [0, 20000],
  "20k-50k": [20000, 50000],
  "50k-1l": [50000, 100000],
  "1l-2l": [100000, 200000],
  "2lplus": [200000, Infinity],
};

export interface SearchFilters {
  q?: string;
  mode?: SearchMode;
  type?: SearchType | "any";
  budget?: string;
}

/** Common words that add no filter value, so they never block results. */
const STOPWORDS = new Set([
  "in", "the", "for", "with", "and", "near", "on", "a", "an", "of", "to",
  "at", "from", "or", "by", "property", "properties", "buy", "rent", "sell",
  "sale", "ncr",
]);

/** City / locality spelling variants so common names all match. */
const ALIASES: Record<string, string> = {
  gurgaon: "gurugram",
  "gr noida": "greater noida",
  "g noida": "greater noida",
  grnoida: "greater noida",
  "new delhi": "delhi",
  chd: "chandigarh",
  pkl: "panchkula",
  fbd: "faridabad",
  gzb: "ghaziabad",
};

/** Alternate city names (incl. common misspellings) appended to every listing's haystack. */
const CITY_ALIASES: Record<string, string> = {
  gurugram: "gurugram gurgaon",
  noida: "noida",
  "greater-noida": "greater noida gr noida g noida greaternoida",
  "south-delhi": "south delhi new delhi delhi",
  delhi: "delhi new delhi south delhi",
  chandigarh: "chandigarh chd",
  mohali: "mohali",
  panchkula: "panchkula pkl",
  faridabad: "faridabad fbd",
  ghaziabad: "ghaziabad gzb",
};

/** Real-estate search phrases users type, generated per type & mode. */
const TYPE_PHRASES: Record<SearchType, string> = {
  apartment: "apartment flat house residential home",
  villa: "villa bungalow independent house duplex",
  plot: "plot land plot for sale land for sale plotted",
  penthouse: "penthouse luxury apartment top floor duplex",
  commercial: "commercial office shop retail commercial space office space showroom warehouse",
};
const MODE_PHRASES: Record<SearchMode, string> = {
  buy: "buy purchase sale for sale investment",
  rent: "rent lease for rent rental on lease",
  sell: "sell sale for sale resale",
};

/** Full searchable text for a listing: curated keywords + auto phrases + aliases. */
function searchHaystack(l: SearchListing): string {
  const bhk = (l.config.match(/(\d+)\s*BHK/i) || [])[1];
  return [
    l.keywords, l.title, l.location, l.city, l.category, l.config, l.size,
    TYPE_PHRASES[l.type] || l.type,
    MODE_PHRASES[l.mode] || l.mode,
    bhk ? `${bhk} bhk` : "",
    CITY_ALIASES[l.city] || l.city,
  ].join(" ").toLowerCase();
}

function qTokens(q: string): string[] {
  let s = q.toLowerCase();
  for (const [k, v] of Object.entries(ALIASES)) s = s.split(k).join(v);
  return s.split(/[^a-z0-9]+/).filter((t) => t && !STOPWORDS.has(t));
}

export function filterListings(f: SearchFilters): SearchListing[] {
  let list = [...searchListings];

  if (f.mode) {
    const m = f.mode as SearchMode;
    // "sell" only shows plotted/sale; buy shows all buy-mode inventory
    list = list.filter((l) => l.mode === m);
  }

  if (f.type && f.type !== "any") {
    list = list.filter((l) => l.type === f.type);
  }

  if (f.budget && f.budget !== "any") {
    const ranges = f.mode === "rent" ? RENT_BUDGETS : BUY_BUDGETS;
    const range = ranges[f.budget];
    if (range) list = list.filter((l) => l.value >= range[0] && l.value < range[1]);
  }

  if (f.q) {
    const tokens = qTokens(f.q);
    if (tokens.length) {
      list = list.filter((l) => {
        const hay = searchHaystack(l);
        const hayTight = hay.replace(/[^a-z0-9]/g, "");
        return tokens.every((t) => hay.includes(t) || hayTight.includes(t));
      });
    }
  }

  return list;
}

/** Human label for the active filters, shown on the search page hero. */
export function searchSummary(f: SearchFilters): string {
  const parts: string[] = [];
  if (f.q) parts.push(`"${f.q}"`);
  if (f.mode && f.mode !== "buy") parts.push(f.mode === "rent" ? "to rent" : "for sale");
  if (f.type && f.type !== "any") parts.push(f.type.replace("commercial", "commercial space"));
  if (f.budget && f.budget !== "any") parts.push(`budget ${f.budget.replace(/-/g, "–")}`);
  return parts.length ? parts.join(" · ") : "All verified listings";
}
