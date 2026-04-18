import { Camera, Maximize2, MapPin } from "lucide-react";

const LiveFeed = () => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-wider">Live Traffic Feed</h2>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> CAM-07 · Junction A12
          </div>
          <Maximize2 className="h-3.5 w-3.5 cursor-pointer hover:text-foreground" />
        </div>
      </div>
      <div className="relative aspect-video bg-background grid-bg overflow-hidden">
        {/* Simulated feed */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 scan-line pointer-events-none" />

        {/* Mock vehicle bounding boxes */}
        <div className="absolute top-[35%] left-[20%] h-16 w-24 border-2 border-primary rounded-md">
          <span className="absolute -top-5 left-0 text-[10px] font-mono bg-primary text-primary-foreground px-1.5 rounded">CAR · 0.97</span>
        </div>
        <div className="absolute top-[55%] left-[55%] h-20 w-32 border-2 border-accent rounded-md">
          <span className="absolute -top-5 left-0 text-[10px] font-mono bg-accent text-accent-foreground px-1.5 rounded">TRUCK · 0.92</span>
        </div>
        <div className="absolute top-[40%] left-[72%] h-12 w-16 border-2 border-success rounded-md">
          <span className="absolute -top-5 left-0 text-[10px] font-mono bg-success text-background px-1.5 rounded">BIKE · 0.88</span>
        </div>

        {/* Overlay HUD */}
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded bg-background/70 backdrop-blur-sm border border-border/60">
          <span className="h-1.5 w-1.5 rounded-full bg-danger pulse-dot" />
          <span className="text-[10px] font-mono uppercase tracking-wider">REC</span>
          <span className="text-[10px] font-mono text-muted-foreground">00:47:13</span>
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-background/70 backdrop-blur-sm border border-border/60">
          <span className="text-[10px] font-mono text-muted-foreground">1920×1080 · 30FPS</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-muted-foreground uppercase">Detections active</p>
            <p className="text-2xl font-bold">3 <span className="text-xs font-normal text-muted-foreground">objects tracked</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-muted-foreground uppercase">Latency</p>
            <p className="text-sm font-mono text-success">42 ms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
