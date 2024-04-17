import {
  AdminPanelSettings,
  AutoStories,
  Gavel,
  Group,
  Home,
  PersonAdd,
} from "@mui/icons-material";

const routes = [
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

const adminRoutes = [
  {
    path: "/admin",
    title: "Admin panel",
    icon: <AdminPanelSettings />,
  },
  {
    path: "/dashboard/npc/create",
    title: "Create NPC",
    icon: <PersonAdd />,
  },
];

export { routes, adminRoutes };
