import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  PiggyBank,
} from "lucide-react";

import { useTransactions } from "@/context/TransactionsContext";
import CardWrapper from "../../../components/common/CardWrapper";
import { useSettings } from "@/context/SettingsContext";
import { formatCurrency } from "@/utils/formatCurrency";

export default function FinancialOverview() {

const { preferences } = useSettings();
const { transactions } = useTransactions();
const totalIncome = transactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpense = transactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

const netSavings = totalIncome - totalExpense;

const savingsRate =
  totalIncome > 0
    ? ((netSavings / totalIncome) * 100).toFixed(1)
    : 0;

const overview = [
  {
    title: "Total Income",
    value: formatCurrency(totalIncome, preferences.currency),
    trend: "▲ +12.5%",
    trendText: " vs last month",
    trendColor: "text-emerald-500",
    icon: ArrowDownCircle,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-500",
  },
  {
    title: "Total Expenses",
    value: formatCurrency(totalExpense, preferences.currency),
    trend: "▼ +8.2%",
    trendText: " vs last month",
    trendColor: "text-rose-500",
    icon: ArrowUpCircle,
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-500",
  },
  {
    title: "Net Savings",
    value: formatCurrency(netSavings, preferences.currency),
    trend: "▲ +18.7%",
    trendText: " vs last month",
    trendColor: "text-emerald-500",
    icon: Wallet,
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-500",
  },
  {
    title: "Savings Rate",
    value: `${savingsRate}%`,
    trend: "▲ +4.3%",
    trendText: " vs last month",
    trendColor: "text-emerald-500",
    icon: PiggyBank,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-500",
  },
];

  return (
   <CardWrapper>

    <div className="mb-6 flex items-start justify-between">
    <div>
        <h2 className="text-xl font-bold">Financial Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
        Your financial health at a glance.
        </p>
    </div>

    <div className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
        This Month
    </div>
    </div>

    <div className="grid gap-5 sm:grid-cols-2">
  {overview.map((item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.title}
        className="group rounded-2xl border border-border bg-linear-to-br from-background to-background/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl "
      >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-muted-foreground">
                {item.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                {item.value}
                </h3>

                <p className="mt-2 text-xs">
                    <span className={`font-medium ${item.trendColor}`}>{item.trend}</span>
                    <span className="text-muted-foreground/80">{item.trendText}</span>
                </p>
            </div>
            
            <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}
            >
            <Icon className={`h-6 w-6 ${item.iconColor}`} />
            </div>
            </div>
        </div>
        );
        })}
      </div>
    </CardWrapper>
  ); 
}