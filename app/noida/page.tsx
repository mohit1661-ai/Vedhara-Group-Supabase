import type { Metadata } from "next";
import CityPageTemplate from "@/components/templates/CityPageTemplate";
import { cityPages } from "@/lib/data/cityPages";

export const metadata: Metadata = {
  title: cityPages.noida.metaTitle,
  description: cityPages.noida.metaDescription,
  alternates: { canonical: "https://www.vedharagroup.com/noida" },
};

export default function NoidaPage() {
  return <CityPageTemplate data={cityPages.noida} />;
}
