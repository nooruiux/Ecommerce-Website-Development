import { cn } from "@/lib/cn";

// Header icon badges (317:367): 16px primary-light circle, Poppins SemiBold 10.
export function CountBadge({ count, className }: { count: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -top-1 -right-2 inline-flex size-4 items-center justify-center rounded-full bg-primary-light",
        "font-heading text-body-xs leading-none font-semibold text-black",
        className,
      )}
    >
      {count > 99 ? "99" : count}
    </span>
  );
}
