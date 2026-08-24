/**
 * Shared dataset for the /videos watch page: its JSON-LD and the video
 * sitemap (app/sitemap-videos.xml/route.ts) both derive from this list.
 * Files live in /watch/ (byte-identical mirror of /videos/, but crawlable).
 */
export const VIDEOS_BASE_URL = "https://www.vedharagroup.com";
export const VIDEOS_UPLOAD_DATE = "2026-01-01";

export interface WatchVideo {
  /** File name in /watch/. */
  file: string;
  title: string;
  desc: string;
}

export const videoSlug = (file: string) =>
  file.replace(/\.mp4$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const watchVideos: WatchVideo[] = [
  { file:"Homepage Hero Video Real Estate Advisory in Gurgaon Delhi NCR.mp4", title:"Vedhara Group Verified Property Advisory", desc:"Our flagship film on independent, verified real estate advisory across Delhi NCR, Faridabad, Manesar, Chandigarh and North India." },
  { file:"Homepage Hero Video Desktop.mp4", title:"Vedhara Group Desktop Advisory Film", desc:"The desktop edition of our flagship film on independent, verified real estate advisory across Delhi NCR, Faridabad, Manesar, Chandigarh and North India." },
  { file:"Homepage Hero Video Mobile.mp4", title:"Vedhara Group Mobile Advisory Film", desc:"The mobile edition of our flagship advisory film on verified real estate across Delhi NCR, Faridabad, Manesar, Chandigarh and North India." },
  { file:"Vedhara Group Gurgaon Real Estate About Page Video.mp4", title:"About Vedhara Group Trusted Advisory", desc:"The people and the principle behind Vedhara: independent by design, client-first by default." },
  { file:"Vedhara Group Delhi NCR Buy Page Video.mp4", title:"Delhi NCR Property Buying Video", desc:"How we shortlist, verify and negotiate on your behalf when you buy across Delhi NCR and North India." },
  { file:"Vedhara Group Delhi NCR Sell Page Video (1).mp4", title:"Sell Property at Fair Market Value", desc:"Strategic pricing, qualified buyer access and end-to-end sale management across Delhi NCR and Chandigarh." },
  { file:"Vedhara Group Delhi NCR Rent Page Video.mp4", title:"Rent Verified Property Delhi NCR", desc:"Verified rentals with transparent lease terms for tenants and landlords in Delhi NCR and Tricity." },
  { file:"Vedhara Group Delhi NCR Commercial Page Video.mp4", title:"Commercial Real Estate Advisory", desc:"Office, retail and industrial leasing and acquisition across Delhi NCR, Faridabad and Manesar." },
  { file:"Vedhara Group Delhi NCR Luxury Properties Page Video (1).mp4", title:"Luxury Properties Premium Homes", desc:"Curated premium residences and discreet white-glove advisory for discerning buyers." },
  { file:"Vedhara Group Delhi NCR NRI Desk Page Video.mp4", title:"NRI Property Services India", desc:"Buy, sell or manage property in India remotely with weekend IST consultations, video walkthroughs and e-signatures." },
  { file:"New Launches.mp4", title:"Verified New Property Launches", desc:"RERA-verified new projects across Delhi NCR, Faridabad, Manesar and Chandigarh from our developer partners." },
  { file:"Property Investment.mp4", title:"Property Investment Advisory", desc:"Rental yield analysis and buy-to-invest strategy across Delhi NCR and North India." },
  { file:"Real Estate Investment Advisory.mp4", title:"Real Estate Investment Advisory", desc:"Data-backed investment advisory for growing your portfolio across North India." },
  { file:"Property Verification.mp4", title:"Five-Point Verification Framework", desc:"How we check RERA status, approvals, price fairness and documents before any listing is published." },
  { file:"Property Real Estate Contact.mp4", title:"Book a Free Real Estate Consultation", desc:"No pitch, no pressure. Start with an honest conversation about your property goals." },
  { file:"Real Estate Calculator.mp4", title:"Free Real Estate Calculators", desc:"EMI, stamp duty, ROI and affordability calculators, free with no sign-up required." },
  { file:"All Services Hero Video.mp4", title:"Vedhara Group Real Estate Advisory Services", desc:"Vedhara's independent advisory across Delhi NCR, Faridabad, Manesar, Chandigarh and North India, covering buying, selling, renting, investing and NRI services." },
  { file:"Blog Page Hero Video.mp4", title:"Vedhara Group Property Insights Blog", desc:"Guides and market insights on Delhi NCR property, RERA, pricing trends, NRI investing and more from the Vedhara Group blog." },
  { file:"careers hero video.mp4", title:"Careers at Vedhara Group", desc:"Join Vedhara Group, a career in independent, client-first real estate advisory across Delhi NCR and North India." },
  { file:"Case Studies Hero Video.mp4", title:"Vedhara Group Client Case Studies", desc:"Real client journeys, buying, selling and investing in Delhi NCR property with Vedhara Group's verified advisory." },
  { file:"Chandigarh Tricity Hero Desktop.mp4", title:"Chandigarh Tricity Property Advisory", desc:"Verified property advisory across Chandigarh, Mohali, Panchkula and Zirakpur, the Tricity market with Vedhara Group." },
  { file:"Chandigarh Tricity Hero Mobile.mp4", title:"Chandigarh Tricity Property Advisory (Mobile)", desc:"Vedhara Group's Chandigarh Tricity property advisory in a mobile-optimised format, Chandigarh, Mohali, Panchkula and Zirakpur." },
  { file:"FAQ Hub Hero Video.mp4", title:"Vedhara Group Property FAQ Video", desc:"Answers to common questions about buying, selling, renting and investing in Delhi NCR property with Vedhara Group." },
  { file:"Market Insights Hero Video.mp4", title:"Delhi NCR Property Market Insights", desc:"Data-backed market insights on Delhi NCR, Faridabad, Manesar and Chandigarh, pricing, trends and opportunities from Vedhara Group." },
  { file:"Our Team Hero Video.mp4", title:"Meet the Vedhara Group Team", desc:"The advisors behind Vedhara Group, independent by design, client-first by default across Delhi NCR and North India." },
  { file:"Property Management Hero Video.mp4", title:"Vedhara Group Property Management", desc:"Tenant, maintenance and rental management for property owners across Delhi NCR and Chandigarh with Vedhara Group." },
  { file:"Success Stories Hero Video.mp4", title:"Vedhara Group Success Stories", desc:"Client success stories, verified property journeys across Delhi NCR, Faridabad, Manesar, Chandigarh and North India." },
  { file:"gurugram-city.mp4", title:"Real Estate in Gurugram – City Tour", desc:"A cinematic aerial tour of Gurugram's skyline and business districts, part of Vedhara Group's verified property advisory across Gurgaon and Delhi NCR." },
  { file:"noida-city.mp4", title:"Real Estate in Noida – City Tour", desc:"An aerial tour of Noida's modern towers and developing sectors, part of Vedhara Group's verified property advisory across Noida and Delhi NCR." },
  { file:"greater-noida-city.mp4", title:"Real Estate in Greater Noida – City Tour", desc:"A cinematic aerial view of Greater Noida's infrastructure and growth corridors, part of Vedhara Group's verified property advisory." },
  { file:"south-delhi-city.mp4", title:"Real Estate in South Delhi – City Tour", desc:"Iconic Delhi landmarks and South Delhi's premium residential character, part of Vedhara Group's verified property advisory." },
  { file:"mohali-city.mp4", title:"Real Estate in Mohali – City Tour", desc:"An aerial tour of Mohali's modern development and growth, part of Vedhara Group's verified property advisory in the Tricity market." },
  { file:"panchkula-city.mp4", title:"Real Estate in Panchkula – City Tour", desc:"Panchkula's green, landscaped cityscape seen from above, part of Vedhara Group's verified property advisory in the Tricity market." },
  { file:"faridabad-city.mp4", title:"Real Estate in Faridabad – City Tour", desc:"An aerial view of Faridabad's busy, developed metro landscape, part of Vedhara Group's verified property advisory across Delhi NCR." },
  { file:"ghaziabad-city.mp4", title:"Real Estate in Ghaziabad – City Tour", desc:"Aerial views of Ghaziabad's residential and development corridors, part of Vedhara Group's verified property advisory across Delhi NCR." },
  { file:"mathura-vrindavan-city.mp4", title:"Mathura & Vrindavan Property Video", desc:"A cinematic aerial view of Mathura and Vrindavan at sunrise, part of Vedhara Group's verified property advisory across the Braj heartland." },
];
