import ProfileCardWrapper from "@/components/profile/ProfileCardWrapper";
import SettingsItem from "./SettingsItem";
import {
  Moon,
  Palette,
  Smartphone,
  Sparkles,
  Type,
  LayoutGrid,
  EyeOff,
} from "lucide-react";

export default function AppearanceCard() {
  const appearance = [
    {
      title: "Theme",
      subtitle: "Application appearance",
      value: "Midnight",
      icon: Moon,
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-500",
      action: "theme",
    },
    {
      title: "Accent Color",
      subtitle: "Primary interface color",
      value: "Blue",
      icon: Palette,
      iconBg: "bg-sky-500/20",
      iconColor: "text-sky-500",
      action: "accent",
    },
    {
      title: "AMOLED Mode",
      subtitle: "Pure black interface",
      value: "Off",
      icon: Smartphone,
      iconBg: "bg-neutral-500/20",
      iconColor: "text-neutral-300",
      action: "amoled",
    },
    {
      title: "Animations",
      subtitle: "Enable interface animations",
      value: "Enabled",
      icon: Sparkles,
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-500",
      action:"animations",  
    },
    {
      title: "Font Size",
      subtitle: "Adjust application font size",
      value: "Medium",
      icon: Type,
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-500",
      action: "font size"
    },
    {
      title: "Display Density",
      subtitle: "Adjust UI spacing",
      value: "Comfortable",
      icon: LayoutGrid,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-500",
      action: "display density",
    },
    {
      title: "Reduce Motion",
      subtitle: "Minimize interface animations",
      value: "Off",
      icon: EyeOff,
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-500",
      action: "reduce motion"
    },
  ];

const handleSettingClick = (action) => {
  switch (action) {
    case "theme":
      console.log("Open Theme Dialog");
      break;

    case "accent":
      console.log("Open Accent Picker");
      break;

    case "amoled":
      console.log("Toggle AMOLED");
      break;

    case "animations":
      console.log("Toggle Animations");
      break;

    case "font":
      console.log("Open Font Size");
      break;

    case "density":
      console.log("Open Density");
      break;

    case "motion":
      console.log("Toggle Reduce Motion");
      break;

    default:
      break;
  }
};

  return (
    <ProfileCardWrapper>
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight">Appearance</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Customize the look and feel of your application.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {appearance.map((item) => (
          <SettingsItem
            key={item.title}
            item={item}
            onClick={() => handleSettingClick(item.action)}
          />
        ))}
      </div>
    </ProfileCardWrapper>
  );
}