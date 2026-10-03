import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  LayoutDashboard,
  Navigation,
  Bus,
  MapPin,
  MessageSquareWarning,
  BarChart3,
  Radio,
  FileCheck2,
  Bell,
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';
import AdminDashboardPage from '../../pages/admin/AdminDashboardPage';
import FleetManagePage from '../../pages/admin/FleetManagePage';
import RouteManagePage from '../../pages/admin/RouteManagePage';
import ComplaintManagePage from '../../pages/admin/ComplaintManagePage';
import AnalyticsPage from '../../pages/admin/AnalyticsPage';
import BroadcastPage from '../../pages/admin/BroadcastPage';
import TestingReferencePage from '../../pages/admin/TestingReferencePage';
import LiveMap from '../map/LiveMap';
import { useTracking } from '../../context/TrackingContext';

export default function AdminLayout() {
  const { currentUser } = useAuth();
  const { complaints, unreadCount } = useNotifications();
  const { buses, routes } = useTracking();

  const [activeTab, setActiveTab] = useState('dashboard');

  const pendingComplaintsCount = complaints.filter((c) => c.status === 'Pending').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fleet-radar', label: 'Live Fleet Radar', icon: Navigation },
    { id: 'buses', label: 'Buses & Drivers', icon: Bus },
    { id: 'routes', label: 'Routes & Stops', icon: MapPin },
    { id: 'complaints', label: 'Complaints', icon: MessageSquareWarning, badge: pendingComplaintsCount },
    { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'broadcast', label: 'Broadcast Alerts', icon: Radio },
    { id: 'testing-ref', label: 'QA Audit Report (v1.0)', icon: FileCheck2 }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar for Desktop Admin Panel */}
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 flex flex-col justify-between border-r border-slate-800">
        <div>
          {/* Admin Header */}
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white m-0 tracking-tight">Admin Web Panel</h2>
                <span className="text-[11px] text-slate-400">Transport & Logistics</span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav aria-label="Admin Navigation" className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge > 0 && (
                    <span className="bg-amber-500 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Persona */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-xs font-bold text-blue-400 shrink-0">
            <img src={currentUser?.avatar} alt={currentUser?.name} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-white truncate m-0">{currentUser?.name}</h3>
            <p className="text-[10px] text-slate-400 truncate m-0">Director of Transport</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-900 capitalize">
              {navItems.find((n) => n.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/80 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-700">Campus GPS Gateway Online</span>
            </div>

            <button
              onClick={() => setActiveTab('complaints')}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Complaints"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
              )}
            </button>
          </div>
        </header>

        {/* Tab Viewport */}
        <div className="p-6 max-w-7xl w-full mx-auto space-y-6 flex-1">
          {activeTab === 'dashboard' && <AdminDashboardPage onNavigateTab={setActiveTab} />}

          {activeTab === 'fleet-radar' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight m-0">Live Fleet Radar</h2>
                <p className="text-xs text-slate-500 m-0 mt-0.5">
                  High-altitude multi-bus telemetry across campus transit corridors
                </p>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
                <LiveMap showAllFleet={true} allBuses={buses} route={routes[0]} height="560px" />
              </div>
            </div>
          )}

          {activeTab === 'buses' && <FleetManagePage />}
          {activeTab === 'routes' && <RouteManagePage />}
          {activeTab === 'complaints' && <ComplaintManagePage />}
          {activeTab === 'analytics' && <AnalyticsPage />}
          {activeTab === 'broadcast' && <BroadcastPage />}
          {activeTab === 'testing-ref' && <TestingReferencePage />}
        </div>
      </main>
    </div>
  );
}

