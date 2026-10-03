/*
 * "Shop By Popular Brands" (317:645). Neutral placeholder wordmarks until the real
 * brand list is confirmed. Set `logo` to an exported file to show a real logo.
 */
export type Brand = { slug: string; name: string; logo?: string };

export const brands: Brand[] = Array.from({ length: 14 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { slug: `brand-${n}`, name: `Brand ${n}` };
});
