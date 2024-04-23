import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

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

export default theme;
