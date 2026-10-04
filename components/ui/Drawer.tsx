"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { cn } from "@/lib/cn";
import { CloseIcon } from "./glyphs";

// Derived (not in Figma): modal shadow + white surface, slides from left or right.
export function Drawer({
  open,
  onClose,
  side = "left",
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right" | "bottom";
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  useFocusTrap(panel, open, onClose);
  const axis = side === "bottom" ? "y" : "x";
  const offset = side === "left" ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ [axis]: offset }}
            animate={{ [axis]: 0 }}
            exit={{ [axis]: offset }}
            transition={{ type: "tween", duration: 0.25, ease: [0.2, 0, 0, 1] }}
            className={cn(
              "absolute flex flex-col bg-surface shadow-drawer focus:outline-none",
              side === "bottom"
                ? "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-2xl"
                : "top-0 h-dvh w-[min(26rem,100vw)]",
              side === "left" && "left-0",
              side === "right" && "right-0",
            )}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
              <h2 className="text-h6 font-semibold text-text">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex size-touch items-center justify-center rounded-sm focus-ring hover:text-primary-hover"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
            {footer && <div className="shrink-0 border-t border-line p-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
