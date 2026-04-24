// src/features/auth/pages/ResetPasswordPage.jsx

import { useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/auth.api.js";
import { AuthPageLayout } from "../components/AuthPageLayout.jsx";
import { ResetPasswordForm } from "../components/ResetPasswordForm.jsx";
import { getApiErrorMessage } from "../../../shared/utils/apiError.js";
import {
  buildTenantPath,
  getTenantSlugFromPathname,
} from "../../../shared/lib/tenantPaths.js";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const tenantSlug = getTenantSlugFromPathname(location.pathname);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  async function handleSubmit(values) {
    try {
      setSubmitError("");
      setIsSubmitting(true);

      const response = await resetPassword({
        token,
        password: values.password,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          getApiErrorMessage(result, "Password resetten is mislukt."),
        );
      }

      navigate(buildTenantPath(tenantSlug, "login"), {
        replace: true,
        state: {
          message:
            "Je password is gereset. Log nu in met je nieuwe wachtwoord.",
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
      title="Wachtwoord resetten"
      subtitle="Kies een nieuw wachtwoord voor je account."
    >
      {!token ? (
        <p className="form-error">Ongeldige resetlink: token ontbreekt.</p>
      ) : (
        <ResetPasswordForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}
    </AuthPageLayout>
  );
}
