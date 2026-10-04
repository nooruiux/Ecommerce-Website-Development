import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/AuthForms";
import { FormCard } from "@/components/ui/FormCard";

export const metadata: Metadata = { title: "Create account", robots: { index: false } };

export default function Page() {
  return (
    <div className="container-page py-12 xl:py-20">
      <FormCard title="Create Your Account">
        <RegisterForm />
      </FormCard>
    </div>
  );
}
