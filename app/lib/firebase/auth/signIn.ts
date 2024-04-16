import {
  signInWithEmailAndPassword,
  type AuthError,
  type UserCredential,
} from "firebase/auth";

import { auth } from "../firebase";

export default async function signInFirebase(email: string, password: string) {
  let result: UserCredential | null = null;
  let error: AuthError | null = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e as AuthError;
  }

  return { result, error };
}
