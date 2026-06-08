"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Cloud, Activity, BarChart3, Bot, Truck, CheckCircle2 } from "lucide-react";

type RoadmapItem = {
  icon: React.ElementType;
  title: string;
  description: string;
  quarter: string;
  status: "planned" | "in-progress" | "coming-soon";
  color: string;
};

const ROADMAP: RoadmapItem[] = [
  {
    icon: Brain,
    title: "Machine Learning Pricing Forecasts",
    description:
      "Predictive load board pricing using historical lane data and market trends to anticipate rate fluctuations 7 days in advance.",
    quarter: "Q2 2024",
    status: "in-progress",
    color: "blue",
  },
  {
    icon: Cloud,
    title: "Weather Intelligence Integration",
    description:
      "Real-time NOAA weather data overlay with automatic route re-optimization to avoid severe weather events and delays.",
    quarter: "Q3 2024",
    status: "planned",
    color: "cyan",
  },
  {
    icon: Activity,
    title: "Real-Time Traffic Integration",
    description:
      "Live traffic data feeds to dynamically adjust ETAs and re-route around congestion, accidents, and construction zones.",
    quarter: "Q3 2024",
    status: "planned",
    color: "emerald",
  },
  {
    icon: BarChart3,
    title: "Market Surge Prediction",
    description:
      "AI-powered detection of regional freight demand surges — get positioned in the right states before rates spike.",
    quarter: "Q4 2024",
    status: "coming-soon",
    color: "amber",
  },
  {
    icon: Bot,
    title: "AI Dispatch Assistant",
    description:
      "Conversational AI dispatcher that understands context, handles driver communications, and proactively suggests optimizations.",
    quarter: "Q4 2024",
    status: "coming-soon",
    color: "violet",
  },
  {
    icon: Truck,
    title: "Automated Fleet Recommendations",
    description:
      "Dynamic fleet sizing suggestions based on regional demand patterns, suggesting when to add capacity or reassign assets.",
    quarter: "Q1 2025",
    status: "coming-soon",
    color: "rose",
  },
];

const statusConfig = {
  "in-progress":  { label: "In Progress",   bg: "bg-blue-500/15",  text: "text-blue-400",    dot: "bg-blue-400"    },
  "planned":       { label: "Planned",       bg: "bg-cyan-500/15",  text: "text-cyan-400",    dot: "bg-cyan-400"    },
  "coming-soon":   { label: "Coming Soon",   bg: "bg-slate-500/15", text: "text-slate-400",   dot: "bg-slate-400"   },
};

const colorConfig: Record<string, { icon: string; border: string; glow: string }> = {
  blue:    { icon: "text-blue-400",    border: "border-blue-500/25",    glow: "bg-blue-500"    },
  cyan:    { icon: "text-cyan-400",    border: "border-cyan-500/25",    glow: "bg-cyan-500"    },
  emerald: { icon: "text-emerald-400", border: "border-emerald-500/25", glow: "bg-emerald-500" },
  amber:   { icon: "text-amber-400",   border: "border-amber-500/25",   glow: "bg-amber-500"   },
  violet:  { icon: "text-violet-400",  border: "border-violet-500/25",  glow: "bg-violet-500"  },
  rose:    { icon: "text-rose-400",    border: "border-rose-500/25",    glow: "bg-rose-500"    },
};

function TimelineItem({ item, index }: { item: RoadmapItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const colors = colorConfig[item.color];
  const status = statusConfig[item.status];
  const Icon = item.icon;
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center gap-4 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex-1 glass-card rounded-2xl p-5 border card-hover overflow-hidden relative ${colors.border}`}
      >
        {/* Glow */}
        <div className={`absolute top-0 right-0 w-40 h-40 ${colors.glow} rounded-full blur-3xl opacity-5 pointer-events-none`} />

        <div className="flex items-start justify-between mb-3 relative">
          <div className={`p-2.5 rounded-xl bg-opacity-10 ${colors.icon.replace("text-", "bg-").replace("-400", "-500/15")}`}>
            <Icon className={`w-5 h-5 ${colors.icon}`} />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
              {status.label}
            </span>
            <span className="text-[10px] text-slate-600">{item.quarter}</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-white mb-2 relative">{item.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed relative">{item.description}</p>
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-10 flex-shrink-0 hidden md:block"
      >
        <div className={`w-4 h-4 rounded-full border-2 border-navy-700 ${colors.glow.replace("bg-", "bg-")}`}>
          <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-50" />
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-3">
            Product Roadmap
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The Future of{" "}
            <span className="gradient-text">Logistics Intelligence</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            We&apos;re building the most comprehensive trucking intelligence platform.
            Here&apos;s what&apos;s coming next.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-navy-400/30 to-transparent" />

          <div className="flex flex-col gap-8">
            {ROADMAP.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
