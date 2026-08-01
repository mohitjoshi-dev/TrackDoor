 import { ShieldCheck } from "lucide-react";

export default function HealthScoreCard({
  score,
  status,
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8">

      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10">

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Financial Health
            </h2>

            <p className="text-sm text-muted-foreground">
              Overall financial wellness
            </p>
          </div>
        </div>

        {/* Score */}

        <div className="mt-8 flex items-end gap-2">

          <span className="animate-pulse text-6xl font-black">
            {score ?? "--"}
          </span>

          <span className="mb-2 text-xl text-muted-foreground">
            /100
          </span>

        </div>

        {/* Progress */}

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-secondary">

          <div
            className={`h-full rounded-full transition-all duration-700 ${
              score === null
                ? "bg-muted"
                : score >= 90
                ? "bg-emerald-500"
                : score >= 75
                ? "bg-cyan-500"
                : score >= 60
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{
              width: score === null ? "0%" : `${score}%`,
            }}
          />
        </div>

        {/* Status */}

        <div className="mt-6 flex items-center justify-between">

          <div>

            <p className={`text-xl font-bold ${status.color}`}>
              {status.label}
            </p>

            <p className="text-muted-foreground">
              {score === null
                ? "Add your first income and expense transactions to calculate your financial health."
                : score >= 90
                ? "Outstanding! Your finances are in excellent shape."
                : score >= 75
                ? "You're doing well. Keep maintaining your budget."
                : score >= 60
                ? "You're on the right track, but there is room for improvement."
                : "Your spending needs attention. Review your budgets."}
            </p>

          </div>

          <div className="text-right">

            <p className="text-sm text-muted-foreground">
              Score
            </p>

            <p className="text-3xl font-bold">
              {score ?? "--"}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}