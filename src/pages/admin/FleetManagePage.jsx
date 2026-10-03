import React, { useState } from 'react';
import { useTracking } from '../../context/TrackingContext';
import { Bus, Plus, Search, Filter, Edit, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function FleetManagePage() {
  const { buses, routes, drivers, addBus, updateBus, deleteBus } = useTracking();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBus, setEditingBus] = useState(null);

  const [newBusData, setNewBusData] = useState({
    busNo: '',
    regNumber: '',
    routeId: 'R-101',
    driverId: 'DRV-201',
    capacity: 45,
    status: 'At Depot'
  });

  const filteredBuses = buses.filter((b) => {
    const matchesSearch =
      b.busNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newBusData.busNo || !newBusData.regNumber) return;

    addBus(newBusData);
    setShowAddModal(false);
    setNewBusData({
      busNo: '',
      regNumber: '',
      routeId: 'R-101',
      driverId: 'DRV-201',
      capacity: 45,
      status: 'At Depot'
    });
  };

  const handleStatusChange = (busId, newStatus) => {
    updateBus(busId, { status: newStatus });
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight m-0">Bus Fleet Management</h2>
          <p className="text-xs text-slate-500 m-0 mt-0.5">
            Register vehicles, manage driver assignments, and inspect telemetry status
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Bus</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search bus number, license plate, driver..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All Statuses ({buses.length})</option>
            <option value="On Route">On Route</option>
            <option value="Delayed">Delayed</option>
            <option value="At Depot">At Depot</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Fleet Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Bus Identifier</th>
                <th className="py-3 px-4">Registration</th>
                <th className="py-3 px-4">Assigned Route</th>
                <th className="py-3 px-4">Driver</th>
                <th className="py-3 px-4">Capacity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBuses.map((bus) => (
                <tr key={bus.busId} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      🚌
                    </div>
                    <span>{bus.busNo}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-600">{bus.regNumber}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{bus.routeName}</td>
                  <td className="py-3 px-4 text-slate-700">
                    <span className="font-semibold block">{bus.driverName}</span>
                    <span className="text-[10px] text-slate-400">{bus.driverPhone}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="font-semibold text-slate-900">{bus.occupiedSeats}</span> / {bus.capacity} seats
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={bus.status}
                      onChange={(e) => handleStatusChange(bus.busId, e.target.value)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-full border focus:outline-none ${
                        bus.status === 'Delayed'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : bus.status === 'On Route'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : bus.status === 'Maintenance'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      <option value="On Route">On Route</option>
                      <option value="Delayed">Delayed</option>
                      <option value="At Depot">At Depot</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => deleteBus(bus.busId)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove bus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Bus Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 m-0">Add Bus to Fleet</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Bus Name / Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. College Bus 31"
                  required
                  value={newBusData.busNo}
                  onChange={(e) => setNewBusData({ ...newBusData, busNo: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. AP 09 TY 2099"
                  required
                  value={newBusData.regNumber}
                  onChange={(e) => setNewBusData({ ...newBusData, regNumber: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Route Assignment
                  </label>
                  <select
                    value={newBusData.routeId}
                    onChange={(e) => setNewBusData({ ...newBusData, routeId: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {routes.map((r) => (
                      <option key={r.routeId} value={r.routeId}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Driver
                  </label>
                  <select
                    value={newBusData.driverId}
                    onChange={(e) => setNewBusData({ ...newBusData, driverId: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {drivers.map((d) => (
                      <option key={d.driverId} value={d.driverId}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Seating Capacity
                  </label>
                  <input
                    type="number"
                    value={newBusData.capacity}
                    onChange={(e) => setNewBusData({ ...newBusData, capacity: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newBusData.status}
                    onChange={(e) => setNewBusData({ ...newBusData, status: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="At Depot">At Depot</option>
                    <option value="On Route">On Route</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm"
                >
                  Confirm & Save Bus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

