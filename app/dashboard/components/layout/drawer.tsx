"use client";

import * as React from "react";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Drawer, DrawerHeader } from "../mixins";
import { FC } from "react";
import { useTheme } from "@mui/material/styles";
import DrawerItem from "../common/drawer-item";
import { adminRoutes, routes } from "./routes";

export type SideDrawerProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

const SideDrawer: FC<SideDrawerProps> = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {routes.map(route => (
          <DrawerItem
            key={route.title}
            text={route.title}
            open={open}
            icon={route.icon}
            link={route.path}
          />
        ))}
      </List>
      <Divider />
      <List>
        {adminRoutes.map(route => (
          <DrawerItem
            key={route.title}
            text={route.title}
            open={open}
            icon={route.icon}
            link={route.path}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
