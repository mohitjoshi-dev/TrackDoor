import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ExportCard from "@/components/export/ExportSummary";
import ExportOptions from "@/components/export/ExportOptions";

export default function ExportDialog({
  open,
  onOpenChange,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Added w-[90vw] here to force the dialog to stretch */}
      <DialogContent 
        className="w-[90vw] max-w-4xl p-8 overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-secondary hover:[&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <DialogHeader>
          <DialogTitle>
            Export Data
          </DialogTitle>

          <DialogDescription>
            Securely backup your transactions,
            budgets and application settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <ExportCard />

          <ExportOptions />
        </div>

      </DialogContent>
    </Dialog>
  );
}