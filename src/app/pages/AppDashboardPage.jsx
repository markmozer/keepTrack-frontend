// src/app/pages/appDashboardPage.jsx

import { PageHeader } from "../components/PageHeader";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Field } from "../../shared/components/Field";

export function AppDashboardPage() {
  const { principal, user, tenant } = useAuth();

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Welkom in keepTrack." />

      <section className="page-section">
        <div className="page-card">
          <h2>Ingelogde gebruiker</h2>
          <div className="field-group">
            <Field label="naam" value={user?.displayName ?? "-"} />
            <Field label="email" value={user?.email ?? "-"} />
            <Field label="user status" value={user?.status ?? "-"} />
            <Field label="user id" value={user?.id ?? "-"} />
            <Field
              label="user rollen"
              value={principal?.roleNames?.join(", ") ?? "-"}
            />

            <Field label="tenant naam" value={tenant?.name ?? "-"} />
            <Field label="tenant type" value={tenant?.type ?? "-"} />
          </div>
        </div>
      </section>
    </>
  );
}
