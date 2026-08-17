import type { Metadata } from "next";
import CityPageTemplate from "@/components/templates/CityPageTemplate";
import { cityPages } from "@/lib/data/cityPages";

export const metadata: Metadata = {
  title: cityPages.faridabad.metaTitle,
  description: cityPages.faridabad.metaDescription,
  alternates: { canonical: "https://www.vedharagroup.com/faridabad" },
};

export default function FaridabadPage() {
  return <CityPageTemplate data={cityPages.faridabad} />;
}
