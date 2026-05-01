import { ShieldCheck, Bell, User } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans flex flex-col overflow-x-hidden relative">
      {/* Header Section */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-fuchsia-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter text-white">VYOM-AI</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-semibold leading-none">National Safety Intelligence</p>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-cyan-400 border-b-2 border-cyan-400 pb-1">Dashboard</Link>
          <Link href="/scan" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Scanner</Link>
          <Link href="/map" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">GIS Map</Link>
          <Link href="/complaints" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Complaints</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-full">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
            <span className="text-[11px] font-bold text-rose-500 uppercase">3 Recalls Live</span>
          </div>
          <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
            <Bell className="h-5 w-5 text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-fuchsia-500 rounded-full border-2 border-[#0B0F19]"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
            <User className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Bar Info / Footer */}
      <footer className="px-8 py-3 border-t border-white/5 flex flex-col md:flex-row justify-between items-center bg-black/40 gap-4 mt-auto">
        <div className="flex items-center gap-6 text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> PostGIS Stable</span>
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Redis Sync Active</span>
          <span className="hidden sm:inline">Cluster: AP-SOUTH-1</span>
        </div>
        <div className="text-[10px] text-slate-600 font-medium tracking-wider">
          © 2026 VYOM SAFETY SYSTEMS • MISSION NATIONAL SCALE
        </div>
      </footer>
    </div>
  );
}
