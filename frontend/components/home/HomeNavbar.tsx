"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#beranda" },
  { label: "Olympiad", href: "/register/science" },
  { label: "Futsal Competition", href: "/register/futsal" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#kontak" },
];

/* ───────── Pengaturan efek "dynamic island" (ubah di sini) ───────── */
const SCROLL_THRESHOLD = 40; // px scroll sebelum navbar berubah jadi pulau melayang
const ANCHOR_OFFSET = 76; // jarak berhenti saat klik menu (tinggi pulau + celah atasnya)
const ISLAND_WIDTH = "min(1040px, calc(100% - 24px))";

/** Tampilan normal (di paling atas): bar hitam selebar layar. */
const BAR_STYLE: CSSProperties = {
  width: "100%",
  height: "clamp(64px, 5vw, 80px)",
  borderRadius: 0,
  background: "rgba(0, 0, 0, 1)",
  backdropFilter: "blur(0px)",
  WebkitBackdropFilter: "blur(0px)",
  border: "1px solid rgba(239, 187, 82, 0)",
  boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
};

/** Tampilan saat di-scroll: pulau melayang, blur, sudut membulat. */
const ISLAND_STYLE: CSSProperties = {
  width: ISLAND_WIDTH,
  height: "clamp(52px, 3.8vw, 60px)",
  borderRadius: 32,
  background: "rgba(10, 4, 0, 0.55)",
  backdropFilter: "blur(16px) saturate(140%)",
  WebkitBackdropFilter: "blur(16px) saturate(140%)",
  border: "1px solid rgba(239, 187, 82, 0.28)",
  boxShadow: "0 10px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
};

/* Status scroll lewat useSyncExternalStore: aman untuk SSR dan langsung benar saat halaman dimuat di tengah scroll. */
function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const getServerScrolled = () => false;

export default function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLElement>(null);
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // Di halaman selain beranda, link anchor diarahkan ke beranda (mis. "#about" -> "/#about").
  const resolveHref = (href: string) => {
    // Link anchor
    if (href.startsWith("#")) {
      return isHome ? href : `/${href}`;
    }

    // Link halaman yang sudah menggunakan absolute path
    return href;
  };
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
    if (!href.startsWith("#")) return;
    e.preventDefault();

    const el = document.querySelector(href);
    if (el) {
      // Section ada di halaman ini: gulir halus. Navbar melayang di atas konten,
      // jadi berhenti sedikit di bawahnya (kecuali menuju "Home").
      const offset = href === "#beranda" ? 0 : ANCHOR_OFFSET;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    } else if (isHome) {
      if (href === "#beranda") window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Section tidak ada di halaman ini: pindah ke beranda.
      router.push(resolveHref(href));
    }
  };

  return (
    // <header> tetap di alur halaman sebagai penjaga ruang (tinggi sama dengan bar normal),
    // sehingga layout di bawahnya tidak bergeser. Bar/pulau yang terlihat menempel (fixed) di dalamnya.
    <header
      ref={navContainerRef}
      id="home-navbar"
      className="relative z-50 w-full"
      style={{ height: "clamp(64px, 5vw, 80px)" }}
    >
      <div
        className="fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ paddingTop: scrolled ? 12 : 0 }}
      >
        {/* ─── Bar / Pulau ─── */}
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={scrolled ? ISLAND_STYLE : BAR_STYLE}
        >
          <div
            className={`mx-auto flex h-full w-full items-center justify-between ${scrolled ? "px-4 sm:px-5 lg:px-7" : "max-w-7xl px-4 sm:px-6 lg:px-10"
              }`}
          >
            {/* ─── Brand Logo ─── */}
            <Link
              href={resolveHref("#beranda")}
              onClick={(e) => handleNavClick(e, "#beranda")}
              className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
              aria-label="ARMASO 2027 – Beranda"
            >
              <Image
                src="/images/home/logo-armaso.png"
                alt="Logo Sayap ARMASO"
                width={150}
                height={60}
                className={`block h-auto shrink-0 object-contain transition-[width] duration-500 motion-reduce:transition-none ${scrolled
                  ? "w-[84px] max-w-[150px] md:w-[104px]"
                  : "w-[110px] max-w-[150px] md:w-[150px]"
                  }`}
                priority
              />
              <span
                className={`font-poppins select-none whitespace-nowrap font-bold tracking-normal ${scrolled ? "text-sm md:hidden lg:inline lg:text-lg" : "text-sm md:text-xl"
                  }`}
                style={{ color: "#eba037" }}
              >
                ARMASO 2027
              </span>
            </Link>

            {/* ─── Desktop Navigation ─── */}
            <nav
              className={`hidden items-center md:flex ${scrolled ? "gap-5 lg:gap-7" : "gap-8 lg:gap-10"
                }`}
              aria-label="Navigasi utama beranda"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={resolveHref(link.href)}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-poppins whitespace-nowrap font-bold text-white transition-colors duration-200 hover:text-[#eba037] ${scrolled ? "text-sm" : "text-sm lg:text-base"
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ─── Hamburger (Mobile) ─── */}
            <button
              type="button"
              className="flex min-h-[44px] min-w-[44px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-md p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eba037] md:hidden"
              aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={menuOpen}
              aria-controls="home-mobile-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span
                className={`block h-[2px] w-6 origin-center bg-white transition-all duration-300 ${menuOpen ? "translate-y-[8px] rotate-45" : ""
                  }`}
              />
              <span
                className={`block h-[2px] w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`block h-[2px] w-6 origin-center bg-white transition-all duration-300 ${menuOpen ? "-translate-y-[8px] -rotate-45" : ""
                  }`}
              />
            </button>
          </div>
        </div>

        {/* ─── Mobile Menu Panel (di luar pulau, supaya blurnya sendiri tetap bekerja) ─── */}

        {/* ─── Mobile Menu Panel: Dynamic Island ─── */}
        {menuOpen && (
          <div
            id="home-mobile-menu"
            className="absolute inset-x-0 top-full md:hidden"
          >
            <div
              className="mx-auto mt-2 overflow-hidden px-6 py-4 shadow-2xl"
              style={{
                width: ISLAND_WIDTH,
                borderRadius: 32,
                background: "rgba(10, 4, 0, 0.62)",
                backdropFilter: "blur(16px) saturate(140%)",
                WebkitBackdropFilter: "blur(16px) saturate(140%)",
                border: "1px solid rgba(239, 187, 82, 0.28)",
                boxShadow:
                  "0 10px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
              }}
            >
              <nav
                className="flex flex-col"
                aria-label="Navigasi mobile beranda"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={resolveHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-poppins block border-b border-white/10 py-3 text-center text-base font-bold text-white transition-colors last:border-b-0 hover:text-[#eba037]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
