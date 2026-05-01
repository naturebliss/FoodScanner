"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// We must dynamically import the MapContainer and other components because they rely on 'window'
const MapWithNoSSR = dynamic(() => import('./LeafletMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center rounded-3xl border border-white/10">
      <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Initializing Free Grid...</p>
    </div>
  ),
});

export function FreeMap() {
  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
      <MapWithNoSSR />
    </div>
  );
}
