"use client";

import { IntentLink as Link } from "@/components/ui/IntentLink";
import { AssetImage } from "@/components/ui/AssetImage";
import { PriceTag } from "@/components/ui/PriceTag";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import type { ResolvedLine } from "@/lib/cart/totals";
import { useCart } from "@/store/cart";
import { useToast } from "@/store/toast";

export function CartLineItem({
  line,
  onNavigate,
}: {
  line: ResolvedLine;
  onNavigate?: () => void;
}) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const insert = useCart((s) => s.insert);
  const toast = useToast((s) => s.show);
  const removeWithUndo = () => {
    const { productId, variantId, quantity } = line;
    const index = useCart
      .getState()
      .lines.findIndex((l) => l.productId === productId && l.variantId === variantId);
    remove(productId, variantId);
    toast({
      message: `${line.product.name} removed from cart`,
      actionLabel: "Undo",
      onAction: () => insert({ productId, variantId, quantity }, index),
    });
  };
  const { product, variant } = line;
  return (
    <li className="flex gap-4 py-4">
      <Link
        href={`/product/${product.slug}`}
        onClick={onNavigate}
        tabIndex={-1}
        aria-hidden="true"
        className="relative size-20 shrink-0 overflow-hidden rounded-sm border border-border"
      >
        <AssetImage src={product.images[0]} alt="" fill sizes="80px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/product/${product.slug}`}
              onClick={onNavigate}
              className="block truncate rounded-xs text-body-lg font-semibold text-text focus-ring hover:text-primary-hover-strong"
            >
              {product.name}
            </Link>
            <p className="text-body-sm text-text-muted">{variant.label}</p>
          </div>
          <PriceTag price={line.unitListPrice * line.quantity} salePrice={line.lineTotal} />
        </div>
        <div className="flex items-center justify-between">
          <QuantityStepper
            value={line.quantity}
            max={Math.max(1, variant.stock)}
            onChange={(q) => setQuantity(product.id, variant.id, q)}
            label={`Quantity for ${product.name}`}
          />
          <button
            type="button"
            onClick={removeWithUndo}
            className="min-h-touch rounded-xs px-2 text-body-md text-text-muted underline focus-ring hover:text-error-strong"
          >
            Remove<span className="sr-only"> {product.name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}
