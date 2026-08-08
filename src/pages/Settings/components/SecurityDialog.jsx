import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShieldCheck, Mail, Lock, CalendarDays } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function SecurityDialog({
  open,
  onOpenChange,
}) {
  const { user, profile } = useAuth();
  const { preferences } = useSettings();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            Security
          </DialogTitle>

          <DialogDescription>
            Your account security information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>Email</span>
            </div>

            <span className="text-green-500 font-medium">
              Verified
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="h-4 w-4 text-slate-400" />
              <span>Authentication</span>
            </div>

            <span>Email & Password</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-4 w-4 text-slate-400" />
              <span>Account Created</span>
            </div>

            <span>
              {profile?.created_at
                ? (() => {
                    const date = new Date(profile.created_at);

                    return preferences.dateFormat === "MM/DD/YYYY"
                        ? date.toLocaleDateString("en-US")
                        : date.toLocaleDateString("en-GB");
                    })()
                : "-"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Current Session</span>

            <span className="text-green-500 font-medium">
              Active
            </span>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}