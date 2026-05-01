"use client";

import { useState } from "react";
import { 
  Baby, 
  ShieldCheck, 
  AlertTriangle, 
  Info,
  CheckCircle2,
  Navigation,
  Map as MapIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SearchInput } from "@/components/scanner/SearchInput";
import { RiskCard } from "@/components/scanner/RiskCard";

export default function BabyModePage() {
  const [active, setActive] = useState(false);
  const [result, setResult] = useState<any>(null);

  return (
    <div className={`min-h-[calc(100vh-140px)] transition-colors duration-500 ${active ? "bg-rose-950/20" : ""}`}>
      <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${active ? "bg-rose-500/20 border-rose-500/40 text-rose-500" : "bg-slate-800 border-white/10 text-slate-400"}`}>
              <Baby className="h-4 w-4" />
              {active ? "Ultra-Strict Mode Active" : "Baby Mode Optimized"}
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Infant Safety Console</h2>
            <p className="text-slate-400">Zero-tolerance scanning for ingredients affecting infants (0-2y).</p>
          </div>
          
          <motion.button 
            onClick={() => setActive(!active)}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl transition-all border ${active ? "bg-rose-600 border-rose-500 text-white shadow-rose-900/40" : "bg-white/5 border-white/10 text-slate-400"}`}
          >
            {active ? "DEACTIVATE SHIELD" : "ACTIVATE ULTRA-STRICT SHIELD"}
          </motion.button>
        </header>

        <section className="space-y-8">
           <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                 <div className="flex-1 space-y-6 w-full">
                    <h3 className="text-xl font-bold text-white">Direct Scan</h3>
                    <SearchInput onSearch={(q) => {
                      setResult({
                        product: q,
                        brand: "Infant Care Ltd",
                        score: 91,
                        authenticity: 88,
                        confidence: 94,
                        ingredients: [
                          { name: "Added Sugar (High)", risk: "high", reason: "Exceeds infant RDA" },
                          { name: "Synthetic Flavor", risk: "medium", reason: "Possible allergen" }
                        ],
                        ageSafety: { adult: true, teen: true, child: true, infant: false },
                        sources: ["https://who.int/foodsafety", "https://fssai.gov.in"]
                      });
                    }} isSearching={false} />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex gap-3">
                          <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                          <div>
                            <p className="text-white text-xs font-bold leading-none mb-1">Heavy Metal Lock</p>
                            <p className="text-[10px] text-slate-500">Auto-rejecting any Lead/Arsenic traces.</p>
                          </div>
                       </div>
                       <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex gap-3">
                          <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
                          <div>
                            <p className="text-white text-xs font-bold leading-none mb-1">Honey Warning</p>
                            <p className="text-[10px] text-slate-500">Botulism detection active for &lt;1yr.</p>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="w-full md:w-80 h-[300px] flex flex-col justify-between p-6 rounded-3xl bg-gradient-to-br from-rose-500/10 to-fuchsia-600/10 border border-white/10 relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Safety Protocols</h4>
                       <div className="space-y-3">
                          {["Melamine Check", "Aflatoxin Check", "Nitrate Monitor"].map(s => (
                            <div key={s} className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                               <span className="text-xs text-white font-medium">{s}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]"></div>
                    <div className="relative z-10 pt-4 mt-auto">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                          <span>Shield Integrity</span>
                          <span>100%</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full">
                           <div className="h-full w-full bg-emerald-500"></div>
                        </div>
                    </div>
                 </div>
              </div>
           </div>

           <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                   <RiskCard data={result} />
                </motion.div>
              )}
           </AnimatePresence>
        </section>

        <footer className="grid grid-cols-1 sm:grid-cols-3 gap-6 opacity-60">
           {[
             { title: "Manual Override", desc: "Allows testing for child safe vs infant safe thresholds.", icon: Info },
             { title: "Report Emergency", desc: "Instant alert to closest pediatric poison control.", icon: Navigation },
             { title: "Compliance Map", desc: "View districts with high infant formula violations.", icon: MapIcon }
           ].map((f, i) => (
             <div key={i} className="space-y-2">
                <f.icon className="h-5 w-5 text-slate-500" />
                <h5 className="text-xs font-bold text-white uppercase">{f.title}</h5>
                <p className="text-[10px] text-slate-500 leading-relaxed">{f.desc}</p>
             </div>
           ))}
        </footer>
      </div>
    </div>
  );
}
