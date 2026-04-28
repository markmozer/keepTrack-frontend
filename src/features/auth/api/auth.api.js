/**
 * File: keeptrack-frontend/src/features/auth/api/auth.api.js
 */

import { apiFetch } from "../../../shared/api/client";
import {
  buildTenantApiPath,
  getTenantSlugFromPathname,
} from "../../../shared/lib/tenantPaths";
import { getApiErrorMessage } from "../../../shared/utils/apiError.js";

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

function formatActivationDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export async function loginWithResult(input) {
  const response = await login(input);
  const result = await response.json();

  if (!response.ok || !result?.success) {
    const nextValidFrom = result?.error?.details?.nextValidFrom;
    const formattedDate = formatActivationDate(nextValidFrom);

    if (result?.error?.code === "ROLES_NOT_YET_ACTIVE" && formattedDate) {
      const error = new Error(
        `Je account is al geactiveerd, maar je toegang start op ${formattedDate}. Daarna kun je inloggen.`,
      );
      error.code = "ROLES_NOT_YET_ACTIVE";
      error.nextValidFrom = nextValidFrom;
      throw error;
    }

    if (result?.error?.code === "ROLES_NOT_YET_ACTIVE") {
      const error = new Error(
        "Je account is al geactiveerd, maar je toegang is nog niet actief. Probeer het later opnieuw.",
      );
      error.code = "ROLES_NOT_YET_ACTIVE";
      error.nextValidFrom = nextValidFrom ?? null;
      throw error;
    }

    throw new Error(
      getApiErrorMessage(result, "Inloggen is mislukt."),
    );
  }

  return result;
}
