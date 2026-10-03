import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { useTracking } from '../../context/TrackingContext';
import { MessageSquareWarning, Plus, CheckCircle, Clock, ShieldCheck, Send } from 'lucide-react';

export default function ComplaintsPage() {
  const { complaints, submitComplaint } = useNotifications();
  const { currentUser, currentRole } = useAuth();
  const { buses } = useTracking();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    busNo: 'College Bus 01',
    category: 'Schedule & Punctuality',
    issue: ''
  });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.issue.trim()) return;

    submitComplaint({
      issue: formData.issue,
      category: formData.category,
      busNo: formData.busNo,
      routeId: currentUser?.assignedRouteId || 'R-101',
      userName: currentUser?.name,
      userRole: currentUser?.role,
      userId: currentUser?.userId
    });

    setFormData({
      busNo: 'College Bus 01',
      category: 'Schedule & Punctuality',
      issue: ''
    });
    setShowForm(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  // Filter complaints related to this user or role
  const myComplaints = complaints;

  return (
    <div className="space-y-4">
      {/* Header & New Complaint Button */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-900 m-0">Student & Parent Grievances</h3>
          <p className="text-[11px] text-slate-500 m-0">Submit feedback or route issues directly to Transport Office</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showForm ? 'Cancel' : 'New Complaint'}</span>
        </button>
      </div>

      {/* Success Banner */}
      {submittedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-2xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Grievance submitted successfully! The Transport Office has been notified.</span>
        </div>
      )}

      {/* Interactive Submission Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-2 border-b pb-2">
            <MessageSquareWarning className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs font-bold text-slate-900 m-0">File a Service Complaint</h4>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Select Bus
            </label>
            <select
              value={formData.busNo}
              onChange={(e) => setFormData({ ...formData, busNo: e.target.value })}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {buses.map((b) => (
                <option key={b.busId} value={b.busNo}>
                  {b.busNo} ({b.routeName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Issue Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Schedule & Punctuality">Schedule Delay & Punctuality</option>
              <option value="Vehicle Maintenance">Vehicle Maintenance & AC Issues</option>
              <option value="Driver Conduct">Driver Conduct & Safe Driving</option>
              <option value="Overcrowding">Bus Overcrowding / Seat Capacity</option>
              <option value="Route Deviation">Missed Stop / Route Deviation</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Describe Issue
            </label>
            <textarea
              rows={3}
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              placeholder="Provide specific details (time, location, what happened)..."
              required
              className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Complaint</span>
            </button>
          </div>
        </form>
      )}

      {/* Complaints List */}
      <div className="space-y-3">
        {myComplaints.map((c) => {
          const isResolved = c.status === 'Resolved';
          const isInProgress = c.status === 'In Progress';

          return (
            <div
              key={c.complaintId}
              className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200/80 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{c.complaintId}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    {c.busNo}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isResolved
                      ? 'bg-emerald-100 text-emerald-800'
                      : isInProgress
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Category: {c.category}
                </span>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">{c.issue}</p>
              </div>

              {/* Transport Admin Redressal Response */}
              {c.adminResolution && (
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-xs">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Transport Authority Resolution:</span>
                  </div>
                  <p className="text-[11px] text-slate-600 m-0">{c.adminResolution}</p>
                </div>
              )}

              <div className="text-[10px] text-slate-400 flex justify-between pt-1 border-t border-slate-100">
                <span>Submitted by: {c.userName} ({c.userRole})</span>
                <span>{c.submittedAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

