import { Outlet, useLocation } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { TopNav } from "../components/TopNav";
import { SideNav } from "../components/SideNav";
import { UserMenu } from "../components/UserMenu";
import { navigation } from "../config/navigation";
import { hasAnyRole } from "../../shared/lib/permissions";
import { useAuth } from "../../features/auth/hooks/useAuth";

function getVisibleNavigationItems(user) {
  return navigation.filter((item) => {
    if (!item.roles || item.roles.length === 0) return true;
    return hasAnyRole(user, item.roles);
  });
}

function getActiveTopModule(items, pathname) {
  const sorted = [...items].sort((a, b) => b.to.length - a.to.length);
  return (
    sorted.find((item) => {
      if (item.to === "/app") return pathname === "/app";
      return pathname.startsWith(item.to);
    }) ?? sorted[0]
  );
}

export function AppLayout() {
  const location = useLocation();
  const { principal, user, tenant } = useAuth();

  const visibleNavigationItems = getVisibleNavigationItems(principal);
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