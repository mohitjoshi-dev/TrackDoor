import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useBudgets } from "@/context/BudgetsContext";

export default function DeleteBudgetDialog({
  open,
  onOpenChange,
  budget,
}) {
  const { deleteBudget } = useBudgets();

  const handleDelete = () => {
    deleteBudget(budget.id);
    onOpenChange(false);
  };

  if (!budget) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Delete Budget
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to delete the{" "}
            <span className="font-semibold">
              {budget.category}
            </span>{" "}
            budget?

            <br />
            <br />

            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}