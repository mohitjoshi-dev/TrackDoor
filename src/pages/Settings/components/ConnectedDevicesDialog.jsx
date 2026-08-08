import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Monitor, Globe, Laptop, CheckCircle2 } from "lucide-react";

export default function ConnectedDevicesDialog({
  open,
  onOpenChange,
}) {
  const browser = (() => {
    const ua = navigator.userAgent;

    if (ua.includes("Chrome")) return "Google Chrome";
    if (ua.includes("Firefox")) return "Mozilla Firefox";
    if (ua.includes("Edge")) return "Microsoft Edge";
    if (ua.includes("Safari")) return "Safari";

    return "Unknown Browser";
  })();

  const platform = navigator.platform;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-blue-500" />
            Connected Devices
          </DialogTitle>

          <DialogDescription>
            Manage your active session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">

          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              Browser
            </div>

            <span>{browser}</span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Laptop className="h-4 w-4 text-muted-foreground" />
              Platform
            </div>

            <span>{platform}</span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Status
            </div>

            <span className="font-medium text-green-500">
              Current Session
            </span>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}