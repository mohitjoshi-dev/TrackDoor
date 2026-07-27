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

const COLORS = [
  "url(#incomeGradient)",
  "url(#expenseGradient)",
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {item.payload.name}
      </p>

      <p className="mt-1 text-2xl font-bold text-white">
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
      y={y - 14}
      textAnchor="middle"
      fontSize={20}
      fontWeight={700}
      fill={index === 0 ? "#22C55E" : "#EC4899"}
    >
      ₹{value.toLocaleString()}
    </text>
  );
};

export default function IncomeExpenseChart({ data, totalIncome, totalExpense, }) {

const savings = totalIncome - totalExpense;

const savingsRate =
  totalIncome > 0
    ? ((savings / totalIncome) * 100).toFixed(1)
    : 0;
        
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-700/40 bg-[#111827] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] 
                    transition-all duration-500 hover:border-blue-500/30">

      {/* Background Glow */}
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(59,130,246,0.22),transparent_40%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]" />

        <div className="absolute -right-28 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[110px]" />
      </>
      <div className="relative">

        <h2 className="text-xl font-semibold">
          Income vs Expense
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Compare your total income and expenses.
        </p>

        <div className="mt-8 h-80">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={data}
              barGap={40}
            >

              <defs>

                <linearGradient
                  id="incomeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
                stroke="#374151"
                opacity={0.3}
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="amount"
                radius={[16, 16, 0, 0]}
                maxBarSize={90}
              >
                
              <LabelList content={<RenderLabel />} />

                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>
       
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
        <div className="grid grid-cols-2 divide-x divide-white/10">

            <div className="flex items-center gap-4 p-6">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">

                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                />
                </svg>

            </div>

            <div>

                <p className="text-sm text-slate-400">
                Net Savings
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                ₹{savings.toLocaleString()}
                </h3>

            </div>

            </div>

            <div className="flex flex-col justify-center p-6">

            <p className="text-sm text-slate-400">
                Savings Rate
            </p>

            <h3 className="mt-1 text-2xl font-bold text-emerald-400">
                {savingsRate}%
            </h3>

            </div>

        </div>
        </div>

      </div>

    </div>
  );
}