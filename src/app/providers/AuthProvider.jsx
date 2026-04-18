// src/app/providers/AuthProvider.jsx

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "../../shared/api/client.js";
import { mapMePayloadToSession } from "../../features/auth/mappers/mapSession.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await apiFetch("/api/auth/me");

      if (!response.ok) {
        throw new Error("Failed to fetch current session.");
      }

      const result = await response.json();
      const nextSession = mapMePayloadToSession(result.payload);

      setSession(nextSession);

      return nextSession;
    } catch {
      setSession(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSession = useCallback(() => {
    setSession(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const value = useMemo(() => {
    const principal = session?.principal ?? null;
    const user = session?.user ?? null;
    const tenant = session?.tenant ?? null;
    const abilities = session?.abilities ?? null;

    return {
      session,
      principal,
      user,
      tenant,
      abilities,
      isAuthenticated: Boolean(principal?.userId),
      isLoading,
      refreshSession,
      clearSession,
    };
  }, [session, isLoading, refreshSession, clearSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}