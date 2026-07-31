import {
  Moon,
  IndianRupee,
  Bell,
  LayoutDashboard,
} from "lucide-react";

import CardWrapper from "../../../components/common/CardWrapper";
import { ChevronRight } from "lucide-react";

export default function PreferenceCard() {

    const preferences = [
  {
    title: "Theme",
    value: "Midnight",
    subtitle: "Application appearance",
    icon: Moon,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-500",
  },
  {
    title: "Currency",
    value: "INR (₹)",
    subtitle: "Default currency",
    icon: IndianRupee,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-500",
  },
  {
    title: "Notifications",
    value: "Enabled",
    subtitle: "Budget alerts",
    icon: Bell,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-500",
  },
  {
    title: "Dashboard",
    value: "Monthly",
    subtitle: "Default view",
    icon: LayoutDashboard,
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-500",
  },
];
   
return (
  <CardWrapper>
        <div className="mb-6">
        <h2 className="text-xl font-bold">
            App Preferences
        </h2>

        <p className="text-sm text-muted-foreground">
            Personalize your dashboard experience.
        </p>
        </div>

        <div className="space-y-1">
            {preferences.map((item) => {
            const Icon = item.icon;

            return (
            <div
                key={item.title}
                className="group flex items-center justify-between rounded-xl px-2 py-5 transition-all duration-300 hover:bg-background/40 cursor-pointer"
            >
                <div className="flex items-center gap-4">
                <div className={`${item.iconBg} rounded-xl p-3`}>
                    <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>

                <div>
                    <p className="font-semibold">
                    {item.title}
                    </p>

                    <p className="text-sm text-muted-foreground">
                    {item.subtitle}
                    </p>
                </div>
            </div>
                <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground/80">
                    {item.value}
                </span>

                <ChevronRight className="h-4 w-4 text-muted-foreground/60 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
        </div>
        );
    })}       
        </div>
  </CardWrapper>
 );
}