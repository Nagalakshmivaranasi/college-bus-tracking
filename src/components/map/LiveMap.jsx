import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Helper component to auto-pan map when bus moves
function MapAutoPan({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.panTo(center, { animate: true, duration: 1 });
    }
  }, [center, map]);
  return null;
}

export default function LiveMap({
  activeBus,
  route,
  allBuses = [],
  highlightStopId = null,
  showAllFleet = false,
  height = '420px',
  interactive = true,
  autoCenter = true
}) {
  // Center coordinates: Default to active bus or route start
  const defaultCenter = activeBus
    ? [activeBus.currentLocation.latitude, activeBus.currentLocation.longitude]
    : route && route.stops.length > 0
    ? [route.stops[0].latitude, route.stops[0].longitude]
    : [17.4220, 78.5150]; // Default Hyderabad coordinates

  // Create Custom Bus DivIcon
  const createBusIcon = (busNo, status, isDelayed = false) => {
    const bgColor = isDelayed
      ? 'bg-amber-500'
      : status === 'At Depot'
      ? 'bg-slate-600'
      : 'bg-blue-600';

    return L.divIcon({
      className: 'custom-bus-icon-wrapper',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer">
          <div class="absolute w-10 h-10 rounded-full ${isDelayed ? 'bg-amber-400/40' : 'bg-blue-500/30'} animate-ping"></div>
          <div class="relative z-10 w-9 h-9 rounded-full ${bgColor} border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h8m-8 4h8m-8 4h4m6-10v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
            </svg>
          </div>
          <div class="absolute -bottom-5 bg-slate-900/90 text-white font-semibold text-[10px] px-1.5 py-0.5 rounded shadow whitespace-nowrap border border-slate-700">
            ${busNo.replace('College Bus ', 'Bus ')}
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    });
  };

  // Create Custom Stop DivIcon
  const createStopIcon = (seq, isTarget = false) => {
    const bgColor = isTarget ? 'bg-emerald-600' : 'bg-slate-800';
    const ringColor = isTarget ? 'ring-4 ring-emerald-400/40' : 'ring-2 ring-slate-200';

    return L.divIcon({
      className: 'custom-stop-icon-wrapper',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer">
          <div class="w-6 h-6 rounded-full ${bgColor} ${ringColor} text-white text-[11px] font-bold flex items-center justify-center shadow-md">
            ${seq}
          </div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -14]
    });
  };

  // Prepare polyline waypoints for Route R-101
  const routeWaypoints = route?.waypoints || route?.stops?.map((s) => [s.latitude, s.longitude]) || [];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200/80 bg-slate-100" style={{ height }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={interactive}
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {autoCenter && activeBus && (
          <MapAutoPan
            center={[activeBus.currentLocation.latitude, activeBus.currentLocation.longitude]}
            zoom={13}
          />
        )}

        {/* Route Polyline */}
        {routeWaypoints.length > 0 && (
          <Polyline
            positions={routeWaypoints}
            color={route.activeColor || '#2563eb'}
            weight={5}
            opacity={0.8}
            lineCap="round"
            lineJoin="round"
            dashArray={activeBus?.status === 'Delayed' ? '8, 8' : null}
          />
        )}

        {/* Route Stops */}
        {route &&
          route.stops.map((stop) => {
            const isTarget = stop.stopId === highlightStopId;
            return (
              <Marker
                key={stop.stopId}
                position={[stop.latitude, stop.longitude]}
                icon={createStopIcon(stop.sequence, isTarget)}
              >
                <Popup>
                  <div className="p-1 min-w-[170px] text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
                      <span className="w-4 h-4 rounded-full bg-slate-800 text-white inline-flex items-center justify-center text-[10px]">
                        {stop.sequence}
                      </span>
                      {stop.name}
                    </div>
                    {isTarget && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                        Your Selected Stop
                      </span>
                    )}
                    <p className="text-slate-500 mt-1">{stop.landmark}</p>
                    <div className="mt-2 pt-1 border-t border-slate-100 flex justify-between text-slate-600">
                      <span>Scheduled:</span>
                      <span className="font-semibold">{stop.scheduledTime}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {/* Single Active Bus Marker (Student/Parent/Driver view) */}
        {!showAllFleet && activeBus && (
          <Marker
            position={[activeBus.currentLocation.latitude, activeBus.currentLocation.longitude]}
            icon={createBusIcon(
              activeBus.busNo,
              activeBus.status,
              activeBus.status === 'Delayed'
            )}
          >
            <Popup>
              <div className="p-1 min-w-[200px] text-xs">
                <div className="flex items-center justify-between border-b pb-1.5 mb-1.5">
                  <span className="font-bold text-sm text-slate-900">{activeBus.busNo}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      activeBus.status === 'Delayed'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {activeBus.status}
                  </span>
                </div>
                <div className="space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="font-medium text-slate-900">{activeBus.speedKmH} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Driver:</span>
                    <span className="font-medium text-slate-900">{activeBus.driverName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plate No:</span>
                    <span className="font-mono text-slate-900">{activeBus.regNumber}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* All Fleet Buses (Admin multi-bus live monitor) */}
        {showAllFleet &&
          allBuses.map((bus) => (
            <Marker
              key={bus.busId}
              position={[bus.currentLocation.latitude, bus.currentLocation.longitude]}
              icon={createBusIcon(bus.busNo, bus.status, bus.status === 'Delayed')}
            >
              <Popup>
                <div className="p-1 min-w-[190px] text-xs">
                  <div className="flex items-center justify-between border-b pb-1 mb-1">
                    <span className="font-bold text-sm text-slate-900">{bus.busNo}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                      {bus.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mb-1">{bus.routeName}</p>
                  <div className="flex justify-between text-slate-700">
                    <span>Speed:</span>
                    <span className="font-semibold">{bus.speedKmH} km/h</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Driver:</span>
                    <span className="font-semibold">{bus.driverName}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Floating GPS Live Indicator Badge */}
      <div className="absolute top-3 right-3 z-[400] bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-md border border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-slate-700">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        Live GPS Tracking
      </div>
    </div>
  );
}

