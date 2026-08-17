import type { Metadata } from "next";
import CityPageTemplate from "@/components/templates/CityPageTemplate";
import { cityPages } from "@/lib/data/cityPages";

export const metadata: Metadata = {
  title: cityPages["greater-noida"].metaTitle,
  description: cityPages["greater-noida"].metaDescription,
  alternates: { canonical: "https://www.vedharagroup.com/greater-noida" },
};

export default function GreaterNoidaPage() {
  return <CityPageTemplate data={cityPages["greater-noida"]} />;
}
