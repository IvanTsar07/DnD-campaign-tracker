"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "../firebase/auth";
import { User } from "firebase/auth";

export function useUserSession(initialUser: User | null | undefined) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState<User | null | undefined>(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser: User | null) => {
      console.log("authUser", authUser);
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged(() => {
      if (user === undefined) return;
    });
  }, [user]);

  return { user, loading };
}
