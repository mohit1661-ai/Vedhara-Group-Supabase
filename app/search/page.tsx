import type { Metadata } from "next";
import SearchResults from "./SearchResults";

export const metadata: Metadata = {
  title: "Search Verified Properties",
  description:
    "Search verified properties across Gurugram, Noida, Greater Noida, South Delhi, Chandigarh Tricity and Faridabad. Buy, rent or sell with RERA-verified listings.",
  alternates: { canonical: "https://www.vedharagroup.com/search" },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const mode = typeof sp.mode === "string" ? sp.mode : "";
  const type = typeof sp.type === "string" ? sp.type : "";
  const budget = typeof sp.budget === "string" ? sp.budget : "";

  return <SearchResults q={q} mode={mode} type={type} budget={budget} />;
}