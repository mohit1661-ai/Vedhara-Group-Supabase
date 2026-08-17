import type { Metadata } from "next";
import CityPageTemplate from "@/components/templates/CityPageTemplate";
import { cityPages } from "@/lib/data/cityPages";

export const metadata: Metadata = {
  title: cityPages.chandigarh.metaTitle,
  description: cityPages.chandigarh.metaDescription,
  alternates: { canonical: "https://www.vedharagroup.com/chandigarh" },
};

export default function ChandigarhPage() {
  return <CityPageTemplate data={cityPages.chandigarh} />;
}
