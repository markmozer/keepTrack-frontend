// src/features/users/pages/UsersPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../../../app/components/PageHeader";
import { PageCard } from "../../../shared/components/PageCard";
import { Button } from "../../../shared/components/Button";
import { DataTableToolbar } from "../../../shared/components/DataTableToolbar";
import { UsersFilters } from "../components/UsersFilters";
import { UsersTable } from "../components/UsersTable";
import { getUsers } from "../api/users.api";
import {
  buildTenantPath,
  getTenantSlugFromPathname,
} from "../../../shared/lib/tenantPaths";

export function UsersPage() {
  const tenantSlug = getTenantSlugFromPathname();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    email: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setIsLoading(true);
        setError("");

        const result = await getUsers({
          email: filters.email,
          status: filters.status,
        });

        setUsers(result.payload.items ?? []);
      } catch (err) {
        setError("Het ophalen van gebruikers is mislukt.");
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, [filters.email, filters.status]);

  return (
    <>
      <PageHeader
        title="Gebruikers"
        subtitle="Beheer gebruikers binnen deze tenant."
        actions={
          <Button as={Link} to={buildTenantPath(tenantSlug, "app/admin/users/new")}>
            Nieuwe gebruiker
          </Button>
        }
      />

      <PageCard>
        <DataTableToolbar
          filters={
            <UsersFilters
              email={filters.email}
              status={filters.status}
              onEmailChange={(value) =>
                setFilters((prev) => ({ ...prev, email: value }))
              }
              onStatusChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            />
          }
          actions={null}
        />

        {isLoading ? <p>Gebruikers worden geladen...</p> : null}
        {error ? <p>{error}</p> : null}
        {!isLoading && !error ? <UsersTable users={users} /> : null}
      </PageCard>
    </>
  );
}
