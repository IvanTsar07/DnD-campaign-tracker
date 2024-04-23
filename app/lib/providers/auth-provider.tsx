"use client";

import { type FC, type ReactNode, createContext, useContext } from "react";
import { useUserSession } from "./auth-context";
import { User } from "firebase/auth";
import Loading from "@/components/common/loading/loading";

export const AuthContext = createContext<User | null | undefined>(null);
export const useAuthContext = () => useContext(AuthContext);

export type AuthContexProviderProps = {
  initialUser: User | null | undefined;
  children: ReactNode;
};

const AuthContextProvider: FC<AuthContexProviderProps> = ({
  children,
  initialUser,
}) => {
  const { user, loading } = useUserSession(initialUser);

  return (
    <AuthContext.Provider value={user}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
