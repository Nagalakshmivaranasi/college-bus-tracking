import React, { useState } from 'react';
import { useTracking } from '../../context/TrackingContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Clock, CheckCircle2, Circle, History, Navigation, Calendar } from 'lucide-react';

export default function RouteSchedulePage() {
  const { routes, buses, trips } = useTracking();
  const { currentUser, updateProfile, currentRole } = useAuth();

  const [activeTab, setActiveTab] = useState('stops'); // 'stops' | 'history'
  const [selectedRouteId, setSelectedRouteId] = useState('R-101');

  const route = routes.find((r) => r.routeId === selectedRouteId) || routes[0];
  const bus = buses.find((b) => b.routeId === route.routeId) || buses[0];

  const handleSelectMyStop = (stopId) => {
    updateProfile(currentRole, { designatedStopId: stopId });
  };

  return (
    <div className="space-y-4">
      {/* Route Switcher & Tabs */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Select Route
          </label>
          <span className="text-xs font-semibold text-blue-600">{route.totalDistanceKm} km Total</span>
        </div>

        <select
          value={selectedRouteId}
          onChange={(e) => setSelectedRouteId(e.target.value)}
          className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {routes.map((r) => (
            <option key={r.routeId} value={r.routeId}>
              {r.name}
            </option>
          ))}
        </select>

        {/* Sub-tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('stops')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'stops' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Stops & Timetable</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Trip History</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Stops & Timetable */}
      {activeTab === 'stops' && (
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/80">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 m-0">{route.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{route.description}</p>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {route.stops.map((stop, index) => {
              const isSelectedStop = currentUser?.designatedStopId === stop.stopId;
              const isFirst = index === 0;
              const isLast = index === route.stops.length - 1;

              return (
                <div key={stop.stopId} className="relative group">
                  {/* Pin Circle on Timeline */}
                  <div
                    className={`absolute -left-[27px] top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white transition-all ${
                      isSelectedStop
                        ? 'border-emerald-500 text-emerald-600 shadow-md ring-4 ring-emerald-100'
                        : isFirst
                        ? 'border-blue-500 text-blue-600'
                        : isLast
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-slate-300 text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] font-bold">{stop.sequence}</span>
                  </div>

                  {/* Stop Information */}
                  <div
                    className={`p-3 rounded-2xl border transition-all ${
                      isSelectedStop
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-slate-50/70 border-slate-200/70 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs font-bold text-slate-900 m-0">{stop.name}</h4>
                          {isSelectedStop && (
                            <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded">
                              Your Designated Stop
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{stop.landmark}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{stop.scheduledTime}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Scheduled</span>
                      </div>
                    </div>

                    {!isSelectedStop && (
                      <button
                        onClick={() => handleSelectMyStop(stop.stopId)}
                        className="mt-2 text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Set as my designated pickup stop
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Trip History (UML View Trip History) */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {trips.map((trip) => (
            <div
              key={trip.tripId}
              className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900">{trip.date}</span>
                  <span className="text-[10px] text-slate-400">({trip.tripId})</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    trip.status === 'Active'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {trip.status}
                </span>
              </div>

              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">{trip.busNo}</span> • {trip.routeName}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>
                  Start: <span className="font-semibold text-slate-700">{trip.startTime}</span>
                </div>
                <div>
                  End: <span className="font-semibold text-slate-700">{trip.endTime}</span>
                </div>
                <div>
                  Driver: <span className="font-semibold text-slate-700">{trip.driverName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

