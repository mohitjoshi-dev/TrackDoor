import CardWrapper from "@/components/common/CardWrapper";
import { useSettings } from "@/context/SettingsContext";
import { useState } from "react";
import SettingsItem from "./SettingsItem";
import AccentDialog from "../dialogs/AccentDialog";
import FontSizeDialog from "../dialogs/FontSizeDialog";
import DisplayDensityDialog from "../dialogs/DisplayDensityDialog";
import {
  Moon,
  Palette,
  Sparkles,
  Type,
  LayoutGrid,
} from "lucide-react";
import ThemeDialog from "../dialogs/ThemeDialog";
import AnimationDialog from "../dialogs/AnimationDialog";

export default function AppearanceCard() {
const { settings } = useSettings();
const [themeDialogOpen, setThemeDialogOpen] = useState(false);
const [accentDialogOpen, setAccentDialogOpen] = useState(false);
const [animationDialogOpen, setAnimationDialogOpen] = useState(false);
const [fontDialogOpen, setFontDialogOpen] = useState(false);
const [densityDialogOpen, setDensityDialogOpen] = useState(false);

  const appearance = [
    {
      title: "Theme",
      subtitle: "Application appearance",
      value: settings.theme,
      icon: Moon,
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-500",
      key: "theme",
    },
    {
      title: "Accent Color",
      subtitle: "Primary interface color",
      value: settings.accentColor,
      icon: Palette,
      iconBg: "bg-sky-500/20",
      iconColor: "text-sky-500",
      key: "accent",
    },
    {
      title: "Animations",
      subtitle: "Enable interface animations",
      value: settings.animations ? "Enabled" : "Disabled",
      icon: Sparkles,
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-500",
      key:"animations",  
    },
    {
      title: "Font Size",
      subtitle: "Adjust application font size",
      value: settings.fontSize,
      icon: Type,
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-500",
      key: "font"
    },
    {
      title: "Display Density",
      subtitle: "Adjust UI spacing",
      value: settings.density,
      icon: LayoutGrid,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-500",
      key: "density",
    },
  ];

const handleSettingClick = (key) => {
  if (key === "theme") {
    setThemeDialogOpen(true);
  }
  if (key === "accent") {
    setAccentDialogOpen(true);
  }
  if (key === "animations") {
  setAnimationDialogOpen(true);
  }
  if (key === "font") {
  setFontDialogOpen(true);
  }
  if (key === "density") {
  setDensityDialogOpen(true);
  }
};

  return (
    <CardWrapper>
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
            onClick={() => handleSettingClick(item.key)}
          />
        ))}
      </div>
        <ThemeDialog
          open={themeDialogOpen}
          onOpenChange={setThemeDialogOpen}
        />

        <AccentDialog
          open={accentDialogOpen}
          onOpenChange={setAccentDialogOpen}
        />

        <AnimationDialog
          open={animationDialogOpen}
          onOpenChange={setAnimationDialogOpen}
        />

        <FontSizeDialog
          open={fontDialogOpen}
          onOpenChange={setFontDialogOpen}
        />

        <DisplayDensityDialog
          open={densityDialogOpen}
          onOpenChange={setDensityDialogOpen}
        />

    </CardWrapper>
  );
}