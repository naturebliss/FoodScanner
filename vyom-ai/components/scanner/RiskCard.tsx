"use client";

import { 
  ShieldAlert, 
  ShieldCheck, 
  ExternalLink, 
  FileText,
  Baby,
  User,
} from "lucide-react";
import { motion } from "motion/react";

interface Ingredient {
  name: string;
  risk: number;
  rating: string;
}

interface RiskProfile {
  name: string;
  brand: string;
  risk_score: number;
  status: "safe" | "warning" | "danger";
  summary: string;
  ingredients: Ingredient[];
  age_safety: string[];
  authenticity: number;
}

export function RiskCard({ data }: { data: RiskProfile }) {
  const getRiskColor = (status: string) => {
    if (status === "danger") return "text-rose-500 border-rose-500/20 bg-rose-500/10";
    if (status === "warning") return "text-amber-500 border-amber-500/20 bg-amber-500/10";
    return "text-emerald-500 border-emerald-500/20 bg-emerald-500/10";
  };

  const getStatusLabel = (status: string) => {
    if (status === "danger") return "CRITICAL RISK";
    if (status === "warning") return "MODERATE RISK";
    return "SAFETY VERIFIED";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      {/* Header Banner */}
      <div className={`p-4 border-b flex justify-between items-center ${getRiskColor(data.status)}`}>
        <div className="flex items-center gap-2">
          {data.status !== "safe" ? <ShieldAlert className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
          <span className="text-xs font-black uppercase tracking-[0.2em]">{getStatusLabel(data.status)}</span>
        </div>
        <span className="text-[10px] font-mono opacity-60">SCORE: {data.risk_score}/100</span>
      </div>

      <div className="p-8 space-y-10">
        {/* Core Identity */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white tracking-tight">{data.name}</h2>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">{data.brand}</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Authenticity</p>
              <p className="text-xl font-bold text-white font-mono">{data.authenticity}%</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
           <p className="text-sm text-slate-300 leading-relaxed italic">"{data.summary}"</p>
        </div>

        {/* Age Safety Matrix */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <User className="h-3.5 w-3.5" />
            Demographic Safety
          </h3>
          <div className="flex flex-wrap gap-2">
             {data.age_safety.map((flag, i) => (
               <div key={i} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold">
                 {flag}
               </div>
             ))}
             {data.age_safety.length === 0 && <p className="text-xs text-slate-600">No age-specific restrictions identified.</p>}
          </div>
        </div>

        {/* Ingredient Breakdown */}
        <div className="space-y-4">
           <div className="flex justify-between items-center">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Profiling Ingredients</h3>
             <span className="text-[10px] text-slate-600 font-mono">GEMINI ANALYSIS ACTIVE</span>
           </div>
           <div className="space-y-2">
              {data.ingredients.map((ing, i) => (
                <div key={i} className="group p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-4 hover:bg-white/[0.04] transition-all">
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${ing.risk > 7 ? 'bg-rose-500' : ing.risk > 4 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{ing.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black">{ing.rating} • RISK {ing.risk}/10</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
}
