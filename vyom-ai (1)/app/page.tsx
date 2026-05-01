"use client";

import { useState } from "react";
import { SearchInput } from "@/components/scanner/SearchInput";
import { LiveActivityPanel } from "@/components/scanner/LiveActivityPanel";
import { RiskCard } from "@/components/scanner/RiskCard";
import { ShieldCheck, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAnalysis } from "@/hooks/useAnalysis";

export default function ScanPage() {
  const { logs, data, isSearching, startScan, reset } = useAnalysis();
  const [activeTab, setActiveTab] = useState("scan");

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-white/[0.02] sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="h-6 w-6 bg-primary rounded-lg"></div>
             <span className="font-black tracking-tighter text-lg italic">VYOM-AI</span>
          </div>
          <div className="flex gap-6">
            {["scan", "skincare", "baby-mode", "history"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] uppercase font-black tracking-widest transition-colors ${activeTab === tab ? "text-primary" : "text-slate-500 hover:text-slate-300"}`}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-8 grid grid-cols-12 gap-8 items-start">
        
        {/* Result Column */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          <header className="space-y-4">
            <div className="flex items-center gap-4">
              <motion.div 
                 initial={{ x: -20, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]"
              >
                <ShieldCheck className="h-4 w-4" />
                Edge AI Analysis Active
              </motion.div>
            </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">VYOM Intelligence</h1>
              <p className="text-slate-400 text-lg max-w-xl">National-scale safety profiling for food, skincare, and supplements.</p>
          </header>

          <SearchInput onSearch={startScan} isSearching={isSearching} />

          <div className="flex-1 min-h-[400px]">
              <AnimatePresence mode="wait">
                  {activeTab !== "scan" ? (
                    <motion.div 
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="glass-card h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500 space-y-6 p-12"
                    >
                        <div className="text-center space-y-2">
                           <h2 className="text-xl font-bold text-white uppercase tracking-tighter">{activeTab.replace("-", " ")} Intelligence</h2>
                           <p className="text-sm">Advanced safety module coming soon to GitHub deployment.</p>
                        </div>
                    </motion.div>
                  ) : (
                    <div key="scan-content" className="contents">
                      {!data && !isSearching && (
                          <motion.div 
                              key="ready"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="glass-card h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500 space-y-6 p-12 border-dashed"
                          >
                              <div className="p-5 rounded-full bg-white/5 border border-white/5 animate-bounce">
                                  <Search className="h-8 w-8 text-slate-400" />
                              </div>
                              <div className="text-center space-y-1">
                                <p className="font-bold text-white uppercase tracking-widest text-xs">Ready for Scan</p>
                                <p className="text-sm">Consulting Global Regulatory Datasets</p>
                              </div>
                          </motion.div>
                      )}

                      {isSearching && !data && (
                          <motion.div 
                              key="searching"
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="glass-card h-full min-h-[400px] flex flex-col items-center justify-center space-y-8 p-12 border-emerald-500/20"
                          >
                              <div className="relative">
                                  <div className="h-24 w-24 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 animate-spin" />
                                  <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                              </div>
                              <div className="text-center space-y-2">
                                  <p className="text-white font-black text-xl uppercase tracking-tighter">Synchronizing Regulatory Nodes</p>
                                  <p className="text-slate-500 text-sm font-mono italic text-balance">Accessing G1 Intelligence... Bypassing Backend...</p>
                              </div>
                          </motion.div>
                      )}

                      {data && (
                          <RiskCard key="result" data={data} />
                      )}
                    </div>
                  )}
              </AnimatePresence>
          </div>
        </div>

        {/* Pipeline Column */}
        <div className="col-span-12 lg:col-span-5 h-auto lg:sticky lg:top-8">
            <LiveActivityPanel logs={logs} />
        </div>

      </div>
    </main>
  );
}
