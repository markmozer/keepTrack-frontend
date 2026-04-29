import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../app/components/PageHeader";
import { PageCard } from "../../../shared/components/PageCard";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { FormError } from "../../../shared/components/FormError";
import { useAuth } from "../../auth/hooks/useAuth";
import { createUser } from "../api/users.api";
import { can } from "../../../shared/lib/abilities";
import {
  buildTenantPath,
  getTenantSlugFromPathname,
} from "../../../shared/lib/tenantPaths";

export function CreateUserPage() {
  const navigate = useNavigate();
  const { abilities } = useAuth();
  const tenantSlug = getTenantSlugFromPathname();
  const canCreateUser = can(abilities, "user:create");

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!canCreateUser) {
    return <Navigate to={buildTenantPath(tenantSlug, "403")} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await createUser({
        email,
      });

      navigate(buildTenantPath(tenantSlug, "app/admin/users"), {
        replace: true,
        state: {
          message: `Gebruiker ${email} is aangemaakt.`,
        },
      });
    } catch (err) {
      setError(err?.message || "Gebruiker aanmaken is mislukt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Nieuwe gebruiker"
        subtitle="Voer het e-mailadres van de nieuwe gebruiker in."
      />

      <PageCard>
        <form className="user-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>E-mail</span>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <FormError message={error} />

          <div className="form-actions">
            <Button type="submit" disabled={isSubmitting || !email.trim()}>
              {isSubmitting ? "Bezig..." : "Opslaan"}
            </Button>
            <Button
              as={Link}
              to={buildTenantPath(tenantSlug, "app/admin/users")}
            >
              Annuleren
            </Button>
          </div>
        </form>
      </PageCard>
    </>
  );
}
