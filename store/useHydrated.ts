"use client";

import { useEffect, useState } from "react";

// Persisted stores read localStorage on the client only; render 0 until mounted.
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
