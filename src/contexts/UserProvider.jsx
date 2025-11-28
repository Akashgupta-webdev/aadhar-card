import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";
import { data } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const { auth } = useContext(AuthContext);
  console.log("auth:", auth);
  const [userData, setUserData] = useState({
    id: null,
    name: "",
    email: "",
    balance: 0,
    contact: null,
  });

  useEffect(() => {
    if (auth) {
      const { data, error } = supabase
        .from("user")
        .select("name email contact balance")
        .eq("user_id", auth.id);

      console.log("data:", data);

      setUserData({
        id: auth.id,
        name: data?.name,
        emaill: data?.emaill,
        balance: data?.balance,
        contact: data?.contact,
      });
    }
  }, [auth]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
}
