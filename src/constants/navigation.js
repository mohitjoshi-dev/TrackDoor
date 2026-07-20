import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  ChartColumn,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export const primaryNavigation = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    to: "/transactions",
    icon: ReceiptText,
  },
  {
    label: "Budget",
    to: "/budget",
    icon: Wallet,
  },
  {
    label: "Analytics",
    to: "/analytics",
    icon: ChartColumn,
  },
  {
    label: "Profile",
    to: "/profile",
    icon: User,
  },
];

export const secondaryNavigation = [
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
  {
    label: "Logout",
    to: "/logout",
    icon: LogOut,
  },
];

