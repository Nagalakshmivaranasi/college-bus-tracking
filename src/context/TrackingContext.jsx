import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { INITIAL_BUSES, MOCK_ROUTES, INITIAL_DRIVERS, INITIAL_TRIPS } from '../data/mockData';
import { calculateDistanceKm, calculateETA, findNearestStop } from '../services/gpsSimulation';
import { useNotifications } from './NotificationContext';

const TrackingContext = createContext();

export function TrackingProvider({ children }) {
  const { sendNotification } = useNotifications();

  const [buses, setBuses] = useState(() => {
    const saved = localStorage.getItem('cbts_buses');
    return saved ? JSON.parse(saved) : INITIAL_BUSES;
  });

  const [routes, setRoutes] = useState(() => {
    const saved = localStorage.getItem('cbts_routes');
    return saved ? JSON.parse(saved) : MOCK_ROUTES;
  });

  const [drivers, setDrivers] = useState(() => {
    const saved = localStorage.getItem('cbts_drivers');
    return saved ? JSON.parse(saved) : INITIAL_DRIVERS;
  });

  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('cbts_trips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  // Track waypoint indices for active simulation
  // Bus 01 on Route R-101 (index in waypoints array)
  const [bus1WaypointIdx, setBus1WaypointIdx] = useState(6);
  // Bus 07 on Route R-102
  const [bus7WaypointIdx, setBus7WaypointIdx] = useState(2);

  // Simulation controls
  const [isSimulating, setIsSimulating] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1); // 1x, 2x, 4x

  // Proximity notification tracker to avoid duplicate alerts
  const notifiedStopsRef = useRef(new Set());

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('cbts_buses', JSON.stringify(buses));
  }, [buses]);

  useEffect(() => {
    localStorage.setItem('cbts_routes', JSON.stringify(routes));
  }, [routes]);

  useEffect(() => {
    localStorage.setItem('cbts_drivers', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem('cbts_trips', JSON.stringify(trips));
  }, [trips]);

  // Active Simulation Loop: Advances buses along their route waypoints
  useEffect(() => {
    if (!isSimulating) return;

    const intervalTime = Math.max(800, 2500 / simSpeed);

    const timer = setInterval(() => {
      // 1. Advance Bus 01 along Route R-101
      const route1 = routes.find((r) => r.routeId === 'R-101');
      if (route1 && route1.waypoints && route1.waypoints.length > 0) {
        setBus1WaypointIdx((prevIdx) => {
          const bus01 = buses.find((b) => b.busId === 'BUS-01');
          if (bus01 && bus01.status !== 'On Route' && bus01.status !== 'Delayed') {
            return prevIdx; // Only advance if trip is active
          }

          const nextIdx = (prevIdx + 1) % route1.waypoints.length;
          const [lat, lng] = route1.waypoints[nextIdx];

          // Update Bus 01 coordinates in state
          setBuses((prevBuses) =>
            prevBuses.map((b) => {
              if (b.busId === 'BUS-01') {
                const isDelayed = b.status === 'Delayed';
                const jitterSpeed = isDelayed
                  ? 12 + Math.floor(Math.random() * 5)
                  : 32 + Math.floor(Math.random() * 8);

                return {
                  ...b,
                  speedKmH: jitterSpeed,
                  currentLocation: {
                    latitude: lat,
                    longitude: lng,
                    timestamp: new Date().toISOString()
                  }
                };
              }
              return b;
            })
          );

          // Check proximity to stops for geofence alerts
          route1.stops.forEach((stop) => {
            const distKm = calculateDistanceKm(lat, lng, stop.latitude, stop.longitude);
            const stopKey = `${stop.stopId}-${nextIdx}`;
            if (distKm <= 0.65 && !notifiedStopsRef.current.has(stopKey)) {
              notifiedStopsRef.current.add(stopKey);
              if (stop.stopId === 'STOP-05') {
                sendNotification({
                  title: 'Bus Arrived at Destination',
                  message: `College Bus 01 has reached ${stop.name}.`,
                  type: 'ETA Alert',
                  priority: 'High'
                });
              } else {
                sendNotification({
                  title: 'Next Stop Approaching',
                  message: `College Bus 01 is approaching ${stop.name} (~${Math.max(1, Math.round(distKm * 2.5))} min).`,
                  type: 'ETA Alert',
                  priority: 'Normal'
                });
              }
            }
          });

          return nextIdx;
        });
      }

      // 2. Advance Bus 07 along Route R-102
      const route2 = routes.find((r) => r.routeId === 'R-102');
      if (route2 && route2.waypoints && route2.waypoints.length > 0) {
        setBus7WaypointIdx((prevIdx) => {
          const bus07 = buses.find((b) => b.busId === 'BUS-07');
          if (bus07 && bus07.status !== 'On Route') return prevIdx;

          const nextIdx = (prevIdx + 1) % route2.waypoints.length;
          const [lat, lng] = route2.waypoints[nextIdx];

          setBuses((prevBuses) =>
            prevBuses.map((b) => {
              if (b.busId === 'BUS-07') {
                return {
                  ...b,
                  speedKmH: 26 + Math.floor(Math.random() * 6),
                  currentLocation: {
                    latitude: lat,
                    longitude: lng,
                    timestamp: new Date().toISOString()
                  }
                };
              }
              return b;
            })
          );
          return nextIdx;
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isSimulating, simSpeed, routes, buses, sendNotification]);

  // Dynamic ETA Calculation for student / parent view
  const calculateStudentETA = (targetStopId = 'STOP-05') => {
    const bus = buses.find((b) => b.busId === 'BUS-01');
    const route = routes.find((r) => r.routeId === 'R-101');
    if (!bus || !route) return { etaMinutes: 0, distanceKm: 0, nextStop: null, status: 'Unknown' };

    const targetStop = route.stops.find((s) => s.stopId === targetStopId) || route.stops[route.stops.length - 1];
    const distToTarget = calculateDistanceKm(
      bus.currentLocation.latitude,
      bus.currentLocation.longitude,
      targetStop.latitude,
      targetStop.longitude
    );

    const trafficFactor = bus.status === 'Delayed' ? 0.45 : 1.0;
    const etaMinutes = calculateETA(distToTarget, bus.speedKmH || 30, trafficFactor);

    const { stop: nearestStop } = findNearestStop(
      bus.currentLocation.latitude,
      bus.currentLocation.longitude,
      route.stops
    );

    return {
      etaMinutes: Math.max(1, etaMinutes),
      distanceKm: parseFloat(distToTarget.toFixed(1)),
      targetStopName: targetStop.name,
      nextStopName: nearestStop?.name || targetStop.name,
      busStatus: bus.status,
      speedKmH: bus.speedKmH
    };
  };

  // Driver Trip Actions (UML Driver methods: startTrip, updateLocation, endTrip)
  const startTrip = (busId) => {
    setBuses((prev) =>
      prev.map((b) => (b.busId === busId ? { ...b, status: 'On Route', speedKmH: 30 } : b))
    );

    const targetBus = buses.find((b) => b.busId === busId);
    const newTrip = {
      tripId: `TRP-${Date.now().toString().slice(-4)}`,
      busId,
      busNo: targetBus?.busNo || 'College Bus',
      routeId: targetBus?.routeId || 'R-101',
      routeName: targetBus?.routeName || 'Campus Line',
      driverName: targetBus?.driverName || 'Driver',
      date: 'Today',
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: 'In Progress',
      status: 'Active',
      totalStops: 5,
      currentStopIndex: 1,
      passengersBoarded: 24
    };

    setTrips((prev) => [newTrip, ...prev]);

    sendNotification({
      title: 'Trip Commenced',
      message: `${targetBus?.busNo || 'Bus'} has started its live trip for ${targetBus?.routeName}.`,
      type: 'Trip Update',
      priority: 'Normal'
    });
  };

  const endTrip = (busId) => {
    setBuses((prev) =>
      prev.map((b) => (b.busId === busId ? { ...b, status: 'At Depot', speedKmH: 0 } : b))
    );

    setTrips((prev) =>
      prev.map((t) =>
        t.busId === busId && t.status === 'Active'
          ? {
              ...t,
              status: 'Completed',
              endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : t
      )
    );

    const targetBus = buses.find((b) => b.busId === busId);
    sendNotification({
      title: 'Trip Concluded',
      message: `${targetBus?.busNo || 'Bus'} trip completed and returned to campus depot.`,
      type: 'Trip Update',
      priority: 'Normal'
    });
  };

  const toggleTrafficDelay = (busId) => {
    const targetBus = buses.find((b) => b.busId === busId);
    const willBeDelayed = targetBus?.status !== 'Delayed';

    setBuses((prev) =>
      prev.map((b) =>
        b.busId === busId
          ? {
              ...b,
              status: willBeDelayed ? 'Delayed' : 'On Route',
              speedKmH: willBeDelayed ? 12 : 32
            }
          : b
      )
    );

    if (willBeDelayed) {
      sendNotification({
        title: 'Traffic Congestion Delay',
        message: `${targetBus?.busNo || 'Bus'} reported dense traffic. ETA adjusted +10 mins.`,
        type: 'Traffic Alert',
        priority: 'Warning'
      });
    } else {
      sendNotification({
        title: 'Traffic Cleared',
        message: `${targetBus?.busNo || 'Bus'} resumed normal route speed.`,
        type: 'Trip Update',
        priority: 'Normal'
      });
    }
  };

  // Driver / Admin manual GPS location update (UML Driver updateLocation())
  const updateBusLocationManual = (busId, lat, lng) => {
    setBuses((prev) =>
      prev.map((b) =>
        b.busId === busId
          ? {
              ...b,
              currentLocation: {
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),
                timestamp: new Date().toISOString()
              }
            }
          : b
      )
    );
  };

  // Admin Fleet Management actions
  const addBus = (busData) => {
    const newBus = {
      busId: `BUS-${Date.now().toString().slice(-2)}`,
      busNo: busData.busNo || `College Bus ${buses.length + 1}`,
      regNumber: busData.regNumber || `AP 09 TY ${2000 + buses.length}`,
      routeId: busData.routeId || 'R-101',
      routeName: routes.find((r) => r.routeId === busData.routeId)?.name || 'Custom Route',
      driverId: busData.driverId || 'DRV-201',
      driverName: drivers.find((d) => d.driverId === busData.driverId)?.name || 'Assigned Driver',
      driverPhone: '+91 98000 11223',
      status: busData.status || 'At Depot',
      capacity: parseInt(busData.capacity, 10) || 45,
      occupiedSeats: 0,
      speedKmH: 0,
      fuelLevel: 85,
      lastMaintenance: new Date().toISOString().split('T')[0],
      currentLocation: {
        latitude: 17.3850,
        longitude: 78.4867,
        timestamp: new Date().toISOString()
      }
    };

    setBuses((prev) => [...prev, newBus]);
    sendNotification({
      title: 'Bus Added',
      message: `${newBus.busNo} (${newBus.regNumber}) added to fleet.`,
      type: 'Notice',
      priority: 'Normal'
    });
  };

  const updateBus = (busId, updated) => {
    setBuses((prev) => prev.map((b) => (b.busId === busId ? { ...b, ...updated } : b)));
  };

  const deleteBus = (busId) => {
    setBuses((prev) => prev.filter((b) => b.busId !== busId));
  };

  const addRoute = (routeData) => {
    const newRoute = {
      routeId: `R-${Date.now().toString().slice(-3)}`,
      name: routeData.name,
      description: routeData.description || 'Newly added college transit route',
      totalDistanceKm: parseFloat(routeData.totalDistanceKm) || 15.0,
      estimatedDurationMinutes: parseInt(routeData.estimatedDurationMinutes, 10) || 40,
      assignedBusId: routeData.assignedBusId || 'None',
      activeColor: '#6366f1',
      stops: routeData.stops || [],
      waypoints: routeData.waypoints || []
    };
    setRoutes((prev) => [...prev, newRoute]);
  };

  return (
    <TrackingContext.Provider
      value={{
        buses,
        routes,
        drivers,
        trips,
        isSimulating,
        setIsSimulating,
        simSpeed,
        setSimSpeed,
        calculateStudentETA,
        startTrip,
        endTrip,
        toggleTrafficDelay,
        updateBusLocationManual,
        addBus,
        updateBus,
        deleteBus,
        addRoute,
        setDrivers
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
}

