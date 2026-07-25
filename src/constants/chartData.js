const chartData = useMemo(() => {
  const now = new Date();

  const filtered = transactions.filter((transaction) => {
    const date = new Date(transaction.date);

    if (isNaN(date.getTime())) return false;

    if (selectedPeriod === "7D") {
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 6);
      return date >= sevenDaysAgo;
    }

    if (selectedPeriod === "30D") {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 29);
      return date >= thirtyDaysAgo;
    }

    return true;
  });

  // 12 Months
  if (selectedPeriod === "12M") {
    const grouped = new Map();

    filtered.forEach((transaction) => {
      const date = new Date(transaction.date);

      const key = date.toLocaleDateString("en-IN", {
        month: "short",
        year: "2-digit",
      });

      if (!grouped.has(key)) {
        grouped.set(key, {
          month: key,
          income: 0,
          expense: 0,
        });
      }

      const current = grouped.get(key);

      if (transaction.type === "income") {
        current.income += Number(transaction.amount);
      } else {
        current.expense += Number(transaction.amount);
      }
    });

    return [...grouped.values()];
  }

  // 7D & 30D
  const grouped = new Map();

  filtered.forEach((transaction) => {
    const date = new Date(transaction.date);

    const key = date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

    if (!grouped.has(key)) {
      grouped.set(key, {
        month: key,
        income: 0,
        expense: 0,
      });
    }

    const current = grouped.get(key);

    if (transaction.type === "income") {
      current.income += Number(transaction.amount);
    } else {
      current.expense += Number(transaction.amount);
    }
  });

  return [...grouped.values()];
}, [transactions, selectedPeriod]);