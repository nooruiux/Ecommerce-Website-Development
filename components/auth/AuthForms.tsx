"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Choice";
import { Input } from "@/components/ui/Field";
import { useForm } from "@/lib/forms/useForm";
import { email, minLength, required, type Rule } from "@/lib/forms/validate";
import { PasswordInput } from "./PasswordInput";

// UI only: no account backend yet. Submitting a valid form shows a confirmation message.
function Done({ text }: { text: string }) {
  return (
    <p
      role="status"
      className="w-full rounded-sm bg-success-tint px-4 py-3 text-body-md text-success-strong"
    >
      {text}
    </p>
  );
}

const loginSchema = { email: [required("Email"), email], password: [required("Password")] };

export function LoginForm() {
  const form = useForm({ email: "", password: "" }, loginSchema);
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={form.handleSubmit(() => setDone(true))}
      noValidate
      className="flex w-full flex-col gap-10"
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="username"
          required
          {...form.field("email")}
        />
        <PasswordInput
          label="Password"
          autoComplete="current-password"
          required
          {...form.field("password")}
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Checkbox label="Remember me" name="remember" />
          <Link
            href="/contact"
            className="rounded-xs text-body-md text-text underline focus-ring hover:text-primary-hover"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {done && <Done text="Signed in (demo). Account features are coming soon." />}
        <Button type="submit" className="self-start">
          Log in
        </Button>
        <p className="text-body-md text-text-muted">
          New to the store?{" "}
          <Link
            href="/register"
            className="rounded-xs text-text underline focus-ring hover:text-primary-hover"
          >
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}

const matches: Rule = (v, all) => (v === all.password ? undefined : "Passwords don’t match.");
const registerSchema = {
  name: [required("Name")],
  email: [required("Email"), email],
  password: [required("Password"), minLength(8, "Password")],
  confirm: [required("Password confirmation"), matches],
  terms: [(v: string) => (v === "yes" ? undefined : "Please accept the terms to continue.")],
};

export function RegisterForm() {
  const form = useForm(
    { name: "", email: "", password: "", confirm: "", terms: "" },
    registerSchema,
  );
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={form.handleSubmit(() => setDone(true))}
      noValidate
      className="flex w-full flex-col gap-10"
    >
      <div className="flex flex-col gap-4">
        <Input label="Name" autoComplete="name" required {...form.field("name")} />
        <Input
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          {...form.field("email")}
        />
        <PasswordInput
          label="Password"
          autoComplete="new-password"
          hint="At least 8 characters."
          required
          {...form.field("password")}
        />
        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          required
          {...form.field("confirm")}
        />
        <div className="flex flex-col gap-1">
          <Checkbox
            name="terms"
            label={
              <>
                I agree to the{" "}
                <Link
                  href="/about#terms"
                  className="rounded-xs underline focus-ring hover:text-primary-hover"
                >
                  Terms and Conditions
                </Link>
              </>
            }
            checked={form.values.terms === "yes"}
            aria-invalid={form.errors.terms ? true : undefined}
            aria-describedby={form.errors.terms ? "terms-error" : undefined}
            onChange={(e) =>
              form.setValues({ ...form.values, terms: e.target.checked ? "yes" : "" })
            }
          />
          {form.errors.terms && (
            <p id="terms-error" role="alert" className="text-body-sm text-error-strong">
              {form.errors.terms}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {done && <Done text="Account created (demo). Account features are coming soon." />}
        <Button type="submit" className="self-start">
          Create account
        </Button>
        <p className="text-body-md text-text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="rounded-xs text-text underline focus-ring hover:text-primary-hover"
          >
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}
