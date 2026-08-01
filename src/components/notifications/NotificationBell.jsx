import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/context/NotificationContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {
  const { unreadCount } = useNotifications();

return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>

        <Button
        variant="ghost"
        size="icon"
        className="relative h-11 w-11 rounded-xl border border-border bg-transparent transition-all hover:scale-105 hover:bg-secondary"
        >
        <Bell className="h-5 w-5 text-muted-foreground" />

        {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
            </span>
        )}
        </Button>
        </DropdownMenuTrigger>

        <NotificationDropdown />
    </DropdownMenu>
    );
}