import Image from "next/image";
import Link from "next/link";
import {
  SPONSOR_TIERS,
  sponsors,
  type Sponsor,
  type SponsorTier,
} from "@/components/home/data/sponsors";

const tierLogoSize: Record<SponsorTier, string> = {
  egyptian: "h-36 sm:h-44 lg:h-52",
  diamond: "h-28 sm:h-32 lg:h-36",
  gold: "h-20 sm:h-24 lg:h-28",
};

const tierGridClass: Record<SponsorTier, string> = {
  egyptian: "grid-cols-1",
  diamond: "grid-cols-1 sm:grid-cols-2",
  gold: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

function SponsorLogo({
  sponsor,
  tier,
}: {
  sponsor: Sponsor;
  tier: SponsorTier;
}) {
  const content = (
    <div
      className={[
        "flex w-full items-center justify-center",
        "rounded-2xl border border-[#70501f]",
        "bg-[#2b190e] p-4 sm:p-5",
        "transition duration-300 ease-out",
        "hover:-translate-y-1",
        "hover:border-[#ffb206]",
        "hover:shadow-[0_0_22px_rgba(255,178,6,0.3)]",
        "motion-reduce:transform-none motion-reduce:transition-none",
        tier === "egyptian"
          ? "min-h-48 sm:min-h-56"
          : "min-h-32 sm:min-h-36",
      ].join(" ")}
    >
      <Image
        src={sponsor.logo}
        alt={`Logo ${sponsor.name}`}
        width={800}
        height={400}
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
        className={`max-w-full ${tierLogoSize[tier]} object-contain`}
      />
    </div>
  );

  if (sponsor.link) {
    return (
      <Link
        href={sponsor.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Kunjungi situs ${sponsor.name}`}
        className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#ffb206]"
      >
        {content}
      </Link>
    );
  }

  return <div aria-label={sponsor.name}>{content}</div>;
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

        {/* KONTAINER UTAMA */}
        <div className="home-reveal space-y-8 rounded-[2rem] border-[3px] border-[#b68a2e] bg-[#1c0a00] p-4 sm:p-6 lg:p-8">
          {SPONSOR_TIERS.map((tier, index) => {
            const tierSponsors = sponsors.filter(
              (sponsor) => sponsor.tier === tier.id
            );

            const staggerClass = [
              "home-reveal-stagger-1",
              "home-reveal-stagger-2",
              "home-reveal-stagger-3",
            ][index] ?? "";

            return (
              <section
                key={tier.id}
                aria-labelledby={`sponsor-tier-${tier.id}`}
                className={`home-reveal ${staggerClass} space-y-5`}
              >
                <h3
                  id={`sponsor-tier-${tier.id}`}
                  className="text-center text-base font-semibold uppercase text-[#ffb206] sm:text-lg"
                >
                  {tier.label}
                </h3>

                {tierSponsors.length > 0 ? (
                  <div
                    className={`grid ${tierGridClass[tier.id]} gap-3 sm:gap-4`}
                  >
                    {tierSponsors.map((sponsor) => (
                      <SponsorLogo
                        key={`${sponsor.tier}-${sponsor.name}`}
                        sponsor={sponsor}
                        tier={tier.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-24 items-center justify-center rounded-2xl border border-[#70501f] bg-[#2b190e] px-4 py-6 text-center">
                    <p className="text-sm text-[#d7c5a6]">
                      Logo {tier.label} akan ditampilkan di sini.
                    </p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}