import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Bell,
  CheckCircle2,
  PencilLine,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import { useNotifications } from "@/context/NotificationContext";
import { Button } from "@/components/ui/button";

export default function NotificationDropdown() {
const getNotificationType = (type) => {
  switch (type) {
    case "success":
      return {
        icon: CheckCircle2,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
      };

    case "info":
      return {
        icon: PencilLine,
        color: "text-sky-500",
        bg: "bg-sky-500/10",
      };

    case "error":
      return {
        icon: Trash2,
        color: "text-red-500",
        bg: "bg-red-500/10",
      };

    case "warning":
      return {
        icon: AlertTriangle,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
      };

    default:
      return {
        icon: Bell,
        color: "text-primary",
        bg: "bg-primary/10",
      };
  }
};

const {
    notifications,
    markAsRead,
    removeNotification,
    markAllAsRead,
    clearNotifications,
    } = useNotifications();

const formatTime = (timestamp) => {
const diff = Date.now() - timestamp;

const minutes = Math.floor(diff / 60000);

if (minutes < 1) return "Just now";
if (minutes < 60) return `${minutes} min ago`;

const hours = Math.floor(minutes / 60);

if (hours < 24)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;

const days = Math.floor(hours / 24);

if (days === 1) return "Yesterday";

    return `${days} days ago`;
};


return (
    <DropdownMenuContent
      align="end"
      className="w-96 rounded-2xl border border-border bg-card p-0"
    >
      <div className="flex items-center justify-between p-4">
        <DropdownMenuLabel className="p-0 text-base font-semibold">
          Notifications
        </DropdownMenuLabel>
      </div>

      <DropdownMenuSeparator />

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12">
            <Bell className="mb-3 h-10 w-10 text-muted-foreground/40" />

            <p className="font-medium">
              No notifications yet
            </p>

            <p className="mt-1 text-center text-sm text-muted-foreground">
              We'll notify you about expenses,
              budgets and updates here.
            </p>
          </div>
        ) : (
          notifications.map((item) => {
          const notification = getNotificationType(item.type);
          const Icon = notification.icon;
            return (
            <button
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`w-full border-b border-border p-4 text-left transition-colors hover:bg-secondary/40 ${
                !item.read ? "bg-primary/5" : ""
                }`}
            >
                <div className="flex items-start gap-3">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${notification.bg}`}
                >
                    <Icon className={`h-5 w-5 ${notification.color}`} />
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between">
                    <p className="font-medium">
                        {item.title}
                    </p>

                    <div className="flex items-center gap-2">
                    {!item.read && (
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    )}

                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(item.id);
                        }}
                        className="rounded-md p-1 text-muted-foreground transition hover:bg-red-500/10 hover:text-red-500"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                    </div>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                    {item.message}
                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">
                    {formatTime(item.createdAt)}
                    </p>
                </div>
                </div>
            </button>
           );
          })
        )}
      </div>

      <DropdownMenuSeparator />

      <div className="flex justify-between p-3">
        <Button
          variant="ghost"
          onClick={markAllAsRead}
        >
          Mark all read
        </Button>

        <Button
          variant="destructive"
          onClick={clearNotifications}
        >
          Clear all
        </Button>
      </div>
    </DropdownMenuContent>
  );
}