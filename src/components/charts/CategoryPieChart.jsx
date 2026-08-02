import { categoryData } from "@/constants/categoryData";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { formatCurrency } from "@/utils/formatCurrency";


export default function CategoryPieChart({ data, timeFilter, setTimeFilter, }) {
  const { preferences } = useSettings();
   const chartData = categoryData
    .filter((category) => category.id !== "income")
    .map((category) => {
      const transaction = data.find((item) => item.name === category.id);

      return {
        id: category.id,
        name: category.name,
        icon: category.icon,
        color: category.color,
        value: transaction?.value ?? 0,
      };
    })
    .filter((item) => item.value > 0) 
    .sort((a, b) => b.value - a.value); 

  // 2. Calculate Total
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const [activeSlice, setActiveSlice] = useState(null);

  return (
    <div className="group relative w-full min-h-155 overflow-hidden rounded-[24px] border border-slate-700/40 bg-[#0B1121] p-6 lg:p-8 shadow-2xl transition-all duration-500 hover:border-blue-500/30 flex flex-col">
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      </>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-wide text-white">
              Spending Breakdown
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              See where your money goes across all categories.
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

        <div className="mt-8 flex flex-col lg:flex-row items-center gap-10">
          <div className="relative w-full lg:w-1/2 h-105 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <Pie
                  key={timeFilter}
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={85}
                  outerRadius={120}
                  paddingAngle={3}
                  cornerRadius={12}
                  stroke="none"
                  isAnimationActive
                  animationDuration={900}
                  labelLine={false}

                  label={({ percent, cx, cy, midAngle, innerRadius, outerRadius }) => {
                    if (percent < 0.02) return null;

                    const radius =
                      innerRadius + (outerRadius - innerRadius) / 2;

                    const x =
                      cx + radius * Math.cos((-midAngle * Math.PI) / 180);

                    const y =
                      cy + radius * Math.sin((-midAngle * Math.PI) / 180);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={14}
                        fontWeight={700}
                      >
                        {(percent * 100).toFixed(0)}%
                      </text>
                    );
                  }}

                  animationEasing="ease-out"
                  activeIndex={
                    activeSlice === null
                      ? -1
                      : chartData.findIndex(
                          (item) => item.id === activeSlice
                        )
                  }
                  onMouseEnter={(_, index) =>
                    setActiveSlice(chartData[index].id)
                  }
                  onMouseLeave={() => setActiveSlice(null)}
                >
                  {chartData.map((item) => (
                    <Cell
                      key={item.id}
                      fill={item.color}
                      fillOpacity={
                        activeSlice === null || activeSlice === item.id
                          ? 1
                          : 0.35
                      }
                    />
                  ))}
                  
                 
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-white">
                {formatCurrency(total, preferences.currency)}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Total Spent
              </p>
            </div>      
          </div>

          <div className="w-full lg:w-1/2 space-y-3 h-105 overflow-y-auto py-2 px-1 pr-2 scrollbar-none">
            {chartData.map((item) => {
              const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0.0";

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveSlice(item.id)}
                  onMouseLeave={() => setActiveSlice(null)}
                  className={`group flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300

                    ${
                      activeSlice === item.id
                        ? "border-blue-500/60 bg-white/6 shadow-lg shadow-blue-500/20 scale-[1.02]"
                        : "border-white/5 bg-white/2 hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-white/4"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${item.color}20`,
                      }}
                    >
                      <item.icon size={18} color={item.color} />
                    </div>

                    <div>
                      <p className="text-[15px] font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-slate-400">Category</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-white">
                     {formatCurrency(item.value, preferences.currency)}
                    </p>
                    <p className="text-sm text-slate-400">
                      {percentage}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}