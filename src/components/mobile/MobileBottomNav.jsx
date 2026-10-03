import React from 'react';
import {
  Navigation,
  MapPin,
  Bell,
  MessageSquareWarning,
  User,
  Compass,
  CheckSquare
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const { currentRole } = useAuth();
  const { unreadCount } = useNotifications();

  // Navigation tabs for Student & Parent
  const studentParentTabs = [
    { id: 'tracking', label: 'Tracking', icon: Navigation },
    { id: 'route', label: 'Route & Stops', icon: MapPin },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadCount },
    { id: 'complaints', label: 'Complaints', icon: MessageSquareWarning },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Navigation tabs for Driver
  const driverTabs = [
    { id: 'console', label: 'Trip Console', icon: Compass },
    { id: 'stops', label: 'Stops Checklist', icon: CheckSquare },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const tabs = currentRole === 'driver' ? driverTabs : studentParentTabs;

  return (
    <nav aria-label="Mobile Navigation" className="bg-white border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around shrink-0 shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
              isActive
                ? 'text-blue-600 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.3]' : 'stroke-2'}`} />
              {tab.badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

