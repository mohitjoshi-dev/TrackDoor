import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import SidebarItem from "./SidebarItem";
import { primaryNavigation, secondaryNavigation } from "@/constants/navigation";

import { useNavigate } from "react-router-dom";
import { signOut } from "@/services/auth.service";
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await signOut();

    if (error) {
      console.error(error.message);
      return;
    }

    navigate("/login", { replace: true });
  }

  return (
    <aside
      className={`relative flex h-full flex-col overflow-hidden border-r border-border bg-background/70 backdrop-blur-2xl transition-all duration-300 shadow-[0_0_50px_rgba(var(--color-primary),0.06)] ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="pointer-events-none absolute -left-24 top-32 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-blue-500/5 blur-[120px]" />
      <div
        className={`flex h-20 items-center border-b border-border transition-all duration-300 ${
          collapsed
            ? "justify-center gap-1.5 px-2 py-4"
            : "justify-between p-4"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`rounded-xl bg-linear-to-br from-primary/15 to-blue-500/10 ring-1 ring-primary/20 shadow-lg shadow-primary/10 transition-all duration-300 ${
              collapsed ? "p-1.5" : "p-2.5"
            }`}
          >
            <Wallet className="h-5 w-5 text-primary" />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground">
                Smart Expense
              </h1>
              <p className="text-xs text-muted-foreground">AI Finance Tracker</p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={`shrink-0 rounded-lg text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-primary hover:shadow-md hover:shadow-primary/10 ${
            collapsed ? "h-8 w-8" : ""
          }`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex flex-1 flex-col px-4 py-5">
        {primaryNavigation.map((item) => (
          <SidebarItem
            key={item.label}
            to={item.to}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="mt-auto border-t border-border p-3">
        {secondaryNavigation.map((item) => (
        <SidebarItem
          key={item.label}
          to={item.label === "Logout" ? undefined : item.to}
          icon={item.icon}
          label={item.label}
          collapsed={collapsed}
          onClick={item.label === "Logout" ? handleLogout : undefined}
        />
      ))}
      </div>
    </aside>
  );
}