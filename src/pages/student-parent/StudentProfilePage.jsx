import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTracking } from '../../context/TrackingContext';
import { User, Mail, Phone, MapPin, Award, CreditCard, Shield, QrCode } from 'lucide-react';

export default function StudentProfilePage() {
  const { currentUser, currentRole } = useAuth();
  const { routes } = useTracking();

  const assignedRoute = routes.find((r) => r.routeId === currentUser?.assignedRouteId) || routes[0];
  const designatedStop = assignedRoute?.stops.find((s) => s.stopId === currentUser?.designatedStopId) || assignedRoute?.stops[assignedRoute.stops.length - 1];

  return (
    <div className="space-y-4">
      {/* Profile Header Card */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/80 flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl overflow-hidden shadow-md shrink-0">
          {currentUser?.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          ) : (
            currentUser?.name?.charAt(0)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 m-0 truncate">{currentUser?.name}</h3>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
              {currentUser?.role}
            </span>
          </div>
          <p className="text-xs text-slate-500 m-0 mt-0.5">{currentUser?.email}</p>
          <p className="text-[11px] text-slate-400 m-0">{currentUser?.phone}</p>
        </div>
      </div>

      {/* Digital Campus Bus Pass Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 rounded-3xl shadow-xl relative overflow-hidden border border-slate-700">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl"></div>

        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              College Transport Digital Pass
            </span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
            VALID 2025–26
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Student Name</span>
            <span className="font-semibold text-white">{currentUser?.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Student ID / Roll</span>
            <span className="font-mono font-semibold text-blue-300">{currentUser?.studentId || 'STU-1042'}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Assigned Route</span>
            <span className="font-semibold text-white truncate block">{assignedRoute?.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Designated Stop</span>
            <span className="font-semibold text-white truncate block">{designatedStop?.name}</span>
          </div>
        </div>

        {/* QR Code Demo Simulation */}
        <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px]">
            <QrCode className="w-4 h-4 text-slate-300" />
            <span>Pass Token: BP-2025-0891</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">Active & Verified</span>
        </div>
      </div>

      {/* Emergency & Parent Link Card */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/80 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 m-0 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-blue-600" />
          <span>Safety & Emergency Contacts</span>
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="font-semibold text-slate-800 block">Campus Transport Helpdesk</span>
              <span className="text-[11px] text-slate-400">Admin Control Room (24/7)</span>
            </div>
            <a href="tel:+919444012345" className="text-blue-600 font-bold hover:underline">
              +91 94440 12345
            </a>
          </div>

          <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="font-semibold text-slate-800 block">Parent / Guardian Contact</span>
              <span className="text-[11px] text-slate-400">Sunita Sharma (Mother)</span>
            </div>
            <a href="tel:+919845011223" className="text-blue-600 font-bold hover:underline">
              +91 98450 11223
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

