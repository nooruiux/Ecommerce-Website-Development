import { AssetImage } from "./AssetImage";
import { IntentLink as Link } from "@/components/ui/IntentLink";
import type { Product } from "@/types";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";

/*
 * Product card (owner-requested retail style): white rounded card, padded square image with a
 * discount pill, bold one-line title, two-line subheadline, struck original + current price, full-width Add To Cart.
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
  const variant = product.variants.find((v) => v.stock > 0) ?? product.variants[0];
  const onSale = product.salePrice !== undefined && product.salePrice < product.price;
  const current = onSale ? product.salePrice! : product.price;
  const discount = onSale ? Math.round((1 - current / product.price) * 100) : 0;
  return (
    <article
      className={cn(
        "group relative flex w-full flex-col gap-3 rounded-lg border border-line bg-surface p-3 transition-shadow duration-(--duration-base) hover:shadow-soft",
        className,
      )}
    >
      <Link
        href={href}
        className="relative block aspect-square overflow-hidden rounded-md bg-surface-subtle focus-ring"
        tabIndex={-1}
        aria-hidden="true"
      >
        <AssetImage
          src={product.images[0]}
          alt=""
          fill
          // LCP card: <link rel="preload"> in <head> + high fetch priority.
          preload={priority}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          sizes="(min-width: 90rem) 176px, (min-width: 48rem) 28vw, 42vw"
          className="object-cover transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 rounded-full bg-sale px-2.5 py-0.5 text-body-sm font-bold text-on-sale">
            −{discount}%
          </span>
        )}
      </Link>
      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-1 text-card-title font-bold text-text">
          <Link
            href={href}
            className="rounded-xs focus-ring after:absolute after:inset-0 after:rounded-lg after:content-[''] hover:text-primary-hover-strong"
          >
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 min-h-10 text-body-sm text-text-muted">{product.description}</p>
      </div>
      <p className="mt-auto flex h-6 items-center gap-x-2 overflow-hidden whitespace-nowrap">
        {onSale && (
          <s className="text-body-md leading-none text-text-muted">
            <span className="sr-only">Original price </span>
            {formatPrice(product.price)}
          </s>
        )}
        <span className="text-body-lg leading-none font-bold text-primary-strong">
          <span className="sr-only">{onSale ? "Sale price " : "Price "}</span>
          {formatPrice(current)}
        </span>
      </p>
      <AddToCartButton
        productId={product.id}
        productName={product.name}
        variantId={variant.id}
        inStock={variant.stock > 0}
      />
    </article>
  );
}
