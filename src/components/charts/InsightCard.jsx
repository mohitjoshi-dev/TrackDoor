import { ArrowRight } from "lucide-react";

export default function InsightCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "text-primary",
  bgColor = "bg-primary/10",
  onClick,
}) {
  return (
    <div
    onClick={onClick}
    className={`rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 ${
        onClick ? "cursor-pointer" : ""
    }`}
    >      
    <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`rounded-xl p-3 ${bgColor}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>

      <div className="mt-5 flex items-center text-sm text-primary">
        <span>View details</span>

        <ArrowRight className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}