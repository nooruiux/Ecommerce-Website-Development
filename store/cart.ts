"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartLine } from "@/types";

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  add: (productId: string, variantId: string, quantity?: number) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  remove: (productId: string, variantId: string) => void;
  insert: (line: CartLine, index: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const same = (line: CartLine, productId: string, variantId: string) =>
  line.productId === productId && line.variantId === variantId;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      add: (productId, variantId, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => same(l, productId, variantId));
          const lines = existing
            ? state.lines.map((l) =>
                same(l, productId, variantId) ? { ...l, quantity: l.quantity + quantity } : l,
              )
            : [...state.lines, { productId, variantId, quantity }];
          return { lines };
        }),
      setQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => !same(l, productId, variantId))
              : state.lines.map((l) => (same(l, productId, variantId) ? { ...l, quantity } : l)),
        })),
      remove: (productId, variantId) =>
        set((state) => ({ lines: state.lines.filter((l) => !same(l, productId, variantId)) })),
      insert: (line, index) =>
        set((state) => {
          if (state.lines.some((l) => same(l, line.productId, line.variantId))) return state;
          const lines = [...state.lines];
          lines.splice(Math.min(index, lines.length), 0, line);
          return { lines };
        }),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "nattoral-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.lines.reduce((sum, line) => sum + line.quantity, 0);
