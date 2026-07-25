import { Plus, Search } from "lucide-react";
import TransactionItem from "@/components/dashboard/TransactionItem";
import { useState } from "react";
import { useTransactions } from "@/context/TransactionsContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import TransactionForm from "@/components/forms/TransactionForm";
import { toast } from "sonner";

export default function Transactions() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { transactions, setTransactions } = useTransactions();

  const filteredTransactions = transactions.filter((transaction) => {
  const query = searchQuery.trim().toLowerCase();

  const matchesSearch =
    transaction.title.toLowerCase().includes(query) ||
    transaction.category.toLowerCase().includes(query) ||
    (transaction.notes || "").toLowerCase().includes(query) ||
    transaction.amount.toString().includes(query);

  const formattedCategory =
    transaction.category.charAt(0).toUpperCase() +
    transaction.category.slice(1);

  const matchesCategory =
    selectedCategory === "All" ||
    formattedCategory === selectedCategory;

  return matchesSearch && matchesCategory;
});

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border/50 bg-background/60 px-4 py-3 pl-11 backdrop-blur-md outline-none transition-all duration-300 focus:border-primary"
          />

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
          />
        </div>

        {/* Category Chips */}
        <div className="mt-5 flex flex-wrap gap-3">
          {["All", "Income", "Food", "Travel", "Shopping", "Bills"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/70"
                }`}
              >
                {category}
              </button>
            )
          )}
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
            {/* Invisible placeholder matching the trash button width */}
            <div className="w-12"></div>
          </div>
        </div>

        <div className="divide-y divide-border/40">
        {filteredTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={(id) => {
              setTransactions((prev) =>
                prev.filter((t) => t.id !== id)
              );

              toast.success("Transaction deleted successfully!");
            }}
            onEdit={() => {
              setSelectedTransaction(transaction);
              setEditOpen(true);
            }}
          />
        ))}
        {filteredTransactions.length === 0 && (
          <div className="py-12 text-center">
            <h3 className="text-lg font-semibold">No transactions found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term.
            </p>
          </div>
        )}
      </div>
      </div>

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
              mode="add"
              onCancel={() => setOpen(false)}
              onSubmit={(data) => {
                const newTransaction = {
                  id: Date.now(),
                  ...data,
                  amount: Number(data.amount),
                  date: new Date().toISOString(),
                };

                setTransactions((prev) => [newTransaction, ...prev]);
                toast.success("Transaction added successfully!");
                setOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
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
                initialData={selectedTransaction}
                mode="edit"
                onCancel={() => setEditOpen(false)}
                onSubmit={(data) => {
                setTransactions((prev) =>
                  prev.map((transaction) =>
                    transaction.id === selectedTransaction.id
                      ? {
                          ...transaction,
                          ...data,
                          amount: Number(data.amount),
                          date: transaction.date,
                        }
                      : transaction
                  )
                );

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