import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"Free Property Calculators | EMI, Stamp Duty & More",
  description:"Four free property calculators for North India buyers: Home Loan EMI, Stamp Duty (Delhi, Haryana, UP), ROI & Rental Yield, and Affordability. No registration.",
  alternates:{ canonical:"https://www.vedharagroup.com/calculators" },
};
export default function Layout({ children }:{ children:React.ReactNode }) { return children; }
