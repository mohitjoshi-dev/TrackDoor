import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// We keep your custom gradients exactly as they are so the top borders retain their distinct colors
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
}) {
  return (
    <Card className="relative group min-h-45 rounded-2xl border border-border bg-card/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className="rounded-md bg-secondary/50 p-2 text-muted-foreground transition-colors group-hover:bg-secondary group-hover:text-foreground">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <div
          className={`absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-linear-to-r ${gradients[color]}`}
        />
      </CardHeader>

      <CardContent>
        <h2 className="text-3xl font-bold tracking-tight text-card-foreground">
          {value}
        </h2>
        <div className="mt-4 flex items-center gap-2">
          {changeType === "increase" ? (
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-500" />
          )}

          <span
            className={`text-sm font-semibold ${
              changeType === "increase" ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {change}
          </span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
}