import ProfileCardWrapper from "@/components/profile/ProfileCardWrapper";
import SettingsItem from "./SettingsItem";

import {
  Languages,
  Clock3,
  CalendarDays,
  IndianRupee,
  LayoutDashboard,
} from "lucide-react";

export default function PreferencesCard() {
  const preferences = [
  {
    title: "Language",
    subtitle: "Application language",
    value: "English",
    icon: Languages,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    title: "Time Zone",
    subtitle: "Current regional time",
    value: "IST (UTC+5:30)",
    icon: Clock3,
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-500",
  },
  {
    title: "Date Format",
    subtitle: "Display format",
    value: "DD/MM/YYYY",
    icon: CalendarDays,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-500",
  },
  {
    title: "Currency",
    subtitle: "Primary currency",
    value: "INR (₹)",
    icon: IndianRupee,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-500",
  },
  {
    title: "Dashboard View",
    subtitle: "Default analytics period",
    value: "Monthly",
    icon: LayoutDashboard,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-500",
  },
];
  return (
  <ProfileCardWrapper>
    <div className="mb-6">
      <h2 className="text-xl font-bold">
        Preferences
      </h2>

      <p className="text-sm text-muted-foreground">
        Regional and application preferences.
      </p>
    </div>

    <div className="space-y-1">
      {preferences.map((item) => (
        <SettingsItem
          key={item.title}
          item={item}
        />
      ))}
    </div>
  </ProfileCardWrapper>
);
}