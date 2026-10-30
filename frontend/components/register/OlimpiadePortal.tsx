// OlimpiadePortal.tsx — isi halaman /register/olimpiade ("Pilih skema pendaftaran Olimpiade").
// Server component (tanpa JavaScript klien): animasi memakai kelas CSS "home-fade-up" dari globals.css,
// sama seperti animasi muncul di hero beranda. Hover kartu: naik + glow emas, sama seperti kartu di beranda.

import Image from "next/image";
import Link from "next/link";

/** Tujuan link tiap skema. Samakan dengan nama folder di app/register/olimpiade/. */
const ROUTES = {
  individu: "/register/science/self",
  kolektif: "/register/science/collective",
} as const;

const CARDS = [
  {
    key: "individu",
    href: ROUTES.individu,
    src: "/images/home/individu-card.png",
    alt: "Kartu ARMASO Science, skema pendaftaran Individu",
    label: "Daftar Olimpiade skema Individu",
    delay: "home-fade-up-delay-2",
  },
  {
    key: "kolektif",
    href: ROUTES.kolektif,
    src: "/images/home/kolektif-card.png",
    alt: "Kartu ARMASO Science, skema pendaftaran Kolektif",
    label: "Daftar Olimpiade skema Kolektif",
    delay: "home-fade-up-delay-3",
  },
] as const;

export default function OlimpiadePortal() {
  return (
    <section
      aria-labelledby="olimpiade-portal-title"
      className="relative isolate overflow-hidden bg-[#1c0a00] pt-[clamp(64px,5vw,80px)] md:min-h-[clamp(700px,49vw,980px)]"
    >
      {/* Latar aula kuil */}
      <Image
        src="/images/home/bg-portal-olim.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Gelap di bagian atas supaya judul terbaca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(28,10,0,0.92) 0%, rgba(28,10,0,0.6) 16%, rgba(28,10,0,0) 36%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1532px] flex-col items-center px-4 pb-14 pt-10 text-center md:px-8 md:pb-[clamp(40px,4vw,80px)] md:pt-[clamp(32px,3.9vw,75px)]">
        {/* Badge */}
        <p className="home-fade-up font-poppins m-0 rounded-full border-2 border-[#ffb206] bg-[#1c0a00] px-5 py-2 text-[clamp(11px,0.95vw,18px)] font-bold uppercase tracking-wide text-[#ffb206] md:px-[clamp(24px,2.2vw,42px)] md:py-[clamp(8px,0.8vw,15px)]">
          Pendaftaran Olimpiade Sains ARMASO 2027
        </p>

        {/* Judul */}
        <h1
          id="olimpiade-portal-title"
          className="home-fade-up home-fade-up-delay-1 font-poppins mt-5 text-[clamp(22px,2.4vw,40px)] font-extrabold uppercase leading-tight text-white md:mt-[clamp(20px,2.6vw,50px)]"
        >
          Pilih Skema <span className="text-[#ffb206]">Pendaftaran Olimpiade</span>
        </h1>

        {/* Sub-judul */}
        <p className="home-fade-up home-fade-up-delay-1 font-poppins mt-3 max-w-[860px] text-[clamp(13px,1.05vw,18px)] leading-relaxed text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
          Tentukan skema pendaftaran yang sesuai, baik pendaftaran mandiri perorangan (Individu)
          maupun pendaftaran rombongan perwakilan sekolah (Kolektif).
        </p>

        {/* Dua kartu skema */}
        <div className="mt-8 flex w-full flex-col items-center gap-8 md:mt-[clamp(24px,3.2vw,60px)] md:flex-row md:items-start md:justify-center md:gap-[clamp(48px,13.9vw,265px)]">
          {CARDS.map((card) => (
            <div key={card.key} className={`home-fade-up ${card.delay}`}>
              <Link
                href={card.href}
                aria-label={card.label}
                className="group block w-[min(72vw,300px)] outline-none md:w-[clamp(220px,21.2vw,405px)]"
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={414}
                  height={565}
                  priority
                  className="h-auto w-full transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_22px_rgba(255,178,6,0.85)] group-focus-visible:-translate-y-2 group-focus-visible:drop-shadow-[0_0_22px_rgba(255,178,6,0.85)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
