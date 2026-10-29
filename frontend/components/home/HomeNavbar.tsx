"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#beranda" },
  { label: "Olympiad", href: "#lomba" },
  { label: "Futsal Competition", href: "#lomba" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#kontak" },
];

export default function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLElement>(null);

  // Tutup menu saat klik di luar
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  // Tutup menu saat tombol Escape ditekan
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Tutup menu saat layar di-resize ke desktop (>= 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const offset = 0; // navbar tidak sticky, tidak perlu offset
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    // TIDAK sticky — navbar ikut ter-scroll seperti di Figma
    <header
      ref={navContainerRef}
      className="bg-black w-full"
      style={{ height: "clamp(64px, 5vw, 80px)" }}
      id="home-navbar"
    >
      {/*
        ── Container simetris ──
        Logo (kiri) dan nav links (kanan) berada di dalam SATU div ini.
        px-4/px-6/px-10 = padding sama di kiri dan kanan →
        jarak logo dari tepi kiri = jarak "Contact" dari tepi kanan.
        max-w-7xl = 1280px, di-tengah dengan mx-auto.
      */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-between h-full">

        {/* ─── Brand Logo ─── */}
        <Link
          href="#beranda"
          onClick={(e) => handleNavClick(e, "#beranda")}
          className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0"
          aria-label="ARMASO 2027 – Beranda"
        >
          {/*
            Lebar tampil: 110px HP, 150px desktop — max-w mencegah overflow.
            object-contain + shrink-0 memastikan tidak melar keluar container.
          */}
          <Image
            src="/images/home/logo-armaso.png"
            alt="Logo Sayap ARMASO"
            width={150}
            height={60}
            className="w-[110px] md:w-[150px] max-w-[150px] h-auto object-contain shrink-0 block"
            priority
          />
          <span
            className="font-poppins font-bold text-sm md:text-xl tracking-normal whitespace-nowrap select-none"
            style={{ color: "#eba037" }}
          >
            ARMASO 2027
          </span>
        </Link>

        {/* ─── Desktop Navigation ─── */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Navigasi utama beranda"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-poppins font-bold text-sm lg:text-base text-white hover:text-[#eba037] transition-colors duration-200 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ─── Hamburger (Mobile) ─── */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 min-w-[44px] min-h-[44px] shrink-0 text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eba037]"
          aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={menuOpen}
          aria-controls="home-mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>
      </div>

      {/* ─── Mobile Menu Panel ─── */}
      {menuOpen && (
        <div
          id="home-mobile-menu"
          className="md:hidden absolute left-0 right-0 top-full bg-black border-t border-[#efbb52]/30 px-6 py-4 shadow-2xl"
        >
          <nav className="flex flex-col" aria-label="Navigasi mobile beranda">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-3 text-base font-bold font-poppins text-white hover:text-[#eba037] border-b border-white/10 last:border-b-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="w-full mt-4 py-2.5 rounded-full text-center font-poppins font-black text-sm text-black bg-[#ffb206] hover:brightness-110 active:scale-95 transition-all block shadow-md"
          >
            DAFTAR
          </Link>
        </div>
      )}
    </header>
  );
}
