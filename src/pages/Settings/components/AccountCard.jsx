import CardWrapper from "@/components/common/CardWrapper";
import SettingsItem from "./SettingsItem"
import {
  User,
  ShieldCheck,
  KeyRound,
  Smartphone,
  LogOut,
} from "lucide-react";

export default function AccountCard() {
  const account = [
  {
    title: "Profile",
    subtitle: "Manage your personal information",
    value: "Edit",
    icon: User,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    title: "Security",
    subtitle: "Password and authentication",
    value: "Manage",
    icon: ShieldCheck,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-500",
  },
  {
    title: "Change Password",
    subtitle: "Update your account password",
    value: "",
    icon: KeyRound,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-500",
  },
  {
    title: "Connected Devices",
    subtitle: "Manage signed-in devices",
    value: "1",
    icon: Smartphone,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-500",
  },
  {
    title: "Sign Out",
    subtitle: "Log out of your account",
    value: "",
    icon: LogOut,
    iconBg: "bg-red-500/20",
    iconColor: "text-red-500",
  },
];

  return (
  <CardWrapper>
    <div className="mb-6">
      <h2 className="text-xl font-bold">
        Account
      </h2>

      <p className="text-sm text-muted-foreground">
        Manage your account and security.
      </p>
    </div>

    <div className="space-y-1">
      {account.map((item) => (
        <SettingsItem
          key={item.title}
          item={item}
        />
      ))}
    </div>
  </CardWrapper>
);
}