import { useMemo } from "react";
import useInsights from "@/hooks/useInsights";
import { useSettings } from "@/context/SettingsContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { generateRecommendations } from "@/utils/aiRecommendations";
import { generateAIReport } from "@/services/aiReportService";

export default function useAIReport() {
  const { income, expenses, savings, expenseChange, topCategory, bestMover,} = useInsights()
  const { preferences } = useSettings();
  const savingsRate =
  income > 0 ? Math.round((savings / income) * 100) : 0;
  const report = useMemo(() => {

  const savingsScore = Math.min(35, savingsRate * 0.45);

const expenseTrendScore =
  expenseChange <= 0
    ? 20
    : Math.max(0, 20 - expenseChange * 0.5);

const expenseRatio =
  income > 0 ? (expenses / income) * 100 : 100;

const spendingScore =
  expenseRatio <= 60
    ? 20
    : Math.max(0, 20 - (expenseRatio - 60) * 0.5);

const positiveSavingsScore =
  savings > 0 ? 10 : 0;

const consistencyScore =
  savingsRate >= 40 ? 10 :
  savingsRate >= 25 ? 6 :
  savingsRate >= 15 ? 3 : 0;

const financialScore = Math.min(
  96,
  Math.round(
    savingsScore +
    expenseTrendScore +
    spendingScore +
    positiveSavingsScore +
    consistencyScore
  )
);

    return {

      executiveSummary: {
        title:
            financialScore >= 85
            ? "Excellent Financial Discipline"
            : financialScore >= 70
            ? "Strong Financial Progress"
            : financialScore >= 50
            ? "Stable Financial Performance"
            : "Room for Improvement",

        summary:
            financialScore >= 85
            ? `You reduced your spending by ${Math.abs(
                Math.round(expenseChange)
                )}% compared to last month while maintaining a ${savingsRate}% savings rate. ${topCategory?.category} remained your highest expense category, but your overall financial health reached ${financialScore}/100.`

            : financialScore >= 70
            ? `Your finances improved this month. Spending changed by ${Math.abs(
                Math.round(expenseChange)
                )}% and you're currently saving ${savingsRate}% of your income.`

            : `Your current savings rate is ${savingsRate}%. Consider reducing spending in ${topCategory?.category} to improve your financial health.`,

        topCategory: topCategory?.category || "No Data",

        savedDifference: formatCurrency(
            Math.abs(savings),
            preferences.currency
        ),
        },
      
      spendingHighlights: {
        highestExpense: {
            category: topCategory?.category || "No Data",
            amount: formatCurrency(topCategory?.amount || 0, preferences.currency),
            percentage: `${topCategory?.percentage || 0}% of total`,
        },
        bestMover: {
            category: bestMover.category,
            change: bestMover.change,
            direction: bestMover.direction,
        },

        totalExpense: formatCurrency(expenses, preferences.currency),
        monthlyDifference: `${Math.abs(expenseChange)}%`,
        monthlyLabel:
            expenseChange < 0 ? "less than last month" : "more than last month",
        },
      
      financialHealth: {
        score: financialScore,

        label:
            financialScore >= 85
            ? "Excellent"
            : financialScore >= 70
            ? "Good"
            : financialScore >= 50
            ? "Fair"
            : "Needs Improvement",

        message:
            financialScore >= 85
            ? "Outstanding! Your finances are in excellent shape."
            : financialScore >= 70
            ? "You're managing your money well. Keep the momentum going."
            : financialScore >= 50
            ? "You're doing okay, but there's room for improvement."
            : "Focus on increasing savings and reducing unnecessary expenses.",
        },

      balanceOverview: {
        income: formatCurrency(income, preferences.currency),
        expenses: formatCurrency(expenses, preferences.currency),
        savings: formatCurrency(savings, preferences.currency),
        savingsRate:
            income > 0
            ? `${Math.round((savings / income) * 100)}%`
            : "0%",
        },
      
        recommendations: generateRecommendations({
        savingsRate,
        expenseChange,
        topCategory,
        savings,
        currency: preferences.currency,
        formatCurrency,
        }),
      
        rawData: {
        income,
        expenses,
        savings,
        savingsRate,
        financialScore,
        expenseChange,
        topCategory,
        bestMover,
        },  
    };      
    }, [income, expenses, savings, expenseChange, topCategory, preferences.currency]);
  return report;
}

