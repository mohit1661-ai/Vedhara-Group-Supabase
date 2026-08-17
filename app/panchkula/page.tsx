import type { Metadata } from "next";
import CityPageTemplate from "@/components/templates/CityPageTemplate";
import { cityPages } from "@/lib/data/cityPages";

export const metadata: Metadata = {
  title: cityPages.panchkula.metaTitle,
  description: cityPages.panchkula.metaDescription,
  alternates: { canonical: "https://www.vedharagroup.com/panchkula" },
};

export default function PanchkulaPage() {
  return <CityPageTemplate data={cityPages.panchkula} />;
}
