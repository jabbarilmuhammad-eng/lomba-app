"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

const TARGET_DATE = new Date("2027-01-23T08:00:00+07:00").getTime();

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

const DEFAULT_GAS_URL =
  "https://script.google.com/macros/s/AKfycbxhAVGyeroYI8bx5NhkosgknUrx85Y8qUUb2CtJumQCmJrkHeVsh_K0QHxZEMzzPBpu9A/exec";
const STORAGE_KEY = "armaso_gas_webhook_url";

export default function Home() {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [guidebookModalOpen, setGuidebookModalOpen] = useState(false);
  const [guidebookType, setGuidebookType] = useState<"olimpiade" | "futsal">("olimpiade");

  const [webhookModalOpen, setWebhookModalOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(DEFAULT_GAS_URL);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days: days < 10 ? `0${days}` : `${days}`,
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUrl = localStorage.getItem(STORAGE_KEY);
      if (savedUrl) setWebhookUrl(savedUrl);
    }
  }, []);

  const openGuidebook = (type: "olimpiade" | "futsal") => {
    setGuidebookType(type);
    setGuidebookModalOpen(true);
  };

  const handleDownloadGuidebook = () => {
    const data = GUIDES[guidebookType];
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

  const handleSaveGasUrl = () => {
    const val = webhookUrl.trim();
    if (val) {
      localStorage.setItem(STORAGE_KEY, val);
      alert("URL Google Apps Script Webhook berhasil diperbarui!");
      setWebhookModalOpen(false);
    }
  };

  const handleResetGasUrl = () => {
    localStorage.removeItem(STORAGE_KEY);
    setWebhookUrl(DEFAULT_GAS_URL);
    alert("URL Google Apps Script Webhook telah dikembalikan ke URL bawaan panitia.");
  };

  return (
    <>
      {/* Subtle Hieroglyphic Background Overlay */}
      <div className="hieroglyph-backdrop" aria-hidden="true" />

      <div className="main-wrapper">
        {/* Top Navigation Bar */}
        <Navbar />

        {/* 1. HERO SECTION (CLASSIC & MAJESTIC EGYPTIAN) */}
        <section className="hero-section" id="beranda">
          <div className="hero-bg-wrapper">
            <img
              src="/assets/images/hero-pyramid.jpg"
              alt="Piramida Klasik Megah ARMASO 2027"
              className="hero-bg-image"
              id="hero-img"
            />
            <div className="hero-overlay-gradient" />
          </div>

          <div className="container hero-content">
            <div className="badge-egypt">
              <i className="fa-solid fa-crown" /> Edisi Classic &amp; Majestic Egyptian
            </div>

            <h1 className="hero-title-main">
              KEMEGAHAN ILMU &amp; SPORTIVITAS{" "}
              <span className="hero-title-gold">ARMASO 2027</span>
            </h1>

            <p className="hero-subtitle-tagline">
              Ar-Rahmat Mathematic, Science, Social Olympiad, and Sport Competition
            </p>

            <p className="hero-description">
              Selamat datang di gelanggang kompetisi paling prestisius tingkat{" "}
              <strong>SD/MI Sederajat se-Jawa Bali</strong>. Diselenggarakan dengan penuh khidmat, sakral, dan megah oleh Pondok Pesantren Modern Ar
              Rahmat Bojonegoro guna melahirkan generasi cendekia yang berilmu tinggi, tangguh, dan berakhlak mulia.
            </p>

            {/* Action CTAs to Subpages */}
            <div className="hero-cta-group">
              <a
                href="/register"
                className="btn btn-gold btn-lg"
                id="btn-hero-register"
              >
                <i className="fa-solid fa-trophy" /> Daftar Armaso 2027
              </a>
              <button
                type="button"
                className="btn btn-outline-gold btn-lg"
                id="btn-download-guidebook-olymp"
                onClick={() => openGuidebook("olimpiade")}
              >
                <i className="fa-solid fa-book-open" /> Unduh Panduan
              </button>
            </div>

            {/* Key Event Highlights Strip */}
            <div className="hero-highlights-strip">
              <div className="highlight-item">
                <div className="highlight-icon">
                  <i className="fa-solid fa-tags" />
                </div>
                <div>
                  <span className="highlight-label">Biaya Pendaftaran</span>
                  <span className="highlight-value">Olimpiade Rp 35k | Futsal Rp 150k</span>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">
                  <i className="fa-solid fa-trophy" />
                </div>
                <div>
                  <span className="highlight-label">Total Hadiah Pembinaan</span>
                  <span className="highlight-value">Prize Pool Jutaan Rupiah</span>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">
                  <i className="fa-solid fa-map-location-dot" />
                </div>
                <div>
                  <span className="highlight-label">Jangkauan Wilayah</span>
                  <span className="highlight-value">SD/MI se-Jawa &amp; Bali</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. COUNTDOWN TIMER SECTION */}
        <section
          className="section"
          style={{
            padding: "3.5rem 0 2rem",
            background: "var(--bg-darker)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div className="container text-center">
            <span className="section-tag">
              <i className="fa-regular fa-clock" /> Hitung Mundur Perhelatan
            </span>
            <h2
              className="section-title"
              style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
            >
              MENUJU BABAK UTAMA ARMASO 2027
            </h2>
            <p className="section-subtitle">
              23 Januari 2027 • Pondok Pesantren Modern Ar Rahmat Bojonegoro
            </p>

            <div className="countdown-box">
              <div className="countdown-unit">
                <span className="countdown-num" id="count-days">
                  {countdown.days}
                </span>
                <span className="countdown-label">Hari</span>
              </div>
              <div className="countdown-unit">
                <span className="countdown-num" id="count-hours">
                  {countdown.hours}
                </span>
                <span className="countdown-label">Jam</span>
              </div>
              <div className="countdown-unit">
                <span className="countdown-num" id="count-mins">
                  {countdown.minutes}
                </span>
                <span className="countdown-label">Menit</span>
              </div>
              <div className="countdown-unit">
                <span className="countdown-num" id="count-secs">
                  {countdown.seconds}
                </span>
                <span className="countdown-label">Detik</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. INFORMASI BIAYA & TOTAL HADIAH */}
        <section className="section" id="biaya-hadiah">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">
                <i className="fa-solid fa-gem" /> Transparansi &amp; Apresiasi
              </span>
              <h2 className="section-title">BIAYA PENDAFTARAN &amp; TOTAL HADIAH</h2>
              <div className="egyptian-divider">
                <i className="fa-solid fa-scale-balanced" />
              </div>
              <p className="section-subtitle">
                Ajang kompetisi berskala regional Jawa-Bali dengan biaya terjangkau, apresiasi hadiah pembinaan jutaan
                rupiah, trofi bergilir bergengsi, medali, serta sertifikat resmi.
              </p>
            </div>

            <div className="pricing-prize-grid">
              {/* Card 1: Olimpiade */}
              <div className="tier-card">
                <div className="tier-card-header">
                  <span className="tier-badge">Akademik</span>
                  <div className="tier-icon">
                    <i className="fa-solid fa-graduation-cap" />
                  </div>
                  <h3 className="tier-title">OLIMPIADE SD/MI</h3>
                  <p className="tier-category">Matematika, IPA (Science), &amp; IPS (Social)</p>
                </div>

                <div className="tier-card-body">
                  <div className="tier-metric-box">
                    <div className="metric-row">
                      <span className="metric-title">Biaya Pendaftaran</span>
                      <span className="metric-value-huge">Rp 35.000</span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-title">Apresiasi Kejuaraan</span>
                      <span className="metric-value-huge" style={{ color: "#ffd873" }}>
                        Trophy &amp; Pembinaan
                      </span>
                    </div>
                  </div>

                  <ul className="tier-features-list">
                    <li>
                      <i className="fa-solid fa-check" /> Terbuka untuk seluruh siswa SD/MI sederajat se-Jawa Bali
                    </li>
                    <li>
                      <i className="fa-solid fa-check" /> Soal standar olimpiade nasional bernalar tinggi (HOTS)
                    </li>
                    <li>
                      <i className="fa-solid fa-check" /> Babak Penyisihan: Sabtu, 23 Januari 2027
                    </li>
                    <li>
                      <i className="fa-solid fa-check" /> Babak Semifinal &amp; Final: Minggu, 24 Januari 2027
                    </li>
                    <li>
                      <i className="fa-solid fa-check" /> Trophy Juara, Piagam Penghargaan, dan Uang Pembinaan
                    </li>
                    <li>
                      <i className="fa-solid fa-check" /> Seluruh peserta mendapatkan Sertifikat Resmi ARMASO 2027
                    </li>
                  </ul>

                  <a href="/register/olimpiade" className="btn btn-gold" style={{ width: "100%" }}>
                    <i className="fa-solid fa-paper-plane" /> Menuju Pendaftaran Olimpiade
                  </a>
                </div>
              </div>

              {/* Card 2: Kompetisi Futsal */}
              <div className="tier-card">
                <div className="tier-card-header">
                  <span className="tier-badge">Olahraga</span>
                  <div className="tier-icon">
                    <i className="fa-solid fa-futbol" />
                  </div>
                  <h3 className="tier-title">KOMPETISI FUTSAL</h3>
                  <p className="tier-category">Turnamen Futsal Putra SD/MI se-Jawa Bali</p>
                </div>

                <div className="tier-card-body">
                  <div className="tier-metric-box">
                    <div className="metric-row">
                      <span className="metric-title">Biaya Pendaftaran</span>
                      <span className="metric-value-huge">Rp 150.000</span>
                    </div>
                    <div className="metric-row">
                      <span className="metric-title">Apresiasi Kejuaraan</span>
                      <span className="metric-value-huge" style={{ color: "#ffd873" }}>
                        Trophy &amp; Pembinaan
                      </span>
                    </div>
                  </div>

                  <ul className="tier-features-list">
                    <li>
                      <i className="fa-solid fa-check" /> Kuota tim delegasi sekolah SD/MI sederajat se-Jawa Bali
                    </li>
                    <li>
                      <i className="fa-solid fa-check" /> Format turnamen: Sistem Gugur (Single Elimination)
                    </li>
                    <li>
                      <i className="fa-solid fa-check" /> Babak Penyisihan: 23 Januari 2027
                    </li>
                    <li>
                      <i className="fa-solid fa-check" /> Babak Semifinal &amp; Grand Final: Minggu, 24 Januari 2027
                    </li>
                    <li>
                      <i className="fa-solid fa-check" /> Trophy Bergilir ARMASO Cup, Medali Emas/Perak/Perunggu
                    </li>
                    <li>
                      <i className="fa-solid fa-check" /> Penghargaan Khusus: Top Scorer &amp; Pemain Terbaik (Best Player)
                    </li>
                  </ul>

                  <a href="/register/futsal" className="btn btn-gold" style={{ width: "100%" }}>
                    <i className="fa-solid fa-paper-plane" /> Menuju Pendaftaran Futsal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TENTANG ARMASO & PONDOK PESANTREN MODERN AR RAHMAT */}
        <section
          className="section"
          id="tentang-kami"
          style={{
            background: "rgba(14, 10, 6, 0.7)",
            borderTop: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div className="container">
            <div className="section-header">
              <span className="section-tag">
                <i className="fa-solid fa-landmark" /> Tentang Penyelenggara
              </span>
              <h2 className="section-title">PONDOK PESANTREN MODERN AR RAHMAT</h2>
              <div className="egyptian-divider">
                <i className="fa-solid fa-scroll" />
              </div>
              <p className="section-subtitle">
                Lembaga pendidikan Islam modern unggulan di Bojonegoro yang memadukan keunggulan sains, teknologi, tahfidz
                Al-Qur'an, dan pembinaan karakter kepemimpinan berwawasan global.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              <div className="subject-card">
                <div className="subject-icon-box">
                  <i className="fa-solid fa-award" />
                </div>
                <h3 className="subject-title">Integritas &amp; Prestasi</h3>
                <p className="subject-desc">
                  Pondok Pesantren Modern Ar Rahmat secara konsisten mencetak santri berprestasi di tingkat regional,
                  nasional, hingga internasional dalam bidang olimpiade sains, robotika, dan riset ilmiah.
                </p>
              </div>

              <div className="subject-card">
                <div className="subject-icon-box">
                  <i className="fa-solid fa-shield-halved" />
                </div>
                <h3 className="subject-title">Sportivitas &amp; Karakter</h3>
                <p className="subject-desc">
                  ARMASO 2027 dirancang bukan sekadar ajang adu kecerdasan dan kekuatan fisik, melainkan wahana silaturahmi
                  akbar dan penempaan sportivitas generasi penerus bangsa.
                </p>
              </div>

              <div className="subject-card">
                <div className="subject-icon-box">
                  <i className="fa-solid fa-mosque" />
                </div>
                <h3 className="subject-title">Fasilitas Pesantren Modern</h3>
                <p className="subject-desc">
                  Didukung oleh fasilitas komprehensif: auditorium megah, laboratorium sains modern, serta asrama dan masjid yang representatif di pusat kota Bojonegoro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FOOTER RESMI ARMASO 2027 */}
        <footer className="footer" id="lokasi-kontak">
          <div className="container">
            <div className="footer-grid">
              {/* Col 1: Brand & Bio */}
              <div className="footer-col-brand">
                <a href="/" className="brand-logo" style={{ marginBottom: "1.25rem" }}>
                  <div className="brand-crest">
                    <i className="fa-solid fa-ankh" />
                  </div>
                  <div className="brand-text">
                    <span className="brand-title">ARMASO 2027</span>
                    <span className="brand-subtitle">AR-RAHMAT COMPETITION</span>
                  </div>
                </a>
                <p className="footer-about-text">
                  Ar-Rahmat Mathematic, Science, Social Olympiad, and Sport Competition 2027. Kompetisi akbar tingkat SD/MI
                  sederajat se-Jawa Bali dengan semangat kemegahan ilmu klasik dan sportivitas ksatria.
                </p>
                <div className="footer-social-row">
                  <a
                    href="https://instagram.com/_dakamaulana_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    title="Instagram Panitia @_dakamaulana_"
                  >
                    <i className="fa-brands fa-instagram" />
                  </a>
                  <a
                    href="https://github.com/dakamaulana189"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    title="GitHub Repository"
                  >
                    <i className="fa-brands fa-github" />
                  </a>
                  <a
                    href="https://wa.me/6282142761856"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    title="WhatsApp Panitia"
                  >
                    <i className="fa-brands fa-whatsapp" />
                  </a>
                </div>
              </div>

              {/* Col 2: Navigasi Lomba */}
              <div>
                <h4 className="footer-col-title">Cabang Lomba</h4>
                <ul className="footer-links">
                  <li>
                    <a href="/register">
                      <i className="fa-solid fa-angle-right" /> Olimpiade Matematika
                    </a>
                  </li>
                  <li>
                    <a href="/register">
                      <i className="fa-solid fa-angle-right" /> Olimpiade IPA (Science)
                    </a>
                  </li>
                  <li>
                    <a href="/register">
                      <i className="fa-solid fa-angle-right" /> Olimpiade IPS (Social)
                    </a>
                  </li>
                  <li>
                    <a href="/register/futsal">
                      <i className="fa-solid fa-angle-right" /> Turnamen Futsal Putra
                    </a>
                  </li>
                  <li>
                    <a href="/register">
                      <i className="fa-solid fa-angle-right" /> Pendaftaran Online
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 3: Berkas & Panduan */}
              <div>
                <h4 className="footer-col-title">Informasi</h4>
                <ul className="footer-links">
                  <li>
                    <a
                      href="#guidebook"
                      id="btn-download-guidebook-olymp-footer"
                      onClick={(e) => {
                        e.preventDefault();
                        openGuidebook("olimpiade");
                      }}
                    >
                      <i className="fa-solid fa-file-lines" /> Guidebook Olimpiade
                    </a>
                  </li>
                  <li>
                    <a
                      href="#guidebook"
                      id="btn-download-guidebook-futsal-footer"
                      onClick={(e) => {
                        e.preventDefault();
                        openGuidebook("futsal");
                      }}
                    >
                      <i className="fa-solid fa-file-lines" /> Guidebook Futsal
                    </a>
                  </li>
                  <li>
                    <a href="#biaya-hadiah">
                      <i className="fa-solid fa-file-lines" /> Ketentuan Hadiah
                    </a>
                  </li>
                  <li>
                    <a href="#tentang-kami">
                      <i className="fa-solid fa-file-lines" /> Profil Ar-Rahmat
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 4: Lokasi & Narahubung */}
              <div>
                <h4 className="footer-col-title">Lokasi &amp; Narahubung</h4>
                <div className="footer-contact-item">
                  <i className="fa-solid fa-location-dot" />
                  <div>
                    <strong>Pondok Pesantren Modern Ar Rahmat</strong>
                    <br />
                    Jl. Untung Suropati No. 48, Sumbang, Kec. Bojonegoro, Kabupaten Bojonegoro, Jawa Timur 62115
                  </div>
                </div>

                <div className="footer-contact-item">
                  <i className="fa-brands fa-whatsapp" />
                  <div>
                    <strong>Narahubung (WhatsApp):</strong>
                    <br />
                    <a
                      href="https://wa.me/6282142761856"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Daka Maulana: +62 821-4276-1856
                    </a>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <i className="fa-brands fa-instagram" />
                  <div>
                    <strong>Instagram Resmi:</strong>
                    <br />
                    <a
                      href="https://instagram.com/_dakamaulana_"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @_dakamaulana_
                    </a>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <i className="fa-brands fa-github" />
                  <div>
                    <strong>Pengembang / GitHub:</strong>
                    <br />
                    <a
                      href="https://github.com/dakamaulana189"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/dakamaulana189
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bottom Bar */}
            <div className="footer-bottom">
              <div>
                &copy; 2027 <strong>ARMASO (Ar-Rahmat Olympiad &amp; Sport Competition)</strong>. Seluruh Hak Cipta Dilindungi.
              </div>
              <div>
                Diselenggarakan oleh{" "}
                <a
                  href="https://arrahmat-bjn.sch.id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PPM Ar Rahmat Bojonegoro
                </a>{" "}
                • Tim Teknis:{" "}
                <a
                  href="https://github.com/dakamaulana189"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Daka Maulana
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* GUIDEBOOK MODAL */}
      <div
        className={`modal-overlay ${guidebookModalOpen ? "active" : ""}`}
        id="guidebook-modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) setGuidebookModalOpen(false);
        }}
      >
        <div className="modal-box">
          <button
            className="modal-close-btn"
            aria-label="Tutup"
            onClick={() => setGuidebookModalOpen(false)}
          >
            <i className="fa-solid fa-xmark" />
          </button>
          <h3 className="modal-title" id="guidebook-modal-title">
            {GUIDES[guidebookType].title}
          </h3>
          <p className="modal-desc">
            Pelajari ketentuan teknis lomba, silabus materi, format penilaian, dan tata tertib kompetisi.
          </p>
          <div id="guidebook-modal-body">
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                fontSize: "0.85rem",
                lineHeight: 1.5,
                color: "#fbf8f0",
                background: "rgba(12,9,6,0.85)",
                padding: "1.25rem",
                borderRadius: "8px",
                border: "1px solid var(--border-gold)",
                maxHeight: "380px",
                overflowY: "auto",
              }}
            >
              {GUIDES[guidebookType].content}
            </pre>
          </div>
          <div className="modal-actions" style={{ marginTop: "1.5rem" }}>
            <button
              type="button"
              className="btn btn-gold"
              id="btn-guidebook-download-action"
              onClick={handleDownloadGuidebook}
            >
              <i className="fa-solid fa-download" /> Unduh File Panduan (.txt)
            </button>
            <button
              type="button"
              className="btn btn-outline-gold btn-close-modal"
              onClick={() => setGuidebookModalOpen(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>

      {/* GOOGLE APPS SCRIPT WEBHOOK CONFIG MODAL */}
      <div
        className={`modal-overlay ${webhookModalOpen ? "active" : ""}`}
        id="webhook-config-modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) setWebhookModalOpen(false);
        }}
      >
        <div className="modal-box">
          <button
            className="modal-close-btn"
            aria-label="Tutup"
            onClick={() => setWebhookModalOpen(false)}
          >
            <i className="fa-solid fa-xmark" />
          </button>
          <h3 className="modal-title">
            <i className="fa-solid fa-database" /> Integrasi Google Spreadsheet
          </h3>
          <p className="modal-desc">
            Data form di website ini dikirimkan secara otomatis ke Google Apps Script Webhook panitia untuk dicatat ke Google Sheets dan Google Drive.
          </p>

          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label className="form-label" htmlFor="gas-webhook-url-input">
              URL Webhook Google Apps Script (/exec):
            </label>
            <input
              type="url"
              className="form-control"
              id="gas-webhook-url-input"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <span className="form-help">
              Default sudah terhubung ke webhook panitia ARMASO 2027.
            </span>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-gold"
              id="btn-save-gas-url"
              onClick={handleSaveGasUrl}
            >
              <i className="fa-solid fa-floppy-disk" /> Simpan URL Webhook
            </button>
            <button
              type="button"
              className="btn btn-outline-gold"
              id="btn-reset-gas-url"
              onClick={handleResetGasUrl}
            >
              <i className="fa-solid fa-rotate-left" /> Reset ke Bawaan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}