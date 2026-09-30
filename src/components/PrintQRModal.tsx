import React from 'react';
import { Printer, X, Calendar, MapPin, QrCode } from 'lucide-react';
import { EventItem } from '../types';

interface PrintQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | undefined;
}

export const PrintQRModal: React.FC<PrintQRModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  const formatDate = (datetimeStr: string) => {
    try {
      const dt = new Date(datetimeStr);
      return dt.toLocaleDateString('en-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return datetimeStr;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] overflow-y-auto transform transition-all flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Toolbar (screen only) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm">A4 Printable QR Code Signage Layout</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print to A4</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area Content */}
        <div id="printArea" className="p-8 sm:p-12 flex-1 flex flex-col items-center justify-center text-center bg-white space-y-6">
          {/* Header Branding & Event Details */}
          <div className="space-y-3 max-w-lg">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md mb-2">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                <line x1="16" y1="8" x2="2" y2="22" />
                <line x1="17.5" y1="15" x2="9" y2="15" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-widest font-bold text-blue-600">Digital Attendance Check-In</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {event.title}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{formatDate(event.datetime)}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>

          {/* High-Resolution Geometric QR Code Graphic */}
          <div className="p-5 bg-white border-4 border-slate-900 rounded-3xl shadow-xl flex flex-col items-center justify-center">
            <svg className="w-56 h-56" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="200" fill="white" />
              {/* Top Left Finder */}
              <rect x="15" y="15" width="50" height="50" rx="8" fill="#0f172a" />
              <rect x="23" y="23" width="34" height="34" rx="4" fill="white" />
              <rect x="31" y="31" width="18" height="18" rx="2" fill="#0f172a" />

              {/* Top Right Finder */}
              <rect x="135" y="15" width="50" height="50" rx="8" fill="#0f172a" />
              <rect x="143" y="23" width="34" height="34" rx="4" fill="white" />
              <rect x="151" y="31" width="18" height="18" rx="2" fill="#0f172a" />

              {/* Bottom Left Finder */}
              <rect x="15" y="135" width="50" height="50" rx="8" fill="#0f172a" />
              <rect x="23" y="143" width="34" height="34" rx="4" fill="white" />
              <rect x="31" y="151" width="18" height="18" rx="2" fill="#0f172a" />

              {/* Data Matrices */}
              <g fill="#1e293b">
                <rect x="75" y="20" width="10" height="10" />
                <rect x="95" y="20" width="10" height="10" />
                <rect x="115" y="20" width="10" height="10" />
                <rect x="75" y="40" width="10" height="10" />
                <rect x="85" y="50" width="10" height="10" />
                <rect x="105" y="45" width="15" height="10" />
                <rect x="75" y="75" width="10" height="10" />
                <rect x="95" y="75" width="10" height="10" />
                <rect x="115" y="75" width="10" height="10" />
                <rect x="135" y="75" width="10" height="10" />
                <rect x="155" y="75" width="10" height="10" />
                <rect x="20" y="75" width="10" height="10" />
                <rect x="40" y="75" width="10" height="10" />
                <rect x="20" y="95" width="10" height="10" />
                <rect x="40" y="95" width="15" height="10" />
                <rect x="75" y="95" width="10" height="10" />
                <rect x="95" y="105" width="10" height="10" />
                <rect x="115" y="95" width="10" height="10" />
                <rect x="145" y="105" width="10" height="10" />
                <rect x="165" y="95" width="10" height="10" />
                <rect x="75" y="125" width="10" height="10" />
                <rect x="95" y="135" width="15" height="10" />
                <rect x="125" y="125" width="10" height="10" />
                <rect x="145" y="135" width="10" height="10" />
                <rect x="165" y="125" width="15" height="10" />
                <rect x="75" y="155" width="10" height="10" />
                <rect x="105" y="155" width="10" height="10" />
                <rect x="125" y="165" width="10" height="10" />
                <rect x="145" y="155" width="10" height="10" />
                <rect x="165" y="165" width="10" height="10" />
              </g>

              {/* Center checkmark badge */}
              <rect x="85" y="85" width="30" height="30" rx="8" fill="#2563eb" />
              <path
                d="M93 100 L97 104 L107 94"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[10px] text-slate-400 mt-2 font-mono">attendease.app/scan/{event.id}</span>
          </div>

          {/* Call to Action Text */}
          <div className="space-y-1">
            <div className="inline-block px-5 py-2.5 bg-blue-50 border-2 border-blue-500 rounded-2xl text-blue-900 font-extrabold text-lg sm:text-xl tracking-wide shadow-sm">
              Sila Scan Di Sini Untuk Mendaftar Kehadiran
            </div>
            <p className="text-xs text-slate-500 pt-1">
              Buka kamera telefon pintar anda atau aplikasi QR reader untuk melengkapkan borang kehadiran.
            </p>
          </div>

          {/* Footer instructions */}
          <div className="pt-4 border-t border-slate-200 w-full text-[11px] text-slate-400 flex items-center justify-between">
            <span>AttendEase Attendance System v2.0</span>
            <span>Official Event Registration Sheet</span>
          </div>
        </div>
      </div>
    </div>
  );
};
