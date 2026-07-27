import { createContext, useContext, useEffect, useState } from "react";
import { initialBudgets } from "@/constants/budgets";

const BudgetsContext = createContext();

export function BudgetsProvider({ children }) {
  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem("budgets");
      return saved ? JSON.parse(saved) : initialBudgets;
    } catch {
      return initialBudgets;
    }
  });

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  // Add Budget
  const addBudget = (budget) => {
    const exists = budgets.some(
      (item) => item.category === budget.category
    );

    if (exists) {
      throw new Error("Budget for this category already exists.");
    }

    setBudgets((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...budget,
      },
    ]);
  };

  // Update Budget
  const updateBudget = (id, updatedBudget) => {
    const duplicate = budgets.some(
      (item) =>
        item.category === updatedBudget.category &&
        item.id !== id
    );

    if (duplicate) {
      throw new Error("Budget for this category already exists.");
    }

    setBudgets((prev) =>
      prev.map((budget) =>
        budget.id === id
          ? { ...budget, ...updatedBudget }
          : budget
      )
    );
  };

  // Delete Budget
  const deleteBudget = (id) => {
    setBudgets((prev) =>
      prev.filter((budget) => budget.id !== id)
    );
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
}

export const useBudgets = () => useContext(BudgetsContext);