// HomeAbout.tsx — Section "About" (Batch A rev2)
// Sesuai NOTES.md:
// - Kontainer max-w-[1100px] (72%), padding 56px (clamp 24-56px), radius 31px, border 3px #efbb52, bg #1c0a00/70.
// - Banner "ARMASO 2027": Jaro 55px (clamp 32-55px), radius 20px, border 2px #efbb52.
// - 2 kolom: kiri (About ARMASO), kanan (What's new + Kompetisi), gap 20px.
// - Kartu: padding 22px, border 2px #efbb52, radius 20px, bg #1c0a00/85.
// - Judul kartu: Jaro 30px dengan ikon bulat 48px di kiri judul, DI DALAM padding kartu.
// - Isi: Poppins 600, 14px, warna #f5e6c8, justify di desktop, rata kiri di HP, gap antar paragraf 27px.
// - Ikon What's new: emoji 👀 dalam lingkaran #842200 border 1px emas.
// - Ikon About: fa-atom dalam lingkaran gradasi #842200-#531901 border 1px emas (TODO: ganti aset saat tersedia).

import Image from "next/image";

export default function HomeAbout() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 py-12 md:py-16 flex justify-center"
      style={{
        background: "linear-gradient(to bottom, #2a0d00 0%, #321005 25%, #3a1100 55%, #531901 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-35 z-0">
        <Image
          src="/images/home/about-bg.svg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Kontainer utama terpusat */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto bg-[#1c0a00]/70 border-[3px] border-[#efbb52] rounded-[31px] p-[clamp(24px,3.6vw,56px)] flex flex-col gap-5 home-reveal shadow-2xl">
        {/* a) Banner "ARMASO 2027" */}
        <div className="w-full bg-[#1c0a00]/85 border-2 border-[#efbb52] rounded-[20px] py-[clamp(18px,3.1vw,40px)] px-6 text-center home-reveal">
          <h2 className="font-jaro font-normal tracking-normal [font-synthesis:none] text-[clamp(32px,3.6vw,55px)] text-[#ffb206] leading-none m-0 drop-shadow-[0_0_24px_rgba(255,178,6,0.35)]">
            ARMASO 2027
          </h2>
        </div>

        {/* 2 Kolom Grid: Kiri (About), Kanan (What's new & Kompetisi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* b) Kartu Kiri: About ARMASO */}
          <div className="bg-[#1c0a00]/85 border-2 border-[#efbb52] rounded-[20px] p-[22px] flex flex-col justify-between home-reveal home-reveal-stagger-1">
            <div>
              {/* Header kartu: Ikon 48px + Judul Jaro 30px di dalam padding */}
              <div className="flex items-center gap-3 mb-5">
                {/* TODO: ganti dengan aset gambar atom dari Figma saat tersedia */}
                <div className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-[#842200] to-[#531901] border border-[#efbb52]">
                  <i className="fa-solid fa-atom text-[#ffb206] text-xl" />
                </div>
                <h3 className="font-jaro font-normal [font-synthesis:none] text-[30px] text-[#ffb206] leading-none m-0">
                  About ARMASO
                </h3>
              </div>

              {/* Paragraf: Poppins 600, 14px, #f5e6c8, justify di desktop, gap 27px */}
              <div className="flex flex-col gap-[27px]">
                <p className="font-poppins font-semibold text-[14px] text-[#f5e6c8] leading-[1.75] text-left md:text-justify m-0">
                  ARMASO (Ar-Rahmat Mathematic, Science, Social and Sport Olympiad) merupakan olimpiade sains sekaligus kompetisi futsal yang diadakan oleh Pondok Pesantren Modern Ar-Rahmat Bojonegoro.
                </p>
                <p className="font-poppins font-semibold text-[14px] text-[#f5e6c8] leading-[1.75] text-left md:text-justify m-0">
                  ARMASO hadir dengan empat cabang lomba, yaitu matematika, sains, sosial dan futsal, sebagai wadah untuk mengembangkan bakat dan minat para siswa. ARMASO bertujuan untuk menumbuhkan semangat kompetisi yang sehat, baik dalam bidang olahraga, maupun sains.
                </p>
                <p className="font-poppins font-semibold text-[14px] text-[#f5e6c8] leading-[1.75] text-left md:text-justify m-0">
                  Lebih dari sekadar adu pengetahuan, ARMASO melatih anak untuk berpikir kritis, memecahkan masalah, dan berkreasi. Lewat lomba futsal, mereka juga belajar bekerja sama, tangkas di lapangan, dan menjunjung tinggi sportivitas. Setiap anak punya tempat untuk bersinar.
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: What's new & Kompetisi */}
          <div className="flex flex-col gap-5 justify-between">
            {/* c) What's new!?! */}
            <div className="bg-[#1c0a00]/85 border-2 border-[#efbb52] rounded-[20px] p-[22px] flex flex-col home-reveal home-reveal-stagger-2">
              {/* Header kartu: Ikon 👀 48px + Judul Jaro 30px di dalam padding */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center bg-[#842200] border border-[#efbb52] text-[22px] leading-none select-none"
                  aria-hidden="true"
                >
                  👀
                </div>
                <h3 className="font-jaro font-normal [font-synthesis:none] text-[30px] text-[#ffb206] leading-none m-0">
                  What&apos;s new!?!
                </h3>
              </div>

              {/* Paragraf: Poppins 600, 14px, #f5e6c8, justify di desktop, gap 27px */}
              <div className="flex flex-col gap-[27px]">
                <p className="font-poppins font-semibold text-[14px] text-[#f5e6c8] leading-[1.75] text-left md:text-justify m-0">
                  Tahun ini, ARMASO resmi menghadirkan satu bidang baru, yaitu Sport Competition. Untuk pertama kalinya, peserta tidak hanya beradu nalar di Matematika, Sains, dan Sosial, tetapi juga unjuk ketangkasan di lapangan lewat cabang olahraga Futsal.
                </p>
                <p className="font-poppins font-semibold text-[14px] text-[#f5e6c8] leading-[1.75] text-left md:text-justify m-0">
                  Lewat Sport Competition, anak-anak belajar tentang sportivitas, kerja sama, dan semangat pantang menyerah. Cerdas di kelas, tangguh di lapangan!
                </p>
              </div>
            </div>

            {/* d) Kompetisi */}
            <div className="bg-[#1c0a00]/85 border-2 border-[#efbb52] rounded-[20px] p-[22px] home-reveal home-reveal-stagger-3">
              <h3 className="font-jaro font-normal [font-synthesis:none] text-[25px] text-[#ffb206] text-center mb-4 leading-none m-0">
                Kompetisi
              </h3>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start pt-2">
                {/* Kolom Sains */}
                <div className="text-center">
                  <p className="font-jaro font-normal [font-synthesis:none] text-[25px] text-[#ffb206] mb-2 leading-none">
                    Sains
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="font-poppins font-semibold text-[14px] text-[#f5e6c8] m-0">Matematika</p>
                    <p className="font-poppins font-semibold text-[14px] text-[#f5e6c8] m-0">Sains</p>
                    <p className="font-poppins font-semibold text-[14px] text-[#f5e6c8] m-0">Sosial</p>
                  </div>
                </div>

                {/* Garis vertikal pemisah */}
                <div className="w-[2px] min-h-[90px] bg-[#efbb52] rounded-full self-stretch" />

                {/* Kolom Sport */}
                <div className="text-center">
                  <p className="font-jaro font-normal [font-synthesis:none] text-[25px] text-[#ffb206] mb-2 leading-none">
                    Sport
                  </p>
                  <p className="font-poppins font-semibold text-[14px] text-[#f5e6c8] m-0">Futsal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
