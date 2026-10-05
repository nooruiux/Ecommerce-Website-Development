import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { Tabs } from "@/components/product/ProductTabs";
import { ProductSection } from "@/components/sections/ProductSection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Rating";
import { categories } from "@/data/catalog";
import { getProduct, products } from "@/data/products";
import { reviewsFor } from "@/data/reviews";
import { FREE_SHIPPING_FROM } from "@/lib/cart/totals";
import { formatPrice } from "@/lib/format";
import { JsonLd, breadcrumbLd, ogBase, productLd } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const url = `/product/${product.slug}`;
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      ...ogBase,
      title: product.name,
      description: product.description,
      url,
      images: [product.images[0]],
    },
  };
}

const trust = [
  {
    icon: "cart",
    title: "Free delivery",
    text: `On orders over ${formatPrice(FREE_SHIPPING_FROM)}`,
  },
  { icon: "compare", title: "Easy returns", text: "30-day return policy" },
  { icon: "check", title: "Secure payment", text: "Encrypted checkout" },
] as const;

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = categories.find((c) => c.slug === product.category)!;
  const url = `/product/${product.slug}`;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: category.name, href: `/category/${category.slug}` },
    { label: product.name, href: url },
  ];
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);
  const reviews = reviewsFor(product);

  return (
    <div className="pb-24 md:pb-0">
      <JsonLd data={productLd(product, url)} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <div className="container-page flex flex-col gap-8 py-8 xl:py-12">
        <Breadcrumb items={crumbs} />
        <div className="grid gap-8 lg:grid-cols-2 xl:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="font-heading text-h4 font-semibold text-text xl:text-h3">
                {product.name}
              </h1>
              <p className="text-body-xl text-text-muted">{product.description}</p>
              <Rating value={product.rating} count={product.reviewCount} className="mt-3" />
            </div>
            <ProductPurchase product={product} />
            <ul className="grid gap-4 border-t border-line pt-6 md:grid-cols-3">
              {trust.map((t) => (
                <li key={t.title} className="flex items-start gap-3">
                  <Icon name={t.icon} size={24} />
                  <span className="flex flex-col">
                    <span className="text-body-md font-semibold text-text">{t.title}</span>
                    <span className="text-body-sm text-text-muted">{t.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section aria-labelledby="product-details" className="py-8">
          <h2 id="product-details" className="sr-only">
            Product details
          </h2>
          <Tabs
            tabs={[
              {
                id: "description",
                label: "Description",
                content: (
                  <div className="flex max-w-180 flex-col gap-4 text-body-lg text-text-muted">
                    <p>{product.details}</p>
                    <h3 className="font-heading text-h6 font-semibold text-text">Ingredients</h3>
                    <p>{product.ingredients}</p>
                  </div>
                ),
              },
              {
                id: "reviews",
                label: `Reviews (${product.reviewCount})`,
                content: (
                  <ul className="flex max-w-180 flex-col divide-y divide-line">
                    {reviews.map((r) => (
                      <li key={r.id} className="flex flex-col gap-2 py-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-semibold text-text">{r.author}</span>
                          <Rating value={r.rating} />
                          <time dateTime={r.date} className="text-body-sm text-text-muted">
                            {new Date(r.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              timeZone: "UTC",
                            })}
                          </time>
                        </div>
                        <p className="font-semibold text-text">{r.title}</p>
                        <p className="text-body-lg text-text-muted">{r.body}</p>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                id: "shipping",
                label: "Shipping",
                content: (
                  <div className="flex max-w-180 flex-col gap-3 text-body-lg text-text-muted">
                    <p>
                      Orders ship within 1–2 business days. Standard delivery takes 3–5 business
                      days.
                    </p>
                    <p>
                      Free standard delivery on orders over {formatPrice(FREE_SHIPPING_FROM)};
                      otherwise a flat fee applies at checkout.
                    </p>
                    <p>Unopened items can be returned within 30 days for a full refund.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>
      </div>
      {related.length > 0 && (
        <div className="pb-16 xl:pb-24">
          <ProductSection
            id="related-products"
            title="Related Products"
            href={`/category/${category.slug}`}
            products={related}
          />
        </div>
      )}
    </div>
  );
}
