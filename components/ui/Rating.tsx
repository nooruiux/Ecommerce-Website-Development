import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

// Product card rating (317:529): star 16px + "4.7 (715)" Source Serif SemiBold 14.
export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  const label = `Rated ${value.toFixed(1)} out of 5${count ? ` from ${count} reviews` : ""}`;
  return (
    <span role="img" className={cn("inline-flex items-center gap-1", className)} aria-label={label}>
      <Icon name="star" size={16} className="text-warning" />
      <span aria-hidden="true" className="text-body-md leading-none font-semibold text-text">
        {value.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </span>
  );
}
