import ProfileCardWrapper from "@/components/profile/ProfileCardWrapper";
import SettingsToggle from "./SettingsToggle";

import {
  Bell,
  Mail,
  Wallet,
  PiggyBank,
  BarChart3,
} from "lucide-react";

export default function NotificationCard () {
const notifications = [
  {
    title: "Push Notifications",
    subtitle: "Receive app notifications",
    enabled: true,
    icon: Bell,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    title: "Email Notifications",
    subtitle: "Receive email updates",
    enabled: true,
    icon: Mail,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-500",
  },
  {
    title: "Expense Alerts",
    subtitle: "Warn when spending increases",
    enabled: false,
    icon: Wallet,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-500",
  },
  {
    title: "Budget Alerts",
    subtitle: "Notify when nearing budget",
    enabled: true,
    icon: PiggyBank,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-500",
  },
  {
    title: "Weekly Reports",
    subtitle: "Receive weekly summaries",
    enabled: true,
    icon: BarChart3,
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-500",
  },
];

return (
    <ProfileCardWrapper>
    <div className="mb-6">
    <h2 className="text-xl font-bold">
        Notifications
    </h2>

    <p className="text-sm text-muted-foreground">
        Manage how you receive updates.
    </p>
    </div>

    <div className="space-y-1">
    {notifications.map((item) => (
        <SettingsToggle
        key={item.title}
        item={item}
        />
    ))}
    </div>
    </ProfileCardWrapper>
);

}