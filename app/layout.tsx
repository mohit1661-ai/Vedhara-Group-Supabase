import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vedharagroup.com"),
  title: { default: "Vedhara Group | Verified Property Advisory in Delhi NCR — Buy, Sell, Invest", template: "%s | Vedhara Group" },
  description: "Delhi NCR's independent real estate advisory firm. Verified listings, transparent fees, and free investment tools across Gurugram, Noida, Faridabad & Ghaziabad.",
  openGraph: { type:"website", locale:"en_IN", siteName:"Vedhara Group", url:"https://www.vedharagroup.com", images:[{ url:"/og-default.jpg", width:1200, height:630, alt:"Vedhara Group — Independent Real Estate Advisory Delhi NCR" }] },
  twitter: { card:"summary_large_image", images:["/og-default.jpg"] },
  robots: { index:true, follow:true, googleBot:{ index:true, follow:true, "max-image-preview":"large", "max-snippet":-1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Poppins:wght@400;500;600;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://www.vedharagroup.com" />
        <meta name="theme-color" content="#0F1E38" />
      </head>
      <body style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
        <JsonLd data={{
          "@context":"https://schema.org","@type":["RealEstateAgent","LocalBusiness"],
          "@id":"https://www.vedharagroup.com/#organization",
          name:"Vedhara Group", legalName:"Vedhara Group Pvt. Ltd.",
          url:"https://www.vedharagroup.com",
          description:"Vedhara Group is an independent real estate advisory and brokerage firm offering verified developer-partner listings and investment advisory across Delhi NCR.",
          slogan:"Wisdom Rooted. Futures Built.",
          telephone:"+91-98106-47063", email:"hello@vedharagroup.com",
          address:{ "@type":"PostalAddress", addressLocality:"Delhi", addressRegion:"Delhi", addressCountry:"IN" },
          areaServed:[{name:"Delhi"},{name:"Gurugram"},{name:"Noida"},{name:"Faridabad"},{name:"Ghaziabad"},{name:"Greater Noida"}],
          knowsAbout:["Real Estate Advisory Delhi NCR","Property Investment Gurugram","RERA Verified Property Listings","NRI Property Investment India"],
          sameAs:["https://www.linkedin.com/company/vedhara-group","https://www.instagram.com/vedharagroup"],
        }} />
        <CustomCursor />
        <Navbar />
        <main style={{ flex:1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
