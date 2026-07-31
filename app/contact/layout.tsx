import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"Contact Us | Book a Free Consultation",
  description:"Book a free real estate consultation with Vedhara Group. Independent property advisory across Delhi, Gurugram, Noida, Faridabad and Ghaziabad.",
  alternates:{ canonical:"https://www.vedharagroup.com/contact" },
};
export default function Layout({ children }:{ children:React.ReactNode }) { return children; }
