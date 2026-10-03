import type { Category, Concern } from "@/types";

// Nav bar (Home header): Skin Care, Hair Care, Personal Care, Mom & Baby Care
export const categories: Category[] = [
  {
    slug: "skin-care",
    name: "Skin Care",
    description: "Cleansers, serums and moisturisers for every skin type.",
  },
  {
    slug: "hair-care",
    name: "Hair Care",
    description: "Shampoos and treatments for healthy hair and scalp.",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    description: "Everyday essentials for body and hygiene.",
  },
  {
    slug: "mom-baby-care",
    name: "Mom & Baby Care",
    description: "Gentle care for mothers and little ones.",
  },
];

// Top Categories (317:490)
export const concerns: Concern[] = [
  {
    slug: "rough-texture",
    name: "Rough Texture",
    image: "/images/concerns/rough-texture.webp",
    category: "skin-care",
  },
  {
    slug: "acne-scars",
    name: "Acne Scars",
    image: "/images/concerns/acne-scars.webp",
    category: "skin-care",
  },
  {
    slug: "wrinkles-and-lines",
    name: "Wrinkles and Lines",
    image: "/images/concerns/wrinkles-and-lines.webp",
    category: "skin-care",
  },
  {
    slug: "dry-and-dull-skin",
    name: "Dry and Dull Skin",
    image: "/images/concerns/dry-and-dull-skin.webp",
    category: "skin-care",
  },
  {
    slug: "hair-loss",
    name: "Hair Loss",
    image: "/images/concerns/hair-loss.webp",
    category: "hair-care",
  },
  {
    slug: "dandruff",
    name: "Dandruff",
    image: "/images/concerns/dandruff.webp",
    category: "hair-care",
  },
];

export const brands = [
  "Anycubic",
  "BIQU",
  "BCN3D",
  "Creality",
  "Wasp",
  "Elegoo",
  "Flashforge",
  "Formbot",
  "Formlabs",
  "MakerBot",
  "Modix",
  "Phrozen",
  "Tiertime",
  "Ultimaker",
];
