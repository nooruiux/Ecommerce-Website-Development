import { ogBase } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView } from "@/components/catalog/CatalogView";
import { categories } from "@/data/catalog";
import { parseFilters } from "@/lib/catalog/query";
import type { CategorySlug } from "@/types";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

const find = (slug: string) => categories.find((c) => c.slug === slug);

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const category = find((await params).slug);
  if (!category) return {};
  const url = `/category/${category.slug}`;
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      ...ogBase,
      title: category.name,
      description: category.description,
      url,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/category/[slug]">) {
  const category = find((await params).slug);
  if (!category) notFound();
  const filters = parseFilters(await searchParams, category.slug as CategorySlug);
  const basePath = `/category/${category.slug}`;
  return (
    <CatalogView
      title={category.name}
      description={category.description}
      filters={filters}
      basePath={basePath}
      fixedCategory
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: category.name, href: basePath },
      ]}
    />
  );
}
