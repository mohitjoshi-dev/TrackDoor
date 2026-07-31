import ProfileCard from "@/pages/Profile/components/ProfileCard";
import FinancialOverview from "@/pages/Profile/components/FinancialOverview";
import StatisticsCard from "@/pages/Profile/components/StatisticsCard";
import SavingsGoal from "@/pages/Profile/components/SavingsGoal";
import PreferencesCard from "@/pages/Profile/components/PreferencesCard";
import DataManagementCard from "@/pages/Profile/components/DataManagementCard";

export default function Profile() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account and view your financial overview.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-2">
        <ProfileCard />
        <FinancialOverview />

        <StatisticsCard />
        <SavingsGoal />

        <PreferencesCard />
        <DataManagementCard />
      </div>
    </div>
  );
}