// HomeCompetition.tsx — Section "Our Competition" (Tahap 3)
// Dua kartu gambar ARMASO SCIENCE dan ARMASO SPORT sebagai next/link ke /register/
// Prop status: "buka" | "ditutup" — disiapkan tapi BELUM diaktifkan (semua "buka").
// Hover: home-card (naik + glow emas). focus-visible: ring emas.
// Latar: lomba-bg.svg, gradasi #531901 (atas) ke peach/cream (bawah).
// Matahari oranye di antara dua kartu di desktop.
// HP: kartu bertumpuk 1 kolom.

import Image from "next/image";
import Link from "next/link";

type CompetitionStatus = "buka" | "ditutup";

interface CompetitionCardProps {
  title: string;       // "ARMASO SCIENCE" | "ARMASO SPORT"
  subtitle: string;    // "SCIENCE" | "SPORT"
  imageSrc: string;
  imageAlt: string;
  href: string;
  ariaLabel: string;
  status: CompetitionStatus; // disiapkan, belum diaktifkan
}

function CompetitionCard({
  title, subtitle, imageSrc, imageAlt, href, ariaLabel, status
}: CompetitionCardProps) {
  // Badge "Pendaftaran Ditutup" — disiapkan tapi status selalu "buka" saat ini
  const isClosed = status === "ditutup";

  const cardContent = (
    <div className="relative flex flex-col items-center">
      {/* Badge ditutup — belum aktif */}
      {isClosed && (
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 z-10 rounded-full px-4 py-1
                     font-poppins font-bold text-sm text-white"
          style={{ background: "#842200", border: "1px solid #ff6d00" }}
        >
          Pendaftaran Ditutup
        </div>
      )}

      {/* Gambar kartu pilar Mesir */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={420}
        height={600}
        className="w-full h-auto object-contain"
        style={{ filter: isClosed ? "grayscale(0.6) brightness(0.7)" : "none" }}
      />
    </div>
  );

  if (isClosed) {
    // Saat ditutup: tampilkan sebagai div, bukan link
    return (
      <div
        className="home-card cursor-not-allowed opacity-70 rounded-2xl overflow-hidden"
        aria-label={`${ariaLabel} — Pendaftaran ditutup`}
        style={{ border: "2px solid #efbb52" }}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="home-card block rounded-2xl overflow-hidden focus-visible:outline-none
                 focus-visible:ring-4 focus-visible:ring-[#ffb206]/80"
      style={{ border: "2px solid #efbb52" }}
    >
      {cardContent}
    </Link>
  );
}

export default function HomeCompetition() {
  return (
    <section
      id="kompetisi"
      className="relative overflow-hidden"
      style={{
        // Gradasi cokelat #531901 (atas) ke peach cream (bawah) sesuai Figma
        background: "linear-gradient(to bottom, #531901 0%, #842200 20%, #c68e76 65%, #ffc8af 100%)",
        padding: "0 1rem 5rem",
      }}
    >
      {/* Latar lomba-bg.svg — dekorasi siluet istana + piramida */}
      <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 0 }}>
        <Image
          src="/images/home/lomba-bg.svg"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
        />
      </div>

      {/* Konten */}
      <div className="relative mx-auto w-full max-w-6xl px-0" style={{ zIndex: 1 }}>

        {/* Judul & sub-judul */}
        <div className="text-center pt-16 pb-10 home-reveal">
          <h2
            className="font-jaro font-normal [font-synthesis:none] leading-none"
            style={{
              fontFamily: "var(--font-home-jaro),'Jaro',sans-serif",
              fontWeight: 400,
              fontSize: "clamp(40px, 6vw, 90px)",
              color: "#ffb206",
              textShadow: "0 5px 10px #000",
            }}
          >
            OUR COMPETITION
          </h2>
          <p
            className="font-jaro font-normal [font-synthesis:none] mt-2"
            style={{
              fontFamily: "var(--font-home-jaro),'Jaro',sans-serif",
              fontWeight: 400,
              fontSize: "clamp(18px, 2.5vw, 40px)",
              color: "#ffffff",
              textShadow: "0 2px 6px rgba(0,0,0,0.7)",
            }}
          >
            CHOOSE YOUR ARENA, PROVE YOUR BRILLIANCE
          </p>
        </div>

        {/*
          Dua kartu + matahari oranye di tengah (desktop).
          HP: bertumpuk, matahari tersembunyi.
          Gunakan CSS grid 3 kolom di desktop: [kartu] [matahari] [kartu]
        */}
        <div className="home-reveal home-reveal-stagger-2">
          {/* Desktop: grid 3 kolom dengan matahari */}
          <div className="hidden md:grid items-center" style={{ gridTemplateColumns: "1fr auto 1fr", gap: "clamp(16px,3vw,48px)" }}>
            <CompetitionCard
              title="ARMASO SCIENCE"
              subtitle="SCIENCE"
              imageSrc="/images/home/science-card.png"
              imageAlt="Kartu ARMASO Science — obelisk dan globe Mesir"
              href="/register/olimpiade"
              ariaLabel="Daftar ARMASO Science"
              status="buka"
            />

            {/* Matahari oranye di tengah */}
            <div
              className="shrink-0 rounded-full"
              style={{
                width: "clamp(48px,5vw,90px)",
                height: "clamp(48px,5vw,90px)",
                background: "radial-gradient(circle, #ff9c00 0%, #ff6d00 55%, transparent 80%)",
                boxShadow: "0 0 40px 16px rgba(255,109,0,0.45), 0 0 80px 24px rgba(255,109,0,0.2)",
              }}
              aria-hidden="true"
            />

            <CompetitionCard
              title="ARMASO SPORT"
              subtitle="SPORT"
              imageSrc="/images/home/sport-card.png"
              imageAlt="Kartu ARMASO Sport — piala emas Mesir"
              href="/register/futsal"
              ariaLabel="Daftar ARMASO Sport"
              status="buka"
            />
          </div>

          {/* HP: bertumpuk, tanpa matahari tengah */}
          <div className="md:hidden flex flex-col items-center gap-8">
            <CompetitionCard
              title="ARMASO SCIENCE"
              subtitle="SCIENCE"
              imageSrc="/images/home/science-card.png"
              imageAlt="Kartu ARMASO Science — obelisk dan globe Mesir"
              href="/register/olimpiade"
              ariaLabel="Daftar ARMASO Science"
              status="buka"
            />
            <CompetitionCard
              title="ARMASO SPORT"
              subtitle="SPORT"
              imageSrc="/images/home/sport-card.png"
              imageAlt="Kartu ARMASO Sport — piala emas Mesir"
              href="/register/futsal"
              ariaLabel="Daftar ARMASO Sport"
              status="buka"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

