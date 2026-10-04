"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { FormCard } from "@/components/ui/FormCard";
import { useForm } from "@/lib/forms/useForm";
import { email, phone, required } from "@/lib/forms/validate";

const schema = {
  name: [required("Name")],
  email: [required("Email"), email],
  phone: [phone],
  message: [required("Message")],
};

/*
 * Figma "Ask Us A Question" (172:4145): H4, four fields (gap 16), Submit 48px.
 * UI only: submitting a valid form shows a confirmation; nothing is sent.
 */
export function AskForm({
  titleAs = "h1",
  titleId,
  defaultMessage = "",
}: {
  titleAs?: "h1" | "h2";
  titleId?: string;
  defaultMessage?: string;
}) {
  const form = useForm({ name: "", email: "", phone: "", message: defaultMessage }, schema);
  const [sent, setSent] = useState(false);
  return (
    <FormCard title="Ask Us A Question" titleAs={titleAs} titleId={titleId}>
      {sent ? (
        <p
          role="status"
          className="w-full rounded-sm bg-success-tint px-4 py-3 text-body-lg text-success"
        >
          Thanks! Our consultants will get back to you within one business day.
        </p>
      ) : (
        <form
          onSubmit={form.handleSubmit(() => setSent(true))}
          noValidate
          className="flex w-full flex-col gap-10"
        >
          <div className="flex flex-col gap-4">
            <Input
              label="Name"
              autoComplete="name"
              placeholder="Jams Keates"
              required
              {...form.field("name")}
            />
            <Input
              label="Email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Jams@gmail.com"
              required
              {...form.field("email")}
            />
            <Input
              label="Phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+982-2762 27266"
              {...form.field("phone")}
            />
            <Textarea
              label="Message"
              placeholder="I would like to talk you......"
              required
              {...form.field("message")}
            />
          </div>
          <Button type="submit" className="self-start">
            Submit
          </Button>
        </form>
      )}
    </FormCard>
  );
}
