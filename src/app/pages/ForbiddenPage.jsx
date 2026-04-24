import { Link } from "react-router-dom";
import {
  buildTenantPath,
  getTenantSlugFromPathname,
} from "../../shared/lib/tenantPaths";

export function ForbiddenPage() {
  const tenantSlug = getTenantSlugFromPathname();

  return (
    <div className="status-page">
      <h1>403</h1>
      <p>Je hebt geen toegang tot deze pagina.</p>
      <Link to={buildTenantPath(tenantSlug, "app")}>Terug naar dashboard</Link>
    </div>
  );
}
