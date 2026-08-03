import { Outlet } from "react-router-dom";
import { WalletCards, ShieldCheck, BarChart3 } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden overflow-hidden border-r border-border bg-linear-to-br from-primary/10 via-background to-background lg:flex">

          {/* Glow */}
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative flex h-full w-full flex-col justify-between p-14">

            <div>
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <WalletCards className="h-7 w-7" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold">
                    Smart Expense Tracker
                  </h1>

                  <p className="text-muted-foreground">
                    Budget smarter. Save better.
                  </p>
                </div>

              </div>
            </div>

            <div className="max-w-lg">

              <h2 className="text-5xl font-bold leading-tight">
                Your money deserves better tracking.
              </h2>

              <p className="mt-6 text-lg text-muted-foreground">
                Analyze spending, manage budgets, visualize trends,
                and stay in complete control of your finances.
              </p>

              <div className="mt-10 space-y-5">

                <Feature
                  icon={BarChart3}
                  title="Powerful Analytics"
                  text="Interactive charts and financial insights."
                />

                <Feature
                  icon={ShieldCheck}
                  title="Secure Cloud Sync"
                  text="Your data stays protected and available everywhere."
                />

                <Feature
                  icon={WalletCards}
                  title="Budget Management"
                  text="Track expenses and savings with ease."
                />

              </div>

            </div>

            <p className="text-sm text-muted-foreground">
              © 2026 Smart Expense Tracker
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-4">

      <div className="rounded-xl bg-primary/10 p-3">
        <Icon className="h-5 w-5 text-primary" />
      </div>

      <div>
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {text}
        </p>
      </div>

    </div>
  );
}