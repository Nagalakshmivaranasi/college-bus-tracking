import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTracking } from '../../context/TrackingContext';
import {
  GraduationCap,
  Users,
  Car,
  ShieldCheck,
  Smartphone,
  Monitor,
  Play,
  Pause,
  FastForward,
  RotateCcw
} from 'lucide-react';

export default function RoleSwitcherBar() {
  const { currentRole, switchRole, viewMode, setViewMode, currentUser } = useAuth();
  const { isSimulating, setIsSimulating, simSpeed, setSimSpeed } = useTracking();

  const roles = [
    {
      id: 'student',
      label: 'Student',
      persona: 'Aarav (R-101)',
      icon: GraduationCap,
      color: 'hover:border-blue-500'
    },
    {
      id: 'parent',
      label: 'Parent',
      persona: 'Sunita (Parent)',
      icon: Users,
      color: 'hover:border-purple-500'
    },
    {
      id: 'driver',
      label: 'Driver',
      persona: 'Rajesh (Bus 01)',
      icon: Car,
      color: 'hover:border-amber-500'
    },
    {
      id: 'admin',
      label: 'Admin',
      persona: 'Transport Office',
      icon: ShieldCheck,
      color: 'hover:border-emerald-500'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
            <span className="text-xl">🚌</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base tracking-tight text-white m-0">College Bus Tracking System</h1>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.5 rounded">
                Demo
              </span>
            </div>
            <p className="text-xs text-slate-400 m-0">UML & Architecture Interactive Prototype</p>
          </div>
        </div>

        {/* Center: Role Switcher Buttons */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700">
          <span className="text-[11px] font-semibold text-slate-400 px-2 hidden sm:inline">Role:</span>
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title={`Switch to ${r.label} view`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Simulation Controls & Viewport Mode */}
        <div className="flex items-center gap-2">
          {/* GPS Simulation Controls */}
          <div className="flex items-center bg-slate-800/80 px-2 py-1 rounded-xl border border-slate-700 text-xs gap-1.5">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`p-1.5 rounded-lg flex items-center gap-1 font-semibold transition-colors ${
                isSimulating ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' : 'bg-rose-600/30 text-rose-300 border border-rose-500/40'
              }`}
              title={isSimulating ? 'Pause GPS movement' : 'Start GPS movement'}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span className="text-[11px] hidden md:inline">Live GPS Active</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  <span className="text-[11px] hidden md:inline">Resume GPS</span>
                </>
              )}
            </button>

            {/* Sim Speed */}
            <button
              onClick={() => setSimSpeed(simSpeed === 1 ? 2 : simSpeed === 2 ? 4 : 1)}
              className="px-2 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-700/70 hover:bg-slate-700 text-slate-200"
              title="Change simulation speed"
            >
              {simSpeed}x
            </button>
          </div>

          {/* Viewport Mode Switcher (Mobile Mockup vs Full Desktop Portal) */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'mobile' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mobile Device Mockup View (Student/Parent/Driver App)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'desktop' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Full Desktop Portal View (Admin Web Panel)"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

