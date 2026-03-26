import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { AcceptInvitePage } from "../../features/auth/pages/AcceptInvitePage";
import { ForgotPasswordPage } from "../../features/auth/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "../../features/auth/pages/ResetPasswordPage";
import { LogoutPage } from "../../features/auth/pages/LogoutPage";
import { ProtectedRoute } from "../../features/auth/components/ProtectedRoute";
import { AppHomePage } from "../AppHomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/accept-invite",
    element: <AcceptInvitePage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppHomePage />
      </ProtectedRoute>
    ),
  },
]);