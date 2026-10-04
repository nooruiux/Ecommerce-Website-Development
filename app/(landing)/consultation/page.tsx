import type { Metadata } from "next";
import {
  ConsultantsSection,
  ConsultationsSection,
  HowItWorksSection,
  LandingHero,
  PrivacySection,
  StorySection,
  WhySection,
} from "@/components/landing/LandingSections";
import { Testimonials } from "@/components/landing/Testimonials";

export const metadata: Metadata = {
  title: "Skincare consultation",
  description: "Book a skin, hair or feeding consultation with our cosmetologists.",
  alternates: { canonical: "/consultation" },
  openGraph: { title: "Skincare consultation", url: "/consultation" },
};

// Figma Landing 143:64. Section rhythm at 1440: 120 after hero, 112 between sections, 96 / 64 at the end.
export default function ConsultationPage() {
  return (
    <>
      <div className="pt-0 xl:pt-18">
        <LandingHero />
      </div>
      <div className="flex flex-col gap-20 py-16 xl:gap-28 xl:pt-30 xl:pb-0">
        <WhySection />
        <ConsultationsSection />
        <HowItWorksSection />
        <StorySection />
        <PrivacySection />
        <div className="xl:-mt-14">
          <ConsultantsSection />
        </div>
      </div>
      <div className="xl:pt-24">
        <Testimonials />
      </div>
      <div className="h-0 xl:h-16" aria-hidden="true" />
    </>
  );
}
