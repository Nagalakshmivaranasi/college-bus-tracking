import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export default function ToastAlert() {
  const { activeToast, setActiveToast } = useNotifications();

  if (!activeToast) return null;

  const getIcon = () => {
    switch (activeToast.type) {
      case 'Traffic Alert':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'ETA Alert':
      case 'Trip Update':
        return <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'Support':
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
      default:
        return <Bell className="w-5 h-5 text-indigo-500 shrink-0" />;
    }
  };

  return (
    <aside aria-label="Notification Alerts" className="fixed top-16 right-4 z-[999] max-w-sm w-full animate-bounce-short">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 flex items-start gap-3 backdrop-blur-md bg-white/95">
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{activeToast.title}</h4>
            <span className="text-[10px] text-slate-400">Just now</span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{activeToast.message}</p>
        </div>
        <button
          onClick={() => setActiveToast(null)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

