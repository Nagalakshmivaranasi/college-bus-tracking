# College Bus Tracking System (CBTS) - Interactive Frontend Prototype

A responsive, high-fidelity interactive prototype of the **College Bus Tracking System** developed strictly in alignment with the project's UML models (Class, Use Case, Sequence, and Activity diagrams), system architecture, and QA verification specifications.

---

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

```bash
# 1. Install dependencies
npm install

# 2. Run the interactive development server
npm run dev
```

Open your browser at **`http://localhost:5173/`**.

---

## 🎯 Architecture & UML Compliance

### 1. Four Supported User Roles (UML Actors & Personas)
* **Student (`Aarav Sharma - STU-1042`)**:
  * Live tracking of assigned bus (`College Bus 01` on `Route R-101`).
  * Dynamic real-time ETA calculation to designated pickup/drop stop (`Engineering Block`).
  * Interactive stops timetable and trip history logs.
  * Digital Campus Bus Pass with token verification.
  * Grievance redressal filing with transport department.
* **Parent (`Sunita Sharma - PAR-5011`)**:
  * Linked to student account (`STU-1042`).
  * Real-time vehicle safety monitoring with driver direct calling.
  * Boarding, arrival, and traffic delay notifications.
* **Driver (`Rajesh Kumar - DRV-201`)**:
  * Driver Cockpit with **Start Trip** and **End Trip** controls (UML `startTrip()`, `endTrip()`).
  * Traffic delay broadcast trigger (toggles congestion state and warns students/parents).
  * Real-time speedometer gauge and passenger load monitor.
  * Manual GPS Telemetry override form (implementing UML `Driver.updateLocation(lat, lng)`).
* **Transport Admin (`Dr. V. Ramanathan - ADM-001`)**:
  * Multi-bus Live Fleet Radar tracking all campus buses simultaneously.
  * Bus Fleet Manager (Add bus, change status, assign driver).
  * Route & Stop Manager (View routes, add stops with geo-coordinates, inspect timetables).
  * Complaints Redressal Desk (Review student grievances, post official resolution notes).
  * Fleet Reports & Analytics (On-time punctuality, load capacity, delay bottlenecks).
  * Instant Push Broadcast Composer (Send alerts to specific routes or campus-wide).
  * Secondary Reference: **QA Testing Audit Report** (replicating the 156 test cases, 91.03% pass rate document).

---

## 🛠️ Key Interactive Highlights

1. **Top Floating Role Switcher**:
   * Switch between **Student**, **Parent**, **Driver**, and **Admin** with a single click.
   * Toggle between **Mobile Mockup View** (realistic phone shell for mobile apps) and **Desktop View** (full dashboard portal).
   * Pause/Resume GPS movement and toggle simulation speed (**1x, 2x, 4x**).
2. **Real-Time GPS Simulation Engine**:
   * Simulates buses advancing smoothly along high-resolution latitude/longitude waypoints of college routes.
   * Dynamically recalculates remaining distance and ticking ETA (minutes) based on speed and traffic status.
3. **Reactive In-App Toast Notifications**:
   * Proximity geofence alerts trigger automatically when the bus approaches stops.
   * Traffic congestion reports and admin broadcasts appear as instant floating alerts.
4. **Zero Heavy Production Infrastructure**:
   * Self-contained, lightweight client-side state with `localStorage` persistence.
   * OpenStreetMap tiles via Leaflet (no paid Google Maps API keys required).

---

## 📁 Project Structure

```
college-bus-tracking-system/
├── index.html                   # HTML entry point with Leaflet & Google fonts
├── package.json                 # Dependencies (React 18, Vite, Leaflet, Lucide, Tailwind)
├── tailwind.config.js           # Tailwind CSS configuration
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main application shell with dynamic role rendering
│   ├── index.css                # Tailwind directives and map marker styles
│   ├── context/
│   │   ├── AuthContext.jsx      # Multi-role authentication & viewport state
│   │   ├── TrackingContext.jsx  # Live GPS simulation, buses, routes, and trips
│   │   └── NotificationContext.jsx # Toast alerts, broadcasts, and complaints
│   ├── components/
│   │   ├── common/              # RoleSwitcherBar, ToastAlert
│   │   ├── map/                 # Interactive Leaflet LiveMap with custom animated markers
│   │   ├── mobile/              # Phone frame shell and bottom navigation
│   │   └── admin/               # Admin portal layout and navigation sidebar
│   ├── pages/
│   │   ├── student-parent/      # Tracking, Route & Stops, Notifications, Complaints, Profile
│   │   ├── driver/              # Driver Console, Trip Controls, Manual GPS
│   │   └── admin/               # Dashboard, Fleet Radar, Buses, Routes, Complaints, Analytics, QA Report
│   ├── data/
│   │   └── mockData.js          # Seed dataset based strictly on UML entities & testing docs
│   └── services/
│       └── gpsSimulation.js     # Haversine distance, waypoint traversal & ETA calculations
```

---

*Note: All data (bus counts, routes, coordinates, names) are seeded for demonstration purposes based on the project specification documents.*

