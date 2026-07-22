import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Wallet} from "lucide-react";

import { Button } from "@/components/ui/button";
import SidebarItem from "./SidebarItem";
import {primaryNavigation, secondaryNavigation, } from "@/constants/navigation";


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
  className={`relative flex h-screen flex-col overflow-hidden border-r border-white/10 bg-slate-950/70 backdrop-blur-2xl transition-all duration-300 shadow-[0_0_50px_rgba(34,211,238,0.06)]
  ${collapsed ? "w-20" : "w-72"}`}
    >
    <div className="pointer-events-none absolute -left-24 top-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
    <div className="pointer-events-none absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-blue-500/5 blur-[120px]" />  
    <div className="flex items-center justify-between border-b border-white/10 p-4">
    <div className="flex items-center gap-3">
    <div className="rounded-xl bg-cyan-500/10 p-2 ring-1 ring-cyan-500/20">
      <Wallet className="h-5 w-5 text-cyan-400" />
    </div>

    {!collapsed && (
      <div>
        <h1 className="text-lg font-bold tracking-tight text-white">
          Smart Expense
        </h1>

        <p className="text-xs text-slate-400">
          AI Finance Tracker
        </p>
      </div>
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

    <div className="border-t border-white/10 p-3">
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