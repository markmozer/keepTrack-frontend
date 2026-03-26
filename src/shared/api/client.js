// File: src/shared/api/client.js

import { env } from "../utils/env.js";

function getTenantSlugFromHost(hostname = window.location.hostname) {
  if (!hostname) return null;

  const normalized = hostname.toLowerCase();

  if (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "keeptrackonline.nl" ||
    normalized === "www.keeptrackonline.nl" ||
    normalized === "api.keeptrackonline.nl"
  ) {
    return null;
  }

  const parts = normalized.split(".");

  // production tenant host: base.keeptrackonline.nl
  if (parts.length >= 3) {
    return parts[0];
  }

  // optional local support: base.localhost
  if (parts.length === 2 && parts[1] === "localhost") {
    return parts[0];
  }

  return null;
}

export async function apiFetch(path, options = {}) {
  const tenantSlug = getTenantSlugFromHost();
  const headers = new Headers(options.headers || {});

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (tenantSlug) {
    headers.set("X-Tenant-Slug", tenantSlug);
  }

  return fetch(`${env.apiBaseUrl}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });
}

export { getTenantSlugFromHost };