import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("animate-skeleton rounded-sm bg-gray-20", className)} />
  );
}

// Matches ProductCard: 200 image + 200 body.
export function ProductCardSkeleton() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-sm border border-border bg-surface">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="flex flex-col gap-2 px-3.5 pt-1 pb-5">
        <Skeleton className="mt-1 h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-1/2" />
        <div className="mt-3 flex items-center justify-between">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-8 w-27 rounded-pill" />
        </div>
      </div>
    </div>
  );
}
