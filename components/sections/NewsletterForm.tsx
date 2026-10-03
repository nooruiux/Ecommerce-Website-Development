"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Pill form 373x64 (primary-light), Subscribe button 48px pill (accent).
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    if (!EMAIL.test(email)) return setStatus("error");
    setStatus("done");
    e.currentTarget.reset();
  }

  return (
    <div className="flex w-full max-w-93.25 flex-col gap-2">
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex h-16 w-full items-center rounded-pill bg-primary-light p-2 pl-4"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={status === "error" || undefined}
          aria-describedby="newsletter-status"
          placeholder="Enter your email"
          className="min-w-0 flex-1 bg-transparent text-body-xl font-semibold text-text placeholder:text-text-input-soft focus-visible:outline-none"
        />
        <button
          type="submit"
          className="h-12 shrink-0 rounded-pill bg-accent px-6 font-label text-label-lg font-semibold text-white focus-ring transition-colors hover:bg-primary-hover"
        >
          Subscribe
        </button>
      </form>
      <p
        id="newsletter-status"
        role="status"
        className={cn(
          "min-h-5 text-center text-body-sm text-white",
          status === "idle" && "sr-only",
        )}
      >
        {status === "error" && "Please enter a valid email address."}
        {status === "done" && "Thanks! Your $25 coupon is on its way."}
      </p>
    </div>
  );
}
