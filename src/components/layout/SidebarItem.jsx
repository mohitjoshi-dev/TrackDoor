import { NavLink } from "react-router-dom";

export default function SidebarItem({
  to,
  icon: Icon,
  label,
  collapsed,
}) {
  return (
   <NavLink
    to={to}
    className={({ isActive }) =>
        `mb-2 flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
        isActive
            ? "bg-cyan-400/15 text-cyan-400"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`
    }
    >
    <Icon className="h-5 w-5 shrink-0" />

    {!collapsed && (
        <span className="whitespace-nowrap text-sm font-medium">
        {label}
        </span>
    )}
    </NavLink>
  );
}