"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Header from "./header";
import { DrawerHeader } from "../mixins";
import SideDrawer from "./drawer";

const LayoutGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
        />

        <SideDrawer
          open={open}
          handleDrawerClose={handleDrawerClose}
        />

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default LayoutGrid;
