import { Link } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { buildTenantPath } from "../shared/lib/tenantPaths";

export function AppHomePage() {
  const { session, tenant } = useAuth();

  return (
    <main className="app-page">
      <div className="page-card">
        <h1>keepTrack</h1>
        <p>Je bent ingelogd.</p>

        {session ? (
          <>
            <p><strong>User ID:</strong> {session.principal.userId}</p>
            <p><strong>Tenant ID:</strong> {session.principal.tenantId}</p>
            <p><strong>Rollen:</strong> {session.principal.roleNames.join(", ")}</p>
          </>
        ) : null}

        <p>
          <Link to={buildTenantPath(tenant?.slug, "logout")}>Uitloggen</Link>
        </p>
      </div>
    </main>
  );
}
