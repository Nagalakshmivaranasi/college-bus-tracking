// College Bus Tracking System - Mock / Seed Data
// Based strictly on UML diagrams, Architecture schemas, and QA Testing documentation

export const DEMO_USERS = {
  student: {
    userId: 'USR-STU-01',
    studentId: 'STU-1042',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    role: 'Student',
    phone: '+91 98765 43210',
    assignedRouteId: 'R-101',
    designatedStopId: 'STOP-05', // Engineering Block
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    department: 'Computer Science & Engineering',
    semester: '6th Semester',
    busPassNo: 'BP-2025-0891'
  },
  parent: {
    userId: 'USR-PAR-01',
    parentId: 'PAR-5011',
    studentId: 'STU-1042',
    studentName: 'Aarav Sharma',
    name: 'Sunita Sharma',
    email: 'sunita.sharma@gmail.com',
    role: 'Parent',
    phone: '+91 98450 11223',
    assignedRouteId: 'R-101',
    designatedStopId: 'STOP-05',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    relation: 'Mother',
    emergencyContact: '+91 98450 99887'
  },
  driver: {
    userId: 'USR-DRV-01',
    driverId: 'DRV-201',
    name: 'Rajesh Kumar',
    email: 'rajesh.driver@college.edu',
    role: 'Driver',
    licenseNo: 'DL-09-2018-847291',
    phone: '+91 98112 34567',
    assignedBusId: 'BUS-01',
    assignedRouteId: 'R-101',
    experienceYears: 9,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 4.8
  },
  admin: {
    userId: 'USR-ADM-01',
    adminId: 'ADM-001',
    name: 'Dr. V. Ramanathan',
    email: 'transport.admin@college.edu',
    role: 'Admin',
    department: 'Campus Transport & Logistics Office',
    phone: '+91 94440 12345',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
  }
};

