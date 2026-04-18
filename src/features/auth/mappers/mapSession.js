export function mapMePayloadToSession(payload) {
  if (!payload?.principal) {
    return null;
  }

  return {
    principal: {
      userId: payload.principal.userId,
      tenantId: payload.principal.tenantId,
      roleNames: Array.isArray(payload.principal.roleNames)
        ? payload.principal.roleNames
        : [],
    },
    user: payload.user
      ? {
          id: payload.user.id,
          email: payload.user.email,
          status: payload.user.status,
          displayName: payload.user.displayName,
        }
      : null,
    tenant: payload.tenant
      ? {
          id: payload.tenant.id,
          name: payload.tenant.name,
          slug: payload.tenant.slug,
          type: payload.tenant.type,
        }
      : null,
      abilities: Array.isArray(payload.abilities) ? payload.abilities : [],
  };
}