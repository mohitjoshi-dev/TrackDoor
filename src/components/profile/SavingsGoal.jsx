import { Target, Sparkles } from "lucide-react";
import ProfileCardWrapper from "./ProfileCardWrapper";
import { useTransactions } from "@/context/TransactionsContext";

export default function SavingsGoal() {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentSavings = totalIncome - totalExpense;
  const savingsGoal = 50000;

  const progress = Math.min((currentSavings / savingsGoal) * 100, 100);
  const remaining = Math.max(savingsGoal - currentSavings, 0);
  const displaySavings = Math.max(currentSavings, 0);

  // Time & Pace Calculations
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysLeft = endOfMonth.getDate() - today.getDate();
  
  const isGoalMet = remaining === 0;
  const dailyTarget = daysLeft > 0 ? Math.ceil(remaining / daysLeft) : remaining;

  return (
    <ProfileCardWrapper>
      <div className="flex h-full min-h-[340px] flex-col">
        
        {/* Header - Added shrink-0 so it anchors firmly to the top */}
        <div className="flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-slate-400" />
            <h2 className="text-lg font-bold text-white">Savings Goal</h2>
          </div>
          
          <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10">
            Edit Goal
          </button>
        </div>

        {/* 
          Main Content Wrapper 
          Changed to pt-10 (padding-top) and pb-2 to push the entire block lower 
          into the center of the available space.
        */}
        <div className="flex flex-1 flex-col justify-center pb-2 pt-10">
          
          {/* Top Stats */}
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-slate-400">
                Monthly Savings Goal
              </p>
              <h3 className="text-3xl font-bold text-white">
                ₹{savingsGoal.toLocaleString("en-IN")}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-emerald-400">
                {Math.round(progress)}%
              </p>
              <p className="text-sm font-medium text-slate-400">Completed</p>
            </div>
          </div>

          {/* Custom Horizontal Progress Bar */}
          <div className="mb-5 h-3.5 w-full overflow-hidden rounded-full bg-slate-800/80">
            <div
              className="h-full rounded-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)] transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Bottom Stats */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-white">
                ₹{displaySavings.toLocaleString("en-IN")}
              </p>
              <p className="text-xs font-medium text-slate-400">Saved</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white">
                ₹{remaining.toLocaleString("en-IN")}
              </p>
              <p className="text-xs font-medium text-slate-400">Remaining</p>
            </div>
          </div>

          {/* Smart Insight Box */}
          <div className="mt-7 flex items-start gap-3 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
            <div>
              <p className="text-sm font-medium text-violet-100">
                {isGoalMet ? "Goal Achieved! 🎉" : "Smart Insight"}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-violet-200/70">
                {isGoalMet 
                  ? "Incredible job! You have successfully reached your monthly savings target." 
                  : `With ${daysLeft} days left in the month, try keeping your expenses down to save ₹${dailyTarget.toLocaleString("en-IN")} daily to hit your target.`
                }
              </p>
            </div>
          </div>

        </div>
      </div>
    </ProfileCardWrapper>
  );
}