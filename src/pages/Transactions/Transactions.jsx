import { Plus, Search } from "lucide-react";
import { recentTransactions } from "@/constants/transactions";
import TransactionItem from "@/components/dashboard/TransactionItem";
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import TransactionForm from "@/components/forms/TransactionForm";

export default function Transactions() {
const [open, setOpen] = useState(false);  
const [transactions, setTransactions] = useState(() => {
const savedTransactions = localStorage.getItem("transactions");

return savedTransactions
  ? JSON.parse(savedTransactions)
  : recentTransactions;
}); 

useEffect(() => {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}, [transactions]);

return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Transactions
          </h1>

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
    <div className="relative group">
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full rounded-xl border border-border/50 bg-background/60 backdrop-blur-md px-4 py-3 pl-11 outline-none transition-all duration-300 focus:border-primary"
        />

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
        />
          
        </div>

        {/* Category Chips */}
        <div className="mt-5 flex flex-wrap gap-3">
          {[
            "All",
            "Income",
            "Food",
            "Travel",
            "Shopping",
            "Bills",
          ].map((category) => (
            <button
              key={category}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                category === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/70"
              }`}
            >
          {category}
        </button>
        ))}
      </div>
    </div>
    
    <div className="rounded-2xl border border-border/50 bg-card p-6">
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-xl font-semibold">All Transactions</h2>

      <span className="text-sm text-muted-foreground">
        {transactions.length} Transactions
      </span>
    </div>

    <div className="divide-y divide-border/40">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </div>
    
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
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
            const newTransaction = {
              id: Date.now(),
              ...data,
            };

            setTransactions((prev) => [newTransaction, ...prev]);

            setOpen(false);
          }}
          />
        </div>
      </DialogContent>
    </Dialog>
    </div>
  );
  }