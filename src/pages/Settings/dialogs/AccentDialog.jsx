import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AccentDialog({ open, onOpenChange }) {
const { settings, updateSetting } = useSettings();

const [selectedAccent, setSelectedAccent] = useState(settings.accentColor);
    useEffect(() => {
    if (open) {
        setSelectedAccent(settings.accentColor);
    }
    }, [open, settings.accentColor]);


const colors = [
  {
  id: "default",
  name: "Default",
  class: "bg-gradient-to-r from-cyan-400 to-blue-500",
  description: "Original application accent",
  },
  {
    id: "violet",
    name: "Violet",
    class: "bg-violet-500",
    description: "Modern and vibrant",
  },
  {
    id: "emerald",
    name: "Emerald",
    class: "bg-emerald-500",
    description: "Fresh and calming",
  },
  {
    id: "orange",
    name: "Orange",
    class: "bg-orange-500",
    description: "Energetic and bold",
  },
  {
    id: "rose",
    name: "Rose",
    class: "bg-rose-500",
    description: "Elegant and warm",
  },
  {
    id: "slate",
    name: "Slate",
    class: "bg-slate-500",
    description: "Minimal and neutral",
  },
];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Choose Accent Color</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
        {colors.map((color) => (
            <button
            key={color.id}
            onClick={() => setSelectedAccent(color.id)}
            className={`w-full rounded-xl border p-4 text-left transition ${
                selectedAccent === color.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary"
            }`}
            >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded-full ${color.class}`} />

                  <span>{color.name}</span>
                </div>

                {selectedAccent === color.id && (
                <span className="text-sm font-medium text-primary">
                    Active
                </span>
                )}
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
                {color.description}
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
          disabled={selectedAccent === settings.accentColor}
          onClick={() => {
            updateSetting("accentColor", selectedAccent);
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