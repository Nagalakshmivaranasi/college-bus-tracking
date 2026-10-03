import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Roles: 'student' | 'parent' | 'driver' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('cbts_demo_role') || 'student';
  });

  // Viewport mode: 'mobile' (for mobile app simulator) or 'desktop' (for web portal)
  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('cbts_view_mode');
    if (saved) return saved;
    return currentRole === 'admin' ? 'desktop' : 'mobile';
  });

  const [users, setUsers] = useState(DEMO_USERS);

  useEffect(() => {
    localStorage.setItem('cbts_demo_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('cbts_view_mode', viewMode);
  }, [viewMode]);

  const switchRole = (role) => {
    if (users[role]) {
      setCurrentRole(role);
      // Auto-set recommended viewport mode based on UML actor device
      if (role === 'admin') {
        setViewMode('desktop');
      } else {
        setViewMode('mobile');
      }
    }
  };

  const updateProfile = (role, updatedFields) => {
    setUsers((prev) => ({
      ...prev,
      [role]: { ...prev[role], ...updatedFields }
    }));
  };

  const currentUser = users[currentRole] || users.student;

  return (
    <AuthContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        viewMode,
        setViewMode,
        updateProfile,
        users
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

