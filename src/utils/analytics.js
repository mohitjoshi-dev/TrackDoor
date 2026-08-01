// Total Income
export const getTotalIncome = (transactions = []) => {
  return transactions
    .filter(
      (transaction) =>
        transaction.type?.toLowerCase() === "income"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );
};

// Total Expense
export const getTotalExpense = (transactions = []) => {
  return transactions
    .filter(
      (transaction) =>
        transaction.type?.toLowerCase() === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );
};

// Net Savings
export const getNetSavings = (transactions = []) => {
  return (
    getTotalIncome(transactions) -
    getTotalExpense(transactions)
  );
};

// Savings Rate
export const getSavingsRate = (transactions = []) => {
  const income = getTotalIncome(transactions);

  if (income === 0) return 0;

  return Math.round(
    (getNetSavings(transactions) / income) * 100
  );
};

// Income vs Expense Chart Data
export const getIncomeExpenseData = (transactions = []) => [
  {
    name: "Income",
    amount: getTotalIncome(transactions),
  },
  {
    name: "Expense",
    amount: getTotalExpense(transactions),
  },
];

// Category Spending Data
export const getCategoryExpenseData = (transactions = []) => {
  const categoryTotals = {};

  transactions.forEach((transaction) => {
    if (transaction.type?.toLowerCase() !== "expense") return;

    const category = transaction.category || "Other";

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      Number(transaction.amount || 0);
  });

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));
};

// Monthly Expense Trend (Last 12 Months)
export const getMonthlyExpenseData = (transactions = []) => {
  const today = new Date();
  const months = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth() - i,
      1
    );

    months.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: date.toLocaleString("default", {
        month: "short",
      }),
      amount: 0,
    });
  }

  // Add expenses into the correct month
  transactions.forEach((transaction) => {
    if (transaction.type?.toLowerCase() !== "expense") return;

    const date = new Date(transaction.date);

    if (isNaN(date.getTime())) return;

    const key = `${date.getFullYear()}-${date.getMonth()}`;

    const targetMonth = months.find(
      (month) => month.key === key
    );

    if (targetMonth) {
      targetMonth.amount += Number(transaction.amount || 0);
    }
  });

  return months.map(({ month, amount }) => ({
    month,
    amount,
  }));
};

export const getTransactionCount = (transactions = []) => {
  return transactions.length;
};


/*Largest Expense*/
export const getLargestExpense = (transactions = []) => {
  const expenses = transactions.filter(
    (transaction) =>
      transaction.type?.toLowerCase() === "expense"
  );

  if (expenses.length === 0) return null;

  return expenses.reduce((largest, current) =>
    current.amount > largest.amount ? current : largest
  );
};

/*Average Expense*/
export const getAverageExpense = (transactions = []) => {
  const expenses = transactions.filter(
    (transaction) =>
      transaction.type?.toLowerCase() === "expense"
  );

  if (expenses.length === 0) return 0;

  const total = expenses.reduce(
    (sum, transaction) =>
      sum + Number(transaction.amount || 0),
    0
  );

  return Math.round(total / expenses.length);
};

/*Top Spending Category*/
export const getTopCategory = (transactions = []) => {
  const totals = {};

  transactions.forEach((transaction) => {
    if (transaction.type?.toLowerCase() !== "expense") return;

    const category = transaction.category;

    totals[category] =
      (totals[category] || 0) +
      Number(transaction.amount || 0);
  });

  const entries = Object.entries(totals);

  if (entries.length === 0) return null;

  const [name, amount] = entries.reduce((a, b) =>
    a[1] > b[1] ? a : b
  );

  return {
    name,
    amount,
  };
};

export const getFinancialHealthScore = (
  transactions = [],
  budgets = []
) => {
  if (transactions.length === 0) {
    return null;
  }

  let score = 0;

  // 40 points: Savings Rate
  const savingsRate = getSavingsRate(transactions);

  score += Math.min(
    Math.max(savingsRate, 0),
    40
  );

  // 30 points: Staying within budget
  if (budgets.length > 0) {
    const withinBudget = budgets.filter(
      (budget) => budget.spent <= budget.limit
    ).length;

    score += Math.round(
      (withinBudget / budgets.length) * 30
    );
  }

  // 20 points: Income greater than expenses
  if (
  getTotalIncome(transactions) >
  getTotalExpense(transactions)
  ) {
    score += 20;
  }

  // 10 points: Activity
  score += Math.min(transactions.length, 10);

  return Math.min(score, 100);
};


export const getHealthStatus = (score) => {
  if (score === null) {
    return {
      label: "No Data Available",
      color: "text-muted-foreground",
    };
  }
  
  if (score >= 90)
    return {
      label: "Excellent",
      color: "text-emerald-500",
    };

  if (score >= 75)
    return {
      label: "Good",
      color: "text-cyan-500",
    };

  if (score >= 60)
    return {
      label: "Fair",
      color: "text-yellow-500",
    };

  return {
    label: "Needs Improvement",
    color: "text-red-500",
  };
};