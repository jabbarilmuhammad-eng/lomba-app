# Catatan Desain Beranda ARMASO 2027 (V2, FINAL)
Desain hanya versi DESKTOP (mobile dirancang sendiri). Abaikan label "FPS" dan toolbar Figma di screenshot.
Animasi: SAMA seperti header yang sudah dibuat (glow berdenyut, fade-in saat dimuat, hover naik pada tombol/kartu, parallax halus, reveal dari bawah saat scroll). Hormati prefers-reduced-motion.
Urutan: Navbar > Hero > Papan Informasi > About > Our Competition > Timeline > Countdown + Kuota > Sponsors > Footer
Anchor menu: Home = atas; Olympiad dan Futsal Competition = Our Competition; About Us = About; Contact = Footer.
Typo desain sudah diperbaiki di teks bawah (metematika, spasi "ARMASO (Ar-Rahmat", What's new, Committee, Seconds). Judul "PROVE" tampil mirip "PROUE" karena bentuk huruf V font Jaro; tulis PROVE.

## 1. NAVBAR (sudah dikerjakan, tidak berubah)
Logo sayap + teks "ARMASO 2027" TETAP ada (di Figma V2 terhapus tidak sengaja).
Menu: Home, Olympiad, Futsal Competition, About Us, Contact

## 2. HERO (latar tetap; JUDUL BERUBAH)
Judul = GAMBAR lettering "ARMASO 2027" (huruf teal bertepi emas dengan sayap kiri-kanan), bukan teks. 
Aset: figma-reference/assets/hero-tittle.png (PNG, nama file memang "tittle"). vector.svg adalah bingkai dekoratif, TIDAK dipakai sebagai judul.
Posisi: tengah, di bawah matahari. Animasi: glow emas berdenyut (drop-shadow).
Tombol DAFTAR dan GUIDEBOOK DIHAPUS dari hero. Tagline juga tidak ada (ikuti screenshot).
Pendaftaran dari beranda hanya lewat kartu di section Our Competition. Guidebook nanti dipindah ke halaman olimpiade dan sport (di luar tugas ini).
Screenshot: screenshots/01-hero.png

## 3. PAPAN INFORMASI (sama seperti sebelumnya)
BIAYA PENDAFTARAN: Olimpiade Rp 35k, Futsal Rp 150k | TOTAL HADIAH PEMBINAAN: Prize Pool Jutaan Rupiah | JANGKAUAN WILAYAH: SD/MI se-Jawa & Bali ("se-" jangan terputus)

## 4. ABOUT (screenshots 02 dan 03)
Kontainer besar (rounded, border emas, latar cokelat transparan) berisi:
a) Banner "ARMASO 2027" (Jaro emas, glow).
b) Kartu kiri "About ARMASO" (ikon atom):
- ARMASO (Ar-Rahmat Mathematic, Science, Social and Sport Olympiad) merupakan olimpiade sains sekaligus kompetisi futsal yang diadakan oleh Pondok Pesantren Modern Ar-Rahmat Bojonegoro.
- ARMASO hadir dengan empat cabang lomba, yaitu matematika, sains, sosial dan futsal, sebagai wadah untuk mengembangkan bakat dan minat para siswa. ARMASO bertujuan untuk menumbuhkan semangat kompetisi yang sehat, baik dalam bidang olahraga, maupun sains.
- Lebih dari sekadar adu pengetahuan, ARMASO melatih anak untuk berpikir kritis, memecahkan masalah, dan berkreasi. Lewat lomba futsal, mereka juga belajar bekerja sama, tangkas di lapangan, dan menjunjung tinggi sportivitas. Setiap anak punya tempat untuk bersinar.
c) Kartu kanan atas "What's new!?!" (ikon mata):
- Tahun ini, ARMASO resmi menghadirkan satu bidang baru, yaitu Sport Competition. Untuk pertama kalinya, peserta tidak hanya beradu nalar di Matematika, Sains, dan Sosial, tetapi juga unjuk ketangkasan di lapangan lewat cabang olahraga Futsal.
- Lewat Sport Competition, anak-anak belajar tentang sportivitas, kerja sama, dan semangat pantang menyerah. Cerdas di kelas, tangguh di lapangan!
d) Kartu kanan bawah "Kompetisi": kolom Sains (Matematika, Sains, Sosial) | garis emas vertikal | kolom Sport (Futsal)
Teks rata kanan-kiri (justify) di desktop, rata kiri di HP.

