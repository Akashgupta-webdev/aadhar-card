import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const { authUser, loading, setLoading } = useContext(AuthContext);
  const [user, setUser] = useState({
    id: authUser?.id,
    name: undefined,
    email: authUser?.email || "Guest User",
    balance: undefined,
    contact: undefined,
    admin: false
  });


  useEffect(() => {
    try {
      getUserData();
    } catch (error) {
      console.error(error);
    } 
  }, [authUser]);

  const getUserData = async () => {
    if (!authUser?.id) return;

    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("user_id", authUser.id)
      .single();

    if (error) console.error("error in loading user data:", error.message);

    if (data) {
      setUser({
        ...user,
        id: authUser.id,
        name: data?.name,
        email: authUser?.email,
        balance: data?.balance,
        contact: data?.contact,
        admin: data?.admin,
      });
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();

      setUser({
        ...user,
        id: undefined,
        name: undefined,
        email: undefined,
        balance: undefined,
        contact: undefined,
        admin: false
      });

    } catch (error) {
      console.error("Error in logout:", error.message);
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}
