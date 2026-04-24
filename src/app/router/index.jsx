import { createBrowserRouter, Outlet } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { AppDashboardPage } from "../pages/AppDashboardPage";
import { ForbiddenPage } from "../pages/ForbiddenPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AuthProvider } from "../providers/AuthProvider";

import { ProtectedRoute } from "../../features/auth/components/ProtectedRoute";
import { PublicOnlyRoute } from "../../features/auth/components/PublicOnlyRoute";

import { LoginPage } from "../../features/auth/pages/LoginPage";
import { LogoutPage } from "../../features/auth/pages/LogoutPage";
import { AcceptInvitePage } from "../../features/auth/pages/AcceptInvitePage";
import { ForgotPasswordPage } from "../../features/auth/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "../../features/auth/pages/ResetPasswordPage";
import { UsersPage } from "../../features/users/pages/UsersPage";
import { UserDetailPage } from "../../features/users/pages/UserDetailPage";

function PlaceholderPage({ title }) {
  return (
    <div className="page-card">
      <h1>{title}</h1>
      <p>Nog te bouwen.</p>
    </div>
  );
}

function RouterRoot() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterRoot />,
    children: [
      {
        path: "/t/:tenantSlug/login",
        element: (
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "/t/:tenantSlug/accept-invite",
        element: (
          <PublicOnlyRoute>
            <AcceptInvitePage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "/t/:tenantSlug/forgot-password",
        element: (
          <PublicOnlyRoute>
            <ForgotPasswordPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "/t/:tenantSlug/reset-password",
        element: (
          <PublicOnlyRoute>
            <ResetPasswordPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "/t/:tenantSlug/logout",
        element: (
          <ProtectedRoute>
            <LogoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/t/:tenantSlug/app",
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AppDashboardPage />,
          },
          {
            path: "contracts",
            element: <PlaceholderPage title="Contracten" />,
          },
          {
            path: "contracts/new",
            element: <PlaceholderPage title="Nieuw contract" />,
          },
          {
            path: "contracts/active",
            element: <PlaceholderPage title="Actieve contracten" />,
          },
          {
            path: "contracts/closed",
            element: <PlaceholderPage title="Afgesloten contracten" />,
          },
          {
            path: "time-entries",
            element: <PlaceholderPage title="Mijn uren" />,
          },
          {
            path: "time-entries/new",
            element: <PlaceholderPage title="Nieuwe urenboeking" />,
          },
          {
            path: "time-entries/approvals",
            element: <PlaceholderPage title="Uren goedkeuren" />,
          },
          {
            path: "invoices",
            element: <PlaceholderPage title="Facturen" />,
          },
          {
            path: "invoices/drafts",
            element: <PlaceholderPage title="Conceptfacturen" />,
          },
          {
            path: "invoices/sent",
            element: <PlaceholderPage title="Verzonden facturen" />,
          },
          {
            path: "invoices/paid",
            element: <PlaceholderPage title="Betaalde facturen" />,
          },
          {
            path: "admin/users",
            element: <UsersPage />,
          },
          {
            path: "admin/users/:userId",
            element: <UserDetailPage />,
          },
          {
            path: "admin/invitations",
            element: <PlaceholderPage title="Uitnodigingen" />,
          },
          {
            path: "admin/role-assignments",
            element: <PlaceholderPage title="Roltoewijzingen" />,
          },
          {
            path: "admin/account",
            element: <PlaceholderPage title="Mijn account" />,
          },
        ],
      },
      {
        path: "/t/:tenantSlug/403",
        element: <ForbiddenPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
