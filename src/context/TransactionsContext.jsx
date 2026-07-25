import { createContext, useContext, useEffect, useState } from "react";
import { recentTransactions } from "@/constants/transactions";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const savedTransactions = localStorage.getItem("transactions");

      return savedTransactions
        ? JSON.parse(savedTransactions)
        : recentTransactions;
    } catch (error) {
      console.warn("Error reading transactions:", error);
      return recentTransactions;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, setTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}