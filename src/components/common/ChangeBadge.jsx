import { TrendingDown, TrendingUp } from "lucide-react";

export default function ChangeBadge({
    value = 0,
    type,
}) {
    const roundedValue = Math.abs(Math.round(value));

    let good;

    if (type === "expense") {
        good = value < 0;
    } else {
        good = value > 0;
    }

    const colors =
        value === 0
            ? "bg-slate-500/10 text-slate-300"
            : good
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-rose-500/10 text-rose-400";

    return (
        <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${colors}`}
        >
            {value > 0 && <TrendingUp className="h-3 w-3" />}

            {value < 0 && <TrendingDown className="h-3 w-3" />}

            {roundedValue}%
        </div>
    );
}