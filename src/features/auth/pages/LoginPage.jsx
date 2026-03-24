import { Navigate } from "react-router";
import { AuthPageLayout } from "../components/AuthPageLayout";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return (
    <AuthPageLayout
      title="Login"
      subtitle="Log in met je e-mailadres en wachtwoord."
    >
      <LoginForm />
    </AuthPageLayout>
  );
}