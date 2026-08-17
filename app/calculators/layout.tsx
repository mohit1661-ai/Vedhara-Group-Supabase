import type { Metadata } from "next";
export const metadata: Metadata = {
  title:"Free Property Calculators",
  description:"Four free property calculators for North India: Home Loan EMI, Stamp Duty, ROI & Rental Yield, and Affordability. No registration required.",
  openGraph: {
    title: "Free Property Calculators | ROI, EMI, Stamp Duty | Vedhara Group",
    description: "Use 4 free property calculators: ROI & rental yield, home loan EMI, stamp duty, and affordability. No sign-up required.",
  },
  alternates:{ canonical:"https://www.vedharagroup.com/calculators" },
};
export default function Layout({ children }:{ children:React.ReactNode }) { return children; }
