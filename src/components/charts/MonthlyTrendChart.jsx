import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";

const CustomDot = ({ cx, cy, payload }) => (
  <g>
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="#8B5CF6"
      stroke="#0B1121"
      strokeWidth={2}
    />

    {payload.amount > 0 && (
      <text
        x={cx}
        y={cy - 15}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={13}
        fontWeight={600}
      >
        ₹{payload.amount.toLocaleString()}
      </text>
    )}
  </g>
);

export default function MonthlyTrendChart({ data = [] }) {
  // Calculate Average
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const average = Math.round(total / Math.max(data.length, 1));

  // Calculate Month-over-Month (MoM) change
  const currentMonth = data[data.length - 1]?.amount || 0;
  const previousMonth = data[data.length - 2]?.amount || 0;
  
  let momChange = 0;
  if (previousMonth > 0) {
    momChange = ((currentMonth - previousMonth) / previousMonth) * 100;
  }
  
  // Less expense is typically viewed as a positive/downward trend
  const isTrendDown = momChange <= 0;

  return (
    <div className="group relative w-full overflow-hidden rounded-[24px] border border-slate-700/40 bg-[#0B1121] p-6 lg:p-8 shadow-2xl transition-all duration-500 hover:border-blue-500/30 flex flex-col">
      {/* Premium Background Glows - Matched to Blue theme of other charts */}
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      </>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-violet-500" />
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white">
                Monthly Spending Trend
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Track your spending pattern over time
              </p>
            </div>
          </div>

          {/* Right Stats Box */}
          <div className="flex items-center gap-5 rounded-2xl border border-white/5 bg-white/2 px-5 py-3 backdrop-blur-md">
            <div>
              <p className="text-[11px] font-medium text-slate-400">
                Avg. Monthly Spend
              </p>
              <p className="mt-0.5 text-xl font-bold text-white">
                ₹{average.toLocaleString()}
              </p>
            </div>
            
            <div className="h-8 w-px bg-white/10" />
            
            <div>
              <p className="text-[11px] font-medium text-slate-400">
                vs last month
              </p>
              <p
                className={`mt-0.5 text-sm font-bold ${
                  isTrendDown ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isTrendDown ? "↓" : "↑"} {momChange > 0 ? "+" : ""}
                {momChange.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Chart Section - Height restored to h-100 */}
        <div className="relative mt-8 h-100 w-full">
          {/* Y-Axis Currency Label */}
          <div className="absolute -top-4 left-0 text-xs font-medium text-slate-400">
            (₹)
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 40, left: 10, bottom: 10 }}>
              
              <CartesianGrid
                stroke="#334155"
                strokeDasharray="4 4"
                vertical={false}
                opacity={0.3}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#94A3B8",
                  fontSize: 13,
                }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />

              <YAxis
                tickFormatter={(value) => {
                  if (value >= 100000) {
                    return `₹${(value / 100000).toFixed(1)}L`;
                  }

                  if (value >= 1000) {
                    return `₹${(value / 1000).toFixed(
                      value % 1000 === 0 ? 0 : 1
                    )}K`;
                  }

                  return `₹${value}`;
                }}
              />

              <Tooltip
                cursor={{
                  stroke: "#8B5CF6",
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  background: "#0f1523",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff", fontWeight: "bold" }}
                formatter={(value) => [`₹${value.toLocaleString()}`, "Expense"]}
              />

              {/* Area completely updated for solid fill */}
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8B5CF6"
                strokeWidth={3}
                fill="#8B5CF6"
                fillOpacity={0.15}
                animationDuration={1000}
                dot={<CustomDot />}
                activeDot={{
                  r: 7,
                  stroke: "#8B5CF6",
                  strokeWidth: 3,
                  fill: "#fff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}