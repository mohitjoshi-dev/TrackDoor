import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BudgetProgress from "./BudgetProgress";
import { categoryData } from "@/constants/categoryData";
import { useTransactions } from "@/context/TransactionsContext";

export default function BudgetCard({ budget, onEdit, onDelete }) {
  // Temporary value until transaction calculation is added[cite: 5]
  const { transactions } = useTransactions();
  const spent = transactions
  .filter((transaction) => {
    if (
      transaction.type?.toLowerCase() !== "expense" ||
      !transaction.category
    ) {
      return false;
    }

    return (
      transaction.category.toLowerCase() === budget.category
    );
  })
  .reduce(
    (total, transaction) =>
      total + Number(transaction.amount || 0),
    0
  );

  const remaining = budget.limit - spent;
  const percentageUsed = Math.round((spent / budget.limit) * 100);
  
  // Status badge color logic[cite: 5]
  const getStatusColor = () => {
  if (percentageUsed >= 100) {
    return "bg-red-500/20 text-red-400";
  }

  if (percentageUsed >= 90) {
    return "bg-orange-500/20 text-orange-400";
  }

  return "bg-emerald-500/20 text-emerald-400";
  };

  const getStatusLabel = () => {
  if (percentageUsed >= 100) {
    return "Over Budget";
  }

  if (percentageUsed >= 90) {
    return "At Risk";
  }

  return "On Track";
  };

  const category =
    categoryData.find((c) => c.id === budget.category) ??
    categoryData.find((c) => c.id === "other");

  const Icon = category.icon;
  return (
    <div 
      className="overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
      style={{background: `linear-gradient(135deg, var(--card) 0%, ${category.color}08 100%)`}}>
      {/* Top Accent */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: category.color }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="rounded-xl p-3"
              style={{
                backgroundColor: `${category.color}20`,
              }}
            >
              <Icon
                className="h-6 w-6"
                style={{ color: category.color }}
              />
            </div>

            <div>
              <h3 className="text-xl font-bold">
                {category.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                Monthly Budget
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="rounded-xl bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              ₹{budget.limit.toLocaleString()}
            </div>
            <div className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${getStatusColor()}`}>
              {getStatusLabel()}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <BudgetProgress
            spent={spent}
            limit={budget.limit}
          />
        </div>

        {/* Remaining & Status */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-secondary/40 p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Remaining
            </p>

            <h2
              className={`mt-2 text-xl font-bold ${
                remaining > 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              ₹{Math.max(0, remaining).toLocaleString()}
            </h2>
          </div>

          <div className="rounded-xl bg-secondary/40 p-4 flex flex-col justify-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Status
            </p>

            <p className={`mt-2 text-sm font-bold ${
              percentageUsed >= 100 ? "text-red-400" :
              percentageUsed >= 80 ? "text-orange-400" :
              "text-emerald-400"
            }`}>
              {getStatusLabel()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3 pt-4 border-t border-border/40">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(budget)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => onDelete(budget)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}