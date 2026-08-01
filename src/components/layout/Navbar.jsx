import {
  Palette,
  Moon,
  Sun,
  Monitor, 
  Plus,
  Search,
  ChevronDown,
  Check,
  Circle,
  RefreshCw,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useSettings } from "@/context/SettingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NotificationBell from "@/components/notifications/NotificationBell";
import ProfileMenu from "@/components/profile/ProfileMenu";

export default function Navbar() {
  const { settings, updateSetting } = useSettings();

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-xl transition-all duration-300 supports-backdrop-filter:bg-background/60 shadow-sm">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="h-11 w-80 rounded-xl border-border bg-secondary/50 backdrop-blur-md pl-11 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
          />
        </div>

        {/* Notification */}
        <NotificationBell />

        {/* Reset Demo Data Button */}
        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem("transactions");
            window.location.reload();
          }}
          className="h-11 gap-2 rounded-xl border border-border bg-card px-4 font-medium text-muted-foreground transition-all hover:scale-105 hover:bg-secondary hover:text-foreground"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden xl:block">Reset Demo</span>
        </Button>

        {/* Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-11 gap-2 rounded-xl bg-primary px-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:opacity-90"
            >
              <Palette className="h-4 w-4" />
              <span className="hidden xl:block">Appearance</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-52 rounded-xl border-border bg-card text-foreground"
          >
            <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />

            <DropdownMenuItem 
            onClick={() => updateSetting("theme", "midnight")} 
            className="flex justify-between hover:bg-secondary cursor-pointer">
              <span className="flex items-center gap-2"><Moon className="h-4 w-4" />Midnight</span>
              {settings.theme === "midnight" && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>

            <DropdownMenuItem 
            onClick={() => updateSetting("theme", "light")} 
            className="flex justify-between hover:bg-secondary cursor-pointer">
              <span className="flex items-center gap-2"><Sun className="h-4 w-4" />Light</span>
              {settings.theme === "light" && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>

            <DropdownMenuItem 
            onClick={() => updateSetting("theme", "amoled")}
            className="flex justify-between hover:bg-secondary cursor-pointer">
              <span className="flex items-center gap-2"><Circle className="h-4 w-4 fill-current" />AMOLED</span>
              {settings.theme === "amoled" && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Button */}
        <Button className="h-11 gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:opacity-90">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>

        {/* Profile */}
        <ProfileMenu />
      </div>
    </header>
  );
}