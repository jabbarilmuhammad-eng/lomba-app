// HomeCompetition.tsx — Section "Our Competition" (Batch A rev2)
// Sesuai NOTES.md:
// - Judul Jaro 68px (clamp 36-68px) emas shadow hitam.
// - Sub-judul Jaro 38px (clamp 18-38px) putih shadow hitam.
// - Kartu HANYA GAMBAR (tanpa latar atau border kotak).
// - Hover/focus-visible: translateY(-8px) + drop-shadow emas mengikuti bentuk pilar.
// - Sambungan dari About ke Our Competition: gradasi halus dari #531901 ke peach #ffc8af.
// - Matahari oranye di tengah antar kartu di desktop. HP: bertumpuk.

import Image from "next/image";
import Link from "next/link";

type CompetitionStatus = "buka" | "ditutup";

interface CompetitionCardProps {
  imageSrc: string;
  imageAlt: string;
  href: string;
  ariaLabel: string;
  status: CompetitionStatus;
}

function CompetitionCard({ imageSrc, imageAlt, href, ariaLabel, status }: CompetitionCardProps) {
  const isClosed = status === "ditutup";

  const cardMedia = (
    <div className="relative group transition-all duration-300 ease-out hover:-translate-y-2 focus-within:-translate-y-2">
      {isClosed && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-[#842200] border border-[#ff6d00] rounded-full px-4 py-1 font-poppins font-bold text-xs text-white whitespace-nowrap shadow-lg">
          Pendaftaran Ditutup
        </div>
      )}
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={414}
        height={565}
        className={`w-full h-auto object-contain transition-[filter] duration-300 group-hover:drop-shadow-[0_0_22px_rgba(255,178,6,0.85)] group-focus:drop-shadow-[0_0_22px_rgba(255,178,6,0.85)] ${isClosed ? "grayscale-[0.6] brightness-75" : ""
          }`}
        priority
      />
    </div>
  );

  if (isClosed) {
    return (
      <div
        className="block w-[min(88vw,320px)] md:w-[min(27vw,414px)] shrink-0 cursor-not-allowed select-none"
        aria-label={`${ariaLabel} — Pendaftaran ditutup`}
      >
        {cardMedia}
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="block w-[min(88vw,320px)] md:w-[min(27vw,414px)] shrink-0 focus-visible:outline-none select-none"
    >
      {cardMedia}
    </Link>
  );
}

export default function HomeCompetition() {
  return (
    <section
      id="kompetisi"
      className="relative overflow-hidden px-4 pb-20 md:pb-28"
      style={{
        background: "linear-gradient(to bottom, #531901 0%, #7a2800 15%, #c68e76 55%, #ffc8af 100%)",
      }}
    >
      {/* Background decoration: siluet istana + piramida */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <Image
          src="/images/home/lomba-bg.svg"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1532px] mx-auto flex flex-col items-center">
        {/* Judul & sub-judul */}
        <div className="text-center pt-12 md:pt-24 pb-8 md:pb-14 home-reveal">
          <h2 className="font-jaro font-normal tracking-normal [font-synthesis:none] text-[clamp(36px,4.4vw,68px)] text-[#ffb206] drop-shadow-[0_5px_10px_#000] leading-none m-0">
            OUR COMPETITION
          </h2>
          <p className="font-jaro font-normal tracking-normal [font-synthesis:none] text-[clamp(18px,2.5vw,38px)] text-white drop-shadow-[0_3px_10px_#000] mt-3 md:mt-4 leading-none m-0">
            CHOOSE YOUR ARENA, PROVE YOUR BRILLIANCE
          </p>
        </div>



        {/* Kartu: Desktop (row + matahari), HP (kolom bertumpuk) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[clamp(32px,8vw,120px)] home-reveal home-reveal-stagger-2">
          {/* Kartu Science */}
          <CompetitionCard
            imageSrc="/images/home/science-card.png"
            imageAlt="Kartu ARMASO Science"
            href="/register/olimpiade"
            ariaLabel="Daftar ARMASO Science"
            status="buka"
          />

          {/* Matahari oranye di tengah (hanya desktop) */}
          <div
            className="hidden md:block w-[clamp(48px,5.8vw,90px)] h-[clamp(48px,5.8vw,90px)] shrink-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #ffb206 0%, #ff6d00 45%, rgba(255,109,0,0.2) 75%, transparent 100%)",
              boxShadow: "0 0 60px 20px rgba(255,109,0,0.5), 0 0 120px 40px rgba(255,109,0,0.2)",
            }}
            aria-hidden="true"
          />

          {/* Kartu Sport */}
          <CompetitionCard
            imageSrc="/images/home/sport-card.png"
            imageAlt="Kartu ARMASO Sport"
            href="/register/futsal"
            ariaLabel="Daftar ARMASO Sport"
            status="buka"
          />
        </div>
      </div>
    </section>
  );
}
