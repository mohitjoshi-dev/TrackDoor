export function generateRecommendations({
  savingsRate,
  expenseChange,
  topCategory,
  savings,
  currency,
  formatCurrency,
}) {
  const recommendations = [];

  // 1. Savings Recommendation
  if (savingsRate >= 50) {
    recommendations.push({
      type: "success",
      icon: "piggy-bank",
      accentColor: "emerald",
      backgroundColor: "emerald",
      title: "Excellent Saving Habit",
      description:
        "You're saving over half of your income this month. Keep maintaining this balance.",
    });
  } else if (savingsRate >= 25) {
    recommendations.push({
      type: "good",
      icon: "piggy-bank",
      accentColor: "emerald",
      backgroundColor: "emerald",
      title: "Keep Saving",
      description: `You've saved ${formatCurrency(
        savings,
        currency
      )} this month. Stay consistent.`,
    });
  } else {
    recommendations.push({
      type: "warning",
      icon: "piggy-bank",
      accentColor: "yellow",
      backgroundColor: "yellow",
      title: "Increase Savings",
      description:
        "Try saving at least 20% of your monthly income.",
    });
  }

  // 2. Highest Expense
  if (topCategory?.category) {
    recommendations.push({
      type: "budget",
      icon: "target",
      accentColor: "violet",
      backgroundColor: "violet",
      title: `Reduce ${topCategory.category} Spending`,
      description: `${topCategory.category} is your largest expense category this month.`,
    });
  }

  // 3. Expense Trend
  if (expenseChange < 0) {
    recommendations.push({
      type: "trend",
      icon: "trending-up",
      accentColor: "sky",
      backgroundColor: "sky",
      title: "Great Improvement",
      description: `Your expenses dropped by ${Math.abs(
        Math.round(expenseChange)
      )}% compared to last month.`,
    });
  } else {
    recommendations.push({
      type: "trend",
      icon: "trending-up",
      accentColor: "sky",
      backgroundColor: "sky",
      title: "Watch Your Spending",
      description: `Your expenses increased by ${Math.round(
        expenseChange
      )}% compared to last month.`,
    });
  }

  return recommendations;
}