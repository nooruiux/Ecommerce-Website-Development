import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PrimitivesPreview } from "./PrimitivesPreview";

export const metadata: Metadata = { title: "Primitives", robots: { index: false, follow: false } };

// Internal review page for UI primitives; not part of the production site.
export default function PrimitivesPage() {
  if (process.env.NODE_ENV === "production" && process.env.SHOW_PRIMITIVES !== "1") notFound();
  return <PrimitivesPreview />;
}
