import { Link } from "react-router-dom";
import {
  buildTenantPath,
  getTenantSlugFromPathname,
} from "../../shared/lib/tenantPaths";

export function NotFoundPage() {
  const tenantSlug = getTenantSlugFromPathname();

  return (
    <div className="status-page">
      <h1>404</h1>
      <p>Deze pagina bestaat niet.</p>
      <Link to={buildTenantPath(tenantSlug, "app")}>Terug naar dashboard</Link>
    </div>
  );
}
