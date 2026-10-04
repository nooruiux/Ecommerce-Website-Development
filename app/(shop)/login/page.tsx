import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/AuthForms";
import { FormCard } from "@/components/ui/FormCard";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Nattoral account.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <div className="container-page py-12 xl:py-20">
      <FormCard title="Welcome Back">
        <LoginForm />
      </FormCard>
    </div>
  );
}
