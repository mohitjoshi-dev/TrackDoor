import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Wallet} from "lucide-react";

import { Button } from "@/components/ui/button";
import SidebarItem from "./SidebarItem";
import {primaryNavigation, secondaryNavigation, } from "@/constants/navigation";


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
  className={`flex h-screen flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300 ${
    collapsed ? "w-18" : "w-70"
  }`}
>
    <div className="flex items-center justify-between border-b border-slate-800 p-4">
    <div className="flex items-center gap-2">
      <Wallet className="h-6 w-6 text-cyan-400" />

      {!collapsed && (
        <h1 className="text-lg font-bold tracking-tight text-white">
          Smart Expense
        </h1>
      )}
    </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400 hover:bg-slate-800 hover:text-white"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <PanelLeftOpen className="h-5 w-5" />
        ) : (
          <PanelLeftClose className="h-5 w-5" />
        )}
      </Button>
      
    </div>
    
    <nav className="flex-1 px-3 py-4">
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

    <div className="border-t border-slate-800 p-3">
      {secondaryNavigation.map((item) => (
        <SidebarItem
          key={item.label}
          to={item.to}
          icon={item.icon}
          label={item.label}
          collapsed={collapsed}
        />
      ))}
    </div>

</aside>

    
  );
}