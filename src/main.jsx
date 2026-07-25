import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/context/ThemeContext";
import { TransactionsProvider } from "@/context/TransactionsContext";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TransactionsProvider>
      <ThemeProvider>
        <>
          <App />
          <Toaster richColors position="top-right" />
        </>
      </ThemeProvider>
    </TransactionsProvider>
  </StrictMode>
);