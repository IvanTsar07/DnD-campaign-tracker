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
import firebase_app from "@/lib/firebase/config";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        //console.log("USER >>>>>> ", user);
        setUser(user);
      } else {
        setUser(undefined);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