// Route R-101 with real coordinates and smooth waypoints
export const MOCK_ROUTES = [
  {
    routeId: 'R-101',
    name: 'Route R-101: North Campus Express',
    description: 'City Central Terminal to College Main Campus via Metro Station & Residential Colony',
    totalDistanceKm: 18.5,
    estimatedDurationMinutes: 45,
    assignedBusId: 'BUS-01',
    activeColor: '#2563eb',
    stops: [
      {
        stopId: 'STOP-01',
        name: 'City Central Terminal',
        landmark: 'Platform 3, Central Bus Depot',
        latitude: 17.3850,
        longitude: 78.4867,
        scheduledTime: '07:30 AM',
        sequence: 1
      },
      {
        stopId: 'STOP-02',
        name: 'Metro Station Junction',
        landmark: 'Under Metro Pillar #142',
        latitude: 17.4010,
        longitude: 78.4980,
        scheduledTime: '07:45 AM',
        sequence: 2
      },
      {
        stopId: 'STOP-03',
        name: 'Residential Colony Circle',
        landmark: 'Opposite Community Park',
        latitude: 17.4220,
        longitude: 78.5150,
        scheduledTime: '08:00 AM',
        sequence: 3
      },
      {
        stopId: 'STOP-04',
        name: 'Library Cross Road',
        landmark: 'Near City Public Library',
        latitude: 17.4430,
        longitude: 78.5320,
        scheduledTime: '08:15 AM',
        sequence: 4
      },
      {
        stopId: 'STOP-05',
        name: 'Engineering Block (Campus)',
        landmark: 'Main Gate & Academic Complex',
        latitude: 17.4650,
        longitude: 78.5500,
        scheduledTime: '08:30 AM',
        sequence: 5
      }
    ],
    // High-resolution waypoints for smooth bus simulation along the journey
    waypoints: [
      [17.3850, 78.4867], // Stop 1
      [17.3890, 78.4895],
      [17.3940, 78.4930],
      [17.4010, 78.4980], // Stop 2
      [17.4070, 78.5030],
      [17.4140, 78.5090],
      [17.4220, 78.5150], // Stop 3
      [17.4290, 78.5200],
      [17.4360, 78.5260],
      [17.4430, 78.5320], // Stop 4
      [17.4500, 78.5380],
      [17.4570, 78.5440],
      [17.4650, 78.5500]  // Stop 5 (Campus)
    ]
  },
  {
    routeId: 'R-102',
    name: 'Route R-102: South Corridor Line',
    description: 'South Railway Junction to College South Gate',
    totalDistanceKm: 14.2,
    estimatedDurationMinutes: 38,
    assignedBusId: 'BUS-07',
    activeColor: '#10b981',
    stops: [
      {
        stopId: 'STOP-201',
        name: 'South Bus Interchange',
        landmark: 'Near Ticket Counter',
        latitude: 17.3620,
        longitude: 78.4720,
        scheduledTime: '07:40 AM',
        sequence: 1
      },
      {
        stopId: 'STOP-202',
        name: 'Tech Park Circle',
        landmark: 'Gate 2, Cyber Towers',
        latitude: 17.3820,
        longitude: 78.4900,
        scheduledTime: '07:55 AM',
        sequence: 2
      },
      {
        stopId: 'STOP-203',
        name: 'Hostel Sector 4',
        landmark: 'Students Residence Complex',
        latitude: 17.4150,
        longitude: 78.5100,
        scheduledTime: '08:10 AM',
        sequence: 3
      },
      {
        stopId: 'STOP-204',
        name: 'Sports Complex Gate',
        landmark: 'Stadium West Entry',
        latitude: 17.4450,
        longitude: 78.5350,
        scheduledTime: '08:25 AM',
        sequence: 4
      }
    ],
    waypoints: [
      [17.3620, 78.4720],
      [17.3710, 78.4810],
      [17.3820, 78.4900],
      [17.3990, 78.5000],
      [17.4150, 78.5100],
      [17.4300, 78.5230],
      [17.4450, 78.5350]
    ]
  },
  {
    routeId: 'R-103',
    name: 'Route R-103: East Suburb Shuttle',
    description: 'Eastern Suburbs to Main Administrative Block',
    totalDistanceKm: 16.0,
    estimatedDurationMinutes: 40,
    assignedBusId: 'BUS-12',
    activeColor: '#f59e0b',
    stops: [
      { stopId: 'STOP-301', name: 'Railway Gate East', landmark: 'Gate 1', latitude: 17.4100, longitude: 78.5600, scheduledTime: '07:35 AM', sequence: 1 },
      { stopId: 'STOP-302', name: 'Market Square', landmark: 'Clock Tower', latitude: 17.4300, longitude: 78.5550, scheduledTime: '07:50 AM', sequence: 2 },
      { stopId: 'STOP-303', name: 'Greenwood Avenue', landmark: 'School Junction', latitude: 17.4500, longitude: 78.5520, scheduledTime: '08:05 AM', sequence: 3 },
      { stopId: 'STOP-304', name: 'College East Gate', landmark: 'Department of Science', latitude: 17.4650, longitude: 78.5500, scheduledTime: '08:20 AM', sequence: 4 }
    ],
    waypoints: [
      [17.4100, 78.5600],
      [17.4200, 78.5580],
      [17.4300, 78.5550],
      [17.4400, 78.5530],
      [17.4500, 78.5520],
      [17.4650, 78.5500]
    ]
  }
];

