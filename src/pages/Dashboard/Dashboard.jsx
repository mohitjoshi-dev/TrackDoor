import WelcomeBanner from "@/pages/Dashboard/components/WelcomeBanner";
import StatsCard from "@/pages/Dashboard/components/StatsCard";
import MonthlyOverview from "@/pages/Dashboard/components/MonthlyOverview";
import CategoryBreakdown from "@/pages/Dashboard/components/CategoryBreakdown";
import RecentTransaction from "@/pages/Dashboard/components/RecentTransaction";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import { useTransactions } from "@/context/TransactionsContext";
import { useSettings } from "@/context/SettingsContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { useAuth } from "@/context/AuthContext";
import { getGreeting } from "@/utils/greeting";

export default function Dashboard() {
const { preferences } = useSettings();
const { profile } = useAuth();
const { transactions } = useTransactions(); 
const greeting = getGreeting();

const stats = useMemo(() => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expenses;

  const savings =
    income > 0 ? Math.round((balance / income) * 100) : 0;

  return [
    {
      id: 1,
      title: "Total Balance",
      value: formatCurrency( balance, preferences.currency),
      subtitle: "Current available balance",
      change: `${savings}% Saved`,
      changeType: savings >= 0 ? "increase" : "decrease",
      color: "cyan",
    },
    {
      id: 2,
      title: "Income",
      value: formatCurrency( income, preferences.currency),
      subtitle: "Total income",
      change: "+100%",
      changeType: "increase",
      color: "emerald",
    },
    {
      id: 3,
      title: "Expenses",
      value: formatCurrency( expenses, preferences.currency),
      subtitle: "Total expenses",
      change: "-100%",
      changeType: "decrease",
      color: "rose",
    },
    {
      id: 4,
      title: "Savings Rate",
      value: `${savings}%`,
      subtitle: "Income saved",
      change: `${balance >= 0 ? "+" : ""}${formatCurrency(balance, preferences.currency)}`,
      changeType: balance >= 0 ? "increase" : "decrease",
      color: "violet",
    },
  ];
}, [transactions, preferences.currency]);

  return (
    <div className="space-y-8">
      <WelcomeBanner
        greeting={`${greeting.emoji} ${greeting.text}`}
        username={profile?.full_name || "User"}
        description={greeting.description}
        buttonText="Add Transaction"
        buttonIcon={Plus}
        onButtonClick={() => console.log("Clicked")}
      />

      <section>
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat) => (
          <StatsCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType}
            color={stat.color}

          />
        ))}
        </div>
      </section>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <MonthlyOverview />
        </div>

        <div className="col-span-1">
          <CategoryBreakdown />
        </div>
      </div>

      <section>
        <RecentTransaction />
      </section>
    </div>
  );
}