"use client";

import { create } from "zustand";

export type Toast = { id: number; message: string; actionLabel?: string; onAction?: () => void };

type ToastState = {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id">, durationMs?: number) => void;
  dismiss: (id: number) => void;
};

let nextId = 1;

export const useToast = create<ToastState>()((set, get) => ({
  toasts: [],
  show: (toast, durationMs = 6000) => {
    const id = nextId++;
    set((s) => ({ toasts: [...s.toasts.slice(-2), { ...toast, id }] }));
    setTimeout(() => get().dismiss(id), durationMs);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
