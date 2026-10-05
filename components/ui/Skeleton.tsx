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
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="mt-1 h-5 w-1/2" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
