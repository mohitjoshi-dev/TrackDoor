import {
  Bell,
  Moon,
  Plus,
  Search,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/70 px-8 backdrop-blur-xl">

      {/* Left */}
      <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
              Dashboard
          </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <Input
                placeholder="Search transactions..."
                className="h-11 w-80 rounded-xl border-white/10 bg-slate-900/70 pl-11 text-white placeholder:text-slate-500 focus-visible:border-cyan-500 
                         focus-visible:ring-cyan-500/20" />
        </div>

        {/* Notification */}

        <Button
          size="icon"
          variant="ghost"
          className="h-11 w-11 rounded-xl border border-white/10 bg-slate-900/70 transition-all hover:scale-105 hover:bg-slate-800"
        >
          <div className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-900" />
          </div>  
        </Button>

        {/* Theme */}

        <Button
          size="icon"
          variant="ghost"
          className="h-11 w-11 rounded-xl border border-white/10 bg-slate-900/70 transition-all hover:scale-105 hover:bg-slate-800"
        >
          <Moon className="h-5 w-5" />
        </Button>

        {/* Add Button */}

        <Button className="h-11 gap-2 rounded-xl bg-cyan-500 px-6 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 hover:bg-cyan-400">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>

        {/* Profile */}

        <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 hover:bg-slate-800">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-500 font-bold text-slate-950">
            MJ
          </div>

          <div className="hidden text-left xl:block">
            <p className="text-sm font-semibold text-white">
              Mohit
            </p>

            <p className="text-xs text-slate-400">
              Free Plan
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-slate-400" />

        </button>

      </div>

    </header>
  );
}