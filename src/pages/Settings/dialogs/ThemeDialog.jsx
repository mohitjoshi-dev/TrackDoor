import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ThemeDialog({ open, onOpenChange }) {
const { settings, updateSetting } = useSettings();

const [selectedTheme, setSelectedTheme] = useState(settings.theme);
    useEffect(() => {
    if (open) {
        setSelectedTheme(settings.theme);
    }
    }, [open, settings.theme]);

const themes = [
  {
    id: "light",
    name: "Light",
    icon: "☀️",
    description: "Bright interface with clean appearance.",
  },
  {
    id: "midnight",
    name: "Midnight",
    icon: "🌙",
    description: "Dark blue interface for comfortable viewing.",
  },
  {
    id: "amoled",
    name: "AMOLED",
    icon: "⚫",
    description: "Pure black interface for OLED displays.",
  },
];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Choose Theme</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
        {themes.map((theme) => (
            <button
            key={theme.id}
            onClick={() => setSelectedTheme(theme.id)}
            className={`w-full rounded-xl border p-4 text-left transition ${
                selectedTheme === theme.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary"
            }`}
            >
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                {theme.icon} {theme.name}
                </h3>

                {selectedTheme === theme.id && (
                <span className="text-sm font-medium text-primary">
                    Active
                </span>
                )}
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
                {theme.description}
            </p>
            </button>
        ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
        <Button
        variant="outline"
        onClick={() => onOpenChange(false)}
        >
        Cancel
        </Button>
        
        <Button
          disabled={selectedTheme === settings.theme}
          onClick={() => {
            updateSetting("theme", selectedTheme);
            onOpenChange(false);
          }}
        >
          Apply
        </Button>
        
        </div>
      </DialogContent>
    </Dialog>
  );
}