## 5. OUR COMPETITION (screenshots 04 dan 05)
Judul "OUR COMPETITION" (Jaro emas), sub "CHOOSE YOUR ARENA, PROVE YOUR BRILLIANCE" (Jaro putih).
Dua kartu gambar berbingkai pilar Mesir: "ARMASO SCIENCE" (obelisk + globe) dan "ARMASO SPORT" (piala emas). Matahari oranye di antara keduanya.
Kartu = LINK pendaftaran: SCIENCE -> /register/olimpiade, SPORT -> /register/futsal.
Hover dan focus-visible: kartu naik sedikit + glow emas (sekitar 300 ms).
Latar: gradasi dari cokelat #531901 (atas, siluet istana) ke peach (bawah), siluet kurma di kiri, piramida di dasar.

## 6. TIMELINE (jadwal terbaru, data di frontend/components/home/data/timeline.ts)
Science: Pendaftaran 07 November 2026 s/d 09 Januari 2027; Technical Meeting 10 Januari 2027; Penyisihan 16 Januari 2027; Semi Final & Final 17 Januari 2027.
Sport: Pendaftaran 07 November 2026 s/d Kuota Habis; Technical Meeting 10 Januari 2027; Knockout Stage 23 Januari 2027; Semi Final & Final 24 Januari 2027.
Maskot: maskot-1.png sampai maskot-8.png (public/images/home/timeline/).
## 7. COUNTDOWN + KUOTA (screenshot 08, dua kartu bersebelahan; menggantikan Hitung Mundur lama)
Kartu kiri "Science Countdown": 4 kotak oval Days : Hours : Minutes : Seconds, angka di atas garis emas, label di bawah.
Target Science Countdown: 10 Januari 2027 00:00 WIB (file data/countdown.ts, TODO konfirmasi)
Kartu kanan "Sports Quota": 1 kotak oval, angka = SISA kuota, label "Teams". Total 16 tim. Sisa = 16 - verified.
Sumber data: backend NestJS (lomba-app/backend), endpoint GET /api/quota/futsal. BELUM tentu ada, sedang dipastikan/dibuat oleh pemegang backend. Respons: {"total":16,"verified":N}. "verified" = jumlah tim futsal berstatus VERIFIED (termasuk pendaftaran offline yang dicatat VERIFIED). PENDING dan REJECTED tidak dihitung.
Beranda hanya menampilkan angka. Validasi batas 16 ada di backend. Minimum tampilan 0.

## 8. SPONSORS (screenshot 08, bawah)
Judul "Our Sponsors" dalam kontainer pil (border emas), di bawahnya kontainer besar untuk logo.
WAJIB FLEKSIBEL: data dari satu file konfigurasi (nama, logo, link, tingkat/ukuran), grid menyesuaikan jumlah (0 sampai banyak), logo rata tengah. Jika kosong tampilkan placeholder "Jadilah sponsor kami". Logo disimpan di public/images/sponsors/.

## 9. FOOTER (screenshot 09)
CONTACT PERSON: Ahmad Fairuz Zaqi Mumtaz (Head of Committee) +62 821-4753-9006; Fibellyno Arya Pratama (Technical Support) +62813-8187-9266; Hanun Tsurayya Breeanain Adzani(Sponsorship) +62 821-3651-1012. Nomor jadi link WhatsApp (wa.me).
FOLLOW US!: Instagram @armaso_arrahmat, YouTube @Ar Rahmat Official, TikTok @arrahmat.official (TODO URL).
LOCATION: Pondok Pesantren Modern Arrahmat Bojonegoro, Jl. Untung Suropati No. 48, Bojonegoro, Jawa Timur, badge "PPM Ar-Rahmat", tombol GET THE ROUTE! (TODO link Google Maps).
Bar bawah: logo sayap + "ARMASO 2027 / AR RAHMAT SCIENCE AND SPORT COMPETITION" | "© 2026 ARMASO | All Rights Reserved. | Eternal Wisdom, Modern Brilliance."

