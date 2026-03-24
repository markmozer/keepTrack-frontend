import { AuthPageLayout } from "../components/AuthPageLayout";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

export function ForgotPasswordPage() {
  return (
    <AuthPageLayout
      title="Wachtwoord vergeten"
      subtitle="Vul je e-mailadres in. Als het bekend is, ontvang je een reset-link."
    >
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}