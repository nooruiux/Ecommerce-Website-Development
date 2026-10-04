"use client";

import { Icon } from "./Icon";
import { useCart } from "@/store/cart";

// Plus-circle (Figma 317:537), 32px visual with a 44px hit area.
// Takes only scalars so product cards don't serialize the full product into the RSC payload.
export function AddToCartIcon({
  productId,
  productName,
  variantId,
}: {
  productId: string;
  productName: string;
  variantId: string;
}) {
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);
  return (
    <button
      type="button"
      aria-label={`Add ${productName} to cart`}
      onClick={() => {
        add(productId, variantId);
        open();
      }}
      className="absolute -top-px -right-px size-8 rounded-full focus-ring transition-transform duration-(--duration-fast) before:absolute before:-inset-1.5 before:content-[''] hover:scale-110"
    >
      <Icon name="plus-circle" size={32} className="rounded-full text-warning" />
    </button>
  );
}
