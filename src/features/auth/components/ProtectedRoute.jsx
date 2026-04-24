// src/features/auth/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  buildTenantPath,
  getTenantSlugFromPathname,
} from "../../../shared/lib/tenantPaths";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const tenantSlug = getTenantSlugFromPathname();

  if (isLoading) {
    return <div style={{ padding: "24px" }}>Bezig met laden...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={buildTenantPath(tenantSlug, "login")} replace />;
  }

  return children;
}
