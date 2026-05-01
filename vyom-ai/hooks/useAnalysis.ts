"use client";

import { useState } from "react";
import { analyzeProduct } from "@/lib/engine";

export function useAnalysis() {
  const [logs, setLogs] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  async function startScan(query: string) {
    setIsSearching(true);
    setLogs([]);
    setData(null);

    try {
      for await (const step of analyzeProduct(query)) {
        if (step.stage === "final") {
          setData(step.data);
        } else {
          setLogs(prev => [...prev, { ...step, timestamp: new Date().toLocaleTimeString() }]);
        }
      }
    } catch (error) {
       console.error(error);
    } finally {
       setIsSearching(false);
    }
  }

  return { logs, data, isSearching, startScan, reset: () => { setLogs([]); setData(null); } };
}