## ASET (nama file di figma-reference/assets/ -> fungsinya)
- [Emoji👀] -> ikon atom (About)
- [vector.svg] -> ikon mata (What's new)
- hero-tittle.png -> judul hero "ARMASO 2027" bersayap
- science-card.png dan sport-card.png -> kartu Our Competition
- maskot-1.png sampai maskot-8.png -> ilustrasi timeline 
Aset lain (latar, logo sayap, avatar footer) sudah ada di public/images/home/ dari pekerjaan sebelumnya.

## UKURAN (dari export V2 styles.css, kanvas desktop 1532px; proporsi terhadap lebar kanvas)
Konversi: px desain / 15.32 = vw. Pakai persen/vw + max-width + clamp() untuk font, JANGAN px tetap. Semua blok terpusat horizontal.
- Papan Informasi: lebar 51% (783px), tinggi 118px; MENIMPA tepi bawah hero sekitar 67px (4.4vw). Latar #531901, border 3px #ff6d00, radius 30px. Judul kolom Poppins 500 14px putih; nilai Poppins 700 20px #efbb52; pembatas vertikal setinggi 68px antar 3 kolom.
- About: kontainer lebar 72% (1100px), tinggi 740px, padding sekitar 56px (5%); latar #1c0a00 opacity 70%, border 3px #efbb52, radius 31px.
  Banner "ARMASO 2027": tinggi 122px, Jaro 55px, jarak dari atas kontainer 48px.
  Di bawahnya 2 kolom: kiri lebar 500px (tinggi 484px), kanan lebar 460px, gap 20px. Kolom kanan: "What's new" tinggi 290px, "Kompetisi" tinggi 185px di bawahnya (dasar sejajar kolom kiri).
  Kartu About / What's new: padding sekitar 22px. Judul Jaro 30px dengan ikon bulat 48px di KIRI judul (satu baris, di dalam padding). Isi Poppins 600 14px (0.91vw), warna #f5e6c8 (krem, bukan putih), justify, jarak antar paragraf sekitar 27px.
  Ikon About = gambar atom. Ikon What's new = emoji 👀 dalam lingkaran #842200 border 1px emas (BUKAN gambar).
  Kartu Kompetisi: judul Jaro 25px terpusat; "Sains" (Jaro 25px, kiri) dan "Sport" (kanan), daftar di bawahnya Poppins 600 14px, garis emas vertikal di tengah.
- Our Competition: judul Jaro 68px (text-shadow 0 5px 10px hitam); sub Jaro 38px putih (text-shadow 0 3px 10px hitam). Dua kartu gambar 414x565 (rasio 414:565, lebar 27%), jarak antar kartu 238px (15.5%), keduanya terpusat, matahari di tengah. Jarak judul ke kartu sekitar 295px, sub ke kartu sekitar 150px.
- Timeline: judul Jaro 68px emas. Banner SCIENCE dan SPORT: Jaro 60px putih, lebar 375px, tinggi 62px, di sisi kiri dan kanan. Label tanggal sekitar 109x62px, label judul sekitar 150x25px, maskot 80 sampai 123px. (Teks label di export berupa vektor: ambil teksnya dari section 6 di atas, jangan dari CSS.)
- Countdown + Kuota: dua kartu bersebelahan, total lebar 93% (1425px), gap 40px, tinggi 330px. Countdown lebar 778px (56%), Quota lebar 607px (44%). Judul kartu Poppins 700 25px #ffb206. Kotak oval 102x134px, jarak antar oval 34px, titik dua Poppins 700 25px #efbb52 di antaranya. Label Poppins 700 15px #ffb206 dengan garis emas 60px di atas label, angka di atas garis. Kuota: satu oval 102x134 dengan label "Teams".
- Sponsors: bar judul pil lebar 93% (1425px), tinggi 115px, teks Poppins 700 25px #ffb206. Kontainer besar di bawahnya lebar 1417px, tinggi minimal sekitar 717px (tumbuh sesuai isi).
- Footer: 3 kartu sama lebar (sekitar 420px, tinggi sekitar 474px) berjajar; bar bawah lebar 1428px (93%), tinggi 179px.
- Latar (vertikal): hero 835px; gradasi penyambung #1c0a00 ke #fec8b0 setinggi 374px; latar About 863px; gradasi Our Competition #531901 ke #c68e76 ke #ffc8af setinggi 722px; latar piramida/kurma 891px; latar Timeline #1c0a00; Countdown, Sponsors, dan Footer #000. Antara Timeline dan Countdown ada vignette hitam 117px.