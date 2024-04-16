"use client";

import { type FC, type ReactNode, createContext, useContext } from "react";
import { useUserSession } from "./auth-context";
import { User } from "firebase/auth";

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export type AuthContexProviderProps = {
  initialUser: User | null | undefined;
  children: ReactNode;
};

const AuthContextProvider: FC<AuthContexProviderProps> = ({
  children,
  initialUser,
}) => {
  const user = useUserSession(initialUser);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
