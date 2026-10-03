import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  BarChart3,
  Bus,
  MapPin
} from 'lucide-react';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('Today');
  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleExport = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Export */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight m-0">
            Transport Reports & Fleet Analytics
          </h2>
          <p className="text-xs text-slate-500 m-0 mt-0.5">
            Fleet punctuality, delay hotspots, route ridership, and operational metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl p-2 shadow-sm focus:outline-none"
          >
            <option value="Today">Today (Active Trips)</option>
            <option value="This Week">Past 7 Days</option>
            <option value="This Month">This Month (May 2025)</option>
          </select>

          <button
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Analytics report generated and downloaded as CBTS-Fleet-Audit.pdf!</span>
        </div>
      )}

      {/* Top 3 High-Level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              On-Time Punctuality
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">93.8%</span>
            <span className="text-xs font-semibold text-emerald-600">▲ +1.4%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Arrivals within 5 min window of schedule</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ridership Capacity
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bus className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">84.2%</span>
            <span className="text-xs font-semibold text-blue-600">Optimal Load</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Average morning passenger utilization</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Average Congestion Delay
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">4.2</span>
            <span className="text-xs font-semibold text-slate-500">minutes/trip</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Primarily near Metro Station Junction</p>
        </div>
      </div>

      {/* Route Performance Comparison Cards */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 m-0">Route Punctuality & Performance Breakdown</h3>

        <div className="space-y-4 text-xs">
          {/* Route R-101 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                Route R-101: North Campus Express (Bus 01)
              </span>
              <span className="text-emerald-600 font-extrabold">92.4% On-Time</span>
            </div>
            {/* Visual Bar */}
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '92.4%' }}></div>
              <div className="bg-amber-400 h-full" style={{ width: '7.6%' }}></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Avg Trip Time: 42 mins</span>
              <span>Daily Boarding: 42 Students</span>
              <span>Major Delay Bottleneck: Metro Station</span>
            </div>
          </div>

          {/* Route R-102 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                Route R-102: South Corridor Line (Bus 07)
              </span>
              <span className="text-emerald-600 font-extrabold">95.8% On-Time</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '95.8%' }}></div>
              <div className="bg-amber-400 h-full" style={{ width: '4.2%' }}></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Avg Trip Time: 36 mins</span>
              <span>Daily Boarding: 48 Students</span>
              <span>Smooth Traffic Corridor</span>
            </div>
          </div>

          {/* Route R-103 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                Route R-103: East Suburb Shuttle (Bus 12)
              </span>
              <span className="text-emerald-600 font-extrabold">91.0% On-Time</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '91.0%' }}></div>
              <div className="bg-amber-400 h-full" style={{ width: '9.0%' }}></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Avg Trip Time: 39 mins</span>
              <span>Daily Boarding: 38 Students</span>
              <span>Delay Bottleneck: Railway Gate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

