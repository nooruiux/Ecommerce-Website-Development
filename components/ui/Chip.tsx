import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Style Guide chip (2:170)
export type ChipTone = "success" | "failed" | "pending" | "refund" | "unpaid" | "sale";

const tones: Record<ChipTone, string> = {
  success: "bg-success-tint text-success",
  failed: "bg-error-tint text-error-chip",
  pending: "bg-pending-tint text-highlight",
  refund: "bg-warning-tint text-warning",
  unpaid: "bg-purple-tint text-purple",
  // Discount tag: sale red fill + white text (5.6:1)
  sale: "bg-sale text-on-sale",
};

export function Chip({
  tone = "success",
  children,
  className,
}: {
  tone?: ChipTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-4 py-1 font-label text-label-sm font-normal",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
