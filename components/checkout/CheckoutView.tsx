"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { CartSummary } from "@/components/cart/CartSummary";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { Checkbox, Radio } from "@/components/ui/Choice";
import { Input, Select } from "@/components/ui/Field";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  cartTotals,
  deliveryFee,
  deliveryOptions,
  resolveLines,
  type DeliveryId,
} from "@/lib/cart/totals";
import { formatPrice } from "@/lib/format";
import { useForm } from "@/lib/forms/useForm";
import { digits, email, expiry, phone, required } from "@/lib/forms/validate";
import { useCart } from "@/store/cart";
import { useHydrated } from "@/store/useHydrated";

// Called from the submit handler only.
const newOrderNumber = () => `NT-${Date.now().toString().slice(-6)}`;

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Bangladesh",
  "Germany",
];

const initial = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "United States",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvc: "",
};

const schema = {
  email: [required("Email"), email],
  phone: [phone],
  firstName: [required("First name")],
  lastName: [required("Last name")],
  address1: [required("Address")],
  city: [required("City")],
  region: [required("State / region")],
  postalCode: [required("Postal code")],
  country: [required("Country")],
  cardNumber: [required("Card number"), digits(13, 19, "card number")],
  cardName: [required("Name on card")],
  cardExpiry: [required("Expiry date"), expiry],
  cardCvc: [required("Security code"), digits(3, 4, "security code")],
};

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section
      aria-labelledby={`step-${n}`}
      className="flex flex-col gap-5 border-b border-line pb-8"
    >
      <h2 id={`step-${n}`} className="flex items-center gap-3 font-heading text-h5 font-semibold">
        <span
          aria-hidden="true"
          className="inline-flex size-8 items-center justify-center rounded-full bg-primary-light text-body-md"
        >
          {n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function SummaryItems({ lines }: { lines: ReturnType<typeof resolveLines> }) {
  return (
    <ul className="flex flex-col gap-4">
      {lines.map((l) => (
        <li key={l.productId + l.variantId} className="flex items-center gap-3">
          <span className="relative size-16 shrink-0 overflow-hidden rounded-sm border border-border">
            <AssetImage
              src={l.product.images[0]}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
            <span className="absolute -top-1 -right-1 inline-flex size-5 items-center justify-center rounded-full bg-accent text-body-xs text-on-accent">
              {l.quantity}
            </span>
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-body-md font-semibold">{l.product.name}</span>
            <span className="text-body-sm text-text-muted">{l.variant.label}</span>
          </span>
          <span className="text-body-md font-semibold">{formatPrice(l.lineTotal)}</span>
        </li>
      ))}
    </ul>
  );
}

export function CheckoutView() {
  const hydrated = useHydrated();
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const [delivery, setDelivery] = useState<DeliveryId>("standard");
  const [placing, setPlacing] = useState(false);
  const form = useForm(initial, schema);
  const resolved = useMemo(() => (hydrated ? resolveLines(lines) : []), [hydrated, lines]);
  const totals = cartTotals(resolved, delivery);

  // The form is server-rendered; cart-dependent parts fill in after hydration (no skeleton swap, no shift).
  const empty = hydrated && resolved.length === 0 && !placing;

  const placeOrder = form.handleSubmit((values) => {
    if (empty) return;
    setPlacing(true);
    // Payment is UI only: card fields never leave the browser and are not stored.
    const order = {
      number: newOrderNumber(),
      email: values.email,
      name: `${values.firstName} ${values.lastName}`,
      items: resolved.reduce((s, l) => s + l.quantity, 0),
      total: totals.total,
      delivery: deliveryOptions.find((o) => o.id === delivery)!.label,
    };
    try {
      sessionStorage.setItem("nattoral-last-order", JSON.stringify(order));
    } catch {}
    clear();
    router.push("/order-confirmation");
  });

  const summary = hydrated ? (
    <div className="flex flex-col gap-6">
      <SummaryItems lines={resolved} />
      <CartSummary totals={totals} />
    </div>
  ) : (
    <Skeleton className="h-64 w-full" />
  );

  return (
    <form
      onSubmit={placeOrder}
      noValidate
      className="grid items-start gap-8 lg:grid-cols-[1fr_26rem] xl:gap-16"
    >
      {/* Mobile: collapsible summary */}
      <details className="group rounded-sm border border-border lg:hidden">
        <summary className="flex min-h-touch cursor-pointer list-none items-center justify-between px-4 py-3 text-body-lg font-semibold focus-ring [&::-webkit-details-marker]:hidden">
          <span>
            <span className="group-open:hidden">Show</span>
            <span className="hidden group-open:inline">Hide</span> order summary
          </span>
          <span>{hydrated ? formatPrice(totals.total) : "—"}</span>
        </summary>
        <div className="border-t border-line p-4">{summary}</div>
      </details>

      <div className="flex flex-col gap-8">
        {empty ? (
          <p role="status" className="text-body-md text-text">
            Your cart is empty.{" "}
            <Link
              href="/shop"
              className="rounded-xs underline focus-ring hover:text-primary-hover-strong"
            >
              Continue shopping
            </Link>
          </p>
        ) : (
          <p className="text-body-md text-text-muted">
            Checking out as a guest.{" "}
            <Link
              href="/login?next=/checkout"
              className="rounded-xs text-text underline focus-ring hover:text-primary-hover-strong"
            >
              Log in
            </Link>{" "}
            for faster checkout.
          </p>
        )}

        <Step n={1} title="Contact">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              {...form.field("email")}
            />
            <Input
              label="Phone (optional)"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              hint="For delivery updates only."
              {...form.field("phone")}
            />
          </div>
          <Checkbox label="Email me news and offers" name="newsletter" />
        </Step>

        <Step n={2} title="Shipping address">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="First name"
              autoComplete="shipping given-name"
              required
              {...form.field("firstName")}
            />
            <Input
              label="Last name"
              autoComplete="shipping family-name"
              required
              {...form.field("lastName")}
            />
            <Input
              label="Address"
              autoComplete="shipping address-line1"
              required
              wrapperClassName="md:col-span-2"
              {...form.field("address1")}
            />
            <Input
              label="Apartment, suite, etc. (optional)"
              autoComplete="shipping address-line2"
              wrapperClassName="md:col-span-2"
              {...form.field("address2")}
            />
            <Input
              label="City"
              autoComplete="shipping address-level2"
              required
              {...form.field("city")}
            />
            <Input
              label="State / region"
              autoComplete="shipping address-level1"
              required
              {...form.field("region")}
            />
            <Input
              label="Postal code"
              autoComplete="shipping postal-code"
              autoCapitalize="characters"
              required
              {...form.field("postalCode")}
            />
            <Select
              label="Country"
              autoComplete="shipping country-name"
              required
              {...form.field("country")}
            >
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </div>
        </Step>

        <Step n={3} title="Delivery">
          <div role="radiogroup" aria-labelledby="step-3" className="flex flex-col gap-2">
            {deliveryOptions.map((o) => {
              const fee = deliveryFee(totals.subtotal, o.id);
              return (
                <div
                  key={o.id}
                  className="rounded-sm border border-border px-4 has-checked:border-accent"
                >
                  <Radio
                    name="delivery"
                    value={o.id}
                    checked={delivery === o.id}
                    onChange={() => setDelivery(o.id)}
                    label={
                      <span className="flex w-full justify-between gap-4">
                        <span className="font-semibold">{o.label}</span>
                        <span>{fee === 0 ? "Free" : formatPrice(fee)}</span>
                      </span>
                    }
                    description={o.eta}
                    className="py-2 [&_label]:flex-1"
                  />
                </div>
              );
            })}
          </div>
        </Step>

        <Step n={4} title="Payment">
          <p className="rounded-sm bg-surface-subtle px-4 py-3 text-body-sm text-text-muted">
            Demo store: payment details are checked in your browser only and are never sent or
            saved.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Card number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              maxLength={23}
              required
              wrapperClassName="md:col-span-2"
              {...form.field("cardNumber")}
            />
            <Input
              label="Name on card"
              autoComplete="cc-name"
              required
              wrapperClassName="md:col-span-2"
              {...form.field("cardName")}
            />
            <Input
              label="Expiry (MM / YY)"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM / YY"
              maxLength={7}
              required
              {...form.field("cardExpiry")}
            />
            <Input
              label="Security code"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="CVC"
              maxLength={4}
              required
              {...form.field("cardCvc")}
            />
          </div>
        </Step>

        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={placing}
          disabled={empty}
          className="lg:hidden"
        >
          Place order{hydrated && !empty ? ` · ${formatPrice(totals.total)}` : ""}
        </Button>
      </div>

      {/* Desktop: sticky summary */}
      <aside
        aria-labelledby="checkout-summary"
        className="hidden flex-col gap-6 rounded-sm border border-border p-6 lg:sticky lg:top-6 lg:flex"
      >
        <h2 id="checkout-summary" className="font-heading text-h5 font-semibold">
          Order summary
        </h2>
        {summary}
        <Button type="submit" size="lg" fullWidth loading={placing} disabled={empty}>
          Place order
        </Button>
      </aside>
    </form>
  );
}
