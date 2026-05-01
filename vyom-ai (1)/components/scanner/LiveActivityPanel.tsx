"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

interface LogEntry {
  timestamp: string;
  stage: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "ai";
}

export function LiveActivityPanel({ logs }: { logs: LogEntry[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return "text-emerald-400";
      case "warning": return "text-amber-400";
      case "error": return "text-rose-500";
      case "ai": return "text-fuchsia-400";
      default: return "text-cyan-400";
    }
  };

  return (
    <div className="bg-black rounded-3xl border border-white/10 flex flex-col h-full shadow-2xl overflow-hidden min-h-[300px]">
      <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Intelligence Stream</span>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 p-5 font-mono text-[11px] space-y-3 overflow-y-auto no-scrollbar"
      >
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-20 py-12">
            <Terminal className="h-8 w-8 text-slate-600" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Awaiting Signal...</p>
          </div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex gap-4 leading-relaxed group">
              <span className="text-slate-600 shrink-0 select-none">[{log.timestamp}]</span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-baseline">
                  <span className={`${getColor(log.type)} font-bold shrink-0`}>{log.stage}:</span>
                  <span className="text-slate-300">{log.message}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
