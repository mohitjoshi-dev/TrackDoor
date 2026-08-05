import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/services/profile.service";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditProfileDialog({open, onOpenChange,}) {
  const { user, profile, setProfile } = useAuth();

  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (!profile) return;

    setFullName(profile.full_name || "");
    setCountry(profile.country || "");
    setQuote(profile.quote || "");
  }, [profile]);

  async function handleSave() {
  if (!user) return;

  const { data, error } = await updateProfile(user.id, {
    full_name: fullName,
    country,
    quote,
  });

  if (error) {
    console.error(error);
    return;
  }

  setProfile(data);
  onOpenChange(false);
}

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <Input
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Country
            </label>

            <Input
              value={country}
              onChange={(e) =>
                setCountry(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Quote
            </label>

            <Input
              value={quote}
              onChange={(e) =>
                setQuote(e.target.value)
              }
            />
          </div>

        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}