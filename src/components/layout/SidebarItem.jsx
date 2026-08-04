import { NavLink } from "react-router-dom";

export default function SidebarItem({
  to,
  icon: Icon,
  label,
  collapsed,
  onClick,
}) {

if (onClick) {
  return (
    <button
      onClick={onClick}
      className="relative mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-400 transition-all duration-300 
               hover:bg-slate-800/70 hover:text-white hover:translate-x-1">
      <Icon className="h-5 w-5 shrink-0" />

      {!collapsed && (
        <span className="whitespace-nowrap text-sm font-medium">
          {label}
        </span>
      )}
    </button>
  );
}

  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={`
            relative mb-2 flex items-center gap-3 rounded-xl px-3 py-3
            transition-all duration-300
            ${
              isActive
                ? "border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10"
                : "text-slate-400 hover:bg-slate-800/70 hover:text-white hover:translate-x-1"
            }
          `}
        >
          {isActive && (
            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          )}

          <Icon className="h-5 w-5 shrink-0" />

          {!collapsed && (
            <span className="whitespace-nowrap text-sm font-medium">
              {label}
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
}