"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  Info,
  TrendingUp,
  DollarSign,
  Zap,
  RefreshCw,
  ArrowLeft,
  ChevronDown,
  Play,
  Menu,
  Settings,
  Bell,
  X,
  Search,
  Navigation,
  Activity,
  Sliders,
} from "lucide-react";

// ─── Interfaces ─────────────────────────────────────────────────────────────
interface RouteDetails {
  path: string[];
  profit: number;
  miles: number;
  profitPerMile: number;
  time: string;
}

interface DriverRouteSet {
  golden: RouteDetails;
  altA: RouteDetails;
  altB: RouteDetails;
}

interface Driver {
  id: string;
  name: string;
  location: string;
  avatarLabel: string;
}

// ─── Constants & Data ────────────────────────────────────────────────────────
const DRIVERS: Driver[] = [
  { id: "01", name: "Driver #01 - Mo", location: "Indianapolis", avatarLabel: "Mo" },
  { id: "02", name: "Driver #02 - Marcus Johnson", location: "Chicago", avatarLabel: "MJ" },
  { id: "03", name: "Driver #03 - Sarah Chen", location: "Detroit", avatarLabel: "SC" },
  { id: "04", name: "Driver #04 - Robert Martinez", location: "Cleveland", avatarLabel: "RM" },
  { id: "05", name: "Driver #05 - Amanda Foster", location: "St. Louis", avatarLabel: "AF" },
  { id: "06", name: "Driver #06 - David Kim", location: "Nashville", avatarLabel: "DK" },
  { id: "07", name: "Driver #07 - Lisa Torres", location: "Charlotte", avatarLabel: "LT" },
  { id: "08", name: "Driver #08 - James Wilson", location: "Richmond", avatarLabel: "JW" },
  { id: "09", name: "Driver #09 - Emily Rodriguez", location: "Buffalo", avatarLabel: "ER" },
  { id: "10", name: "Driver #10 - John Doe", location: "Albany", avatarLabel: "JD" },
];

const CITY_COORDS: Record<
  string,
  {
    x: number;
    y: number;
    name: string;
    score: string;
    profitRate: string;
    volume: string;
    nextBest: string;
    state: string;
    nodeNumber?: string;
  }
> = {
  Chicago: { x: 390, y: 270, name: "Chicago, IL", score: "9.2 / 10", profitRate: "$2.80", volume: "High", nextBest: "Detroit, MI", state: "IL", nodeNumber: "01" },
  Detroit: { x: 570, y: 220, name: "Detroit, MI", score: "7.8 / 10", profitRate: "$2.10", volume: "Medium", nextBest: "Buffalo, NY", state: "MI", nodeNumber: "02" },
  Cleveland: { x: 645, y: 310, name: "Cleveland, OH", score: "8.1 / 10", profitRate: "$2.30", volume: "High", nextBest: "Buffalo, NY", state: "OH", nodeNumber: "03" },
  Buffalo: { x: 740, y: 220, name: "Buffalo, NY", score: "8.4 / 10", profitRate: "$2.25", volume: "High", nextBest: "Albany, NY", state: "NY", nodeNumber: "02" },
  Albany: { x: 885, y: 235, name: "Albany, NY", score: "7.5 / 10", profitRate: "$1.90", volume: "Medium", nextBest: "New York, NY", state: "NY", nodeNumber: "05" },
  Columbus: { x: 530, y: 370, name: "Columbus, OH", score: "8.5 / 10", profitRate: "$2.45", volume: "High", nextBest: "Pittsburgh, PA", state: "OH", nodeNumber: "02" },
  Pittsburgh: { x: 690, y: 350, name: "Pittsburgh, PA", score: "8.7 / 10", profitRate: "$2.60", volume: "High", nextBest: "Harrisburg, PA", state: "PA", nodeNumber: "04" },
  Harrisburg: { x: 790, y: 340, name: "Harrisburg, PA", score: "8.0 / 10", profitRate: "$2.35", volume: "Medium", nextBest: "Philadelphia, PA", state: "PA", nodeNumber: "05" },
  "St. Louis": { x: 310, y: 450, name: "St. Louis, MO", score: "7.2 / 10", profitRate: "$1.85", volume: "Medium", nextBest: "Indianapolis, IN", state: "MO", nodeNumber: "06" },
  Indianapolis: { x: 440, y: 380, name: "Indianapolis, IN", score: "8.9 / 10", profitRate: "$2.70", volume: "High", nextBest: "Columbus, OH", state: "IN", nodeNumber: "07" },
  Cincinnati: { x: 490, y: 430, name: "Cincinnati, OH", score: "7.6 / 10", profitRate: "$2.05", volume: "Medium", nextBest: "Knoxville, TN", state: "OH", nodeNumber: "03" },
  Knoxville: { x: 510, y: 550, name: "Knoxville, TN", score: "7.0 / 10", profitRate: "$1.80", volume: "Low", nextBest: "Charlotte, NC", state: "TN", nodeNumber: "08" },
  Nashville: { x: 420, y: 560, name: "Nashville, TN", score: "7.9 / 10", profitRate: "$2.15", volume: "Medium", nextBest: "Knoxville, TN", state: "TN", nodeNumber: "08" },
  Charlotte: { x: 650, y: 600, name: "Charlotte, NC", score: "8.3 / 10", profitRate: "$2.40", volume: "High", nextBest: "Richmond, VA", state: "NC", nodeNumber: "09" },
  Richmond: { x: 800, y: 480, name: "Richmond, VA", score: "7.7 / 10", profitRate: "$2.00", volume: "Medium", nextBest: "Washington, DC", state: "VA", nodeNumber: "10" },
  Louisville: { x: 410, y: 420, name: "Louisville, KY", score: "7.5 / 10", profitRate: "$1.95", volume: "Medium", nextBest: "Cincinnati, OH", state: "KY", nodeNumber: "07" },
  Washington: { x: 820, y: 400, name: "Washington, DC", score: "8.2 / 10", profitRate: "$2.50", volume: "High", nextBest: "Baltimore, MD", state: "DC", nodeNumber: "10" },
};

