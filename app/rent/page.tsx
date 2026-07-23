import type { Metadata } from "next";
import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import { servicePages } from "@/lib/data/servicePages";
export const metadata: Metadata = { title:"Rent Property in Delhi NCR | Residential & Commercial Rentals | Vedhara Group", description:"Find verified rental properties in Delhi, Gurugram, Noida, Faridabad and Ghaziabad. Tenant advisory, landlord representation, and transparent lease terms.", alternates:{ canonical:"https://www.vedharagroup.com/rent" } };
export default function RentPage() { return <ServicePageTemplate content={servicePages.rent} />; }
