// HomeAbout.tsx — Section "About" (Tahap 2)
// Kontainer besar (rounded, border emas, latar cokelat transparan) berisi:
//   a) Banner "ARMASO 2027" (Jaro emas, glow)
//   b) Kartu kiri "About ARMASO" (ikon fa-atom — TODO ganti aset saat tersedia)
//   c) Kartu kanan atas "What's new!?!" (ikon fa-eye — TODO ganti aset saat tersedia)
//   d) Kartu kanan bawah "Kompetisi" (Sains | Sport)
// Teks justify di desktop, rata kiri di HP.
// Latar: about-bg.svg, gradasi penyambung dari #2a0d00 (atas) ke latar cokelat.

import Image from "next/image";

export default function HomeAbout() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #2a0d00 0%, #3d1200 60%, #531901 100%)",
        padding: "0 1rem 4rem",
      }}
    >
      {/* Latar about-bg.svg — sebagai dekorasi samping */}
      <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 0 }}>
        <Image
          src="/images/home/about-bg.svg"
          alt=""
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
      </div>

      {/* Konten utama */}
      <div className="relative mx-auto w-full max-w-6xl px-0" style={{ zIndex: 1 }}>

        {/* ── Kontainer besar ── */}
        <div
          className="home-reveal rounded-[28px] p-4 md:p-6"
          style={{
            background: "rgba(28, 10, 0, 0.75)",
            border: "2px solid #efbb52",
          }}
        >
          {/* a) Banner ARMASO 2027 */}
          <div
            className="home-reveal rounded-[20px] mb-5 flex items-center justify-center py-5 px-4"
            style={{
              background: "rgba(28, 10, 0, 0.85)",
              border: "2px solid #efbb52",
            }}
          >
            <h2
              className="font-jaro font-normal tracking-normal [font-synthesis:none] text-center leading-none"
              style={{
                fontFamily: "var(--font-home-jaro), 'Jaro', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(36px, 6vw, 88px)",
                color: "#ffb206",
                textShadow: "0 0 30px rgba(255,178,6,0.4)",
              }}
            >
              ARMASO 2027
            </h2>
          </div>

          {/* b–d) Grid kartu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* b) About ARMASO — kartu kiri (tall, span 1 row atau flex) */}
            <div
              className="home-reveal home-reveal-stagger-1 rounded-[20px] p-5 flex flex-col"
              style={{ background: "rgba(28, 10, 0, 0.85)", border: "2px solid #efbb52" }}
            >
              {/* Header kartu */}
              <div className="flex items-center gap-3 mb-4">
                {/* TODO: ganti fa-atom dengan aset ikon atom dari Figma saat tersedia */}
                <div
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 48, height: 48,
                    background: "linear-gradient(135deg, #842200, #531901)",
                    border: "2px solid #efbb52",
                  }}
                >
                  <i className="fa-solid fa-atom" style={{ color: "#ffb206", fontSize: 20 }} />
                </div>
                <h3
                  className="font-jaro font-normal [font-synthesis:none]"
                  style={{ fontFamily: "var(--font-home-jaro),'Jaro',sans-serif", fontWeight: 400, fontSize: "clamp(20px,2vw,28px)", color: "#ffb206" }}
                >
                  About ARMASO
                </h3>
              </div>

              {/* Teks — justify desktop, left HP */}
              <div
                className="font-poppins text-white/90 space-y-3 text-left md:text-justify"
                style={{ fontWeight: 400, fontSize: "clamp(13px,1.1vw,15px)", lineHeight: 1.7 }}
              >
                <p>
                  ARMASO (Ar-Rahmat Mathematic, Science, Social and Sport Olympiad) merupakan olimpiade sains sekaligus kompetisi futsal yang diadakan oleh Pondok Pesantren Modern Ar-Rahmat Bojonegoro.
                </p>
                <p>
                  ARMASO hadir dengan empat cabang lomba, yaitu matematika, sains, sosial dan futsal, sebagai wadah untuk mengembangkan bakat dan minat para siswa. ARMASO bertujuan untuk menumbuhkan semangat kompetisi yang sehat, baik dalam bidang olahraga, maupun sains.
                </p>
                <p>
                  Lebih dari sekadar adu pengetahuan, ARMASO melatih anak untuk berpikir kritis, memecahkan masalah, dan berkreasi. Lewat lomba futsal, mereka juga belajar bekerja sama, tangkas di lapangan, dan menjunjung tinggi sportivitas. Setiap anak punya tempat untuk bersinar.
                </p>
              </div>
            </div>

            {/* Kolom kanan: What's new + Kompetisi */}
            <div className="flex flex-col gap-4">

              {/* c) What's new!?! */}
              <div
                className="home-reveal home-reveal-stagger-2 rounded-[20px] p-5 flex flex-col"
                style={{ background: "rgba(28, 10, 0, 0.85)", border: "2px solid #efbb52" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {/* TODO: ganti fa-eye dengan aset ikon mata dari Figma saat tersedia */}
                  <div
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: 48, height: 48,
                      background: "linear-gradient(135deg, #842200, #531901)",
                      border: "2px solid #efbb52",
                    }}
                  >
                    <i className="fa-solid fa-eye" style={{ color: "#ffb206", fontSize: 20 }} />
                  </div>
                  <h3
                    className="font-jaro font-normal [font-synthesis:none]"
                    style={{ fontFamily: "var(--font-home-jaro),'Jaro',sans-serif", fontWeight: 400, fontSize: "clamp(20px,2vw,28px)", color: "#ffb206" }}
                  >
                    What&apos;s new!?!
                  </h3>
                </div>
                <div
                  className="font-poppins text-white/90 space-y-3 text-left md:text-justify"
                  style={{ fontWeight: 400, fontSize: "clamp(13px,1.1vw,15px)", lineHeight: 1.7 }}
                >
                  <p>
                    Tahun ini, ARMASO resmi menghadirkan satu bidang baru, yaitu Sport Competition. Untuk pertama kalinya, peserta tidak hanya beradu nalar di Matematika, Sains, dan Sosial, tetapi juga unjuk ketangkasan di lapangan lewat cabang olahraga Futsal.
                  </p>
                  <p>
                    Lewat Sport Competition, anak-anak belajar tentang sportivitas, kerja sama, dan semangat pantang menyerah. Cerdas di kelas, tangguh di lapangan!
                  </p>
                </div>
              </div>

              {/* d) Kompetisi */}
              <div
                className="home-reveal home-reveal-stagger-3 rounded-[20px] p-5"
                style={{ background: "rgba(28, 10, 0, 0.85)", border: "2px solid #efbb52" }}
              >
                <h3
                  className="font-jaro font-normal [font-synthesis:none] text-center mb-4"
                  style={{ fontFamily: "var(--font-home-jaro),'Jaro',sans-serif", fontWeight: 400, fontSize: "clamp(18px,1.8vw,26px)", color: "#ffb206" }}
                >
                  Kompetisi
                </h3>
                {/* Dua kolom: Sains | garis emas | Sport */}
                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
                  {/* Sains */}
                  <div className="text-center">
                    <p
                      className="font-poppins font-bold mb-2"
                      style={{ color: "#ffb206", fontSize: "clamp(14px,1.2vw,17px)" }}
                    >
                      Sains
                    </p>
                    <ul className="font-poppins text-white/85 space-y-1" style={{ fontSize: "clamp(12px,1vw,15px)" }}>
                      <li>Matematika</li>
                      <li>Sains</li>
                      <li>Sosial</li>
                    </ul>
                  </div>
                  {/* Pemisah vertikal emas */}
                  <div style={{ width: 2, minHeight: 80, background: "#efbb52", alignSelf: "stretch", borderRadius: 2 }} />
                  {/* Sport */}
                  <div className="text-center">
                    <p
                      className="font-poppins font-bold mb-2"
                      style={{ color: "#ffb206", fontSize: "clamp(14px,1.2vw,17px)" }}
                    >
                      Sport
                    </p>
                    <ul className="font-poppins text-white/85 space-y-1" style={{ fontSize: "clamp(12px,1vw,15px)" }}>
                      <li>Futsal</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

