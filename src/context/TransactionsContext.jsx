import { useAuth } from "@/context/AuthContext";
import { getTransactions, addTransaction as addTransactionService, updateTransaction as updateTransactionService, 
         deleteTransaction as deleteTransactionService,} from "@/services/transaction.service";

import { createContext, useContext, useEffect, useState } from "react";
import { recentTransactions } from "@/constants/transactions";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function loadTransactions() {
      if (!user) return;

      const { data, error } = await getTransactions(user.id);

      if (error) {
        console.error(error);
        return;
      }

      setTransactions(
        data.map((transaction) => ({
          ...transaction,
          date: transaction.transaction_date,
          notes: transaction.description,
        }))
      );
    }

    loadTransactions();
  }, [user]);

  // Add Transaction
  const addTransaction = async (transaction) => {
    console.log("Logged in user:", user);
    console.log("User ID being sent:", user.id);
    console.log("Transaction:", transaction);

    if (!user) return;

    const { data, error } = await addTransactionService({
      user_id: user.id,
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      transaction_date: transaction.date,
      description: transaction.notes,
    });

    if (error) {
      console.error("Supabase Error:", error);
      alert(JSON.stringify(error, null, 2));
      return;
    }

    setTransactions((prev) => [
      {
        ...data,
        date: data.transaction_date,
        notes: data.description,
      },
      ...prev,
    ]);
  };

  // Update Transaction
  const updateTransaction = async (id, updatedTransaction) => {
  const { data, error } = await updateTransactionService(id, {
    title: updatedTransaction.title,
    amount: updatedTransaction.amount,
    type: updatedTransaction.type,
    category: updatedTransaction.category,
    transaction_date: updatedTransaction.date,
    description: updatedTransaction.notes,
  });

  if (error) {
    console.error(error);
    return;
  }

  setTransactions((prev) =>
    prev.map((transaction) =>
      transaction.id === id
    ? {
        ...data,
        date: data.transaction_date,
        notes: data.description,
      }
    : transaction
      )
    );
  };

  // Delete Transaction
  const deleteTransaction = async (id) => {
  const { error } = await deleteTransactionService(id);

  if (error) {
    console.error(error);
    return;
  }

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