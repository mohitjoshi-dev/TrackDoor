import AppearanceCard from "@/components/settings/AppearanceCard";
import PreferencesCard from "@/components/settings/PreferencesCard";
import AccountCard from "@/components/settings/AccountCard";
import DataCard from "@/components/settings/DataCard";

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account and personalize your experience.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
    <AppearanceCard />

    <PreferencesCard />

    <AccountCard />

    <DataCard />
    </div>
    </div>
  );
}