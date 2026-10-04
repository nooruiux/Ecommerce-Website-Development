import { ogBase } from "@/lib/seo";
import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/CatalogView";
import { parseFilters } from "@/lib/catalog/query";

const baseMetadata: Metadata = {
  title: "Shop all products",
  description:
    "Browse skin care, hair care, personal care and mom & baby products. Filter by concern, price, rating and availability.",
  alternates: { canonical: "/shop" },
  openGraph: {
    ...ogBase,
    title: "Shop all products",
    url: "/shop",
  },
};

// Search result pages (?q=) are noindex; filtered views canonicalise to /shop.
export async function generateMetadata({ searchParams }: PageProps<"/shop">): Promise<Metadata> {
  const { q } = await searchParams;
  if (!q) return baseMetadata;
  return {
    ...baseMetadata,
    title: `Search results for “${String(q)}”`,
    robots: { index: false, follow: true },
  };
}

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const filters = parseFilters(await searchParams);
  return (
    <CatalogView
      title="Shop All Products"
      filters={filters}
      basePath="/shop"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
      ]}
    />
  );
}
