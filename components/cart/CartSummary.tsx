import { formatPrice } from "@/lib/format";
import { cartTotals, FREE_SHIPPING_FROM } from "@/lib/cart/totals";
import { cn } from "@/lib/cn";

export function CartSummary({
  totals,
  className,
}: {
  totals: ReturnType<typeof cartTotals>;
  className?: string;
}) {
  const row = "flex items-center justify-between text-body-md text-text";
  return (
    <dl className={cn("flex flex-col gap-2", className)}>
      <div className={row}>
        <dt>Subtotal</dt>
        <dd>{formatPrice(totals.listSubtotal)}</dd>
      </div>
      {totals.discount > 0 && (
        <div className={cn(row, "text-highlight")}>
          <dt>Discount</dt>
          <dd>−{formatPrice(totals.discount)}</dd>
        </div>
      )}
      <div className={row}>
        <dt>Shipping</dt>
        <dd>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
      </div>
      {totals.shipping > 0 && (
        <p className="text-body-sm text-text-muted">
          Free shipping on orders over {formatPrice(FREE_SHIPPING_FROM)}.
        </p>
      )}
      <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
        <dt className="font-heading text-h6 font-semibold">Total</dt>
        <dd className="font-heading text-h6 font-semibold">{formatPrice(totals.total)}</dd>
      </div>
    </dl>
  );
}