const LAKES = [
  // Lake Michigan
  { d: "M 380 180 C 370 140, 375 100, 390 80 C 400 80, 405 110, 400 150 C 400 180, 390 190, 380 180 Z", label: "Lake Michigan" },
  // Lake Erie
  { d: "M 570 215 C 600 217, 660 240, 735 220 C 735 228, 670 250, 590 235 C 570 230, 565 220, 570 215 Z", label: "Lake Erie" },
  // Lake Ontario
  { d: "M 745 210 C 780 207, 820 195, 835 188 C 835 195, 795 215, 755 220 C 745 220, 740 215, 745 210 Z", label: "Lake Ontario" },
  // Lake Huron
  { d: "M 440 75 Q 490 65 530 115 Q 500 135 470 145 Q 450 115 440 75 Z", label: "Lake Huron" },
];

const STATE_LINES = [
  // IL-IN border
  "M 410 240 L 410 375 L 430 410",
  // IN-OH border
  "M 470 290 L 470 420",
  // KY border (Ohio river)
  "M 350 440 Q 410 420 470 445 Q 530 425 580 470",
  // MI southern border
  "M 410 240 L 540 250",
  // OH-PA border
  "M 650 260 L 650 410",
  // PA-NY border
  "M 650 260 L 800 240 M 800 240 L 800 300",
  // NY-VT/MA border
  "M 865 170 L 860 280",
  // WV border
  "M 650 380 L 620 400 Q 600 440 580 470",
  // VA-NC border
  "M 600 520 L 870 480",
  // TN-NC border
  "M 510 550 Q 570 530 600 520",
];

// Helper to format currency
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
};

