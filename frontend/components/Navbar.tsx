"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine active route
  const isHome = pathname === "/";
  const isOlimpiade =
    pathname.startsWith("/register/olimpiade") ||
    pathname.startsWith("/register/science");
  const isFutsal = pathname.startsWith("/register/futsal");

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link href="/" className="brand-logo" onClick={closeMenu} aria-label="Beranda ARMASO 2027">
          <img
            src="/Logo_Armaso_Final-Sayap.svg"
            alt="Logo Sayap ARMASO 2027"
            className="brand-logo-img"
            width={160}
            height={60}
          />
          <div className="brand-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              <span className="brand-title" style={{ fontSize: '1rem', fontWeight: 'bold' }}>ARMASO 2027</span>
            </div>
            <span className="brand-subtitle" style={{ fontSize: '0.65rem', opacity: 0.8, whiteSpace: 'nowrap' }}>AR-RAHMAT COMPETITION</span>
          </div>
        </Link>

        {/* Desktop & Mobile Navigation Menu */}
        <nav>
          <ul className={`nav-menu ${mobileMenuOpen ? "open" : ""}`} id="nav-menu">
            <li>
              <Link
                href="/"
                className={`nav-link ${isHome ? "active" : ""}`}
                onClick={closeMenu}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/#biaya-hadiah"
                className="nav-link"
                onClick={closeMenu}
              >
                Biaya &amp; Hadiah
              </Link>
            </li>
            <li>
              <Link
                href="/register/olimpiade"
                className={`nav-link ${isOlimpiade ? "active" : ""}`}
                onClick={closeMenu}
              >
                Olimpiade
              </Link>
            </li>
            <li>
              <Link
                href="/register/futsal"
                className={`nav-link ${isFutsal ? "active" : ""}`}
                onClick={closeMenu}
              >
                Kompetisi Futsal
              </Link>
            </li>
            <li>
              <Link
                href="/#tentang-kami"
                className="nav-link"
                onClick={closeMenu}
              >
                Tentang Ar-Rahmat
              </Link>
            </li>
            <li>
              <Link
                href="/#lokasi-kontak"
                className="nav-link"
                onClick={closeMenu}
              >
                Kontak &amp; Lokasi
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger Toggle (Mobile) */}
        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-label="Buka Menu Navigasi"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}