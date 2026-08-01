import {
  Database,
  Receipt,
  Wallet,
  Settings,
} from "lucide-react";

import { useTransactions } from "@/context/TransactionsContext";
import { useBudgets } from "@/context/BudgetsContext";
import { useSettings } from "@/context/SettingsContext";
import { getBackupData, estimateBackupSize } from "@/services/export/exportService";

export default function ExportCard() {

  const { transactions } = useTransactions();
  const { budgets } = useBudgets();
  const { settings } = useSettings();
    
  const backupData = getBackupData(
    transactions,
    budgets,
    settings
  );

  const estimatedSize = estimateBackupSize(backupData);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <Database className="h-6 w-6 text-primary" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Backup Summary
          </h2>

          <p className="text-sm text-muted-foreground">
            Everything included in your export.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-secondary/40 p-5">
          <Receipt className="mb-4 h-6 w-6 text-primary" />

          <p className="text-sm text-muted-foreground">
            Transactions
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {transactions.length}
          </h3>
        </div>

        <div className="rounded-xl bg-secondary/40 p-5">
          <Wallet className="mb-4 h-6 w-6 text-primary" />

          <p className="text-sm text-muted-foreground">
            Budgets
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {budgets.length}
          </h3>
        </div>

        <div className="rounded-xl bg-secondary/40 p-5">
          <Settings className="mb-4 h-6 w-6 text-primary" />

          <p className="text-sm text-muted-foreground">
            Settings
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {Object.keys(settings).length}
          </h3>
        </div>

        <div className="rounded-xl bg-secondary/40 p-5">
          <Database className="mb-4 h-6 w-6 text-primary" />

          <p className="text-sm text-muted-foreground">
            Estimated Size
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {estimatedSize} KB
          </h3>
        </div>

      </div>

    </div>
  );
}