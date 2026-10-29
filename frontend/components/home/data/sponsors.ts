/**
 * Cara menambah/menghapus sponsor:
 * 1. Simpan file logo di frontend/public/images/sponsors/.
 * 2. Tambahkan/hapus satu objek pada array `sponsors` di bawah.
 * 3. `logo` memakai path dari folder public, misalnya `/images/sponsors/contoh.png`.
 * 4. `tier` harus salah satu dari `egyptian`, `diamond`, atau `gold`.
 * 5. `link` opsional; isi hanya jika sponsor memberikan URL resmi yang benar.
 *
 * Urutan tampilan kategori: Egyptian → Diamond → Gold.
 * Jangan mengisi data sponsor contoh sebelum nama/logo/tautannya dikonfirmasi.
 */

export type SponsorTier = "egyptian" | "diamond" | "gold";

export interface Sponsor {
  name: string;
  logo: string;
  tier: SponsorTier;
  link?: string;
}

export const SPONSOR_TIERS: {
  id: SponsorTier;
  label: string;
}[] = [
  { id: "egyptian", label: "Egyptian Sponsors" },
  { id: "diamond", label: "Diamond Sponsors" },
  { id: "gold", label: "Gold Sponsors" },
];

// Mulai dari array kosong hingga data sponsor resmi tersedia.
export const sponsors: Sponsor[] = [];
