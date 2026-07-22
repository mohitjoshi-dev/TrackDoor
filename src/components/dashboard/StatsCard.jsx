import { TrendingDown, TrendingUp } from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";

const gradients = {
  cyan: "from-cyan-500/80 to-cyan-500/0",
  emerald: "from-emerald-500/80 to-emerald-500/0",
  rose: "from-rose-500/80 to-rose-500/0",
  violet: "from-violet-500/80 to-violet-500/0",
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  change,
  changeType,
  color,
})
  {
  return (
    <Card className="relative group min-h-45 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]">
      {/* Flex row keeps the title and icon on the same line */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium tracking-wide text-slate-400">
          {title}
        </CardTitle>
        {/* Render icon if passed as a prop */}
        {Icon && (
          <div className="rounded-md bg-slate-800/50 p-2 text-slate-400 transition-colors group-hover:bg-slate-800 group-hover:text-slate-300">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <div
        className={`absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-linear-to-r ${gradients[color]}`}/>
      
      </CardHeader>

      <CardContent>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {value}
        </h2>
        <div className="mt-4 flex items-center gap-2">
          {changeType === "increase" ? (
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-400" />
          )}

          <span
            className={`text-sm font-semibold ${
              changeType === "increase"
                ? "text-emerald-400"
                : "text-rose-400"
            }`}
          >
            {change}
          </span>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
}