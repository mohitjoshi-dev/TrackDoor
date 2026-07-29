import ProfileCard from "@/components/profile/ProfileCard";
import FinancialOverview from "@/components/profile/FinancialOverview";
import StatisticsCard from "@/components/profile/StatisticsCard";
import SavingsGoal from "@/components/profile/SavingsGoal";
import PreferencesCard from "@/components/profile/PreferencesCard";
import DataManagementCard from "@/components/profile/DataManagementCard";

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