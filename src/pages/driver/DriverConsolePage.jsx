import React, { useState } from 'react';
import { useTracking } from '../../context/TrackingContext';
import { useAuth } from '../../context/AuthContext';
import LiveMap from '../../components/map/LiveMap';
import {
  Play,
  Square,
  AlertTriangle,
  Compass,
  Gauge,
  Navigation,
  CheckCircle2,
  MapPin,
  Send,
  Radio
} from 'lucide-react';

export default function DriverConsolePage() {
  const { buses, routes, startTrip, endTrip, toggleTrafficDelay, updateBusLocationManual } =
    useTracking();
  const { currentUser } = useAuth();

  // Find Driver's assigned bus (BUS-01) and route (R-101)
  const bus = buses.find((b) => b.busId === (currentUser?.assignedBusId || 'BUS-01')) || buses[0];
  const route = routes.find((r) => r.routeId === bus.routeId) || routes[0];

  const [activeDriverTab, setActiveDriverTab] = useState('controls'); // 'controls' | 'stops' | 'manualGps'
  const [manualLat, setManualLat] = useState(bus.currentLocation.latitude.toString());
  const [manualLng, setManualLng] = useState(bus.currentLocation.longitude.toString());
  const [manualUpdateSuccess, setManualUpdateSuccess] = useState(false);

  const isTripActive = bus.status === 'On Route' || bus.status === 'Delayed';
  const isDelayed = bus.status === 'Delayed';

  const handleManualLocationSubmit = (e) => {
    e.preventDefault();
    updateBusLocationManual(bus.busId, manualLat, manualLng);
    setManualUpdateSuccess(true);
    setTimeout(() => setManualUpdateSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Driver Cockpit Header */}
      <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{bus.busNo}</span>
              <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.5 rounded">
                {bus.regNumber}
              </span>
            </div>
            <p className="text-xs text-slate-400 m-0 mt-0.5">{route.name}</p>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              isDelayed
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : isTripActive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isDelayed
                  ? 'bg-amber-400 animate-ping'
                  : isTripActive
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-slate-500'
              }`}
            ></span>
            {bus.status}
          </div>
        </div>

        {/* Speedometer & Metric Gauges */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="bg-slate-800/80 p-2 rounded-2xl border border-slate-700">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Gauge className="w-3 h-3 text-blue-400" />
              <span>Speed</span>
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {bus.speedKmH} <span className="text-[10px] font-normal text-slate-400">km/h</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-2 rounded-2xl border border-slate-700">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Passengers</div>
            <div className="text-xl font-bold text-white mt-1">
              {bus.occupiedSeats}
              <span className="text-[10px] font-normal text-slate-400">/{bus.capacity}</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-2 rounded-2xl border border-slate-700">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Fuel Level</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">{bus.fuelLevel}%</div>
          </div>
        </div>

        {/* Driver Quick Mode Switcher */}
        <div className="flex bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveDriverTab('controls')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              activeDriverTab === 'controls' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Trip Cockpit
          </button>
          <button
            onClick={() => setActiveDriverTab('stops')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              activeDriverTab === 'stops' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Route Checklist
          </button>
          <button
            onClick={() => setActiveDriverTab('manualGps')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              activeDriverTab === 'manualGps' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Manual GPS (UML)
          </button>
        </div>
      </div>

      {/* Driver Cockpit Main Controls */}
      {activeDriverTab === 'controls' && (
        <div className="space-y-4">
          {/* Primary Action Buttons (UML: startTrip() & endTrip()) */}
          <div className="grid grid-cols-2 gap-3">
            {!isTripActive ? (
              <button
                onClick={() => startTrip(bus.busId)}
                className="col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all transform active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>START MORNING TRIP</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => toggleTrafficDelay(bus.busId)}
                  className={`font-bold py-3 px-3 rounded-2xl text-xs flex items-center justify-center gap-2 border transition-all ${
                    isDelayed
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-md'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>{isDelayed ? 'Clear Traffic Delay' : 'Report Traffic Congestion'}</span>
                </button>

                <button
                  onClick={() => endTrip(bus.busId)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>END TRIP</span>
                </button>
              </>
            )}
          </div>

          {/* Interactive Live Map in Driver View */}
          <div className="bg-white p-3 rounded-3xl shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-blue-600" />
                Live Driving Path
              </span>
              <span className="text-[10px] text-slate-400">GPS Transmitter Active</span>
            </div>
            <LiveMap activeBus={bus} route={route} height="280px" />
          </div>
        </div>
      )}

      {/* Driver Tab: Route Stops Checklist */}
      {activeDriverTab === 'stops' && (
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-xs font-bold text-slate-900 m-0">Scheduled Stops Progress</h3>
            <span className="text-[11px] text-slate-400">Route R-101</span>
          </div>

          <div className="space-y-2.5">
            {route.stops.map((stop) => (
              <div
                key={stop.stopId}
                className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    {stop.sequence}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 m-0">{stop.name}</h4>
                    <p className="text-[11px] text-slate-500 m-0">{stop.landmark}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-700 block">{stop.scheduledTime}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">On Schedule</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Driver Tab: Manual GPS Override (UML Driver method updateLocation) */}
      {activeDriverTab === 'manualGps' && (
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 border-b pb-2">
            <Radio className="w-4 h-4 text-blue-600" />
            <div>
              <h3 className="text-xs font-bold text-slate-900 m-0">Driver GPS Telemetry Override</h3>
              <p className="text-[10px] text-slate-400 m-0">
                Implements Driver.updateLocation(lat, lng) from project UML
              </p>
            </div>
          </div>

          {manualUpdateSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-2.5 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Location coordinates broadcast successfully!</span>
            </div>
          )}

          <form onSubmit={handleManualLocationSubmit} className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Latitude
              </label>
              <input
                type="text"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                className="w-full text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Longitude
              </label>
              <input
                type="text"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                className="w-full text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Coordinates</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

