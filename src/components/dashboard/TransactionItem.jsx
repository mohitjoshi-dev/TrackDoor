import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Wallet,
  Receipt,
  HeartPulse,
  Film,
  CircleDollarSign,
  Trash2,
  Pencil, // <-- Added Pencil import
} from "lucide-react";

const categoryStyles = {
  Food: {
    icon: UtensilsCrossed,
    bg: "bg-emerald-500/10",
    color: "text-emerald-500",
  },
  Travel: {
    icon: Car,
    bg: "bg-sky-500/10",
    color: "text-sky-500",
  },
  Shopping: {
    icon: ShoppingBag,
    bg: "bg-violet-500/10",
    color: "text-violet-500",
  },
  Income: {
    icon: Wallet,
    bg: "bg-green-500/10",
    color: "text-green-500",
  },
  Bills: {
    icon: Receipt,
    bg: "bg-amber-500/10",
    color: "text-amber-500",
  },
  Health: {
    icon: HeartPulse,
    bg: "bg-rose-500/10",
    color: "text-rose-500",
  },
  Entertainment: {
    icon: Film,
    bg: "bg-pink-500/10",
    color: "text-pink-500",
  },
};

export default function TransactionItem({ transaction, onDelete, onEdit }) {
  const { title, category, amount, date, type } = transaction;

  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const style = categoryStyles[formattedCategory] || {
    icon: CircleDollarSign,
    bg: "bg-primary/10",
    color: "text-primary",
  };

  const Icon = style.icon;

  const isIncome = type === "income";
  const formatDate = (dateString) => {
  // Handle old demo data
  if (dateString === "Today" || dateString === "Yesterday") {
    return dateString;
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

  const formattedAmount = `${isIncome ? "+" : "-"}₹${Math.abs(
    amount
  ).toLocaleString("en-IN")}`;

  return (
    <div
       className="group relative flex cursor-pointer items-center justify-between rounded-2xl border border-transparent p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-secondary/60 hover:shadow-xl"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.bg} ${style.color} transition-all duration-300 group-hover:scale-105`}
        >
          <Icon size={22} />
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{formattedCategory}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Amount block comes first */}
        <div className="min-w-28 text-right">
          <p
            className={`font-bold transition-colors duration-300 ${
              isIncome
                ? "text-emerald-500 group-hover:text-emerald-400"
                : "text-red-500 group-hover:text-red-400"
            }`}
          >
            {formattedAmount}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{formatDate(date)}</p>
        </div>

         <div className="flex items-center gap-1">
          {/* Edit Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(); // Triggers the exact same edit modal function passed from the parent
            }}
            className="flex h-9 w-9 scale-90 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-500 group-hover:scale-100 group-hover:opacity-100"
          >
            <Pencil size={18} />
          </button>

          {/* Trash Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(transaction.id);
            }}
            className="flex h-9 w-9 scale-90 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all duration-200 hover:bg-red-500/10 hover:text-red-500 group-hover:scale-100 group-hover:opacity-100"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}