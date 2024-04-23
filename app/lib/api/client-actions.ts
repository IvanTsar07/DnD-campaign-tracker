"use client";

export function getUserTheme(): "light" | "dark" {
  try {
    const theme = localStorage.getItem("theme");
    return (theme || "dark") as "light" | "dark";
  } catch (error) {
    console.error(error);
    return "dark";
  }
}

export function setTheme(theme: string) {
  localStorage.setItem("theme", theme);
}
