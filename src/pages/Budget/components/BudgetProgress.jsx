import { useSettings } from "@/context/SettingsContext";
import { formatCurrency } from "@/utils/formatCurrency";

export default function BudgetProgress({spent, limit, }) {
  const { preferences } = useSettings();

  const percentage = Math.min((spent / limit) * 100, 100);

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="font-medium">
          {formatCurrency(spent, preferences.currency)}
        </span>

        <span className="text-muted-foreground">
          {formatCurrency(limit, preferences.currency)}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            percentage >= 100
              ? "bg-red-500"
              : percentage >= 80
              ? "bg-yellow-500"
              : "bg-primary"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="flex justify-between text-xs">
        <span>
          {percentage.toFixed(0)}%
        </span>

        <span
          className={
            percentage >= 100
              ? "text-red-500"
              : "text-emerald-500"
          }
        >
          {formatCurrency(
              Math.max(limit-spent,0),
              preferences.currency
          )} Remaining
        </span>
      </div>
    </div>
  );
}