import type { MetadataRoute } from "next";
import { categories } from "@/data/catalog";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/seo";

// Indexable pages only: no noindex routes (cart, checkout, auth, lists) and no filtered URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/shop"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...categories.map((c) => ({
      url: absoluteUrl(`/category/${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: absoluteUrl(`/product/${p.slug}`),
      lastModified: new Date(p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl("/consultation"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    { url: absoluteUrl("/ask"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
