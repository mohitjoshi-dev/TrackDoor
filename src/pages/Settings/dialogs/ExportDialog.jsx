import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useTransactions } from "@/context/TransactionsContext";
import { useBudgets } from "@/context/BudgetsContext";
import { useSettings } from "@/context/SettingsContext";
import { formatDate } from "@/utils/formatDate";
import { ArchiveRestore, Download, FileJson, FileSpreadsheet, Receipt, Wallet, Settings2, HardDrive } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getBackupData, estimateBackupSize, downloadJSON, downloadCSV } from "@/services/export/exportService";
import { toast } from "sonner";

export default function ExportDialog({
  open,
  onOpenChange,
}) {
  const [format, setFormat] = useState("json");
  const { transactions } = useTransactions();
  const { budgets } = useBudgets();
  const { settings } = useSettings();

  const backupData = getBackupData(
    transactions,
    budgets,
    settings
  );

  const estimatedSize = estimateBackupSize(backupData);
  const lastBackup = localStorage.getItem("lastBackup");

  const handleExport = () => {
  try {
    const data = getBackupData(
      transactions,
      budgets,
      settings
    );

    if (format === "json") {
      downloadJSON(data);
    } else {
      downloadCSV(data);
    }

    toast.success("Backup exported successfully!");

    onOpenChange(false);

  } catch (error) {
    console.error(error);

    toast.error(
      "Failed to export backup."
    );
  }
  };

  const summaryCardClass =
  "group relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-card to-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.08)]";

  return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[600px] h-[85vh] flex flex-col overflow-hidden rounded-2xl p-0">

      {/* Header */}
      <DialogHeader className="relative overflow-hidden border-b border-border/50 px-6 py-5">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-sky-500/10 via-blue-500/5 to-transparent" />
      <div className="relative space-y-3">
        <DialogTitle className="flex items-center gap-3 text-xl font-semibold">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-500/10 shadow-[0_0_35px_rgba(56,189,248,0.15)]">
            <ArchiveRestore className="h-6 w-6 text-sky-400" />
          </div>
          <div>

            <h2 className="text-xl font-bold">
              Export Data
            </h2>

            <p className="mt-1 text-sm font-normal text-muted-foreground">
              Securely backup your Smart Expense data.
            </p>
          </div>
        </DialogTitle>
      </div>
    </DialogHeader>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        {/* SUMMARY */}

        <section className="space-y-4">

          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Backup Summary
          </h3>

          <div className="grid grid-cols-2 gap-3">
             <div className={summaryCardClass}>
              <div className="absolute inset-0 bg-linear-to-br from-sky-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">

              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 transition-transform duration-300 group-hover:scale-110">
              <Receipt className="h-5 w-5 text-sky-400" />
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Transactions
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight">
                {transactions.length}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Records
              </p>
            </div>            
          </div>

             <div className={summaryCardClass}>
              <div className="absolute inset-0 bg-linear-to-br from-sky-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 transition-transform duration-300 group-hover:scale-110">
              <Wallet className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Budgets
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight">
                {budgets.length}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Categories
              </p>
            </div>
            </div>

             <div className={summaryCardClass}>
              <div className="absolute inset-0 bg-linear-to-br from-sky-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 transition-transform duration-300 group-hover:scale-110">
              <Settings2 className="h-5 w-5 text-violet-400" />
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Settings
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight">
                {Object.keys(settings).length}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Preferences
              </p>
            </div>
            </div>

             <div className={summaryCardClass}>
              <div className="absolute inset-0 bg-linear-to-br from-sky-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 transition-transform duration-300 group-hover:scale-110">
              <HardDrive className="h-5 w-5 text-orange-400" />
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Backup Size
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-sky-400">
                {estimatedSize} KB
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Estimated
              </p>
            </div>
            </div>

          </div>

        </section>

        {/* FORMAT  */}

        <section className="space-y-4 border-t pt-6">

          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Export Format
          </h3>

          <RadioGroup
            value={format}
            onValueChange={setFormat}
            className="space-y-3"
          >

            <Label
              htmlFor="json"
              className={`group relative overflow-hidden flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-all duration-300 ${
                format === "json"
                  ? "border-sky-400/40 bg-sky-500/10 shadow-[0_0_25px_rgba(56,189,248,0.08)]"
                  : "border-border/60 hover:border-sky-400/30 hover:bg-card/60"
              }`}
            >
              <RadioGroupItem
                value="json"
                id="json"
                className="mt-1"
              />

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 transition-transform duration-300 group-hover:scale-110">
                  <FileJson className="h-6 w-6 text-sky-400"/>
              </div>

              <div>
                <p className="font-semibold">
                  JSON Backup
                </p>

                <p className="text-sm text-muted-foreground">
                  Complete backup including
                  transactions, budgets and settings.
                </p>
              </div>

            </Label>

            <Label
              htmlFor="csv"
              className={`group relative overflow-hidden flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-all duration-300 ${
                format === "csv"
                  ? "border-sky-400/40 bg-sky-500/10 shadow-[0_0_25px_rgba(56,189,248,0.08)]"
                  : "border-border/60 hover:border-sky-400/30 hover:bg-card/60"
              }`}
            >
              <RadioGroupItem
                value="csv"
                id="csv"
                className="mt-1"
              />

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 transition-transform duration-300 group-hover:scale-110">
                  <FileSpreadsheet className="h-6 w-6 text-emerald-400"/>
              </div>

              <div>
                <p className="font-semibold">
                  CSV Export
                </p>

                <p className="text-sm text-muted-foreground">
                  Export transactions for Excel,
                  Google Sheets and Numbers.
                </p>
              </div>

            </Label>

          </RadioGroup>

        </section>

        {/*  LAST BACKUP  */}

        <section className="space-y-3 border-t pt-6">

          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Last Backup
          </h3>

           <div className={summaryCardClass}>
            {lastBackup ? (
              <>
                <p className="font-medium">
                  {formatDate(
                    lastBackup,
                    settings.preferences.dateFormat,
                    settings.preferences.timezone
                  )}
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(lastBackup).toLocaleTimeString()}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No backup created yet.
              </p>
            )}
          </div>

        </section>

      </div>

      {/* Footer */}
      <DialogFooter className="relative overflow-hidden border-t border-border/50 px-6 pt-4 pb-8">
        <div className="absolute inset-0 bg-linear-to-r from-sky-500/10 via-blue-500/5 to-transparent " />
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="relative z-10 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:bg-sky-500/5 hover:text-sky-400"
        >
          Cancel
        </Button>

        <Button
          onClick={handleExport}
          className="relative z-10 min-w-[180px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Backup
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
}