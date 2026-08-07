import { useSettings } from "@/context/SettingsContext";
import { formatDate } from "@/utils/formatDate";

import morningScene from "@/assets/scenes/morning.png";
import afternoonScene from "@/assets/scenes/afternoon.png";
import eveningScene from "@/assets/scenes/evening.png";
import nightScene from "@/assets/scenes/night.png";

const hour = new Date().getHours();

const getHeroContent = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      greeting: "Good Morning",
      badge: "Morning Focus",
      emoji: "🌅",
      image: morningScene,
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      greeting: "Good Afternoon",
      badge: "Afternoon Flow",
      emoji: "☀️",
      image: afternoonScene,
    };
  }

  if (hour >= 17 && hour < 20) {
    return {
      greeting: "Good Evening",
      badge: "Evening Review",
      emoji: "🌇",
      image: eveningScene,
    };
  }

  return {
    greeting: "Good Night",
    badge: "Night Summary",
    emoji: "🌙",
    image: nightScene,
  };
};

export default function WelcomeBanner({username, description, }) {

const hero = getHeroContent();
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
    <section className="group relative h-full overflow-hidden rounded-[30px] border border-border bg-[#0b1120] transition-all duration-300">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="relative z-20 flex h-full flex-col justify-start p-10">
        <div className="space-y-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 backdrop-blur-xl">
            <span className="text-sm font-medium text-violet-300">
              {hero.emoji} {hero.badge}
            </span>
          </div>
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-foreground">
              <span className="animate-wave">👋</span>
              {hero.greeting},{" "}
              <span className="bg-linear-to-r from-primary to-blue-300 bg-clip-text text-transparent drop-shadow-none">
                {username}
              </span>
            </h1>
              
            <p className="mt-2 max-w-xl text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {description}
            </p>

            <p className="mt-1 text-sm font-semibold text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {today}
            </p>
            
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"></span>
                <span className="text-sm font-medium text-white">
                  Today's Snapshot
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-full overflow-hidden rounded-b-[30px]">
        <img
          src={hero.image}
          alt="Landscape"
          className="w-full h-full object-cover object-bottom transition-all duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-transparent" />
      </div>
    </section>
  );
}