import { Switch } from "@/components/ui/switch";

export default function SettingsToggle({ item }) {
  const Icon = item.icon;

  return (
    <div className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}
        >
          <Icon className={`h-5 w-5 ${item.iconColor}`} />
        </div>

        <div>
          <h3 className="font-medium">
            {item.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {item.subtitle}
          </p>
        </div>
      </div>

      <Switch checked={item.enabled} />
    </div>
  );
}