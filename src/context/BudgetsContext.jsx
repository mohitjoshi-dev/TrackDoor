import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import {
  getBudgets,
  addBudget as addBudgetService,
  updateBudget as updateBudgetService,
  deleteBudget as deleteBudgetService,
} from "@/services/budget.service";

const BudgetsContext = createContext();

export function BudgetsProvider({ children }) {
  const [budgets, setBudgets] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function loadBudgets() {
      if (!user) return;

      const { data, error } = await getBudgets(user.id);

      if (error) {
        console.error(error);
        return;
      }

      setBudgets(
        data.map((budget) => ({
          ...budget,
          limit: Number(budget.monthly_limit),
        }))
      );
    }

    loadBudgets();
  }, [user]);

  // Add Budget
  const addBudget = async (budget) => {
  if (!user) return;

  const exists = budgets.some(
    (item) => item.category === budget.category
  );

  if (exists) {
    throw new Error("Budget for this category already exists.");
  }

  const { data, error } = await addBudgetService({
    user_id: user.id,
    category: budget.category,
    monthly_limit: budget.limit,
  });

  if (error) {
    throw new Error(error.message);
  }

  setBudgets((prev) => [
    ...prev,
    {
      ...data,
      limit: Number(data.monthly_limit),
    },
  ]);
};

  // Update Budget
  const updateBudget = async (id, updatedBudget) => {
  const duplicate = budgets.some(
    (item) =>
      item.category === updatedBudget.category &&
      item.id !== id
  );

  if (duplicate) {
    throw new Error("Budget for this category already exists.");
  }

  const { data, error } = await updateBudgetService(id, {
    category: updatedBudget.category,
    monthly_limit: updatedBudget.limit,
  });

  if (error) {
    throw new Error(error.message);
  }

  setBudgets((prev) =>
    prev.map((budget) =>
      budget.id === id
        ? {
            ...data,
            limit: Number(data.monthly_limit),
          }
        : budget
    )
  );
};

  // Delete Budget
  const deleteBudget = async (id) => {
  const { error } = await deleteBudgetService(id);

  if (error) {
    throw new Error(error.message);
  }

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