// src/features/users/pages/UserDetailPage.jsx

import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { PageHeader } from "../../../app/components/PageHeader";
import { PageCard } from "../../../shared/components/PageCard";
import { Button } from "../../../shared/components/Button";
import { StatusBadge } from "../../../shared/components/StatusBadge";
import { FormError } from "../../../shared/components/FormError";
import { getUserById, inviteUser } from "../api/users.api";
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

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function getActionTooltip(actionDecision, fallbackText) {
  if (actionDecision?.allowed) {
    return undefined;
  }

  return actionDecision?.reason || fallbackText;
}

function Field({ label, value }) {
  return (
    <div className="field">
      <div className="label">{label}</div>
      <div className="value">{value ?? "-"}</div>
    </div>
  );
}

function UserRolesTable({ userRoles }) {
  if (!userRoles || userRoles.length === 0) {
    return <p>Er zijn geen roltoewijzingen gevonden.</p>;
  }

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Rol</th>
            <th>Valid from</th>
            <th>Valid to</th>
          </tr>
        </thead>
        <tbody>
          {userRoles.map((userRole) => (
            <tr key={userRole.id}>
              <td>{userRole.roleName ?? "-"}</td>
              <td>{formatDateTime(userRole.validFrom)}</td>
              <td>{formatDateTime(userRole.validTo)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UserDetailPage() {
  const location = useLocation();
  const { userId } = useParams();
  const tenantSlug = getTenantSlugFromPathname();
  const initialMessage = location.state?.message || "";

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    let isActive = true;

    async function loadUser() {
      try {
        setIsLoading(true);
        setError("");

        const result = await getUserById(userId);

        if (isActive) {
          setUser(result.payload);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || "Het ophalen van de gebruiker is mislukt.");
          setUser(null);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      isActive = false;
    };
  }, [userId]);

  if (isLoading) {
    return (
      <>
        <PageHeader title="Gebruiker" subtitle="Gegevens worden geladen." />
        <PageCard>
          <p>Gebruiker wordt geladen...</p>
        </PageCard>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader title="Gebruiker" subtitle="Er ging iets mis." />
        <PageCard>
          <p>{error}</p>
        </PageCard>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <PageHeader title="Gebruiker" subtitle="Niet gevonden." />
        <PageCard>
          <p>De gebruiker kon niet worden gevonden.</p>
        </PageCard>
      </>
    );
  }

  const canInviteUser = user.availableActions?.inviteUser?.allowed === true;
  const canCreateRoleAssignment =
    user.availableActions?.createRoleAssignment?.allowed === true;
  const inviteTooltip = getActionTooltip(
    user.availableActions?.inviteUser,
    "Deze gebruiker kan op dit moment niet worden uitgenodigd.",
  );
  const createRoleAssignmentTooltip = getActionTooltip(
    user.availableActions?.createRoleAssignment,
    "Je kunt op dit moment geen roltoewijzing toevoegen.",
  );
  const roleAssignmentsPath = `${buildTenantPath(
    tenantSlug,
    "app/admin/role-assignments",
  )}?userId=${encodeURIComponent(user.id)}`;

  async function handleInviteUser() {
    setActionError("");
    setMessage("");
    setIsInviting(true);

    try {
      const result = await inviteUser(user.id);
      const invitedUser = result?.payload;

      if (invitedUser) {
        setUser(invitedUser);
      }

      setMessage(`Uitnodiging verstuurd naar ${user.email}.`);
    } catch (err) {
      setActionError(err?.message || "Gebruiker uitnodigen is mislukt.");
    } finally {
      setIsInviting(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Gebruiker"
        subtitle={user.email}
      />

      {message ? (
        <section className="page-section">
          <PageCard>
            <p className="form-success">{message}</p>
          </PageCard>
        </section>
      ) : null}

      <section className="page-section">
        <PageCard>
          <h2>Account</h2>

          <div className="field-group">
            <Field label="Email" value={user.email} />
            <Field
              label="Status"
              value={
                <StatusBadge variant={getStatusVariant(user.status)}>
                  {user.status}
                </StatusBadge>
              }
            />
            <Field label="User ID" value={user.id} />
            <Field label="Tenant ID" value={user.tenantId} />
          </div>

          <div className="section-header">
            {canInviteUser ? (
              <Button onClick={handleInviteUser} disabled={isInviting}>
                {isInviting ? "Bezig..." : "Uitnodigen"}
              </Button>
            ) : (
              <Button
                disabled
                title={inviteTooltip}
              >
                Uitnodigen
              </Button>
            )}
          </div>

          <FormError message={actionError} />
        </PageCard>
      </section>

      <section className="page-section">
        <PageCard>
          <div className="section-header">
            <h2>Roltoewijzingen</h2>

            {canCreateRoleAssignment ? (
              <Button as={Link} to={roleAssignmentsPath}>
                Rol toevoegen
              </Button>
            ) : (
              <Button
                disabled
                title={createRoleAssignmentTooltip}
              >
                Rol toevoegen
              </Button>
            )}
          </div>

          <UserRolesTable userRoles={user.userRoles} />
        </PageCard>
      </section>

      <section className="page-section">
        <PageCard>
          <h2>Uitnodiging en reset</h2>

          <div className="field-group">
            <Field
              label="Invite token expires at"
              value={formatDateTime(user.inviteTokenExpiresAt)}
            />
            <Field
              label="Reset token expires at"
              value={formatDateTime(user.resetTokenExpiresAt)}
            />
          </div>
        </PageCard>
      </section>

      <section className="page-section">
        <PageCard>
          <h2>Metadata</h2>

          <div className="field-group">
            <Field label="Created at" value={formatDateTime(user.createdAt)} />
            <Field label="Updated at" value={formatDateTime(user.updatedAt)} />
          </div>
        </PageCard>
      </section>
    </>
  );
}
