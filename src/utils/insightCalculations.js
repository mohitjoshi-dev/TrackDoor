export function getCurrentMonthTransactions(transactions) {
  const now = new Date();

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    return (
      transactionDate.getMonth() === now.getMonth() &&
      transactionDate.getFullYear() === now.getFullYear()
    );
  });
}

export function getCurrentMonthIncome(transactions) {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);
}

export function getCurrentMonthExpenses(transactions) {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);
}

export function getCurrentMonthSavings(transactions) {
  const income = getCurrentMonthIncome(transactions);
  const expenses = getCurrentMonthExpenses(transactions);

  return income - expenses;
}

export function getPreviousMonthTransactions(transactions) {
  const now = new Date();

  const previousMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const previousYear =
    now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    return (
      transactionDate.getMonth() === previousMonth &&
      transactionDate.getFullYear() === previousYear
    );
  });
}

export function getExpenseChangePercentage(
  currentExpenses,
  previousExpenses
) {
  if (previousExpenses === 0) return 0;

  return (
    ((currentExpenses - previousExpenses) / previousExpenses) * 100
  );
}


export function getTopExpenseCategory(transactions) {
  const categoryTotals = {};

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalExpenses = expenseTransactions.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  expenseTransactions.forEach((transaction) => {
    const category = transaction.category;

    categoryTotals[category] =
      (categoryTotals[category] || 0) + Number(transaction.amount);
  });

  const entries = Object.entries(categoryTotals);

  if (entries.length === 0) {
    return {
      category: "No Expenses",
      amount: 0,
      percentage: 0,
    };
  }

  const [category, amount] = entries.reduce((highest, current) =>
    current[1] > highest[1] ? current : highest
  );

  return {
    category,
    amount,
    percentage:
      totalExpenses > 0
        ? Math.round((amount / totalExpenses) * 100)
        : 0,
  };
}


export function getRecommendation(
  income,
  expenses,
  savings,
  topCategory
) {
  if (income === 0) {
    return {
      title: "Start Tracking",
      message:
        "Add your first income transaction to unlock personalized insights.",
    };
  }

  if (expenses > income) {
    return {
      title: "Overspending",
      message:
        "Your expenses are higher than your income this month.",
    };
  }

  if (savings > income * 0.3) {
    return {
      title: "Great Job!",
      message:
        "You're saving over 30% of your income this month.",
    };
  }

  return {
    title: "Watch Spending",
    message: `Most of your spending is on ${topCategory.category}. Consider reviewing this category to improve your savings.`,
  };
}

export function getPreviousMonthIncome(transactions) {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );
}

export function getPreviousMonthSavings(transactions) {
  const income = getPreviousMonthIncome(transactions);
  const expenses = getCurrentMonthExpenses(transactions);

  return income - expenses;
}

export function getPercentageChange(current, previous) {
  if (previous === 0) return 0;

  return ((current - previous) / previous) * 100;
}

export function getBestMover(currentTransactions, previousTransactions) {
  const currentTotals = {};
  const previousTotals = {};

  currentTransactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      currentTotals[transaction.category] =
        (currentTotals[transaction.category] || 0) +
        Number(transaction.amount);
    });

  previousTransactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      previousTotals[transaction.category] =
        (previousTotals[transaction.category] || 0) +
        Number(transaction.amount);
    });

  const allCategories = new Set([
    ...Object.keys(currentTotals),
    ...Object.keys(previousTotals),
  ]);

  let bestMover = {
    category: "No Data",
    change: 0,
    direction: "No change",
  };

  let largestChange = 0;

  allCategories.forEach((category) => {
    const current = currentTotals[category] || 0;
    const previous = previousTotals[category] || 0;

    if (previous === 0) return;

    const percentage = ((current - previous) / previous) * 100;

    if (Math.abs(percentage) > Math.abs(largestChange)) {
      largestChange = percentage;

      bestMover = {
        category,
        change: `${Math.abs(Math.round(percentage))}%`,
        direction:
          percentage < 0
            ? "Largest decrease"
            : "Largest increase",
      };
    }
  });

  return bestMover;
}