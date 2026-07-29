import { ReceiptText, TrendingUp, Banknote, Trophy, BarChart2 } from "lucide-react";
import { useTransactions } from "@/context/TransactionsContext";
import ProfileCardWrapper from "./ProfileCardWrapper";

export default function StatisticsCard() {
  const { transactions } = useTransactions();

  const totalTransactions = transactions.length;
  const expenses = transactions.filter((t) => t.type === "expense");
  const averageExpense = expenses.length > 0 ? expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length : 0;
  const largestExpense = expenses.length > 0 ? Math.max(...expenses.map((t) => t.amount)) : 0;

  const categoryTotals = {};
  expenses.forEach((transaction) => {
    categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
  });

  const topCategory = Object.keys(categoryTotals).length > 0 
    ? Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0][0] 
    : "None";
    
  const stats = [
    {
      label: "Total Transactions",
      value: totalTransactions,
      sub: "All time transactions",
      icon: ReceiptText,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-400/10",
    },
    {
      label: "Largest Expense",
      value: `₹${largestExpense.toLocaleString("en-IN")}`,
      sub: "Single transaction",
      icon: Banknote,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-400/10",
    },
    {
      label: "Top Category",
      value: topCategory === "None" ? "None" : topCategory.charAt(0).toUpperCase() + topCategory.slice(1),
      sub: "Most spending in",
      icon: Trophy,
      iconColor: "text-violet-400",
      iconBg: "bg-violet-400/10",
    },
    {
      label: "Average Expense",
      value: `₹${averageExpense.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      sub: "Per transaction",
      icon: TrendingUp,
      iconColor: "text-orange-400",
      iconBg: "bg-orange-400/10",
    },
  ];    

  return (
    <ProfileCardWrapper>
      <div className="flex h-full min-h-100 flex-col">
        {/* Header */}
        <div className="mb-6 flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-slate-400" />
            <h2 className="text-lg font-bold text-white">Financial Statistics</h2>
          </div>
        </div>

        {/* List Content */}
        <div className="flex flex-1 flex-col justify-between">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`group flex items-center justify-between py-4 ${
                  index !== stats.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg}`}>
                    <Icon className={`h-5 w-5 ${item.iconColor}`} />
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{item.value}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </ProfileCardWrapper>
  );
}