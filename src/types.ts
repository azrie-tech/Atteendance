export interface EventItem {
  id: string;
  title: string;
  datetime: string;
  venue: string;
  createdAt: string;
  companyLogo?: string;
}

export interface AttendeeRecord {
  id: string;
  eventId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  staffNo?: string;
  department?: string;
  timestamp: string;
  signature: string; // base64 data URI
}

export interface ToastInfo {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
