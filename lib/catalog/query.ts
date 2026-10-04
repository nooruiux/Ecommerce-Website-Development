import { categories } from "@/data/catalog";
import { products as allProducts } from "@/data/products";
import type { CatalogFilters, CategorySlug, Product, SortKey } from "@/types";

export const PAGE_SIZE = 12;

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export const ratingOptions = [4.5, 4];

type Params = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const num = (v: string | undefined) => {
  if (v === undefined || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
};

export function parseFilters(params: Params, fixedCategory?: CategorySlug): CatalogFilters {
  const category = fixedCategory ?? (first(params.category) as CategorySlug | undefined);
  const sort = first(params.sort) as SortKey | undefined;
  const tag = first(params.tag) as CatalogFilters["tag"];
  return {
    q: first(params.q)?.trim() || undefined,
    category: categories.some((c) => c.slug === category) ? category : undefined,
    concern: first(params.concern) || undefined,
    brand: first(params.brand) || undefined,
    tag: tag && ["featured", "new", "bestseller"].includes(tag) ? tag : undefined,
    min: num(first(params.min)),
    max: num(first(params.max)),
    rating: num(first(params.rating)),
    inStock: first(params.stock) === "1" || undefined,
    sort: sortOptions.some((o) => o.value === sort) ? sort! : "featured",
    page: Math.max(1, Math.floor(num(first(params.page)) ?? 1)),
  };
}

export const effectivePrice = (p: Product) => p.salePrice ?? p.price;

export function applyFilters(filters: CatalogFilters, source: Product[] = allProducts) {
  const q = filters.q?.toLowerCase();
  const list = source.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.concern && p.concern !== filters.concern) return false;
    if (filters.brand && p.brand !== filters.brand) return false;
    if (filters.tag && !p.tags.includes(filters.tag)) return false;
    if (filters.min !== undefined && effectivePrice(p) < filters.min) return false;
    if (filters.max !== undefined && effectivePrice(p) > filters.max) return false;
    if (filters.rating !== undefined && p.rating < filters.rating) return false;
    if (filters.inStock && p.stock <= 0) return false;
    if (q && ![p.name, p.description, p.ingredients].some((t) => t.toLowerCase().includes(q)))
      return false;
    return true;
  });
  const sorted = [...list];
  switch (filters.sort) {
    case "newest":
      sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case "price-asc":
      sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
      break;
    case "price-desc":
      sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
  }
  return sorted;
}

export function paginate<T>(items: T[], page: number) {
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  return {
    items: items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    page: current,
    pageCount,
  };
}

// Serialises filters back to search params (omits defaults) so URLs stay short and shareable.
export function toSearchParams(filters: Partial<CatalogFilters>, omitCategory = false) {
  const sp = new URLSearchParams();
  if (filters.q) sp.set("q", filters.q);
  if (filters.category && !omitCategory) sp.set("category", filters.category);
  if (filters.concern) sp.set("concern", filters.concern);
  if (filters.brand) sp.set("brand", filters.brand);
  if (filters.tag) sp.set("tag", filters.tag);
  if (filters.min !== undefined) sp.set("min", String(filters.min));
  if (filters.max !== undefined) sp.set("max", String(filters.max));
  if (filters.rating !== undefined) sp.set("rating", String(filters.rating));
  if (filters.inStock) sp.set("stock", "1");
  if (filters.sort && filters.sort !== "featured") sp.set("sort", filters.sort);
  if (filters.page && filters.page > 1) sp.set("page", String(filters.page));
  return sp;
}

export function hrefFor(basePath: string, filters: Partial<CatalogFilters>, omitCategory = false) {
  const qs = toSearchParams(filters, omitCategory).toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export const activeFilterCount = (f: CatalogFilters, omitCategory = false) =>
  [
    !omitCategory && f.category,
    f.concern,
    f.brand,
    f.tag,
    f.min !== undefined,
    f.max !== undefined,
    f.rating,
    f.inStock,
    f.q,
  ].filter(Boolean).length;
