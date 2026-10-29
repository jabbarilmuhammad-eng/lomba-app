"use client";

import React, { useEffect } from "react";
import HomeNavbar from "@/components/home/HomeNavbar";
import HomeHero from "@/components/home/HomeHero";
import HomePapanInfo from "@/components/home/HomePapanInfo";
import HomeAbout from "@/components/home/HomeAbout";
import HomeCompetition from "@/components/home/HomeCompetition";
import HomeTimeline from "@/components/home/HomeTimeline";
import HomeCountdownQuota from "@/components/home/HomeCountdownQuota";
import HomeSponsors from "@/components/home/HomeSponsors";
import HomeFooter from "@/components/home/HomeFooter";

export default function Home() {
  // IntersectionObserver untuk animasi elemen saat masuk layar.
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const targets = document.querySelectorAll(
      ".home-reveal:not(.home-revealed)"
    );

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

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Navbar dan Hero: pertahankan komponen yang sudah ada */}
      <HomeNavbar />
      <HomeHero />

      {/* Papan Informasi */}
      <HomePapanInfo />

      {/* About */}
      <HomeAbout />

      {/* Our Competition */}
      <HomeCompetition />

      {/* Batch B: Timeline */}
      <HomeTimeline />

      {/* Batch B: Science Countdown dan Sports Quota */}
      <HomeCountdownQuota />

      <HomeSponsors />



      {/* Footer lama: dipertahankan sementara sampai Batch C */}
      <HomeFooter />
    </>
  );
}