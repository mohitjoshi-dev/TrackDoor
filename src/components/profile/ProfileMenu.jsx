import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  User,
  Settings,
  Download,
  Upload,
  CircleHelp,
  LogOut,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { signOut } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

export default function ProfileMenu() {
const navigate = useNavigate();
const { profile } = useAuth();

async function handleLogout() {
  const { error } = await signOut();

  if (error) {
    console.error(error.message);
    return;
  }

  navigate("/login", { replace: true });
}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto rounded-xl border border-border bg-card px-3 py-2 transition-colors hover:bg-secondary"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-primary to-blue-500 font-bold text-primary-foreground">
             {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              profile?.full_name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase() || "U"
            )}
            </div>

            <div className="hidden text-left xl:block">
              <p className="text-sm font-semibold">
                {profile?.full_name || "User"}
              </p>

              <p className="text-xs text-muted-foreground">
                Free Plan
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 rounded-2xl border border-border bg-card p-2"
      >
        <DropdownMenuLabel className="p-3">
          <div>
            <h3 className="font-semibold">
              {profile?.full_name || "User"}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Personal Account
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
        className="cursor-pointer rounded-xl py-3"
        onClick={() => navigate("/profile")}
        >
          <User className="mr-3 h-4 w-4" />
          <span className="flex-1">My Profile</span>
          <ChevronRight className="h-4 w-4 opacity-50" />
        </DropdownMenuItem>

        <DropdownMenuItem
            className="cursor-pointer rounded-xl py-3"
            onClick={() => navigate("/settings")}
            >
            <Settings className="mr-3 h-4 w-4" />
            <span className="flex-1">Settings</span>
            <ChevronRight className="h-4 w-4 opacity-50" />
        </DropdownMenuItem>

        <DropdownMenuItem
        className="cursor-pointer rounded-xl py-3"
        onClick={() => navigate("/export")}
        >
          <Download className="mr-3 h-4 w-4" />
          <span className="flex-1">Export Data</span>
          <ChevronRight className="h-4 w-4 opacity-50" />
        </DropdownMenuItem>

        <DropdownMenuItem
        className="cursor-pointer rounded-xl py-3"
        onClick={() => navigate("/import")}
        >
          <Upload className="mr-3 h-4 w-4" />
          <span className="flex-1">Import Data</span>
          <ChevronRight className="h-4 w-4 opacity-50" />
        </DropdownMenuItem>

        <DropdownMenuItem
        className="cursor-pointer rounded-xl py-3"
        onClick={() => navigate("/help")}
        >
          <CircleHelp className="mr-3 h-4 w-4" />
          <span className="flex-1">Help & Support</span>
          <ChevronRight className="h-4 w-4 opacity-50" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer rounded-xl py-3 text-red-500 focus:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}