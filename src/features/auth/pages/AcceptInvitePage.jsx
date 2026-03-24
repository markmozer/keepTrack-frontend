import { AuthPageLayout } from "../components/AuthPageLayout";
import { AcceptInviteForm } from "../components/AcceptInviteForm";

export function AcceptInvitePage() {
  return (
    <AuthPageLayout
      title="Account activeren"
      subtitle="Kies een wachtwoord om je account te activeren."
    >
      <AcceptInviteForm />
    </AuthPageLayout>
  );
}