import React, { useState } from 'react';
import { useTracking } from '../../context/TrackingContext';
import { MapPin, Plus, Navigation, Clock, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export default function RouteManagePage() {
  const { routes, buses, addRoute } = useTracking();

  const [expandedRouteId, setExpandedRouteId] = useState('R-101');
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [newStopData, setNewStopData] = useState({ name: '', landmark: '', scheduledTime: '08:40 AM' });
  const [showAddStopFormFor, setShowAddStopFormFor] = useState(null);

  const [newRouteForm, setNewRouteForm] = useState({
    name: '',
    description: '',
    totalDistanceKm: '15.0',
    estimatedDurationMinutes: '35',
    assignedBusId: 'BUS-01'
  });

  const handleAddStopToRoute = (routeId) => {
    if (!newStopData.name) return;
    const targetRoute = routes.find((r) => r.routeId === routeId);
    if (!targetRoute) return;

    const newStop = {
      stopId: `STOP-${Date.now().toString().slice(-3)}`,
      name: newStopData.name,
      landmark: newStopData.landmark || 'Designated College Bus Stop',
      latitude: 17.4350 + Math.random() * 0.02,
      longitude: 78.5200 + Math.random() * 0.02,
      scheduledTime: newStopData.scheduledTime,
      sequence: targetRoute.stops.length + 1
    };

    targetRoute.stops.push(newStop);
    setShowAddStopFormFor(null);
    setNewStopData({ name: '', landmark: '', scheduledTime: '08:40 AM' });
  };

  const handleCreateRouteSubmit = (e) => {
    e.preventDefault();
    if (!newRouteForm.name) return;

    addRoute({
      name: newRouteForm.name,
      description: newRouteForm.description,
      totalDistanceKm: newRouteForm.totalDistanceKm,
      estimatedDurationMinutes: newRouteForm.estimatedDurationMinutes,
      assignedBusId: newRouteForm.assignedBusId,
      stops: [
        {
          stopId: 'STOP-NEW-1',
          name: 'Origin Point Terminal',
          landmark: 'City Hub',
          latitude: 17.3900,
          longitude: 78.4900,
          scheduledTime: '07:30 AM',
          sequence: 1
        },
        {
          stopId: 'STOP-NEW-2',
          name: 'College Campus Gate',
          landmark: 'Main Entrance',
          latitude: 17.4650,
          longitude: 78.5500,
          scheduledTime: '08:15 AM',
          sequence: 2
        }
      ]
    });

    setShowAddRouteModal(false);
    setNewRouteForm({
      name: '',
      description: '',
      totalDistanceKm: '15.0',
      estimatedDurationMinutes: '35',
      assignedBusId: 'BUS-01'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight m-0">
            Route & Stop Management
          </h2>
          <p className="text-xs text-slate-500 m-0 mt-0.5">
            Design transit corridors, sequence waypoint stops, and set arrival timetables
          </p>
        </div>

        <button
          onClick={() => setShowAddRouteModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Route</span>
        </button>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {routes.map((route) => {
          const isExpanded = expandedRouteId === route.routeId;
          const assignedBus = buses.find((b) => b.busId === route.assignedBusId) || buses[0];

          return (
            <div
              key={route.routeId}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden"
            >
              {/* Route Summary Row */}
              <div
                onClick={() => setExpandedRouteId(isExpanded ? null : route.routeId)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-sm"
                    style={{ backgroundColor: route.activeColor || '#2563eb' }}
                  >
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 m-0">{route.name}</h3>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold">
                        {route.routeId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 m-0 mt-0.5">{route.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <div className="hidden sm:block text-right">
                    <span className="font-bold text-slate-900 block">{route.totalDistanceKm} km</span>
                    <span className="text-[10px] text-slate-400">Total Distance</span>
                  </div>

                  <div className="hidden sm:block text-right">
                    <span className="font-bold text-slate-900 block">{route.stops.length} stops</span>
                    <span className="text-[10px] text-slate-400">Sequential</span>
                  </div>

                  <div className="hidden md:block text-right">
                    <span className="font-bold text-blue-600 block">{assignedBus?.busNo}</span>
                    <span className="text-[10px] text-slate-400">Vehicle</span>
                  </div>

                  <div className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Stops Sequence (UML Route: contains Stop) */}
              {isExpanded && (
                <div className="bg-slate-50/70 p-5 border-t border-slate-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 m-0 uppercase tracking-wider text-[11px]">
                      Stops Sequence & Geocoordinates (UML addStop / getETA)
                    </h4>
                    <button
                      onClick={() => setShowAddStopFormFor(route.routeId)}
                      className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Stop to Route</span>
                    </button>
                  </div>

                  {/* Add Stop Form Inline */}
                  {showAddStopFormFor === route.routeId && (
                    <div className="bg-white p-3.5 rounded-2xl border border-blue-200 shadow-sm flex flex-wrap items-center gap-3 text-xs">
                      <input
                        type="text"
                        placeholder="Stop Name (e.g. Science Block)"
                        value={newStopData.name}
                        onChange={(e) => setNewStopData({ ...newStopData, name: e.target.value })}
                        className="p-1.5 bg-slate-50 border rounded-lg text-slate-800 flex-1 min-w-[160px]"
                      />
                      <input
                        type="text"
                        placeholder="Landmark"
                        value={newStopData.landmark}
                        onChange={(e) => setNewStopData({ ...newStopData, landmark: e.target.value })}
                        className="p-1.5 bg-slate-50 border rounded-lg text-slate-800 flex-1 min-w-[140px]"
                      />
                      <input
                        type="text"
                        placeholder="Scheduled (e.g. 08:35 AM)"
                        value={newStopData.scheduledTime}
                        onChange={(e) => setNewStopData({ ...newStopData, scheduledTime: e.target.value })}
                        className="p-1.5 bg-slate-50 border rounded-lg text-slate-800 w-28"
                      />
                      <button
                        onClick={() => handleAddStopToRoute(route.routeId)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold"
                      >
                        Confirm Stop
                      </button>
                      <button
                        onClick={() => setShowAddStopFormFor(null)}
                        className="px-2 py-1.5 text-slate-400 hover:text-slate-600"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {/* Sequence Table */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                          <th className="py-2.5 px-3">#</th>
                          <th className="py-2.5 px-3">Stop Name</th>
                          <th className="py-2.5 px-3">Landmark</th>
                          <th className="py-2.5 px-3">Latitude / Longitude</th>
                          <th className="py-2.5 px-3 text-right">Scheduled Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {route.stops.map((stop) => (
                          <tr key={stop.stopId} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-bold text-slate-700">{stop.sequence}</td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">{stop.name}</td>
                            <td className="py-2.5 px-3 text-slate-500">{stop.landmark}</td>
                            <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                              {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                            </td>
                            <td className="py-2.5 px-3 text-right font-semibold text-slate-800">
                              {stop.scheduledTime}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Route Modal */}
      {showAddRouteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 m-0">Create New Route</h3>
              <button
                onClick={() => setShowAddRouteModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRouteSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Route Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Route R-106: West Campus Shuttle"
                  required
                  value={newRouteForm.name}
                  onChange={(e) => setNewRouteForm({ ...newRouteForm, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. West City Metro to Hostel Gate 3"
                  value={newRouteForm.description}
                  onChange={(e) => setNewRouteForm({ ...newRouteForm, description: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    value={newRouteForm.totalDistanceKm}
                    onChange={(e) =>
                      setNewRouteForm({ ...newRouteForm, totalDistanceKm: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Est. Duration (mins)
                  </label>
                  <input
                    type="number"
                    value={newRouteForm.estimatedDurationMinutes}
                    onChange={(e) =>
                      setNewRouteForm({ ...newRouteForm, estimatedDurationMinutes: e.target.value })
                    }
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddRouteModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm"
                >
                  Save Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

