import { brands } from "./brands";
import { categories, concerns } from "./catalog";

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; href: string; links: NavLink[] };

const concernLinks = (category: string) =>
  concerns
    .filter((c) => c.category === category)
    .map((c) => ({ label: c.name, href: `/category/${category}?concern=${c.slug}` }));

// Category bar (317:393). Dropdown contents are derived from the catalog.
export const mainNav: NavGroup[] = [
  ...categories.map((c) => ({
    label: c.name,
    href: `/category/${c.slug}`,
    links: [{ label: `All ${c.name}`, href: `/category/${c.slug}` }, ...concernLinks(c.slug)],
  })),
  {
    label: "Brands",
    href: "/shop",
    links: brands.slice(0, 8).map((b) => ({ label: b.name, href: `/shop?brand=${b.slug}` })),
  },
  {
    label: "By Ingredient",
    href: "/shop",
    links: ["Glycerin", "Zinc Gluconate", "Citric Acid", "Coco-Betaine"].map((i) => ({
      label: i,
      href: `/shop?q=${encodeURIComponent(i)}`,
    })),
  },
];

// Footer (317:1304, 317:1491)
export const footerCompany: NavLink[] = mainNav.map((g) => ({ label: g.label, href: g.href }));

export const footerService: NavLink[] = [
  { label: "Help Center", href: "/contact" },
  { label: "Terms and Conditions", href: "/about#terms" },
  { label: "Consumers (Transactions)", href: "/about#consumers" },
  { label: "Take our feedback survey", href: "/contact#feedback" },
  { label: "Transaction Services Agreement", href: "/about#agreement" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
] as const;
