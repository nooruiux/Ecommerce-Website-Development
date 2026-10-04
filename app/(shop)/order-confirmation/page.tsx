import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

export default function OrderConfirmationPage() {
  return (
    <div className="container-page py-12 xl:py-24">
      <OrderConfirmation />
    </div>
  );
}
