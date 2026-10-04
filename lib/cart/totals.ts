import { getProductById } from "@/data/products";
import type { CartLine, Product, ProductVariant } from "@/types";

export type ResolvedLine = CartLine & {
  product: Product;
  variant: ProductVariant;
  unitPrice: number;
  unitListPrice: number;
  lineTotal: number;
};

export const FREE_SHIPPING_FROM = 50;
export const SHIPPING_FEE = 4.99;

export const deliveryOptions = [
  {
    id: "standard",
    label: "Standard delivery",
    eta: "3–5 business days",
    fee: SHIPPING_FEE,
    freeFrom: FREE_SHIPPING_FROM,
  },
  {
    id: "express",
    label: "Express delivery",
    eta: "1–2 business days",
    fee: 9.99,
    freeFrom: undefined,
  },
] as const;

export type DeliveryId = (typeof deliveryOptions)[number]["id"];

const round = (n: number) => Math.round(n * 100) / 100;

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines.flatMap((line) => {
    const product = getProductById(line.productId);
    const variant = product?.variants.find((v) => v.id === line.variantId);
    if (!product || !variant) return [];
    const unitListPrice = round(product.price + variant.priceDelta);
    const unitPrice = round((product.salePrice ?? product.price) + variant.priceDelta);
    return [
      {
        ...line,
        product,
        variant,
        unitPrice,
        unitListPrice,
        lineTotal: round(unitPrice * line.quantity),
      },
    ];
  });
}

export function deliveryFee(subtotal: number, delivery: DeliveryId = "standard") {
  const option = deliveryOptions.find((o) => o.id === delivery)!;
  if (subtotal === 0) return 0;
  return option.freeFrom !== undefined && subtotal >= option.freeFrom ? 0 : option.fee;
}

export function cartTotals(lines: ResolvedLine[], delivery: DeliveryId = "standard") {
  const listSubtotal = round(lines.reduce((s, l) => s + l.unitListPrice * l.quantity, 0));
  const subtotal = round(lines.reduce((s, l) => s + l.lineTotal, 0));
  const discount = round(listSubtotal - subtotal);
  const shipping = deliveryFee(subtotal, delivery);
  return { listSubtotal, subtotal, discount, shipping, total: round(subtotal + shipping) };
}
