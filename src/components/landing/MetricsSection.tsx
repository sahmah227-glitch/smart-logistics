"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Target, TrendingUp, Route } from "lucide-react";

type Metric = {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix: string;
  prefix: string;
  decimals: number;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
};

const METRICS: Metric[] = [
  {
    icon: Users,
    label: "Active Drivers",
    value: 1247,
    suffix: "",
    prefix: "",
    decimals: 0,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    description: "Dispatchers using the platform",
  },
  {
    icon: Target,
    label: "Route Accuracy",
    value: 99.7,
    suffix: "%",
    prefix: "",
    decimals: 1,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    description: "Optimal route selection rate",
  },
  {
    icon: TrendingUp,
    label: "Average Profit Increase",
    value: 34,
    suffix: "%",
    prefix: "+",
    decimals: 0,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "Compared to manual dispatch",
  },
  {
    icon: Route,
    label: "Deadhead Reduction",
    value: 41,
    suffix: "%",
    prefix: "",
    decimals: 0,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    description: "Fewer empty miles driven",
  },
];

function useCountUp(target: number, decimals: number, active: boolean, duration = 2000) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    const start = 0;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(start + (target - start) * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString();
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(metric.value, metric.decimals, inView);
  const Icon = metric.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className={`relative glass-card rounded-2xl p-6 border card-hover overflow-hidden ${metric.borderColor}`}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${metric.bgColor}`}>
          <Icon className={`w-5 h-5 ${metric.color}`} />
        </div>
        {/* Mini sparkline bars */}
        <div className="flex items-end gap-0.5 h-8">
          {[0.4, 0.65, 0.5, 0.8, 0.6, 0.9, 0.75, 1].map((h, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-sm opacity-60 ${metric.bgColor}`}
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Value */}
      <div className="mb-1">
        <span className={`text-4xl font-black tracking-tight ${metric.color}`}>
          {metric.prefix}{count}{metric.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm font-semibold text-slate-300 mb-1">{metric.label}</p>
      <p className="text-xs text-slate-500">{metric.description}</p>

      {/* Bottom glow */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 opacity-50`}
        style={{ background: `var(--tw-gradient-stops, currentColor)` }}
      />
    </motion.div>
  );
}

export default function MetricsSection() {
  return (
    <section id="metrics" className="py-20 bg-navy-900 relative overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">
            Platform Performance
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Metrics That Matter
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Real numbers from real dispatchers running Smart Logistics Navigator
            across their fleets every day.
          </p>
        </motion.div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {METRICS.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
