"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Zap, Target, TrendingUp, Shield } from "lucide-react";

// US city nodes for SVG network visualization
const NODES = [
  { id: "LA",  x: 82,  y: 195, label: "Los Angeles"  },
  { id: "SF",  x: 68,  y: 165, label: "San Francisco" },
  { id: "SEA", x: 72,  y: 100, label: "Seattle"       },
  { id: "SLC", x: 178, y: 158, label: "Salt Lake City"},
  { id: "LAS", x: 140, y: 190, label: "Las Vegas"     },
  { id: "PHX", x: 148, y: 218, label: "Phoenix"       },
  { id: "DEN", x: 210, y: 165, label: "Denver"        },
  { id: "ABQ", x: 185, y: 215, label: "Albuquerque"   },
  { id: "DAL", x: 262, y: 238, label: "Dallas"        },
  { id: "HOU", x: 268, y: 265, label: "Houston"       },
  { id: "OKC", x: 268, y: 215, label: "Oklahoma City" },
  { id: "KC",  x: 298, y: 188, label: "Kansas City"   },
  { id: "STL", x: 320, y: 182, label: "St. Louis"     },
  { id: "CHI", x: 336, y: 148, label: "Chicago"       },
  { id: "MEM", x: 330, y: 218, label: "Memphis"       },
  { id: "NAS", x: 352, y: 200, label: "Nashville"     },
  { id: "ATL", x: 372, y: 228, label: "Atlanta"       },
  { id: "NYC", x: 448, y: 128, label: "New York"      },
  { id: "MIA", x: 412, y: 285, label: "Miami"         },
];

const EDGES = [
  { from: "SEA", to: "SF",  color: "#06b6d4", animated: true,  delay: 0    },
  { from: "SF",  to: "LA",  color: "#06b6d4", animated: true,  delay: 0.3  },
  { from: "LA",  to: "LAS", color: "#3b82f6", animated: true,  delay: 0.6  },
  { from: "LA",  to: "PHX", color: "#3b82f6", animated: true,  delay: 0.9  },
  { from: "SEA", to: "SLC", color: "#8b5cf6", animated: true,  delay: 0.2  },
  { from: "SLC", to: "DEN", color: "#8b5cf6", animated: true,  delay: 0.5  },
  { from: "PHX", to: "ABQ", color: "#3b82f6", animated: true,  delay: 1.1  },
  { from: "ABQ", to: "DAL", color: "#3b82f6", animated: true,  delay: 1.4  },
  { from: "DEN", to: "KC",  color: "#8b5cf6", animated: true,  delay: 0.8  },
  { from: "DAL", to: "HOU", color: "#10b981", animated: false, delay: 0    },
  { from: "DAL", to: "OKC", color: "#10b981", animated: true,  delay: 1.6  },
  { from: "OKC", to: "KC",  color: "#10b981", animated: true,  delay: 1.9  },
  { from: "KC",  to: "STL", color: "#f59e0b", animated: true,  delay: 2.0  },
  { from: "STL", to: "CHI", color: "#f59e0b", animated: true,  delay: 2.2  },
  { from: "CHI", to: "NYC", color: "#f59e0b", animated: true,  delay: 2.4  },
  { from: "DAL", to: "MEM", color: "#10b981", animated: true,  delay: 1.7  },
  { from: "MEM", to: "NAS", color: "#10b981", animated: true,  delay: 1.9  },
  { from: "NAS", to: "ATL", color: "#10b981", animated: true,  delay: 2.1  },
  { from: "ATL", to: "MIA", color: "#f43f5e", animated: false, delay: 0    },
  { from: "ATL", to: "NYC", color: "#f43f5e", animated: true,  delay: 2.5  },
  { from: "HOU", to: "MEM", color: "#8b5cf6", animated: false, delay: 0    },
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id);
}

const FLOATING_BADGES = [
  { icon: Zap,       label: "99.7% Route Accuracy",     color: "blue",    x: "8%",  y: "30%", delay: 0   },
  { icon: TrendingUp,label: "+34% Profit Increase",     color: "emerald", x: "6%",  y: "65%", delay: 0.5 },
  { icon: Target,    label: "41% Deadhead Reduction",   color: "amber",   x: "76%", y: "22%", delay: 1   },
  { icon: Shield,    label: "1,247 Active Drivers",     color: "violet",  x: "78%", y: "72%", delay: 1.5 },
];

