import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/AuthForms";
import { FormCard } from "@/components/ui/FormCard";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a Nattoral account to save your wishlist and check out faster.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <div className="container-page py-12 xl:py-20">
      <FormCard title="Create Your Account">
        <RegisterForm />
      </FormCard>
    </div>
  );
}
