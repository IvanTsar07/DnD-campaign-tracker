"use client";

import { createContext, useContext } from "react";
import { useUserSession } from "./auth-context";

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children, initialUser }) {
  const user = useUserSession(initialUser);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
