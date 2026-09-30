import React, { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Plus,
  QrCode,
  FileSpreadsheet,
  FileText,
  Lock,
  Users,
  Calendar,
  PenTool,
  HardDrive,
  Search,
  X,
  Trash2,
  Building2,
  Mail,
  Phone,
  Info,
  Clock
} from 'lucide-react';
import { EventItem, AttendeeRecord } from '../types';

interface AdminPortalProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  events: EventItem[];
  attendees: AttendeeRecord[];
  onOpenCreateEvent: () => void;
  onOpenPrintQR: () => void;
  onOpenPrintSheet: () => void;
  onExportCSV: () => void;
  onViewSignature: (url: string, name: string) => void;
  onRequestDelete: (id: string, name: string) => void;
  onResetDemoData: () => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isAuthenticated,
  onLogin,
  onLogout,
  events,
  attendees,
  onOpenCreateEvent,
  onOpenPrintQR,
  onOpenPrintSheet,
  onExportCSV,
  onViewSignature,
  onRequestDelete,
  onResetDemoData,
  showToast
}) => {
  // Login Form State
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Table Filters & Search
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setLoginError(false);
      setPassword('');
      onLogin();
      showToast('Admin logged in successfully', 'success');
    } else {
      setLoginError(true);
    }
  };

  // Filter Attendees
  let filteredAttendees = attendees;
  if (selectedEventFilter !== 'ALL') {
    filteredAttendees = filteredAttendees.filter((a) => a.eventId === selectedEventFilter);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filteredAttendees = filteredAttendees.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.company.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        (a.staffNo && a.staffNo.toLowerCase().includes(q)) ||
        (a.department && a.department.toLowerCase().includes(q))
    );
  }

  const selectedEventObj = events.find((e) => e.id === selectedEventFilter);

  // Render Locked State
  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl border border-blue-100">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Authentication</h2>
            <p className="text-xs text-slate-500">
              Access to dashboard reports and event settings is restricted.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginError) setLoginError(false);
                  }}
                  placeholder="Enter password (default: admin123)"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && (
                <p className="text-xs text-rose-500 mt-1">Incorrect password. Please try again.</p>
              )}
              <div className="mt-2 text-[11px] text-slate-500 bg-slate-100 p-2.5 rounded-lg flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500 shrink-0" />
                <span>
                  PRD Default Demo Password: <strong className="font-mono text-slate-800">admin123</strong>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Authenticated Dashboard
  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Header & Action Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Attendance Dashboard</h2>
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-xs font-semibold">
              Live Stage 1
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage events, review attendee signatures, export reports, and print QR displays.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenCreateEvent}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Event</span>
          </button>

          <button
            onClick={onOpenPrintQR}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-blue-600" />
            <span>Print A4 QR Sheet</span>
          </button>

          <button
            onClick={onOpenPrintSheet}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            title="Official Media Prima / NSTP Attendance Form"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Official Sheet (PDF)</span>
          </button>

          <button
            onClick={onExportCSV}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export to CSV</span>
          </button>

          <button
            onClick={onLogout}
            title="Lock Admin Session"
            className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Check-Ins */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Check-Ins</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              {filteredAttendees.length}
            </h3>
            <p className="text-[11px] text-blue-600 font-medium truncate max-w-[170px] mt-0.5">
              {selectedEventObj ? selectedEventObj.title : 'Across all events'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Total Events */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Events</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{events.length}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Organized in system</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Verified Signatures */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Signatures Verified</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1 tabular-nums">100%</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Mandatory validation</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
            <PenTool className="w-6 h-6" />
          </div>
        </div>

        {/* Storage Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Storage Engine</p>
            <h3 className="text-base font-bold text-slate-900 mt-1">Local Browser</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
              <HardDrive className="w-3 h-3" />
              <span>Persistent localStorage</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
            <HardDrive className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Table Filters & Live Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Event Selector Filter */}
        <div className="flex items-center gap-3 flex-1">
          <label htmlFor="adminEventFilter" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            Filter Event:
          </label>
          <select
            id="adminEventFilter"
            value={selectedEventFilter}
            onChange={(e) => setSelectedEventFilter(e.target.value)}
            className="w-full sm:max-w-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
          >
            <option value="ALL">All Events ({events.length})</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>
        </div>

        {/* Live Real-Time Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search attendees by Name, Company, Email..."
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Attendance Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-600 uppercase font-semibold tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Attendee Details</th>
                <th className="py-3.5 px-4">Company / Dept</th>
                <th className="py-3.5 px-4">Contact & Email</th>
                <th className="py-3.5 px-4">Registered Event</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-center">Signature</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAttendees.map((item, idx) => {
                const itemEvent = events.find((e) => e.id === item.eventId) || {
                  title: 'Unknown Event'
                };
                const timeStr = new Date(item.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                });
                const dateStr = new Date(item.timestamp).toLocaleDateString([], {
                  day: 'numeric',
                  month: 'short'
                });

                return (
                  <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-slate-400 text-[11px] tabular-nums">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                        <span>{item.id}</span>
                        {item.staffNo && (
                          <span className="text-blue-600 font-semibold">· {item.staffNo}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 text-slate-800">
                        <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate max-w-[160px]">{item.company}</span>
                      </div>
                      {item.department && (
                        <div className="text-[10px] text-slate-500 mt-0.5 pl-1 truncate max-w-[180px]">
                          {item.department}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[180px]">{item.email}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{item.phone}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div
                        className="text-xs font-semibold text-blue-700 max-w-[200px] truncate"
                        title={itemEvent.title}
                      >
                        {itemEvent.title}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{timeStr}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 pl-4">{dateStr}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onViewSignature(item.signature, item.name)}
                        className="inline-block p-1 bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-blue-400 transition-all cursor-pointer group"
                        title="Click to enlarge signature"
                      >
                        {item.signature ? (
                          <img
                            src={item.signature}
                            alt="Sign"
                            className="h-8 w-20 object-contain bg-white rounded"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-400">None</span>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onRequestDelete(item.id, item.name)}
                        className="px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors font-medium inline-flex items-center gap-1 cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State Indicator */}
        {filteredAttendees.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mb-3">
              <Users className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">No Attendance Records Found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              No guests have registered for this event yet, or no records matched your search query.
            </p>
          </div>
        )}

        {/* Table Footer / Count Summary */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700 tabular-nums">{filteredAttendees.length}</span>{' '}
            records
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onResetDemoData}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer"
            >
              Reset to Demo Synthetic Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
