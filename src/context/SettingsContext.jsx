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
    language: "en",
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    timezone: "Asia/Kolkata",
    // dashboardView: "30d",
  },
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
  const saved = localStorage.getItem("expense-tracker-settings");

  if (!saved) return defaultSettings;

  const parsed = JSON.parse(saved);

  return {
    ...defaultSettings,
    ...parsed,
    preferences: {
      ...defaultSettings.preferences,
      ...parsed.preferences,
    },
    notifications: {
      ...defaultSettings.notifications,
      ...parsed.notifications,
    },
  };
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

const updatePreference = (key, value) => {
  setSettings((prev) => ({
    ...prev,
    preferences: {
      ...prev.preferences,
      [key]: value,
    },
  }));
};

const preferences = settings.preferences;

  return (
    <SettingsContext.Provider
      value={{
        settings,
        preferences,
        updateSetting,
        updatePreference,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}