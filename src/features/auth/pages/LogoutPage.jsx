import { useEffect } from "react";
import { Navigate } from "react-router";
import { logout } from "../api/auth.api";
import { AuthPageLayout } from "../components/AuthPageLayout";
import { useAuth } from "../hooks/useAuth";

export function LogoutPage() {
  const { clearAuth, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    let isActive = true;

    async function runLogout() {
      try {
        await logout();
      } catch {
        // Ook als de backend-call faalt, willen we lokaal uitloggen.
      } finally {
        if (isActive) {
          clearAuth();
        }
      }
    }

    runLogout();

    return () => {
      isActive = false;
    };
  }, [clearAuth]);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthPageLayout title="Uitloggen" subtitle="Je wordt uitgelogd...">
      <p>Een ogenblik geduld.</p>
    </AuthPageLayout>
  );
}