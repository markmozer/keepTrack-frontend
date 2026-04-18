// src/features/users/api/users.api.js

import { apiFetch } from "../../../shared/api/client";

export async function getUsers({ email = "", status = "" } = {}) {
  const params = new URLSearchParams();

  if (email) params.set("email", email);
  if (status) params.set("status", status);

  const query = params.toString();
  const url = query ? `/api/users?${query}` : "/api/users";

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

  const response = await apiFetch(`/api/users/${userId}`, {
    method: "GET",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error?.message || "Failed to fetch user.");
  }

  return result;
}