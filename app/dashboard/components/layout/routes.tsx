import {
  AdminPanelSettings,
  AutoStories,
  Gavel,
  Group,
  Home,
  PersonAdd,
} from "@mui/icons-material";

export const routes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <Home />,
  },
  {
    path: "/dashboard/npc",
    title: "NPCs",
    icon: <Group />,
  },
  {
    path: "/dashboard/npc/create",
    title: "Create NPC",
    icon: <PersonAdd />,
  },
  {
    path: "/dashboard/loot",
    title: "Loot track",
    icon: <Gavel />,
  },
  {
    path: "/dashboard/stories",
    title: "Stroies",
    icon: <AutoStories />,
  },
];

export const adminRoutes = [
  {
    path: "/admin",
    title: "Admin panel",
    icon: <AdminPanelSettings />,
  },
];
