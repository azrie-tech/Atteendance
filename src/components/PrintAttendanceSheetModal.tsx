import React from 'react';
import { Printer, X, FileText } from 'lucide-react';
import { EventItem, AttendeeRecord } from '../types';

interface PrintAttendanceSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | undefined;
  attendees: AttendeeRecord[];
}

export const PrintAttendanceSheetModal: React.FC<PrintAttendanceSheetModalProps> = ({
  isOpen,
  onClose,
  event,
  attendees
}) => {
  if (!isOpen || !event) return null;

  const eventAttendees = attendees.filter((a) => a.eventId === event.id);

  // Generate at least 15 rows total matching the PDF template
  const totalRows = Math.max(15, eventAttendees.length + 3);
  const rows = Array.from({ length: totalRows }).map((_, index) => {
    return eventAttendees[index] || null;
  });

  const handlePrint = () => {
    window.print();
  };

  const formatEventDateTime = (dtStr: string) => {
    try {
      const dt = new Date(dtStr);
      const datePart = dt.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const timePart = dt.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const weekday = dt.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
      return `${datePart} @ ${timePart} (${weekday})`;
    } catch {
      return dtStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] overflow-y-auto transform transition-all flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Toolbar (screen only) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm">Official Attendance Sheet (PDF Template Format)</h3>
              <p className="text-[11px] text-slate-400">
                Matches the official Media Prima / NSTP corporate attendance template.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet Content - Exact replication of PDF template */}
        <div id="printAttendanceSheet" className="p-8 sm:p-12 bg-white text-black font-sans print:p-0 print:m-0">
          {/* Header Brand */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-[10px] font-bold">
                mp
              </div>
              <span className="font-bold text-sm tracking-tight text-slate-900 lowercase">
                {event.companyLogo || 'media prima'}
              </span>
            </div>
            <h2 className="text-base font-extrabold uppercase tracking-wide border-b-2 border-black pb-0.5">
              ATTENDANCE
            </h2>
          </div>

          {/* Meeting Metadata Boxed Grid */}
          <div className="border border-black mb-4 text-xs font-semibold">
            <div className="grid grid-cols-12 border-b border-black">
              <div className="col-span-3 sm:col-span-2 bg-slate-200 p-2 font-bold uppercase border-r border-black">
                MEETING
              </div>
              <div className="col-span-9 sm:col-span-10 p-2 uppercase font-bold text-slate-900">
                {event.title}
              </div>
            </div>

            <div className="grid grid-cols-12 border-b border-black">
              <div className="col-span-3 sm:col-span-2 bg-slate-200 p-2 font-bold uppercase border-r border-black">
                DATE/TIME
              </div>
              <div className="col-span-9 sm:col-span-10 p-2 uppercase font-medium">
                {formatEventDateTime(event.datetime)}
              </div>
            </div>

            <div className="grid grid-cols-12">
              <div className="col-span-3 sm:col-span-2 bg-slate-200 p-2 font-bold uppercase border-r border-black">
                VENUE
              </div>
              <div className="col-span-9 sm:col-span-10 p-2 uppercase font-medium">
                {event.venue}
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="border-t border-l border-black overflow-hidden">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-slate-200 font-extrabold text-black uppercase">
                  <th className="border-r border-b border-black py-2 px-1 text-center w-10">NO</th>
                  <th className="border-r border-b border-black py-2 px-3 text-left">NAME</th>
                  <th className="border-r border-b border-black py-2 px-3 text-left w-28">STAFF NO</th>
                  <th className="border-r border-b border-black py-2 px-3 text-left w-36">DEPT</th>
                  <th className="border-r border-b border-black py-2 px-3 text-left w-44">EMAIL</th>
                  <th className="border-r border-b border-black py-2 px-2 text-center w-28">SIGN</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((attendee, idx) => (
                  <tr key={idx} className="h-10">
                    <td className="border-r border-b border-black text-center font-bold px-1">
                      {idx + 1}
                    </td>
                    <td className="border-r border-b border-black px-3 font-semibold text-slate-900">
                      {attendee ? attendee.name : ''}
                    </td>
                    <td className="border-r border-b border-black px-3 font-mono text-[10px]">
                      {attendee ? attendee.staffNo || '-' : ''}
                    </td>
                    <td className="border-r border-b border-black px-3 text-[10px]">
                      {attendee ? attendee.department || attendee.company : ''}
                    </td>
                    <td className="border-r border-b border-black px-3 text-[10px]">
                      {attendee ? attendee.email : ''}
                    </td>
                    <td className="border-r border-b border-black p-1 text-center align-middle">
                      {attendee && attendee.signature ? (
                        <img
                          src={attendee.signature}
                          alt="Sign"
                          className="h-7 w-24 object-contain mx-auto"
                        />
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sheet Footer */}
          <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500">
            <span>Official Attendance Record · Verified via AttendEase</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
