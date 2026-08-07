import { Bot, Sparkles, TrendingUp } from "lucide-react";

export default function InsightHeader() {
  return (
    <div className="flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/15 border border-violet-500/20">
          <Bot className="h-6 w-6 text-violet-400" />
        </div>

        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-white">
            AI Insight
          </h2>

          <Sparkles className="h-5 w-5 text-yellow-400" />
        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

        <TrendingUp className="h-4 w-4 text-emerald-400" />

        <span className="text-sm font-medium text-white">
          Vs Last Month
        </span>

      </div>

    </div>
  );
}