"use client";
import { Roboto } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FC, ReactNode, createContext, useState } from "react";
import { getUserTheme, setTheme } from "./lib/api/client-actions";

export type ThemeMode = "light" | "dark";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = (themeMode: ThemeMode) =>
  createTheme({
    palette: {
      mode: themeMode,
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
      subtitle1: {
        color: themeMode === "dark" ? "#fff" : "#0000008a",
      },
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === "info" && {
              backgroundColor: "#60a5fa",
            }),
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              themeMode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[600],
          }),
        },
      },
    },
  });

export const CustomThemeContext = createContext({
  currentTheme: "",
  themeSwitchHandler: (mode: ThemeMode) => {},
});

export const CustomThemeContextProvider: FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  const userTheme = getUserTheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(userTheme);

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
