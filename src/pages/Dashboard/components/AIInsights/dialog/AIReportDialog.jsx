import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useAIReport from "@/hooks/useAIReport";
import { generateAIReport } from "@/services/aiReportService";
import AIChatDrawer from "./AIChatDrawer";
import { 
  Bot, 
  Sparkles, 
  FileText, 
  Activity, 
  TrendingUp, 
  Wallet, 
  Heart, 
  Scale, 
  BriefcaseMedical, 
  Target, 
  PiggyBank, 
  ArrowDownCircle,
  Lightbulb,
  Trophy,
} from "lucide-react";

export default function AIReportDialog({ open, onOpenChange }) {
  
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const previousMonth = date.toLocaleString('default', { month: 'long', year: 'numeric' });
  const report = useAIReport();
  const [aiReport, setAIReport] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAIError] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
  if (!open) return;

  const fetchAIReport = async () => {
    setLoadingAI(true);
    setAIError(null);

    try {
      const ai = await generateAIReport({
        income: report.balanceOverview.income,
        expenses: report.balanceOverview.expenses,
        savings: report.balanceOverview.savings,
        savingsRate: parseInt(report.balanceOverview.savingsRate),
        financialScore: report.financialHealth.score,
        topCategory: report.spendingHighlights.highestExpense.category,
        expenseChange: parseFloat(report.spendingHighlights.monthlyDifference),
        bestMover: {
          category: report.spendingHighlights.bestMover.category,
        },
      });

      setAIReport(ai);
    } catch (err) {
      console.error(err);
      setAIError("Failed to generate AI report.");
    } finally {
      setLoadingAI(false);
    }
  };

  fetchAIReport();
}, [open]);
  

  const circumference = 2 * Math.PI * 42;
  const progress =
  (circumference * report.financialHealth.score) / 100;
  
  const iconMap = {
    "piggy-bank": PiggyBank,
    target: Target,
    "trending-up": TrendingUp,
    trophy: Trophy,
   };

   const colorClasses = {
    emerald: "bg-emerald-500/10 text-emerald-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    sky: "bg-sky-500/10 text-sky-400",
    violet: "bg-violet-500/10 text-violet-400",
    };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        unstyled
        showCloseButton={false}
        className="w-[68vw] max-w-none p-0 border-none bg-transparent"
        >
        <div className="flex max-h-[90vh] min-w-[900px] w-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#0E1628]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.45)]">
          
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between border-b border-white/10 px-6 py-4 z-10 bg-[#0E1628]/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10">
                <Bot className="h-6 w-6 text-violet-400" />
              </div>
              <div>
                
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                  AI Monthly Report <Sparkles className="h-4 w-4 text-yellow-400" />
                </h2>
                
                <p className="text-xs text-slate-400">
                  Smart insights about your finances for {previousMonth}
                </p>
              </div>
            </div>
            
            <button 
            onClick={() => onOpenChange(false)} 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white">
              ✕
            </button>

          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            
            {/* Executive Summary Hero */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-r from-[#201538] via-[#4a223f] to-[#703036] p-5 shadow-inner">
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/20 border border-white/10 backdrop-blur-md">
                  <FileText className="h-6 w-6 text-violet-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Executive Summary
                  </h3>
                  <div className="space-y-1 text-sm text-white/90">
                    
                    <p className="text-sm leading-7 text-white/90">
                        {
                            aiReport?.summary ??
                            report.executiveSummary.summary
                        }
                    </p>

                  </div>
                </div>
              </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-3 gap-5">
              
              {/* Column 1: Spending Highlights */}
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-violet-400" />
                  <h4 className="font-semibold text-white">
                    Spending Highlights
                </h4>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                            Highest Expense
                        </p>
                        <p className="text-sm font-medium text-white truncate w-20">
                            {report.spendingHighlights.highestExpense?.category}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-rose-400">
                        {report.spendingHighlights.highestExpense?.amount}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {report.spendingHighlights.highestExpense?.percentage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                            Best Mover
                        </p>
                        <p className="text-sm font-medium text-white truncate w-20">
                            {report.spendingHighlights.bestMover?.category}
                        </p>
                      </div>
                    
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-emerald-400">
                        {report.spendingHighlights.bestMover?.change}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {report.spendingHighlights.bestMover?.direction}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                            Total Expenses
                        </p>
                        <p className="text-sm font-medium text-white">
                            {report.spendingHighlights.totalExpense}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-emerald-400">
                        {report.spendingHighlights.monthlyDifference}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {report.spendingHighlights.monthlyLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Financial Health */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-5 text-center">
                <div className="mb-2 flex w-full items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-violet-400" />
                  <h4 className="font-semibold text-white">
                    Financial Health
                  </h4>
                </div>
                
                <div className="relative mb-2 flex h-36 w-36 items-center justify-center shrink-0">
                  <svg className="absolute inset-0 h-full w-full rotate-180" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="score-gradient" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="50%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset="-33" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="url(#score-gradient)" strokeWidth="8" strokeDasharray={`${progress} ${circumference}`} strokeLinecap="round" />
                  </svg>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-white">
                        {report.financialHealth.score}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                        /100
                    </span>
                    <span className="mt-1 text-xs font-semibold text-emerald-400">
                        {report.financialHealth.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed px-2">
                  {report.financialHealth.message}
                </p>
              </div>

              {/* Column 3: Balance Overview */}
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-violet-400" />
                  <h4 className="font-semibold text-white">
                    Balance Overview
                  </h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 p-1.5 text-emerald-400 shrink-0">
                        <ArrowDownCircle className="h-4 w-4" />
                      </div>
                      Income
                    </div>
                    <span className="font-medium text-white text-sm">
                        {report.balanceOverview.income}
                    </span>
                  </div>
                 
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="rounded-full border border-rose-500/20 bg-rose-500/10 p-1.5 text-rose-400 shrink-0">
                        <Activity className="h-4 w-4" />
                      </div>
                      Expenses
                    </div>
                    <span className="font-medium text-white text-sm">
                        {report.balanceOverview.expenses}
                    </span>
                  </div>
                 
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="rounded-full border border-sky-500/20 bg-sky-500/10 p-1.5 text-sky-400 shrink-0">
                        <Wallet className="h-4 w-4" />
                      </div>
                      Savings
                    </div>
                    <span className="font-medium text-white text-sm">
                        {report.balanceOverview.savings}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400 shrink-0">
                        <span className="font-bold text-[10px]">
                            %
                        </span>
                      </div>
                      Savings Rate
                    </div>
                    <span className="font-medium text-emerald-400 text-sm">
                        {report.balanceOverview.savingsRate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-violet-400" />
                <h4 className="font-semibold text-white">
                    AI Recommendations
                </h4>
              </div>
              
            <div className="grid grid-cols-3 gap-4">
                {report.recommendations.map((recommendation, index) => {
                    const Icon =
                    iconMap[recommendation.icon] || BriefcaseMedical;

                    return (
                    <div
                        key={index}
                        className="rounded-xl border border-white/5 bg-black/20 p-4 transition-all duration-300 hover:border-white/10 hover:bg-black/30" >
                        <div
                        className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${
                            colorClasses[recommendation.accentColor]
                        }`}  >
                        <Icon className="h-4 w-4" />
                        </div>

                        <h5 className="mb-1 text-sm font-semibold text-white">
                        {recommendation.title}
                        </h5>

                        <p className="text-[11px] leading-snug text-slate-400">
                        {recommendation.description}
                        </p>
                    </div>
                    );
                })}
            </div>
            </div>

           
            {/* Footer */}
            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/30 p-4 mt-2">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">
                    Want to know more?
                  </h5>
                  <p className="text-xs text-slate-400">
                    Ask anything about your finances and I'll help you.
                  </p>
                </div>
              </div>
              <button
                    onClick={() => setChatOpen(true)}
                    className="shrink-0 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                    <Sparkles className="h-4 w-4" />
                    Ask AI
              </button>
            </div>
          </div>
        </div>

            <AIChatDrawer
            open={chatOpen}
            onClose={() => setChatOpen(false)}
            report={report}
            />

      </DialogContent>
    </Dialog>
  );
}