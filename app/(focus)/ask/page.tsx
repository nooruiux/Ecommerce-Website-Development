import type { Metadata } from "next";
import { AskForm } from "@/components/consultation/AskForm";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: "Ask us a question",
  description: "Send a question to our skincare consultants.",
  alternates: { canonical: "/ask" },
};

// Figma "Question" 172:4148 — logo 300x47 centred at y=58, card centred below; bottom divider.
export default function AskPage() {
  return (
    <div className="flex min-h-dvh flex-col border-b border-text-placeholder">
      <main id="main" className="flex flex-1 flex-col items-center gap-16 px-4 pt-14.5 pb-28">
        <Logo variant="landing" width={300} />
        <AskForm />
      </main>
    </div>
  );
}
