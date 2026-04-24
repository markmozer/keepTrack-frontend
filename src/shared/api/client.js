// File: src/shared/api/client.js

import { env } from "../utils/env.js";

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${env.apiBaseUrl}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });
}
