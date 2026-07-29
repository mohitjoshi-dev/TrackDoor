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

  // Add Transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      {
        id: Date.now(),
        ...transaction,
      },
      ...prev,
    ]);
  };

  // Update Transaction
  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              ...updatedTransaction,
            }
          : transaction
      )
    );
  };

  // Delete Transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
} 