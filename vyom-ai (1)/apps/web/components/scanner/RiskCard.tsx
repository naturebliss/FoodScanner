"use client";

import { 
  ShieldAlert, 
  ShieldCheck, 
  Shield, 
  ExternalLink, 
  AlertCircle,
  FileText,
  Baby,
  User,
  AlertTriangle
} from "lucide-react";
import { motion } from "motion/react";

interface Ingredient {
  name: string;
  risk: "high" | "medium" | "low";
  reason: string;
}

interface RiskProfile {
  product: string;
  brand: string;
  score: number; // 0-100
  authenticity: number;
  confidence: number;
  ingredients: Ingredient[];
  ageSafety: {
    adult: boolean;
    teen: boolean;
    child: boolean;
    infant: boolean;
  };
  sources: string[];
}

export function RiskCard({ data }: { data: RiskProfile }) {
  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-rose-500 border-rose-500/20 bg-rose-500/10";
    if (score >= 40) return "text-amber-500 border-amber-500/20 bg-amber-500/10";
    return "text-emerald-500 border-emerald-500/20 bg-emerald-500/10";
  };

  const getStatusLabel = (score: number) => {
    if (score >= 70) return "CRITICAL RISK";
    if (score >= 40) return "MODERATE RISK";
    return "SAFETY VERIFIED";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      {/* Header Banner */}
      <div className={`p-4 border-b flex justify-between items-center ${getRiskColor(data.score)}`}>
        <div className="flex items-center gap-2">
          {data.score >= 40 ? <ShieldAlert className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
          <span className="text-xs font-black uppercase tracking-[0.2em]">{getStatusLabel(data.score)}</span>
        </div>
        <span className="text-[10px] font-mono opacity-60">SCORE: {data.score}/100</span>
      </div>

      <div className="p-8 space-y-10">
        {/* Core Identity */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white tracking-tight">{data.product}</h2>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">{data.brand}</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Authenticity</p>
              <p className="text-xl font-bold text-white font-mono">{data.authenticity}%</p>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-right">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Confidence</p>
              <p className="text-xl font-bold text-cyan-400 font-mono">{data.confidence}%</p>
            </div>
          </div>
        </div>

        {/* Age Safety Matrix */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <User className="h-3.5 w-3.5" />
            Demographic Safety Matrix
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             {Object.entries(data.ageSafety).map(([age, safe]) => (
               <div key={age} className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${safe ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10 opacity-50 grayscale'}`}>
                 {age === 'infant' ? <Baby className={`h-5 w-5 ${safe ? 'text-emerald-500' : 'text-rose-500'}`} /> : <User className={`h-5 w-5 ${safe ? 'text-emerald-500' : 'text-rose-400'}`} />}
                 <div className="text-center">
                    <p className="text-[10px] font-bold text-white uppercase">{age}</p>
                    <p className={`text-[9px] font-black uppercase tracking-tighter ${safe ? 'text-emerald-500' : 'text-rose-500'}`}>{safe ? 'RESTRICTED-FREE' : 'UNSAFE'}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Ingredient Breakdown */}
        <div className="space-y-4">
           <div className="flex justify-between items-center">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Profiling Ingredients</h3>
             <span className="text-[10px] text-slate-600 font-mono">GROQ ANALYSIS ACTIVE</span>
           </div>
           <div className="space-y-2">
              {data.ingredients.map((ing, i) => (
                <div key={i} className="group p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-4 hover:bg-white/[0.04] transition-all">
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${ing.risk === 'high' ? 'bg-rose-500' : ing.risk === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{ing.name}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{ing.reason}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Intelligence Sources */}
        <div className="pt-6 border-t border-white/5">
           <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Regulatory Verifiers</p>
           <div className="flex flex-wrap gap-2">
              {data.sources.map((source, i) => (
                <a 
                  key={i} 
                  href={source} 
                  target="_blank" 
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-400 hover:text-white hover:border-white/20 transition-all font-mono"
                >
                  <FileText className="h-3 w-3" />
                  {new URL(source).hostname}
                  <ExternalLink className="h-2 w-2" />
                </a>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
}
