export function getBackupData(
  transactions,
  budgets,
  settings
) {
  return {
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    transactions,
    budgets,
    settings,
  };
}

export function estimateBackupSize(data) {
  return (
    new Blob([JSON.stringify(data)]).size / 1024
  ).toFixed(1);
}

export function downloadJSON(data) {
  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

  link.href = url;
  link.download = `SmartExpense_Backup_${timestamp}.json`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  localStorage.setItem(
    "lastBackup",
    new Date().toISOString()
  );
}

export function downloadCSV(data) {
  const transactions = data.transactions ?? [];

  if (!transactions.length) {
    console.warn("No transactions available.");
    return;
  }

  const headers = [
    "Date",
    "Title",
    "Category",
    "Type",
    "Amount",
    "Notes",
  ];

  const rows = transactions.map((t) => [
    t.date ?? "",
    t.title ?? "",
    t.category ?? "",
    t.type ?? "",
    t.amount ?? "",
    t.notes ?? "",
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

  link.href = url;
  link.download = `SmartExpense_Transactions_${timestamp}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  localStorage.setItem(
    "lastBackup",
    new Date().toISOString()
  );
}