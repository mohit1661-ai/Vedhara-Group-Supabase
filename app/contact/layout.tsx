import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"Contact Us | Book a Free Property Consultation in Delhi NCR",
  description:"Book a free real estate consultation with Vedhara Group. Independent property advisory across Delhi, Gurugram, Noida, Faridabad, and Ghaziabad. NRI desk available weekends (IST).",
  alternates:{ canonical:"https://www.vedharagroup.com/contact" },
};
export default function Layout({ children }:{ children:React.ReactNode }) { return children; }
