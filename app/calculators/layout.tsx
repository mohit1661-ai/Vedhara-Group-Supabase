import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"Free Property Calculators | EMI, Stamp Duty, ROI & Affordability | Delhi NCR",
  description:"Use Vedhara Group's four free property calculators, Home Loan EMI, Stamp Duty (Delhi, Haryana, UP), ROI & Rental Yield, and Affordability. Instant results, no registration required.",
  alternates:{ canonical:"https://www.vedharagroup.com/calculators" },
};
export default function Layout({ children }:{ children:React.ReactNode }) { return children; }
