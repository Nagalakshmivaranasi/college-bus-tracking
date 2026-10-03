// GPS Simulation and Geofencing Service

// Haversine formula to compute great-circle distance between two coordinates in kilometers
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Estimate ETA in minutes given distance and average speed (km/h)
export function calculateETA(distanceKm, speedKmH = 30, trafficFactor = 1.0) {
  if (distanceKm <= 0.05) return 0;
  const effectiveSpeed = Math.max(10, speedKmH * trafficFactor);
  const hours = distanceKm / effectiveSpeed;
  return Math.ceil(hours * 60);
}

// Calculate remaining distance along sequential route waypoints to a target stop
export function calculateRemainingRouteDistance(currentWaypointIndex, waypoints, targetStopCoord) {
  if (!waypoints || waypoints.length === 0) return 0;

  let totalDist = 0;
  // Distance from current position to next waypoint
  for (let i = currentWaypointIndex; i < waypoints.length - 1; i++) {
    const [lat1, lon1] = waypoints[i];
    const [lat2, lon2] = waypoints[i + 1];
    totalDist += calculateDistanceKm(lat1, lon1, lat2, lon2);
  }

  // If target stop is near the final waypoints
  if (targetStopCoord) {
    const lastWp = waypoints[waypoints.length - 1];
    totalDist += calculateDistanceKm(lastWp[0], lastWp[1], targetStopCoord.latitude, targetStopCoord.longitude);
  }

  return parseFloat(totalDist.toFixed(2));
}

// Determine the closest stop to a current coordinate
export function findNearestStop(lat, lng, stops) {
  if (!stops || stops.length === 0) return null;
  let nearest = stops[0];
  let minDistance = calculateDistanceKm(lat, lng, nearest.latitude, nearest.longitude);

  for (let i = 1; i < stops.length; i++) {
    const dist = calculateDistanceKm(lat, lng, stops[i].latitude, stops[i].longitude);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = stops[i];
    }
  }

  return { stop: nearest, distanceKm: parseFloat(minDistance.toFixed(2)) };
}

