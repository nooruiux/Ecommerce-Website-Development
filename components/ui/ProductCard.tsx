import { AssetImage } from "./AssetImage";
import { IntentLink as Link } from "@/components/ui/IntentLink";
import type { Product } from "@/types";
import { cn } from "@/lib/cn";
import { Chip } from "./Chip";
import { PriceTag } from "./PriceTag";
import { Rating } from "./Rating";
import { AddToCartIcon } from "./AddToCartIcon";

/*
 * Figma 317:519 — 200x200 image (border l/r/t, radius-top 4) + 200 body
 * (bg white, border b/l/r). Title 18/30 semibold, description 14/22 muted,
 * "500+ Sold" primary + rating, price + "Buy Now" pill with plus icon.
 */
export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const href = `/product/${product.slug}`;
  // Sale: show the current price in the 172px row; the struck price lives on the PDP and cart.
  const discount = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;
  return (
    <article
      className={cn(
        "group relative flex w-full flex-col drop-shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <Link
        href={href}
        className="relative block aspect-square overflow-hidden rounded-t-sm border-x border-t border-border bg-surface-subtle focus-ring"
        tabIndex={-1}
        aria-hidden="true"
      >
        <AssetImage
          src={product.images[0]}
          alt=""
          fill
          loading={priority ? "eager" : "lazy"}
          sizes="(min-width: 90rem) 200px, (min-width: 48rem) 30vw, 46vw"
          className="object-cover transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover:scale-105"
        />
        {discount > 0 && (
          <Chip tone="sale" className="absolute top-2 left-2 font-semibold">
            −{discount}%
          </Chip>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-4 rounded-b-sm border-x border-b border-border bg-surface px-3.5 pt-1 pb-5.25">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <h3 className="font-body text-body-xl font-semibold text-text">
              <Link href={href} className="rounded-xs focus-ring hover:text-primary-hover-strong">
                {product.name}
              </Link>
            </h3>
            <p className="line-clamp-3 text-caption text-text-muted">{product.description}</p>
          </div>
          <div className="flex min-h-4.5 flex-wrap items-center gap-2">
            <span className="text-body-md leading-none font-semibold text-primary-strong">
              {product.soldLabel}
            </span>
            <Rating value={product.rating} count={product.reviewCount} />
          </div>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          <PriceTag price={product.salePrice ?? product.price} />
          <div className="relative flex h-8 items-center rounded-pill border border-border pr-8 pl-2">
            <Link
              href={href}
              className="rounded-xs text-body-md leading-none font-semibold whitespace-nowrap text-text focus-ring hover:text-primary-hover-strong"
            >
              Buy Now
              <span className="sr-only">: {product.name}</span>
            </Link>
            <AddToCartIcon product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
