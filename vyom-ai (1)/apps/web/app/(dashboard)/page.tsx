"use client";

import { 
  ShieldCheck, 
  Map as MapIcon, 
  History, 
  Activity, 
  ChevronRight, 
  Search,
  Scan,
  AlertCircle,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 space-y-10 max-w-7xl mx-auto">
      
      {/* Hero / HUD */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <ShieldCheck className="h-4 w-4" />
            National Security Grid Active
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Safety Intelligence <br />
            <span className="text-slate-500">for the Modern Citizen.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Detect counterfeit products, harmful ingredients, and regulatory violations 
            using G1-class national datasets and Groq intelligence.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
             <Link href="/scan" className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-cyan-400 hover:scale-105 transition-all flex items-center gap-3">
               <Scan className="h-4 w-4" />
               START ADVANCED SCAN
             </Link>
             <Link href="/map" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3">
               <MapIcon className="h-4 w-4" />
               VIEW THREAT MAP
             </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
           <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full"></div>
           <div className="relative glass rounded-[40px] p-8 border-white/5 space-y-8 animate-pulse shadow-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-cyan-400" />
                   </div>
                   <div>
                     <p className="text-white font-bold text-sm tracking-tight">Active Pipeline</p>
                     <p className="text-[10px] text-slate-500 uppercase tracking-widest">Groq-Llama-3.3</p>
                   </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white font-mono">99.9%</p>
                  <p className="text-[9px] text-slate-600 uppercase">Uptime</p>
                </div>
              </div>

              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${30 + i * 20}%` }}
                         transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                         className="h-full bg-cyan-500/40"
                       />
                    </div>
                 ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                    <p className="text-2xl font-bold text-white">1.2M</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">Safety Nodes</p>
                 </div>
                 <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                    <p className="text-2xl font-bold text-emerald-500">ZERO</p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">False Negatives</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Features Bento */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { title: "Infant Safety", icon: ShieldCheck, path: "/baby-mode", desc: "Ultra-strict mode for infant products & formula.", color: "text-rose-500" },
           { title: "Risk Archive", icon: History, path: "/history", desc: "Your personal history of scanned safety intelligence.", color: "text-cyan-400" },
           { title: "GIS Hotspots", icon: Activity, path: "/map", desc: "Real-time visualization of counterfeit distribution.", color: "text-amber-400" },
           { title: "FSSAI Connect", icon: Search, path: "/complaints", desc: "Direct reporting to national regulatory boards.", color: "text-emerald-400" },
         ].map((card, i) => (
           <Link key={i} href={card.path} className="group glass-card p-6 hover:bg-white/[0.04] transition-all flex flex-col justify-between">
              <div className="space-y-4">
                 <div className={`p-3 rounded-xl bg-white/5 w-fit ${card.color}`}>
                   <card.icon className="h-6 w-6" />
                 </div>
                 <h3 className="text-xl font-bold text-white tracking-tight">{card.title}</h3>
                 <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
              </div>
              <div className="mt-8 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-white transition-colors">
                 Launch Module
                 <ChevronRight className="h-4 w-4" />
              </div>
           </Link>
         ))}
      </section>

      {/* News / Alerts */}
      <section className="glass rounded-[32px] p-8 border-white/5 overflow-hidden relative">
         <div className="absolute top-0 right-0 p-8 opacity-10">
            <AlertCircle className="h-32 w-32 text-rose-500" />
         </div>
         <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-4 max-w-2xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                  Urgent Advisory
               </div>
               <h3 className="text-3xl font-bold text-white">Sugar-heavy cereals detected in Tier-2 districts.</h3>
               <p className="text-slate-400 text-sm">We've identified 12 brands mislabeling nutritional info. Our AI pipeline is automatically flagging these in the National Safety Record.</p>
            </div>
            <button className="px-8 py-3 bg-rose-500 text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-rose-900/20 hover:scale-105 transition-all">
               VIEW FULL ADVISORY
            </button>
         </div>
      </section>

    </div>
  );
}
