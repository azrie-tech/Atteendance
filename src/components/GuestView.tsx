import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Building2,
  Mail,
  Phone,
  RotateCcw,
  Check,
  CheckCircle2,
  PenTool,
  ChevronDown
} from 'lucide-react';
import { EventItem, AttendeeRecord } from '../types';

interface GuestViewProps {
  events: EventItem[];
  activeEventId: string;
  onSelectEvent: (eventId: string) => void;
  onNewRegistration: (record: AttendeeRecord) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const GuestView: React.FC<GuestViewProps> = ({
  events,
  activeEventId,
  onSelectEvent,
  onNewRegistration,
  showToast
}) => {
  const currentEvent = events.find((e) => e.id === activeEventId) || events[0];

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [staffNo, setStaffNo] = useState('');
  const [department, setDepartment] = useState('');
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Canvas Signature state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Submission Success state
  const [submittedRecord, setSubmittedRecord] = useState<AttendeeRecord | null>(null);

  // Live Clock
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Setup Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resizeCanvas();
  }, [submittedRecord]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top
      };
    }
  };

  const handleStartDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setHasSignature(true);
    setErrors((prev) => ({ ...prev, signature: '' }));
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleStopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      ctx?.closePath();
    }
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!company.trim()) newErrors.company = 'Company or Organization is required.';
    
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Contact number is required.';
    } else if (phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    if (!hasSignature) {
      newErrors.signature = 'Signature is mandatory. Please draw inside the box.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors in the registration form', 'error');
      return;
    }

    const canvas = canvasRef.current;
    const signatureData = canvas ? canvas.toDataURL('image/png') : '';

    const newRecord: AttendeeRecord = {
      id: 'ATT-' + Date.now().toString().slice(-5),
      eventId: currentEvent ? currentEvent.id : '',
      name: fullName.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      staffNo: staffNo.trim() || undefined,
      department: department.trim() || undefined,
      timestamp: new Date().toISOString(),
      signature: signatureData
    };

    onNewRegistration(newRecord);
    setSubmittedRecord(newRecord);
    showToast('Registration submitted successfully!', 'success');
  };

  const handleRegisterAnother = () => {
    setSubmittedRecord(null);
    setFullName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setStaffNo('');
    setDepartment('');
    setHasSignature(false);
    setErrors({});
  };

  const formatEventDate = (datetimeStr: string) => {
    try {
      const dt = new Date(datetimeStr);
      return dt.toLocaleDateString('en-MY', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return datetimeStr;
    }
  };

  return (
    <div className="flex-1 py-8 px-4 flex items-center justify-center bg-slate-100/70">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col transition-all">
        {/* Header Banner & Active Event Badge */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

          {/* Top Status & Live Clock */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Check-In Active</span>
            </span>
            <span className="text-xs text-blue-100 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 opacity-80" />
              <span>{currentTime || 'Live'}</span>
            </span>
          </div>

          {/* Event Title */}
          <h2 className="text-xl font-bold tracking-tight text-white mb-2 leading-snug">
            {currentEvent ? currentEvent.title : 'Event Registration'}
          </h2>

          {/* Event Details */}
          <div className="space-y-1 text-xs text-blue-100 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-80 shrink-0" />
              <span>{currentEvent ? formatEventDate(currentEvent.datetime) : '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 opacity-80 shrink-0" />
              <span className="line-clamp-1">{currentEvent ? currentEvent.venue : '-'}</span>
            </div>
          </div>

          {/* Event Selector Dropdown */}
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
            <span className="text-blue-200 font-medium">Event Selector:</span>
            <div className="relative">
              <select
                value={activeEventId}
                onChange={(e) => onSelectEvent(e.target.value)}
                className="bg-blue-800/80 text-white border border-blue-400/40 rounded-lg pl-2.5 pr-7 py-1 text-xs outline-none focus:ring-2 focus:ring-white appearance-none cursor-pointer font-medium max-w-[210px] truncate"
              >
                {events.map((evt) => (
                  <option key={evt.id} value={evt.id} className="bg-slate-900 text-white">
                    {evt.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-blue-200 absolute right-2 top-2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        {!submittedRecord ? (
          <div className="p-6 space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-800">Guest Registration</h3>
              <p className="text-xs text-slate-500">Please provide your details and sign to confirm attendance.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  FULL NAME <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Nurul Hidayah"
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border ${
                      errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800`}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Company / Organization */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  COMPANY / ORGANIZATION <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      if (errors.company) setErrors({ ...errors, company: '' });
                    }}
                    placeholder="e.g. Petronas Digital Sdn Bhd"
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border ${
                      errors.company ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800`}
                  />
                </div>
                {errors.company && <p className="text-xs text-rose-500 mt-1">{errors.company}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  EMAIL ADDRESS <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="e.g. nurul@petronas.com.my"
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border ${
                      errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800`}
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  CONTACT NUMBER <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="e.g. +60 12-345 6789"
                    className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border ${
                      errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Optional Internal Corporate Meeting Fields Toggle */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 focus:outline-none"
                >
                  {showOptionalFields ? '− Hide Internal Meeting Details' : '+ Internal Staff Details (Staff No / Dept)'}
                </button>

                {showOptionalFields && (
                  <div className="grid grid-cols-2 gap-3 mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-1">
                        Staff No (Optional)
                      </label>
                      <input
                        type="text"
                        value={staffNo}
                        onChange={(e) => setStaffNo(e.target.value)}
                        placeholder="e.g. NSTP-1082"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="e.g. GCAS Dept"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Digital Signature Pad */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    DIGITAL SIGNATURE <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleClearSignature}
                    className="text-xs text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear Signature</span>
                  </button>
                </div>

                <div
                  className={`border-2 border-dashed ${
                    errors.signature ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  } rounded-2xl bg-slate-50/70 p-1 hover:border-blue-400 transition-colors relative`}
                >
                  <canvas
                    ref={canvasRef}
                    onMouseDown={handleStartDrawing}
                    onMouseMove={handleDraw}
                    onMouseUp={handleStopDrawing}
                    onMouseLeave={handleStopDrawing}
                    onTouchStart={handleStartDrawing}
                    onTouchMove={handleDraw}
                    onTouchEnd={handleStopDrawing}
                    className="w-full h-36 bg-white rounded-xl shadow-inner cursor-crosshair touch-none"
                  />
                  {!hasSignature && (
                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-300 select-none">
                      <PenTool className="w-6 h-6 mb-1 opacity-40 text-slate-400" />
                      <span className="text-xs text-slate-400 font-medium">Draw signature inside box</span>
                    </div>
                  )}
                </div>
                {errors.signature && <p className="text-xs text-rose-500">{errors.signature}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Submit Registration</span>
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Your data is stored securely in accordance with meeting regulations.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Successful State */
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-5 my-auto animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-inner animate-bounce">
              <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Submission Successful!</h3>
              <p className="text-sm text-slate-600 mt-1">Thank You for Registering.</p>
            </div>

            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 text-slate-700">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-400">Event</span>
                <span className="font-semibold text-slate-800 text-right truncate max-w-[200px]">
                  {currentEvent?.title}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-400">Registered Name</span>
                <span className="font-semibold text-slate-800">{submittedRecord.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-400">Company</span>
                <span className="font-semibold text-slate-800">{submittedRecord.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmation ID</span>
                <span className="font-mono text-blue-600 font-bold">{submittedRecord.id}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRegisterAnother}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-all shadow cursor-pointer"
            >
              Register Another Guest
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
