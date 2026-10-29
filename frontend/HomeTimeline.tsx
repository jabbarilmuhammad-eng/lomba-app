"use client";

// HomeTimeline.tsx — Section "Timeline" (Batch B)
// Data diambil dari ./data/timeline.ts (edit jadwal di sana, bukan di file ini).
//
// Desktop (>= lg): jalur putih berkelok 3 / 2 / 3 item. Seluruh ukuran memakai satuan cqw
//   (lebar kontainer = 100cqw) pada kanvas desain 1100 x 860, jadi proporsinya tetap di semua lebar layar.
// HP / tablet (< lg): daftar vertikal kronologis dengan garis di kiri.

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  TIMELINE_ITEMS,
  type TimelineItem,
  type TimelineTrack,
} from "./data/timeline";
import { useReveal } from "./useReveal";

/* ───────── Kanvas desain desktop (px desain, diskalakan dengan cqw) ───────── */
const W = 1100;
const H = 860;
const ROW_Y = { 1: 330, 2: 565, 3: 800 } as const; // posisi garis jalur tiap baris
const PATH_L = 90;
const PATH_R = 1010;
const PATH_RADIUS = 50;
const ITEM_W = 150;
const ITEM_H = 215;

/** px desain -> cqw (lebar kontainer = 100cqw) */
const cq = (px: number) => `${((px / W) * 100).toFixed(4)}cqw`;

const GOLD = "#c98f3a";
const FILL: Record<TimelineTrack, string> = {
  science: "linear-gradient(90deg, #1b4146 0%, #235a60 100%)",
  sport: "linear-gradient(90deg, #9a3300 0%, #ff6d00 100%)",
};
const TRACK_NAME: Record<TimelineTrack, string> = {
  science: "Science",
  sport: "Sport",
};

const LABEL_CLIP = "polygon(9% 0, 91% 0, 100% 50%, 91% 100%, 9% 100%, 0 50%)";
const DATE_CLIP = "polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)";
const BANNER_CLIP = "polygon(7% 0, 93% 0, 100% 50%, 93% 100%, 7% 100%, 0 50%)";

/** Jalur putih: kanan di baris 1, kembali ke kiri di baris 2, kanan lagi di baris 3. */
const PATH_D = [
  `M ${PATH_L} ${ROW_Y[1]}`,
  `H ${PATH_R - PATH_RADIUS}`,
  `A ${PATH_RADIUS} ${PATH_RADIUS} 0 0 1 ${PATH_R} ${ROW_Y[1] + PATH_RADIUS}`,
  `V ${ROW_Y[2] - PATH_RADIUS}`,
  `A ${PATH_RADIUS} ${PATH_RADIUS} 0 0 1 ${PATH_R - PATH_RADIUS} ${ROW_Y[2]}`,
  `H ${PATH_L + PATH_RADIUS}`,
  `A ${PATH_RADIUS} ${PATH_RADIUS} 0 0 0 ${PATH_L} ${ROW_Y[2] + PATH_RADIUS}`,
  `V ${ROW_Y[3] - PATH_RADIUS}`,
  `A ${PATH_RADIUS} ${PATH_RADIUS} 0 0 0 ${PATH_L + PATH_RADIUS} ${ROW_Y[3]}`,
  `H ${PATH_R}`,
].join(" ");

/** Bentuk dengan bingkai emas: lapisan luar emas, lapisan dalam berisi warna jalur. */
function Plate({
  clip,
  fill,
  style,
  children,
}: {
  clip: string;
  fill: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className="absolute" style={{ ...style, clipPath: clip, background: GOLD }}>
      <div
        className="absolute flex flex-col items-center justify-center text-center"
        style={{ inset: cq(2), clipPath: clip, background: fill }}
      >
        {children}
      </div>
    </div>
  );
}

function LegendBanner({ track, left }: { track: TimelineTrack; left: number }) {
  return (
    <Plate
      clip={BANNER_CLIP}
      fill={FILL[track]}
      style={{ left: cq(left), top: 0, width: cq(400), height: cq(66) }}
    >
      <span className="font-jaro leading-none text-white" style={{ fontSize: cq(44) }}>
        {TRACK_NAME[track].toUpperCase()}
      </span>
    </Plate>
  );
}

