import type { Metadata } from "next";
import { CompareTable } from "@/components/lists/SavedProducts";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Compare products", robots: { index: false } };

export default function Page() {
  return (
    <div className="container-page flex flex-col gap-8 py-8 xl:py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Compare products" }]} />
      <h1 className="font-heading text-h4 font-semibold text-text-heading xl:text-h2">
        Compare products
      </h1>
      <CompareTable />
    </div>
  );
}
