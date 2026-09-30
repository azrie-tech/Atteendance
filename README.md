# AttendEase - Digital Attendance & QR Registration System

[![Stage](https://img.shields.io/badge/PRD-Stage%201%20v2.0-blue.svg)](#)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg?logo=tailwindcss)](#)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg?logo=vite)](#)

**AttendEase** is a digital attendance check-in and QR registration system designed for enterprise conferences, summits, and corporate board meetings. It replaces paper sign-in sheets with a touch-friendly mobile registration flow, cryptographic digital signature capture, administrative management dashboard, and print-ready compliance documents.

---

## 🌟 Key Features

### 1. 📱 Mobile-First Guest Registration
- **Active Event Banner**: Live time counter, pulsing check-in status, event date, and venue details.
- **Dynamic Event Selector**: Switch between events or meetings directly from the guest view.
- **Form Validation**: Strict client-side validation for Full Name, Organization/Company, Email, and Phone Number.
- **Internal Staff Details (Optional)**: Support for internal corporate meetings with Staff ID and Department fields.
- **Digital Signature Pad**: High-DPI responsive canvas supporting both mobile touch drawing and desktop mouse drawing with clear/reset functionality.
- **Instant Confirmation Screen**: Confirmation ID generation, summary of registered details, and quick "Register Another Guest" loop for kiosk or shared tablets.

### 2. 🛡️ Protected Admin Portal
- **Session Authentication**: Secured with password gate (default: `admin123`).
- **Overview Metrics**:
  - Total Check-Ins (real-time count across events).
  - Active Events managed.
  - Signatures Verified (100% mandatory validation).
  - Local browser persistence engine.
- **Live Search & Filter**: Instant filtering by event selector or live search across attendee names, companies, emails, staff numbers, and departments.
- **Detailed Attendance Table**: View attendee records, timestamps, event association, and interactive signature thumbnail previews.
- **Signature Zoom Viewer**: High-resolution modal preview for verifying signatures.
- **Record Management**: Secure delete confirmation modal to prevent accidental data loss.
- **Data Reseed Utility**: One-click reset to seed demo events and synthetic attendance records.

### 3. 📄 A4 Printable QR Signage Layout
- High-contrast geometric QR code SVG layout.
- Clear bilingual instructional call-to-action: *"Sila Scan Di Sini Untuk Mendaftar Kehadiran"*.
- Event title, venue, and date badge formatting.
- Native browser print layout (`window.print()`) styled specifically for standard A4 paper display stands.

### 4. 📑 Official Corporate Attendance Sheet (PDF Template)
- Faithfully modeled after enterprise corporate attendance sheets (e.g. Media Prima / NSTP format).
- Boxed header with `MEETING`, `DATE/TIME`, and `VENUE` fields.
- Standard corporate grid: `NO | NAME | STAFF NO | DEPT | EMAIL | SIGN`.
- **Embedded Digital Signatures**: Neatly places the guest's drawn signature into the `SIGN` column.
- Print-ready and exportable to PDF with blank reserve rows for physical walk-ins.

### 5. 📊 CSV Data Export
- 1-click export of attendance data into clean CSV files formatted for Excel, Google Sheets, or corporate HR systems.

---

## 🚀 Tech Stack

- **Framework**: React 19 (TypeScript)
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Signature Capture**: HTML5 Canvas API (Pointer / Touch / Mouse)
- **Data Persistence**: Browser LocalStorage & SessionStorage

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your machine.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/attendease.git
   cd attendease
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🔑 Default Credentials & Demo Setup

- **Admin Password**: `admin123`
- **Initial Demo Events**:
  - `Petronas Technology & Innovation Summit 2025` (KLCC Hall 4)
  - `Procurement Process Awareness 2024 - NSTP` (Meeting Room, GCAS Dept, Balai Berita KL)
  - `National Digital Economy Board Roundtable` (Putrajaya Marriott Hotel)
- To reset sample attendees and events at any time, click **"Reset to Demo Synthetic Data"** at the bottom of the Admin Portal.

---

## 📋 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite development server on port 3000 |
| `npm run build` | Builds the production bundle in `/dist` |
| `npm run preview`| Previews the production build locally |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |

---

## 📁 Project Structure

```
├── index.html                   # HTML entry point with metadata
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Core app router & state coordinator
│   ├── types.ts                 # TypeScript data contracts & interfaces
│   ├── index.css                # Tailwind CSS imports & print stylesheets
│   ├── utils/
│   │   └── storage.ts           # LocalStorage helpers, seed data & CSV generator
│   └── components/
│       ├── GuestView.tsx        # Mobile-friendly guest registration & signature canvas
│       ├── AdminPortal.tsx      # Admin dashboard, analytics cards & attendee table
│       ├── CreateEventModal.tsx # Modal to register new meetings or summits
│       ├── PrintQRModal.tsx     # A4 QR Code signage printable sheet
│       ├── PrintAttendanceSheetModal.tsx # Corporate attendance sheet (PDF template)
│       ├── SignatureModal.tsx   # Enlarged signature modal viewer
│       ├── DeleteModal.tsx      # Record deletion confirmation modal
│       └── Toast.tsx            # Floating toast notification feedback
```

---

## 📜 License

This project is licensed under the Apache License 2.0.
