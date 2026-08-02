export function importBackup(data) {
  try {
    if (data.transactions) {
      localStorage.setItem(
        "transactions",
        JSON.stringify(data.transactions)
      );
    }

    if (data.budgets) {
      localStorage.setItem(
        "budgets",
        JSON.stringify(data.budgets)
      );
    }

    if (data.settings) {
      localStorage.setItem(
        "expense-tracker-settings",
        JSON.stringify(data.settings)
      );
    }

    return {
      success: true,
    };

  } catch (error) {

    return {
      success: false,
      error,
    };

  }
}