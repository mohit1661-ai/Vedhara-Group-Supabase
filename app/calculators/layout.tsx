import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"Free Property Calculators",
  description:"Four free property calculators for North India: Home Loan EMI, Stamp Duty, ROI & Rental Yield, and Affordability. No registration required.",
  alternates:{ canonical:"https://www.vedharagroup.com/calculators" },
};
export default function Layout({ children }:{ children:React.ReactNode }) { return children; }
