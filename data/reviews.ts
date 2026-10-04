import type { Product } from "@/types";

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
};

const authors = ["Jenny Wilson", "Esther Howard", "Kristin Watson", "Robert Fox", "Dianne Russell"];
const bodies = [
  "Gentle on my skin and leaves it feeling clean without any tightness.",
  "Lovely texture, a little goes a long way. Will buy again.",
  "Works well for my combination skin. Packaging could be better.",
  "Noticed a difference after two weeks of daily use.",
];

// Deterministic mock reviews (no Math.random so server and client render the same markup).
export function reviewsFor(product: Product): Review[] {
  const seed = Number(product.id.slice(1));
  return Array.from({ length: 4 }, (_, i) => ({
    id: `${product.id}-r${i}`,
    author: authors[(seed + i) % authors.length],
    rating: [5, 4, 5, 4][(seed + i) % 4],
    date: new Date(Date.UTC(2026, (seed + i) % 12, 1 + ((seed * 3 + i) % 27)))
      .toISOString()
      .slice(0, 10),
    title: ["Great everyday cleanser", "Really nice", "Good value", "Recommended"][i],
    body: bodies[(seed + i) % bodies.length],
  }));
}
