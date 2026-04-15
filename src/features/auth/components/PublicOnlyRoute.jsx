// src/features/auth/components/PublicOnlyRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: "24px" }}>Bezig met laden...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return children;
}