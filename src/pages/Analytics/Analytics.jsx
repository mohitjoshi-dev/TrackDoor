import {
  Wallet,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Receipt,
  ShoppingBag,
  Landmark,
  BadgeIndianRupee,
} from "lucide-react";

import { useTransactions } from "@/context/TransactionsContext";
import { useBudgets } from "@/context/BudgetsContext";
import SummaryCard from "@/components/analytics/SummaryCard";
import {
  getTotalIncome,
  getTotalExpense,
  getNetSavings,
  getSavingsRate,
  getIncomeExpenseData,
  getCategoryExpenseData,
  getMonthlyExpenseData,
  getTransactionCount,
  getLargestExpense,
  getAverageExpense,
  getTopCategory,
  getFinancialHealthScore,
  getHealthStatus,
} from "@/utils/analytics";

import IncomeExpenseChart from "@/components/analytics/IncomeExpenseChart";
import CategoryPieChart from "@/components/analytics/CategoryPieChart";
import MonthlyTrendChart from "@/components/analytics/MonthlyTrendChart";
import InsightCard from "@/components/analytics/InsightCard";
import { useNavigate } from "react-router-dom";
import HealthScoreCard from "@/components/analytics/HealthScoreCard";

export default function Analytics() {

const { budgets } = useBudgets();
const { transactions } = useTransactions();
const navigate = useNavigate();
const totalIncome = getTotalIncome(transactions);
const totalExpense = getTotalExpense(transactions);
const netSavings = getNetSavings(transactions);
const savingsRate = getSavingsRate(transactions);
const chartData = getIncomeExpenseData(transactions);
const categoryChartData =
  getCategoryExpenseData(transactions);

const monthlyData = getMonthlyExpenseData(transactions);
const transactionCount =
  getTransactionCount(transactions);

const largestExpense =
  getLargestExpense(transactions);

const averageExpense =
  getAverageExpense(transactions);

const topCategory =
  getTopCategory(transactions);

const healthScore = getFinancialHealthScore(
  transactions,
  budgets
);

const healthStatus =
  getHealthStatus(healthScore);  

  return (
  <div className="space-y-8">
    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        Analytics
      </h1>

      <p className="mt-1 text-muted-foreground">
        Understand your spending habits and financial health.
      </p>
    </div>

    <HealthScoreCard
      score={healthScore}
      status={healthStatus}
    />
    
    {/* Summary Cards */}
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Income"
        value={`₹${totalIncome.toLocaleString()}`}
        icon={Wallet}
        color="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />

      <SummaryCard
        title="Total Expense"
        value={`₹${totalExpense.toLocaleString()}`}
        icon={CreditCard}
        color="text-red-500"
        bgColor="bg-red-500/10"
      />

      <SummaryCard
        title="Net Savings"
        value={`₹${netSavings.toLocaleString()}`}
        icon={PiggyBank}
        color="text-cyan-500"
        bgColor="bg-cyan-500/10"
      />

      <SummaryCard
        title="Savings Rate"
        value={`${savingsRate}%`}
        icon={TrendingUp}
        color="text-violet-500"
        bgColor="bg-violet-500/10"
      />
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      <IncomeExpenseChart
        data={chartData}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />

      <CategoryPieChart
        data={categoryChartData}
      />
    </div>
    <div className="mt-6">
      <MonthlyTrendChart
        data={monthlyData}
      />
    </div>

    <div className="space-y-6">

    <div>
      <h2 className="text-2xl font-bold">
        Financial Insights
      </h2>

      <p className="text-muted-foreground">
        Quick insights from your transactions.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <InsightCard
        title="Top Category"
        value={topCategory?.name || "N/A"}
        subtitle={
          topCategory
            ? `₹${topCategory.amount.toLocaleString()}`
            : "No expenses yet"
        }
        icon={ShoppingBag}
        color="text-orange-500"
        bgColor="bg-orange-500/10"
        onClick={() => {
        if (topCategory) {
          navigate(`/transactions?category=${topCategory.name}`);
        }
        }}
      />

      <InsightCard
        title="Largest Expense"
        value={
          largestExpense
            ? `₹${largestExpense.amount.toLocaleString()}`
            : "₹0"
        }
        subtitle={
          largestExpense?.title || "No expenses"
        }
        icon={Landmark}
        color="text-red-500"
        bgColor="bg-red-500/10"
        onClick={() => {
        if (largestExpense) {
          navigate(`/transactions?search=${largestExpense.title}`);
        }
        }}
      />

      <InsightCard
        title="Average Expense"
        value={`₹${averageExpense.toLocaleString()}`}
        subtitle="Per expense transaction"
        icon={BadgeIndianRupee}
        color="text-cyan-500"
        bgColor="bg-cyan-500/10"
        onClick={() =>
        navigate("/transactions?type=expense")
         }
      />

      <InsightCard
        title="Transactions"
        value={transactionCount}
        subtitle="Recorded transactions"
        icon={Receipt}
        color="text-violet-500"
        bgColor="bg-violet-500/10"
        onClick={() => navigate("/transactions")}
      />

    </div>
  </div>
  </div>
);
}