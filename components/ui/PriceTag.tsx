import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

// Figma price (317:533): Source Serif Bold 18/30. Sale: current price in text colour + struck original (muted);
// the orange badge is the sale signal.
export function PriceTag({
  price,
  salePrice,
  size = "md",
  className,
}: {
  price: number;
  salePrice?: number;
  size?: "md" | "lg";
  className?: string;
}) {
  const onSale = salePrice !== undefined && salePrice < price;
  const current = onSale ? salePrice : price;
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-bold text-text",
          size === "lg" ? "font-heading text-h5" : "text-body-xl",
        )}
      >
        <span className="sr-only">{onSale ? "Sale price " : "Price "}</span>
        {formatPrice(current)}
      </span>
      {onSale && (
        <s className="text-body-md text-text-muted">
          <span className="sr-only">Original price </span>
          {formatPrice(price)}
        </s>
      )}
    </span>
  );
}
