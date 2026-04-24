// src/features/users/components/UsersTable.jsx

import { Link } from "react-router-dom";
import { DataTable } from "../../../shared/components/DataTable";
import { StatusBadge } from "../../../shared/components/StatusBadge";
import {
  buildTenantPath,
  getTenantSlugFromPathname,
} from "../../../shared/lib/tenantPaths";

function getStatusVariant(status) {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "INVITED":
      return "warning";
    case "INACTIVE":
      return "danger";
    default:
      return "neutral";
  }
}

export function UsersTable({ users }) {
  const tenantSlug = getTenantSlugFromPathname();
  const columns = [
    {
      key: "email",
      header: "Email",
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <StatusBadge variant={getStatusVariant(user.status)}>
          {user.status}
        </StatusBadge>
      ),
    },
    {
      key: "roleNames",
      header: "Rollen",
      render: (user) => (user.roleNames?.length ? user.roleNames.join(", ") : "-"),
    },
    {
      key: "actions",
      header: "",
      render: (user) => (
        <Link to={buildTenantPath(tenantSlug, `app/admin/users/${user.id}`)} className="table-link">
          Bekijken
        </Link>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={users}
      keyField="id"
      emptyMessage="Er zijn nog geen gebruikers."
    />
  );
}
