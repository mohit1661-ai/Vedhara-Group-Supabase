import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"Contact Us | Book a Free Consultation",
  description:"Book a free real estate consultation with Vedhara Group. Independent property advisory across Delhi NCR, Faridabad, Manesar, Chandigarh and North India.",
  openGraph: {
    title: "Contact Vedhara Group | Book a Free Property Consultation",
    description: "Get in touch with Vedhara Group's named advisors for verified property advisory across Delhi NCR. Free consultation, no obligation.",
    images:[{ url:"/og-default.jpg", width:1200, height:630, alt:"Vedhara Group, Independent Real Estate Advisory Delhi NCR" }],
  },
  alternates:{ canonical:"https://www.vedharagroup.com/contact" },
};
export default function Layout({ children }:{ children:React.ReactNode }) { return children; }
