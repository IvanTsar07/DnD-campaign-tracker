"use client";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "../firebase/auth";
import { NextOrObserver, User } from "firebase/auth";

export function useUserSession(initialUser: User | null | undefined) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState<User | null | undefined>(initialUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser: User | null) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged(() => {
      if (user === undefined) return;
    });
  }, [user]);

  return user;
}