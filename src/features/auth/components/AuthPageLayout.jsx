import { PageCard } from "../../../shared/components/PageCard";

export function AuthPageLayout({ title, subtitle, children }) {
  return (
    <main className="auth-page">
      <PageCard>
        <h1>{title}</h1>
        {subtitle ? <p className="auth-page__subtitle">{subtitle}</p> : null}
        {children}
      </PageCard>
    </main>
  );
}