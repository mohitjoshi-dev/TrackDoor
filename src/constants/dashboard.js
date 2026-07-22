import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  PiggyBank,
} from "lucide-react";

export const stats = [
  {
    id: 1,
    title: "Total Balance",
    value: "₹52,480",
    subtitle: "Compared to last month",
    icon: Wallet,
    change: "+8.2%",
    changeType: "increase",
    color: "cyan",
  },
  {
    id: 2,
    title: "Income",
    value: "₹80,000",
    subtitle: "Compared to last month",
    icon: ArrowDownCircle,
    change: "+12%",
    changeType: "increase",
    color: "emerald",
  },
  {
    id: 3,
    title: "Expenses",
    value: "₹27,520",
    subtitle: "Compared to last month",
    icon: ArrowUpCircle,
    change: "-5%",
    changeType: "decrease",
    color: "rose",
  },
  {
    id: 4,
    title: "Savings",
    value: "₹24,960",
    subtitle: "Compared to last month",
    icon: PiggyBank,
    change: "+18%",
    changeType: "increase",
    color: "violet",
  },
];

