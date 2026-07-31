import { useState, useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AnimationDialog({ open, onOpenChange }) {
const { settings, updateSetting } = useSettings();

const [selectedAnimation, setSelectedAnimation] = useState(settings.animations);
    useEffect(() => {
    if (open) {
        setSelectedAnimation(settings.animations);
    }
    }, [open, settings.animations]);


const options = [
  {
    id: true,
    name: "Enabled",
    icon: "✨",
    description: "Smooth transitions and interface animations.",
  },
  {
    id: false,
    name: "Disabled",
    icon: "⏸️",
    description: "Turn off animations for a static interface.",
  },
];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Choose Animation Preference</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
        { options.map((option) => (
            <button
            key={option.id}
            onClick={() => setSelectedAnimation(option.id)}
            className={`w-full rounded-xl border p-4 text-left transition ${
                selectedAnimation === option.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary"
            }`}
            >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{option.icon}</span>

                  <span>{option.name}</span>
                </div>

                {selectedAnimation === option.id && (
                <span className="text-sm font-medium text-primary">
                    Active
                </span>
                )}
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
                {option.description}
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
          disabled={selectedAnimation === settings.animations}
          onClick={() => {
            updateSetting("animations", selectedAnimation);
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