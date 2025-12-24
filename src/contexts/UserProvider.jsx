import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const { authUser, loading } = useContext(AuthContext);
  const [user, setUser] = useState({
    id: undefined,
    name: undefined,
    email: undefined,
    balance: undefined,
    contact: undefined,
    admin: false
  });

  useEffect(() => {
    const getUserData = async () => {
      if (!authUser?.id) return;

      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("user_id", authUser.id)
        .single();

      setUser({
        ...user,
        id: authUser.id,
        name: data?.name,
        email: data?.email,
        balance: data?.balance,
        contact: data?.contact,
        admin: data?.admin,
      });
    };

    getUserData();
  }, [authUser]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}
