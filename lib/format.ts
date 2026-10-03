const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatPrice(value: number) {
  return currency.format(value);
}
