"use client";

// HomeCountdownQuota.tsx — Section "Science Countdown" + "Sports Quota" (Batch B)
// Menggantikan section Hitung Mundur lama.
// - Target countdown : ./data/countdown.ts
// - Kuota Sport      : ./data/quota.ts (sisa = total - verified, minimum 0)

import { useEffect, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { SCIENCE_COUNTDOWN_TARGET } from "./data/countdown";
import {
  FUTSAL_QUOTA_REFRESH_MS,
  getFutsalQuota,
  remainingQuota,
  type FutsalQuota,
} from "./data/quota";
import { useReveal } from "./useReveal";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const TARGET_MS = new Date(SCIENCE_COUNTDOWN_TARGET).getTime();

/* ───────── Waktu: aman untuk SSR (server = null, klien = detik sekarang) ───────── */
function subscribeEverySecond(onTick: () => void) {
  const id = window.setInterval(onTick, SECOND);
  return () => window.clearInterval(id);
}
const getNowSeconds = (): number | null => Math.floor(Date.now() / SECOND);
const getServerNow = (): number | null => null;

function useCountdown() {
  const nowSeconds = useSyncExternalStore(subscribeEverySecond, getNowSeconds, getServerNow);
  if (nowSeconds === null || Number.isNaN(TARGET_MS)) return null;

  const diff = Math.max(0, TARGET_MS - nowSeconds * SECOND);
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
  };
}

/* ───────── Kuota: ambil saat dimuat lalu perbarui berkala ───────── */
function useFutsalQuota() {
  const [quota, setQuota] = useState<FutsalQuota | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const next = await getFutsalQuota(controller.signal);
        if (!controller.signal.aborted) setQuota(next);
      } catch {
        // Gagal/lambat: biarkan nilai terakhir tetap tampil (atau "-" jika belum pernah berhasil).
      }
    };

    void load();
    const id = window.setInterval(load, FUTSAL_QUOTA_REFRESH_MS);
    return () => {
      controller.abort();
      window.clearInterval(id);
    };
  }, []);

  return quota;
}

const pad = (value: number | undefined) =>
  value === undefined ? "--" : String(value).padStart(2, "0");

/* ───────── Potongan tampilan ───────── */
const OVAL_W = "w-[clamp(54px,6.66vw,102px)]";
const OVAL_H = "h-[clamp(74px,8.75vw,134px)]";

function Oval({ value, label }: { value: string; label: string }) {
  return (
    <div
      className={`${OVAL_W} ${OVAL_H} flex shrink-0 flex-col items-center overflow-hidden rounded-[999px] border-[3px] border-[#efbb52] bg-[#1c0a00]`}
    >
      <div className="flex w-full flex-[66] items-center justify-center">
        <span className="font-poppins text-[clamp(20px,2.6vw,40px)] font-bold leading-none tabular-nums text-[#ffb206]">
          {value}
        </span>
      </div>
      <div className="h-[2px] w-[60%] bg-[#ffb206]" />
      <div className="flex w-full flex-[34] items-center justify-center">
        <span className="font-poppins text-[clamp(9px,0.98vw,15px)] font-bold leading-none text-[#ffb206]">
          {label}
        </span>
      </div>
    </div>
  );
}

/** Titik dua sejajar dengan angka (bagian atas oval). */
function Colon() {
  return (
    <div className={`${OVAL_H} flex shrink-0 flex-col`} aria-hidden="true">
      <div className="flex flex-[66] items-center">
        <span className="font-poppins px-[clamp(2px,0.5vw,8px)] text-[clamp(16px,1.63vw,25px)] font-bold leading-none text-[#efbb52]">
          :
        </span>
      </div>
      <div className="flex-[34]" />
    </div>
  );
}

function Card({
  title,
  className,
  shown,
  delay,
  children,
}: {
  title: string;
  className: string;
  shown: boolean;
  delay: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-[31px] border-[3px] border-[#efbb52]/70 bg-[#1c0a00]/90 px-4 pb-8 pt-6 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none md:px-8 md:pb-10 md:pt-8 ${className} ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h2 className="font-poppins m-0 text-center text-[clamp(18px,1.63vw,25px)] font-bold leading-tight text-[#ffb206]">
        {title}
      </h2>
      <div className="flex flex-1 items-center justify-center pt-[clamp(20px,3vw,44px)]">
        {children}
      </div>
    </div>
  );
}

export default function HomeCountdownQuota() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const countdown = useCountdown();
  const quota = useFutsalQuota();

  const remaining = quota ? remainingQuota(quota) : null;

  return (
    <section id="info-lomba" className="relative bg-black px-4 py-12 md:py-16">
      <div
        ref={ref}
        className="mx-auto flex w-full max-w-[1425px] flex-col gap-6 lg:min-h-[330px] lg:flex-row lg:gap-10"
      >
        {/* Science Countdown */}
        <Card title="Science Countdown" className="lg:flex-[778]" shown={shown} delay={0}>
          <div role="timer" aria-label="Hitung mundur menuju Technical Meeting Science">
            <div className="flex items-start justify-center gap-[clamp(4px,1.1vw,16px)]">
              <Oval value={pad(countdown?.days)} label="Days" />
              <Colon />
              <Oval value={pad(countdown?.hours)} label="Hours" />
              <Colon />
              <Oval value={pad(countdown?.minutes)} label="Minutes" />
              <Colon />
              <Oval value={pad(countdown?.seconds)} label="Seconds" />
            </div>
          </div>
        </Card>

        {/* Sports Quota */}
        <Card title="Sports Quota" className="lg:flex-[607]" shown={shown} delay={120}>
          <Oval value={remaining === null ? "-" : String(remaining)} label="Teams" />
          <span className="sr-only" aria-live="polite">
            {quota
              ? `Sisa kuota Sport ${remaining} dari ${quota.total} tim`
              : "Memuat kuota Sport"}
          </span>
        </Card>
      </div>
    </section>
  );
}
