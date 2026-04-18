import { TrafficRow } from "./data";
import { cn } from "@/lib/utils";

const densityStyle: Record<string, string> = {
  Low: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  High: "bg-danger/15 text-danger border-danger/30",
};

const DataTable = ({ rows }: { rows: TrafficRow[] }) => {
  const reversed = [...rows].reverse();
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Detection Log</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{rows.length} records · 5 min interval</p>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Auto-scroll · Newest first
        </span>
      </div>
      <div className="max-h-[360px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-card/95 backdrop-blur-md z-10 text-xs uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border/60">
              <th className="text-left font-medium px-5 py-3">Timestamp</th>
              <th className="text-right font-medium px-5 py-3">Vehicles</th>
              <th className="text-right font-medium px-5 py-3">Speed (km/h)</th>
              <th className="text-right font-medium px-5 py-3">Density</th>
            </tr>
          </thead>
          <tbody>
            {reversed.map((r, i) => (
              <tr key={i} className="border-b border-border/40 hover:bg-secondary/40 transition-colors">
                <td className="px-5 py-3 font-mono text-muted-foreground">{r.timestamp}</td>
                <td className="px-5 py-3 text-right tabular-nums font-medium">{r.vehicleCount}</td>
                <td className="px-5 py-3 text-right tabular-nums">{r.speed}</td>
                <td className="px-5 py-3 text-right">
                  <span className={cn("inline-block text-[11px] font-mono uppercase px-2 py-0.5 rounded-full border", densityStyle[r.density])}>
                    {r.density}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
