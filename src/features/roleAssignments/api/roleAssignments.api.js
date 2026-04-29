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

export async function getRoles() {
  const response = await apiFetch(buildTenantApiPath(getCurrentTenantSlug(), "roles"));
  const result = await response.json();

  if (!response.ok || !result?.success) {
    throw new Error(getApiErrorMessage(result, "Rollen ophalen is mislukt."));
  }

  return result;
}

export async function createRoleAssignment(input) {
  const response = await apiFetch(
    buildTenantApiPath(getCurrentTenantSlug(), "role-assignments"),
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );

  const result = await response.json();

  if (!response.ok || !result?.success) {
    throw new Error(
      getApiErrorMessage(result, "Roltoewijzing opslaan is mislukt."),
    );
  }

  return result;
}
