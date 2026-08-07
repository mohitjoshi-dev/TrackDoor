import { useMemo } from "react";
import { useTransactions } from "@/context/TransactionsContext";
import { getCurrentMonthTransactions, getCurrentMonthIncome, getCurrentMonthExpenses, getCurrentMonthSavings, getPreviousMonthTransactions, getExpenseChangePercentage, 
         getTopExpenseCategory, getRecommendation, getPreviousMonthIncome, getPreviousMonthSavings, getPercentageChange, getBestMover,} from "@/utils/insightCalculations";


export default function useInsights() {
    const { transactions } = useTransactions();

    const currentMonthTransactions = useMemo(() => {
    return getCurrentMonthTransactions(transactions);
    }, [transactions]);

    const previousMonthTransactions = useMemo(() => {
    return getPreviousMonthTransactions(transactions);
    }, [transactions]);

    const previousExpenses = useMemo(() => {
    return getCurrentMonthExpenses(previousMonthTransactions);
    }, [previousMonthTransactions]);

    const previousIncome = useMemo(() => {
    return getPreviousMonthIncome(previousMonthTransactions);
    }, [previousMonthTransactions]);

    const previousSavings = useMemo(() => {
    return getPreviousMonthSavings(previousMonthTransactions);
    }, [previousMonthTransactions]);

    const income = useMemo(() => {
    return getCurrentMonthIncome(currentMonthTransactions);
    }, [currentMonthTransactions]);

    const expenses = useMemo(() => {
    return getCurrentMonthExpenses(currentMonthTransactions);
    }, [currentMonthTransactions]);

    const savings = useMemo(() => {
    return getCurrentMonthSavings(currentMonthTransactions);
    }, [currentMonthTransactions]);

    const incomeChange = useMemo(() => {
    return getPercentageChange(
      income,
      previousIncome
    );
    }, [income, previousIncome]);

    const expenseChange = useMemo(() => {
    return getPercentageChange(
      expenses,
      previousExpenses
    );
    }, [expenses, previousExpenses]);

    const savingsChange = useMemo(() => {
    return getPercentageChange(
      savings,
      previousSavings
    );
  }, [savings, previousSavings]);


    const topCategory = useMemo(() => {
    return getTopExpenseCategory(currentMonthTransactions);
    }, [currentMonthTransactions]);

    const bestMover = useMemo(() => {
    return getBestMover(
      currentMonthTransactions,
      previousMonthTransactions
      );
    }, [currentMonthTransactions, previousMonthTransactions]);

    const recommendation = useMemo(() => {
    return getRecommendation(income, expenses, savings, topCategory);
    }, [income, expenses, savings, topCategory]);

  return { currentMonthTransactions, income, expenses, savings, previousExpenses, expenseChange, topCategory, recommendation, incomeChange, savingsChange, bestMover,};
}