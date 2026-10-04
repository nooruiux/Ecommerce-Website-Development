"use client";

import { useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

type Order = {
  number: string;
  email: string;
  name: string;
  items: number;
  total: number;
  delivery: string;
};

const read = (): string | null => {
  try {
    return sessionStorage.getItem("nattoral-last-order");
  } catch {
    return null;
  }
};

export function OrderConfirmation() {
  const raw = useSyncExternalStore(
    () => () => {},
    read,
    () => null,
  );
  const order: Order | null = raw ? JSON.parse(raw) : null;

  return (
    <div className="mx-auto flex max-w-138 flex-col items-center gap-6 rounded-2xl bg-surface p-6 text-center shadow-modal md:p-10">
      <span
        aria-hidden="true"
        className="inline-flex size-16 items-center justify-center rounded-full bg-success-tint text-h4 text-success"
      >
        ✓
      </span>
      <h1 className="font-heading text-h4 font-semibold">Thank you for your order!</h1>
      {order ? (
        <>
          <p className="text-body-lg text-text-muted">
            Order <strong className="text-text">{order.number}</strong> is confirmed. A receipt is
            on its way to {order.email}.
          </p>
          <dl className="grid w-full grid-cols-2 gap-2 rounded-sm border border-border p-4 text-left text-body-md">
            <dt className="text-text-muted">Items</dt>
            <dd className="text-right">{order.items}</dd>
            <dt className="text-text-muted">Delivery</dt>
            <dd className="text-right">{order.delivery}</dd>
            <dt className="font-semibold">Total</dt>
            <dd className="text-right font-semibold">{formatPrice(order.total)}</dd>
          </dl>
        </>
      ) : (
        <p className="text-body-lg text-text-muted">Your order has been placed.</p>
      )}
      <ButtonLink href="/shop" size="lg">
        Continue shopping
      </ButtonLink>
    </div>
  );
}
