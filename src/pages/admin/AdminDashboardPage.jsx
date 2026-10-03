import React from 'react';
import { useTracking } from '../../context/TrackingContext';
import { useNotifications } from '../../context/NotificationContext';
import LiveMap from '../../components/map/LiveMap';
import {
  Bus,
  Navigation,
  Clock,
  AlertTriangle,
  Users,
  CheckCircle2,
  TrendingUp,
  Radio,
  FileText
} from 'lucide-react';

export default function AdminDashboardPage({ onNavigateTab }) {
  const { buses, routes, trips } = useTracking();
  const { complaints, notifications } = useNotifications();

  // Metrics
  const totalBuses = 35; // Total campus fleet capacity from architecture diagram
  const activeTripsCount = buses.filter((b) => b.status === 'On Route' || b.status === 'Delayed').length;
  const onRouteCount = buses.filter((b) => b.status === 'On Route').length;
  const delayedCount = buses.filter((b) => b.status === 'Delayed').length;
  const pendingComplaints = complaints.filter((c) => c.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Top Welcome & KPI Metric Cards (Directly matching Architecture diagram Web Panel) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight m-0">
            Transport Management Dashboard
          </h2>
          <p className="text-xs text-slate-500 m-0 mt-0.5">
            Real-time college fleet telemetry, routes, and passenger dispatch monitor
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('broadcast')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Send Alert Broadcast</span>
          </button>
          <button
            onClick={() => onNavigateTab('buses')}
            className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Bus className="w-3.5 h-3.5" />
            <span>Manage Fleet</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Card 1: Total Fleet */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Buses</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bus className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalBuses}</span>
            <span className="text-xs text-slate-400 font-medium">registered</span>
          </div>
          <span className="text-[11px] text-blue-600 font-semibold block mt-1">
            5 demo active units
          </span>
        </div>

        {/* Card 2: Active Trips */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Trips</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600">{activeTripsCount}</span>
            <span className="text-xs text-slate-400 font-medium">on roads</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            Morning dispatch live
          </span>
        </div>

        {/* Card 3: On-Route Punctual */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">On-Route</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">{onRouteCount}</span>
            <span className="text-xs text-slate-400 font-medium">on schedule</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            Normal headway
          </span>
        </div>

        {/* Card 4: Delayed */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delayed</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">{delayedCount}</span>
            <span className="text-xs text-slate-400 font-medium">traffic congestion</span>
          </div>
          <span className="text-[11px] text-amber-600 font-semibold block mt-1">
            Route R-101 (+10 min)
          </span>
        </div>
      </div>

      {/* Main Grid: Multi-Bus Live Map & Real-time Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Fleet Map */}
        <div className="lg:col-span-2 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Live Fleet Radar</h3>
              <p className="text-xs text-slate-400 m-0 mt-0.5">Tracking all campus buses simultaneously</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                GPS Streaming
              </span>
            </div>
          </div>

          <LiveMap
            showAllFleet={true}
            allBuses={buses}
            route={routes[0]}
            height="400px"
          />

          {/* Quick Fleet Status Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
            {buses.slice(0, 4).map((b) => (
              <div key={b.busId} className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{b.busNo}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      b.status === 'Delayed'
                        ? 'bg-amber-100 text-amber-800'
                        : b.status === 'On Route'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                  <span>Speed: {b.speedKmH} km/h</span>
                  <span>Seats: {b.occupiedSeats}/{b.capacity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Recent Activities & Pending Complaints */}
        <div className="space-y-6">
          {/* Recent Operations Activity */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-sm font-bold text-slate-900 m-0">Recent Activities</h3>
              <span className="text-[10px] text-slate-400 font-mono">Live Logs</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                <div>
                  <span className="font-semibold text-slate-800 block">Bus College 01 - On Route</span>
                  <span className="text-slate-500 text-[11px]">Passed Stop #3 (Residential Colony Circle)</span>
                  <span className="text-[10px] text-slate-400 block">10:15 AM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                <div>
                  <span className="font-semibold text-slate-800 block">Bus College 18 - Delayed</span>
                  <span className="text-slate-500 text-[11px]">Metro Station congestion reported</span>
                  <span className="text-[10px] text-slate-400 block">10:10 AM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0"></div>
                <div>
                  <span className="font-semibold text-slate-800 block">New Complaint Received</span>
                  <span className="text-slate-500 text-[11px]">Air conditioning query from Student Aarav</span>
                  <span className="text-[10px] text-slate-400 block">10:05 AM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></div>
                <div>
                  <span className="font-semibold text-slate-800 block">Route R-101 Updated</span>
                  <span className="text-slate-500 text-[11px]">Timetable verified for evening return trips</span>
                  <span className="text-[10px] text-slate-400 block">09:55 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Grievances Redressal Status */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-sm font-bold text-slate-900 m-0">Student Complaints</h3>
              <button
                onClick={() => onNavigateTab('complaints')}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                View all ({complaints.length})
              </button>
            </div>

            <div className="space-y-2">
              {complaints.slice(0, 2).map((c) => (
                <div
                  key={c.complaintId}
                  className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">{c.complaintId}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        c.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] line-clamp-2 m-0">{c.issue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

