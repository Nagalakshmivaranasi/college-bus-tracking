import React from 'react';
import { QA_REPORT_DATA } from '../../data/mockData';
import { CheckCircle2, XCircle, AlertCircle, FileCheck2, Server, Smartphone, Laptop } from 'lucide-react';

export default function TestingReferencePage() {
  const { summary, modules, environment, defects } = QA_REPORT_DATA;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-3xl shadow-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold m-0 tracking-tight">System QA & Verification Audit Report</h2>
            <span className="text-[10px] bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 rounded-full font-bold">
              v{QA_REPORT_DATA.version}
            </span>
          </div>
          <p className="text-xs text-slate-400 m-0 mt-1">
            Secondary verification reference directly matching project testing documentation
          </p>
        </div>

        <div className="text-right text-xs text-slate-300">
          <div>Testing Window: <span className="font-semibold text-white">{QA_REPORT_DATA.startDate} - {QA_REPORT_DATA.endDate}</span></div>
          <div className="text-[11px] text-emerald-400 font-bold mt-0.5">Overall Pass Rate: {summary.passPercentage}</div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Test Cases</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{summary.totalTestCases}</div>
          <span className="text-[11px] text-slate-500 font-semibold block mt-1">100% Executed</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passed</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">{summary.passed}</div>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">{summary.passPercentage} Success</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Failed</span>
          <div className="text-3xl font-extrabold text-rose-600 mt-2">{summary.failed}</div>
          <span className="text-[11px] text-rose-500 font-semibold block mt-1">6.41% Defects</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Blocked</span>
          <div className="text-3xl font-extrabold text-amber-500 mt-2">{summary.blocked}</div>
          <span className="text-[11px] text-amber-600 font-semibold block mt-1">2.56% Dependency</span>
        </div>
      </div>

      {/* Module Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 m-0">Test Case Execution Breakdown by Module</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-3">Module Name</th>
                <th className="py-2.5 px-3">Total Cases</th>
                <th className="py-2.5 px-3 text-emerald-600">Passed</th>
                <th className="py-2.5 px-3 text-rose-600">Failed</th>
                <th className="py-2.5 px-3 text-amber-600">Blocked</th>
                <th className="py-2.5 px-3 text-right">Pass %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modules.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-800">{m.name}</td>
                  <td className="py-2.5 px-3 text-slate-600 font-semibold">{m.total}</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">{m.passed}</td>
                  <td className="py-2.5 px-3 text-rose-600 font-semibold">{m.failed}</td>
                  <td className="py-2.5 px-3 text-amber-600 font-semibold">{m.blocked}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">{m.passPct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Environment & Defects Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[11px]">
            Audited Test Environment
          </h4>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex justify-between"><span>Operating System:</span><span className="font-semibold text-slate-800">{environment.os}</span></div>
            <div className="flex justify-between"><span>Browser Client:</span><span className="font-semibold text-slate-800">{environment.browser}</span></div>
            <div className="flex justify-between"><span>Mobile Device:</span><span className="font-semibold text-slate-800">{environment.mobileDevice}</span></div>
            <div className="flex justify-between"><span>Backend & API:</span><span className="font-semibold text-slate-800">{environment.backend}</span></div>
            <div className="flex justify-between"><span>Database:</span><span className="font-semibold text-slate-800">{environment.database}</span></div>
            <div className="flex justify-between"><span>Cloud Services:</span><span className="font-semibold text-slate-800">{environment.cloudServices}</span></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[11px]">
            Defect Closure Summary
          </h4>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span>Critical Severity:</span>
              <span className="font-semibold text-slate-800">{defects.critical.closed} closed / {defects.critical.total} total</span>
            </div>
            <div className="flex justify-between">
              <span>Major Severity:</span>
              <span className="font-semibold text-slate-800">{defects.major.closed} closed / {defects.major.total} total</span>
            </div>
            <div className="flex justify-between">
              <span>Minor Severity:</span>
              <span className="font-semibold text-slate-800">{defects.minor.closed} closed / {defects.minor.total} total</span>
            </div>
            <div className="pt-2 border-t flex justify-between font-bold text-emerald-600">
              <span>Total Resolved Defect Count:</span>
              <span>{defects.totalClosed} / {defects.grandTotal} (78.6% closed)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

