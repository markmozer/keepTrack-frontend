// src/app/components/UserMenu.jsx

import { Link } from "react-router-dom";
import { buildTenantPath } from "../../shared/lib/tenantPaths";

export function UserMenu({ user, tenant }) {
  const displayName = user?.displayName ?? "Onbekende gebruiker";
  const email = user?.email ?? "Onbekend email adres"
  const tenantLabel = tenant?.name ?? "";
  

  return (
    <div className="user-menu">
      <div className="user-menu__meta">
        <div className="user-menu__name">{displayName}</div>
        <div className="user-menu__email">{email}</div>
        <div className="user-menu__tenant">{tenantLabel}</div>
      </div>

      <Link to={buildTenantPath(tenant?.slug, "logout")} className="user-menu__logout">
        Logout
      </Link>
    </div>
  );
}
