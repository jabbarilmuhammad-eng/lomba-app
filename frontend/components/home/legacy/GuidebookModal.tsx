/**
 * LEGACY — GuidebookModal & GAS Webhook Config
 * ──────────────────────────────────────────────
 * Dipindah dari app/page.tsx saat refactor beranda ke komponen terpisah (Tahap 1).
 * Belum dipakai di mana pun. Akan diintegrasikan kembali ke halaman:
 *   - /register/olimpiade  → GuidebookModal type="olimpiade"
 *   - /register/futsal     → GuidebookModal type="futsal"
 *
 * CATATAN WEBHOOK GAS:
 *   Modal ini memungkinkan panitia mengganti URL Google Apps Script (GAS)
 *   yang dipakai untuk menerima data form pendaftaran.
 *   Data yang dikirim ke GAS webhook: seluruh payload form pendaftaran
 *   (nama, sekolah, nomor WhatsApp, bukti transfer, dll.) via POST JSON.
 *   Tujuan: dicatat otomatis ke Google Sheets dan Google Drive milik panitia.
 *   URL webhook DEFAULT tersimpan sebagai konstanta di file ini.
 *   URL bisa di-override per-browser menggunakan localStorage (key: "armaso_gas_webhook_url").
 *   JANGAN ekspos URL lengkap GAS di laporan/commit publik.
 */

"use client";

import { useState, useEffect } from "react";

/* ── Konten Guidebook ── */
const GUIDES = {
  olimpiade: {
    title: "Buku Panduan (Guidebook) Olimpiade ARMASO 2027",
    filename: "Guidebook_Olimpiade_ARMASO_2027.txt",
    content: `===============================================================
PETUNJUK TEKNIS & SILABUS OLIMPIADE ARMASO 2027
Pondok Pesantren Modern Ar Rahmat Bojonegoro, Jawa Timur
Ajang SD/MI Sederajat Se-Jawa Bali
===============================================================

A. KETENTUAN UMUM
1. Peserta adalah siswa/siswi aktif tingkat SD/MI sederajat di wilayah Jawa dan Bali.
2. Setiap sekolah dapat mengirimkan lebih dari 1 perwakilan untuk masing-masing bidang lomba.
3. Bidang lomba terdiri dari:
   - Matematika (Aritmatika, Teori Bilangan, Aljabar Sederhana, Geometri, Kombinatorika)
   - IPA / Science (Biologi Manusia & Lingkungan, Fisika Dasar, Energi, Pengukuran)
   - IPS / Social (Geografi Indonesia & Dunia, Sejarah Nusantara, Sosial Budaya, Koperasi & Ekonomi Dasar)
4. Biaya Pendaftaran: Rp 35.000,- per peserta.

B. TIMELINE & JALANNYA ACARA
1. Pendaftaran Online: Dibuka hingga 15 Januari 2027.
2. Babak Penyisihan (Offline/Online Campuran): Sabtu, 23 Januari 2027 (08.00 - 11.30 WIB).
3. Pengumuman Semifinalis: Sabtu, 23 Januari 2027 (16.00 WIB).
4. Babak Semifinal & Final: Minggu, 24 Januari 2027 (Pukul 08.00 WIB - selesai di Ar Rahmat Bojonegoro).

C. TOTAL HADIAH & PENGHARGAAN
- Juara 1: Trophy Bergilir + Trophy Juara + Piagam Kemendikbud/Kemenag + Uang Pembinaan
- Juara 2 & 3: Trophy + Piagam Penghargaan + Uang Pembinaan
- Juara Harapan 1, 2, 3: Trophy + Piagam
- Seluruh Peserta: Sertifikat Resmi ARMASO 2027 bertaraf regional Jawa-Bali.

D. NARAHUBUNG RESMI
- WhatsApp: Kak Daka Maulana (+62 821-4276-1856)
- Instagram: @_dakamaulana_
- Kampus: Pondok Pesantren Modern Ar Rahmat, Jl. Untung Suropati No. 48 Bojonegoro.
===============================================================`,
  },
  futsal: {
    title: "Buku Regulasi & Guidebook Kompetisi Futsal ARMASO 2027",
    filename: "Regulasi_Futsal_ARMASO_2027.txt",
    content: `===============================================================
REGULASI RESMI KOMPETISI FUTSAL ARMASO 2027
Pondok Pesantren Modern Ar Rahmat Bojonegoro, Jawa Timur
Tingkat SD/MI Sederajat Se-Jawa Bali
===============================================================

A. KETENTUAN TIM & PESERTA
1. Peserta adalah tim futsal putra delegasi SD/MI sederajat se-Jawa Bali.
2. Komposisi tiap tim: Maksimal 10 pemain (5 pemain inti + 5 pemain cadangan) dan 2 official/pelatih.
3. Wajib membawa surat rekomendasi kepala sekolah dan fotokopi raport/kartu pelajar saat registrasi ulang.
4. Biaya Pendaftaran: Rp 50.000,- per tim.

B. SISTEM PERTANDINGAN & JADWAL
1. Sistem Pertandingan: Sistem Gugur Tunggal (Single Elimination Knockout Stage).
2. Waktu Pertandingan:
   - Babak Penyisihan & Perempat Final: Setiap hari Minggu (1, 8, 15, dan 21 Januari 2027).
   - Babak Semifinal & Grand Final: Minggu, 24 Januari 2027 di Sport Arena Ar Rahmat Bojonegoro.
3. Durasi Pertandingan: 2 x 15 menit kotor (Semi/Final 2 x 20 menit).

C. TOTAL HADIAH & PENGHARGAAN
- Juara 1: Trophy Bergilir ARMASO Cup + Piala Tetap + Medali Emas + Uang Tunai Pembinaan
- Juara 2: Piala + Medali Perak + Uang Tunai Pembinaan
- Juara 3: Piala + Medali Perunggu + Uang Tunai Pembinaan
- Top Scorer & Best Player: Sepatu Emas / Trophy Spesial + Sertifikat + Uang Tunai.

D. NARAHUBUNG RESMI
- WhatsApp: Kak Daka Maulana (+62 821-4276-1856)
- Lokasi: Hall & Sport Court Ar Rahmat, Bojonegoro.
===============================================================`,
  },
};

