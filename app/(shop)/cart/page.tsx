import type { Metadata } from "next";
import { CartPageView } from "@/components/cart/CartPageView";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="container-page flex flex-col gap-8 py-8 xl:py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="font-heading text-h4 font-semibold text-text-heading xl:text-h2">Your Cart</h1>
      <CartPageView />
    </div>
  );
}
