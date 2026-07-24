import { recentTransactions } from "@/constants/transactions";
import TransactionItem from "./TransactionItem";
import { Link } from "react-router-dom";

export default function RecentTransactions() {
  return (
    <div className="rounded-3xl border border-border/50 bg-card/70 backdrop-blur-xl p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Recent Transactions
          </h2>
          <p className="text-sm text-muted-foreground">
            Your latest income and expenses
          </p>
        </div>

        <Link
          to="/transactions"
          className="group rounded-lg px-3 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/10"
        >
          View All
          <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>  

      <div className="divide-y divide-border/40">
        {recentTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
}