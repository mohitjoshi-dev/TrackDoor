import InsightHeader from "./InsightHeader";
import InsightSummary from "./InsightSummary";
import InsightMetrics from "./InsightMetrics";
import RecommendationCard from "./RecommendationCard";
import useInsights from "@/hooks/useInsights";
import { useState } from "react";
import AIReportDialog from "./dialog/AIReportDialog";
import ViewDetailsButton from "./ViewDetailsButton";

export default function AIInsightCard() {
    const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full min-h-[420px] flex-col rounded-[30px] border border-border bg-card p-7 space-y-3">

      <InsightHeader />

      <InsightSummary />

      <InsightMetrics />

      <RecommendationCard
        onViewDetails={() => setOpen(true)}
      />

      <AIReportDialog 
      open={open} 
      onOpenChange={setOpen} 
      />
    </div>
  );
}