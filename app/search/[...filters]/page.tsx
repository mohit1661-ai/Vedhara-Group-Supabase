import type { Metadata } from "next";
import SearchResults from "../SearchResults";
import { searchPathToParams } from "@/lib/searchUrl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ filters: string[] }>;
}): Promise<Metadata> {
  const { filters } = await params;
  const f = searchPathToParams(filters);
  const typeLabel =
    f.type === "apartment"
      ? "Apartments"
      : f.type === "villa"
        ? "Villas"
        : f.type === "penthouse"
          ? "Penthouses"
          : f.type === "plot"
            ? "Plots"
            : f.type === "commercial"
              ? "Commercial"
              : undefined;
  const modeLabel =
    f.mode === "rent" ? "for Rent" : f.mode === "sell" ? "for Sale" : f.mode === "buy" ? "to Buy" : undefined;
  const parts = [f.q, typeLabel, modeLabel].filter(Boolean) as string[];
  const label = parts.length ? parts.join(" ") : "Verified Properties";

  return {
    title: `${label} | Vedhara Group Search`,
    description: `Verified ${label.toLowerCase()} listings across Gurugram, Noida, Greater Noida, South Delhi, Chandigarh Tricity and Faridabad, checked through the Vedhara Verification Framework.`,
  };
}

export default async function SearchFiltersPage({
  params,
}: {
  params: Promise<{ filters: string[] }>;
}) {
  const { filters } = await params;
  const f = searchPathToParams(filters);
  return (
    <SearchResults
      q={f.q || ""}
      mode={f.mode || ""}
      type={f.type || ""}
      budget={f.budget || ""}
    />
  );
}