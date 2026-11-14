
/**
 * Cara menambah/menghapus sponsor:
 * 1. Simpan file logo di frontend/public/images/home/sponsors/.
 * 2. Tambahkan/hapus satu objek pada array `sponsors` di bawah.
 * 3. `logo` memakai path dari folder public,
 *    misalnya `/images/home/sponsors/contoh.png`.
 * 4. `link` opsional; isi hanya jika sponsor memberikan URL resmi yang benar.
 *
 * Semua sponsor ditampilkan dalam satu kontainer utama
 * tanpa pembagian kategori.
 *
 * Jangan mengisi data sponsor contoh sebelum nama/logo/tautannya dikonfirmasi.
 */

export interface Sponsor {
  name: string;
  logo: string;
  link?: string;
}

// Mulai dari array kosong hingga data sponsor resmi tersedia.
export const sponsors: Sponsor[] = [
  {
    name: "Contoh",
    logo: "/images/home/sponsors/ricco.png",
  },
];
