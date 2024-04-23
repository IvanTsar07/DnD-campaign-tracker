"use client";

import { useContext, type FC } from "react";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { Button, IconButton, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../constants";
import { usePathname } from "next/navigation";
import { adminRoutes, routes } from "./routes";
import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { CustomThemeContext } from "@/lib/providers/theme-provider";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header: FC<{
  open: boolean;
  handleDrawerOpen: () => void;
}> = ({ open, handleDrawerOpen }) => {
  const router = useRouter();
  const user = useAuthContext();
  const path = usePathname();
  const { themeSwitchHandler, currentTheme } = useContext(CustomThemeContext);

  // TODO: fix for dynamic routes
  const pageName = [...routes, ...adminRoutes].find(
    route => route.path === path
  )?.title;

  return (
    <AppBar
      position="fixed"
      open={open}
      color={currentTheme === "dark" ? "primary" : "info"}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          {pageName}
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexGrow: 1,
            flexDirection: "row",
          }}
        >
          <Typography
            variant="caption"
            style={{
              fontSize: "12px",
              marginRight: "16px",
            }}
          >
            {user?.email}
          </Typography>
          <Button
            type="button"
            variant="text"
            style={{ color: "#FFFFFF" }}
            onClick={() => {
              if (user) {
                signOut();
              } else {
                router.push("/auth/login");
              }
            }}
          >
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
