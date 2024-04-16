"use client";

import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import { getAuthenticatedAppForUser } from "../firebase/firebase";
import { useUserSession } from "./auth-context";

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children, initialUser }) {
  const user = useUserSession(initialUser);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
