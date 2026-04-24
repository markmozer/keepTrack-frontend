import { Outlet, useLocation } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { TopNav } from "../components/TopNav";
import { SideNav } from "../components/SideNav";
import { UserMenu } from "../components/UserMenu";
import { navigation } from "../config/navigation";
import { hasAnyRole } from "../../shared/lib/permissions";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { buildTenantPath } from "../../shared/lib/tenantPaths";

function getVisibleNavigationItems(user) {
  return navigation.filter((item) => {
    if (!item.roles || item.roles.length === 0) return true;
    return hasAnyRole(user, item.roles);
  });
}

function resolveNavigationItems(items, tenantSlug) {
  return items.map((item) => ({
    ...item,
    to: buildTenantPath(tenantSlug, item.to),
    children: item.children
      ? item.children.map((child) => ({
          ...child,
          to: buildTenantPath(tenantSlug, child.to),
        }))
      : [],
  }));
}

function getActiveTopModule(items, pathname) {
  const sorted = [...items].sort((a, b) => b.to.length - a.to.length);
  return (
    sorted.find((item) => {
      if (item.to.endsWith("/app")) return pathname === item.to;
      return pathname.startsWith(item.to);
    }) ?? sorted[0]
  );
}

export function AppLayout() {
  const location = useLocation();
  const { principal, user, tenant } = useAuth();

  const visibleNavigationItems = resolveNavigationItems(
    getVisibleNavigationItems(principal),
    tenant?.slug,
  );
  const activeModule = getActiveTopModule(
    visibleNavigationItems,
    location.pathname
  );

  const topNav = (
    <div className="app-layout__topbar">
      <TopNav items={visibleNavigationItems} />
      <UserMenu user={user} tenant={tenant}/>
    </div>
  );

  const sideNav = (
    <SideNav
      title={activeModule?.label ?? "Navigatie"}
      items={activeModule?.children ?? []}
    />
  );

  return (
    <AppShell topNav={topNav} sideNav={sideNav}>
      <Outlet />
    </AppShell>
  );
}
