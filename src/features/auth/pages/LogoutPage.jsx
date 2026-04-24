import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../api/auth.api";
import { AuthPageLayout } from "../components/AuthPageLayout";
import { useAuth } from "../hooks/useAuth";
import {
  buildTenantPath,
  getTenantSlugFromPathname,
} from "../../../shared/lib/tenantPaths";

export function LogoutPage() {
  const { clearSession, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const tenantSlug = getTenantSlugFromPathname(location.pathname);

  useEffect(() => {
    let isActive = true;

    async function runLogout() {
      try {
        await logout();
      } catch {
        // Ook als de backend-call faalt, willen we lokaal uitloggen.
      } finally {
        if (isActive) {
          clearSession();
        }
      }
    }

    runLogout();

    return () => {
      isActive = false;
    };
  }, [clearSession]);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to={buildTenantPath(tenantSlug, "login")} replace />;
  }

  return (
    <AuthPageLayout title="Uitloggen" subtitle="Je wordt uitgelogd...">
      <p>Een ogenblik geduld.</p>
    </AuthPageLayout>
  );
}
