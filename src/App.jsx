import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { TrackingProvider } from './context/TrackingContext';
import RoleSwitcherBar from './components/common/RoleSwitcherBar';
import ToastAlert from './components/common/ToastAlert';
import MobileFrame from './components/mobile/MobileFrame';
import MobileBottomNav from './components/mobile/MobileBottomNav';
import AdminLayout from './components/admin/AdminLayout';

// Student & Parent Screens
import StudentTrackingPage from './pages/student-parent/StudentTrackingPage';
import RouteSchedulePage from './pages/student-parent/RouteSchedulePage';
import NotificationsPage from './pages/student-parent/NotificationsPage';
import ComplaintsPage from './pages/student-parent/ComplaintsPage';
import StudentProfilePage from './pages/student-parent/StudentProfilePage';

// Driver Screen
import DriverConsolePage from './pages/driver/DriverConsolePage';

function MainAppContent() {
  const { currentRole, currentUser } = useAuth();

  // Mobile App active tab state
  const [mobileTab, setMobileTab] = useState(() => {
    return currentRole === 'driver' ? 'console' : 'tracking';
  });

  // Switch default mobile tab when role changes
  React.useEffect(() => {
    if (currentRole === 'driver') {
      setMobileTab('console');
    } else if (currentRole !== 'admin') {
      setMobileTab('tracking');
    }
  }, [currentRole]);

  // Admin View: Full Desktop Dashboard Portal
  if (currentRole === 'admin') {
    return <AdminLayout />;
  }

  // Student & Parent Views (rendered in Mobile Frame / Responsive view)
  const renderStudentParentContent = () => {
    switch (mobileTab) {
      case 'tracking':
        return <StudentTrackingPage />;
      case 'route':
        return <RouteSchedulePage />;
      case 'alerts':
        return <NotificationsPage />;
      case 'complaints':
        return <ComplaintsPage />;
      case 'profile':
        return <StudentProfilePage />;
      default:
        return <StudentTrackingPage />;
    }
  };

  // Driver View (rendered in Mobile Frame)
  const renderDriverContent = () => {
    switch (mobileTab) {
      case 'console':
        return <DriverConsolePage />;
      case 'stops':
        return <RouteSchedulePage />;
      case 'alerts':
        return <NotificationsPage />;
      case 'profile':
        return <StudentProfilePage />;
      default:
        return <DriverConsolePage />;
    }
  };

  const getScreenTitle = () => {
    if (currentRole === 'driver') {
      switch (mobileTab) {
        case 'console':
          return 'Driver Trip Cockpit';
        case 'stops':
          return 'Route Stops Checklist';
        case 'alerts':
          return 'Traffic & Route Alerts';
        case 'profile':
          return 'Driver Profile & License';
        default:
          return 'Driver Console';
      }
    } else {
      switch (mobileTab) {
        case 'tracking':
          return 'Live Bus Tracking';
        case 'route':
          return 'Route & Stops Timetable';
        case 'alerts':
          return 'Notifications & Alerts';
        case 'complaints':
          return 'Grievance Redressal';
        case 'profile':
          return currentRole === 'parent' ? 'Parent & Student Account' : 'Student Digital Pass';
        default:
          return 'College Bus Tracking';
      }
    }
  };

  const getScreenSubtitle = () => {
    if (currentRole === 'student') return `Welcome, ${currentUser?.name} (${currentUser?.studentId})`;
    if (currentRole === 'parent') return `Parent Portal: Tracking ${currentUser?.studentName}`;
    if (currentRole === 'driver') return `Bus Driver: ${currentUser?.name} (${currentUser?.licenseNo})`;
    return null;
  };

  return (
    <MobileFrame title={getScreenTitle()} subtitle={getScreenSubtitle()}>
      {currentRole === 'driver' ? renderDriverContent() : renderStudentParentContent()}
      <div className="pt-2">
        <MobileBottomNav activeTab={mobileTab} setActiveTab={setMobileTab} />
      </div>
    </MobileFrame>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <TrackingProvider>
        <AuthProvider>
          <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
            <RoleSwitcherBar />
            <ToastAlert />
            <div className="flex-1 flex flex-col">
              <MainAppContent />
            </div>
          </div>
        </AuthProvider>
      </TrackingProvider>
    </NotificationProvider>
  );
}

