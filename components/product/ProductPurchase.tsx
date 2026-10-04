"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { cn } from "@/lib/cn";
import { useCart } from "@/store/cart";
import { useCompare, useWishlist } from "@/store/lists";
import { useHydrated } from "@/store/useHydrated";
import type { Product, ProductVariant } from "@/types";

export const defaultVariant = (product: Product) =>
  product.variants.find((v) => v.stock > 0) ?? product.variants[0];

// ?variant= is read on the client so the page itself stays fully static.
function PurchaseFromUrl({ product }: { product: Product }) {
  const requested = useSearchParams().get("variant");
  const variant = product.variants.find((v) => v.id === requested) ?? defaultVariant(product);
  return <PurchasePanel product={product} variant={variant} />;
}

// Server/prerender output uses the default variant; the URL variant takes over after hydration.
export function ProductPurchase({ product }: { product: Product }) {
  return (
    <Suspense fallback={<PurchasePanel product={product} variant={defaultVariant(product)} />}>
      <PurchaseFromUrl product={product} />
    </Suspense>
  );
}

function PurchasePanel({ product, variant }: { product: Product; variant: ProductVariant }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const hydrated = useHydrated();
  const wished = useWishlist((s) => s.ids.includes(product.id)) && hydrated;
  const toggleWish = useWishlist((s) => s.toggle);
  const compared = useCompare((s) => s.ids.includes(product.id)) && hydrated;
  const toggleCompare = useCompare((s) => s.toggle);

  const list = product.price + variant.priceDelta;
  const sale = product.salePrice !== undefined ? product.salePrice + variant.priceDelta : undefined;
  const soldOut = variant.stock <= 0;

  const addToCart = () => {
    add(product.id, variant.id, qty);
    setAdded(true);
    openCart();
  };

  return (
    <div className="flex flex-col gap-6">
      <PriceTag price={list} salePrice={sale} size="lg" />

      <div className="flex flex-col gap-3">
        <p className="text-body-lg font-semibold">
          Size: <span className="font-normal">{variant.label}</span>
        </p>
        <ul className="flex flex-wrap gap-3">
          {product.variants.map((v) => {
            const selected = v.id === variant.id;
            const out = v.stock <= 0;
            return (
              <li key={v.id}>
                <Link
                  href={`/product/${product.slug}?variant=${v.id}`}
                  replace
                  scroll={false}
                  aria-current={selected || undefined}
                  className={cn(
                    "inline-flex min-h-touch min-w-20 items-center justify-center rounded-sm border px-4 text-body-md font-semibold focus-ring transition-colors",
                    selected
                      ? "border-accent bg-accent text-on-accent"
                      : "border-border-field text-text hover:border-primary-hover",
                    out && "line-through opacity-(--opacity-disabled)",
                  )}
                >
                  {v.label}
                  {out && <span className="sr-only"> (sold out)</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <p className={cn("text-body-md", soldOut ? "text-error" : "text-success")} aria-live="polite">
        {soldOut
          ? "Sold out in this size"
          : variant.stock < 10
            ? `Only ${variant.stock} left`
            : "In stock"}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, variant.stock)} />
        <Button size="lg" className="flex-1" disabled={soldOut} onClick={addToCart}>
          {soldOut ? "Sold out" : "Add to cart"}
        </Button>
      </div>
      <p className="sr-only" role="status">
        {added ? `${product.name} added to cart` : ""}
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="md"
          aria-pressed={wished}
          onClick={() => toggleWish(product.id)}
        >
          {wished ? "Saved to wishlist" : "Add to wishlist"}
        </Button>
        <Button
          variant="outline"
          size="md"
          aria-pressed={compared}
          onClick={() => toggleCompare(product.id)}
        >
          {compared ? "Added to compare" : "Compare"}
        </Button>
      </div>

      {/* Mobile sticky bar (derived) */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-line bg-surface px-4 py-3 shadow-modal md:hidden">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-body-md text-text-muted">
            {product.name} · {variant.label}
          </span>
          <PriceTag price={list} salePrice={sale} />
        </div>
        <Button size="md" disabled={soldOut} onClick={addToCart}>
          {soldOut ? "Sold out" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
