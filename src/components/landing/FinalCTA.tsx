"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Mail, Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="py-28 bg-navy-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/6 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-violet-600/6 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-600/6 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-8"
        >
          <Zap className="w-3.5 h-3.5" />
          Ready When You Are
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
        >
          Ready to Replace{" "}
          <span className="gradient-text">Guesswork</span>
          <br />
          With Mathematics?
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Turn millions of route possibilities into the{" "}
          <span className="text-slate-200 font-semibold">single best decision</span>{" "}
          in under one second. No more intuition. No more missed profit.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <Link
            id="final-cta-demo"
            href="/dashboard"
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white btn-primary shadow-xl shadow-blue-500/25"
          >
            <CalendarCheck className="w-5 h-5" />
            Schedule Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            id="final-cta-contact"
            href="mailto:hello@smartlogisticsnav.com"
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-slate-200 btn-ghost"
          >
            <Mail className="w-5 h-5 text-slate-400" />
            Contact Us
          </Link>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: "1,247+", label: "Active Drivers",        color: "text-blue-400"    },
            { value: "99.7%",  label: "Route Accuracy",        color: "text-cyan-400"    },
            { value: "2.4M",   label: "Decisions/Second",      color: "text-violet-400"  },
            { value: "$0",     label: "Setup Cost",            color: "text-emerald-400" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 border border-navy-500/25 text-center">
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
