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
    <div className="rounded-2xl border border-border/50 bg-card p-6">
      <h2 className="text-xl font-semibold">
        Monthly Spending Trend
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Your monthly expense trend.
      </p>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.15}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}