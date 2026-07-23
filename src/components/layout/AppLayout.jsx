import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        {/* Changed bg-slate-950/70 to bg-transparent */}
        <main className="relative flex-1 overflow-y-auto bg-transparent p-6 transition-colors duration-300 z-0">
          {/* Top Right Glow */}
          <div
            className="
              pointer-events-none fixed right-0 top-0 -z-10
              h-125 w-125 rounded-full
              bg-primary/10 
              opacity-40 dark:opacity-60
              blur-[100px]
              animate-ambient-glow
              transition-all duration-300
            "
          />
         
          {/* Center Glow */}
          <div
            className="
              pointer-events-none fixed left-1/2 top-1/2 -z-10
              h-87.5 w-87.5
              -translate-x-1/2 -translate-y-1/2
              rounded-full
              bg-secondary/40
              opacity-30 dark:opacity-60
              blur-[120px]
              animate-ambient-glow
              transition-all duration-300
            "
          />

          {/* Bottom Left Glow */}
          <div
            className="
              pointer-events-none fixed bottom-0 left-0 -z-10
              h-125 w-100
              rounded-full
              bg-primary/5
              opacity-30 dark:opacity-60
              blur-[120px]
              animate-ambient-glow
              transition-all duration-300
            "
          />

          <div className="relative mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}