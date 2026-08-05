import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/services/profile.service";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditGoalDialog({ open, onOpenChange, goal, onSave, }) {
  const [value, setValue] = useState("");
  const { user, profile, setProfile } = useAuth();

  useEffect(() => {
    setValue(goal ? String(goal) : "");
  }, [goal, open]);

  const handleSave = async () => {
  const amount = Number(value);

  if (!amount || amount <= 0 || !user) return;

  const { data, error } = await updateProfile(user.id, {
    savings_goal: amount,
  });

  if (error) {
    console.error(error);
    return;
  }

  setProfile(data);
  onSave(amount);
  onOpenChange(false);
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Savings Goal</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Enter savings goal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleSave}>
              Save Goal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}