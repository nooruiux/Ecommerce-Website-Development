import type { Metadata } from "next";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SearchForm } from "@/components/layout/SearchForm";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center"
      >
        <p aria-hidden="true" className="font-heading text-display font-bold text-primary-strong">
          404
        </p>
        <h1 className="font-heading text-h4 font-semibold text-text">Page not found</h1>
        <p className="max-w-121 text-body-lg text-text-muted">
          The page you are looking for doesn’t exist or has been moved. Try searching for a product
          instead.
        </p>
        <SearchForm id="not-found-search" label="Search products" className="max-w-137" />
        <ButtonLink href="/shop" variant="outline" size="md">
          Browse all products
        </ButtonLink>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
