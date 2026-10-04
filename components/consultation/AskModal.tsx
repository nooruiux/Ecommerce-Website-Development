"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/Modal";
import { AskForm } from "./AskForm";

const AskContext = createContext<(message?: string) => void>(() => {});
export const useAskModal = () => useContext(AskContext);

export function AskModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });
  const open = useCallback((message = "") => setState({ open: true, message }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  return (
    <AskContext.Provider value={open}>
      {children}
      <Modal open={state.open} onClose={close} labelledBy="ask-modal-title">
        <AskForm
          titleAs="h2"
          titleId="ask-modal-title"
          defaultMessage={state.message}
          key={state.message}
        />
      </Modal>
    </AskContext.Provider>
  );
}

export function AskButton({
  children,
  className,
  message,
}: {
  children: ReactNode;
  className?: string;
  message?: string;
}) {
  const open = useAskModal();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => open(message)}
      className={className}
    >
      {children}
    </button>
  );
}
