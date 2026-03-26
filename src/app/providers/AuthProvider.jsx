// src/app/providers/AuthProvider.jsx

import { createContext, useCallback, useEffect, useState } from "react";
import { apiFetch } from "../../shared/api/client.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    session: null,
    isLoading: true,
  });

  const refresh = useCallback(async () => {
    try {
      const response = await apiFetch("/api/auth/me");

      if (!response.ok) {
        throw new Error("Failed to fetch current session.");
      }

      const result = await response.json();

      setAuth({
        isAuthenticated: true,
        session: result.payload,
        isLoading: false,
      });
    } catch {
      setAuth({
        isAuthenticated: false,
        session: null,
        isLoading: false,
      });
    }
  }, []);

  const clearAuth = useCallback(() => {
    setAuth({
      isAuthenticated: false,
      session: null,
      isLoading: false,
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        refresh,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}