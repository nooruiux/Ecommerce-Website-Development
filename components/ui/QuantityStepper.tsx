"use client";

import { cn } from "@/lib/cn";

// Derived (not in Figma): border/radius from fields, 44px touch targets.
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Quantity",
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}) {
  const btn = cn(
    "focus-ring inline-flex size-touch items-center justify-center text-h6 text-text",
    "transition-colors hover:text-primary-hover-strong disabled:opacity-(--opacity-disabled)",
  );
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex items-center rounded-sm border border-border-field", className)}
    >
      <button
        type="button"
        className={btn}
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        aria-label={label}
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (!Number.isNaN(next)) onChange(Math.min(max, Math.max(min, next)));
        }}
        className="h-touch w-10 [appearance:textfield] bg-transparent text-center text-body-lg font-semibold text-text focus-visible:outline-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        className={btn}
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
