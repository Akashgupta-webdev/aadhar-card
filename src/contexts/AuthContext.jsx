import React, { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { authUser, loading, setLoading } = useAuth();

  return (
    <AuthContext.Provider value={{ authUser, loading, setLoading }}>{children}</AuthContext.Provider>
  );
}
