import { Plus, Search, LayoutGrid } from "lucide-react";
import TransactionItem from "@/pages/Transactions/components/TransactionItem";
import { useState, useRef } from "react";
import { useTransactions } from "@/context/TransactionsContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import TransactionForm from "@/pages/Transactions/components/TransactionForm";
import { toast } from "sonner";
import { categoryData } from "@/constants/categoryData";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/context/NotificationContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { useSettings } from "@/context/SettingsContext";
import { formatDate } from "@/utils/formatDate";

export default function Transactions() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");  
  const [editOpen, setEditOpen] = useState(false);
  const scrollRef = useRef(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  // Using the global context instead of local state!
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { addNotification } = useNotifications();

  const filteredTransactions = [...transactions]
  .filter((transaction) => {
    const matchesSearch =
      transaction.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.notes
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      transaction.category === selectedCategory;

    return matchesSearch && matchesCategory;
  })
  .sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  const { preferences } = useSettings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="mt-1 text-muted-foreground">
            Manage all your income and expenses
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground transition-all duration-300 hover:opacity-90"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-5">
           {/* Search */}
          <div className="group relative">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border/50 bg-background/60 px-4 py-3 pl-11 backdrop-blur-md outline-none transition-all duration-300 focus:border-primary"
            />

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
            />
          </div>
 
        {/* Category Chips */}
        <div
          ref={scrollRef}
          className="mt-5 flex gap-3 overflow-x-auto pb-1 no-scrollbar cursor-grab active:cursor-grabbing select-none snap-x"
          onMouseDown={(e) => {
            isDown.current = true;
            startX.current = e.pageX - scrollRef.current.offsetLeft;
            scrollLeft.current = scrollRef.current.scrollLeft;
          }}
          onMouseLeave={() => {
            isDown.current = false;
          }}
          onMouseUp={() => {
            isDown.current = false;
          }}
          onMouseMove={(e) => {
            if (!isDown.current) return;
            e.preventDefault();

            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX.current) * 1.5;

            scrollRef.current.scrollLeft =
              scrollLeft.current - walk;
          }}
        >
          {[
            {
              id: "all",
              name: "All",
              icon: LayoutGrid,
            },
            ...categoryData,
          ].map((category) => {
            const Icon = category.icon;

            return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`snap-start flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/70"
              }`}
            >
              <Icon size={16} />
              <span>{category.name}</span>
            </button>
         );
        })}
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-6">
        
        {/* Aligned Header Section */}
        <div className="mb-5 flex items-center justify-between px-4">
          <h2 className="text-xl font-semibold">All Transactions</h2>

          {/* Replicated flex layout and placeholder for alignment */}
          <div className="flex items-center gap-3">
            <span className="min-w-28 text-right font-bold text-muted-foreground">
              {filteredTransactions.length} Transactions
            </span>
            {/* Invisible placeholder matching BOTH buttons (Edit + Trash) */}
            <div className="w-19"></div>
          </div>
        </div>

        <div className="divide-y divide-border/40">
          {filteredTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="rounded-full bg-primary/10 p-5">
                  <Search className="h-10 w-10 text-primary" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {searchTerm
                    ? `No results for "${searchTerm}"`
                    : selectedCategory !== "all"
                    ? `No ${
                        categoryData.find(
                          (c) => c.id === selectedCategory
                        )?.name
                      } transactions`
                    : "No Transactions Yet"}
                </h3>

                <p className="mt-2 max-w-sm text-center text-muted-foreground">
                  {searchTerm || selectedCategory !== "all"
                    ? "Try changing your search or category filter."
                    : "Start tracking your finances by adding your first transaction."}
                </p>

                <Button
                  variant="outline"
                  className="mt-8"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onDelete={(id) => {
                  const transaction = transactions.find((t) => t.id === id);

                  deleteTransaction(id);

                  addNotification({
                    title: "Transaction Deleted",
                    message: `${transaction?.title ?? "Transaction"} was deleted.`,
                    type: "error",
                  });

                  toast.success("Transaction deleted successfully!");
                }}
                  onEdit={() => {
                    setSelectedTransaction(transaction);
                    setEditOpen(true);
                  }}
                />
              ))
            )}
        </div>
      </div>

      {/* Add Transaction Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
          <DialogHeader className="border-b px-6 py-5">
            <DialogTitle className="text-2xl font-bold">
              Add Transaction
            </DialogTitle>
            <DialogDescription>
              Record your income or expenses to keep your budget up to date.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-5">
            <TransactionForm
              onCancel={() => setOpen(false)}
              onSubmit={(data) => {
              addTransaction(data);

              addNotification({
                title: "Expense Added",
                message: `${formatCurrency(
                  data.amount,
                  preferences.currency
                )} added to ${data.category}`,
                type: "success",
              });

              toast.success("Transaction added successfully!");
              setOpen(false);
            }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Transaction Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
          <DialogHeader className="border-b px-6 py-5">
            <DialogTitle className="text-2xl font-bold">
              Edit Transaction
            </DialogTitle>

            <DialogDescription>
              Update your transaction details.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-5">
            <TransactionForm
              mode="edit"
              initialData={selectedTransaction}
              onCancel={() => setEditOpen(false)}
              onSubmit={(data) => {
              updateTransaction(selectedTransaction.id, data);

              addNotification({
                title: "Transaction Updated",
                message: `${data.title} was updated.`,
                type: "info",
              });

              toast.success("Transaction updated successfully!");
              setEditOpen(false);
            }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}