import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatsCard from "@/components/dashboard/StatsCard";
import MonthlyCard from "@/components/dashboard/MonthlyOverview";
import CategoryCard from "@/components/dashboard/CategoryBreakdown";
import RecentTransaction from "@/components/dashboard/RecentTransaction";
import { Plus } from "lucide-react";
import { stats } from "@/constants/dashboard";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <WelcomeBanner
        greeting="Good Evening"
        username="Mohit"
        description="Track your spending, monitor budgets, and stay on top of your financial goals."
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

      <section className="grid grid-cols-4 gap-6">
        <div className="col-span-2">
          <MonthlyCard />
        </div>

        <CategoryCard />
      </section>

      <section>
        <RecentTransaction />
      </section>
    </div>
  );
}