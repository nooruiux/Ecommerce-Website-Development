import type { Metadata } from "next";
import { WishlistGrid } from "@/components/lists/SavedProducts";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function Page() {
  return (
    <div className="container-page flex flex-col gap-8 py-8 xl:py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <h1 className="font-heading text-h4 font-semibold text-text-heading xl:text-h2">Wishlist</h1>
      <WishlistGrid />
    </div>
  );
}
