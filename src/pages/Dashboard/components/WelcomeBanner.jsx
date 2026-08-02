import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { formatDate } from "@/utils/formatDate";

const hour = new Date().getHours();

const greeting =
  hour < 12
    ? "Good Morning"
    : hour < 17
    ? "Good Afternoon"
    : "Good Evening";

    

export default function WelcomeBanner({
  username,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  onButtonClick,
}) {

const { preferences } = useSettings();
const date = new Date();

const weekday = new Intl.DateTimeFormat(
  preferences.dateFormat === "MM/DD/YYYY"
    ? "en-US"
    : "en-GB",
  {
    weekday: "long",
    timeZone: preferences.timezone,
  }
).format(date);

const today = `${weekday} • ${formatDate(
  date,
  preferences.dateFormat,
  preferences.timezone
)}`;

  return (
    <section className="group relative overflow-hidden rounded-2xl border border-border bg-linear-to-r from-background via-card to-background transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="relative flex items-center justify-between p-8">
        <div className="space-y-4">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-foreground">
              <span className="animate-wave">👋</span>
              {greeting},{" "}
              <span className="bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                {username}
              </span>
            </h1>
              
            <p className="mt-2 max-w-xl text-muted-foreground">
              {description}
            </p>

            <p className="mt-1 text-sm font-bold text-muted-foreground">
              {today}
            </p>
            
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"></span>
                <span className="text-sm font-medium text-primary">
                  Today's Snapshot
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onButtonClick}
          size="lg"
          className="gap-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90"
        >
          {ButtonIcon && <ButtonIcon className="h-4 w-4" />}
          {buttonText}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}