import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,} from "@/components/ui/dialog";
import { HelpCircle, BookOpen, Bug, Lightbulb,} from "lucide-react";

export default function HelpSupportDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Help & Support
          </DialogTitle>

          <DialogDescription>
            Get help with Smart Expense.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex items-center gap-3 rounded-xl border p-4">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <div>
              <p className="font-medium">Documentation</p>
              <p className="text-sm text-muted-foreground">
                  Coming soon.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Bug className="h-5 w-5 text-red-400" />
            <div>
              <p className="font-medium">Report a Bug</p>
              <p className="text-sm text-muted-foreground">
                Coming soon.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="font-medium">Feature Request</p>
              <p className="text-sm text-muted-foreground">
                Coming soon.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}