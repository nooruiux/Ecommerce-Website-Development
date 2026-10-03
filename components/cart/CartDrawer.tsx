"use client";

import { useCallback } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { ButtonLink } from "@/components/ui/Button";
import { cartTotals, resolveLines } from "@/lib/cart/totals";
import { useCart } from "@/store/cart";
import { useHydrated } from "@/store/useHydrated";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer() {
  const hydrated = useHydrated();
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const onClose = useCallback(() => close(), [close]);
  const resolved = hydrated ? resolveLines(lines) : [];
  const totals = cartTotals(resolved);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      side="right"
      title={`Your cart (${resolved.reduce((s, l) => s + l.quantity, 0)})`}
      footer={
        resolved.length > 0 ? (
          <div className="flex flex-col gap-4">
            <CartSummary totals={totals} />
            <div className="grid grid-cols-2 gap-3">
              <ButtonLink href="/cart" variant="outline" size="md" onClick={onClose}>
                View cart
              </ButtonLink>
              <ButtonLink href="/checkout" size="md" onClick={onClose}>
                Checkout
              </ButtonLink>
            </div>
          </div>
        ) : undefined
      }
    >
      {resolved.length === 0 ? (
        <div className="flex flex-col items-center gap-4 px-4 py-16 text-center">
          <p className="text-body-lg text-text-muted">Your cart is empty.</p>
          <ButtonLink href="/shop" onClick={onClose}>
            Continue shopping
          </ButtonLink>
        </div>
      ) : (
        <ul className="divide-y divide-line px-4" aria-live="polite">
          {resolved.map((line) => (
            <CartLineItem key={line.productId + line.variantId} line={line} onNavigate={onClose} />
          ))}
        </ul>
      )}
    </Drawer>
  );
}
