"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

type ComparisonItem = {
  topic: string;
  traditional: { text: string; positive: boolean };
  smart: { text: string; positive: boolean };
};

const COMPARISON_ITEMS: ComparisonItem[] = [
  {
    topic: "Distance Calculation",
    traditional: { text: "Manual map estimates, ±50 mile error",     positive: false },
    smart:        { text: "Haversine formula, <2% deviation",         positive: true  },
  },
  {
    topic: "Routing Logic",
    traditional: { text: "Driver intuition & experience",             positive: false },
    smart:        { text: "Dijkstra algorithm with profit weighting",  positive: true  },
  },
  {
    topic: "Geocoding",
    traditional: { text: "Paper maps or basic GPS",                   positive: false },
    smart:        { text: "Real-time geocoded coordinates (Geopy)",    positive: true  },
  },
  {
    topic: "Visualization",
    traditional: { text: "Whiteboard or spreadsheet",                 positive: false },
    smart:        { text: "Interactive Folium-style live mapping",     positive: true  },
  },
  {
    topic: "Deadhead Filtering",
    traditional: { text: "No automated filtering (<30% awareness)",   positive: false },
    smart:        { text: "Auto-filter routes >20% deadhead ratio",    positive: true  },
  },
  {
    topic: "Real-Time Optimization",
    traditional: { text: "Daily manual recalculation (2-4 hours)",    positive: false },
    smart:        { text: "Continuous re-optimization (<1 second)",    positive: true  },
  },
];

const TECH_TAGS = [
  { label: "Haversine Formula",      color: "blue"    },
  { label: "Dijkstra Algorithm",     color: "cyan"    },
  { label: "Geopy Geocoding",        color: "violet"  },
  { label: "Folium-style Mapping",   color: "emerald" },
  { label: "Local Route Compute",    color: "amber"   },
  { label: "ML Profit Predictor",    color: "rose"    },
];

const tagColor: Record<string, string> = {
  blue:    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  cyan:    "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  violet:  "bg-violet-500/10 text-violet-400 border-violet-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
  rose:    "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function ComparisonSection() {
  return (
    <section id="comparison" className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3">
            The Difference
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Traditional Dispatching{" "}
            <span className="text-slate-500">vs</span>{" "}
            <span className="gradient-text">Smart Logistics Navigator</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            See why leading fleets are moving from intuition-based decisions
            to mathematically optimized routing.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl overflow-hidden border border-navy-500/30 mb-10"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 border-b border-navy-500/30">
            <div className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-slate-500">
              Feature
            </div>
            <div className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-slate-500 border-l border-navy-500/30 text-center">
              Traditional Dispatching
            </div>
            <div className="px-6 py-4 text-xs font-semibold tracking-widest uppercase border-l border-navy-500/30 text-center">
              <span className="gradient-text-blue">Smart Logistics Navigator</span>
            </div>
          </div>

          {/* Rows */}
          {COMPARISON_ITEMS.map((item, i) => (
            <motion.div
              key={item.topic}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="grid grid-cols-3 border-b border-navy-500/20 last:border-b-0 group hover:bg-white/[0.02] transition-colors"
            >
              <div className="px-6 py-4 flex items-center">
                <span className="text-sm font-semibold text-slate-200">{item.topic}</span>
              </div>
              <div className="px-6 py-4 border-l border-navy-500/20 flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.traditional.positive ? "bg-emerald-500/15" : "bg-rose-500/15"
                }`}>
                  {item.traditional.positive
                    ? <Check className="w-3 h-3 text-emerald-400" />
                    : <X className="w-3 h-3 text-rose-400" />
                  }
                </div>
                <span className="text-sm text-slate-400">{item.traditional.text}</span>
              </div>
              <div className="px-6 py-4 border-l border-navy-500/20 flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.smart.positive ? "bg-emerald-500/15" : "bg-rose-500/15"
                }`}>
                  {item.smart.positive
                    ? <Check className="w-3 h-3 text-emerald-400" />
                    : <X className="w-3 h-3 text-rose-400" />
                  }
                </div>
                <span className="text-sm text-slate-200 font-medium">{item.smart.text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-4">
            Powered By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag.label}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border ${tagColor[tag.color]}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
