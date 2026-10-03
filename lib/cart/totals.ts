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

export function cartTotals(lines: ResolvedLine[]) {
  const listSubtotal = round(lines.reduce((s, l) => s + l.unitListPrice * l.quantity, 0));
  const subtotal = round(lines.reduce((s, l) => s + l.lineTotal, 0));
  const discount = round(listSubtotal - subtotal);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
  return { listSubtotal, subtotal, discount, shipping, total: round(subtotal + shipping) };
}
