import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { TrafficRow, densityDistribution } from "./data";

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "0.5rem",
  fontSize: "12px",
  fontFamily: "ui-monospace, monospace",
};

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="glass-card rounded-2xl p-5">
    <div className="mb-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    <div className="h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        {children as any}
      </ResponsiveContainer>
    </div>
  </div>
);

export const VehicleChart = ({ data }: { data: TrafficRow[] }) => (
  <ChartCard title="Vehicle Count" subtitle="Detections over the last 2 hours">
    <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="vehicleFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
      <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
      <Tooltip contentStyle={tooltipStyle} />
      <Area type="monotone" dataKey="vehicleCount" name="Vehicles" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#vehicleFill)" />
    </AreaChart>
  </ChartCard>
);

export const SpeedChart = ({ data }: { data: TrafficRow[] }) => (
  <ChartCard title="Average Speed" subtitle="km/h over time">
    <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
      <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
      <Tooltip contentStyle={tooltipStyle} />
      <Line type="monotone" dataKey="speed" name="Speed" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
    </LineChart>
  </ChartCard>
);

export const DensityChart = ({ data }: { data: TrafficRow[] }) => {
  const dist = densityDistribution(data);
  return (
    <ChartCard title="Density Distribution" subtitle="Sample frequency by class">
      <PieChart>
        <Pie data={dist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} stroke="hsl(var(--card))" strokeWidth={2}>
          {dist.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 12, fontFamily: "ui-monospace, monospace" }}
        />
      </PieChart>
    </ChartCard>
  );
};
