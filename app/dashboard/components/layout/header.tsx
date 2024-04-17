import { type FC } from "react";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { Button, IconButton, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../constants";
import { usePathname } from "next/navigation";
import { adminRoutes, routes } from "./routes";

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
  const user = useAuthContext();
  const path = usePathname();

  // TODO: fix for dynamic routes
  const pageName = [...routes, ...adminRoutes].find(
    route => route.path === path
  )?.title;

  return (
    <AppBar
      position="fixed"
      open={open}
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
            flexGrow: 1,
            flexDirection: "row",
          }}
        >
          <Button
            type="button"
            variant="text"
          >
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
