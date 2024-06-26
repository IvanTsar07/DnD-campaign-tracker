import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { getAuthenticatedAppForUser } from "./lib/firebase/firebase";
import AuthContextProvider from "./lib/providers/auth-provider";
import CustomThemeContextProvider from "./lib/providers/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DnD Campaign Tracker",
  description: "Track your DnD campaigns with ease.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <CustomThemeContextProvider>
            <CssBaseline />
            <AuthContextProvider initialUser={currentUser}>
              {children}
            </AuthContextProvider>
          </CustomThemeContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
