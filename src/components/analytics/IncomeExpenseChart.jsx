import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "lucide-react";

const COLORS = ["url(#incomeGradient)", "url(#expenseGradient)"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const isIncome = item.payload.name === "Income";

  return (
    <div className="rounded-xl border border-white/10 bg-[#0f1523]/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            isIncome ? "bg-[#22C55E]" : "bg-[#FB7185]"
          }`}
        />
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {item.payload.name}
        </p>
      </div>
      <p
        className={`mt-1 text-2xl font-bold ${
          isIncome ? "text-[#22C55E]" : "text-[#FB7185]"
        }`}
      >
        ₹{item.value.toLocaleString()}
      </p>
    </div>
  );
};

const RenderLabel = (props) => {
  const { x, y, width, value, index } = props;

  return (
    <text
      x={x + width / 2}
      y={y - 12}
      textAnchor="middle"
      fontSize={15}
      fontWeight={600}
      fill={index === 0 ? "#22C55E" : "#FB7185"}
    >
      ₹{value.toLocaleString()}
    </text>
  );
};

export default function IncomeExpenseChart({
  data = [
    { name: "Income", amount: 80000 },
    { name: "Expense", amount: 14767 },
  ],
  totalIncome = 80000,
  totalExpense = 14767,
  highestExpenseCategory = "Shopping",
  highestExpenseAmount = 5620,
  timeFilter,
  setTimeFilter,
}) {
  const savings = totalIncome - totalExpense;
  const savingsRate =
    totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : 0;
  const highestExpensePercentage =
    totalExpense > 0
      ? Math.round((highestExpenseAmount / totalExpense) * 100)
      : 0;

  const radius = 20; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (savingsRate / 100) * circumference;

  return (
    <div className="group relative w-full overflow-hidden rounded-[24px] border border-slate-700/40 bg-[#0B1121] p-6 lg:p-8 shadow-2xl transition-all duration-500 hover:border-blue-500/30 flex flex-col h-full">
      {/* Premium Background Glows */}
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      </>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-wide text-white">
              Income vs Expense
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Compare your total income and expenses.
            </p>
          </div>

          <Select
            value={timeFilter}
            onValueChange={setTimeFilter}
          >
            <SelectTrigger className="w-44 border border-slate-700/60 bg-white/5 text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1m">
                This Month
              </SelectItem>

              <SelectItem value="3m">
                Last 3 Months
              </SelectItem>

              <SelectItem value="6m">
                Last 6 Months
              </SelectItem>

              <SelectItem value="all">
                All Time
              </SelectItem>
            </SelectContent>
          </Select>

        </div>

        {/* Chart Section */}
        <div className="mt-8 flex-1 min-h-65">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>
                <linearGradient
                  id="expenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#FB7185" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#334155"
                opacity={0.3}
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "#94A3B8", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
                dy={12}
              />

              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 13 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000}K`)}
                domain={[0, 100000]}
                ticks={[0, 20000, 40000, 60000, 80000, 100000]}
              />

              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />

              <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={80}>
                <LabelList content={<RenderLabel />} />
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Stats Section - Removed truncate, optimized padding for full text visibility */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/2 backdrop-blur-md">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            
            {/* 1. Net Savings */}
            <div className="flex items-center gap-2 xl:gap-3 px-2 py-3 sm:px-3 sm:py-4 hover:bg-white/1 transition-colors rounded-l-2xl">
              <div className="flex h-9 w-9 xl:h-10 xl:w-10 shrink-0 items-center justify-center rounded-xl bg-[#0d2a20]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 xl:h-5 xl:w-5 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] xl:text-xs font-medium text-slate-400 leading-tight">
                  Net Savings
                </p>
                <h3 className="text-base sm:text-lg xl:text-xl font-bold text-emerald-400 tracking-tight">
                  ₹{savings.toLocaleString()}
                </h3>
                <p className="mt-0.5 text-[10px] xl:text-[11px] text-slate-500 leading-tight">
                  Income - Expense
                </p>
              </div>
            </div>

            {/* 2. Savings Rate */}
            <div className="flex items-center gap-2 xl:gap-3 px-2 py-3 sm:px-3 sm:py-4 hover:bg-white/1 transition-colors">
              <div className="relative flex h-9 w-9 xl:h-10 xl:w-10 shrink-0 items-center justify-center">
                <svg className="h-9 w-9 xl:h-10 xl:w-10 -rotate-90 transform" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke="#1E293B"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    stroke="#22C55E"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-[8px] xl:text-[9px] font-bold text-emerald-400">
                  {savingsRate}%
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] xl:text-xs font-medium text-slate-400 leading-tight">
                  Savings Rate
                </p>
                <h3 className="text-base sm:text-lg xl:text-xl font-bold text-emerald-400 tracking-tight">
                  {savingsRate}%
                </h3>
                <p className="mt-0.5 text-[10px] xl:text-[11px] text-slate-500 leading-tight">
                  Of your income
                </p>
              </div>
            </div>

            {/* 3. Highest Expense */}
            <div className="flex items-center gap-2 xl:gap-3 px-2 py-3 sm:px-3 sm:py-4 hover:bg-white/1 transition-colors rounded-r-2xl">
              <div className="flex h-9 w-9 xl:h-10 xl:w-10 shrink-0 items-center justify-center rounded-xl bg-[#17112c]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 xl:h-5 xl:w-5 text-[#a855f7]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] xl:text-xs font-medium text-slate-400 leading-tight">
                  Highest Expense
                </p>
                <h3 className="text-base sm:text-lg xl:text-xl font-bold text-[#a855f7] tracking-tight">
                  {highestExpenseCategory}
                </h3>
                <p className="mt-0.5 text-[10px] xl:text-[11px] text-slate-500 leading-tight">
                  ₹{highestExpenseAmount.toLocaleString()} ({highestExpensePercentage}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}