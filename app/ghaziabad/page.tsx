import type { Metadata } from "next";
import CityPageTemplate from "@/components/templates/CityPageTemplate";
import { cityPages } from "@/lib/data/cityPages";

export const metadata: Metadata = {
  title: cityPages.ghaziabad.metaTitle,
  description: cityPages.ghaziabad.metaDescription,
  alternates: { canonical: "https://www.vedharagroup.com/ghaziabad" },
};

export default function GhaziabadPage() {
  return <CityPageTemplate data={cityPages.ghaziabad} />;
}
