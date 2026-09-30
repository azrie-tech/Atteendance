/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Smartphone, LayoutDashboard, PenTool } from 'lucide-react';
import { EventItem, AttendeeRecord, ToastInfo } from './types';
import {
  getStoredEvents,
  saveStoredEvents,
  getStoredAttendance,
  saveStoredAttendance,
  exportAttendanceToCSV,
  STORAGE_KEY_AUTH,
  INITIAL_EVENTS,
  INITIAL_ATTENDEES
} from './utils/storage';
import { GuestView } from './components/GuestView';
import { AdminPortal } from './components/AdminPortal';
import { CreateEventModal } from './components/CreateEventModal';
import { PrintQRModal } from './components/PrintQRModal';
import { PrintAttendanceSheetModal } from './components/PrintAttendanceSheetModal';
import { SignatureModal } from './components/SignatureModal';
import { DeleteModal } from './components/DeleteModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currentView, setCurrentView] = useState<'guest' | 'admin'>('guest');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [attendees, setAttendees] = useState<AttendeeRecord[]>([]);
  const [activeEventId, setActiveEventId] = useState<string>('EVT-101');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Modals state
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isPrintQROpen, setIsPrintQROpen] = useState(false);
  const [isPrintSheetOpen, setIsPrintSheetOpen] = useState(false);
  const [signatureModal, setSignatureModal] = useState<{
    isOpen: boolean;
    url: string;
    name: string;
  }>({ isOpen: false, url: '', name: '' });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string;
    name: string;
  }>({ isOpen: false, id: '', name: '' });

  // Toast notifications
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Load from LocalStorage
  useEffect(() => {
    const loadedEvents = getStoredEvents();
    const loadedAttendance = getStoredAttendance();
    setEvents(loadedEvents);
    setAttendees(loadedAttendance);

    if (loadedEvents.length > 0) {
      setActiveEventId(loadedEvents[0].id);
    }

    if (typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    addToast('Admin session locked', 'info');
  };

  const handleNewRegistration = (newRecord: AttendeeRecord) => {
    const updated = [newRecord, ...attendees];
    setAttendees(updated);
    saveStoredAttendance(updated);
  };

  const handleCreateEvent = (newEvent: EventItem) => {
    const updated = [...events, newEvent];
    setEvents(updated);
    saveStoredEvents(updated);
    setActiveEventId(newEvent.id);
    addToast(`New event "${newEvent.title}" created`, 'success');
  };

  const handleDeleteRecord = () => {
    if (!deleteModal.id) return;
    const updated = attendees.filter((a) => a.id !== deleteModal.id);
    setAttendees(updated);
    saveStoredAttendance(updated);
    setDeleteModal({ isOpen: false, id: '', name: '' });
    addToast('Attendance record deleted', 'info');
  };

  const handleExportCSV = () => {
    const evt = events.find((e) => e.id === activeEventId);
    exportAttendanceToCSV(attendees, events, evt?.title);
    addToast(`Exported ${attendees.length} attendance records to CSV`, 'success');
  };

  const handleResetDemoData = () => {
    setEvents(INITIAL_EVENTS);
    setAttendees(INITIAL_ATTENDEES);
    saveStoredEvents(INITIAL_EVENTS);
    saveStoredAttendance(INITIAL_ATTENDEES);
    setActiveEventId(INITIAL_EVENTS[0].id);
    addToast('Reseeded sample events and attendee records', 'info');
  };

  const activeEventObj = events.find((e) => e.id === activeEventId) || events[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Top Global Simulation Bar / Mode Switcher */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & System Brand */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-inner font-bold text-lg">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                <span>AttendEase</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-normal border border-blue-400/30">
                  Stage 1 PRD v2.0
                </span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">Digital Attendance & QR Registration System</p>
            </div>
          </div>

          {/* View Switcher & Quick Navigation */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700 text-xs font-medium">
              <button
                onClick={() => setCurrentView('guest')}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'guest'
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Guest View</span>
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'admin'
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center text-xs text-slate-400 pl-2 border-l border-slate-700">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  isAdminAuthenticated ? 'bg-emerald-400' : 'bg-slate-500'
                }`}
              />
              <span>{isAdminAuthenticated ? 'Admin: Authenticated' : 'Admin: Locked'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {currentView === 'guest' ? (
          <GuestView
            events={events}
            activeEventId={activeEventId}
            onSelectEvent={setActiveEventId}
            onNewRegistration={handleNewRegistration}
            showToast={addToast}
          />
        ) : (
          <AdminPortal
            isAuthenticated={isAdminAuthenticated}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
            events={events}
            attendees={attendees}
            onOpenCreateEvent={() => setIsCreateEventOpen(true)}
            onOpenPrintQR={() => setIsPrintQROpen(true)}
            onOpenPrintSheet={() => setIsPrintSheetOpen(true)}
            onExportCSV={handleExportCSV}
            onViewSignature={(url, name) => setSignatureModal({ isOpen: true, url, name })}
            onRequestDelete={(id, name) => setDeleteModal({ isOpen: true, id, name })}
            onResetDemoData={handleResetDemoData}
            showToast={addToast}
          />
        )}
      </main>

      {/* Modals */}
      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onCreate={handleCreateEvent}
      />

      <PrintQRModal
        isOpen={isPrintQROpen}
        onClose={() => setIsPrintQROpen(false)}
        event={activeEventObj}
      />

      <PrintAttendanceSheetModal
        isOpen={isPrintSheetOpen}
        onClose={() => setIsPrintSheetOpen(false)}
        event={activeEventObj}
        attendees={attendees}
      />

      <SignatureModal
        isOpen={signatureModal.isOpen}
        onClose={() => setSignatureModal({ isOpen: false, url: '', name: '' })}
        signatureUrl={signatureModal.url}
        attendeeName={signatureModal.name}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: '', name: '' })}
        onConfirm={handleDeleteRecord}
        targetName={deleteModal.name}
        targetId={deleteModal.id}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} />
    </div>
  );
}
