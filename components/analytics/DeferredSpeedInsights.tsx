"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";

/*
 * Mounts Vercel Speed Insights after the window load event (and an idle slot), so its script
 * never competes with the LCP resources. Core Web Vitals are still reported: the collector reads
 * buffered performance entries, including the LCP that happened before it loaded.
 */
export function DeferredSpeedInsights() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = (cb: () => void) =>
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(cb)
        : globalThis.setTimeout(cb, 1);
    const start = () => idle(() => setReady(true));
    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return ready ? <SpeedInsights /> : null;
}
