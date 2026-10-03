import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, CheckCheck, Clock, AlertTriangle, ShieldAlert, Sparkles, Filter } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, sendNotification, unreadCount } =
    useNotifications();

  const [filter, setFilter] = useState('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'eta') return n.type === 'ETA Alert' || n.type === 'Trip Update';
    if (filter === 'traffic') return n.type === 'Traffic Alert';
    return true;
  });

  const handleSimulateQuickAlert = () => {
    sendNotification({
      title: 'Geofence Proximity Alert',
      message: 'College Bus 01 has entered your pick-up perimeter. 4 minutes away!',
      type: 'ETA Alert',
      priority: 'High'
    });
  };

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 m-0">Notification Feed</h3>
            <p className="text-[11px] text-slate-400 m-0">{unreadCount} unread alert(s)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Test Trigger */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex bg-slate-100 p-1 rounded-xl text-[11px] font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg ${
              filter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('eta')}
            className={`px-2.5 py-1 rounded-lg ${
              filter === 'eta' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            ETA Alerts
          </button>
          <button
            onClick={() => setFilter('traffic')}
            className={`px-2.5 py-1 rounded-lg ${
              filter === 'traffic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            Traffic
          </button>
        </div>

        {/* Demo trigger button */}
        <button
          onClick={handleSimulateQuickAlert}
          className="text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200/60 flex items-center gap-1 transition-colors"
          title="Simulate receiving a geofence proximity notification"
        >
          <Sparkles className="w-3 h-3" />
          <span>Test Geofence Alert</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => {
            const isTraffic = item.type === 'Traffic Alert';
            const isHighPriority = item.priority === 'High';

            return (
              <div
                key={item.notificationId}
                onClick={() => markAsRead(item.notificationId)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  !item.read
                    ? 'bg-blue-50/50 border-blue-200 shadow-sm'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${
                        isTraffic
                          ? 'bg-amber-100 text-amber-600'
                          : isHighPriority
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {isTraffic ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900 m-0">{item.title}</h4>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

