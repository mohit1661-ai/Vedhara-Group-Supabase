import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/data/servicePages";
export const metadata: Metadata = { title:"Luxury Properties in Delhi NCR | Premium Residential Advisory | Vedhara Group", description:"Curated luxury homes and premium residences in South Delhi, Gurugram Golf Course Road, and Noida Sector 150. Discreet advisory from Vedhara Group.", alternates:{ canonical:"https://www.vedharagroup.com/luxury" } };
export default function LuxuryPage() { return <ServicePageTemplate content={servicePages.luxury} />; }
