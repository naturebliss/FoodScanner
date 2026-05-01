"use client";

import { useState } from "react";
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function HistoryPage() {
  const [history, setHistory] = useState([
    { id: "1", product: "Maggi Masala Noodles", brand: "Nestle", date: "2026-04-30", risk: 78, type: "FOOD" },
    { id: "2", product: "Himalaya Face Wash", brand: "Himalaya", date: "2026-04-29", risk: 42, type: "SKINCARE" },
    { id: "3", product: "Parle-G Biscuits", brand: "Parle", date: "2026-04-28", risk: 15, type: "FOOD" },
  ]);

  const exportToPDF = () => {
    const doc = new jsPDF() as any;
    doc.setFontSize(20);
    doc.text("VYOM-AI Safety Report", 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    const tableData = history.map(h => [h.date, h.product, h.brand, h.type, h.risk]);
    doc.autoTable({
      startY: 40,
      head: [['Date', 'Product', 'Brand', 'Category', 'Risk Score']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillStyle: [6, 182, 212] }
    });
    
    doc.save("vyom-safety-history.pdf");
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="text-primary h-8 w-8" />
            Scan Intelligence History
          </h2>
          <p className="text-slate-400">Archived security profiling for your district.</p>
        </div>
        <button 
          onClick={exportToPDF}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
        >
          <Download className="h-4 w-4" />
          Export to PDF
        </button>
      </header>

      {/* Filters */}
      <div className="glass rounded-3xl p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input type="text" placeholder="Filter by product or brand..." className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none" />
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              <Filter className="h-3.5 w-3.5 inline mr-2" />
              Category
           </button>
           <button className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              Risk Level
           </button>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {history.map((record, i) => (
          <motion.div 
            key={record.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group glass rounded-2xl p-5 hover:bg-white/[0.04] transition-all flex items-center justify-between border-white/5"
          >
            <div className="flex items-center gap-6">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl border ${record.risk > 70 ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : record.risk > 30 ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
                 {record.risk}
               </div>
               <div>
                  <h4 className="text-white font-bold tracking-tight">{record.product}</h4>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-tighter">{record.brand} • {record.type}</p>
               </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:block text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Scanned On</p>
                <p className="text-xs text-slate-400 font-mono">{record.date}</p>
              </div>
              <div className="flex gap-2">
                 <Link href="/scan" className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all text-slate-500">
                    <ExternalLink className="h-4 w-4" />
                 </Link>
                 <button className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 transition-all text-slate-500">
                    <Trash2 className="h-4 w-4" />
                 </button>
                 <div className="p-2 text-slate-700 group-hover:text-slate-400 transition-colors">
                    <ChevronRight className="h-5 w-5" />
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] text-slate-600 font-black tracking-widest uppercase mb-4 italic">No more archived records found in this partition</p>
      </div>
    </div>
  );
}
