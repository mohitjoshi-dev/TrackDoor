import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const hour = new Date().getHours();

const greeting =
  hour < 12
    ? "Good Morning"
    : hour < 17
    ? "Good Afternoon"
    : "Good Evening";

const date = new Date();

const today = `${date.toLocaleDateString("en-IN", {
  weekday: "long",
})} • ${date.toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
})}`;

export default function WelcomeBanner({
  username,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  onButtonClick,
}) {
  
  return (
    <section className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 transition-all duration-300 hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-950/30">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="relative flex items-center justify-between p-8">
        <div className="space-y-4">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-white">
              <span className="animate-wave">
                🚀
              </span>
              {greeting},{" "}
              <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {username}
              </span>
            </h1>
              
            <p className="mt-2 max-w-xl text-slate-400">
              {description}
            </p>

            <p className="mt-1 text-sm font-bold text-slate-500">
              {today}
            </p>
            
            <div className="mt-4">
              {/* Updated Financial Overview Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5">
                {/* Glowy dot */}
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                <span className="text-sm font-medium text-cyan-300">
                  Today's Snapshot
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onButtonClick}
          size="lg"
          className="gap-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400"
        >
          {ButtonIcon && (
            <ButtonIcon className="h-4 w-4" />
          )}

          {buttonText}

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}