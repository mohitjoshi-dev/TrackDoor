import { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./SettingsContext";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const { settings } = useSettings();

  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove(
      "midnight",
      "light",
      "amoled",
      
      "accent-blue",
      "accent-violet",
      "accent-emerald",
      "accent-orange",
      "accent-rose",
      "accent-slate",
      
      "no-animations",
      
      "font-small",
      "font-medium",
      "font-large",
      
      "density-compact",
      "density-comfortable",
      "density-spacious",
    
    );

    // Add current theme
    root.classList.add(settings.theme);
    if (settings.accentColor !== "default") {
    root.classList.add(`accent-${settings.accentColor}`);}
    root.classList.add(`font-${settings.fontSize}`);
    root.classList.add(`density-${settings.density}`);
  
    if (!settings.animations) {
      root.classList.add("no-animations");
    }

    // Save theme
  }, [
  settings.theme,
  settings.accentColor,
  settings.animations,
  settings.fontSize,
  settings.density,

  
]);

  return (
    <ThemeContext.Provider
      value={{}}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}