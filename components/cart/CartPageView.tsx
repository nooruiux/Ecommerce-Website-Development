"use client";

import { useState, type FormEvent } from "react";
import { ButtonLink, Button } from "@/components/ui/Button";
import { fieldBase } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import { Skeleton } from "@/components/ui/Skeleton";
import { cartTotals, resolveLines } from "@/lib/cart/totals";
import { useCart } from "@/store/cart";
import { useHydrated } from "@/store/useHydrated";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";

// Coupon field is UI only: no codes are active yet, so every submission explains that.
function CouponForm() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string>();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage(
      code.trim() ? `“${code.trim()}” can’t be applied to this order.` : "Enter a coupon code.",
    );
  };
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <label htmlFor="coupon" className="text-body-lg text-text">
        Coupon code
      </label>
      <div className="flex gap-2">
        <input
          id="coupon"
          name="coupon"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          value={code}
          aria-invalid={message ? true : undefined}
          aria-describedby={message ? "coupon-message" : undefined}
          onChange={(e) => {
            setCode(e.target.value);
            setMessage(undefined);
          }}
          className={cn(fieldBase, "h-12 min-w-0 flex-1 uppercase")}
        />
        <Button type="submit" variant="outline" size="md">
          Apply
        </Button>
      </div>
      {message && (
        <p id="coupon-message" role="alert" className="text-body-sm text-error">
          {message}
        </p>
      )}
    </form>
  );
}

export function CartPageView() {
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const resolved = hydrated ? resolveLines(lines) : [];
  const totals = cartTotals(resolved);
  const count = resolved.reduce((s, l) => s + l.quantity, 0);

  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (resolved.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-sm border border-border px-6 py-16 text-center">
        <p className="font-heading text-h5 font-semibold">Your cart is empty</p>
        <p className="text-body-lg text-text-muted">
          Browse our skin care, hair care and personal care products.
        </p>
        <ButtonLink href="/shop" size="lg">
          Continue shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_24rem]">
      <section aria-labelledby="cart-items" className="flex flex-col">
        <h2 id="cart-items" className="sr-only">
          Items ({count})
        </h2>
        <ul className="divide-y divide-line border-y border-line" aria-live="polite">
          {resolved.map((line) => (
            <CartLineItem key={line.productId + line.variantId} line={line} />
          ))}
        </ul>
        <ButtonLink href="/shop" variant="ghost" className="mt-4 self-start px-0">
          ← Continue shopping
        </ButtonLink>
      </section>
      <aside
        aria-labelledby="summary-title"
        className="flex flex-col gap-6 rounded-sm border border-border p-6 lg:sticky lg:top-6"
      >
        <h2 id="summary-title" className="font-heading text-h5 font-semibold">
          Order summary
        </h2>
        <CouponForm />
        <CartSummary totals={totals} />
        <ButtonLink href="/checkout" size="lg" fullWidth>
          Checkout
        </ButtonLink>
      </aside>
    </div>
  );
}
