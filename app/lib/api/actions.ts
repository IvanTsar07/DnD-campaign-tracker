"use server";

import { redirect } from "next/navigation";
import signInFirebase from "../firebase/auth/signIn";

function isTextValid(text: string) {
  return text && text.trim() !== "";
}

export async function signIn(
  email: string,
  password: string
): Promise<{ result: null | string; error: string | null }> {
  if (!isTextValid(email) || !isTextValid(password)) {
    return {
      result: null,
      error: "Email and password are required",
    };
  }

  const { result, error } = await signInFirebase(email, password);

  if (error) {
    return {
      result: null,
      error: error.message,
    };
  }

  redirect("/dashboard");
}
