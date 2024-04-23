"use client";
import { Roboto } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import theme, { ThemeMode } from "@/theme";
import { getUserTheme, setTheme } from "../api/client-actions";

export const CustomThemeContext = createContext({
  currentTheme: "",
  themeSwitchHandler: (mode: ThemeMode) => {},
});

export const CustomThemeContextProvider: FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const userTheme = getUserTheme();
    setCurrentTheme(userTheme);
  }, []);

  const themeSwitchHandler = (themeMode: ThemeMode) => {
    setCurrentTheme(themeMode);
    setTheme(themeMode);
  };

  return (
    <ThemeProvider theme={theme(currentTheme)}>
      <CustomThemeContext.Provider value={{ currentTheme, themeSwitchHandler }}>
        {children}
      </CustomThemeContext.Provider>
    </ThemeProvider>
  );
};

export default CustomThemeContextProvider;
