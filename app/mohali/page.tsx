import type { Metadata } from "next";
import CityPageTemplate from "@/components/templates/CityPageTemplate";
import { cityPages } from "@/lib/data/cityPages";

export const metadata: Metadata = {
  title: cityPages.mohali.metaTitle,
  description: cityPages.mohali.metaDescription,
  alternates: { canonical: "https://www.vedharagroup.com/mohali" },
};

export default function MohaliPage() {
  return <CityPageTemplate data={cityPages.mohali} />;
}
