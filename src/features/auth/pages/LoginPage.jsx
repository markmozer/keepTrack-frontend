// src/features/auth/pages/LoginPage.jsx

import { Navigate, useLocation } from "react-router-dom";
import { AuthPageLayout } from "../components/AuthPageLayout";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import {
  buildTenantPath,
  getTenantSlugFromPathname,
} from "../../../shared/lib/tenantPaths";

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const successMessage = location.state?.message || "";
  const tenantSlug = getTenantSlugFromPathname(location.pathname);

  if (!isLoading && isAuthenticated) {
    return <Navigate to={buildTenantPath(tenantSlug, "app")} replace />;
  }

  return (
    <AuthPageLayout
      title="Login"
      subtitle="Log in met je e-mailadres en wachtwoord."
    >
      {successMessage ? <p className="form-success">{successMessage}</p> : null}
      <LoginForm />
    </AuthPageLayout>
  );
}
