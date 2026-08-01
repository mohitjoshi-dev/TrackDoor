import { useState } from "react";

import CardWrapper from "@/components/common/CardWrapper";
import SettingsItem from "./SettingsItem";
import { Download, Upload, Trash2 } from "lucide-react";
import ExportDialog from "@/pages/Settings/dialogs/ExportDialog";

export default function DataCard() {
const [exportOpen, setExportOpen] = useState(false);

const data = [
  {
    title: "Export Data",
    subtitle: "Download your transactions",
    value: "JSON",
    icon: Download,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
    onClick: () => setExportOpen(true),
  },
  {
    title: "Import Data",
    subtitle: "Restore from a backup",
    value: "",
    icon: Upload,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-500",
  },
  {
    title: "Clear All Data",
    subtitle: "Delete all transactions permanently",
    value: "",
    icon: Trash2,
    iconBg: "bg-red-500/20",
    iconColor: "text-red-500",
  },
];


  return (
  <>
    <CardWrapper>
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Data
        </h2>

        <p className="text-sm text-muted-foreground">
          Backup and manage your application data.
        </p>
      </div>

      <div className="space-y-1">
        {data.map((item) => (
          <SettingsItem
            key={item.title}
            item={item}
            onClick={item.onClick}
          />
        ))}
      </div>
    </CardWrapper>

    <ExportDialog
      open={exportOpen}
      onOpenChange={setExportOpen}
    />
  </>
);
}