export default function DashboardPage() {
  const [selectedDriverId, setSelectedDriverId] = useState<string>("01");
  const [strategy, setStrategy] = useState<"Chain" | "Triangle">("Chain");
  const [targetProfit, setTargetProfit] = useState<number>(2.0);
  const [mapMode, setMapMode] = useState<"Map" | "Satellite">("Map");
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);
  const [selectedNodeName, setSelectedNodeName] = useState<string | null>("Columbus");
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [liveTime, setLiveTime] = useState<string>("10:24:35 AM");
  const [lastUpdated, setLastUpdated] = useState<string>("10:24:30 AM");

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Live time ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setLiveTime(
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Recalculate simulation
  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      const date = new Date();
      setLastUpdated(
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }, 1200);
  };

  // Zoom helpers
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => {
    setZoom((z) => {
      const nextZoom = Math.max(z - 0.25, 0.75);
      if (nextZoom === 1) {
        setPan({ x: 0, y: 0 });
      }
      return nextZoom;
    });
  };

  // Dragging / Panning helpers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return; // Only pan when zoomed in
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Get active driver object
  const activeDriver = DRIVERS.find((d) => d.id === selectedDriverId) || DRIVERS[0];

  // Retrieve calculated paths
  const getRoutes = useCallback(
    (driverId: string, strat: "Chain" | "Triangle", profit: number): DriverRouteSet => {
      const mult = profit / 2.0;

      // Exact screenshot data for Driver 01 (Mo)
      if (driverId === "01") {
        if (strat === "Chain") {
          return {
            golden: {
              path: ["Indianapolis", "Columbus", "Pittsburgh", "Harrisburg"],
              profit: Math.round(1320 * mult),
              miles: 480,
              profitPerMile: Number((2.75 * mult).toFixed(2)),
              time: "8h 15m",
            },
            altA: {
              path: ["Indianapolis", "Cleveland", "Buffalo", "Albany"],
              profit: Math.round(1056 * mult),
              miles: 480,
              profitPerMile: Number((2.20 * mult).toFixed(2)),
              time: "9h 10m",
            },
            altB: {
              path: ["Indianapolis", "Cincinnati", "Knoxville", "Charlotte"],
              profit: Math.round(936 * mult),
              miles: 480,
              profitPerMile: Number((1.95 * mult).toFixed(2)),
              time: "9h 45m",
            },
          };
        } else {
          return {
            golden: {
              path: ["Indianapolis", "Chicago", "Detroit", "Indianapolis"],
              profit: Math.round(1540 * mult),
              miles: 580,
              profitPerMile: Number((2.65 * mult).toFixed(2)),
              time: "10h 30m",
            },
            altA: {
              path: ["Indianapolis", "Columbus", "Cleveland", "Indianapolis"],
              profit: Math.round(1140 * mult),
              miles: 520,
              profitPerMile: Number((2.19 * mult).toFixed(2)),
              time: "9h 15m",
            },
            altB: {
              path: ["Indianapolis", "Cincinnati", "Louisville", "Indianapolis"],
              profit: Math.round(860 * mult),
              miles: 410,
              profitPerMile: Number((2.10 * mult).toFixed(2)),
              time: "7h 45m",
            },
          };
        }
      }

      // Dynamic path generation for other drivers
      const drv = DRIVERS.find((d) => d.id === driverId) || DRIVERS[0];
      const start = drv.location;

      if (strat === "Chain") {
        return {
          golden: {
            path: [start, "Columbus", "Pittsburgh", "Harrisburg"],
            profit: Math.round(1240 * mult),
            miles: 470,
            profitPerMile: Number((2.64 * mult).toFixed(2)),
            time: "8h 00m",
          },
          altA: {
            path: [start, "Cleveland", "Buffalo", "Albany"],
            profit: Math.round(1020 * mult),
            miles: 475,
            profitPerMile: Number((2.15 * mult).toFixed(2)),
            time: "9h 05m",
          },
          altB: {
            path: [start, "Cincinnati", "Knoxville", "Charlotte"],
            profit: Math.round(910 * mult),
            miles: 465,
            profitPerMile: Number((1.95 * mult).toFixed(2)),
            time: "9h 30m",
          },
        };
      } else {
        return {
          golden: {
            path: [start, "Chicago", "Detroit", start],
            profit: Math.round(1450 * mult),
            miles: 560,
            profitPerMile: Number((2.59 * mult).toFixed(2)),
            time: "10h 10m",
          },
          altA: {
            path: [start, "Columbus", "Cleveland", start],
            profit: Math.round(1090 * mult),
            miles: 500,
            profitPerMile: Number((2.18 * mult).toFixed(2)),
            time: "8h 55m",
          },
          altB: {
            path: [start, "Cincinnati", "Louisville", start],
            profit: Math.round(810 * mult),
            miles: 395,
            profitPerMile: Number((2.05 * mult).toFixed(2)),
            time: "7h 25m",
          },
        };
      }
    },
    []
  );

  const routes = getRoutes(selectedDriverId, strategy, targetProfit);

  // Map nodes rendering settings
  const activePathCities = routes.golden.path;
  const altPathACities = routes.altA.path;
  const altPathBCities = routes.altB.path;

  // Selected tooltip coordinates
  const tooltipCoords = selectedNodeName ? CITY_COORDS[selectedNodeName] : null;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#070b13] text-[#e2e8f0] font-sans antialiased select-none">
      {/* ─── TOP HEADER BAR ─── */}
      <header className="h-14 bg-[#0a121e] border-b border-[#18273a] px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="h-4 w-px bg-[#1e2e42]" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#2563eb]/20 border border-[#2563eb]/40 flex items-center justify-center">
              <Truck className="w-4 h-4 text-[#3b82f6]" />
            </div>
            <span className="font-bold text-white tracking-wide text-[14px]">
              Layer 4 - The Command Center
            </span>
            <span className="text-[10px] text-slate-400 bg-[#16222f] px-2 py-0.5 rounded border border-[#243447] ml-1">
              Streamlit UI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-[12px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            System Status: <span className="text-[#10b981] font-semibold">Online</span>
          </div>
          <div className="h-4 w-px bg-[#1e2e42]" />
          <div className="text-[12px] text-slate-300 font-mono tracking-widest bg-[#0b1424] border border-[#1b2b42] px-3 py-1 rounded">
            {liveTime}
          </div>
          <button className="p-1.5 text-slate-400 hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ─── MAIN COCKPIT VIEW ─── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ─── LEFT SIDEBAR: CONTROLS ─── */}
        <aside className="w-72 bg-[#0c1524] border-r border-[#18273a] flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4 flex flex-col gap-5">
            {/* Dispatcher Controls Title */}
            <div className="flex items-center gap-2 text-[#3b82f6] border-b border-[#18273a] pb-2">
              <Sliders className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Dispatcher Controls</span>
            </div>

            {/* Driver Selection */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="driver-select" className="text-[11px] font-semibold text-slate-400 tracking-wide">
                Driver Selection
              </label>
              <div className="relative">
                <select
                  id="driver-select"
                  value={selectedDriverId}
                  onChange={(e) => {
                    setSelectedDriverId(e.target.value);
                    const newDrv = DRIVERS.find((d) => d.id === e.target.value);
                    if (newDrv) {
                      // Anchor popup to current driver location or default
                      setSelectedNodeName(newDrv.location === "Indianapolis" ? "Columbus" : newDrv.location);
                    }
                  }}
                  className="w-full bg-[#090f19] border border-[#1b2a3f] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-[#2563eb] appearance-none cursor-pointer pr-8"
                >
                  {DRIVERS.map((d) => (
                    <option key={d.id} value={d.id} className="bg-[#090f19] text-white">
                      {d.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Strategy Button Group */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-semibold text-slate-400 tracking-wide">Strategy</span>
                <span title="Select dispatch method">
                  <Info className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["Chain", "Triangle"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStrategy(s)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      strategy === s
                        ? "bg-[#2563eb] border-[#2563eb] text-white shadow-md shadow-[#2563eb]/20"
                        : "bg-[#090f19] border-[#1b2a3f] text-slate-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Profit Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-semibold text-slate-400 tracking-wide">Target Profit</span>
                  <span title="Required profit rate per mile">
                    <Info className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
                  </span>
                </div>
                <span className="text-[13px] font-bold text-[#10b981]">
                  ${targetProfit.toFixed(1)} / mile
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={targetProfit}
                onChange={(e) => setTargetProfit(parseFloat(e.target.value))}
                className="w-full cursor-pointer accent-[#2563eb]"
              />
              <div className="flex items-center justify-between text-[10px] text-slate-500 px-0.5">
                <span>$1.0</span>
                <span>$5.0</span>
              </div>
            </div>

            {/* Recalculate Button */}
            <div className="flex flex-col gap-2 border-b border-[#18273a] pb-4">
              <button
                onClick={handleRecalculate}
                disabled={isRecalculating}
                className="w-full h-11 bg-[#2563eb] hover:bg-[#3b82f6] disabled:bg-[#1e293b] text-white rounded-lg flex items-center justify-center gap-2 font-bold text-[13px] transition-colors border border-[#2563eb]/50 disabled:border-transparent cursor-pointer shadow-lg shadow-[#2563eb]/15"
              >
                {isRecalculating ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-white" />
                )}
                Recalculate Routes
              </button>
              <span className="text-[9.5px] text-center text-slate-500">
                Update routes after changes or cancellations
              </span>
            </div>

            {/* Legend Panel */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Legend</span>
              <div className="flex flex-col gap-2.5 text-[11.5px] text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-0.5 bg-[#10b981]" />
                  <span>Golden Path (Best Cumulative)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-0.5 border-t-2 border-dashed border-[#3b82f6]" />
                  <span>Alternative Paths (Backups)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#2563eb] border border-white flex items-center justify-center shrink-0">
                    <Truck className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span>Current Driver Location</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#10b981] border border-white shrink-0" />
                  <span>Pick-up (Origin)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ef4444] border border-white shrink-0" />
                  <span>Drop-off (Destination)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1e2a3f] border border-slate-500 shrink-0" />
                  <span>Other Market (Node)</span>
                </div>
              </div>
            </div>

            {/* Active Drivers Grid */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active Drivers (10)
              </span>
              <div className="grid grid-cols-5 gap-2">
                {DRIVERS.map((d) => {
                  const isSelected = d.id === selectedDriverId;
                  return (
                    <button
                      key={d.id}
                      onClick={() => {
                        setSelectedDriverId(d.id);
                        setSelectedNodeName(d.location === "Indianapolis" ? "Columbus" : d.location);
                      }}
                      className={`flex flex-col items-center py-2 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#2563eb]/20 border-[#2563eb] text-white"
                          : "bg-[#090f19] border-[#162437] text-slate-400 hover:text-white hover:border-[#1e2e42]"
                      }`}
                    >
                      <Truck className={`w-4 h-4 ${isSelected ? "text-[#3b82f6]" : "text-slate-500"}`} />
                      <span className="text-[9px] font-bold mt-1">{d.avatarLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* ─── RIGHT CONTAINER: MAP + ROUTES ─── */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#060b11]">
          {/* ─── MAP SECTION ─── */}
          <div ref={mapContainerRef} className="flex-1 relative overflow-hidden bg-[#070b13]">
            {/* Map Theme Style Classes */}
            <div
              className={`absolute inset-0 transition-colors duration-500 ${
                mapMode === "Map" ? "bg-[#e5e7eb]" : "bg-[#040810]"
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
            >
              {/* GIS Grid Background */}
              <div
                className={`absolute inset-0 opacity-15 pointer-events-none`}
                style={{
                  backgroundImage:
                    mapMode === "Map"
                      ? "linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)"
                      : "linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Dynamic SVG Map Layer */}
              <svg
                viewBox="0 0 1000 650"
                className="w-full h-full select-none"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                }}
              >
                {/* ── Landmass (Schematic Background) ── */}
                <path
                  d="M 180 180 Q 250 160 380 200 T 600 240 T 800 220 T 950 180 L 980 580 L 150 580 Z"
                  fill={mapMode === "Map" ? "#f4f3ec" : "#0d1b2a"}
                  stroke={mapMode === "Map" ? "#dfdbca" : "#172a45"}
                  strokeWidth="2"
                  transition-colors="true"
                />

                {/* ── Lakes ── */}
                {LAKES.map((lake, idx) => (
                  <path
                    key={idx}
                    d={lake.d}
                    fill={mapMode === "Map" ? "#b5d0e3" : "#020c1b"}
                    stroke={mapMode === "Map" ? "#9ab4c7" : "#13233c"}
                    strokeWidth="1.5"
                  />
                ))}

                {/* ── State Borders ── */}
                {STATE_LINES.map((line, idx) => (
                  <path
                    key={idx}
                    d={line}
                    fill="none"
                    stroke={mapMode === "Map" ? "#dfdbca" : "#172a45"}
                    strokeWidth="1"
                    strokeDasharray={mapMode === "Satellite" ? "4 4" : "none"}
                  />
                ))}

                {/* ── State Label Mockups ── */}
                <g fill={mapMode === "Map" ? "#b3af9e" : "#3b4f6e"} fontSize="12" fontWeight="bold" opacity="0.6">
                  <text x="360" y="380">IL</text>
                  <text x="440" y="350">IN</text>
                  <text x="540" y="340">OH</text>
                  <text x="540" y="250">MI</text>
                  <text x="700" y="325">PA</text>
                  <text x="790" y="225">NY</text>
                  <text x="475" y="475">KY</text>
                  <text x="455" y="530">TN</text>
                  <text x="660" y="555">NC</text>
                  <text x="735" y="465">VA</text>
                </g>

                {/* ── Alternative Routes Lines (Blue Dashed) ── */}
                {/* Alternative Path A Line */}
                {altPathACities.length > 1 && (
                  <path
                    d={altPathACities
                      .map((c, i) => {
                        const coords = CITY_COORDS[c];
                        return `${i === 0 ? "M" : "L"} ${coords.x} ${coords.y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    strokeOpacity="0.75"
                  />
                )}

                {/* Alternative Path B Line */}
                {altPathBCities.length > 1 && (
                  <path
                    d={altPathBCities
                      .map((c, i) => {
                        const coords = CITY_COORDS[c];
                        return `${i === 0 ? "M" : "L"} ${coords.x} ${coords.y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    strokeOpacity="0.6"
                  />
                )}

                {/* ── Golden Path Line (Solid Green with Shading) ── */}
                {activePathCities.length > 1 && (
                  <>
                    <path
                      d={activePathCities
                        .map((c, i) => {
                          const coords = CITY_COORDS[c];
                          return `${i === 0 ? "M" : "L"} ${coords.x} ${coords.y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="5"
                      strokeOpacity="0.3"
                    />
                    <path
                      d={activePathCities
                        .map((c, i) => {
                          const coords = CITY_COORDS[c];
                          return `${i === 0 ? "M" : "L"} ${coords.x} ${coords.y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      className="animate-dash"
                      strokeDasharray="10 6"
                    />
                  </>
                )}

                {/* ── Nodes Render ── */}
                {Object.keys(CITY_COORDS).map((key) => {
                  const node = CITY_COORDS[key];
                  const isCurrentDriverStart = key === activeDriver.location;
                  const isPopupOpen = selectedNodeName === key;

                  // Render driver location icon
                  if (isCurrentDriverStart) {
                    return (
                      <g
                        key={key}
                        onClick={() => setSelectedNodeName(key)}
                        className="cursor-pointer"
                        style={{ outline: "none" }}
                      >
                        {/* Pulse Ring */}
                        <circle cx={node.x} cy={node.y} r="14" fill="#2563eb" fillOpacity="0.15" className="animate-pulse" />
                        <circle cx={node.x} cy={node.y} r="8" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                        <Truck className="w-3 h-3 text-white" style={{ transform: `translate(${node.x - 6}px, ${node.y - 6}px)` }} />
                      </g>
                    );
                  }

                  // Render Chicago (dispatch hub) or other nodes
                  if (key === "Chicago") {
                    return (
                      <g
                        key={key}
                        onClick={() => setSelectedNodeName(key)}
                        className="cursor-pointer"
                        style={{ outline: "none" }}
                      >
                        <rect
                          x={node.x - 22}
                          y={node.y - 12}
                          width="44"
                          height="24"
                          rx="4"
                          fill="#2563eb"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text
                          x={node.x}
                          y={node.y + 4}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {node.nodeNumber}
                        </text>
                      </g>
                    );
                  }

                  // Standard circle node pins
                  return (
                    <g
                      key={key}
                      onClick={() => setSelectedNodeName(key)}
                      className="cursor-pointer"
                      style={{ outline: "none" }}
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="10"
                        fill="#0c1524"
                        stroke={isPopupOpen ? "#3b82f6" : "#475569"}
                        strokeWidth={isPopupOpen ? "2.5" : "1.5"}
                      />
                      <text
                        x={node.x}
                        y={node.y + 3.5}
                        textAnchor="middle"
                        fill="#cbd5e1"
                        fontSize="9"
                        fontWeight="bold"
                      >
                        {node.nodeNumber || "00"}
                      </text>
                      <text
                        x={node.x}
                        y={node.y - 13}
                        textAnchor="middle"
                        fill={mapMode === "Map" ? "#475569" : "#94a3b8"}
                        fontSize="8.5"
                        fontWeight="bold"
                      >
                        {key}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* ── Zoom Controls ── */}
            <div className="absolute left-4 top-4 flex flex-col gap-1 z-20">
              <button
                onClick={handleZoomIn}
                className="w-8 h-8 bg-[#0c1524]/90 border border-[#1b2a3f] text-slate-400 hover:text-white rounded-t-lg flex items-center justify-center font-bold text-[16px] cursor-pointer hover:bg-[#16243c]/95"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                className="w-8 h-8 bg-[#0c1524]/90 border-x border-b border-[#1b2a3f] text-slate-400 hover:text-white rounded-b-lg flex items-center justify-center font-bold text-[16px] cursor-pointer hover:bg-[#16243c]/95"
              >
                -
              </button>
            </div>

            {/* ── Layer Selector (Map / Satellite) ── */}
            <div className="absolute right-4 top-4 bg-[#0c1524]/90 border border-[#1b2a3f] p-3 rounded-lg z-20 flex flex-col gap-2 shadow-2xl">
              {([
                { key: "Map", label: "Map" },
                { key: "Satellite", label: "Satellite" },
              ] as const).map((mode) => (
                <label key={mode.key} className="flex items-center gap-2 text-[12px] text-slate-300 cursor-pointer hover:text-white">
                  <input
                    type="radio"
                    name="map-mode"
                    checked={mapMode === mode.key}
                    onChange={() => setMapMode(mode.key)}
                    className="accent-[#2563eb] cursor-pointer"
                  />
                  {mode.label}
                </label>
              ))}
            </div>

            {/* ── Interactive GIS Details Popup ── */}
            {tooltipCoords && (
              <div
                className="absolute z-20 bg-[#0c1524]/95 border border-[#1e2e42] rounded-xl p-4 shadow-2xl text-[12px] min-w-[210px] select-none"
                style={{
                  left: `${(tooltipCoords.x / 1000) * (mapContainerRef.current?.clientWidth || 1000) - 105}px`,
                  top: `${(tooltipCoords.y / 650) * (mapContainerRef.current?.clientHeight || 650) - 150}px`,
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#1b2a3f] pb-1.5 mb-2">
                  <span className="font-bold text-white text-[13px]">{tooltipCoords.name}</span>
                  <button
                    onClick={() => setSelectedNodeName(null)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Content Rows */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Market Score</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                      {tooltipCoords.score}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Est. Profit (to next)</span>
                    <span className="font-bold text-[#10b981]">{tooltipCoords.profitRate} / mile</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Volume Index</span>
                    <span className="font-semibold text-white">{tooltipCoords.volume}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Next Best Market</span>
                    <span className="font-semibold text-slate-300">{tooltipCoords.nextBest}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── BOTTOM ROUTE RECOMMENDATIONS PANEL ─── */}
          <section className="h-56 bg-[#090f19] border-t border-[#18273a] px-4 py-3 shrink-0 flex flex-col gap-2.5 z-20 shadow-2xl">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#3b82f6] shrink-0">
              Top 3 Recommended Routes for {activeDriver.name}
            </h3>

            {/* Recommendations Grid */}
            <div className="flex-1 grid grid-cols-3 gap-4 overflow-hidden mb-1">
              {/* CARD 1: Golden Path */}
              <div className="bg-[#0b1424] border border-[#10b981]/30 rounded-xl px-4 py-3 flex flex-col justify-between hover:border-[#10b981]/60 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[10px] font-bold text-[#10b981]">
                      1
                    </span>
                    <span className="text-xs font-bold text-[#10b981]">Golden Path (Best)</span>
                  </div>
                  <span className="text-xs font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20">
                    ${routes.golden.profitPerMile.toFixed(2)} / mile
                  </span>
                </div>

                <p className="text-[12.5px] font-bold text-slate-200 truncate mt-1">
                  {routes.golden.path.join(" → ")}
                </p>

                <div className="grid grid-cols-4 gap-2 border-t border-[#1b2b42] pt-2 mt-1.5 text-center">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Total Profit</p>
                    <p className="text-[14px] font-black text-[#10b981] mt-0.5">{formatCurrency(routes.golden.profit)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Total Miles</p>
                    <p className="text-[14px] font-bold text-slate-200 mt-0.5">{routes.golden.miles}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Avg. Profit/Mile</p>
                    <p className="text-[14px] font-black text-[#10b981] mt-0.5">${routes.golden.profitPerMile.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Est. Time</p>
                    <p className="text-[14px] font-bold text-slate-200 mt-0.5">{routes.golden.time}</p>
                  </div>
                </div>
              </div>

              {/* CARD 2: Alternative Path A */}
              <div className="bg-[#0b1424] border border-[#2563eb]/20 rounded-xl px-4 py-3 flex flex-col justify-between hover:border-[#2563eb]/45 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#2563eb]/15 border border-[#2563eb]/30 flex items-center justify-center text-[10px] font-bold text-[#3b82f6]">
                      2
                    </span>
                    <span className="text-xs font-bold text-[#3b82f6]">Alternative Path A</span>
                  </div>
                  <span className="text-xs font-bold text-[#3b82f6] bg-[#2563eb]/10 px-2 py-0.5 rounded border border-[#2563eb]/20">
                    ${routes.altA.profitPerMile.toFixed(2)} / mile
                  </span>
                </div>

                <p className="text-[12.5px] font-bold text-slate-200 truncate mt-1">
                  {routes.altA.path.join(" → ")}
                </p>

                <div className="grid grid-cols-4 gap-2 border-t border-[#1b2b42] pt-2 mt-1.5 text-center">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Total Profit</p>
                    <p className="text-[14px] font-black text-[#3b82f6] mt-0.5">{formatCurrency(routes.altA.profit)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Total Miles</p>
                    <p className="text-[14px] font-bold text-slate-200 mt-0.5">{routes.altA.miles}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Avg. Profit/Mile</p>
                    <p className="text-[14px] font-black text-[#3b82f6] mt-0.5">${routes.altA.profitPerMile.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Est. Time</p>
                    <p className="text-[14px] font-bold text-slate-200 mt-0.5">{routes.altA.time}</p>
                  </div>
                </div>
              </div>

              {/* CARD 3: Alternative Path B */}
              <div className="bg-[#0b1424] border border-[#1e2a3f] rounded-xl px-4 py-3 flex flex-col justify-between hover:border-[#3b4f6e] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1b2b42] border border-[#2d3f56] flex items-center justify-center text-[10px] font-bold text-slate-400">
                      3
                    </span>
                    <span className="text-xs font-bold text-slate-400">Alternative Path B</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-[#16222f] px-2 py-0.5 rounded border border-[#243447]">
                    ${routes.altB.profitPerMile.toFixed(2)} / mile
                  </span>
                </div>

                <p className="text-[12.5px] font-bold text-slate-300 truncate mt-1">
                  {routes.altB.path.join(" → ")}
                </p>

                <div className="grid grid-cols-4 gap-2 border-t border-[#1b2b42] pt-2 mt-1.5 text-center">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Total Profit</p>
                    <p className="text-[14px] font-black text-slate-300 mt-0.5">{formatCurrency(routes.altB.profit)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Total Miles</p>
                    <p className="text-[14px] font-bold text-slate-300 mt-0.5">{routes.altB.miles}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Avg. Profit/Mile</p>
                    <p className="text-[14px] font-black text-slate-300 mt-0.5">${routes.altB.profitPerMile.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Est. Time</p>
                    <p className="text-[14px] font-bold text-slate-200 mt-0.5">{routes.altB.time}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── FOOTER BAR ─── */}
            <footer className="h-6 flex items-center justify-between text-[10.5px] text-slate-500 border-t border-[#16222f] pt-1.5 shrink-0">
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  Routes are calculated using Dijkstra&apos;s Algorithm based on current market conditions and your profit target.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}
