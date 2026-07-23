import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/data/servicePages";
export const metadata: Metadata = { title:"Property Management Services in Delhi NCR | NRI & Investor Owners | Vedhara Group", description:"Professional property management in Delhi NCR — tenant sourcing, rent collection, maintenance coordination, and remote reporting for NRI owners and investors.", alternates:{ canonical:"https://www.vedharagroup.com/property-management" } };
export default function PropertyManagementPage() { return <ServicePageTemplate content={servicePages["property-management"]} />; }