// Initial Bus fleet
export const INITIAL_BUSES = [
  {
    busId: 'BUS-01',
    busNo: 'College Bus 01',
    regNumber: 'AP 09 TY 2041',
    routeId: 'R-101',
    routeName: 'Route R-101: North Campus Express',
    driverId: 'DRV-201',
    driverName: 'Rajesh Kumar',
    driverPhone: '+91 98112 34567',
    status: 'On Route', // 'On Route', 'Delayed', 'At Depot', 'Maintenance'
    capacity: 45,
    occupiedSeats: 38,
    speedKmH: 34,
    fuelLevel: 78,
    lastMaintenance: '2025-04-12',
    currentLocation: {
      latitude: 17.4220,
      longitude: 78.5150,
      timestamp: new Date().toISOString()
    }
  },
  {
    busId: 'BUS-07',
    busNo: 'College Bus 07',
    regNumber: 'AP 09 TY 2047',
    routeId: 'R-102',
    routeName: 'Route R-102: South Corridor Line',
    driverId: 'DRV-202',
    driverName: 'Mahesh Singh',
    driverPhone: '+91 98223 45678',
    status: 'On Route',
    capacity: 50,
    occupiedSeats: 44,
    speedKmH: 28,
    fuelLevel: 65,
    lastMaintenance: '2025-04-18',
    currentLocation: {
      latitude: 17.3990,
      longitude: 78.5000,
      timestamp: new Date().toISOString()
    }
  },
  {
    busId: 'BUS-12',
    busNo: 'College Bus 12',
    regNumber: 'AP 09 TY 2052',
    routeId: 'R-103',
    routeName: 'Route R-103: East Suburb Shuttle',
    driverId: 'DRV-203',
    driverName: 'K. Ramesh',
    driverPhone: '+91 98334 56789',
    status: 'At Depot',
    capacity: 45,
    occupiedSeats: 0,
    speedKmH: 0,
    fuelLevel: 92,
    lastMaintenance: '2025-04-25',
    currentLocation: {
      latitude: 17.4100,
      longitude: 78.5600,
      timestamp: new Date().toISOString()
    }
  },
  {
    busId: 'BUS-18',
    busNo: 'College Bus 18',
    regNumber: 'AP 09 TY 2068',
    routeId: 'R-101',
    routeName: 'Route R-101: North Campus (Relief)',
    driverId: 'DRV-204',
    driverName: 'P. Swamy',
    driverPhone: '+91 98445 67890',
    status: 'Delayed',
    capacity: 52,
    occupiedSeats: 48,
    speedKmH: 14,
    fuelLevel: 54,
    lastMaintenance: '2025-03-30',
    currentLocation: {
      latitude: 17.4010,
      longitude: 78.4980,
      timestamp: new Date().toISOString()
    }
  },
  {
    busId: 'BUS-24',
    busNo: 'College Bus 24',
    regNumber: 'AP 09 TY 2074',
    routeId: 'R-102',
    routeName: 'Reserve Fleet',
    driverId: 'DRV-205',
    driverName: 'S. Naidu',
    driverPhone: '+91 98556 78901',
    status: 'Maintenance',
    capacity: 40,
    occupiedSeats: 0,
    speedKmH: 0,
    fuelLevel: 40,
    lastMaintenance: 'In Service',
    currentLocation: {
      latitude: 17.4650,
      longitude: 78.5500,
      timestamp: new Date().toISOString()
    }
  }
];

// Initial Drivers List
export const INITIAL_DRIVERS = [
  {
    driverId: 'DRV-201',
    name: 'Rajesh Kumar',
    phone: '+91 98112 34567',
    licenseNo: 'DL-09-2018-847291',
    assignedBus: 'College Bus 01',
    assignedRoute: 'Route R-101',
    status: 'Active Trip',
    rating: 4.8,
    joinedDate: '2021-08-15'
  },
  {
    driverId: 'DRV-202',
    name: 'Mahesh Singh',
    phone: '+91 98223 45678',
    licenseNo: 'DL-09-2019-338291',
    assignedBus: 'College Bus 07',
    assignedRoute: 'Route R-102',
    status: 'Active Trip',
    rating: 4.6,
    joinedDate: '2022-01-10'
  },
  {
    driverId: 'DRV-203',
    name: 'K. Ramesh',
    phone: '+91 98334 56789',
    licenseNo: 'DL-09-2017-991823',
    assignedBus: 'College Bus 12',
    assignedRoute: 'Route R-103',
    status: 'Available',
    rating: 4.9,
    joinedDate: '2020-03-01'
  },
  {
    driverId: 'DRV-204',
    name: 'P. Swamy',
    phone: '+91 98445 67890',
    licenseNo: 'DL-09-2020-449102',
    assignedBus: 'College Bus 18',
    assignedRoute: 'Route R-101',
    status: 'Active Trip (Delayed)',
    rating: 4.4,
    joinedDate: '2023-06-20'
  },
  {
    driverId: 'DRV-205',
    name: 'S. Naidu',
    phone: '+91 98556 78901',
    licenseNo: 'DL-09-2016-118823',
    assignedBus: 'College Bus 24',
    assignedRoute: 'Reserve Fleet',
    status: 'Off Duty',
    rating: 4.7,
    joinedDate: '2019-11-12'
  }
];

