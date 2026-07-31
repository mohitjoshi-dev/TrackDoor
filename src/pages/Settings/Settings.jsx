import AppearanceCard from "@/pages/Settings/components/AppearanceCard";
import PreferencesCard from "@/pages/Settings/components/PreferencesCard";
import AccountCard from "@/pages/Settings/components/AccountCard";
import DataCard from "@/pages/Settings/components/DataCard";
import { useSettings } from "@/context/SettingsContext";

export default function Settings() {
const { settings } = useSettings();

console.log(settings);

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