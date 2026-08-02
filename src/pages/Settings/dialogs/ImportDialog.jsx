import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileJson, Receipt, Wallet, Settings2, CalendarDays, Download } from "lucide-react";
import { toast } from "sonner";
import { importBackup } from "@/services/export/importService";
import { useSettings } from "@/context/SettingsContext";
import { formatDate } from "@/utils/formatDate";

export default function ImportDialog({ open, onOpenChange }) {

const { settings } = useSettings();
const [selectedFile, setSelectedFile] = useState(null);
const [backupData, setBackupData] = useState(null);

const fileInputRef = useRef(null);    

const handleFileSelect = async (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (data.version && data.version !== "1.0.0") {
    throw new Error("Unsupported backup version");
    }
    if (
        !Array.isArray(data.transactions) ||
        !Array.isArray(data.budgets) ||
        typeof data.settings !== "object"
      ) {
        throw new Error("Invalid backup");
      } 
        setSelectedFile(file);
        setBackupData(data);

  } catch (error) {
    console.error(error);

    toast.error("Invalid backup file.");
  }
};

const handleImport = () => {
  if (!backupData) return;

  try {
    const result = importBackup(backupData);

    if (!result.success) {
      throw result.error;
    }

    toast.success("Backup imported successfully!");
    setSelectedFile(null);
    setBackupData(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    onOpenChange(false);
    window.location.reload();

  } catch (error) {
    console.error(error);

    toast.error("Failed to import backup.");
  }
};

const summaryCardClass =
"group relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-card to-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] h-[80vh] flex flex-col overflow-hidden rounded-2xl p-0">

        {/* Header */}
        <DialogHeader className="relative overflow-hidden border-b border-border/50 px-6 py-5">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-emerald-500/5 to-transparent" />
          <div className="relative flex items-center gap-3">
            
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 shadow-[0_0_35px_rgba(16,185,129,0.15)]">
                <Upload className="h-6 w-6 text-emerald-400" />
              </div>
              <div>

                <DialogTitle className="text-xl font-bold">
                  Import Data
                </DialogTitle>

                <DialogDescription className="mt-1 text-sm font-normal text-muted-foreground">
                  Restore a previously exported Smart Expense backup.
                </DialogDescription>

              </div>
            
          </div>

        </DialogHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* Upload Area */}
          <div className="rounded-2xl border-2 border-dashed border-border/60 p-10 text-center transition-all hover:border-emerald-400/40">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Upload className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold">
              Drop your backup here
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              or click below to browse
            </p>
            <Button
            size="lg"
            className="mt-6 min-w-[180px]"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            >
            <Upload className="mr-2 h-4 w-4" />
            Browse Backup
            </Button>

            {selectedFile && (
            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">

                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Selected Backup
                </p>

                <p className="mt-1 font-medium text-emerald-400">
                    {selectedFile.name}
                </p>
                
                <p className="mt-1 text-xs text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
            </div>
            )}
              {/* Supported Format */}
        <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        hidden
        onChange={handleFileSelect}
        />

          <div className="mt-8 rounded-2xl border border-border/60 p-5">
            <div className="flex items-center gap-3">
            <FileJson className="h-6 w-6 text-emerald-400" />
            <div>
                <h4 className="font-semibold">
                    Supported Format
                </h4>

                <p className="text-sm text-muted-foreground">
                    Smart Expense JSON Backup (.json)
                </p>
            </div>
            </div>
            </div>
          </div>
        
        
        {backupData && (
        <section className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Backup Preview
            </h3>
            <div className="grid grid-cols-2 gap-3">

                <div className={summaryCardClass}>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 transition-transform duration-300 group-hover:scale-110">
                        <Receipt className="h-5 w-5 text-sky-400" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Transactions
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight">
                        {backupData.transactions?.length ?? 0}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Records
                    </p>
                </div>

                <div className={summaryCardClass}>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 transition-transform duration-300 group-hover:scale-110">
                        <Wallet className="h-5 w-5 text-emerald-400" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Budgets
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight">
                        {backupData.budgets?.length ?? 0}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Categories
                    </p>
                </div>

                <div className={summaryCardClass}>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 transition-transform duration-300 group-hover:scale-110">
                        <Settings2 className="h-5 w-5 text-violet-400" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Settings
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight">
                        {Object.keys(backupData.settings ?? {}).length}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Preferences
                    </p>
                </div>

                <div className={summaryCardClass}>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 transition-transform duration-300 group-hover:scale-110">
                        <CalendarDays className="h-5 w-5 text-orange-400" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Backup Date
                    </p>

                    <p className="mt-2 text-lg font-bold">
                        {backupData.exportedAt
                            ? formatDate(
                              backupData.exportedAt,
                              settings.preferences.dateFormat,
                              settings.preferences.timezone
                            )
                            : "Unknown"}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {backupData.exportedAt
                            ? new Date(backupData.exportedAt).toLocaleTimeString()
                            : ""}
                    </p>
                </div>
            </div>
        </section>
        )}
      </div>

        

        {/* Footer */}

        {/* Footer */}
        <DialogFooter className="relative overflow-hidden border-t border-border/50 px-6 pt-4 pb-8">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-emerald-500/5 to-transparent" />
          <div className="relative flex w-full justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="relative z-10 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:bg-emerald-500/5 hover:text-emerald-400"
            >
              Cancel
            </Button>

            <Button
              disabled={!backupData}
              className="relative z-10 min-w-[180px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
              onClick={handleImport}
            >
              <Download className="mr-2 h-4 w-4" />
              Import Backup
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}