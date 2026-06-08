import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/landing/Hero";
import MetricsSection from "@/components/landing/MetricsSection";
import ModelsSection from "@/components/landing/ModelsSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import DecisionMatrix from "@/components/landing/DecisionMatrix";
import RoadmapSection from "@/components/landing/RoadmapSection";
import FinalCTA from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MetricsSection />
        <ModelsSection />
        <ComparisonSection />
        <DecisionMatrix />
        <RoadmapSection />
        <FinalCTA />
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-navy-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="text-blue-400 font-bold tracking-tight">SLN</span>
            <span>©</span>
            <span>2024 Smart Logistics Navigator. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <a href="/#models"   className="hover:text-slate-300 transition-colors">Platform</a>
            <a href="/#decision" className="hover:text-slate-300 transition-colors">Analytics</a>
            <a href="/#roadmap"  className="hover:text-slate-300 transition-colors">Roadmap</a>
            <a href="/dashboard" className="hover:text-slate-300 transition-colors">Dashboard</a>
          </div>
        </div>
      </footer>
    </>
  );
}
