import { EventItem, AttendeeRecord } from '../types';

export const STORAGE_KEY_EVENTS = 'attendease_events_v2';
export const STORAGE_KEY_ATTENDANCE = 'attendease_attendance_v2';
export const STORAGE_KEY_AUTH = 'attendease_admin_auth';

// Helper to draw realistic synthetic base64 signature images
export function generateSyntheticSignature(name: string, strokeColor = '#1e3a8a'): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 110;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 320, 110);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Flowing cursive curve signature
  ctx.moveTo(35, 65);
  ctx.bezierCurveTo(60, 20, 95, 85, 125, 45);
  ctx.bezierCurveTo(145, 20, 175, 80, 210, 40);
  ctx.bezierCurveTo(230, 25, 260, 60, 280, 50);

  // Underline flourish
  ctx.moveTo(45, 82);
  ctx.quadraticCurveTo(150, 92, 275, 75);
  ctx.stroke();

  return canvas.toDataURL('image/png');
}

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'EVT-101',
    title: 'Petronas Technology & Innovation Summit 2025',
    datetime: '2025-04-18T09:00',
    venue: 'Kuala Lumpur Convention Centre (KLCC), Hall 4',
    createdAt: '2025-03-01T08:00:00.000Z',
    companyLogo: 'PETRONAS'
  },
  {
    id: 'EVT-102',
    title: 'Procurement Process Awareness 2024 - NSTP',
    datetime: '2024-02-27T10:00',
    venue: 'Meeting Room, GCAS Dept, Level 1, Anjung Liku, Balai Berita Kuala Lumpur.',
    createdAt: '2024-02-01T08:00:00.000Z',
    companyLogo: 'media prima'
  },
  {
    id: 'EVT-103',
    title: 'National Digital Economy Board Roundtable',
    datetime: '2025-05-12T14:30',
    venue: 'Putrajaya Marriott Hotel, Grand Ballroom',
    createdAt: '2025-03-02T10:30:00.000Z',
    companyLogo: 'MDEC'
  }
];

export const INITIAL_ATTENDEES: AttendeeRecord[] = [
  {
    id: 'ATT-9001',
    eventId: 'EVT-101',
    name: 'Dato\' Dr. Azman Rahim',
    company: 'Malaysian Digital Economy Corp (MDEC)',
    email: 'azman.rahim@mdec.gov.my',
    phone: '+60 12-889 2314',
    staffNo: 'MD-8021',
    department: 'Digital Economy Council',
    timestamp: '2025-04-18T08:42:15.000Z',
    signature: generateSyntheticSignature('Azman', '#1e3a8a')
  },
  {
    id: 'ATT-9002',
    eventId: 'EVT-101',
    name: 'Sarah Tan Wei Ling',
    company: 'Grab Holdings Malaysia',
    email: 'sarah.tan@grab.com',
    phone: '+60 16-234 5590',
    staffNo: 'GH-4412',
    department: 'Regional Operations',
    timestamp: '2025-04-18T08:48:30.000Z',
    signature: generateSyntheticSignature('Sarah', '#047857')
  },
  {
    id: 'ATT-9003',
    eventId: 'EVT-102',
    name: 'Muhammad Haziq bin Zainal',
    company: 'Media Prima Berhad (NSTP)',
    email: 'haziq.zainal@mediaprima.com.my',
    phone: '+60 19-332 1087',
    staffNo: 'MPB-10892',
    department: 'Group Corporate Assurance & Security (GCAS)',
    timestamp: '2024-02-27T09:45:10.000Z',
    signature: generateSyntheticSignature('Haziq', '#b91c1c')
  },
  {
    id: 'ATT-9004',
    eventId: 'EVT-102',
    name: 'Nur Aisyah binti Kamaruddin',
    company: 'New Straits Times Press (M) Berhad',
    email: 'aisyah.k@nstp.com.my',
    phone: '+60 13-908 4421',
    staffNo: 'NSTP-3401',
    department: 'Finance & Procurement',
    timestamp: '2024-02-27T09:52:40.000Z',
    signature: generateSyntheticSignature('Aisyah', '#4338ca')
  },
  {
    id: 'ATT-9005',
    eventId: 'EVT-103',
    name: 'Kavitha Shanmugam',
    company: 'CyberSecurity Malaysia',
    email: 'kavitha.s@cybersecurity.my',
    phone: '+60 17-662 9012',
    staffNo: 'CSM-512',
    department: 'Threat Intelligence Div',
    timestamp: '2025-05-12T14:15:22.000Z',
    signature: generateSyntheticSignature('Kavitha', '#0f172a')
  }
];

export function getStoredEvents(): EventItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_EVENTS;
  }
}

export function saveStoredEvents(events: EventItem[]): void {
  localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(events));
}

export function getStoredAttendance(): AttendeeRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ATTENDANCE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(INITIAL_ATTENDEES));
      return INITIAL_ATTENDEES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ATTENDEES;
  }
}

export function saveStoredAttendance(records: AttendeeRecord[]): void {
  localStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(records));
}

export function exportAttendanceToCSV(records: AttendeeRecord[], events: EventItem[], eventFilterTitle?: string): void {
  if (records.length === 0) return;

  const headers = [
    'Record_ID',
    'Event_ID',
    'Event_Title',
    'Full_Name',
    'Company_Organization',
    'Staff_No',
    'Department',
    'Email',
    'Contact_Number',
    'Timestamp_ISO',
    'Signature_Verified'
  ];

  const rows = records.map((r) => {
    const evt = events.find((e) => e.id === r.eventId);
    const eventTitle = evt ? evt.title : 'N/A';
    return [
      r.id,
      r.eventId,
      `"${eventTitle.replace(/"/g, '""')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.company || '').replace(/"/g, '""')}"`,
      `"${(r.staffNo || '-').replace(/"/g, '""')}"`,
      `"${(r.department || '-').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      r.timestamp,
      r.signature ? 'YES' : 'NO'
    ].join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = eventFilterTitle
    ? `attendease_${eventFilterTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${dateStr}.csv`
    : `attendease_attendance_export_${dateStr}.csv`;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
