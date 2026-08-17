import type { Metadata } from "next";
import CityPageTemplate from "@/components/templates/CityPageTemplate";
import { cityPages } from "@/lib/data/cityPages";

export const metadata: Metadata = {
  title: cityPages.gurugram.metaTitle,
  description: cityPages.gurugram.metaDescription,
  alternates: { canonical: "https://www.vedharagroup.com/gurugram" },
};

export default function GurugramPage() {
  return <CityPageTemplate data={cityPages.gurugram} />;
}
