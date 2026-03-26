import { Navigate } from "react-router";
import { AuthPageLayout } from "../components/AuthPageLayout";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const successMessage = location.state?.message || "";

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/app" replace />;
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
