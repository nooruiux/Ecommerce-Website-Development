import type { CategorySlug, Product } from "@/types";
import { brands } from "./brands";

/*
 * Mock catalog built from the Home Page cards (Featured 317:514, New Arrivals 317:648,
 * Best Selling 317:906). Each card slot becomes one product with the card's photo.
 * Figma shows $5.75 / 4.7 (715) / "500+ Sold" on every card; prices, ratings and stock
 * vary here so filter and sort have something to work on (logged in docs/qa-report.md).
 */

const names = [
  "Sebiaclear Gel",
  "Difa Coper",
  "Bioderma",
  "Florga",
  "Sebiaclear Gel",
  "Dry Shampoo",
];
const description = "Sebiaclear Gel Moussant creamy foaming cleansing gel- SVR";

type Row = { section: "featured" | "new" | "best"; row: number; tag: Product["tags"][number] };
const rows: Row[] = [
  { section: "featured", row: 1, tag: "featured" },
  { section: "new", row: 1, tag: "new" },
  { section: "new", row: 2, tag: "new" },
  { section: "best", row: 1, tag: "bestseller" },
  { section: "best", row: 2, tag: "bestseller" },
  { section: "best", row: 3, tag: "bestseller" },
];

const categoryCycle: CategorySlug[] = [
  "skin-care",
  "skin-care",
  "hair-care",
  "personal-care",
  "skin-care",
  "hair-care",
];
const concernCycle = [
  "acne-scars",
  "dry-and-dull-skin",
  "wrinkles-and-lines",
  "rough-texture",
  "acne-scars",
  "dandruff",
];
const prices = [5.75, 7.5, 12.0, 9.25, 15.5, 6.8];
const ratings = [4.7, 4.5, 4.8, 4.2, 4.6, 4.9];

// Gallery: the other Figma photos of the same product name (Home shows each name in 6 slots).
const gallery = (name: string, own: string) =>
  rows
    .flatMap(({ section, row }) =>
      names.map((nm, i) => ({ nm, src: `/images/products/${section}-${row}-${i + 1}.webp` })),
    )
    .filter((x) => x.nm === name && x.src !== own)
    .slice(0, 3)
    .map((x) => x.src);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const products: Product[] = rows.flatMap(({ section, row, tag }, r) =>
  names.map((name, i) => {
    const n = r * names.length + i + 1;
    const id = `p${String(n).padStart(2, "0")}`;
    const category =
      name === "Dry Shampoo" ? "hair-care" : categoryCycle[(i + r) % categoryCycle.length];
    const price = prices[(i + r) % prices.length];
    const image = `/images/products/${section}-${row}-${i + 1}.webp`;
    const soldOut = n % 9 === 0;
    return {
      id,
      slug: `${slugify(name)}-${id}`,
      name,
      brand: brands[(n - 1) % brands.length].slug,
      description,
      details:
        "A creamy foaming gel that cleanses gently without drying the skin. Suitable for daily use morning and evening.",
      ingredients:
        "Aqua, Sodium Laureth Sulfate, Glycerin, Coco-Betaine, Zinc Gluconate, Citric Acid.",
      price,
      salePrice: n % 5 === 0 ? Math.round(price * 0.8 * 100) / 100 : undefined,
      images: [image, ...gallery(name, image)],
      category,
      concern: name === "Dry Shampoo" ? "dandruff" : concernCycle[(i + r) % concernCycle.length],
      rating: ratings[(i + r) % ratings.length],
      reviewCount: 715 - n * 7,
      variants: [
        { id: "100ml", label: "100 ml", priceDelta: 0, stock: soldOut ? 0 : 24 },
        { id: "200ml", label: "200 ml", priceDelta: 3, stock: soldOut || n % 4 === 0 ? 0 : 12 },
        { id: "400ml", label: "400 ml", priceDelta: 7, stock: soldOut ? 0 : 6 },
      ],
      stock: soldOut ? 0 : 42,
      tags: [tag],
      createdAt: new Date(Date.UTC(2026, 0, 1 + n * 3)).toISOString(),
    } satisfies Product;
  }),
);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const byTag = (tag: Product["tags"][number]) => products.filter((p) => p.tags.includes(tag));
