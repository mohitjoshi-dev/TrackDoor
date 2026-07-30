import { ChevronRight } from "lucide-react";

export default function SettingsItem({ item, onClick }) {
  const Icon = item.icon;

  return (
  <button
    onClick={onClick}
    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-muted/50"
  >
    <div className="flex items-center gap-4">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}
      >
        <Icon className={`h-5 w-5 ${item.iconColor}`} />
      </div>

      <div className="text-left">
        <h3 className="font-medium">
          {item.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {item.subtitle}
        </p>
      </div>
    </div>

    <div className="flex min-w-28 items-center justify-end gap-2">
    {item.value && (
        <span className="whitespace-nowrap text-sm text-muted-foreground">
        {item.value}
        </span>
    )}

    <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  </button>
);
}