function trimSlashes(value) {
  return String(value || "").replace(/^\/+|\/+$/g, "");
}

export function getTenantSlugFromPathname(pathname = window.location.pathname) {
  if (typeof pathname !== "string") {
    return null;
  }

  const match = pathname.match(/^\/t\/([^/]+)(?:\/|$)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export function buildTenantBasePath(tenantSlug) {
  const slug = trimSlashes(tenantSlug);

  if (!slug) {
    throw new Error("A tenantSlug is required to build a tenant path.");
  }

  return `/t/${encodeURIComponent(slug)}`;
}

export function buildTenantPath(tenantSlug, path = "") {
  const trimmedPath = trimSlashes(path);
  const slug = trimSlashes(tenantSlug);

  if (!slug) {
    return trimmedPath ? `/${trimmedPath}` : "/";
  }

  const basePath = buildTenantBasePath(slug);

  return trimmedPath ? `${basePath}/${trimmedPath}` : basePath;
}

export function buildTenantApiPath(tenantSlug, resourcePath = "") {
  const slug = trimSlashes(tenantSlug);
  const trimmedResourcePath = trimSlashes(resourcePath);

  if (!slug) {
    throw new Error("A tenantSlug is required to build a tenant api path.");
  }

  return trimmedResourcePath
    ? `/api/t/${encodeURIComponent(slug)}/${trimmedResourcePath}`
    : `/api/t/${encodeURIComponent(slug)}`;
}
