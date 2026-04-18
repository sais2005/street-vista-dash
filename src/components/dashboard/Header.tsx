import { Activity, Radio } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/60 bg-card/40 backdrop-blur-xl sticky top-0 z-40">
      <div className="container max-w-[1600px] flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center glow-primary">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Traffic Data <span className="text-gradient">Analytics Platform</span>
            </h1>
            <p className="text-xs text-muted-foreground font-mono">SMART CITY · OPERATIONS CENTER</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>NODE</span>
            <span className="text-foreground">SCC-014</span>
            <span className="mx-2 h-3 w-px bg-border" />
            <span>UPTIME</span>
            <span className="text-success">99.97%</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 pulse-dot" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <span className="text-xs font-medium text-success uppercase tracking-wider flex items-center gap-1">
              <Radio className="h-3 w-3" /> Live
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
