import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { MessageSquareWarning, CheckCircle2, Clock, Filter, ShieldCheck, Send } from 'lucide-react';

export default function ComplaintManagePage() {
  const { complaints, resolveComplaint } = useNotifications();

  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [resolutionText, setResolutionText] = useState('');
  const [newStatus, setNewStatus] = useState('Resolved');

  const filtered = complaints.filter((c) => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  const handleOpenResolve = (complaint) => {
    setSelectedComplaint(complaint);
    setResolutionText(complaint.adminResolution || '');
    setNewStatus(complaint.status === 'Resolved' ? 'Resolved' : 'Resolved');
  };

  const handleSaveResolution = (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    resolveComplaint(selectedComplaint.complaintId, resolutionText, newStatus);
    setSelectedComplaint(null);
    setResolutionText('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight m-0">
            Grievances & Complaint Redressal
          </h2>
          <p className="text-xs text-slate-500 m-0 mt-0.5">
            Implements UML Complaint.resolve() and student grievance management
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Filter:</span>
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold shadow-sm">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                statusFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({complaints.length})
            </button>
            <button
              onClick={() => setStatusFilter('Pending')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                statusFilter === 'Pending' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('In Progress')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                statusFilter === 'In Progress' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusFilter('Resolved')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                statusFilter === 'Resolved' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isResolved = item.status === 'Resolved';
          const isInProgress = item.status === 'In Progress';

          return (
            <div
              key={item.complaintId}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.complaintId}</span>
                    <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
                      {item.busNo}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-800'
                        : isInProgress
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Category: {item.category}
                </div>

                <p className="text-xs text-slate-700 font-medium leading-relaxed m-0 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  "{item.issue}"
                </p>

                {item.adminResolution && (
                  <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-xs">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 mb-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Resolution Statement:</span>
                    </div>
                    <p className="text-[11px] text-emerald-900 m-0">{item.adminResolution}</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>By: {item.userName} ({item.userRole})</span>
                <button
                  onClick={() => handleOpenResolve(item)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Update Redressal</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Redressal Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 m-0">Resolve Grievance</h3>
                <p className="text-xs text-slate-500 m-0">{selectedComplaint.complaintId} • {selectedComplaint.userName}</p>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveResolution} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="In Progress">In Progress (Under Review)</option>
                  <option value="Resolved">Resolved (Action Taken)</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Official Resolution Note
                </label>
                <textarea
                  rows={4}
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  placeholder="State the findings, corrective action taken, and feedback to the user..."
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Save & Notify User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

