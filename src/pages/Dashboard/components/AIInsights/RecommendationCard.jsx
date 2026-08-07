import { Lightbulb } from "lucide-react";
import useInsights from "@/hooks/useInsights";

export default function RecommendationCard({ onViewDetails,}) {
  const { recommendation } = useInsights();  

  return (
    <div className="mt-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">
      <div className="flex items-start justify-between gap-5">
        {/* Left */}

        <div className="flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
          </div>

          <div>
            <h3 className="text-base font-semibold text-violet-300">
              {recommendation.title}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">
              {recommendation.message}
            </p>
          </div>
        </div>

        {/* Right */}

        <button
        onClick={onViewDetails}
        className="rounded-xl border border-violet-500/30 px-5 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20">
          View Details →
        </button>
      </div>
    </div>
  );
}