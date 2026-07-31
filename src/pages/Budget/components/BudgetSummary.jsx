import { Wallet, TrendingDown, PiggyBank } from "lucide-react";
import BudgetProgress from "./BudgetProgress";
import { useBudgets } from "@/context/BudgetsContext";
import { useTransactions } from "@/context/TransactionsContext";

export default function BudgetSummary() {
  const { transactions } = useTransactions();
  const { budgets } = useBudgets();

  // Total budget from all categories
  const totalBudget = budgets.reduce(
    (sum, budget) => sum + budget.limit,
    0
  );

  // Placeholder until transactions are connected
  const totalSpent = transactions
  .filter(
    (transaction) =>
      transaction.type.toLowerCase() === "expense"
  )
  .reduce(
    (total, transaction) =>
      total + Number(transaction.amount),
    0
  );
  const remaining = totalBudget - totalSpent;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <Wallet className="h-6 w-6 text-primary" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Budget Overview
          </h2>

          <p className="text-sm text-muted-foreground">
            Track your monthly spending
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-secondary/40 p-5">
          <p className="text-sm text-muted-foreground">
            Total Budget
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            ₹{totalBudget.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-xl bg-secondary/40 p-5">
          <p className="text-sm text-muted-foreground">
            Total Spent
          </p>

          <h3 className="mt-2 text-2xl font-bold text-red-500">
            ₹{totalSpent.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-xl bg-secondary/40 p-5">
          <p className="text-sm text-muted-foreground">
            Remaining
          </p>

          <h3
            className={`mt-2 text-2xl font-bold ${
              remaining >= 0
                ? "text-emerald-500"
                : "text-red-500"
            }`}
          >
            ₹{remaining.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mt-8">
        <BudgetProgress
          spent={totalSpent}
          limit={totalBudget}
        />
      </div>
    </div>
  );
}