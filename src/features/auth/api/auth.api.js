/**
 * File: keeptrack-frontend/src/features/auth/api/auth.api.js
 */

import { apiFetch } from "../../../shared/api/client";
import {
  buildTenantApiPath,
  getTenantSlugFromPathname,
} from "../../../shared/lib/tenantPaths";

function getCurrentTenantSlug() {
  const tenantSlug = getTenantSlugFromPathname();

  if (!tenantSlug) {
    throw new Error("Geen tenant gevonden in de URL.");
  }

  return tenantSlug;
}

export function login(input) {
  return apiFetch(buildTenantApiPath(getCurrentTenantSlug(), "auth/login"), {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function logout() {
  return apiFetch(buildTenantApiPath(getCurrentTenantSlug(), "auth/logout"), {
    method: "POST",
  });
}

export function acceptInvite(input) {
  return apiFetch(
    buildTenantApiPath(getCurrentTenantSlug(), "auth/accept-invite"),
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export function forgotPassword(input) {
  return apiFetch(
    buildTenantApiPath(getCurrentTenantSlug(), "auth/forgot-password"),
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export function resetPassword(input) {
  return apiFetch(
    buildTenantApiPath(getCurrentTenantSlug(), "auth/reset-password"),
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}
