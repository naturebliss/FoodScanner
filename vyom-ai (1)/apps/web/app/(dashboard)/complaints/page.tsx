"use client";

import { useState } from "react";
import { 
  Megaphone, 
  Upload, 
  MapPin, 
  AlertCircle,
  CheckCircle2,
  Send
} from "lucide-react";
import { motion } from "motion/react";

export default function ComplaintsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-6 text-center space-y-6">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">Complaint Filed</h2>
          <p className="text-slate-400 max-w-sm mx-auto">Reference ID: <span className="font-mono text-cyan-400">VYOM-10293-8X</span>. Our regional safety officer will investigate within 24 hours.</p>
        </div>
        <button onClick={() => setSubmitted(false)} className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
          FILE ANOTHER REPORT
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 grid grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* Form Side */}
      <div className="col-span-12 lg:col-span-7 space-y-8">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-[0.2em]">
            <Megaphone className="h-4 w-4" />
            Reporting Service Live
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tight">File Safety Complaint</h2>
          <p className="text-slate-400 text-lg">Direct escalation to FSSAI & District Safety Boards.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Issue Type</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500/50 appearance-none">
                <option value="fake">Counterfeit / Fake Brand</option>
                <option value="harmful">Harmful Ingredients</option>
                <option value="expired">Expired / Tampered</option>
                <option value="adulteration">Food Adulteration</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Target Product</label>
              <input type="text" placeholder="e.g. Brand-X Milk" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500/50" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Detailed Description</label>
            <textarea rows={4} placeholder="Describe the safety concern in detail..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose-500/50 resize-none"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center space-y-3 hover:bg-white/[0.02] transition-colors cursor-pointer group">
               <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                  <Upload className="h-5 w-5 text-slate-500 group-hover:text-primary transition-colors" />
               </div>
               <div>
                 <p className="text-white text-xs font-bold">Upload Visual Proof</p>
                 <p className="text-slate-500 text-[10px]">JPG, PNG, max 5MB</p>
               </div>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Geolocation</span>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">Vasant Vihar, New Delhi</p>
                    <p className="text-[10px] text-slate-500 font-mono">28.5602° N, 77.1616° E</p>
                  </div>
               </div>
            </div>
          </div>

          <button type="submit" className="w-full py-4 rounded-2xl bg-rose-500 text-white font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:scale-[1.01] active:scale-95 transition-all">
            EXECUTE COMPLAINT ESCALATION
          </button>
        </form>
      </div>

      {/* Info Side */}
      <div className="col-span-12 lg:col-span-5 space-y-8">
         <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Escalation Protocol</h3>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Evidence Logging", desc: "Your report is cryptographically signed and stored in the audit trail." },
                { step: "02", title: "Identity Anonymization", desc: "PII is removed before sending to vendors. Only officers see your ID." },
                { step: "03", title: "Govt. API Push", desc: "Automated submission to FSSAI FosCos portal if risk score > 60." },
              ].map((protocol, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-cyan-500 font-mono font-bold">{protocol.step}</span>
                  <div className="space-y-1">
                    <p className="text-white text-sm font-bold tracking-tight">{protocol.title}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{protocol.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3 italic text-[11px] text-amber-400/80">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>False reports are subject to legal action under Section 34 of the Food Safety & Standards Act.</p>
            </div>
         </div>

         {/* Local Stats */}
         <div className="glass rounded-3xl p-6 border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Local District Stats</h4>
              <span className="text-[10px] text-slate-600 font-mono">ID: 110057</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Escalation Rate</span>
                <span className="text-white font-mono">92%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-cyan-400"></div>
              </div>
            </div>
         </div>
      </div>

    </div>
  );
}
