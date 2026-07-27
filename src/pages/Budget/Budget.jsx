import { useState } from "react";
import { useBudgets } from "@/context/BudgetsContext";
import BudgetCard from "@/components/budgets/BudgetCard";
import BudgetSummary from "@/components/budgets/BudgetSummary";
import BudgetForm from "@/components/budgets/BudgetForm";
import DeleteBudgetDialog from "@/components/budgets/DeleteBudgetDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function Budget() {
  const { budgets } = useBudgets();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editingBudget, setEditingBudget] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleAdd = () => {
    setEditingBudget(null);
    setFormOpen(true);
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setFormOpen(true);
  };

  const handleDelete = (budget) => {
    setSelectedBudget(budget);
    setDeleteOpen(true);
  };
  return (
  <div className="space-y-6">
    {/* Page Header */}
    <div>
      <h1 className="text-3xl font-bold">
        Budget Management
      </h1>

      <p className="text-muted-foreground">
        Manage your monthly spending limits.
      </p>
    </div>

    {/* Add Budget Button */}
    <div className="flex justify-end">
      <Button onClick={handleAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Budget
      </Button>
    </div>

    {/* Budget Summary */}
    <BudgetSummary />

    {/* Budget Cards */}
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          budget={budget}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>

    {/* Dialogs */}
    <BudgetForm
      open={formOpen}
      onOpenChange={setFormOpen}
      editingBudget={editingBudget}
    />

    <DeleteBudgetDialog
      open={deleteOpen}
      onOpenChange={setDeleteOpen}
      budget={selectedBudget}
    />
  </div>
  );
}