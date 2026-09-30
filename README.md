# 📋 AttendEase - Sistem Pendaftaran Kehadiran Digital & Kod QR

[![Stage](https://img.shields.io/badge/Versi-Stage%201%20PRD%20v2.0-blue.svg)](#)
[![Status](https://img.shields.io/badge/Status-Sedia%20Digunakan-emerald.svg)](#)
[![Live Demo](https://img.shields.io/badge/Demo-Buka%20Aplikasi-6366f1.svg)](https://attendease-digital-attendance-qr-registration-sys.ai.studio)

> **AttendEase** ialah sistem kehadiran digital tanpa kertas untuk mesyuarat korporat, seminar, persidangan, dan program syarikat. Tetamu hanya perlu imbas kod QR menggunakan telefon pintar, isi maklumat ringkas, dan turunkan tandatangan secara digital. Urusetia pula boleh pantau senarai kehadiran secara langsung, cetak poster QR, dan jana borang kehadiran rasmi berformat PDF.

---

## 🌐 Pautan Demo Langsung (Live Demo)

Anda boleh mencuba aplikasi ini secara terus di pelayar web tanpa perlu memasang apa-apa perisian:

👉 **[https://attendease-digital-attendance-qr-registration-sys.ai.studio](https://attendease-digital-attendance-qr-registration-sys.ai.studio)**

---

## 🔑 Maklumat Akses Pentadbir (Admin)

Untuk mengakses dashboard dan senarai kehadiran:
- **Pautan / Tab**: Klik butang **"Admin Portal"** di bahagian atas kanan skrin.
- **Kata Laluan Admin (Default)**: `admin123`

---

## ✨ Apa Yang Sistem Ini Boleh Lakukan?

### 1. 📱 Pendaftaran Tetamu Melalui Telefon (Guest View)
- **Mesra Telefon Pintar**: Reka bentuk yang kemas, moden, dan mudah diisi di mana-mana skrin telefon.
- **Pilihan Program / Acara**: Tetamu atau urusetia boleh memilih acara yang sedang berlangsung daripada menu dropdown.
- **Borang Ringkas & Pantas**:
  - Nama Penuh
  - Nama Syarikat / Organisasi
  - Alamat Emel
  - Nombor Telefon
  - *(Pilihan tambahan untuk kakitangan dalaman)*: No. Pekerja (Staff No) dan Jabatan (Dept).
- **Pad Tandatangan Digital**: Boleh conteng/turunkan tandatangan terus di atas skrin sentuh telefon atau menggunakan tetikus (mouse) di komputer. Terdapat butang *Clear Signature* jika ingin tanda tangan semula.
- **Skrin Pengesahan Berjaya**: Memaparkan kad ringkasan pendaftaran bersama **No. ID Pengesahan** unik dan butang untuk mendaftar tetamu seterusnya.

---

### 2. 🛡️ Portal Pentadbir & Urusetia (Admin Portal)
- **Dilindungi Kata Laluan**: Hanya urusetia yang memasukkan kata laluan (`admin123`) boleh melihat rekod kehadiran.
- **Ringkasan Statistik Segera**:
  - Jumlah Kehadiran (Total Check-Ins).
  - Jumlah Acara Aktif.
  - Peratusan Tandatangan Disahkan (100% wajib).
  - Status Penyimpanan Data (Persistent LocalStorage).
- **Carian Segera & Penapis Acara**: Boleh tapis mengikut acara tertentu dan cari nama, emel, syarikat, atau no. pekerja dalam sekelip mata.
- **Jadual Senarai Kehadiran Penuh**:
  - Memaparkan susunan nombor, nama peserta, syarikat, emel, telefon, masa pendaftaran, dan gambar tandatangan sebenar.
- **Lihat Tandatangan Lebih Jelas (Zoom)**: Klik pada gambar tandatangan untuk paparan saiz besar.
- **Padam Rekod Kehadiran**: Butang padam dengan pengesahan amaran untuk elakkan terpadam tanpa sengaja.
- **Muat Semula Data Contoh**: Butang *Reset to Demo Synthetic Data* untuk memuatkan semula data contoh bagi tujuan demonstrasi.

---

### 3. 🖨️ Cetak Poster Kod QR Saiz A4 (QR Signage Sheet)
- Urusetia boleh menjana helaian poster promosi A4 yang siap sedia untuk diletakkan di kaunter pendaftaran.
- Mengandungi:
  - Kod QR berdefinisi tinggi.
  - Nama Acara, Tarikh & Masa, serta Lokasi Bilik / Dewan.
  - Arahan jelas: *"Sila Scan Di Sini Untuk Mendaftar Kehadiran"*.
- Boleh terus dicetak ke kertas A4 menggunakan butang **Print to A4**.

---

### 4. 📑 Borang Kehadiran Rasmi Format PDF (Media Prima / NSTP Template)
- Disediakan khusus mengikut format borang kehadiran mesyuarat korporat (seperti format Media Prima / NSTP).
- Mempunyai kotak butiran di bahagian atas:
  - `MEETING` (Nama Mesyuarat / Acara)
  - `DATE/TIME` (Tarikh & Waktu Mesyuarat)
  - `VENUE` (Lokasi / Bilik Mesyuarat)
- Jadual rasmi lengkap dengan lajur:  
  `NO` | `NAME` | `STAFF NO` | `DEPT` | `EMAIL` | `SIGN`
- **Tandatangan digital setiap peserta dicetak secara automatik** di dalam kotak `SIGN`.
- Boleh dicetak terus ke pencetak fizikal atau disimpan sebagai fail **PDF** (*Print / Save as PDF*).

---

### 5. 📊 Eksport ke Fail Excel / CSV
- Klik butang **Export to CSV** untuk memuat turun semua rekod kehadiran ke dalam fail `.csv`.
- Sesuai dibuka di Microsoft Excel, Google Sheets, atau dimuat naik ke sistem HR syarikat.

---

## 📖 Panduan Penggunaan Mudah

### A. Untuk Tetamu / Peserta
1. Imbas kod QR yang dipaparkan di kaunter majlis menggunakan kamera telefon.
2. Pastikan nama acara yang tertera adalah betul.
3. Isikan Nama, Syarikat, Emel, dan No. Telefon.
4. Turunkan tandatangan anda di dalam kotak tandatangan digital.
5. Tekan butang biru **"Submit Registration"**.
6. Simpan No. ID Pengesahan yang tertera di skrin sebagai rujukan.

### B. Untuk Urusetia / Penganjur Majlis
1. Buka laman web AttendEase di komputer riba atau tablet urusetia.
2. Di bar atas, klik **"Admin Portal"**.
3. Masukkan kata laluan `admin123` dan klik **Unlock Dashboard**.
4. **Cipta Acara Baru**: Klik butang **"+ Create New Event"** dan isi butiran majlis.
5. **Cetak Poster QR**: Klik butang **"Print A4 QR Sheet"** dan letakkan di meja pendaftaran.
6. **Selepas Majlis Selesai**:
   - Klik **"Official Sheet (PDF)"** untuk mencetak senarai kehadiran rasmi bersama tandatangan lengkap.
   - Atau klik **"Export to CSV"** untuk simpanan laporan digital.

---

## 💻 Cara Pasang di Komputer Sendiri (Untuk Developer)

Jika anda ingin menjalankan projek ini di komputer tempatan anda:

### Keperluan Asas
- Pastikan komputer anda telah dipasang **Node.js** (versi 18 atau ke atas).

### Langkah Pemasangan:

1. **Salin (Clone) repositori ini:**
   ```bash
   git clone https://github.com/your-username/attendease.git
   cd attendease
   ```

2. **Pasang pakej modul (dependencies):**
   ```bash
   npm install
   ```

3. **Jalankan server pembangunan:**
   ```bash
   npm run dev
   ```

4. **Buka di pelayar web:**
   Layari alamat `http://localhost:3000` di pelayar Chrome/Edge/Safari anda.

---

## 🛠️ Perisian & Teknologi Digunakan

- **React 19 & TypeScript**: Pembinaan komponen antaramuka moden yang pantas dan selamat.
- **Tailwind CSS v4**: Penggayaan reka bentuk visual yang kemas dan responsif.
- **Vite**: Alat pembina (bundler) yang amat laju.
- **Lucide React**: Ikon grafik antaramuka profesional.
- **HTML5 Canvas API**: Pengesanan sentuhan jari & tetikus untuk tandatangan digital berdefinisi tinggi.
- **LocalStorage & SessionStorage**: Penyimpanan rekod secara automatik dalam pelayar tanpa perlukan pangkalan data rumit.

---

## 📂 Struktur Fail Projek

```
├── index.html                       # Fail utama HTML
├── package.json                     # Senarai perisian dan arahan npm
├── src/
│   ├── main.tsx                     # Titik mula React
│   ├── App.tsx                      # Halaman induk, navigasi & pengurusan status
│   ├── types.ts                     # Definisi jenis data (TypeScript)
│   ├── index.css                    # Penggayaan global & arahan cetakan A4/PDF
│   ├── utils/
│   │   └── storage.ts               # Pengurusan storan, data sampel & eksport CSV
│   └── components/
│       ├── GuestView.tsx            # Borang pendaftaran tetamu & pad tandatangan
│       ├── AdminPortal.tsx          # Papan pemuka admin & jadual kehadiran
│       ├── CreateEventModal.tsx     # Tetingkap tambah acara baru
│       ├── PrintQRModal.tsx         # Tetingkap poster kod QR A4
│       ├── PrintAttendanceSheetModal.tsx # Borang kehadiran format PDF (Media Prima/NSTP)
│       ├── SignatureModal.tsx       # Paparan besar tandatangan
│       ├── DeleteModal.tsx          # Tetingkap pengesahan padam rekod
│       └── Toast.tsx                # Notifikasi maklum balas di skrin
```

---

## 📄 Lesen

Hak cipta terpelihara di bawah **Apache License 2.0**. Sesuai digunakan untuk tujuan komersial, akademik, mahupun pembangunan dalaman organisasi.
