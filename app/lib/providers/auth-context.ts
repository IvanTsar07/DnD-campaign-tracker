"use client";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "../firebase/auth";

export function useUserSession(initialUser) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authUser => {
      setUser(authUser);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged(authUser => {
      if (user === undefined) return;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}
