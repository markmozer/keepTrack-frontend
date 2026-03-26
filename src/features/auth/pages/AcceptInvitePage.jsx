// src/features/auth/pages/AcceptInvitePage.jsx

import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { acceptInvite } from "../api/auth.api.js";
import { AuthPageLayout } from "../components/AuthPageLayout.jsx";
import { AcceptInviteForm } from "../components/AcceptInviteForm.jsx";

export function AcceptInvitePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  async function handleSubmit(values) {
    try {
      setSubmitError("");
      setIsSubmitting(true);

      const response = await acceptInvite({
        token,
        password: values.password,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result?.error?.message || "Account activeren is mislukt.");
      }

      navigate("/login", {
        replace: true,
        state: {
          message: "Je account is geactiveerd. Log nu in met je nieuwe wachtwoord.",
        },
      });
    } catch (error) {
      setSubmitError(error?.message || "Er ging iets mis.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageLayout
      title="Account activeren"
      subtitle="Kies een wachtwoord om je account te activeren."
    >
      {!token ? (
        <p className="form-error">Ongeldige activatielink: token ontbreekt.</p>
      ) : (
        <AcceptInviteForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}
    </AuthPageLayout>
  );
}