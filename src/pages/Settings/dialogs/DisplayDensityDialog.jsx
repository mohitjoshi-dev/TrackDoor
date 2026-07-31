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

const [selectedDensity, setselectedDensity] = useState(settings.density);
    useEffect(() => {
    if (open) {
        setselectedDensity(settings.density);
       }
    }, [open, settings.density]);


const options = [
  {
    id: "compact",
    name: "Compact",
    icon: "📦",
    description: "Reduced spacing to fit more content.",
  },
  {
    id: "comfortable",
    name: "Comfortable",
    icon: "📋",
    description: "Balanced spacing for everyday use.",
  },
  {
    id: "spacious",
    name: "Spacious",
    icon: "🪟",
    description: "Extra spacing for a cleaner layout.",
  },
];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Display Density</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
        { options.map((option) => (
            <button
            key={option.id}
            onClick={() => setselectedDensity(option.id)}
            className={`w-full rounded-xl border p-4 text-left transition ${
                selectedDensity === option.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary"
            }`}
            >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{option.icon}</span>

                  <span>{option.name}</span>
                </div>

                {selectedDensity === option.id && (
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
        disabled={selectedDensity === settings.density}

        onClick={() => {
        updateSetting("density", selectedDensity);
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