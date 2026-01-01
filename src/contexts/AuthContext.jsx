import React, { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { authUser, loading } = useAuth();

  return (
    <AuthContext.Provider value={{ authUser, loading }}>{children}</AuthContext.Provider>
  );
}
