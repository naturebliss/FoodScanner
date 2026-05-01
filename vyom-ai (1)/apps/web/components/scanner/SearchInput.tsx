"use client";

import { useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function SearchInput({ onSearch, isSearching }: { onSearch: (val: string) => void; isSearching: boolean }) {
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value);
  };

  return (
    <div className="space-y-4 w-full">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          {isSearching ? <Loader2 className="h-5 w-5 text-primary animate-spin" /> : <Search className="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter product name, barcode, or license... (e.g. Cerelac, Maggi)"
          className="w-full bg-white/[0.03] border border-white/10 rounded-[32px] py-6 pl-14 pr-32 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-600 backdrop-blur-xl shadow-2xl text-lg font-medium tracking-tight"
        />
        <button 
          type="submit"
          className="absolute right-3 inset-y-3 px-8 rounded-full bg-primary text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-cyan-400 transition-colors shadow-lg active:scale-95"
        >
          ANALYZE
        </button>
      </form>
      
      <div className="flex items-center gap-6 px-6 overflow-x-auto no-scrollbar">
          <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest shrink-0">Trending Checks</p>
          {['Cerelac', 'Maggi', 'Patanjali Ghee', 'Coca Cola'].map((item) => (
            <button 
              key={item}
              onClick={() => { setValue(item); onSearch(item); }}
              className="text-[11px] text-slate-400 font-bold hover:text-cyan-400 transition-colors shrink-0"
            >
              #{item}
            </button>
          ))}
      </div>
    </div>
  );
}

