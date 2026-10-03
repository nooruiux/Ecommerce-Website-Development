export type CategorySlug = "skin-care" | "hair-care" | "personal-care" | "mom-baby-care";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type Concern = {
  slug: string;
  name: string;
  image: string;
  category: CategorySlug;
};

export type ProductVariant = {
  id: string;
  label: string;
  priceDelta: number;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  details: string;
  ingredients: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: CategorySlug;
  concern: string;
  rating: number;
  reviewCount: number;
  soldLabel: string;
  variants: ProductVariant[];
  stock: number;
  tags: Array<"featured" | "new" | "bestseller">;
  createdAt: string;
};

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "rating";
