import { UtensilsCrossed } from "lucide-react";
import useInsights from "@/hooks/useInsights";
import { useSettings } from "@/context/SettingsContext";
import { formatCurrency } from "@/utils/formatCurrency";

export default function InsightSummary() {
const { expenseChange, topCategory } = useInsights();
const { preferences } = useSettings();
const formattedCategory =
  topCategory.category
    .split(" ")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");


  return (
    <div className="space-y-4">
      {/* Headline */}
      <div>
        <h2 className="text-3xl font-bold leading-tight">
        {expenseChange === 0 ? (
            <>
            Your spending{" "}
            <span className="text-emerald-400">
                stayed the same
            </span>
            </>
        ) : (
            <>
            You spent{" "}
            <span
                className={
                expenseChange > 0
                    ? "text-rose-500"
                    : "text-emerald-400"
                }
            >
                {Math.abs(expenseChange).toFixed(0)}%
            </span>{" "}
            {expenseChange > 0 ? "more" : "less"}
            </>
        )}
        </h2>
        <p className="mt-1 text-muted-foreground">
          compared with last month.
        </p>
      </div>
      
      <div className="h-px bg-border" />

      {/* Category */}
      <div className="flex items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
          <UtensilsCrossed className="h-6 w-6 text-orange-400" />
        </div>
        <div>
          <p className="text-muted-foreground">
            Largest expense this month
          </p>
          <h3 className=" text-xl font-semibold text-rose-400">
            {formattedCategory}
          </h3>

          <p className="text-lg font-semibold text-rose-500">
             {formatCurrency(
                topCategory.amount,
                preferences.currency
             )}
          </p>
        </div>
      </div>
    </div>
  );
}