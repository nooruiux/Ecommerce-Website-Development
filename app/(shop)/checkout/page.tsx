import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className="container-page flex flex-col gap-8 py-8 xl:py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <h1 className="font-heading text-h4 font-semibold text-text-heading xl:text-h2">Checkout</h1>
      <CheckoutView />
    </div>
  );
}
