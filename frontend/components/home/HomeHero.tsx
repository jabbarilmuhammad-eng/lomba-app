"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   Guidebook Modal – konten panduan teknis
   ───────────────────────────────────────────────────────── */
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
};

export default function HomeHero() {
  const [modalOpen, setModalOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  /* ── Escape key untuk modal ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    if (modalOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  /* ── Parallax efek scroll ringan (dinonaktifkan di HP) ── */
  useEffect(() => {
    // Deteksi apakah HP
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Cek prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleScroll = () => {
      if (isMobile.current || prefersReduced || !bgRef.current) return;
      const scrollY = window.scrollY;
      // 0.35x parallax: bg bergerak lebih lambat
      bgRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleDownloadGuidebook = () => {
    const data = GUIDES.olimpiade;
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

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section
        id="beranda"
        className="relative w-full overflow-hidden h-[420px] md:h-[clamp(420px,41vw,860px)]"
        aria-label="Hero ARMASO 2027"
      >
        {/* Background Image dengan parallax */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none home-parallax-bg"
          /* skala sedikit lebih besar supaya parallax tidak memunculkan tepi */
          style={{ top: "-8%", height: "116%" }}
        >
          <Image
            src="/images/home/hero-bg.svg"
            alt="Latar pemandangan gurun ARMASO 2027"
            fill
            priority
            className="object-cover object-bottom"
            sizes="100vw"
          />
        </div>

        {/* Gradasi lembut bawah hero → menyambung ke section berikutnya */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #1c0a00 100%)",
          }}
        />

        {/* ─── Judul ARMASO: fade-up saat muat + glow berdenyut ─── */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[38%] md:top-[30%] -translate-y-1/2 w-full text-center px-4 pointer-events-auto">
          <h1
            className="font-jaro font-normal tracking-normal [font-synthesis:none] leading-none select-none inline-block home-fade-up home-title-glow"
            style={{
              fontFamily: "var(--font-home-jaro), 'Jaro', sans-serif",
              fontSize: "clamp(48px, 7.9vw, 121px)",
              fontWeight: 400,
              fontSynthesis: "none",
              WebkitFontSmoothing: "antialiased",
              letterSpacing: "normal",
              color: "#ffb206",
            }}
          >
            ARMASO
          </h1>
        </div>

        {/* ─── Tagline ─── */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[52%] md:top-[42%] -translate-y-1/2 w-full text-center px-4 pointer-events-auto">
          <p
            className="font-jomhuria font-normal tracking-normal [font-synthesis:none] leading-none select-none text-white whitespace-nowrap inline-block home-fade-up home-fade-up-delay-1"
            style={{
              fontFamily: "var(--font-home-jomhuria), 'Jomhuria', sans-serif",
              fontSize: "clamp(28px, 3.4vw, 52px)",
              fontWeight: 400,
              fontSynthesis: "none",
              WebkitFontSmoothing: "antialiased",
              letterSpacing: "normal",
              color: "#ffffff",
            }}
          >
            ETERNAL WISDOM, MODERN BRILLIANCE
          </p>
        </div>

        {/* ─── Tombol CTA ─── */}
        {/*
            Lebar mengikuti isi konten (no w-full / fixed width yang terlalu kecil).
            Desktop: px-8, min-w-[150px] DAFTAR / min-w-[190px] GUIDEBOOK, h-9 (36px).
            HP:      px-6, min-w-[110px] / min-w-[140px], h-8 (32px).
            whitespace-nowrap mencegah teks menyentuh tepi pil.
        */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[70%] md:top-[56%] -translate-y-1/2 flex items-center justify-center gap-3 md:gap-[4vw] w-full px-4 pointer-events-auto">
          <Link
            href="/register"
            id="home-hero-btn-daftar"
            className="
              home-btn-pill home-fade-up home-fade-up-delay-2
              inline-flex items-center justify-center
              whitespace-nowrap
              h-8 md:h-9
              px-6 md:px-8
              min-w-[110px] md:min-w-[150px]
              rounded-full
              font-poppins font-black text-black bg-[#ffb206]
              shadow-md
            "
            style={{
              fontFamily: "var(--font-home-poppins), 'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(13px, 1.1vw, 15px)",
            }}
          >
            DAFTAR
          </Link>

          <button
            type="button"
            id="home-hero-btn-guidebook"
            onClick={() => setModalOpen(true)}
            className="
              home-btn-pill home-fade-up home-fade-up-delay-3
              inline-flex items-center justify-center
              whitespace-nowrap
              h-8 md:h-9
              px-6 md:px-8
              min-w-[140px] md:min-w-[190px]
              rounded-full
              font-poppins font-black text-black bg-[#ffb206]
              shadow-md cursor-pointer
            "
            style={{
              fontFamily: "var(--font-home-poppins), 'Poppins', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(13px, 1.1vw, 15px)",
            }}
          >
            GUIDEBOOK
          </button>
        </div>
      </section>

      {/* ─── Guidebook Modal ─── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
          aria-modal="true"
          role="dialog"
          aria-label="Guidebook Olimpiade ARMASO 2027"
        >
          <div
            className="relative w-full max-w-lg rounded-2xl p-6 bg-[#1c0a00] border-2 border-[#efbb52] max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white/70 hover:text-white text-xl p-1"
              aria-label="Tutup modal"
              onClick={() => setModalOpen(false)}
            >
              <i className="fa-solid fa-xmark" />
            </button>
            <h2
              className="font-poppins font-bold text-lg mb-2"
              style={{ color: "#ffb206" }}
            >
              {GUIDES.olimpiade.title}
            </h2>
            <p className="font-poppins text-sm text-white/70 mb-4">
              Pelajari ketentuan teknis lomba, silabus materi, format penilaian, dan tata tertib kompetisi.
            </p>
            <pre
              className="font-mono text-xs text-white/90 whitespace-pre-wrap p-4 rounded-lg overflow-y-auto bg-black/80 border border-[#efbb52] max-h-[300px]"
            >
              {GUIDES.olimpiade.content}
            </pre>
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                type="button"
                id="home-guidebook-download-btn"
                onClick={handleDownloadGuidebook}
                className="font-poppins font-bold text-sm px-5 py-2 rounded-full text-black transition hover:brightness-110 flex items-center gap-2"
                style={{ backgroundColor: "#ffb206" }}
              >
                <i className="fa-solid fa-download" /> Unduh File (.txt)
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="font-poppins font-medium text-sm px-5 py-2 rounded-full text-white transition hover:bg-white/10 border border-[#efbb52]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
