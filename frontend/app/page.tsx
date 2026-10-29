"use client";

import React, { useState, useEffect, useRef } from "react";
import HomeNavbar from "@/components/home/HomeNavbar";
import HomeHero from "@/components/home/HomeHero";
import HomePapanInfo from "@/components/home/HomePapanInfo";
import HomeAbout from "@/components/home/HomeAbout";
import HomeCompetition from "@/components/home/HomeCompetition";
// Komponen Batch B dan seterusnya akan ditambahkan di sini.
// Modal Guidebook & GAS telah dipindahkan ke components/home/legacy/GuidebookModal.tsx

// ── Countdown lama — AKAN dihapus di Batch B saat HomeCountdownQuota siap ──
const TARGET_DATE = new Date("2027-01-23T08:00:00+07:00").getTime();

export default function Home() {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // IntersectionObserver — ungkap elemen home-reveal saat masuk layar
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observe = () => {
      const targets = document.querySelectorAll(".home-reveal:not(.home-revealed)");
      if (!targets.length) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("home-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      targets.forEach((el) => observer.observe(el));
      return observer;
    };

    const obs = observe();
    return () => obs?.disconnect();
  }, []);

  // Countdown lama — akan dihapus di Batch B
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;
      if (difference <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }
      const d = Math.floor(difference / 86400000);
      const h = Math.floor((difference % 86400000) / 3600000);
      const m = Math.floor((difference % 3600000) / 60000);
      const s = Math.floor((difference % 60000) / 1000);
      setCountdown({
        days: d < 10 ? `0${d}` : `${d}`,
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        seconds: s < 10 ? `0${s}` : `${s}`,
      });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── Navbar & Hero ── */}
      <HomeNavbar />
      <HomeHero />

      {/* ── Papan Informasi ── */}
      <HomePapanInfo />

      {/* ── About ── */}
      <HomeAbout />

      {/* ── Our Competition ── */}
      <HomeCompetition />

      {/* ────────────────────────────────────────────────────────
          BAGIAN LAMA — akan digantikan di Batch B & C
          (Timeline, Countdown+Kuota, Sponsors, Footer baru)
          ──────────────────────────────────────────────────────── */}

      {/* COUNTDOWN LAMA — akan dihapus di Batch B */}
      <section
        id="hitung-mundur"
        style={{
          background: "#1c0a00",
          padding: "3.5rem 1rem 3rem",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "64px", background: "linear-gradient(to bottom, transparent, #080604)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p className="home-reveal home-reveal-stagger-1" style={{ fontFamily: "var(--font-home-poppins),'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(10px,1.2vw,13px)", letterSpacing: "0.25em", textTransform: "uppercase", color: "#efbb52", marginBottom: "0.5rem" }}>
            <i className="fa-regular fa-clock" style={{ marginRight: "6px" }} />
            Hitung Mundur Perhelatan
          </p>
          <h2 className="home-reveal home-reveal-stagger-2" style={{ fontFamily: "var(--font-home-jaro),'Jaro',sans-serif", fontWeight: 400, fontSynthesis: "none", fontSize: "clamp(22px,3.2vw,46px)", color: "#ffb206", lineHeight: 1.1, marginBottom: "0.6rem" }}>
            MENUJU BABAK UTAMA ARMASO 2027
          </h2>
          <p className="home-reveal home-reveal-stagger-2" style={{ fontFamily: "var(--font-home-poppins),'Poppins',sans-serif", fontWeight: 300, fontSize: "clamp(12px,1.2vw,15px)", color: "rgba(255,255,255,0.85)", marginBottom: "2.5rem" }}>
            23 Januari 2027 &bull; Pondok Pesantren Modern Ar Rahmat Bojonegoro
          </p>
          <div className="home-reveal home-reveal-stagger-3" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "clamp(8px,1.5vw,20px)", maxWidth: "640px", margin: "0 auto" }}>
            {[
              { num: countdown.days, label: "HARI" },
              { num: countdown.hours, label: "JAM" },
              { num: countdown.minutes, label: "MENIT" },
              { num: countdown.seconds, label: "DETIK" },
            ].map(({ num, label }) => (
              <div key={label} style={{ background: "rgba(28,10,0,0.7)", border: "2px solid #efbb52", borderRadius: "16px", padding: "clamp(12px,2vw,24px) clamp(8px,1.5vw,16px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <span style={{ fontFamily: "var(--font-home-poppins),'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4.5vw,60px)", color: "#ffb206", lineHeight: 1 }}>{num}</span>
                <span style={{ fontFamily: "var(--font-home-poppins),'Poppins',sans-serif", fontWeight: 400, fontSize: "clamp(9px,1vw,12px)", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER LAMA — akan digantikan di Batch C */}
      <footer
        id="kontak"
        style={{ background: "#080604", borderTop: "1px solid rgba(239,187,82,0.15)", padding: "3rem 1rem 2rem" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "2rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-home-poppins),'Poppins',sans-serif", fontWeight: 700, color: "#ffb206", marginBottom: "0.5rem" }}>ARMASO 2027</p>
            <p style={{ fontFamily: "var(--font-home-poppins),'Poppins',sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
              Ar-Rahmat Mathematic, Science, Social Olympiad &amp; Sport Competition
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-home-poppins),'Poppins',sans-serif", fontWeight: 700, color: "#efbb52", marginBottom: "0.5rem" }}>Lokasi &amp; Narahubung</p>
            <p style={{ fontFamily: "var(--font-home-poppins),'Poppins',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
              Pondok Pesantren Modern Ar Rahmat<br />
              Jl. Untung Suropati No. 48, Bojonegoro, Jawa Timur
            </p>
          </div>
        </div>
        <div style={{ maxWidth: "1280px", margin: "2rem auto 0", borderTop: "1px solid rgba(239,187,82,0.12)", paddingTop: "1rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-home-poppins),'Poppins',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            &copy; 2026 ARMASO | All Rights Reserved. | Eternal Wisdom, Modern Brilliance.
          </p>
        </div>
      </footer>
    </>
  );
}
