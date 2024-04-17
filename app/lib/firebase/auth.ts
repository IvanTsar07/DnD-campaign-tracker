import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "./firebase";
import { redirect } from "next/navigation";

export function onAuthStateChanged(cb: (user: User | null) => void) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    return await _signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in with email and password", error);
  }
}

export async function signOut() {
  try {
    await auth.signOut();
    redirect("/");
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
