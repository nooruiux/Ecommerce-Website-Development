"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { useCart } from "@/store/cart";

// Plus-circle (Figma 317:537), 32px visual with a 44px hit area.
export function AddToCartIcon({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);
  const variant = product.variants.find((v) => v.stock > 0) ?? product.variants[0];
  return (
    <button
      type="button"
      aria-label={`Add ${product.name} to cart`}
      onClick={() => {
        add(product.id, variant.id);
        open();
      }}
      className="absolute -top-px -right-px size-8 rounded-full focus-ring transition-transform duration-(--duration-fast) before:absolute before:-inset-1.5 before:content-[''] hover:scale-110"
    >
      <Image src="/icons/plus-circle.svg" alt="" width={32} height={32} />
    </button>
  );
}
