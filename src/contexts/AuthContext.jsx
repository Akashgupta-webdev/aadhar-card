import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { user, loading } = useAuth();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      setAuth(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
}
