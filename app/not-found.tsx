import { ButtonLink } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center"
      >
        <p className="font-heading text-display font-bold text-primary-light">404</p>
        <h1 className="font-heading text-h4 font-semibold text-text">Page not found</h1>
        <p className="max-w-121 text-body-lg text-text-muted">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <ButtonLink href="/shop" size="lg">
          Continue shopping
        </ButtonLink>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
