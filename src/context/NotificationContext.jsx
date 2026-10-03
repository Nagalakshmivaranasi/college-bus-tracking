import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_NOTIFICATIONS, INITIAL_COMPLAINTS } from '../data/mockData';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('cbts_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('cbts_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [activeToast, setActiveToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('cbts_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('cbts_complaints', JSON.stringify(complaints));
  }, [complaints]);

  // Send a new notification (supports Admin broadcast and system geofence alerts)
  const sendNotification = (notificationData) => {
    const newNotif = {
      notificationId: `NOTIF-${Date.now().toString().slice(-4)}`,
      title: notificationData.title || 'System Alert',
      message: notificationData.message,
      type: notificationData.type || 'Notice',
      priority: notificationData.priority || 'Normal',
      routeId: notificationData.routeId || null,
      time: 'Just now',
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Show top floating toast banner
    setActiveToast(newNotif);
    setTimeout(() => {
      setActiveToast((current) => (current?.notificationId === newNotif.notificationId ? null : current));
    }, 4500);

    return newNotif;
  };

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.notificationId === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Submit a complaint (Student / Parent role)
  const submitComplaint = ({ issue, category, busNo, routeId, userName, userRole, userId }) => {
    const newComplaint = {
      complaintId: `CMP-${Date.now().toString().slice(-4)}`,
      userId: userId || 'USR-ANON',
      userName: userName || 'Anonymous User',
      userRole: userRole || 'Student',
      busNo: busNo || 'College Bus 01',
      routeId: routeId || 'R-101',
      issue,
      category: category || 'General Inquiry',
      status: 'Pending',
      submittedAt: 'Just now',
      adminResolution: 'Awaiting transport office review.'
    };

    setComplaints((prev) => [newComplaint, ...prev]);

    // Also trigger confirmation alert
    sendNotification({
      title: 'Complaint Registered',
      message: `Your grievance #${newComplaint.complaintId} has been logged with Transport Dept.`,
      type: 'Support',
      priority: 'Normal'
    });

    return newComplaint;
  };

  // Resolve complaint (Admin role)
  const resolveComplaint = (complaintId, resolutionText, newStatus = 'Resolved') => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.complaintId === complaintId
          ? {
              ...c,
              status: newStatus,
              adminResolution: resolutionText || 'Issue investigated and addressed by transport staff.'
            }
          : c
      )
    );

    sendNotification({
      title: 'Grievance Update',
      message: `Complaint #${complaintId} status changed to "${newStatus}".`,
      type: 'Notice',
      priority: 'Normal'
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        complaints,
        unreadCount,
        activeToast,
        setActiveToast,
        sendNotification,
        markAsRead,
        markAllAsRead,
        clearAllNotifications,
        submitComplaint,
        resolveComplaint
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

