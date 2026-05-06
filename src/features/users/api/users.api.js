// src/features/users/api/users.api.js

import { apiFetch } from "../../../shared/api/client";
import { getApiErrorMessage } from "../../../shared/utils/apiError";
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

export async function getUsers({ email = "", status = "" } = {}) {
  const params = new URLSearchParams();

  if (email) params.set("email", email);
  if (status) params.set("status", status);

  const query = params.toString();
  const baseUrl = buildTenantApiPath(getCurrentTenantSlug(), "users");
  const url = query ? `${baseUrl}?${query}` : baseUrl;

  const response = await apiFetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  return response.json();
}

export async function getUserById(userId) {
  if (!userId) {
    throw new Error("getUserById requires a userId.");
  }

  const response = await apiFetch(
    buildTenantApiPath(getCurrentTenantSlug(), `users/${userId}`),
    {
      method: "GET",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error?.message || "Failed to fetch user.");
  }

  return result;
}

export async function createUser(input) {
  const response = await apiFetch(buildTenantApiPath(getCurrentTenantSlug(), "users"), {
    method: "POST",
    body: JSON.stringify(input),
  });

  const result = await response.json();

  if (!response.ok || !result?.success) {
    throw new Error(
      getApiErrorMessage(result, "Gebruiker aanmaken is mislukt."),
    );
  }

  return result;
}

export async function inviteUser(userId) {
  if (!userId) {
    throw new Error("inviteUser requires a userId.");
  }

  const response = await apiFetch(
    buildTenantApiPath(getCurrentTenantSlug(), `users/${userId}/invite`),
    {
      method: "POST",
    },
  );

  const result = await response.json();

  if (!response.ok || !result?.success) {
    throw new Error(
      getApiErrorMessage(result, "Gebruiker uitnodigen is mislukt."),
    );
  }

  return result;
}