// Initial Trip History records
export const INITIAL_TRIPS = [
  {
    tripId: 'TRP-1092',
    busId: 'BUS-01',
    busNo: 'College Bus 01',
    routeId: 'R-101',
    routeName: 'Route R-101: North Campus Express',
    driverName: 'Rajesh Kumar',
    date: 'Today',
    startTime: '07:30 AM',
    endTime: 'In Progress',
    status: 'Active',
    totalStops: 5,
    currentStopIndex: 2,
    passengersBoarded: 38
  },
  {
    tripId: 'TRP-1090',
    busId: 'BUS-01',
    busNo: 'College Bus 01',
    routeId: 'R-101',
    routeName: 'Route R-101: North Campus Express',
    driverName: 'Rajesh Kumar',
    date: 'Yesterday',
    startTime: '07:30 AM',
    endTime: '08:26 AM',
    status: 'Completed',
    totalStops: 5,
    currentStopIndex: 5,
    passengersBoarded: 42
  },
  {
    tripId: 'TRP-1088',
    busId: 'BUS-01',
    busNo: 'College Bus 01',
    routeId: 'R-101',
    routeName: 'Route R-101: North Campus Express',
    driverName: 'Rajesh Kumar',
    date: '28 Apr 2025',
    startTime: '07:32 AM',
    endTime: '08:29 AM',
    status: 'Completed',
    totalStops: 5,
    currentStopIndex: 5,
    passengersBoarded: 40
  },
  {
    tripId: 'TRP-1085',
    busId: 'BUS-07',
    busNo: 'College Bus 07',
    routeId: 'R-102',
    routeName: 'Route R-102: South Corridor Line',
    driverName: 'Mahesh Singh',
    date: 'Yesterday',
    startTime: '07:40 AM',
    endTime: '08:35 AM',
    status: 'Completed',
    totalStops: 4,
    currentStopIndex: 4,
    passengersBoarded: 44
  }
];

// Seed Complaints (as per UML Complaint class)
export const INITIAL_COMPLAINTS = [
  {
    complaintId: 'CMP-2025-01',
    userId: 'USR-STU-01',
    userName: 'Aarav Sharma',
    userRole: 'Student',
    busNo: 'College Bus 01',
    routeId: 'R-101',
    issue: 'Air conditioning unit was malfunctioning during morning route commute.',
    category: 'Vehicle Maintenance',
    status: 'In Progress', // 'Pending', 'In Progress', 'Resolved'
    submittedAt: 'Today, 08:35 AM',
    adminResolution: 'Technician team notified to inspect coolant levels during evening depot halt.'
  },
  {
    complaintId: 'CMP-2025-02',
    userId: 'USR-PAR-01',
    userName: 'Sunita Sharma',
    userRole: 'Parent',
    busNo: 'College Bus 01',
    routeId: 'R-101',
    issue: 'Bus arrival delayed by 15 mins at Metro Station without prior notification.',
    category: 'Schedule & Punctuality',
    status: 'Resolved',
    submittedAt: 'Yesterday, 09:10 AM',
    adminResolution: 'Congestion caused by pipeline repairs near junction. Drivers instructed to trigger traffic delay alert proactively.'
  },
  {
    complaintId: 'CMP-2025-03',
    userId: 'USR-STU-02',
    userName: 'Priya Reddy',
    userRole: 'Student',
    busNo: 'College Bus 07',
    routeId: 'R-102',
    issue: 'Driver skipped stopping at Tech Park Circle shelter despite students waiting.',
    category: 'Driver Conduct',
    status: 'Pending',
    submittedAt: 'Yesterday, 04:45 PM',
    adminResolution: 'Awaiting driver statement.'
  }
];

