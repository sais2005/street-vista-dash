import { useEffect, useMemo, useState } from "react";
import { Car, Gauge, Layers, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/dashboard/Header";
import LiveFeed from "@/components/dashboard/LiveFeed";
import MetricCard from "@/components/dashboard/MetricCard";
import { VehicleChart, SpeedChart, DensityChart } from "@/components/dashboard/Charts";
import DataTable from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { generateTimeSeries, toCSV, TrafficRow } from "@/components/dashboard/data";

const Index = () => {
  const [rows, setRows] = useState<TrafficRow[]>(() => generateTimeSeries(24));
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    document.title = "Traffic Data Analytics Platform | Smart City Ops";
  }, []);

  const latest = rows[rows.length - 1];
  const prev = rows[rows.length - 2];

  const avgSpeed = useMemo(
    () => Math.round(rows.reduce((s, r) => s + r.speed, 0) / rows.length),
    [rows]
  );

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRows(generateTimeSeries(24));
      setRefreshing(false);
      toast.success("Data refreshed", { description: "Latest detections synced from edge nodes." });
    }, 700);
  };

  const handleDownload = () => {
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `traffic-data-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded", { description: `${rows.length} records exported.` });
  };

  const vehicleTrend = prev ? Math.round(((latest.vehicleCount - prev.vehicleCount) / prev.vehicleCount) * 100) : 0;
  const speedTrend = prev ? Math.round(((latest.speed - prev.speed) / prev.speed) * 100) : 0;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container max-w-[1600px] py-8 space-y-6">
        {/* Title row + actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Operations Overview</h2>
            <p className="text-sm text-muted-foreground mt-1 font-mono">
              Realtime detection · {new Date().toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleRefresh} disabled={refreshing} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
            <Button onClick={handleDownload} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
          </div>
        </div>

        {/* Top grid: feed + metrics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <LiveFeed />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4">
            <MetricCard
              label="Vehicle Count"
              value={latest.vehicleCount}
              unit="last interval"
              icon={Car}
              trend={vehicleTrend}
              accent="primary"
              badge="Live"
            />
            <MetricCard
              label="Average Speed"
              value={avgSpeed}
              unit="km/h"
              icon={Gauge}
              trend={speedTrend}
              accent="accent"
            />
            <MetricCard
              label="Traffic Density"
              value={latest.density}
              icon={Layers}
              accent={latest.density === "High" ? "warning" : latest.density === "Medium" ? "accent" : "success"}
              badge={latest.density === "High" ? "Alert" : "Stable"}
            />
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1"><VehicleChart data={rows} /></div>
          <div className="lg:col-span-1"><SpeedChart data={rows} /></div>
          <div className="lg:col-span-1"><DensityChart data={rows} /></div>
        </div>

        {/* Data table */}
        <DataTable rows={rows} />

        <footer className="text-center text-xs text-muted-foreground font-mono pt-4 pb-2">
          TRAFFIC ANALYTICS PLATFORM · v1.0 · EDGE-AI VISION PIPELINE
        </footer>
      </main>
    </div>
  );
};

export default Index;
