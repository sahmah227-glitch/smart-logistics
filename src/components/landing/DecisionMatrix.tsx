"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { DECISION_MATRIX_DATA } from "@/lib/mockData";
import { Info, TrendingUp, DollarSign } from "lucide-react";

const SCORING_MATRIX = [
  { label: "Immediate Revenue",  pathA: 9, pathB: 6  },
  { label: "Future Opportunity", pathA: 3, pathB: 9  },
  { label: "Market Positioning", pathA: 4, pathB: 8  },
  { label: "Driver Efficiency",  pathA: 6, pathB: 9  },
  { label: "Deadhead Ratio",     pathA: 5, pathB: 8  },
  { label: "Cumulative Profit",  pathA: 4, pathB: 10 },
];

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="glass rounded-xl border border-navy-400/30 p-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-slate-300">{entry.name}</span>
          </span>
          <span className="font-bold text-white">${entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function ScoringMatrix() {
  return (
    <div className="flex flex-col gap-2.5">
      {SCORING_MATRIX.map((item, i) => (
        <div key={item.label}>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{item.label}</span>
            <div className="flex gap-4">
              <span className="text-amber-400">A: {item.pathA}/10</span>
              <span className="text-blue-400">B: {item.pathB}/10</span>
            </div>
          </div>
          <div className="flex gap-1 h-2">
            {/* Path A bar */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.pathA * 4.5}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-l-full opacity-70"
            />
            {/* Gap */}
            <div className="w-px bg-navy-500/50" />
            {/* Path B bar */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.pathB * 4.5}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 + 0.1 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-r-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DecisionMatrix() {
  return (
    <section id="decision" className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
      <div className="absolute left-0 top-1/3 w-80 h-80 bg-violet-600/6 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-1/3 w-80 h-80 bg-blue-600/6 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-3">
            Decision Intelligence
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Optimize for{" "}
            <span className="gradient-text">Cumulative Profitability</span>
            ,{" "}Not Short-Term Gains
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            The system evaluates both immediate and future revenue potential.
            Path B may earn less today — but significantly more over time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: cumulative profit chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 glass-card rounded-2xl p-6 border border-navy-500/30"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-white">Cumulative Profit Over Time</h3>
                <p className="text-xs text-slate-500 mt-0.5">8-week comparison: Path A vs Path B</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-3 h-0.5 bg-amber-400 rounded-full" />
                  Path A (High Immediate)
                </span>
                <span className="flex items-center gap-1.5 text-blue-400">
                  <span className="w-3 h-0.5 bg-blue-400 rounded-full" />
                  Path B (Higher Cumulative)
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={DECISION_MATRIX_DATA} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,61,0.6)" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="cumA" name="Path A" stroke="#f59e0b" strokeWidth={2} fill="url(#gradA)" dot={false} />
                <Area type="monotone" dataKey="cumB" name="Path B" stroke="#3b82f6" strokeWidth={2} fill="url(#gradB)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>

            {/* Crossover annotation */}
            <div className="mt-4 flex items-center gap-2 p-3 bg-blue-500/8 border border-blue-500/20 rounded-lg">
              <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <p className="text-xs text-slate-300">
                <span className="text-blue-400 font-semibold">Crossover at Week 4</span>
                {" "}— Path B surpasses Path A in cumulative profitability and continues to outperform.
              </p>
            </div>
          </motion.div>

          {/* Right: scoring matrix + summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Path summary cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card rounded-xl p-4 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-400">Path A</span>
                </div>
                <p className="text-lg font-bold text-white">$82,500</p>
                <p className="text-[11px] text-slate-500">8-week cumulative</p>
                <p className="text-[10px] text-amber-400 mt-1">↑ High Immediate Revenue</p>
                <p className="text-[10px] text-slate-500">↓ Lower Future Opportunity</p>
              </div>
              <div className="glass-card rounded-xl p-4 border border-blue-500/20 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold">RECOMMENDED</div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-blue-400">Path B</span>
                </div>
                <p className="text-lg font-bold text-white">$112,900</p>
                <p className="text-[11px] text-slate-500">8-week cumulative</p>
                <p className="text-[10px] text-slate-500">↓ Lower First Revenue</p>
                <p className="text-[10px] text-blue-400 mt-1">↑ Higher Total Profitability</p>
              </div>
            </div>

            {/* Scoring Matrix */}
            <div className="glass-card rounded-xl p-4 border border-navy-500/30 flex-1">
              <h4 className="text-sm font-semibold text-white mb-4">Scoring Matrix</h4>
              <ScoringMatrix />
            </div>

            {/* Final note */}
            <div className="p-4 glass rounded-xl border border-violet-500/20">
              <p className="text-xs text-slate-300 leading-relaxed text-center italic">
                &ldquo;The system optimizes{" "}
                <span className="text-violet-300 font-semibold">cumulative profitability</span>
                {" "}rather than short-term gains.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
