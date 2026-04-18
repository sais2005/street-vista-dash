export type Density = "Low" | "Medium" | "High";

export interface TrafficRow {
  timestamp: string;
  vehicleCount: number;
  speed: number;
  density: Density;
}

const pad = (n: number) => n.toString().padStart(2, "0");

export const generateTimeSeries = (points = 24): TrafficRow[] => {
  const now = new Date();
  const rows: TrafficRow[] = [];
  for (let i = points - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 5 * 60 * 1000);
    const hour = t.getHours();
    const rushFactor = (hour >= 7 && hour <= 10) || (hour >= 16 && hour <= 19) ? 1.6 : 1;
    const base = 60 + Math.sin(i / 2) * 25;
    const vehicleCount = Math.max(8, Math.round((base + Math.random() * 30) * rushFactor));
    const speed = Math.max(15, Math.round(75 - vehicleCount * 0.35 + (Math.random() * 10 - 5)));
    const density: Density = vehicleCount > 110 ? "High" : vehicleCount > 70 ? "Medium" : "Low";
    rows.push({
      timestamp: `${pad(t.getHours())}:${pad(t.getMinutes())}`,
      vehicleCount,
      speed,
      density,
    });
  }
  return rows;
};

export const densityDistribution = (rows: TrafficRow[]) => {
  const counts: Record<Density, number> = { Low: 0, Medium: 0, High: 0 };
  rows.forEach((r) => counts[r.density]++);
  return [
    { name: "Low", value: counts.Low, color: "hsl(var(--success))" },
    { name: "Medium", value: counts.Medium, color: "hsl(var(--warning))" },
    { name: "High", value: counts.High, color: "hsl(var(--danger))" },
  ];
};

export const toCSV = (rows: TrafficRow[]) => {
  const header = "Timestamp,Vehicle Count,Speed (km/h),Density";
  const body = rows
    .map((r) => `${r.timestamp},${r.vehicleCount},${r.speed},${r.density}`)
    .join("\n");
  return `${header}\n${body}`;
};
