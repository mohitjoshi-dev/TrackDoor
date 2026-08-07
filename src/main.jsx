import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { TransactionsProvider } from "@/context/TransactionsContext";
import { Toaster } from "sonner";
import { BudgetsProvider } from "@/context/BudgetsContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { QuickAddProvider } from "@/context/QuickAddContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <ThemeProvider>
          <BudgetsProvider>
            <TransactionsProvider>
              <NotificationProvider>
                <QuickAddProvider>
                <App />
                <Toaster richColors position="top-right" />
                </QuickAddProvider>
              </NotificationProvider>
            </TransactionsProvider>
          </BudgetsProvider>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  </StrictMode>
);