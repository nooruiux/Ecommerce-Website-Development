"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// Figma "Ask Us A Question" (172:4145): label 18/30, field 48px, 1px border black/64, radius 4.
export const fieldBase = cn(
  "w-full rounded-sm border border-border-field bg-surface px-4 font-body text-body-lg text-text",
  "placeholder:text-text-placeholder transition-colors duration-(--duration-fast)",
  "hover:border-accent focus-visible:border-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong",
  "disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)",
  "aria-invalid:border-error",
);

type FieldShellProps = {
  label: string;
  error?: string;
  hint?: string;
  id: string;
  children: ReactNode;
  className?: string;
  hideLabel?: boolean;
};

function FieldShell({ label, error, hint, id, children, className, hideLabel }: FieldShellProps) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className={cn("text-body-xl leading-5.5 text-text", hideLabel && "sr-only")}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-body-sm text-error-strong">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-body-sm text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = ComponentProps<"input"> & {
  label: string;
  endAdornment?: ReactNode;
  error?: string;
  hint?: string;
  hideLabel?: boolean;
  wrapperClassName?: string;
};

export function Input({
  label,
  endAdornment,
  error,
  hint,
  hideLabel,
  wrapperClassName,
  className,
  id,
  ...props
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell
      label={label}
      error={error}
      hint={hint}
      id={inputId}
      className={wrapperClassName}
      hideLabel={hideLabel}
    >
      <div className="relative">
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(fieldBase, "h-12", endAdornment && "pr-14", className)}
          {...props}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-1 flex items-center">{endAdornment}</div>
        )}
      </div>
    </FieldShell>
  );
}

type TextareaProps = ComponentProps<"textarea"> & {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export function Textarea({
  label,
  error,
  hint,
  wrapperClassName,
  className,
  id,
  rows = 3,
  ...props
}: TextareaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell label={label} error={error} hint={hint} id={inputId} className={wrapperClassName}>
      <textarea
        id={inputId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={cn(fieldBase, "h-29.25 min-h-29.25 resize-y py-3.5", className)}
        {...props}
      />
    </FieldShell>
  );
}

type SelectProps = ComponentProps<"select"> & {
  label: string;
  error?: string;
  hideLabel?: boolean;
  wrapperClassName?: string;
};

export function Select({
  label,
  error,
  hideLabel,
  wrapperClassName,
  className,
  id,
  children,
  ...props
}: SelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FieldShell
      label={label}
      error={error}
      id={inputId}
      className={wrapperClassName}
      hideLabel={hideLabel}
    >
      <div className="relative">
        <select
          id={inputId}
          aria-invalid={error ? true : undefined}
          className={cn(fieldBase, "h-12 appearance-none pr-10", className)}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-text"
        >
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </FieldShell>
  );
}
