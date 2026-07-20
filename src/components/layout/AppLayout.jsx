import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950 backdrop-blur-md">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="relative flex-1 overflow-y-auto bg-slate-950 p-6">
        {/* Top Right Glow */}
        <div className="pointer-events-none absolute right-0 top-0 h-125 w-125 rounded-full bg-cyan-500/5 blur-[120px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-87.5 w-87.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-[120px]" />

        {/* Bottom Left Glow */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-100 rounded-full bg-blue-600/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
      </div>
    </div>
  );
}