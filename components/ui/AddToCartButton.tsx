"use client";

import { useCart } from "@/store/cart";

// Product-card "Add to Cart" button (replaces the Figma plus icon 317:537).
// Takes only scalars so product cards don't serialize the full product into the RSC payload.
export function AddToCartButton({
  productId,
  productName,
  variantId,
  inStock,
}: {
  productId: string;
  productName: string;
  variantId: string;
  inStock: boolean;
}) {
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);
  return (
    <button
      type="button"
      disabled={!inStock}
      aria-label={inStock ? `Add ${productName} to cart` : `${productName} is out of stock`}
      onClick={() => {
        add(productId, variantId);
        open();
      }}
      className="relative inline-flex h-10 w-full items-center justify-center rounded-md bg-primary-hover-strong px-3 text-body-md font-semibold whitespace-nowrap text-on-accent focus-ring transition-colors duration-(--duration-fast) hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)"
    >
      {inStock ? "Add To Cart" : "Out of Stock"}
    </button>
  );
}
