"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// Style Guide check (2:181) / radio (2:192): 24px circle, off = gray-30 ring, on = primary-hover fill.
type ChoiceProps = Omit<ComponentProps<"input">, "type"> & {
  label: ReactNode;
  description?: ReactNode;
};

const control = cn(
  "peer relative size-6 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-gray-30 bg-surface",
  "transition-colors duration-(--duration-fast) hover:border-primary-hover",
  "checked:border-primary-hover checked:bg-primary-hover",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong",
  "disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)",
);

function ChoiceRow({
  id,
  label,
  description,
  children,
  className,
}: {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-touch items-center gap-3", className)}>
      <span className="relative inline-flex size-6 items-center justify-center">{children}</span>
      <label htmlFor={id} className="flex cursor-pointer flex-col text-body-md text-text">
        {label}
        {description && <span className="text-body-sm text-text-muted">{description}</span>}
      </label>
    </div>
  );
}

export function Checkbox({ label, description, className, id, ...props }: ChoiceProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <ChoiceRow id={inputId} label={label} description={description} className={className}>
      <input id={inputId} type="checkbox" className={control} {...props} />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute inset-0 hidden size-6 text-white-soft peer-checked:block"
      >
        <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </ChoiceRow>
  );
}

export function Radio({ label, description, className, id, ...props }: ChoiceProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <ChoiceRow id={inputId} label={label} description={description} className={className}>
      <input id={inputId} type="radio" className={control} {...props} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute hidden size-2.5 rounded-full bg-white-soft peer-checked:block"
      />
    </ChoiceRow>
  );
}

// Style Guide toggle (2:187): 44x24 track, 24px knob.
export function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full focus-ring transition-colors duration-(--duration-base)",
        "disabled:opacity-(--opacity-disabled)",
        checked ? "bg-primary-hover" : "bg-gray-toggle",
      )}
    >
      <span
        className={cn(
          "absolute top-0 size-6 rounded-full border-2 bg-white transition-[left] duration-(--duration-base)",
          checked ? "left-5 border-primary-hover" : "left-0 border-gray-toggle",
        )}
      />
    </button>
  );
}
