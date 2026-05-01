"use client";

import { useState } from "react";
import { 
  Map as MapIcon, 
  Layers, 
  LocateFixed, 
  Search,
  Filter,
  ShieldAlert
} from "lucide-react";
import { FreeMap } from "@/components/maps/FreeMap";

export default function MapPage() {
  const [activeLayer, setActiveLayer] = useState("complaints");

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] overflow-hidden">
      
      {/* Map Content Overlay Container */}
      <div className="flex-1 relative bg-slate-900 overflow-hidden">
        
        {/* Real Map Background (Leaflet) */}
        <div className="absolute inset-0">
          <FreeMap />
          {/* Subtle overlay to maintain look */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/40"></div>
        </div>

        {/* Floating Toolbars */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-4">
           <div className="glass rounded-2xl p-2 flex flex-col gap-2 shadow-2xl">
              {[
                { id: "complaints", icon: ShieldAlert, label: "Complaints" },
                { id: "vendors", icon: Layers, label: "Vendors" },
                { id: "recalls", icon: ShieldAlert, label: "Recalls" },
              ].map(layer => (
                <button 
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`p-3 rounded-xl transition-all ${activeLayer === layer.id ? 'bg-primary text-black' : 'text-slate-400 hover:bg-white/5'}`}
                  title={layer.label}
                >
                  <layer.icon className="h-5 w-5" />
                </button>
              ))}
           </div>
           
           <button className="glass p-3 rounded-2xl text-slate-400 hover:text-white transition-all shadow-2xl">
              <LocateFixed className="h-5 w-5" />
           </button>
        </div>

        {/* Search & Statistics Panel */}
        <div className="absolute top-6 right-6 z-10 w-80 flex flex-col gap-4">
          <div className="glass rounded-3xl p-4 shadow-2xl space-y-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search district..." 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary/50" 
                />
             </div>
             
             <div className="flex gap-2">
                <div className="flex-1 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-center">
                   <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Hotspots</p>
                   <p className="text-xl font-bold text-white">14</p>
                </div>
                <div className="flex-1 bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 text-center">
                   <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Resolved</p>
                   <p className="text-xl font-bold text-white">128</p>
                </div>
             </div>
          </div>

          {/* Incident Feed */}
          <div className="glass rounded-3xl p-4 shadow-2xl flex-1 flex flex-col min-h-0">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Live Incident Feed</h3>
             <div className="space-y-3 overflow-y-auto pr-2 max-h-[300px] no-scrollbar">
                {[
                  { loc: "South Delhi", type: "Fake Milk", time: "2m ago", severity: "high" },
                  { loc: "Gurgaon", type: "Expired Cosmetics", time: "12m ago", severity: "medium" },
                  { loc: "Noida", type: "Produce Risk", time: "1h ago", severity: "low" },
                  { loc: "Janakpuri", type: "Brand Piracy", time: "2h ago", severity: "high" },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.severity === 'high' ? 'bg-rose-500' : item.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[11px] font-bold truncate">{item.type}</p>
                      <p className="text-slate-500 text-[10px]">{item.loc}</p>
                    </div>
                    <span className="text-[9px] text-slate-600 font-mono">{item.time}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-10 left-6 z-10 glass rounded-2xl px-4 py-2 flex gap-4 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Safe</span>
          </div>
        </div>

      </div>

      {/* Control Footer */}
      <div className="bg-black/60 border-t border-white/10 p-4 flex justify-between items-center px-8">
        <div className="flex gap-8">
           <div className="space-y-1">
             <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">Map Viewport</p>
             <p className="text-xs text-white font-mono">28.6139° N, 77.2090° E</p>
           </div>
           <div className="space-y-1">
             <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">Dataset State</p>
             <p className="text-xs text-emerald-500 font-mono flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
               GIS SYNC ACTIVE
             </p>
           </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary/20 transition-all">
          <Filter className="h-3.5 w-3.5" />
          Refine Intelligence
        </button>
      </div>
    </div>
  );
}
