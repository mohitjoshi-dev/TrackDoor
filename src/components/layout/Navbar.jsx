import { Palette, Moon, Sun, Plus, Search, Check, Circle, Menu } from "lucide-react";
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

export default function Navbar({ mobileOpen, setMobileOpen, isMobile }) {
  const { settings, updateSetting } = useSettings();

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-border bg-background/80 px-4 lg:px-8 backdrop-blur-xl transition-all duration-300 supports-backdrop-filter:bg-background/60 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
      <div>

        <h1 className="text-xl font-bold tracking-tight text-foreground lg:text-2xl">
          Dashboard
        </h1>
      </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="h-11 w-115 rounded-xl border-border bg-secondary/50 backdrop-blur-md pl-11 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
          />
        </div>

        {/* Notification */}
        <NotificationBell />

        {/* Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="hidden h-11 gap-2 rounded-xl bg-primary px-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:opacity-90 md:flex"
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
        <Button className="hidden h-11 gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:opacity-90 lg:flex">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>

        {/* Profile */}
        <ProfileMenu />
      </div>
    </header>
  );
}