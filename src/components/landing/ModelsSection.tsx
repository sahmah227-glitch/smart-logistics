"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GitBranch, Triangle, Zap, Home, ShieldCheck, TrendingUp } from "lucide-react";

// Animated chain path: A → B → C → D
function ChainAnimation() {
  const nodes = [
    { x: 30,  y: 50, label: "A", city: "Los Angeles" },
    { x: 105, y: 30, label: "B", city: "Phoenix" },
    { x: 180, y: 60, label: "C", city: "Dallas" },
    { x: 255, y: 35, label: "D", city: "Nashville" },
  ];
  const colors = ["#3b82f6", "#06b6d4", "#8b5cf6"];

  return (
    <svg viewBox="10 10 270 80" className="w-full" style={{ height: 80 }}>
      {/* Connection lines */}
      {nodes.slice(0, -1).map((node, i) => {
        const next = nodes[i + 1];
        return (
          <g key={i}>
            <line
              x1={node.x} y1={node.y}
              x2={next.x} y2={next.y}
              stroke={colors[i]} strokeWidth="1.5" strokeOpacity="0.2"
            />
            <line
              x1={node.x} y1={node.y}
              x2={next.x} y2={next.y}
              stroke={colors[i]} strokeWidth="1.5"
              strokeDasharray="8 4"
              className="animate-dash"
              style={{ animationDelay: `${i * 0.4}s`, animationDuration: "2.5s" }}
            />
            {/* Arrow */}
            <polygon
              points={`${next.x - 4},${next.y - 4} ${next.x - 4},${next.y + 4} ${next.x + 2},${next.y}`}
              fill={colors[i]}
              fillOpacity="0.8"
            />
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="9" fill="#0d1520" stroke={colors[Math.min(i, colors.length - 1)]} strokeWidth="1.5" />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="8" fill="white" fontWeight="700">
            {node.label}
          </text>
          <text x={node.x} y={node.y + 18} textAnchor="middle" fontSize="5.5" fill="#64748b">
            {node.city}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Animated triangle: A → B → C → A
function TriangleAnimation() {
  const nodes = [
    { x: 130, y: 20, label: "A", city: "Chicago" },
    { x: 35,  y: 80, label: "B", city: "Memphis" },
    { x: 225, y: 80, label: "C", city: "Nashville" },
  ];
  const color = "#10b981";

  return (
    <svg viewBox="10 5 260 100" className="w-full" style={{ height: 90 }}>
      {/* Triangle fill */}
      <polygon
        points={`${nodes[0].x},${nodes[0].y} ${nodes[1].x},${nodes[1].y} ${nodes[2].x},${nodes[2].y}`}
        fill="rgba(16,185,129,0.05)"
        stroke="none"
      />

      {/* Edges A→B→C→A */}
      {[...nodes, nodes[0]].slice(0, -1).map((node, i) => {
        const next = [...nodes, nodes[0]][i + 1];
        return (
          <g key={i}>
            <line x1={node.x} y1={node.y} x2={next.x} y2={next.y} stroke={color} strokeWidth="1.5" strokeOpacity="0.2" />
            <line
              x1={node.x} y1={node.y} x2={next.x} y2={next.y}
              stroke={color} strokeWidth="1.5"
              strokeDasharray="7 4"
              className="animate-dash"
              style={{ animationDelay: `${i * 0.5}s`, animationDuration: "3s" }}
            />
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="10" fill="#0d1520" stroke={color} strokeWidth="1.5" />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="9" fill="white" fontWeight="700">
            {node.label}
          </text>
          <text x={node.x} y={node.y + 20} textAnchor="middle" fontSize="5.5" fill="#64748b">
            {node.city}
          </text>
        </g>
      ))}

      {/* Home return indicator */}
      <text x="130" y="52" textAnchor="middle" fontSize="7" fill="rgba(16,185,129,0.6)" fontStyle="italic">
        ↺ home return
      </text>
    </svg>
  );
}

type ModelCardProps = {
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  drivers: number;
  features: string[];
  visual: React.ReactNode;
  Icon: React.ElementType;
  accentColor: string;
  bgGlow: string;
  delay: number;
};

function ModelCard({
  tag, tagColor, title, subtitle, drivers,
  features, visual, Icon, accentColor, bgGlow, delay,
}: ModelCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: delay > 0 ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className="relative glass-card rounded-2xl border border-navy-500/30 overflow-hidden card-hover flex flex-col"
    >
      {/* Glow bg */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none ${bgGlow}`} />

      {/* Header */}
      <div className="p-6 pb-4 border-b border-navy-500/20">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 rounded-xl ${accentColor.replace("text-", "bg-").replace("400", "500/15")}`}>
            <Icon className={`w-5 h-5 ${accentColor}`} />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${
                tagColor === "amber"
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                  : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
              }`}
            >
              {tag}
            </span>
            <span className="text-[10px] text-slate-500">{drivers} Drivers</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>

      {/* Visual */}
      <div className="px-6 py-5 bg-navy-900/30">
        {visual}
      </div>

      {/* Features */}
      <div className="p-6 pt-4 flex flex-col gap-2.5 flex-1">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              tagColor === "amber" ? "bg-amber-500/15" : "bg-emerald-500/15"
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                tagColor === "amber" ? "bg-amber-400" : "bg-emerald-400"
              }`} />
            </div>
            <span className="text-sm text-slate-300">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ModelsSection() {
  return (
    <section id="models" className="py-24 bg-navy-950 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-navy-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">
            Optimization Models
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Two Proven Methods,{" "}
            <span className="gradient-text">One Unified Platform</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Choose the optimization strategy that fits your fleet&apos;s risk appetite
            and operational structure. Both methods are powered by the same AI engine.
          </p>
        </motion.div>

        {/* Split-screen Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <ModelCard
            tag="High Risk / High Reward"
            tagColor="amber"
            title="Chain Method"
            subtitle="Sequential profit-maximizing dispatch across 3 drivers for deep tree search routing"
            drivers={3}
            features={[
              "Deep tree search algorithm",
              "Dynamic multi-hop pathing",
              "Profit-first optimization logic",
              "State-to-state sequential routing",
              "Dijkstra-inspired pathfinding",
            ]}
            visual={<ChainAnimation />}
            Icon={GitBranch}
            accentColor="text-amber-400"
            bgGlow="bg-amber-500"
            delay={0}
          />
          <ModelCard
            tag="Stable / Predictable / Efficient"
            tagColor="emerald"
            title="Triangle Method"
            subtitle="Closed-loop 3-city circuit for 7 drivers ensuring home return and minimum deadhead"
            drivers={7}
            features={[
              "Closed-loop route optimization",
              "Guaranteed home city return",
              "Minimized deadhead miles",
              "Predictable weekly schedules",
              "Lower operational risk profile",
            ]}
            visual={<TriangleAnimation />}
            Icon={Triangle}
            accentColor="text-emerald-400"
            bgGlow="bg-emerald-500"
            delay={0.2}
          />
        </div>

        {/* Comparison bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 glass rounded-xl p-4 border border-navy-500/30"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Max Profit (Chain)",   value: "$5,840/wk", color: "text-amber-400"   },
              { label: "Stability (Triangle)", value: "97.1%",     color: "text-emerald-400" },
              { label: "Deadhead (Triangle)",  value: "3.4%",      color: "text-cyan-400"    },
              { label: "Decisions/Second",     value: "2.4M",      color: "text-blue-400"    },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className={`text-xl font-bold ${item.color}`}>{item.value}</span>
                <span className="text-xs text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
