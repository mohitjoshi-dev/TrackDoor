import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MonthlyTrendChart({ data }) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-slate-700/40 bg-[#0B1121] p-6 lg:p-8 shadow-2xl transition-all duration-500 hover:border-blue-500/30">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,0.08),transparent_50%)] pointer-events-none" />
    <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />    
    <div className="relative z-10">
     <div className="flex items-start justify-between">

    <div>

      <h2 className="text-xl font-bold tracking-wide text-white">
        Monthly Spending Trend
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Track your expenses over time.
      </p>

    </div>

    </div>

    <div className="mt-8 flex items-center gap-14">

      <div>

        <p className="text-sm text-cyan-400">
          Total
        </p>

        <p className="mt-1 text-3xl font-bold text-white">
          ₹
          {data.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
        </p>

      </div>

      <div className="h-12 w-px bg-slate-700" />

      <div>

        <p className="text-sm text-slate-400">
          Average
        </p>

        <p className="mt-1 text-xl font-semibold text-cyan-400">
          ₹
          {Math.round(
            data.reduce((sum, item) => sum + item.amount, 0) /
            Math.max(data.length, 1)
          ).toLocaleString()}
        </p>

      </div>
    </div>      
    </div>

      <div className="mt-6 h-100">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.45} />
                <stop offset="70%" stopColor="#3B82F6" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.35}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#94A3B8",
                fontSize: 13,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fill: "#64748B",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
              width={55}
            />

            <Tooltip
              cursor={{
                stroke: "#3B82F6",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                background: "#111827",
                border: "1px solid #334155",
                borderRadius: "16px",
                color: "#fff",
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, "Expense"]}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#expenseGradient)"
              animationDuration={1000}
              activeDot={{
                r: 7,
                stroke: "#3B82F6",
                strokeWidth: 3,
                fill: "#fff",
              }}
              dot={{
                r: 4,
                fill: "#3B82F6",
                stroke: "#0B1121",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}