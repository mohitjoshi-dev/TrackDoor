export function clearAllData() {
  try {
    localStorage.removeItem("transactions");
    localStorage.removeItem("budgets");
    localStorage.removeItem("expense-tracker-settings");

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