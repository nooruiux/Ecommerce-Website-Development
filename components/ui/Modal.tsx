"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { CloseIcon } from "./glyphs";

// Figma "Questions 1" (172:5135): blurred page behind a centred card.
export function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  useFocusTrap(panel, open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            className="fixed inset-0 bg-white/20 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative my-auto w-full max-w-138 focus:outline-none"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 inline-flex size-touch items-center justify-center rounded-sm text-text focus-ring hover:text-primary-hover"
            >
              <CloseIcon />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
