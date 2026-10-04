import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Figma "Ask Us A Question" card (172:4145): white, radius 24, modal shadow, 40px padding, 472px content, gap 40.
export function FormCard({
  title,
  children,
  className,
  titleAs: Title = "h1",
  titleId,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  titleAs?: "h1" | "h2";
  titleId?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-138 flex-col items-center gap-10 rounded-2xl bg-surface px-5 py-8 shadow-modal md:p-10",
        className,
      )}
    >
      <Title
        id={titleId}
        className="text-center font-heading text-h5 font-semibold text-text md:text-h4"
      >
        {title}
      </Title>
      {children}
    </div>
  );
}
