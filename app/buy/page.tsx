import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/data/servicePages";
export const metadata: Metadata = { title:"Buy Verified Property in Delhi NCR | Independent Advisory | Vedhara Group", description:"Buy verified residential and commercial property in Delhi, Gurugram, Noida, Faridabad and Ghaziabad with Vedhara Group — independent advisory, RERA-verified listings, transparent pricing.", alternates:{ canonical:"https://www.vedharagroup.com/buy" } };
export default function BuyPage() { return <ServicePageTemplate content={servicePages.buy} />; }
