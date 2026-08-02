import { useState } from "react";
import CardWrapper from "@/components/common/CardWrapper";
import SettingsItem from "./SettingsItem";
import { useSettings } from "@/context/SettingsContext";
import SelectionDialog from "@/components/settings/SelectionDialog";

import { LANGUAGES, CURRENCIES, TIMEZONES, DATE_FORMATS, } from "@/constants/preferences";
import { IndianRupee, Languages, Globe, CalendarDays } from "lucide-react";
import { LANGUAGE_LABELS, TIMEZONE_LABELS, CURRENCY_LABELS, DATE_FORMAT_LABELS } from "@/constants/displayMaps";

export default function PreferenceCard() {
  const { settings, preferences, updatePreference } = useSettings();

  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [dateFormatOpen, setDateFormatOpen] = useState(false);

  const preferenceItems = [
  {
    title: "Language",
    subtitle: "Application language",
    value: LANGUAGE_LABELS[preferences.language],
    icon: Languages,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
    key: "language",
  },
  {
    title: "Currency",
    subtitle: "Primary currency",
    value: CURRENCY_LABELS[preferences.currency],
    icon: IndianRupee,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-500",
    key: "currency",
  },
  {
    title: "Time Zone",
    subtitle: "Regional time",
    value: TIMEZONE_LABELS[preferences.timezone],
    icon: Globe,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-500",
    key: "timezone",
  },
  {
    title: "Date Format",
    subtitle: "Preferred format",
    value: DATE_FORMAT_LABELS[preferences.dateFormat],
    icon: CalendarDays,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-500",
    key: "dateFormat",
  },
  // {
  //   title: "Dashboard View",
  //   subtitle: "Default analytics period",
  //   value: DASHBOARD_LABELS[preferences.dashboardView],
  //   icon: LayoutDashboard,
  //   iconBg: "bg-sky-500/20",
  //   iconColor: "text-sky-500",
  //   key: "dashboardView",
  // },
];

  const handlePreferenceClick = (key) => {
  switch (key) {
    case "language":
      setLanguageOpen(true);
      break;

    case "currency":
      setCurrencyOpen(true);
      break;

    case "timezone":
      setTimezoneOpen(true);
      break;

    case "dateFormat":
      setDateFormatOpen(true);
      break;

    // case "dashboardView":
    //   setDashboardOpen(true);
    //   break;

    default:
      break;
  }
};

  return (
    <>
      <CardWrapper>
        <div className="mb-6">
          <h2 className="text-xl font-bold">
            App Preferences
          </h2>

          <p className="text-sm text-muted-foreground">
            Personalize your dashboard experience.
          </p>
        </div>

        <div className="space-y-1">
          {preferenceItems.map((item) => (
            <SettingsItem
              key={item.title}
              item={item}
              onClick={() => handlePreferenceClick(item.key)}
            />
          ))}
        </div>
      </CardWrapper>

          <SelectionDialog
          title="Choose Language"
          open={languageOpen}
          onOpenChange={setLanguageOpen}
          value={preferences.language}
          options={LANGUAGES}
          onApply={(value) =>
            updatePreference("language", value)
          }
        />

        <SelectionDialog
          title="Choose Currency"
          open={currencyOpen}
          onOpenChange={setCurrencyOpen}
          value={preferences.currency}
          options={CURRENCIES}
          onApply={(value) =>
            updatePreference("currency", value)
          }
        />

        <SelectionDialog
          title="Choose Time Zone"
          open={timezoneOpen}
          onOpenChange={setTimezoneOpen}
          value={preferences.timezone}
          options={TIMEZONES}
          onApply={(value) =>
            updatePreference("timezone", value)
          }
        />

        <SelectionDialog
          title="Choose Date Format"
          open={dateFormatOpen}
          onOpenChange={setDateFormatOpen}
          value={preferences.dateFormat}
          options={DATE_FORMATS}
          onApply={(value) =>
            updatePreference("dateFormat", value)
          }
        />

        {/* <SelectionDialog
          title="Choose Dashboard View"
          open={dashboardOpen}
          onOpenChange={setDashboardOpen}
          value={preferences.dashboardView}
          options={DASHBOARD_VIEWS}
          onApply={(value) =>
            updatePreference("dashboardView", value)
          }
        /> */}

    </>
  );
}