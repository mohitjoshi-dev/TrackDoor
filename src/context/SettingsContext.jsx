import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

const defaultSettings = {
  theme: "midnight",
  accentColor: "default",
  animations: true,
  fontSize: "medium",
  density: "comfortable",

  notifications: {
    push: true,
    email: false,
    budget: true,
    expense: true,
    weekly: false,
  },

  preferences: {
    language: "English",
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    timezone: "IST (UTC+5:30)",
    dashboardView: "Monthly",
  },
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("expense-tracker-settings");

    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(
      "expense-tracker-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

const updateSetting = (key, value) => {
  setSettings((prev) => ({
    ...prev,
    [key]: value,
  }));
};

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}