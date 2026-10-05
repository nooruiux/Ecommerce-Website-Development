import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("animate-skeleton rounded-sm bg-gray-20", className)} />
  );
}

// Matches ProductCard: padded square image, two-line title, price, button.
export function ProductCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-line bg-surface p-3">
      <Skeleton className="aspect-square w-full rounded-md" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
