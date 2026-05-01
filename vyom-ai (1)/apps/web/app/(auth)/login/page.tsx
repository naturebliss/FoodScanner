"use client";

import { useState } from "react";
import { Link2, ShieldCheck, UserPlus, LogIn, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      document.cookie = "auth_token=mock_jwt; path=/";
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B0F19]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm glass-card p-8 space-y-8 relative z-10"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/20 mb-4">
            <ShieldCheck className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">VYOM-AI</h1>
          <p className="text-[10px] uppercase font-black tracking-[0.3em] text-cyan-400">Security Access Terminal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
           <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Identified Email</label>
             <input type="email" required placeholder="name@safety.gov.in" className="w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-slate-700" />
           </div>
           <div className="space-y-2">
             <div className="flex justify-between items-center px-1">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Key</label>
               <Link href="/forgot" className="text-[9px] font-bold text-slate-600 hover:text-cyan-400 transition-colors uppercase">Forgot?</Link>
             </div>
             <input type="password" required placeholder="••••••••" className="w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-slate-700" />
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-cyan-400 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
           >
             {loading ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div> : 'INITIALIZE SESSION'}
             <ChevronRight className="h-4 w-4" />
           </button>
        </form>

        <div className="pt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">Registry:</span>
              <div className="flex gap-2">
                <Link href="/signup" className="text-white hover:text-cyan-400 flex items-center gap-1"><UserPlus className="h-3 w-3" /> Signup</Link>
                <div className="w-px h-3 bg-white/10"></div>
                <div className="text-slate-500 flex items-center gap-1"><Link2 className="h-3 w-3" /> FSSAI Link</div>
              </div>
            </div>
            
            <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl flex gap-3 text-[10px] text-rose-400 leading-tight">
               <AlertCircle className="h-3.5 w-3.5 shrink-0" />
               Unauthorized access attempt will be logged with PostGIS geolocation data.
            </div>
        </div>
      </motion.div>
    </div>
  );
}
