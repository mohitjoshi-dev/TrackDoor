import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Wallet,
  Receipt,
  HeartPulse,
  Film,
  CircleDollarSign,
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

export default function TransactionItem({ transaction }) {
  const { title, category, amount, date } = transaction;

  const formattedCategory =
  category.charAt(0).toUpperCase() + category.slice(1);

  const style = categoryStyles[formattedCategory] || {
    icon: CircleDollarSign,
    bg: "bg-primary/10",
    color: "text-primary",
  };

const Icon = style.icon;

  const isIncome = amount > 0;

  const formattedAmount = `${isIncome ? "+" : "-"}₹${Math.abs(
    amount
  ).toLocaleString("en-IN")}`;

  return (
    <div className="group flex items-center justify-between rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/60 hover:shadow-xl hover:border-primary/20 border 
                    border-transparent cursor-pointer">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.bg} ${style.color} transition-all duration-300 group-hover:scale-105`}>
        <Icon size={22} />
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {formattedCategory}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="text-right">
        <p
          className={`font-bold transition-colors duration-300 ${
                        isIncome
                        ? "text-emerald-500 group-hover:text-emerald-400"
                        : "text-red-500 group-hover:text-red-400"
                    }`}
        >
          {formattedAmount}
        </p>

        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}