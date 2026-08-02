import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/context/TransactionsContext";
import { useBudgets } from "@/context/BudgetsContext";
import { clearAllData } from "@/services/export/clearDataService";

export default function ClearDataDialog({ open, onOpenChange }) {

const { transactions } = useTransactions();
const { budgets } = useBudgets();    

const handleDelete = () => {
  try {
    const result = clearAllData();

    if (!result.success) {
      throw result.error;
    }

    toast.success("All data deleted successfully.");

    onOpenChange(false);

    window.location.reload();

  } catch (error) {
    console.error(error);

    toast.error("Failed to delete data.");
  }
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px] h-[85vh] flex flex-col overflow-hidden rounded-2xl p-0">
        <DialogHeader className="relative overflow-hidden border-b border-border/50 px-6 py-5">
        <div className="absolute inset-0 bg-linear-to-r from-red-500/10 via-red-500/5 to-transparent" />
        <div className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 shadow-[0_0_35px_rgba(239,68,68,0.18)]">
            <Trash2 className="h-6 w-6 text-red-400" />
            </div>

            <div>

            <DialogTitle className="text-xl font-bold">
                Clear All Data
            </DialogTitle>

            <DialogDescription className="mt-1 text-sm">
                Permanently remove all locally stored expense data.
            </DialogDescription>
            </div>
        </div>

        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                <Trash2 className="h-6 w-6 text-red-400" />
                </div>

                <div>

                <h3 className="text-lg font-semibold text-red-400">
                    This action cannot be undone
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-6">
                    Clearing all data will permanently delete every transaction,
                    budget, and application setting stored on this device.
                </p>
                </div>
                
            </div>
            <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                This will delete
            </h3>

            <div className="grid grid-cols-3 gap-4">

                <div className="rounded-2xl border border-border/60 bg-card/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-400/30">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Transactions
                </p>

                <p className="mt-3 text-3xl font-bold">
                    {transactions.length}
                </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-400/30">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Budgets
                </p>

                <p className="mt-3 text-3xl font-bold">
                    {budgets.length}
                </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/60 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-400/30">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Settings
                </p>

                <p className="mt-3 text-xl font-bold text-red-400">
                    All
                </p>
                </div>

            </div>
            </div>
            </div>
        </div>
                
        <DialogFooter className="relative overflow-hidden border-t border-border/50 px-6 pt-4 pb-8">
        <div className="absolute inset-0 bg-linear-to-r from-red-500/10 via-red-500/5 to-transparent" />
        <div className="relative flex w-full justify-end gap-3">

            <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            >
            Cancel
            </Button>

            <Button
            variant="destructive"
            className="min-w-[180px]"
            onClick={handleDelete}
            >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Everything
            </Button>

        </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}