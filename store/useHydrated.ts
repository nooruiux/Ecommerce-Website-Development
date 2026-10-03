"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Persisted stores read localStorage on the client only; render server values until hydrated.
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