// Initial Notifications (as per UML Notification class)
export const INITIAL_NOTIFICATIONS = [
  {
    notificationId: 'NOTIF-01',
    title: 'Trip Started',
    message: 'College Bus 01 has departed City Central Terminal for Route R-101.',
    type: 'Trip Update',
    time: '20 mins ago',
    timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    read: false,
    priority: 'Normal'
  },
  {
    notificationId: 'NOTIF-02',
    title: 'Approaching Your Stop',
    message: 'Bus College 01 is 2 stops away from Engineering Block. Estimated arrival in 8 mins.',
    type: 'ETA Alert',
    time: '3 mins ago',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    read: false,
    priority: 'High'
  },
  {
    notificationId: 'NOTIF-03',
    title: 'Traffic Advisory',
    message: 'Heavy traffic reported near Metro Station Junction. Slight delay expected for Route R-101.',
    type: 'Traffic Alert',
    time: '15 mins ago',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    read: true,
    priority: 'Warning'
  },
  {
    notificationId: 'NOTIF-04',
    title: 'Scheduled Maintenance Notice',
    message: 'College Bus 24 is undergoing routine safety inspection. Route R-102 running on regular backup.',
    type: 'System Broadcast',
    time: '2 hours ago',
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    read: true,
    priority: 'Normal'
  }
];

// QA Testing Report Reference Data (from media_1790960248884.png)
export const QA_REPORT_DATA = {
  version: '1.0.0',
  startDate: '02 May 2025',
  endDate: '16 May 2025',
  testDuration: '15 Days',
  releaseDate: '17 May 2025',
  summary: {
    totalTestCases: 156,
    executed: 156,
    passed: 142,
    failed: 10,
    blocked: 4,
    passPercentage: '91.03%'
  },
  modules: [
    { name: 'User Management', total: 18, passed: 17, failed: 1, blocked: 0, passPct: '94.44%' },
    { name: 'Authentication', total: 12, passed: 11, failed: 1, blocked: 0, passPct: '91.67%' },
    { name: 'Bus Management', total: 16, passed: 15, failed: 1, blocked: 0, passPct: '93.75%' },
    { name: 'Route & Stop Management', total: 20, passed: 18, failed: 2, blocked: 0, passPct: '90.00%' },
    { name: 'Live Tracking', total: 25, passed: 23, failed: 2, blocked: 0, passPct: '92.00%' },
    { name: 'ETA Calculation', total: 15, passed: 14, failed: 1, blocked: 0, passPct: '93.33%' },
    { name: 'Notifications', total: 12, passed: 10, failed: 1, blocked: 1, passPct: '83.33%' },
    { name: 'Reports & Analytics', total: 10, passed: 9, failed: 1, blocked: 0, passPct: '90.00%' },
    { name: 'Complaint Management', total: 12, passed: 11, failed: 1, blocked: 0, passPct: '91.67%' },
    { name: 'System & Settings', total: 16, passed: 14, failed: 2, blocked: 0, passPct: '87.50%' }
  ],
  environment: {
    os: 'Windows 11',
    browser: 'Chrome 124',
    mobileDevice: 'Android 13',
    backend: 'Node.js, Express.js',
    database: 'MongoDB Atlas',
    cloudServices: 'Firebase (Auth, FCM, Storage)',
    apiTestingTool: 'Postman',
    loadTestingTool: 'JMeter'
  },
  defects: {
    critical: { open: 0, closed: 2, total: 2 },
    major: { open: 2, closed: 6, total: 8 },
    minor: { open: 1, closed: 3, total: 4 },
    totalOpen: 3,
    totalClosed: 11,
    grandTotal: 14
  }
};

