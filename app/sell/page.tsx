import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/data/servicePages";
export const metadata: Metadata = { title:"Sell Property in Delhi NCR | Get Fair Market Value | Vedhara Group", description:"Sell your property in Delhi, Gurugram, Noida, Faridabad or Ghaziabad at the right price. Strategic pricing, qualified buyer access, end-to-end sale management.", alternates:{ canonical:"https://www.vedharagroup.com/sell" } };
export default function SellPage() { return <ServicePageTemplate content={servicePages.sell} />; }
