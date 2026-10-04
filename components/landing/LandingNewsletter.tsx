"use client";

import { useState, type FormEvent } from "react";

// 364x48 accent field with a 91px primary-light Subscribe segment (143:805).
export function LandingNewsletter() {
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("email") ?? "");
    setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "done" : "error");
  };
  return (
    <div className="flex w-full max-w-91 flex-col gap-1">
      <form onSubmit={onSubmit} noValidate className="flex h-12 overflow-hidden rounded-sm">
        <label htmlFor="landing-newsletter" className="sr-only">
          Email address
        </label>
        <input
          id="landing-newsletter"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email address"
          aria-invalid={status === "error" || undefined}
          aria-describedby="landing-newsletter-status"
          className="min-w-0 flex-1 bg-accent px-4 text-body-md text-white placeholder:text-text-inverse-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-strong"
        />
        <button
          type="submit"
          className="w-22.75 shrink-0 bg-primary-light px-3 text-body-md text-black focus-ring hover:bg-primary-hover-strong hover:text-white"
        >
          Subscribe
        </button>
      </form>
      <p
        id="landing-newsletter-status"
        role="status"
        className={status === "idle" ? "sr-only" : "text-body-sm text-text-muted"}
      >
        {status === "error" && "Please enter a valid email address."}
        {status === "done" && "Thanks for subscribing!"}
      </p>
    </div>
  );
}
