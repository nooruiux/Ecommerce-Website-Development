import { ConsultationBanner } from "@/components/sections/ConsultationBanner";
import { Hero } from "@/components/sections/Hero";
import { Newsletter } from "@/components/sections/Newsletter";
import { PopularBrands } from "@/components/sections/PopularBrands";
import { ProductSection } from "@/components/sections/ProductSection";
import { PromoBanners } from "@/components/sections/PromoBanners";
import { TopCategories } from "@/components/sections/TopCategories";
import { byTag } from "@/data/products";

// Figma Home Page 317:338. Vertical rhythm: 96px between sections (64 before New Arrivals, 112 before newsletter).
export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-16 pt-16 xl:gap-0 xl:pt-24">
        <TopCategories />
        <div className="xl:pt-24">
          <ConsultationBanner />
        </div>
        <div className="xl:pt-24">
          <ProductSection
            id="featured-products"
            title="Featured Products"
            href="/shop?tag=featured"
            products={byTag("featured")}
          />
        </div>
        <div className="xl:pt-24">
          <PopularBrands />
        </div>
        <div className="xl:pt-28">
          <ProductSection
            id="new-arrivals"
            title="New Arrivals"
            href="/shop?sort=newest"
            products={byTag("new")}
          />
        </div>
        <div className="xl:pt-24">
          <PromoBanners />
        </div>
        <div className="xl:pt-24">
          <ProductSection
            id="best-selling"
            title="Best Selling"
            href="/shop?sort=rating"
            products={byTag("bestseller")}
          />
        </div>
      </div>
      <div className="pt-16 xl:pt-28">
        <Newsletter />
      </div>
      <div className="h-0 xl:h-20" aria-hidden="true" />
    </>
  );
}
