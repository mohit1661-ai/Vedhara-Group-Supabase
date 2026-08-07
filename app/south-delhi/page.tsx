import type { Metadata } from "next";
import CityPageTemplate from "@/components/templates/CityPageTemplate";
import { cityPages } from "@/lib/data/cityPages";

export const metadata: Metadata = {
  title: cityPages["south-delhi"].metaTitle,
  description: cityPages["south-delhi"].metaDescription,
  alternates: { canonical: "https://www.vedharagroup.com/south-delhi" },
};

export default function SouthDelhiPage() {
  return <CityPageTemplate data={cityPages["south-delhi"]} />;
}
