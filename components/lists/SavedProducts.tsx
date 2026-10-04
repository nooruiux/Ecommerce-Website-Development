"use client";

import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { getProductById } from "@/data/products";
import { useCompare, useWishlist } from "@/store/lists";
import { useHydrated } from "@/store/useHydrated";
import { PriceTag } from "@/components/ui/PriceTag";
import { Rating } from "@/components/ui/Rating";
import { categories } from "@/data/catalog";
import Link from "next/link";
import type { Product } from "@/types";

function Empty({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-sm border border-border px-6 py-16 text-center">
      <p className="text-body-lg text-text-muted">{text}</p>
      <ButtonLink href="/shop">Browse products</ButtonLink>
    </div>
  );
}

const resolve = (ids: string[]) => ids.map(getProductById).filter((p): p is Product => !!p);

export function WishlistGrid() {
  const hydrated = useHydrated();
  const ids = useWishlist((s) => s.ids);
  const remove = useWishlist((s) => s.remove);
  if (!hydrated)
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  const items = resolve(ids);
  if (items.length === 0) return <Empty text="Your wishlist is empty." />;
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {items.map((p) => (
        <li key={p.id} className="flex min-w-0 flex-col gap-2">
          <ProductCard product={p} />
          <button
            type="button"
            onClick={() => remove(p.id)}
            className="min-h-touch rounded-xs text-body-md text-text-muted underline focus-ring hover:text-error"
          >
            Remove<span className="sr-only"> {p.name} from wishlist</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function CompareTable() {
  const hydrated = useHydrated();
  const ids = useCompare((s) => s.ids);
  const remove = useCompare((s) => s.remove);
  if (!hydrated) return null;
  const items = resolve(ids);
  if (items.length === 0) return <Empty text="Add products to compare from a product page." />;
  const rows: { label: string; render: (p: Product) => React.ReactNode }[] = [
    { label: "Price", render: (p) => <PriceTag price={p.price} salePrice={p.salePrice} /> },
    { label: "Rating", render: (p) => <Rating value={p.rating} count={p.reviewCount} /> },
    { label: "Category", render: (p) => categories.find((c) => c.slug === p.category)?.name },
    { label: "Sizes", render: (p) => p.variants.map((v) => v.label).join(", ") },
    { label: "Availability", render: (p) => (p.stock > 0 ? "In stock" : "Sold out") },
  ];
  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <table className="w-full min-w-160 text-left text-body-md">
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="w-40 p-4">
              <span className="sr-only">Attribute</span>
            </th>
            {items.map((p) => (
              <th key={p.id} scope="col" className="p-4 align-top">
                <Link
                  href={`/product/${p.slug}`}
                  className="rounded-xs font-heading text-h6 font-semibold focus-ring hover:text-primary-hover"
                >
                  {p.name}
                </Link>
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  className="mt-1 block min-h-touch rounded-xs text-body-sm text-text-muted underline focus-ring"
                >
                  Remove<span className="sr-only"> {p.name}</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line last:border-0">
              <th scope="row" className="p-4 font-semibold text-text">
                {r.label}
              </th>
              {items.map((p) => (
                <td key={p.id} className="p-4 text-text-muted">
                  {r.render(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
