import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import TransactionForm from "@/pages/Transactions/components/TransactionForm";
import { useQuickAdd } from "@/context/QuickAddContext";
import { useTransactions } from "@/context/TransactionsContext";
import { useNotifications } from "@/context/NotificationContext";
import { useSettings } from "@/context/SettingsContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { toast } from "sonner";

export default function GlobalQuickAddDialog() {
const {open, setOpen, defaultType, } = useQuickAdd();

const { addTransaction } = useTransactions();
const {addNotification} = useNotifications();
const{ preferences } = useSettings();

return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle className="text-2xl font-bold">
            Quick Add
          </DialogTitle>

          <DialogDescription>
            Quickly add an income or expense.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-5">
          <TransactionForm
            initialData={{
              type: defaultType,
            }}
            onCancel={() => setOpen(false)}
            onSubmit={(data) => {
              addTransaction(data);

              addNotification({
                title: "Transaction Added",
                message: `${formatCurrency(
                  data.amount,
                  preferences.currency
                )} added successfully.`,
                type: "success",
              });

              toast.success("Transaction added successfully!");

              setOpen(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}