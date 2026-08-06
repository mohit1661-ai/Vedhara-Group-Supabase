import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import CustomCursor from "@/components/ui/CustomCursor";

const cormorant = Cormorant_Garamond({ subsets:["latin"], weight:["300","400"], style:["normal","italic"], variable:"--font-display", display:"swap" });
const poppins = Poppins({ subsets:["latin"], weight:["400","500","600","700"], variable:"--font-head", display:"swap" });
const roboto = Roboto({ subsets:["latin"], weight:["300","400","500"], variable:"--font-body", display:"swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vedharagroup.com"),
  title: { default: "Vedhara Group | Verified Property Advisory in Delhi NCR, Buy, Sell, Invest", template: "%s | Vedhara Group" },
  description: "North India's independent real estate advisory firm. Verified listings, transparent fees and free tools across Delhi NCR, Faridabad, Manesar & Chandigarh.",
  openGraph: { type:"website", locale:"en_IN", siteName:"Vedhara Group", url:"https://www.vedharagroup.com", images:[{ url:"/og-default.jpg", width:1200, height:630, alt:"Vedhara Group, Independent Real Estate Advisory Delhi NCR" }] },
  twitter: { card:"summary_large_image", site:"@vedharagroup", creator:"@vedharagroup", images:["/og-default.jpg"] },
  robots: { index:true, follow:true, googleBot:{ index:true, follow:true, "max-image-preview":"large", "max-snippet":-1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${poppins.variable} ${roboto.variable}`}>
      <head>
        <link rel="llms.txt" href="/llms.txt" />
        <link rel="llms-full" href="/llms-full.txt" />
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
          address:{ "@type":"PostalAddress", addressLocality:"Delhi", addressRegion:"Delhi", addressCountry:"IN" },
          areaServed:[{name:"Delhi NCR"},{name:"Delhi"},{name:"Gurugram"},{name:"Noida"},{name:"Faridabad"},{name:"Manesar"},{name:"Ghaziabad"},{name:"Greater Noida"},{name:"Chandigarh"},{name:"Mohali"},{name:"Panchkula"},{name:"Zirakpur"},{name:"Kharar"},{name:"North India"}],
          knowsAbout:["Real Estate Advisory Delhi NCR","Property Investment Gurugram","Property Advisory Faridabad","Commercial Property Manesar","Real Estate North India","Chandigarh Tricity Real Estate","Property Advisory Mohali Panchkula","GMADA HRERA Punjab RERA Due Diligence","RERA Verified Property Listings","NRI Property Investment India"],
          sameAs:["https://www.linkedin.com/company/vedharagroup/","https://www.instagram.com/vedharagroup"],
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
        <Navbar />
        <main style={{ flex:1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
