import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import GlobalQuickAddDialog from "./GlobalQuickAddDialog";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 1024);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);

      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="flex h-screen overflow-hidden bg-background transition-colors duration-300">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isMobile={isMobile}
      />

      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          isMobile={isMobile}
        />

        {/* Changed bg-slate-950/70 to bg-transparent */}
        <main className="relative z-0 flex-1 overflow-y-auto bg-transparent p-4 transition-colors duration-300 sm:p-6"> 
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
        <GlobalQuickAddDialog />
      </div>
    </div>
  );
}