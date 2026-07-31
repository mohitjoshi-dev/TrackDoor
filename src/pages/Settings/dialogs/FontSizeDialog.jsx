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

const [selectedFontSize, setSelectedFontSize] = useState(settings.fontSize);
    useEffect(() => {
    if (open) {
        setSelectedFontSize(settings.fontSize);
       }
    }, [open, settings.fontSize]);


const options = [
  {
    id: "small",
    name: "Small",
    icon: "🔹",
    description: "Compact text throughout the application.",
  },
  {
    id: "medium",
    name: "Medium",
    icon: "🔸",
    description: "Recommended default font size.",
  },
  {
    id: "large",
    name: "Large",
    icon: "🔶",
    description: "Larger text for improved readability.",
  },
];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Font Size</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
        { options.map((option) => (
            <button
            key={option.id}
            onClick={() => setSelectedFontSize(option.id)}
            className={`w-full rounded-xl border p-4 text-left transition ${
                selectedFontSize === option.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary"
            }`}
            >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{option.icon}</span>

                  <span>{option.name}</span>
                </div>

                {selectedFontSize === option.id && (
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
        disabled={selectedFontSize === settings.fontSize}

        onClick={() => {
        updateSetting("fontSize", selectedFontSize);
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