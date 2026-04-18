import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: number;
  accent?: "primary" | "accent" | "success" | "warning";
  badge?: string;
}

const accentMap = {
  primary: "text-primary bg-primary/10 border-primary/30",
  accent: "text-accent bg-accent/10 border-accent/30",
  success: "text-success bg-success/10 border-success/30",
  warning: "text-warning bg-warning/10 border-warning/30",
};

const MetricCard = ({ label, value, unit, icon: Icon, trend, accent = "primary", badge }: MetricCardProps) => {
  return (
    <div className="glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-primary/40 transition-colors">
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
      <div className="relative flex items-start justify-between mb-4">
        <div className={cn("h-10 w-10 rounded-xl border flex items-center justify-center", accentMap[accent])}>
          <Icon className="h-5 w-5" />
        </div>
        {badge && (
          <span className={cn("text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border", accentMap[accent])}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tabular-nums">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {trend >= 0 ? (
            <TrendingUp className="h-3.5 w-3.5 text-success" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-danger" />
          )}
          <span className={trend >= 0 ? "text-success" : "text-danger"}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
          <span className="text-muted-foreground">vs last hour</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
