"use client";

import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useUserSession } from "@/lib/providers/auth-context";
import { useAuthContext } from "@/lib/providers/auth-provider";
import React, { FC } from "react";

const Header: FC<{}> = ({}) => {
  const user = useAuthContext();

  const handleSignOut = event => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = event => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <header>
      <div>Header</div>
      <div>{JSON.stringify(user)}</div>
      <button onClick={handleSignIn}>sign in</button>
      <button onClick={handleSignOut}>sign out</button>
    </header>
  );
};

export default Header;
