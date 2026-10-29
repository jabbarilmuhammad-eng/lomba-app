"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HomeHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  /* ── Parallax hanya pada layer latar, bukan pada judul ── */
  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleScroll = () => {
      if (isMobile.current || prefersReduced || !bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section
      id="beranda"
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(380px, 41vw, 860px)" }}
      aria-label="Hero ARMASO 2027"
    >
      {/* ── Layer 1: Background (parallax via JS, hanya elemen ini) ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full pointer-events-none select-none home-parallax-bg"
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

      {/* ── Layer 2: Gradasi bawah → menyambung ke section berikutnya ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, transparent 0%, #1c0a00 100%)",
          zIndex: 2,
        }}
      />

      {/*
        ── Layer 3: Wrapper STATIS pemusatan — TIDAK dianimasikan ──
        Tugasnya hanya menempatkan gambar di tengah secara tepat.
        Menggunakan inset-x-0 + flex justify-center agar tidak ada konflik transform.
        top: 40% mendekati posisi bawah matahari di hero-bg.svg.
      */}
      <div
        className="absolute inset-x-0 flex justify-center pointer-events-none select-none"
        style={{
          top: "40%",
          transform: "translateY(-50%)",
          zIndex: 3,
        }}
      >
        {/*
          ── Elemen ANAK: hanya anak yang dianimasikan ──
          Animasi: fade-up (opacity 0→1 + translateY 16px→0)
                   lalu setelah selesai: glow drop-shadow berdenyut
          TIDAK menggunakan translateX / left / margin negatif.
          Lebar: ~55vw desktop, ~88vw HP, maks 1100px.
        */}
        <div
          className="home-hero-title-img"
          style={{
            width: "min(88vw, clamp(280px, 55vw, 1100px))",
          }}
        >
          <Image
            src="/images/home/hero-title.png"
            alt="ARMASO 2027"
            width={1100}
            height={470}
            priority
            className="w-full h-auto object-contain"
            sizes="(max-width: 767px) 88vw, 55vw"
          />
        </div>
      </div>
    </section>
  );
}
