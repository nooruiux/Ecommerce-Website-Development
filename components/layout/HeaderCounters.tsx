"use client";

import Link from "next/link";
import { CountBadge } from "@/components/ui/CountBadge";
import { Icon } from "@/components/ui/Icon";
import { selectCartCount, useCart } from "@/store/cart";
import { useCompare, useWishlist } from "@/store/lists";
import { useHydrated } from "@/store/useHydrated";
import { cn } from "@/lib/cn";

const iconButton =
  "focus-ring relative inline-flex size-touch items-center justify-center rounded-sm hover:text-primary-hover";

// Figma 317:362 / 317:370 / 317:376 — 24px icons with a count badge.
export function HeaderCounters({ compact = false }: { compact?: boolean }) {
  const hydrated = useHydrated();
  const cartCount = useCart(selectCartCount);
  const openCart = useCart((s) => s.open);
  const wishlist = useWishlist((s) => s.ids.length);
  const compare = useCompare((s) => s.ids.length);
  const n = (v: number) => (hydrated ? v : 0);

  return (
    <>
      {!compact && (
        <>
          <Link href="/compare" className={iconButton} aria-label={`Compare (${n(compare)} items)`}>
            <Icon name="compare" />
            <CountBadge count={n(compare)} className="top-0 right-0" />
          </Link>
          <Link
            href="/wishlist"
            className={iconButton}
            aria-label={`Wishlist (${n(wishlist)} items)`}
          >
            <Icon name="heart" />
            <CountBadge count={n(wishlist)} className="top-0 right-0" />
          </Link>
        </>
      )}
      <button
        type="button"
        onClick={openCart}
        className={cn(iconButton)}
        aria-label={`Open cart (${n(cartCount)} items)`}
      >
        <Icon name="cart" />
        <CountBadge count={n(cartCount)} className="top-0 right-0" />
      </button>
    </>
  );
}