function DesktopItem({
  item,
  index,
  shown,
}: {
  item: TimelineItem;
  index: number;
  shown: boolean;
}) {
  const { row, x } = item.desktop;
  const fill = FILL[item.track];
  const threeLines = item.dateLines.length > 2;
  const longTitle = item.title.length > 14;

  return (
    <div
      className={`absolute transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        left: cq(x - ITEM_W / 2),
        top: cq(ROW_Y[row] - ITEM_H),
        width: cq(ITEM_W),
        height: cq(ITEM_H),
        transitionDelay: `${index * 90}ms`,
      }}
    >
      {/* Maskot (sebagian tertutup label di bawahnya) */}
      <div className="absolute inset-x-0 top-0" style={{ height: cq(116) }}>
        <Image
          src={item.mascot}
          alt=""
          fill
          sizes="(min-width: 1024px) 14vw, 100px"
          className="object-contain object-bottom"
        />
      </div>

      {/* Label judul */}
      <Plate
        clip={LABEL_CLIP}
        fill={fill}
        style={{ left: 0, top: cq(100), width: cq(ITEM_W), height: cq(30) }}
      >
        <span
          className="font-poppins whitespace-nowrap font-bold leading-none text-white"
          style={{ fontSize: cq(longTitle ? 10.5 : 12.5) }}
        >
          {item.title}
        </span>
      </Plate>

      {/* Kotak tanggal (ujung bawah runcing menyentuh jalur) */}
      <Plate
        clip={DATE_CLIP}
        fill={fill}
        style={{
          left: cq(21),
          top: cq(130),
          width: cq(ITEM_W - 42),
          height: cq(ITEM_H - 130),
        }}
      >
        <div className="flex flex-col items-center" style={{ paddingBottom: cq(12) }}>
          {item.dateLines.map((line) => (
            <span
              key={line}
              className="font-poppins block whitespace-nowrap font-bold leading-[1.25] text-white"
              style={{ fontSize: cq(threeLines ? 9.2 : 13) }}
            >
              {line}
            </span>
          ))}
        </div>
      </Plate>
    </div>
  );
}

function MobileItem({
  item,
  index,
  shown,
}: {
  item: TimelineItem;
  index: number;
  shown: boolean;
}) {
  return (
    <li
      className={`relative transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${Math.min(index, 5) * 70}ms` }}
    >
      {/* Titik pada garis */}
      <span
        aria-hidden="true"
        className="absolute -left-9 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-[3px]"
        style={{ background: FILL[item.track], borderColor: GOLD }}
      />
      <div
        className="flex items-center gap-3 rounded-2xl border-2 p-3"
        style={{ background: FILL[item.track], borderColor: GOLD }}
      >
        <div className="relative h-16 w-16 shrink-0">
          <Image src={item.mascot} alt="" fill sizes="64px" className="object-contain" />
        </div>
        <div className="min-w-0">
          <p className="font-poppins m-0 text-xs font-medium text-[#efbb52]">
            {TRACK_NAME[item.track]}
          </p>
          <p className="font-poppins m-0 text-base font-bold leading-tight text-white">
            {item.title}
          </p>
          <p className="font-poppins m-0 text-sm font-semibold text-white/90">
            {item.dateLines.join(" ")}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function HomeTimeline() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-[#1c0a00] px-4 pb-28 pt-16 md:pb-36 md:pt-24"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <h2 className="font-jaro mb-10 text-center text-[clamp(40px,4.44vw,68px)] leading-none text-[#ffb206] md:mb-14">
          TIMELINE
        </h2>

        <div ref={ref}>
          {/* ───── Desktop ───── */}
          <div
            className="relative mx-auto hidden w-full lg:block"
            style={{ containerType: "inline-size", aspectRatio: `${W} / ${H}` }}
          >
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={PATH_D}
                stroke="#ffffff"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                className="[stroke-dasharray:1] transition-[stroke-dashoffset] delay-200 duration-[1800ms] ease-out motion-reduce:transition-none"
                style={{ strokeDashoffset: shown ? 0 : 1 }}
              />
            </svg>

            <LegendBanner track="science" left={30} />
            <LegendBanner track="sport" left={W - 30 - 400} />

            {TIMELINE_ITEMS.map((item, index) => (
              <DesktopItem key={item.id} item={item} index={index} shown={shown} />
            ))}
          </div>

          {/* ───── HP & tablet ───── */}
          <div className="lg:hidden">
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {(["science", "sport"] as const).map((track) => (
                <span
                  key={track}
                  className="font-jaro rounded-full border-2 px-6 py-1.5 text-2xl leading-none text-white"
                  style={{ background: FILL[track], borderColor: GOLD }}
                >
                  {TRACK_NAME[track].toUpperCase()}
                </span>
              ))}
            </div>

            <ol className="relative mx-auto max-w-md list-none space-y-4 pl-9">
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-[11px] top-3 w-[3px] rounded-full bg-white/70"
              />
              {TIMELINE_ITEMS.map((item, index) => (
                <MobileItem key={item.id} item={item} index={index} shown={shown} />
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Peralihan halus ke section hitam di bawahnya */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[117px] bg-gradient-to-b from-transparent to-black"
      />
    </section>
  );
}
