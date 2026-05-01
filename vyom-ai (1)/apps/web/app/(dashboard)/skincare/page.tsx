"use client";

import { useEffect, useState } from "react";
import { 
  Sparkles, 
  Trash2, 
  Droplets, 
  FlaskConical,
  Baby,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SearchInput } from "@/components/scanner/SearchInput";
import { RiskCard } from "@/components/scanner/RiskCard";

export default function SkincarePage() {
  const [result, setResult] = useState<any>(null);

  const startAnalysis = async (q: string) => {
    // Result for "Retinol" or similar
    setResult({
      product: q,
      brand: "Lumi-Skin Labs",
      score: 85,
      authenticity: 94,
      confidence: 88,
      ingredients: [
        { name: "Retinol (0.5%)", risk: "high", reason: "Pregnancy/Infant unsafe" },
        { name: "Fragrance (Alpha-Isomethyl Ionone)", risk: "medium", reason: "Potential allergen" },
        { name: "Methylparaben", risk: "high", reason: "Endocrine disruptor concern" }
      ],
      ageSafety: { adult: true, teen: true, child: false, infant: false },
      sources: ["https://ec.europa.eu/growth/tools-databases/cosing", "https://fssai.gov.in"]
    });
  };

  return (
    <div className="p-6 md:p-10 space-y-12 max-w-6xl mx-auto min-h-[calc(100vh-140px)]">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-500 text-[10px] font-black uppercase tracking-[0.2em]">
            <Sparkles className="h-4 w-4" />
            Derm-Safety Pipeline Live
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tight">Cosmetic Intelligence</h2>
          <p className="text-slate-400">Analyzing E.U. CosIng & CIR databases for ingredient safety.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Panel */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl backdrop-blur-md">
             <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Analyze Skincare Product</h3>
                <SearchInput onSearch={startAnalysis} isSearching={false} />
             </div>

             <div className="grid grid-cols-2 gap-4">
               {[
                 { label: "Banned Ingredients", icon: Trash2, count: "12,400+", color: "bg-rose-500" },
                 { label: "Safe Actives", icon: Droplets, count: "8,500+", color: "bg-emerald-500" },
               ].map((stat, i) => (
                 <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-1">
                   <stat.icon className="h-4 w-4 text-slate-400" />
                   <p className="text-xl font-bold text-white">{stat.count}</p>
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-tight">{stat.label}</p>
                 </div>
               ))}
             </div>
           </div>

           <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl space-y-4">
              <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Active Alerts (NCR)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                Counterfeit "The Ordinary" serums detected in West Delhi markets. 
                Authenticity threshold increased for this brand.
              </p>
           </div>
        </div>

        {/* Result Side */}
        <div className="lg:col-span-7">
           <AnimatePresence mode="wait">
             {result ? (
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                 <RiskCard data={result} />
               </motion.div>
             ) : (
               <div className="h-full min-h-[400px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-slate-600 gap-4">
                  <FlaskConical className="h-12 w-12 opacity-20" />
                  <p className="text-sm font-medium">Ready to analyze formulation fingerprints</p>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Detail Analysis Rules */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { name: "Pregnancy Safe", icon: ShieldCheck, status: "Active" },
          { name: "Infant Skin", icon: Baby, status: "Shield Active" },
          { name: "EU Compliance", icon: ShieldCheck, status: "Verified" },
          { name: "Steroid Detect", icon: FlaskConical, status: "Active" },
        ].map((rule, i) => (
          <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">{rule.name}</span>
            <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase">{rule.status}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
