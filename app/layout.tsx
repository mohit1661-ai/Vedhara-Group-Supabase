import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Analytics from "@/components/seo/Analytics";
import CustomCursor from "@/components/ui/CustomCursor";

const cormorant = Cormorant_Garamond({ subsets:["latin"], weight:["300","400"], style:["normal","italic"], variable:"--font-display", display:"swap" });
const poppins = Poppins({ subsets:["latin"], weight:["400","500","600","700"], variable:"--font-head", display:"swap" });
const roboto = Roboto({ subsets:["latin"], weight:["300","400","500"], variable:"--font-body", display:"swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vedharagroup.com"),
  title: { default: "Vedhara Group | Verified Property Advisory in Delhi NCR, Buy, Sell, Invest", template: "%s | Vedhara Group" },
  description: "North India's independent real estate advisory firm. Verified listings, transparent fees and free tools across Delhi NCR, Faridabad, Manesar & Chandigarh.",
  openGraph: { type:"website", locale:"en_IN", siteName:"Vedhara Group", url:"https://www.vedharagroup.com", title: { absolute: "Vedhara Group | Verified Property Advisory in Delhi NCR" }, description: "North India's independent real estate advisory firm. Buy, sell or invest across Delhi NCR with verified listings.", images:[{ url:"/og-default.jpg", width:1200, height:630, alt:"Vedhara Group, Independent Real Estate Advisory Delhi NCR" }] },
  twitter: { card:"summary_large_image", site:"@vedharagroup", creator:"@vedharagroup", images:["/og-default.jpg"] },
  robots: { index:true, follow:true, googleBot:{ index:true, follow:true, "max-image-preview":"large", "max-snippet":-1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${poppins.variable} ${roboto.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="llms.txt" href="/llms.txt" />
        <link rel="llms-full" href="/llms-full.txt" />
        <link rel="me" href="https://www.linkedin.com/company/vedharagroup/" />
        <link rel="me" href="https://www.instagram.com/vedharagroup" />
        <link rel="me" href="https://www.facebook.com/vedharagroup" />
        <link rel="me" href="https://www.youtube.com/@VedharaGroup" />
        {/* Prioritize the two hero text fonts (h1 = Cormorant 300, hero paragraph = Roboto 300) — same URLs as next/font preloads, so no double download */}
        <link rel="preload" as="font" type="font/woff2" href="/_next/static/media/01e4147cff8141ee-s.p.3huc2loe0ie8a.woff2" crossOrigin="" fetchPriority="high" />
        <link rel="preload" as="font" type="font/woff2" href="/_next/static/media/ce62453a442c7f35-s.p.0a0h245ktd4x0.woff2" crossOrigin="" fetchPriority="high" />
        <meta name="theme-color" content="#0F1E38" />
      </head>
      <body style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
        <JsonLd data={{
          "@context":"https://schema.org","@type":["RealEstateAgent","LocalBusiness"],
          "@id":"https://www.vedharagroup.com/#organization",
          name:"Vedhara Group", legalName:"Vedhara Group Pvt. Ltd.",
          url:"https://www.vedharagroup.com",
          description:"Vedhara Group is an independent real estate advisory and brokerage firm offering verified developer-partner listings and investment advisory across Delhi NCR, Faridabad, Manesar, Chandigarh and North India.",
          slogan:"Wisdom Rooted. Futures Built.",
          telephone:"+91-98106-47063", email:"contact@vedharagroup.com",
          image:"https://www.vedharagroup.com/vedhara-logo-white.png",
          priceRange:"₹₹₹",
          address:{ "@type":"PostalAddress", streetAddress:"Sushant Lok Phase 3, Near DLF City Phase 2", addressLocality:"Gurugram", addressRegion:"Haryana", addressCountry:"IN" },
          areaServed:[{name:"Delhi NCR"},{name:"Delhi"},{name:"Gurugram"},{name:"Noida"},{name:"Faridabad"},{name:"Manesar"},{name:"Ghaziabad"},{name:"Greater Noida"},{name:"Chandigarh"},{name:"Mohali"},{name:"Panchkula"},{name:"Zirakpur"},{name:"Kharar"},{name:"North India"}],
          foundingDate:"2015", logo:"https://www.vedharagroup.com/vedhara-logo-white.png",
          openingHoursSpecification:[
            { "@type":"OpeningHoursSpecification", dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday"], opens:"09:00", closes:"19:00" },
            { "@type":"OpeningHoursSpecification", dayOfWeek:["Saturday","Sunday"], opens:"10:00", closes:"16:00" }
          ],
          knowsAbout:["Real Estate Advisory Delhi NCR","Property Investment Gurugram","Property Advisory Faridabad","Commercial Property Manesar","Real Estate North India","Chandigarh Tricity Real Estate","Property Advisory Mohali Panchkula","GMADA HRERA Punjab RERA Due Diligence","RERA Verified Property Listings","NRI Property Investment India"],
          sameAs:["https://www.linkedin.com/company/vedharagroup/","https://www.instagram.com/vedharagroup","https://www.facebook.com/vedharagroup","https://www.youtube.com/@VedharaGroup"],
        }} />
        <JsonLd data={{
          "@context":"https://schema.org","@type":"WebSite",
          "@id":"https://www.vedharagroup.com/#website",
          url:"https://www.vedharagroup.com",
          name:"Vedhara Group | Verified Property Advisory in Delhi NCR",
          description:"North India's independent real estate advisory firm. Verified listings, transparent fees and free tools across Delhi NCR, Faridabad, Manesar & Chandigarh.",
          publisher:{"@id":"https://www.vedharagroup.com/#organization"},
          inLanguage:"en-IN",
          potentialAction:{"@type":"SearchAction",target:{"@type":"EntryPoint",urlTemplate:"https://www.vedharagroup.com/?s={search_term_string}"},"query-input":"required name=search_term_string"},
        }} />
        <CustomCursor />
        <Analytics />
        <Navbar />
        <main style={{ flex:1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
