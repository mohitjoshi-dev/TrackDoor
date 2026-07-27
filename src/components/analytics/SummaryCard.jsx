import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function SummaryCard({
  title,
  value,
  icon: Icon,
  color = "text-primary",
  bgColor = "bg-primary/10",
  trend,
}) {
  const isPositive = trend >= 0;

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-3 ${bgColor}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>

      {trend !== undefined && (
        <div className="mt-5 flex items-center gap-2">
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}

          <span
            className={`text-sm font-medium ${
              isPositive
                ? "text-emerald-500"
                : "text-red-500"
            }`}
          >
            {Math.abs(trend)}%
          </span>

          <span className="text-sm text-muted-foreground">
            vs last month
          </span>
        </div>
      )}
    </div>
  );
}