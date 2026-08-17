import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"Contact Us | Book a Free Consultation",
  description:"Book a free real estate consultation with Vedhara Group. Independent property advisory across Delhi NCR, Faridabad, Manesar, Chandigarh and North India.",
  openGraph: {
    title: "Contact Vedhara Group | Book a Free Property Consultation",
    description: "Get in touch with Vedhara Group's named advisors for verified property advisory across Delhi NCR. Free consultation, no obligation.",
  },
  alternates:{ canonical:"https://www.vedharagroup.com/contact" },
};
export default function Layout({ children }:{ children:React.ReactNode }) { return children; }
