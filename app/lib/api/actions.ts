"use server";

import { redirect } from "next/navigation";
import signInFirebase from "../firebase/auth/signIn";

function isTextValid(text: string) {
  return text && text.trim() !== "";
}

export async function signIn(
  _prevState: { message: string | undefined },
  formData: { get: (arg0: string) => any }
) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!isTextValid(email) || !isTextValid(password)) {
    return {
      message: "Invalid data. Please check your input and try again.",
    };
  }

  const { result, error } = await signInFirebase(email, password);
  // console.log("RES >>> ", result);
  // console.log("ERR >>> ", error);

  redirect("/dashboard");
}
