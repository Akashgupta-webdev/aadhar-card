import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { authUser, loading } = useAuth();
  console.log("running:");

  return (
    <AuthContext.Provider value={{ authUser, loading }}>{children}</AuthContext.Provider>
  );
}
