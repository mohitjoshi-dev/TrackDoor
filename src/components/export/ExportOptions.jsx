import { useState } from "react";
import {
  FileJson,
  FileSpreadsheet,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTransactions } from "@/context/TransactionsContext";
import { useBudgets } from "@/context/BudgetsContext";
import { useSettings } from "@/context/SettingsContext";
import { getBackupData, downloadJSON, downloadCSV } from "@/services/export/exportService";

export default function ExportOptions() {
  const [format, setFormat] = useState("json");
  const { transactions } = useTransactions();
  const { budgets } = useBudgets();
  const { settings } = useSettings();

  const handleExport = () => {
    const data = getBackupData(
      transactions,
      budgets,
      settings
    );

    // Conditional logic to handle the selected format
    if (format === "json") {
      downloadJSON(data);
    } else if (format === "csv") {
      downloadCSV(data);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Export Options
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Choose the format for your backup.
        </p>
      </div>

      {/* Format Cards */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* JSON */}
        <button
          onClick={() => setFormat("json")}
          className={`rounded-xl border p-5 text-left transition-all ${
            format === "json"
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
        >
          <FileJson className="mb-3 h-7 w-7 text-primary" />

          <h3 className="font-semibold">
            JSON Backup
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Complete backup including transactions,
            budgets and settings.
          </p>
        </button>

        {/* CSV */}
        <button
          onClick={() => setFormat("csv")}
          className={`rounded-xl border p-5 text-left transition-all ${
            format === "csv"
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
        >
          <FileSpreadsheet className="mb-3 h-7 w-7 text-primary" />

          <h3 className="font-semibold">
            CSV Export
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Export only transactions for Excel,
            Google Sheets or Numbers.
          </p>
        </button>

      </div>

      {/* Export Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleExport}
          size="lg"
          className="gap-2 rounded-xl px-8"
        >
          <Download className="h-5 w-5" />

          Export Data
        </Button>
      </div>

    </div>
  );
}