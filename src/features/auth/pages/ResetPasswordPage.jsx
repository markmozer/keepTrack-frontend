import { AuthPageLayout } from "../components/AuthPageLayout";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

export function ResetPasswordPage() {
  return (
    <AuthPageLayout
      title="Wachtwoord resetten"
      subtitle="Kies een nieuw wachtwoord voor je account."
    >
      <ResetPasswordForm />
    </AuthPageLayout>
  );
}