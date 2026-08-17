import type { Metadata } from "next";
import CityPageTemplate from "@/components/templates/CityPageTemplate";
import { cityPages } from "@/lib/data/cityPages";

export const metadata: Metadata = {
  title: cityPages["mathura-vrindavan"].metaTitle,
  description: cityPages["mathura-vrindavan"].metaDescription,
  alternates: { canonical: "https://www.vedharagroup.com/mathura-vrindavan" },
};

export default function MathuraVrindavanPage() {
  return <CityPageTemplate data={cityPages["mathura-vrindavan"]} />;
}