const colorClasses: Record<string, string> = {
  blue:    "border-blue-500/30 bg-blue-500/10 text-blue-400",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  amber:   "border-amber-500/30 bg-amber-500/10 text-amber-400",
  violet:  "border-violet-500/30 bg-violet-500/10 text-violet-400",
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center hero-gradient overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Radial glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-blue-500/30 bg-blue-500/10 text-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-glow" />
                AI-Powered Logistics Intelligence
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
                <span className="text-white">AI-Powered Route</span>
                <br />
                <span className="gradient-text">Optimization</span>
                <br />
                <span className="text-white">for Modern Trucking</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-lg">
                Transform millions of routing possibilities into the{" "}
                <span className="text-slate-200 font-semibold">
                  single most profitable dispatch decision
                </span>
                {" "}— in under one second.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                id="hero-request-demo"
                href="/dashboard"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white btn-primary shadow-lg shadow-blue-500/20"
              >
                <Zap className="w-5 h-5" />
                Request Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                id="hero-view-dashboard"
                href="/dashboard"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-200 btn-ghost"
              >
                <Play className="w-5 h-5 text-slate-400" />
                View Live Dashboard
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-6 text-sm text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                No setup required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                SOC 2 Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                14-day free trial
              </span>
            </motion.div>
          </div>

          {/* Right: Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Floating badges */}
            {mounted && FLOATING_BADGES.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + badge.delay }}
                  style={{ position: "absolute", left: badge.x, top: badge.y, zIndex: 10 }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border backdrop-blur-md animate-float ${colorClasses[badge.color]}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {badge.label}
                </motion.div>
              );
            })}

            {/* SVG Network Map */}
            <div className="glass rounded-2xl p-1 shadow-2xl shadow-black/50 glow-blue overflow-hidden">
              <div className="rounded-xl overflow-hidden bg-navy-900/50" style={{ aspectRatio: "16/11" }}>
                <svg
                  viewBox="30 80 440 230"
                  className="w-full h-full"
                  style={{ background: "transparent" }}
                >
                  {/* Edges */}
                  {EDGES.map((edge, i) => {
                    const from = getNode(edge.from);
                    const to = getNode(edge.to);
                    if (!from || !to) return null;
                    return (
                      <g key={i}>
                        {/* Base glow line */}
                        <line
                          x1={from.x} y1={from.y}
                          x2={to.x}   y2={to.y}
                          stroke={edge.color}
                          strokeWidth="1.5"
                          strokeOpacity="0.15"
                        />
                        {/* Animated dashed line */}
                        {edge.animated && (
                          <line
                            x1={from.x} y1={from.y}
                            x2={to.x}   y2={to.y}
                            stroke={edge.color}
                            strokeWidth="1"
                            strokeOpacity="0.7"
                            strokeDasharray="6 4"
                            className="animate-dash"
                            style={{ animationDelay: `${edge.delay}s`, animationDuration: `${2 + (i % 3) * 0.4}s` }}
                          />
                        )}
                        {!edge.animated && (
                          <line
                            x1={from.x} y1={from.y}
                            x2={to.x}   y2={to.y}
                            stroke={edge.color}
                            strokeWidth="0.8"
                            strokeOpacity="0.3"
                            strokeDasharray="3 5"
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {NODES.map((node) => (
                    <g key={node.id}>
                      {/* Outer glow ring */}
                      <circle
                        cx={node.x} cy={node.y} r="6"
                        fill="rgba(59,130,246,0.08)"
                        className="animate-pulse-glow"
                      />
                      {/* Node dot */}
                      <circle
                        cx={node.x} cy={node.y} r="3"
                        fill="#0d1520"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                      />
                      {/* Inner dot */}
                      <circle
                        cx={node.x} cy={node.y} r="1.2"
                        fill="#60a5fa"
                      />
                      {/* Label */}
                      <text
                        x={node.x} y={node.y - 7}
                        textAnchor="middle"
                        fontSize="5"
                        fill="#64748b"
                        fontFamily="Inter, sans-serif"
                        fontWeight="500"
                      >
                        {node.id}
                      </text>
                    </g>
                  ))}

                  {/* Active truck indicators */}
                  <circle cx="148" cy="218" r="5" fill="#3b82f6" fillOpacity="0.3" className="animate-pulse-glow" />
                  <circle cx="148" cy="218" r="2.5" fill="#60a5fa" />
                  <circle cx="330" cy="218" r="5" fill="#10b981" fillOpacity="0.3" className="animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
                  <circle cx="330" cy="218" r="2.5" fill="#34d399" />
                  <circle cx="268" cy="265" r="5" fill="#8b5cf6" fillOpacity="0.3" className="animate-pulse-glow" style={{ animationDelay: "1s" }} />
                  <circle cx="268" cy="265" r="2.5" fill="#a78bfa" />
                </svg>
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { label: "Routes/sec",  value: "2.4M",  color: "text-blue-400"   },
                { label: "Accuracy",    value: "99.7%", color: "text-cyan-400"   },
                { label: "Avg Profit ↑", value: "+34%", color: "text-emerald-400"},
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-lg px-3 py-2 text-center">
                  <div className={`text-base font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-slate-600 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
