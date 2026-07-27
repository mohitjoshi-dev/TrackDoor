import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/context/ThemeContext";
import { TransactionsProvider } from "@/context/TransactionsContext";
import { Toaster } from "sonner";
import { BudgetsProvider } from "@/context/BudgetsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BudgetsProvider>  
    <TransactionsProvider>
      <ThemeProvider>
        <>
          <App />
          <Toaster richColors position="top-right" />
        </>
      </ThemeProvider>
    </TransactionsProvider>
  </BudgetsProvider>  
  </StrictMode>
);