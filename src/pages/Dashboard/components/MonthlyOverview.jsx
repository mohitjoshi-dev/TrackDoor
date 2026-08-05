import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { useTransactions } from "@/context/TransactionsContext";
import { useSettings } from "@/context/SettingsContext";
import { formatDate } from "@/utils/formatDate";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function MonthlyOverview() {
  const [selectedPeriod, setSelectedPeriod, ] = useState("30D");
  const { transactions } = useTransactions();
  const { preferences } = useSettings();

  const chartData = useMemo(() => {
    const limit =
      selectedPeriod === "7D"
        ? 7
        : selectedPeriod === "30D"
        ? 30
        : 12;

    const grouped = {};

    transactions.slice(0, limit).forEach((transaction) => {
        let displayDate = transaction.date;

      if (displayDate && (displayDate.includes("T") || displayDate.includes("-"))) {
        const dateObj = new Date(displayDate);
        if (!isNaN(dateObj.getTime())) {
          displayDate = formatDate(
            dateObj,
            preferences.dateFormat,
            preferences.timezone
          );
        }
      }

      if (!grouped[displayDate]) {
        grouped[displayDate] = { month: displayDate, income: 0, expense: 0 };
      }

      if (transaction.type === "income") {
        grouped[displayDate].income += Number(transaction.amount);
      } else if (transaction.type === "expense") {
        grouped[displayDate].expense += Number(transaction.amount);
      }
    });

    return Object.values(grouped);
  }, [transactions, selectedPeriod]);

  return (
    <Card className="flex h-full w-full flex-col rounded-2xl border border-border bg-card/70 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Monthly Overview
        </CardTitle>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod("30D")}
            className={`rounded-lg px-3 py-1 text-sm transition-all duration-300 ease-out ${
              selectedPeriod === "30D"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            30D
          </button>

          <button
            onClick={() => setSelectedPeriod("7D")}
            className={`rounded-lg px-3 py-1 text-sm transition-all duration-300 ease-out ${
              selectedPeriod === "7D"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            7D
          </button>

          <button
            onClick={() => setSelectedPeriod("12M")}
            className={`rounded-lg px-3 py-1 text-sm transition-all duration-300 ease-out ${
              selectedPeriod === "12M"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            12M
          </button>
        </div>
      </CardHeader>

      <div className="mb-4 flex gap-5 px-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
          <span className="text-muted-foreground">Income</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-rose-500"></div>
          <span className="text-muted-foreground">Expenses</span>
        </div>
      </div>

      <CardContent className="flex-1 min-h-75 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--color-border)"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="month"
              stroke="var(--color-muted-foreground)"
              tickLine={false}
              axisLine={false}
              padding={{ left: 35, right: 35 }}
              tickMargin={11}
            />

            <YAxis
              stroke="var(--color-muted-foreground)"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
              
            />

            <Tooltip
              cursor={{ stroke: "var(--color-primary)", strokeWidth: 1 }}
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                color: "var(--color-popover-foreground)",
                boxShadow: "0 8px 25px rgba(0,0,0,.15)",
              }}
            />
            <Line
              type="monotoneX" 
              dataKey="income"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              animationDuration={500}
              animationEasing="ease-in-out"
              strokeLinecap="round"
              activeDot={{
                r: 8,
                stroke: "var(--color-background)",
                strokeWidth: 2,
                fill: "#10b981",
              }}
            />

            <Line
              type="monotoneX" 
              dataKey="expense"
              stroke="#f43f5e"
              strokeWidth={3}
              dot={false}
              strokeLinecap="round"
              activeDot={{
                r: 8,
                stroke: "var(--color-background)",
                strokeWidth: 2,
                fill: "#f43f5e",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}