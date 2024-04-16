"use client";

import { useAuthContext } from "@/lib/providers/auth-provider";
import { Toolbar, IconButton, Typography, styled } from "@mui/material";
import { type FC, useState } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

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

const Header: FC<{}> = ({}) => {
  const user = useAuthContext();
  const [open, setOpen] = useState(false);

  // const handleSignOut = event => {
  //   event.preventDefault();
  //   signOut();
  // };

  // const handleSignIn = event => {
  //   event.preventDefault();
  //   signInWithGoogle();
  // };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    // <header>
    //   <div>Header</div>
    //   {/* <div>{JSON.stringify(user)}</div> */}
    //   <button onClick={handleSignIn}>sign in</button>
    //   <button onClick={handleSignOut}>sign out</button>
    // </header>
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
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
