import { useMemo } from "react";
import { Calendar, ChevronDown, Check } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

export default function BudgetMonthPicker({selectedMonth,onChange,transactions = [],}) {
  
  const months = useMemo(() => {
  const uniqueMonths = new Map();

  // Always include current month
  const today = new Date();

  uniqueMonths.set(
    `${today.getFullYear()}-${today.getMonth()}`,
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  transactions.forEach((transaction) => {
    if (!transaction.date) return;

    const date = new Date(transaction.date);

    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (!uniqueMonths.has(key)) {
      uniqueMonths.set(
        key,
        new Date(
          date.getFullYear(),
          date.getMonth(),
          1
        )
      );
    }
  });

  return [...uniqueMonths.values()].sort(
    (a, b) => b - a
  );
}, [transactions]);

const formatMonth = (date) =>
  date.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-xl"
        >
          <Calendar className="h-4 w-4" />

          {formatMonth(selectedMonth)}

          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-56 p-2"
      >
        <h4 className="mb-2 px-2 text-sm font-semibold">
          Select Budget Period
        </h4>

        <div className="space-y-1">
          {months.map((month) => {
            const active =
              month.getMonth() === selectedMonth.getMonth() &&
              month.getFullYear() ===
                selectedMonth.getFullYear();

            return (
              <button
                key={month.toISOString()}
                onClick={() => onChange(month)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-accent ${
                  active ? "bg-accent" : ""
                }`}
              >
                {formatMonth(month)}

                {active && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}