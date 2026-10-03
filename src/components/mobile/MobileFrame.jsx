import React from 'react';
import { Wifi, Battery, Signal, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MobileFrame({ children, title, subtitle, showBack = false, onBack }) {
  const { viewMode } = useAuth();

  if (viewMode === 'desktop') {
    return (
      <div className="w-full max-w-5xl mx-auto py-6 px-4">
        {children}
      </div>
    );
  }

  // Realistic Mobile Phone Frame (iPhone / Android style)
  return (
    <div className="py-6 flex justify-center items-center">
      <div className="w-full max-w-[420px] bg-slate-900 p-3 rounded-[48px] shadow-2xl border-4 border-slate-700/60 relative">
        {/* Phone Speaker & Camera Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-50 flex items-center justify-center">
          <div className="w-10 h-1.5 bg-slate-800 rounded-full"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 ml-2 border border-slate-800"></div>
        </div>

        {/* Inner Phone Screen */}
        <div className="bg-slate-50 rounded-[38px] overflow-hidden flex flex-col h-[740px] shadow-inner relative border border-slate-800/20">
          {/* Top Status Bar (Time, Battery, Wifi) */}
          <div className="pt-2.5 px-6 pb-1 bg-white/90 backdrop-blur border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-800 shrink-0 z-40">
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mobile Screen Header */}
          {(title || showBack) && (
            <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 z-30">
              <div className="flex items-center gap-2">
                {showBack && (
                  <button
                    onClick={onBack}
                    className="p-1 rounded-full hover:bg-slate-100 text-slate-600"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-tight m-0">{title}</h2>
                  {subtitle && <p className="text-[11px] text-slate-500 m-0">{subtitle}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Scrollable Screen Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="py-1.5 bg-white flex justify-center shrink-0 border-t border-slate-100">
            <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

