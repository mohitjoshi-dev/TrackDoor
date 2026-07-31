import {
  Download,
  Upload,
  Trash2,
  ChevronRight,
} from "lucide-react";

import CardWrapper from "../../../components/common/CardWrapper";


export default function DataManagementCard() {

  const actions = [
    {
      title: "Export Data",
      subtitle: "Download your transactions",
      icon: Download,
      iconBg: "bg-sky-500/20",
      iconColor: "text-sky-500",
    },
    {
      title: "Import Data",
      subtitle: "Restore a previous backup",
      icon: Upload,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-500",
    },
    {
      title: "Clear Data",
      subtitle: "Delete all local transactions",
      icon: Trash2,
      iconBg: "bg-red-500/20",
      iconColor: "text-red-500",
    },
  ];    

  return (
    <CardWrapper>
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Data Management
        </h2>

        <p className="text-sm text-muted-foreground">
          Backup and manage your financial data.
        </p>
      </div> 

      <div className="mt-2 space-y-1">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group flex items-center justify-between rounded-xl px-2 py-5 transition-all duration-300 hover:bg-background/40 cursor-pointer border-b border-border/40 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className={`${item.iconBg} rounded-xl shadow-sm p-3`}>
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>

                <div>
                  <p
                    className={`font-semibold ${
                      item.title === "Clear Data"
                        ? "text-red-400 group-hover:text-red-300"
                        : ""
                    }`}
                  >
                    {item.title}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-muted-foreground/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
            </div>
          );
        })}
      </div>
    </CardWrapper>
  );
}