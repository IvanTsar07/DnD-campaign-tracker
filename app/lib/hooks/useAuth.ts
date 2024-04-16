"use client";

import { User, getAuth } from "@firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

function useAuth() {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);

  console.log("CURR USER: ", auth.currentUser);

  useEffect(() => {
    setLoading(true);

    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  return { user, loading };
}

export default useAuth;
