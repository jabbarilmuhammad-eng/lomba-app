
import Image from "next/image";
import Link from "next/link";

const SUBJECTS = [
  {
    key: "ipa",
    name: "IPA",
    image: "/images/home/ipa-card.png",
    alt: "Kartu pendaftaran ARMASO Science IPA",
    href: "/register/science/self/form?mapel=IPA",
    delay: "home-fade-up-delay-1",
  },
  {
    key: "ips",
    name: "IPS",
    image: "/images/home/social-card.png",
    alt: "Kartu pendaftaran ARMASO Social IPS",
    href: "/register/science/self/form?mapel=IPS",
    delay: "home-fade-up-delay-2",
  },
  {
    key: "matematika",
    name: "Matematika",
    image: "/images/home/mtk-card.png",
    alt: "Kartu pendaftaran ARMASO Matematika",
    href: "/register/science/self/form?mapel=Matematika",
    delay: "home-fade-up-delay-3",
  },
] as const;

export default function ScienceSelfPage() {
  return (
    <main
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#1c0a00]"
      aria-labelledby="subject-title"
    >
      {/* Background */}
      <Image
        src="/images/home/bg-portal-olim.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/* Overlay agar teks tetap terbaca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(28,10,0,0.88) 0%, rgba(28,10,0,0.48) 30%, rgba(28,10,0,0.25) 70%, rgba(28,10,0,0.65) 100%)",
        }}
      />

      {/* Konten */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1532px] flex-col items-center px-4 pb-16 pt-32 text-center md:px-8 md:pb-24 md:pt-40">

        {/* Badge */}
        <p className="home-fade-up font-poppins m-0 rounded-full border-2 border-[#ffb206] bg-[#1c0a00]/90 px-5 py-2 text-[clamp(11px,0.95vw,18px)] font-bold uppercase tracking-wide text-[#ffb206]">
          PENDAFTARAN OLIMPIADE SAINS ARMASO 2027
        </p>

        {/* Judul */}
        <h1
          id="subject-title"
          className="home-fade-up home-fade-up-delay-1 font-poppins mt-6 text-[clamp(25px,3vw,44px)] font-extrabold uppercase leading-tight text-[#ffb206]"
        >
          OUR SCIENCE OLYMPIAD
        </h1>

        {/* Deskripsi */}
        <p className="home-fade-up home-fade-up-delay-1 font-poppins mt-3 max-w-[760px] text-[clamp(13px,1.1vw,17px)] leading-relaxed text-[#f5e6c8] [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
          Pilih bidang olimpiade yang ingin kamu ikuti.
        </p>

        {/* Kartu Mapel */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-8 md:mt-14 md:flex-row md:items-start md:gap-[clamp(28px,5vw,76px)]">
          {SUBJECTS.map((subject) => (
            <div
              key={subject.key}
              className={`w-full max-w-[300px] md:w-[min(27vw,340px)] ${subject.delay}`}
            >
              <Link
                href={subject.href}
                aria-label={`Pilih mata pelajaran ${subject.name}`}
                className="group block w-full outline-none"
              >
                <Image
                  src={subject.image}
                  alt={subject.alt}
                  width={414}
                  height={565}
                  priority
                  className="h-auto w-full object-contain transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_22px_rgba(255,178,6,0.85)] group-focus-visible:-translate-y-2 group-focus-visible:drop-shadow-[0_0_22px_rgba(255,178,6,0.85)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Kembali */}

      </div>
    </main>
  );
}
