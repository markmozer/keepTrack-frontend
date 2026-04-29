import { useEffect, useMemo, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { PageHeader } from "../../../app/components/PageHeader";
import { PageCard } from "../../../shared/components/PageCard";
import { Button } from "../../../shared/components/Button";
import { FormError } from "../../../shared/components/FormError";
import { useAuth } from "../../auth/hooks/useAuth";
import { getUserById } from "../../users/api/users.api";
import {
  createRoleAssignment,
  getRoles,
} from "../api/roleAssignments.api";
import { can } from "../../../shared/lib/abilities";
import {
  buildTenantPath,
  getTenantSlugFromPathname,
} from "../../../shared/lib/tenantPaths";

function getBackToUserPath(tenantSlug, userId) {
  return buildTenantPath(tenantSlug, `app/admin/users/${userId}`);
}

export function CreateRoleAssignmentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { abilities } = useAuth();
  const [searchParams] = useSearchParams();
  const tenantSlug = getTenantSlugFromPathname(location.pathname);
  const canCreateRoleAssignment = can(abilities, "roleAssignment:create");
  const targetUserId = searchParams.get("userId") || "";

  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    roleId: "",
    validFrom: "",
    validTo: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!canCreateRoleAssignment || !targetUserId) {
      setIsLoading(false);
      return;
    }

    let isActive = true;

    async function loadData() {
      try {
        setIsLoading(true);
        setError("");

        const [userResult, rolesResult] = await Promise.all([
          getUserById(targetUserId),
          getRoles(),
        ]);

        if (!isActive) {
          return;
        }

        setUser(userResult.payload);
        setRoles(rolesResult.payload.items ?? []);
      } catch (err) {
        if (isActive) {
          setError(err?.message || "Gegevens ophalen is mislukt.");
          setUser(null);
          setRoles([]);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isActive = false;
    };
  }, [canCreateRoleAssignment, targetUserId]);

  if (!canCreateRoleAssignment) {
    return <Navigate to={buildTenantPath(tenantSlug, "403")} replace />;
  }

  if (!targetUserId) {
    return (
      <>
        <PageHeader
          title="Rol toevoegen"
          subtitle="Geen gebruiker geselecteerd."
        />
        <PageCard>
          <p>Open deze pagina vanuit een gebruiker om een rol toe te wijzen.</p>
        </PageCard>
      </>
    );
  }

  const assignedRoleIds = useMemo(() => {
    return new Set((user?.userRoles ?? []).map((userRole) => userRole.roleId));
  }, [user]);

  const availableRoles = useMemo(() => {
    return roles.filter((role) => !assignedRoleIds.has(role.id));
  }, [roles, assignedRoleIds]);

  const backToUserPath = getBackToUserPath(tenantSlug, targetUserId);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await createRoleAssignment({
        targetUserId,
        roleId: form.roleId,
        validFrom: form.validFrom || undefined,
        validTo: form.validTo || undefined,
      });

      const selectedRole = roles.find((role) => role.id === form.roleId);
      const roleLabel = selectedRole?.name || "De rol";

      navigate(backToUserPath, {
        replace: true,
        state: {
          message: `${roleLabel} is toegevoegd aan ${user?.email ?? "de gebruiker"}.`,
        },
      });
    } catch (err) {
      setError(err?.message || "Roltoewijzing opslaan is mislukt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="Rol toevoegen"
          subtitle="Gegevens worden geladen."
        />
        <PageCard>
          <p>Rollen en gebruiker worden geladen...</p>
        </PageCard>
      </>
    );
  }

  if (error && !user) {
    return (
      <>
        <PageHeader title="Rol toevoegen" subtitle="Er ging iets mis." />
        <PageCard>
          <p>{error}</p>
        </PageCard>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <PageHeader title="Rol toevoegen" subtitle="Gebruiker niet gevonden." />
        <PageCard>
          <p>De geselecteerde gebruiker kon niet worden gevonden.</p>
        </PageCard>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Rol toevoegen"
        subtitle={`Voeg een rol toe aan ${user.email}.`}
      />

      <PageCard>
        {availableRoles.length === 0 ? (
          <div className="empty-state">
            <p>Deze gebruiker heeft alle beschikbare rollen al.</p>
            <div className="form-actions">
              <Button as={Link} to={backToUserPath}>
                Terug naar gebruiker
              </Button>
            </div>
          </div>
        ) : (
          <form className="user-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Rol</span>
              <select
                className="form-select"
                name="roleId"
                value={form.roleId}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, roleId: event.target.value }))
                }
                required
              >
                <option value="">Kies een rol</option>
                {availableRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Geldig vanaf</span>
              <InputLikeDate
                name="validFrom"
                value={form.validFrom}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    validFrom: event.target.value,
                  }))
                }
              />
              <small className="form-help">Leeg laten betekent: geldig vanaf nu.</small>
            </label>

            <label className="form-field">
              <span>Geldig tot</span>
              <InputLikeDate
                name="validTo"
                value={form.validTo}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    validTo: event.target.value,
                  }))
                }
              />
              <small className="form-help">
                Leeg laten betekent: geldig zonder einddatum.
              </small>
            </label>

            <FormError message={error} />

            <div className="form-actions">
              <Button type="submit" disabled={isSubmitting || !form.roleId}>
                {isSubmitting ? "Bezig..." : "Opslaan"}
              </Button>
              <Button as={Link} to={backToUserPath}>
                Annuleren
              </Button>
            </div>
          </form>
        )}
      </PageCard>
    </>
  );
}

function InputLikeDate(props) {
  return <input className="input" type="date" {...props} />;
}
