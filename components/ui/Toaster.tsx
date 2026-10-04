"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/store/toast";
import { CloseIcon } from "./glyphs";

// Derived (not in Figma): accent surface, Body M, 44px action targets. Announced politely.
export function Toaster() {
  const toasts = useToast((s) => s.toasts);
  const dismiss = useToast((s) => s.dismiss);
  return (
    <div
      aria-live="polite"
      role="status"
      className="pointer-events-none fixed inset-x-4 bottom-24 z-[60] flex flex-col items-center gap-2 md:bottom-6"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="pointer-events-auto flex w-full max-w-md items-center gap-2 rounded-sm bg-accent py-1 pr-1 pl-4 text-body-md text-on-accent shadow-modal"
          >
            <p className="flex-1 py-2">{t.message}</p>
            {t.actionLabel && (
              <button
                type="button"
                onClick={() => {
                  t.onAction?.();
                  dismiss(t.id);
                }}
                className="min-h-touch rounded-xs px-3 font-label font-semibold text-primary-light underline focus-ring hover:text-white"
              >
                {t.actionLabel}
              </button>
            )}
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="inline-flex size-touch items-center justify-center rounded-xs focus-ring hover:text-primary-light"
            >
              <CloseIcon size={20} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
