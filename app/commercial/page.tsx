import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/data/servicePages";
export const metadata: Metadata = { title:"Commercial Property Advisory in Delhi NCR | Office, Retail & Industrial | Vedhara Group", description:"Independent commercial property advisory in Delhi NCR — office space leasing, retail site selection, industrial shed, and commercial property acquisition.", alternates:{ canonical:"https://www.vedharagroup.com/commercial" } };
export default function CommercialPage() { return <ServicePageTemplate content={servicePages.commercial} />; }
