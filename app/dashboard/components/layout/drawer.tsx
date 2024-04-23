"use client";

import * as React from "react";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Drawer, DrawerHeader } from "../mixins";
import { FC, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import DrawerItem from "../common/drawer-item";
import { adminRoutes, routes } from "./routes";
import { useAuthContext } from "@/lib/providers/auth-provider";
import { FormControlLabel, Typography } from "@mui/material";
import { MaterialUISwitch } from "../common/switch";
import { CustomThemeContext } from "@/lib/providers/theme-provider";

export type SideDrawerProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

const SideDrawer: FC<SideDrawerProps> = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const user = useAuthContext();
  const { themeSwitchHandler, currentTheme } = useContext(CustomThemeContext);

  console.log(currentTheme);

  return (
    <Drawer
      variant="permanent"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {open && <ChevronLeftIcon />}
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
      {user && (
        <>
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
        </>
      )}

      {open && (
        <>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ ml: 2, mt: 2 }}
              style={{ margin: "0", marginLeft: "16px" }}
            >
              Theming
            </Typography>

            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  size="small"
                  checked={currentTheme === "dark"}
                  theme={theme}
                />
              }
              label={""}
              onChange={(
                _event: React.SyntheticEvent<Element, Event>,
                checked: boolean
              ) => {
                themeSwitchHandler(checked ? "dark" : "light");
              }}
              value={currentTheme === "dark"}
            />
          </div>
        </>
      )}
    </Drawer>
  );
};

export default SideDrawer;
