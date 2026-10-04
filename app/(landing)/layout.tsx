import { AskModalProvider } from "@/components/consultation/AskModal";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";

// Figma Landing frame 143:64 uses its own header (announcement bar) and footer.
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <AskModalProvider>
      <a
        href="#main"
        className="sr-only z-50 rounded-sm bg-accent px-4 py-2 text-on-accent focus-ring focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <LandingHeader />
      <main id="main">{children}</main>
      <LandingFooter />
    </AskModalProvider>
  );
}
