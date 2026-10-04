"use client";

import { useState, type ComponentProps } from "react";
import { Input } from "@/components/ui/Field";

type Props = Omit<ComponentProps<typeof Input>, "type" | "endAdornment">;

export function PasswordInput(props: Props) {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      autoCapitalize="none"
      spellCheck={false}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-label={visible ? "Hide password" : "Show password"}
          className="inline-flex min-h-touch items-center rounded-xs px-3 font-label text-label-sm font-semibold text-text-muted focus-ring hover:text-primary-hover-strong"
        >
          {visible ? "Hide" : "Show"}
        </button>
      }
    />
  );
}
