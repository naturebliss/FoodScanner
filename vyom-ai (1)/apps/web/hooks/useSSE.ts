"use client";

import { useEffect, useState } from "react";

export function useSSE(url: string | null) {
  const [logs, setLogs] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!url) return;

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      if (parsed.stage === "final") {
        setData(parsed.data);
      } else {
        setLogs((prev) => [...prev, { ...parsed, timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }).split(' ')[0] }]);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return { logs, data, reset: () => { setLogs([]); setData(null); } };
}
