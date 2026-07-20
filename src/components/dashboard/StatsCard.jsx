import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
}) {
  return (
    <Card className="group border-slate-800 bg-slate-950 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900 hover:shadow-md hover:shadow-slate-900/50">
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
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline space-x-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {value}
          </h2>
        </div>

        <div className="mt-2 flex items-center text-sm text-slate-400">
          {/* Trend Indicator */}
          {trend && (
            <span
              className={`mr-2 font-medium ${
                trendUp ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {trend}
            </span>
          )}
          <span className="truncate">{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  );
}