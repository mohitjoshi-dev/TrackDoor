import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/context/ThemeContext";
import { TransactionsProvider } from "@/context/TransactionsContext";
import { Toaster } from "sonner";
import { BudgetsProvider } from "@/context/BudgetsContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { NotificationProvider } from "@/context/NotificationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BudgetsProvider>  
    <TransactionsProvider>
      <SettingsProvider>
        <ThemeProvider>
          <NotificationProvider>
        <>
          <App />
          <Toaster richColors position="top-right" />
        </>
          </NotificationProvider>        
        </ThemeProvider>
      </SettingsProvider>  
    </TransactionsProvider>
  </BudgetsProvider>  
  </StrictMode>
);