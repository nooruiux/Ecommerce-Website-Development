import Image from "next/image";
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
    <span className={cn("inline-flex items-center gap-1", className)} aria-label={label}>
      <Image src="/icons/star.svg" alt="" width={16} height={16} aria-hidden="true" />
      <span aria-hidden="true" className="text-body-md leading-none font-semibold text-text">
        {value.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </span>
  );
}
