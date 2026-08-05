import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import { useTransactions } from "@/context/TransactionsContext";
import { useSettings } from "@/context/SettingsContext";
import { formatCurrency } from "@/utils/formatCurrency";

export default function CategoryBreakdown() {
  
  const { transactions } = useTransactions();
  const { preferences } = useSettings();

   const categoryData = useMemo(() => {
    const colors = {
      Food: "#22c55e",
      Shopping: "#06b6d4",
      Bills: "#8b5cf6",
      Travel: "#f59e0b",
      Others: "#ef4444",
    };

    const grouped = {};

    transactions.forEach((transaction) => {
      if (transaction.type !== "expense") return;

      const category = transaction.category
        ? transaction.category.charAt(0).toUpperCase() +
          transaction.category.slice(1).toLowerCase()
        : "Others";

      grouped[category] =
        (grouped[category] || 0) + Number(transaction.amount);
    });

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
      color: colors[name] || "#94a3b8",
    }));
  }, [transactions, preferences.currency]);

  const totalExpense = useMemo(() => {
    return categoryData.reduce(
      (sum, item) => sum + Number(item.value),
      0
    );
  }, [categoryData]);

  return (
    <Card className="flex h-full w-full flex-col rounded-2xl border border-border bg-card/70 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Category Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-8">
        
        {/* TOP: Pie Chart */}
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={3}
                cornerRadius={8}
                stroke="none"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                fill="var(--color-foreground)"
                fontSize="24"
                fontWeight="700"
              >
                {formatCurrency(totalExpense, preferences.currency)}
              </text>
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                fill="var(--color-muted-foreground)"
                className="text-sm"
              >
                Expenses
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BOTTOM: Breakdown List */}
        <div className="flex-1 space-y-3">
          {categoryData.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {category.name}
                </span>
              </div>

              <span className="text-sm font-medium text-foreground">
                {formatCurrency(category.value, preferences.currency)}
              </span>
            </div>
          ))}
        </div>
        
      </CardContent>
    </Card>
  );
}