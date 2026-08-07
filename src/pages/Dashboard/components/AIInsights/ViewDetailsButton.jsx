import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ViewDetailsButton({ onClick }) {
  return (
    <div className="pt-2">
      <Button
        onClick={onClick}
        variant="ghost"
        className="w-full justify-between rounded-xl border border-border bg-muted/30 hover:bg-muted/50"
      >
        <span>View Details</span>

        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}