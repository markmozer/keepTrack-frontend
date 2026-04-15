// src/shared/lib/permissions.js

export function hasRole(principal, roleName) {
  if (!principal || !Array.isArray(principal.roleNames)) return false;
  return principal.roleNames.includes(roleName);
}

export function hasAnyRole(principal, roleNames) {
  if (!principal || !Array.isArray(principal.roleNames)) return false;
  return roleNames.some((roleName) => principal.roleNames.includes(roleName));
}

export function canManageUsers(principal) {
  return hasAnyRole(principal, ["ADMIN", "SUPER_ADMIN"]);
}