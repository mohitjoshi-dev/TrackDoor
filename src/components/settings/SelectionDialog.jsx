import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function SelectionDialog({ open, onOpenChange, title, value, options, onApply, selectedLabel = "Active" }) {
    
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    if (open) {
      setSelected(value);
    }
  }, [open, value]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                selected === option.id
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Optional Icon */}
                  {option.icon && (
                    <option.icon
                      size={20}
                      className="text-primary"
                    />
                  )}

                  {/* Optional Symbol */}
                  {option.symbol && (
                    <span className="text-xl font-bold">
                      {option.symbol}
                    </span>
                  )}

                  {/* Name + Subtitle */}
                  <div>
                    <p className="font-medium">
                      {option.name}
                    </p>

                    {option.subtitle && (
                      <p className="text-sm text-muted-foreground">
                        {option.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {selected === option.id ? (
                  <span className="text-sm font-medium text-primary">
                    Active
                  </span>
                ) : (
                  option.code && (
                    <span className="text-sm text-muted-foreground">
                      {option.code}
                    </span>
                  )
                )}
              </div>
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
            disabled={selected === value}
            onClick={() => {
              onApply(selected);
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