/* ── Webhook GAS ── */
// URL DEFAULT disimpan di sini; override via localStorage key di bawah.
// JANGAN share URL lengkap ini di dokumen publik.
const DEFAULT_GAS_URL =
  "https://script.google.com/macros/s/AKfycbxhAVGyeroYI8bx5NhkosgknUrx85Y8qUUb2CtJumQCmJrkHeVsh_K0QHxZEMzzPBpu9A/exec";
const STORAGE_KEY = "armaso_gas_webhook_url";

/* ════════════════════════════════════════════════════════
   GuidebookModal — modal baca & unduh panduan olimpiade/futsal
   Props:
     open       : apakah modal terbuka
     type       : "olimpiade" | "futsal"
     onClose    : callback tutup modal
   ════════════════════════════════════════════════════════ */
interface GuidebookModalProps {
  open: boolean;
  type: "olimpiade" | "futsal";
  onClose: () => void;
}

export function GuidebookModal({ open, type, onClose }: GuidebookModalProps) {
  const data = GUIDES[type];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleDownload = () => {
    const blob = new Blob([data.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = data.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-modal="true"
      role="dialog"
      aria-label={data.title}
    >
      <div className="relative w-full max-w-lg rounded-2xl p-6 bg-[#1c0a00] border-2 border-[#efbb52] max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          type="button"
          className="absolute top-4 right-4 text-white/70 hover:text-white text-xl p-1"
          aria-label="Tutup modal"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="font-poppins font-bold text-lg mb-2" style={{ color: "#ffb206" }}>
          {data.title}
        </h2>
        <p className="font-poppins text-sm text-white/70 mb-4">
          Pelajari ketentuan teknis lomba, silabus materi, format penilaian, dan tata tertib kompetisi.
        </p>
        <pre className="font-mono text-xs text-white/90 whitespace-pre-wrap p-4 rounded-lg overflow-y-auto bg-black/80 border border-[#efbb52] max-h-[300px]">
          {data.content}
        </pre>
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            type="button"
            onClick={handleDownload}
            className="font-poppins font-bold text-sm px-5 py-2 rounded-full text-black transition hover:brightness-110 flex items-center gap-2"
            style={{ backgroundColor: "#ffb206" }}
          >
            Unduh File (.txt)
          </button>
          <button
            type="button"
            onClick={onClose}
            className="font-poppins font-medium text-sm px-5 py-2 rounded-full text-white transition hover:bg-white/10 border border-[#efbb52]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   GasWebhookModal — modal konfigurasi URL Google Apps Script
   Fungsi: panitia bisa mengganti endpoint GAS webhook yang
   menerima data form pendaftaran dan mencatatnya ke Google
   Sheets / Drive. URL disimpan di localStorage browser.
   Props:
     open    : apakah modal terbuka
     onClose : callback tutup modal
   ════════════════════════════════════════════════════════ */
interface GasWebhookModalProps {
  open: boolean;
  onClose: () => void;
}

export function GasWebhookModal({ open, onClose }: GasWebhookModalProps) {
  const [webhookUrl, setWebhookUrl] = useState(DEFAULT_GAS_URL);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setWebhookUrl(saved);
    }
  }, []);

  const handleSave = () => {
    const val = webhookUrl.trim();
    if (val) {
      localStorage.setItem(STORAGE_KEY, val);
      alert("URL Google Apps Script Webhook berhasil diperbarui!");
      onClose();
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setWebhookUrl(DEFAULT_GAS_URL);
    alert("URL Google Apps Script Webhook telah dikembalikan ke URL bawaan panitia.");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-md rounded-2xl p-6 bg-[#1c0a00] border-2 border-[#efbb52] shadow-2xl">
        <button
          type="button"
          className="absolute top-4 right-4 text-white/70 hover:text-white text-xl p-1"
          aria-label="Tutup"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-poppins font-bold text-lg mb-2" style={{ color: "#ffb206" }}>
          Integrasi Google Spreadsheet
        </h3>
        <p className="font-poppins text-sm text-white/70 mb-4">
          Data form di website ini dikirimkan secara otomatis ke Google Apps Script Webhook
          panitia untuk dicatat ke Google Sheets dan Google Drive.
        </p>
        <div className="mb-6">
          <label className="block font-poppins text-sm text-white/80 mb-1" htmlFor="gas-webhook-url-input">
            URL Webhook Google Apps Script (/exec):
          </label>
          <input
            type="url"
            id="gas-webhook-url-input"
            className="w-full rounded-lg px-3 py-2 bg-black/60 border border-[#efbb52]/40 text-white text-sm focus:outline-none focus:border-[#efbb52]"
            placeholder="https://script.google.com/macros/s/.../exec"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <span className="font-poppins text-xs text-white/40 mt-1 block">
            Default sudah terhubung ke webhook panitia ARMASO 2027.
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="font-poppins font-bold text-sm px-5 py-2 rounded-full text-black transition hover:brightness-110"
            style={{ backgroundColor: "#ffb206" }}
          >
            Simpan URL Webhook
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="font-poppins font-medium text-sm px-5 py-2 rounded-full text-white transition hover:bg-white/10 border border-[#efbb52]"
          >
            Reset ke Bawaan
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Export konstanta yang mungkin dibutuhkan halaman lain ── */
export { DEFAULT_GAS_URL, STORAGE_KEY, GUIDES };

