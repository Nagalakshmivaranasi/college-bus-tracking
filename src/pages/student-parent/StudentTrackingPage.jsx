import React, { useState } from 'react';
import { useTracking } from '../../context/TrackingContext';
import { useAuth } from '../../context/AuthContext';
import LiveMap from '../../components/map/LiveMap';
import { Clock, Navigation2, Phone, AlertCircle, ShieldCheck, MapPin, Gauge } from 'lucide-react';

export default function StudentTrackingPage() {
  const { buses, routes, calculateStudentETA } = useTracking();
  const { currentUser, currentRole } = useAuth();

  const [selectedBusId, setSelectedBusId] = useState('BUS-01');

  const activeBus = buses.find((b) => b.busId === selectedBusId) || buses[0];
  const activeRoute = routes.find((r) => r.routeId === activeBus.routeId) || routes[0];

  // Dynamic ETA for student/parent designated stop
  const etaData = calculateStudentETA(currentUser?.designatedStopId || 'STOP-05');

  return (
    <div className="space-y-4">
      {/* Bus / Route Selector & Status Pill */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            Active College Bus
          </label>
          <select
            value={selectedBusId}
            onChange={(e) => setSelectedBusId(e.target.value)}
            className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {buses.map((bus) => (
              <option key={bus.busId} value={bus.busId}>
                {bus.busNo} - {bus.routeName}
              </option>
            ))}
          </select>
        </div>

        <div className="text-right">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              activeBus.status === 'Delayed'
                ? 'bg-amber-100 text-amber-800'
                : activeBus.status === 'On Route'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                activeBus.status === 'Delayed'
                  ? 'bg-amber-500'
                  : activeBus.status === 'On Route'
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-slate-400'
              }`}
            ></span>
            {activeBus.status}
          </span>
        </div>
      </div>

      {/* Dynamic ETA Hero Card (UML View ETA) */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white p-4 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between text-blue-100 text-xs mb-1">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-200" />
              Destination: {etaData.targetStopName}
            </span>
            <span className="font-mono text-[11px] bg-white/20 px-2 py-0.5 rounded-full">
              Live Calc
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-extrabold tracking-tight">{etaData.etaMinutes}</span>
                <span className="text-lg font-semibold text-blue-200">mins</span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Estimated Time of Arrival
              </p>
            </div>

            <div className="text-right space-y-1">
              <div className="bg-white/15 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10">
                <div className="text-[10px] text-blue-100 uppercase tracking-wider">Distance</div>
                <div className="text-sm font-bold">{etaData.distanceKm} km</div>
              </div>
              <div className="text-[11px] text-blue-200 flex items-center justify-end gap-1">
                <Gauge className="w-3 h-3" />
                <span>{etaData.speedKmH} km/h</span>
              </div>
            </div>
          </div>

          {/* Next Stop Indicator */}
          <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs text-blue-100">
            <span>Next Stop:</span>
            <span className="font-semibold text-white truncate max-w-[200px]">
              {etaData.nextStopName}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Live Map (UML Track Bus) */}
      <div className="bg-white p-2.5 rounded-3xl shadow-sm border border-slate-200/80">
        <div className="flex items-center justify-between px-2 py-1 mb-2">
          <div className="flex items-center gap-1.5">
            <Navigation2 className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-xs text-slate-800 m-0">Live GPS Route Map</h3>
          </div>
          <span className="text-[10px] text-slate-400">Updates every 2.5s</span>
        </div>

        <LiveMap
          activeBus={activeBus}
          route={activeRoute}
          highlightStopId={currentUser?.designatedStopId || 'STOP-05'}
          height="320px"
        />

        <div className="mt-2.5 px-2 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
            Bus Location
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
            Your Pickup/Drop Stop
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block"></span>
            Route Stops
          </span>
        </div>
      </div>

      {/* Driver Contact & Vehicle Info Card */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt={activeBus.driverName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-slate-900 m-0">{activeBus.driverName}</h4>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-semibold">
                Driver
              </span>
            </div>
            <p className="text-[11px] text-slate-500 m-0 font-mono">{activeBus.regNumber}</p>
          </div>
        </div>

        <a
          href={`tel:${activeBus.driverPhone}`}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Driver</span>
        </a>
      </div>

      {/* Safety Note for Parents */}
      {currentRole === 'parent' && (
        <div className="bg-purple-50 border border-purple-200/70 p-3 rounded-2xl flex items-start gap-2.5 text-xs text-purple-900">
          <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Parent Guardian View: </span>
            Tracking assigned vehicle for student <span className="font-semibold">{currentUser?.studentName}</span> (ID: {currentUser?.studentId}).
          </div>
        </div>
      )}
    </div>
  );
}

