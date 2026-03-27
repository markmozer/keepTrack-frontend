/**
 * File: keeptrack-frontend/src/features/auth/api/auth.api.js
 */


import { apiFetch } from "../../../shared/api/client";

export function login(input) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function logout() {
  return apiFetch("/api/auth/logout", {
    method: "POST",
  });
}

export function acceptInvite(input) {
  return apiFetch("/api/users/accept-invite", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function forgotPassword(input) {
  return apiFetch("/api/users/request-pwd-reset", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function resetPassword(input) {
  return apiFetch("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(input),
  });
}