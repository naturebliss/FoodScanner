"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { X, Camera, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export function BarcodeCamera({ onScan, onClose }: { onScan: (code: string) => void; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    setIsScanning(true);

    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          (codeReader as any).decodeFromVideoElement(videoRef.current, (result: any, err: any) => {
            if (result) {
              onScan(result.getText());
              stream.getTracks().forEach(track => track.stop());
            }
          });
        }
      } catch (err: any) {
        setError(err.message || "Failed to access camera");
        setIsScanning(false);
      }
    };

    startScanner();

    return () => {
      codeReader.reset();
    };
  }, [onScan]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
    >
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <h2 className="text-white font-bold tracking-widest uppercase text-xs">Laser Scan / GS1 Active</h2>
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <X className="h-6 w-6 text-white" />
        </button>
      </div>

      <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/20 glass">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-rose-500" />
            <p className="text-slate-400 text-sm">{error}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 rounded-xl bg-white/10 text-white text-xs font-bold">RETRY</button>
          </div>
        ) : (
          <>
            <video ref={videoRef} className="w-full h-full object-cover grayscale opacity-50" />
            
            {/* Cyan Laser Animation */}
            <motion.div 
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-[5%] right-[5%] h-0.5 bg-primary shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10"
            />

            {/* Corner Borders */}
            <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none" />
            <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-primary" />
          </>
        )}
      </div>

      <div className="mt-8 text-center space-y-2">
        <div className="flex items-center gap-2 justify-center text-primary">
          <Camera className="h-4 w-4" />
          <span className="text-xs font-bold tracking-widest uppercase">Align barcode within frame</span>
        </div>
        <p className="text-slate-500 text-[10px] uppercase font-mono tracking-tighter italic">Automatic detection via ZXing-JS</p>
      </div>
    </motion.div>
  );
}
