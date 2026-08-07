import { Wallet, ArrowDownCircle, PiggyBank } from "lucide-react";
import useInsights from "@/hooks/useInsights";
import { formatCurrency } from "@/utils/formatCurrency";
import { useSettings } from "@/context/SettingsContext";
import ChangeBadge from "@/components/common/ChangeBadge";

export default function InsightMetrics() {
  const { preferences } = useSettings();
  const { income, expenses, savings, incomeChange, expenseChange, savingsChange } = useInsights();
  const metrics = [
  {
    icon: Wallet,
    title: "Income",
    value: income,
    change: incomeChange,
    color: "emerald",
    type: "income",
  },
  {
    icon: ArrowDownCircle,
    title: "Expenses",
    value: expenses,
    change: expenseChange,
    color: "rose",
    type: "expense",
  },
  {
    icon: PiggyBank,
    title: "Savings",
    value: savings,
    change: savingsChange,
    color: "sky",
    type: "savings",
  },
];

  return (
    <div className="space-y-3">
      {metrics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-center justify-between"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-xl border
                  ${
                    item.color === "emerald"
                      ? "border-emerald-500/20 bg-emerald-500/10"
                      : item.color === "rose"
                      ? "border-rose-500/20 bg-rose-500/10"
                      : "border-sky-500/20 bg-sky-500/10"
                  }
                `}
              >
                <Icon
                  className={`
                    h-5 w-5
                    ${
                      item.color === "emerald"
                        ? "text-emerald-400"
                        : item.color === "rose"
                        ? "text-rose-400"
                        : "text-sky-400"
                    }
                  `}
                />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  {item.title}
                </p>

                <h4 className="mt-0.5 text-base font-bold leading-none">
                  {formatCurrency(
                    item.value,
                    preferences.currency
                  )}
                </h4>
              </div>
            </div>

            {/* Right */}
            <ChangeBadge
                value={item.change}
                type={item.type}
            />
          </div>
        );
      })}
    </div>
  );
}