import { Wallet, } from "lucide-react";
import BudgetProgress from "./BudgetProgress";
import { useBudgets } from "@/context/BudgetsContext";
import { useTransactions } from "@/context/TransactionsContext";
import BudgetMonthPicker from "./BudgetMonthPicker";
import { useSettings } from "@/context/SettingsContext";
import { formatCurrency } from "@/utils/formatCurrency";

export default function BudgetSummary({selectedMonth, setSelectedMonth,}) {
  const { preferences } = useSettings();
  const { transactions } = useTransactions();
  const { budgets } = useBudgets();

  // Total budget from all categories
  const totalBudget = budgets.reduce(
    (sum, budget) => sum + budget.limit,
    0
  );

  // Placeholder until transactions are connected
  const totalSpent = transactions
  .filter((transaction) => {
    if (transaction.type?.toLowerCase() !== "expense") {
      return false;
    }

    const date = new Date(transaction.date);

    return (
      date.getMonth() === selectedMonth.getMonth() &&
      date.getFullYear() === selectedMonth.getFullYear()
    );
  })
  .reduce(
    (total, transaction) =>
      total + Number(transaction.amount || 0),
    0
  );

  const remaining = totalBudget - totalSpent;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
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

        <BudgetMonthPicker
          selectedMonth={selectedMonth}
          onChange={setSelectedMonth}
          transactions={transactions}
        />
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-secondary/40 p-5">
          <p className="text-sm text-muted-foreground">
            Total Budget
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {formatCurrency(totalBudget, preferences.currency)}
          </h3>
        </div>

        <div className="rounded-xl bg-secondary/40 p-5">
          <p className="text-sm text-muted-foreground">
            Total Spent
          </p>

          <h3 className="mt-2 text-2xl font-bold text-red-500">
            {formatCurrency(totalSpent, preferences.currency)}
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
            {formatCurrency(remaining, preferences.currency)}
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