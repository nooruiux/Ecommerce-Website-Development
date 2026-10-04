import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/CatalogView";
import { parseFilters } from "@/lib/catalog/query";

export const metadata: Metadata = {
  title: "Shop all products",
  description:
    "Browse skin care, hair care, personal care and mom & baby products. Filter by concern, price, rating and availability.",
  alternates: { canonical: "/shop" },
  openGraph: { title: "Shop all products", url: "/shop" },
};

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
