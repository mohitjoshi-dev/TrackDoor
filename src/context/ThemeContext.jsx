import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ?? "midnight";
  });

  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove("midnight", "light", "amoled");

    // Add current theme
    root.classList.add(theme);

    // Save theme
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setMidnight = () => setTheme("midnight");
  const setLight = () => setTheme("light");
  const setAmoled = () => setTheme("amoled");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        setMidnight,
        setLight,
        setAmoled,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}