"use client";

import { useState, useEffect } from "react";
import { SearchInput } from "@/components/scanner/SearchInput";
import { LiveActivityPanel } from "@/components/scanner/LiveActivityPanel";
import { RiskCard } from "@/components/scanner/RiskCard";
import { ShieldCheck, ArrowRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSSE } from "@/hooks/useSSE";
import { getSSEUrl } from "@/lib/sse";

export default function ScanPage() {
  const [query, setQuery] = useState<string | null>(null);
  const { logs, data, reset } = useSSE(query ? getSSEUrl(query) : null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (data) {
      setIsSearching(false);
    }
  }, [data]);

  const startAnalysis = (q: string) => {
    setIsSearching(true);
    reset();
    setQuery(q);
  };

  const result = data;

  return (
    <div className="p-6 md:p-8 grid grid-cols-12 gap-8 items-start min-h-[calc(100vh-140px)]">
      
      {/* Result Column */}
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Local Engine Ready</span>
            </div>
            <motion.div 
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]"
            >
              <ShieldCheck className="h-4 w-4" />
              Advanced Security Pipeline active
            </motion.div>
          </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Intelligence Console</h1>
            <p className="text-slate-400 text-lg max-w-xl">Deep safety profiling for food, skincare, and supplements using G1 regulatory datasets.</p>
        </header>

        <SearchInput onSearch={startAnalysis} isSearching={isSearching} />

        <div className="flex-1 min-h-[400px]">
            <AnimatePresence mode="wait">
                {!result && !isSearching && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/[0.02] border border-dashed border-white/10 rounded-3xl h-full flex flex-col items-center justify-center text-slate-500 space-y-6 p-12"
                    >
                        <div className="p-5 rounded-full bg-white/5 border border-white/5 animate-bounce">
                            <Search className="h-8 w-8 text-slate-400" />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="font-bold text-white uppercase tracking-widest text-xs">Ready for Scan</p>
                          <p className="text-sm">Consulting FSSAI, WADA, and Groq Intelligence</p>
                        </div>
                    </motion.div>
                )}

                {isSearching && !result && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/[0.03] border border-white/10 rounded-3xl h-full flex flex-col items-center justify-center space-y-8 p-12 backdrop-blur-md"
                    >
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-4 border-cyan-500/10 border-t-cyan-500 animate-spin" />
                            <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-white font-black text-xl uppercase tracking-tighter">Synchronizing Regulatory Nodes</p>
                            <p className="text-slate-500 text-sm font-mono italic">Bypassing local RAG. Calling Llama-3.3-70B...</p>
                        </div>
                    </motion.div>
                )}

                {result && (
                    <RiskCard data={result} />
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Pipeline Column */}
      <div className="col-span-12 lg:col-span-5 h-[calc(100vh-200px)] sticky top-28">
          <LiveActivityPanel logs={logs} />
      </div>

    </div>
  );
}

