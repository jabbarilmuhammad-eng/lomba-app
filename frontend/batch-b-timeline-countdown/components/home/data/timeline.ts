/**
 * DATA TIMELINE — satu-satunya tempat yang perlu diedit untuk mengganti jadwal.
 *
 * - Urutan array = urutan kronologis (dipakai untuk tampilan HP).
 * - title      : tulisan di label atas.
 * - dateLines  : isi kotak tanggal, satu elemen = satu baris.
 * - mascot     : file di frontend/public/images/home/timeline/
 * - desktop    : posisi pada jalur berkelok (row 1 sampai 3, x = titik tengah item
 *                pada kanvas desain selebar 1100). Ubah hanya jika ingin memindahkan item.
 */

export type TimelineTrack = "science" | "sport";

export interface TimelineItem {
  id: string;
  track: TimelineTrack;
  title: string;
  dateLines: string[];
  mascot: string;
  desktop: { row: 1 | 2 | 3; x: number };
}

const MASCOT_DIR = "/images/home/timeline";

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: "science-pendaftaran",
    track: "science",
    title: "Pendaftaran",
    dateLines: ["07 November 2026", "s/d", "09 Januari 2027"],
    mascot: `${MASCOT_DIR}/maskot-3.png`,
    desktop: { row: 1, x: 90 },
  },
  {
    id: "sport-pendaftaran",
    track: "sport",
    title: "Pendaftaran",
    dateLines: ["07 November 2026", "s/d", "Kuota Habis"],
    mascot: `${MASCOT_DIR}/maskot-1.png`,
    desktop: { row: 1, x: 486 },
  },
  {
    id: "science-technical-meeting",
    track: "science",
    title: "Technical Meeting",
    dateLines: ["10 Januari", "2027"],
    mascot: `${MASCOT_DIR}/maskot-5.png`,
    desktop: { row: 1, x: 936 },
  },
  {
    id: "sport-technical-meeting",
    track: "sport",
    title: "Technical Meeting",
    dateLines: ["10 Januari", "2027"],
    mascot: `${MASCOT_DIR}/maskot-2.png`,
    desktop: { row: 2, x: 789 },
  },
  {
    id: "science-penyisihan",
    track: "science",
    title: "Penyisihan",
    dateLines: ["16 Januari", "2027"],
    mascot: `${MASCOT_DIR}/maskot-7.png`,
    desktop: { row: 2, x: 384 },
  },
  {
    id: "science-semifinal-final",
    track: "science",
    title: "Semi Final & Final",
    dateLines: ["17 Januari", "2027"],
    mascot: `${MASCOT_DIR}/maskot-8.png`,
    desktop: { row: 3, x: 232 },
  },
  {
    id: "sport-knockout",
    track: "sport",
    title: "Knockout Stage",
    dateLines: ["23 Januari", "2027"],
    mascot: `${MASCOT_DIR}/maskot-4.png`,
    desktop: { row: 3, x: 591 },
  },
  {
    id: "sport-semifinal-final",
    track: "sport",
    title: "Semi Final & Final",
    dateLines: ["24 Januari", "2027"],
    mascot: `${MASCOT_DIR}/maskot-6.png`,
    desktop: { row: 3, x: 1006 },
  },
];
