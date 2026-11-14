
import Image from "next/image";
import Link from "next/link";
import { sponsors, type Sponsor } from "@/components/home/data/sponsors";

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  const logo = (
    <Image
      src={sponsor.logo}
      alt={`Logo ${sponsor.name}`}
      width={800}
      height={400}
      sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 20vw"
      className="h-24 w-full max-w-[180px] object-contain transition-transform duration-300 hover:scale-110 sm:h-28 lg:h-32"
    />
  );

  if (sponsor.link) {
    return (
      <Link
        href={sponsor.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Kunjungi situs ${sponsor.name}`}
        className="flex min-h-28 items-center justify-center rounded-xl p-3 outline-none focus-visible:ring-2 focus-visible:ring-[#ffb206]"
      >
        {logo}
      </Link>
    );
  }

  return (
    <div
      aria-label={sponsor.name}
      className="flex min-h-28 items-center justify-center rounded-xl p-3"
    >
      {logo}
    </div>
  );
}

export default function HomeSponsors() {
  return (
    <section
      id="sponsors"
      aria-labelledby="home-sponsors-title"
      className="bg-black px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-10"
    >
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-5">

        {/* JUDUL SPONSOR */}
        <header className="home-reveal flex min-h-[72px] items-center justify-center rounded-full border-[3px] border-[#b68a2e] bg-[#1c0a00] px-4 py-4 text-center sm:min-h-[88px]">
          <h2
            id="home-sponsors-title"
            className="font-[var(--font-home-poppins)] text-2xl font-bold text-[#ffb206] sm:text-3xl"
          >
            Our Sponsors
          </h2>
        </header>

        {/* SATU KONTAINER UTAMA */}
        <div className="home-reveal rounded-[2rem] border-[3px] border-[#b68a2e] bg-[#1c0a00] p-5 sm:p-8 lg:p-10">
          {sponsors.length > 0 ? (
            <div className="grid grid-cols-2 items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
              {sponsors.map((sponsor) => (
                <SponsorLogo
                  key={`${sponsor.tier}-${sponsor.name}`}
                  sponsor={sponsor}
                />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-[#d7c5a6]">
              Sponsor akan ditampilkan di sini.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
