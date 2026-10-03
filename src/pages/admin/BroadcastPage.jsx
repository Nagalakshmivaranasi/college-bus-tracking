import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useTracking } from '../../context/TrackingContext';
import { Radio, Send, Bell, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function BroadcastPage() {
  const { sendNotification, notifications } = useNotifications();
  const { routes } = useTracking();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('Traffic Alert');
  const [priority, setPriority] = useState('Normal');
  const [targetRoute, setTargetRoute] = useState('ALL');
  const [success, setSuccess] = useState(false);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title || !message) return;

    sendNotification({
      title,
      message,
      type,
      priority,
      routeId: targetRoute === 'ALL' ? null : targetRoute
    });

    setTitle('');
    setMessage('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight m-0">
          Emergency & Announcement Broadcasts
        </h2>
        <p className="text-xs text-slate-500 m-0 mt-0.5">
          Push real-time alerts to mobile apps for students, parents, and drivers
        </p>
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Broadcast dispatched successfully! In-app notification delivered to users.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Broadcast Composer */}
        <form
          onSubmit={handleBroadcast}
          className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 text-xs"
        >
          <div className="flex items-center gap-2 border-b pb-3">
            <Radio className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 m-0">Compose Push Notification</h3>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Notification Title
            </label>
            <input
              type="text"
              placeholder="e.g. Weather Delay Advisory / Route Diversion"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Traffic Alert">Traffic Congestion</option>
                <option value="ETA Alert">ETA & Route Change</option>
                <option value="System Broadcast">Administrative Broadcast</option>
                <option value="Trip Update">Trip Status</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Normal">Normal</option>
                <option value="High">High (Immediate)</option>
                <option value="Warning">Warning / Alert</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Target Audience
              </label>
              <select
                value={targetRoute}
                onChange={(e) => setTargetRoute(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Routes & Users (Campus-wide)</option>
                {routes.map((r) => (
                  <option key={r.routeId} value={r.routeId}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Message Body
            </label>
            <textarea
              rows={4}
              placeholder="State the specifics, expected delay minutes, or alternative boarding instructions..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast to Users</span>
            </button>
          </div>
        </form>

        {/* Right Col: Recent Dispatches */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b pb-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-900 m-0">Recent Broadcast Log</h3>
          </div>

          <div className="space-y-2.5">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.notificationId} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{n.title}</span>
                  <span className="text-[9px] font-mono text-slate-400">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 m-0">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

