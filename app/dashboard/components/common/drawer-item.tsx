import NavLink from "@/components/common/nav-link/nav-link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { FC } from "react";

export type DrawerItemProps = {
  text: string;
  open: boolean;
  icon: React.ReactNode | React.ReactElement | JSX.Element;
  link: string;
};

const DrawerItem: FC<DrawerItemProps> = ({ text, open, icon, link }) => {
  return (
    <NavLink href={link}>
      <Tooltip title={text}>
        <ListItem
          key={text}
          disablePadding
          sx={{ display: "block" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </Tooltip>
    </NavLink>
  );
};

export default DrawerItem;
